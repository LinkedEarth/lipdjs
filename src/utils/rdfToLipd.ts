/**
 * The RDFToLiPD class helps in converting an RDF Graph to a LiPD file.
 * It uses the SCHEMA dictionary (from globals/schema.ts) to do the conversion
 */

import { Quad, Store } from 'n3';
import { DataFactory, NamedNode, Literal } from 'n3';
import { Logger } from '../utils/logger';
import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';
import { NSURL } from '../globals/urls';
import { SCHEMA } from '../globals/schema';
import { REVERSE_BLACKLIST } from '../globals/blacklist';
import { lcfirst, parseVariableValues, ucfirst } from './utils';
import { RSYNONYMS } from '../globals/synonyms';
import { Change } from '../classes/change';
import { createBagitFiles } from './bagit';
import { DataTable } from '../classes/datatable';
import { Variable } from '../classes/variable';
const logger = Logger.getInstance();
const DF = DataFactory;

interface TableColumn {
    name: string;
    values: any[];
    number?: number;
    [key: string]: any;
}

interface Table {
    name: string;
    filename?: string;
    columns: TableColumn[];
    [key: string]: any;
}

interface LiPDData {
    paleoData?: Array<{
        measurementTable?: Table[];
        model?: Array<{
            ensembleTable?: Table[];
            summaryTable?: Table[];
        }>;
    }>;
    chronData?: Array<{
        measurementTable?: Table[];
        model?: Array<{
            ensembleTable?: Table[];
            summaryTable?: Table[];
        }>;
    }>;
    [key: string]: any;
}

interface PropertyDetails {
    name: string;
    multiple?: boolean;
    [key: string]: any;
}

interface RDFValue {
    '@type': 'uri' | 'literal';
    '@id'?: string;
    '@value'?: any;
    '@datatype'?: string;
}

interface Facts {
    [key: string]: RDFValue[];
}

interface GeoJSONGeometry {
    type: string;
    coordinates: number[];
}

interface GeoJSONFeature {
    type: string;
    geometry: GeoJSONGeometry;
    properties: { [key: string]: any };
}

export class RDFToLiPD {
    private store: Store;
    private lipdCsvs: { [key: string]: any[][] } = {};
    private graphurl: string;
    private namespace: string;
    private schema: any;
    private rschema: any;
    private allfacts: { [key: string]: Facts } = {};

    /**
     * Constructor for RDFToLiPD class
     * @param store The RDF graph to convert
     */
    constructor(store: Store) {
        this.store = store;
        this.graphurl = NSURL;
        this.namespace = NSURL + '/';
        this.schema = { ...SCHEMA };
        this.rschema = this.getSchemaReverseMap();
        logger.debug('RDFToLiPD instance created');
    }

    /**
     * Convert RDF graph to a LiPD file
     * @param dsname Dataset name
     * @param lipdfile Output LiPD file path
     * @returns The converted LiPD data
     */
    public async convert(dsname: string, lipdfile: string): Promise<any> {
        const lipd = this.convertToJson(dsname);
        const tempDir = fs.mkdtempSync('rdf_to_lipd_');
        const dsDir = path.join(tempDir, dsname);
        const dataDir = path.join(dsDir, 'data');
        
        try {
            // Create data directory
            fs.mkdirSync(dataDir, { recursive: true });

            // Create CSV files and metadata
            this.createCsvs(lipd, dataDir);
            fs.writeFileSync(
                path.join(dataDir, 'metadata.jsonld'),
                JSON.stringify(lipd, null, 4)
            );

            // Create bagit files
            await this.createBagitFiles(dsDir);

            // Zip the directory
            await this.zipDirectory(dsDir, lipdfile);

            logger.debug('Successfully converted RDF to LiPD file: %s', lipdfile);
            return lipd;
        } catch (error) {
            logger.error('Error converting RDF to LiPD: %s', error instanceof Error ? error.message : String(error));
            throw error;
        } finally {
            // Clean up temp directory
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    }

    /**
     * Convert RDF graph to LiPD JSON format
     * @param dsname Dataset name
     * @returns The converted LiPD JSON data
     */
    public convertToJson(dsname: string): any {
        this.schema = { ...SCHEMA };
        this.rschema = this.getSchemaReverseMap();

        this.allfacts = {};
        this.indexFacts(this.namespace + dsname);
        
        const lipd = this._convertToLipd(this.namespace + dsname, "Dataset", "Dataset", {});
        return this.postProcessing(lipd);
    }

    /**
     * Post-process the converted LiPD object
     * @param obj Object to process
     * @param parent Parent object
     * @returns Processed object
     */
    private postProcessing(obj: any, parent: any = null): any {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }

        if (!('@schema' in obj)) {
            return obj;
        }

        // Get schema for this object
        const schemaname = obj['@schema'];
        const tschema = this.schema[schemaname] || null;

        // Apply pre-processing functions if any
        if (tschema && '@toJson_pre' in tschema) {
            for (const func of tschema['@toJson_pre']) {
                const fn = (this as any)[func];
                if (fn) {
                    obj = fn.call(this, obj, parent);
                }
            }
        }

        // Process all properties recursively
        for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    obj[key][i] = this.postProcessing(value[i], obj);
                }
            } else {
                obj[key] = this.postProcessing(value, obj);
            }
        }

        // Apply post-processing functions if any
        if (tschema && '@toJson' in tschema) {
            for (const func of tschema['@toJson']) {
                const fn = (this as any)[func];
                if (fn) {
                    obj = fn.call(this, obj, parent);
                }
            }
        }

        // Handle hasValues conversion to values
        if ('hasValues' in obj) {
            const valuestr = obj['hasValues'];
            obj['values'] = parseVariableValues(valuestr);
            delete obj['hasValues'];
        }
        
        // Clean up metadata fields
        delete obj['@id'];
        delete obj['@schema'];
        delete obj['@category'];
        if ('type' in obj) {
            delete obj['type'];
        }

        return obj;
    }

    /**
     * Get property details from schema
     * @param pname Property name
     * @param schema Schema object
     * @returns Property details
     */
    private getPropertyDetails(pname: string, schema: any): PropertyDetails {
        const details: PropertyDetails = { name: pname };
        if (schema && pname in schema) {
            for (const [key, value] of Object.entries(schema[pname])) {
                details[key] = value;
            }
        }
        return details;
    }

    /**
     * Get RDF property details from schema
     * @param pname Property name
     * @param fullkey Full property key
     * @param schema Schema object
     * @returns Property details
     */
    private getRdfPropertyDetails(pname: string, fullkey: string, schema: any): PropertyDetails {
        const key = pname;
        pname = lcfirst(pname);
        const details: PropertyDetails = { name: pname };
        
        // Check for full key in schema
        if (schema && fullkey in schema) {
            for (const [key, value] of Object.entries(schema[fullkey])) {
                details[key] = value;
            }
        }
        return details;
    }

    /**
     * Get schema reverse map
     * @returns Reverse schema map
     */
    private getSchemaReverseMap(): any {
        const newschema: any = {};
        for (const [schid, sch] of Object.entries(this.schema)) {
            const newsch: any = {};
            for (const [prop, details] of Object.entries(sch as any)) {
                if (prop[0] === "@") {
                    continue;
                }
                
                if ("skip_auto_convert_to_json" in (details as any)) {
                    continue;
                }
                
                const pdetails = this.getPropertyDetails(prop, sch as any);
                const pname = pdetails.name;
                pdetails.name = prop;
                newsch[pname] = pdetails;
                
                if ("category" in pdetails) {
                    const catpname = pname + "." + ucfirst(pdetails.category as string);
                    newsch[catpname] = pdetails;
                }
                
                if ("schema" in pdetails) {
                    const schpname = pname + "." + ucfirst(pdetails.schema as string);
                    newsch[schpname] = pdetails;
                }
            }
            
            newschema[schid] = newsch;
        }
        
        return newschema;
    }

    /**
     * Extract local name from URL
     * @param url URL to extract from
     * @returns Local name
     */
    private localName(url: string): string {
        return url.replace(/^.*[#/]/, '');
    }


    /**
     * Convert RDF to LiPD format
     * @param id ID to convert
     * @param category Category of the item
     * @param schemaname Schema name
     * @param pagesdone Map of processed pages
     * @returns Converted LiPD object
     */
    private convertToLipd(id: string, category: string, schemaname: string, pagesdone: Map<string, boolean>): any {
        if (pagesdone.has(id)) return null;
        pagesdone.set(id, true);

        const facts = this.allfacts[id];
        if (!facts) return null;

        const obj: any = {};
        const schema = this.schema[schemaname];

        // Process each property in the facts
        for (const [pname, values] of Object.entries(facts)) {
            // Skip type property
            if (pname === 'type') continue;

            // Get property details
            const details = this.getRdfPropertyDetails(pname, pname, schema);
            const propname = details.name;

            // Skip blacklisted properties
            if (Array.isArray(REVERSE_BLACKLIST) && REVERSE_BLACKLIST.includes(propname)) continue;

            // Convert values
            const converted = [];
            for (const value of values) {
                if (value['@type'] === 'uri' && value['@id']) {
                    const subid = value['@id'];
                    const subobj = this.convertToLipd(subid, category, schemaname, pagesdone);
                    if (subobj) converted.push(subobj);
                } else if (value['@value'] !== undefined) {
                    converted.push(value['@value']);
                }
            }

            // Add to object if we have values
            if (converted.length > 0) {
                if (details.multiple) {
                    obj[propname] = converted;
                } else {
                    obj[propname] = converted[0];
                }
            }
        }

        return obj;
    }

    /**
     * Order variables in a datatable
     * @param datatable Datatable object
     * @param parent Parent object
     * @returns Datatable object with ordered variables
     */
    private orderVariables(datatable: DataTable, parent: any = null): any {
        datatable.variables = datatable.variables.sort((a: Variable, b: Variable) => (a.columnNumber ?? 0) - (b.columnNumber ?? 0));
        console.log("orderVariables",datatable.variables);
        return datatable;
    }

    private changesToJson(change: Change, parent: any = null): any {
        let newChange: any = {}
        if (change.name) {
            newChange[change.name] = change.notes || []
            return newChange;
        }
        return null;
    }

    /**
     * Convert location to GeoJSON format
     * @param geo Location object
     * @param parent Parent object
     * @returns GeoJSON object
     */
    private locationToJson(geo: any, parent: any = null): GeoJSONFeature {
        const geojson: GeoJSONFeature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [0, 0, 0]
            },
            properties: {}
        };

        if ('coordinates' in geo) {
            const latlong = geo['coordinates'].split(',');
            geojson.geometry.coordinates = [
                parseFloat(latlong[1]),
                parseFloat(latlong[0]),
                latlong.length > 2 ? parseFloat(latlong[2]) : 0
            ];
        }

        if ('long' in geo) {
            geojson.geometry.coordinates[0] = parseFloat(geo['long']);
        }
        if ('longitude' in geo) {
            geojson.geometry.coordinates[0] = parseFloat(geo['longitude']);
        }

        if ('lat' in geo) {
            geojson.geometry.coordinates[1] = parseFloat(geo['lat']);
        }
        if ('latitude' in geo) {
            geojson.geometry.coordinates[1] = parseFloat(geo['latitude']);
        }

        if ('alt' in geo && geo['alt'] !== 'NA') {
            geojson.geometry.coordinates[2] = parseFloat(geo['alt']);
        }
        if ('elevation' in geo && geo['elevation'] !== 'NA') {
            geojson.geometry.coordinates[2] = parseFloat(geo['elevation']);
        }

        for (const [prop, value] of Object.entries(geo)) {
            if (prop.startsWith('@')) continue;

            if (prop === 'locationType') {
                geojson.type = geo['locationType'];
            } else if (prop !== 'coordinates' && prop !== 'coordinatesFor') {
                if (!prop.match(/^(geo|wgs84):/)) {
                    if (!['long', 'lat', 'alt'].includes(prop)) {
                        geojson.properties[prop] = value;
                    }
                }
            }
        }

        return geojson;
    }

    /**
     * Unarray column number
     * @param variable Variable object
     * @param parent Parent object
     * @returns Variable object with unarrayed number
     */
    private unarrayColumnNumber(variable: any, parent: any = null): any {
        if (!variable) return variable;
        
        if ('number' in variable) {
            if (Array.isArray(variable['number']) && variable['number'].length === 1) {
                variable['number'] = variable['number'][0];
            }
            if (typeof variable['number'] === 'string') {
                variable['number'] = JSON.parse(variable['number']);
            }
        }
        
        return variable;
    }

    /**
     * Extract table data from columns
     * @param table The table containing columns with data
     * @returns Array of row data
     */
    private getTableData(table: Table): any[][] {
        const data: any[][] = [];
        if (!table.columns) return data;

        // Not including header row in csv
        // const headerRow = table.columns.map(col => col.variableName);
        // data.push(headerRow);

        // Get the maximum length of values
        const maxLength = Math.max(...table.columns.map(col => col.values?.length || 0));

        // Add data rows
        for (let i = 0; i < maxLength; i++) {
            const row = table.columns.map(col => col.values[i] ?? null);
            data.push(row);
        }

        return data;
    }

    /**
     * Create CSV files from table data
     * @param lipd The LiPD data containing tables
     * @param dataDir Directory to write CSV files
     */
    private createCsvs(lipd: LiPDData, dataDir: string): void {
        const csvs: { [key: string]: any[][] } = {};
        const datakeys = ['paleoData', 'chronData'];

        for (const datakey of datakeys) {
            const data = lipd[datakey];
            if (!data) continue;

            for (const item of data) {
                // Handle measurement tables
                if (item.measurementTable) {
                    for (const table of item.measurementTable) {
                        csvs[table.filename] = this.getTableData(table);
                    }
                }

                // Handle model tables
                if (item.model) {
                    for (const model of item.model) {
                        // Handle ensemble tables
                        if (model.ensembleTable) {
                            for (const table of model.ensembleTable) {
                                csvs[table.filename] = this.getTableData(table);
                            }
                        }
                        // Handle summary tables
                        if (model.summaryTable) {
                            for (const table of model.summaryTable) {
                                csvs[table.filename] = this.getTableData(table);
                            }
                        }

                        // Handle distribution tables
                        if (model.distributionTable) {
                            for (const table of model.distributionTable) {
                                csvs[table.filename] = this.getTableData(table);
                            }
                        }                        
                    }
                }
            }
        }

        // Write CSV files
        for (const [csvname, csvdata] of Object.entries(csvs)) {
            const csvContent = csvdata.map(row => row.join(',')).join('\n');
            fs.writeFileSync(path.join(dataDir, csvname), csvContent);
        }
    }

    /**
     * Create bagit files in the data directory
     * @param dataDir Directory to create bagit files in
     * @returns Promise that resolves when bagit files are created
     */
    private createBagitFiles(dataDir: string): Promise<void> {
        const bagInfo = {
            'Bag-Software-Agent': 'lipdjs',
            'Bagging-Date': new Date().toISOString()
        };
        
        return createBagitFiles(dataDir, bagInfo);
    }

    /**
     * Zip a directory into a LiPD file
     * @param dataDir Directory to zip
     * @param lipdfile Output LiPD file path
     * @returns Promise that resolves when the zip file is created
     */
    private zipDirectory(dataDir: string, lipdfile: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const zip = new AdmZip();
            
            const addFilesToZip = (currentPath: string, relativePath: string = '') => {
                const files = fs.readdirSync(currentPath);
                for (const file of files) {
                    const filePath = path.join(currentPath, file);
                    const zipPath = path.join(relativePath, file);
                    
                    if (fs.statSync(filePath).isDirectory()) {
                        addFilesToZip(filePath, zipPath);
                    } else {
                        zip.addLocalFile(filePath, path.dirname(zipPath));
                    }
                }
            };

            addFilesToZip(dataDir);
            
            // Use the callback version of writeZip
            zip.writeZip(lipdfile, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Get property values from query result
     * @param qres Query result containing predicate and object
     * @returns Object with property names and their values
     */
    private _getPropValuesFromQueryResultPO(qres: Quad[]): Record<string, any[]> {
        const result: Record<string, any[]> = {};
        for (const row of qres) {
            const pname = this.localName(row.predicate.id);
            if (!(pname in result)) {
                result[pname] = [];
            }
            
            const value: any = {};
            if (row.object.termType === 'NamedNode') {
                value["@type"] = "uri";
                value["@id"] = row.object.id;
            } else if (row.object.termType === 'Literal') {
                value["@type"] = "literal";
                value["@value"] = row.object.value;
                value["@datatype"] = null; // FIXME: Add datatype
            }
            
            result[pname].push(value);
        }
        return result;
    }

    /**
     * Get facts for a specific ID
     * @param id The ID to query facts for
     * @returns Object containing all properties and values for the ID
     */
    private _getFacts(id: string): Record<string, any[]> {
        const qres = this.store.getQuads(DF.namedNode(id), null, null, null);
        return this._getPropValuesFromQueryResultPO(qres);
    }

    /**
     * Get and index facts for an ID and all related resources
     * @param id The ID to index facts for
     */
    private indexFacts(id: string): void {
        if (id in this.allfacts) {
            return;
        }

        const facts = this._getFacts(id);
        this.allfacts[id] = facts;

        for (const [pname, pfacts] of Object.entries(facts)) {
            for (const pfact of pfacts) {
                if (pfact["@type"] === "uri") {
                    if (pname !== "type") {
                        this.indexFacts(pfact["@id"]);
                    }
                }
            }
        }
    }

    private _convertToLipd(id: string, category?: string, schemaname?: string, pagesdone: Record<string, any> = {}): any {
        if (id in this.allfacts) {
            const facts = this.allfacts[id];
            
            if (id in pagesdone) {
                return pagesdone[id];
            }
            
            const schema = schemaname && this.rschema[schemaname] ? this.rschema[schemaname] : null;
            if (schemaname && !category) {
                category = schemaname;
            }
            
            if ("type" in facts) {
                const cats = facts["type"];
                for (const cat of cats) {
                    if (cat["@type"] === "uri") {
                        category = this.localName(cat["@id"] as any);
                        break;
                    }
                }
            }
            
            const obj: any = {
                "@id": id,
                "@category": category,
                "@schema": schemaname
            };
            
            pagesdone[id] = obj;
            
            for (const [pname, pfacts] of Object.entries(facts)) {
                if (pname in REVERSE_BLACKLIST) {
                    continue;
                }
                
                let prop = pname;
                prop = prop.replace(/\s/g, "_");
                
                // Get a sample value page category, and use to make a property key
                let propkey = prop;
                for (const value of pfacts) {
                    if (value["@type"] === "uri") {
                        if (value["@id"] && value["@id"] in this.allfacts) {
                            const pfact = this.allfacts[value["@id"]];
                            if ("type" in pfact) {
                                const valcats = pfact["type"];
                                for (const valcat of valcats) {
                                    if (valcat["@type"] === "uri") {
                                        const valcatname = this.localName(valcat["@id"] as any);
                                        propkey = prop + "." + valcatname;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                
                const details = this.getRdfPropertyDetails(prop, propkey, schema);
                const name = details.name;
                const ptype = details.type || null;
                let cat = details.category || null;
                let sch = details.schema || null;
                
                if (cat && !sch) {
                    sch = cat;
                }
                
                const toJson = details.toJson || null;
                let multiple = details.multiple || false;
                
                if (pfacts.length > 0) {
                    if (multiple) {
                        obj[name] = [];
                    }
                    
                    for (const pfact of pfacts) {
                        let val;
                        if (pfact["@type"] === "uri") {
                            val = this._convertToLipd(pfact["@id"] as any, cat, sch, pagesdone);
                        } else {
                            val = pfact["@value"];
                        }
                        
                        if (toJson) {
                            val = (this as any)[toJson](val);
                        }
                        
                        // If there is already a value present
                        // - Then this need to be marked as "multiple"
                        if (!multiple && name in obj && !Array.isArray(obj[name])) {
                            multiple = true;
                            obj[name] = [obj[name]];
                        }
                        
                        if (multiple) {
                            obj[name].push(val);
                        } else {
                            obj[name] = val;
                        }
                    }
                }
            }
            
            return obj;
        } else {
            return id.replace(/_/g, " ");
        }
    }

    /**
     * Convert location to GeoJSON format
     * @param geo Location object
     * @param parent Parent object
     * @returns GeoJSON object
     */
    private _location_to_json(geo: any, parent: any = null): GeoJSONFeature {
        const geojson: GeoJSONFeature = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [0, 0, 0]
            },
            properties: {}
        };

        if ("coordinates" in geo) {
            const latlong = geo["coordinates"].split(",");
            geojson.geometry.coordinates = [
                parseFloat(latlong[1]), 
                parseFloat(latlong[0]), 
                latlong.length > 2 ? parseFloat(latlong[2]) : 0
            ];
        }

        if ("long" in geo) {
            geojson.geometry.coordinates[0] = parseFloat(geo["long"]);
        }
        if ("longitude" in geo) {
            geojson.geometry.coordinates[0] = parseFloat(geo["longitude"]);
        }

        if ("lat" in geo) {
            geojson.geometry.coordinates[1] = parseFloat(geo["lat"]);
        }
        if ("latitude" in geo) {
            geojson.geometry.coordinates[1] = parseFloat(geo["latitude"]);
        }

        if ("alt" in geo && geo["alt"] !== "NA") {
            geojson.geometry.coordinates[2] = parseFloat(geo["alt"]);
        }
        if ("elevation" in geo && geo["elevation"] !== "NA") {
            geojson.geometry.coordinates[2] = parseFloat(geo["elevation"]);
        }

        for (const [prop, value] of Object.entries(geo)) {
            if (prop[0] === "@") {
                continue;
            }

            if (prop === "locationType") {
                geojson.type = geo["locationType"];
            } else {
                if (prop === "coordinates" || prop === "coordinatesFor") {
                    // Ignore
                } else if (/^(geo|wgs84):/.test(prop)) {
                    // Ignore
                } else if (["long", "lat", "alt"].includes(prop)) {
                    // Ignore
                } else {
                    geojson.properties[prop] = value;
                }
            }
        }

        return geojson;
    }

    /**
     * Extract Google Spreadsheet key from URL
     * @param url Google Spreadsheet URL
     * @param parent Parent object
     * @returns Google Spreadsheet key
     */
    private getGoogleSpreadsheetKey(url: string, parent: any = null): string {
        return url.replace("https://docs.google.com/spreadsheets/d/", "");
    }

    /**
     * Remove foundInTable property
     * @param variable Variable object
     * @param parent Parent object
     * @returns Variable object without foundInTable
     */
    private removeFoundInTable(variable: any, parent: any = null): any {
        if ("foundInTable" in variable) {
            delete variable["foundInTable"];
        }
        return variable;
    }

    /**
     * Remove foundInDataset property
     * @param variable Variable object
     * @param parent Parent object
     * @returns Variable object without foundInDataset
     */
    private removeFoundInDataset(variable: any, parent: any = null): any {
        if ("foundInDataset" in variable) {
            delete variable["foundInDataset"];
        }
        return variable;
    }

    /**
     * Unwrap uncertainty values
     * @param variable Variable object
     * @param parent Parent object
     * @returns Variable object with unwrapped uncertainty
     */
    private unwrapUncertainty(variable: any, parent: any = null): any {
        if ("hasUncertainty" in variable) {
            const unc = variable["hasUncertainty"];
            if ("hasValue" in unc) {
                variable["uncertainty"] = parseFloat(unc["hasValue"]);
                delete unc["hasValue"];
            }

            for (const [key, value] of Object.entries(unc)) {
                if (key[0] !== "@") {
                    variable[key] = value;
                }
            }

            delete variable["hasUncertainty"];
        }
        return variable;
    }

    /**
     * Unwrap integration time
     * @param interp Interpretation object
     * @param parent Parent object
     * @returns Interpretation object with unwrapped integration time
     */
    private unwrapIntegrationTime(interp: any, parent: any = null): any {
        if ("integrationTime" in interp) {
            const intime = interp["integrationTime"];
            if ("hasValue" in intime) {
                interp["integrationTime"] = parseFloat(intime["hasValue"]);
                delete intime["hasValue"];
            }

            for (const [key, value] of Object.entries(intime)) {
                if (key[0] !== "@") {
                    interp["integrationTime" + ucfirst(key)] = value;
                }
            }

            delete interp["hasIntegrationTime"];
        }
        return interp;
    }

    /**
     * Collect variables by ID
     * @param item Item to process
     * @param arr Array of collected variables
     * @returns Updated array of collected variables
     */
    private collectVariablesById(item: any, arr: { [key: string]: any }): { [key: string]: any } {
        if (typeof item !== 'object' || item === null) {
            return arr;
        }

        if ("@category" in item && "@id" in item && /Variable$/.test(item["@category"])) {
            arr[item["@id"]] = item;
        } else {
            for (const [key, value] of Object.entries(item)) {
                if (key[0] !== "@") {
                    arr = this.collectVariablesById(item[key], arr);
                }
            }
        }
        return arr;
    }

    /**
     * Set archive type label
     * @param ds Dataset object
     * @param parent Parent object
     * @returns Dataset object with archive type label
     */
    private setArchiveTypeLabel(ds: any, parent: any = null): any {
        if ("hasArchiveType" in ds) {
            if ("@id" in ds["hasArchiveType"]) {
                const id = ds["hasArchiveType"]["@id"];
                if (RSYNONYMS && id in RSYNONYMS) {
                    ds["archiveType"] = RSYNONYMS[id];
                } else {
                    ds["archiveType"] = ds["hasArchiveType"]["label"];
                }
            }
            delete ds["hasArchiveType"];
        }
        return ds;
    }

    /**
     * Set variable name from standard variable label
     * @param variable Variable object
     * @param parent Parent object
     * @returns Variable object with variable name
     */
    private setVariableNameFromStandardVariableLabel(variable: any, parent: any = null): any {
        if ("hasStandardVariable" in variable) {
            if ("@id" in variable["hasStandardVariable"]) {
                const id = variable["hasStandardVariable"]["@id"];
                if (RSYNONYMS && id in RSYNONYMS) {
                    variable["variableName"] = RSYNONYMS[id];
                } else {
                    variable["variableName"] = variable["hasStandardVariable"]["label"];
                }
            }
            delete variable["hasStandardVariable"];
        }
        return variable;
    }

    /**
     * Set units label
     * @param variable Variable object
     * @param parent Parent object
     * @returns Variable object with units label
     */
    private setUnitsLabel(variable: any, parent: any = null): any {
        if ("hasUnits" in variable) {
            if ("@id" in variable["hasUnits"]) {
                const id = variable["hasUnits"]["@id"];
                if (RSYNONYMS && id in RSYNONYMS) {
                    variable["units"] = RSYNONYMS[id];
                } else {
                    variable["units"] = variable["hasUnits"]["label"];
                }
            }
            delete variable["hasUnits"];
        }
        return variable;
    }

    /**
     * Set proxy label
     * @param variable Variable object
     * @param parent Parent object
     * @returns Variable object with proxy label
     */
    private setProxyLabel(variable: any, parent: any = null): any {
        if ("hasProxy" in variable) {
            if ("@id" in variable["hasProxy"]) {
                const id = variable["hasProxy"]["@id"];
                if (RSYNONYMS && id in RSYNONYMS) {
                    variable["proxy"] = RSYNONYMS[id];
                } else {
                    variable["proxy"] = variable["hasProxy"]["label"];
                }
            }
            delete variable["hasProxy"];
        }
        return variable;
    }

    /**
     * Set proxy general label
     * @param variable Variable object
     * @param parent Parent object
     * @returns Variable object with proxy general label
     */
    private setProxyGeneralLabel(variable: any, parent: any = null): any {
        if ("hasProxyGeneral" in variable) {
            if ("@id" in variable["hasProxyGeneral"]) {
                const id = variable["hasProxyGeneral"]["@id"];
                if (RSYNONYMS && id in RSYNONYMS) {
                    variable["proxyGeneral"] = RSYNONYMS[id];
                } else {
                    variable["proxyGeneral"] = variable["hasProxyGeneral"]["label"];
                }
            }
            delete variable["hasProxyGeneral"];
        }
        return variable;
    }

    /**
     * Set interpretation variable label
     * @param interp Interpretation object
     * @param parent Parent object
     * @returns Interpretation object with variable label
     */
    private setInterpretationVariableLabel(interp: any, parent: any = null): any {
        if ("hasVariable" in interp) {
            if ("@id" in interp["hasVariable"]) {
                const id = interp["hasVariable"]["@id"];
                if (RSYNONYMS && id in RSYNONYMS) {
                    interp["variable"] = RSYNONYMS[id];
                } else {
                    interp["variable"] = interp["hasVariable"]["label"];
                }
            }
            delete interp["hasVariable"];
        }
        return interp;
    }

    /**
     * Set seasonality labels
     * @param interp Interpretation object
     * @param parent Parent object
     * @returns Interpretation object with seasonality labels
     */
    private setSeasonalityLabels(interp: any, parent: any = null): any {
        const convs: { [key: string]: string } = {
            "hasSeasonality": "seasonality",
            "hasSeasonalityGeneral": "seasonalityGeneral",
            "hasSeasonalityOriginal": "seasonalityOriginal"
        };
        
        for (const [pid, nid] of Object.entries(convs)) {
            if (pid in interp) {
                if ("@id" in interp[pid]) {
                    const id = interp[pid]["@id"];
                    if (RSYNONYMS && id in RSYNONYMS) {
                        interp[nid] = RSYNONYMS[id];
                    } else {
                        interp[nid] = interp[pid]["label"];
                    }
                }
                delete interp[pid];
            }
        }
        return interp;
    }

    /**
     * Create publication identifier
     * @param pub Publication object
     * @param parent Parent object
     * @returns Publication object with identifier
     */
    private createPublicationIdentifier(pub: any, parent: any = null): any {
        const identifiers = [];
        if ("hasDOI" in pub) {
            const identifier: { [key: string]: string } = {
                "type": "doi",
                "id": pub["hasDOI"]
            };
            
            if ("link" in pub) {
                for (const link of Object.values(pub["link"])) {
                    if (typeof link === 'string' && /dx\.doi\.org/.test(link)) {
                        identifier["url"] = link;
                    }
                }
                delete pub["link"];
            }
            delete pub["hasDOI"];
            identifiers.push(identifier);
        }

        pub["identifier"] = identifiers;
        return pub;
    }

    /**
     * Convert values to array
     * @param resolution Resolution object
     * @param parent Parent object
     * @returns Array of values
     */
    private valuesToArray(resolution: any, parent: any = null): any {
        if ("values" in resolution) {
            return resolution["values"].split(",");
        }
        return resolution;
    }

    /**
     * Unarray column number
     * @param variable Variable object
     * @param parent Parent object
     * @returns Variable object with unarrayed number
     */
    private unArrayColumnNumber(variable: any, parent: any = null): any {
        if (!variable) return variable;
        
        if ("number" in variable) {
            if (Array.isArray(variable["number"]) && variable["number"].length === 1) {
                variable["number"] = variable["number"][0];
            }
            if (typeof variable["number"] === 'string') {
                variable["number"] = JSON.parse(variable["number"]);
            }
        }
        
        return variable;
    }

    /**
     * Extract variable values
     * @param variable Variable object
     * @param parent Parent object
     * @returns Variable object with extracted values
     */
    private extractVariableValues(variable: any, parent: any = null): any {
        if ("hasValues" in variable) {
            const valuestr = variable["hasValues"];
            const values = parseVariableValues(valuestr);
            if (typeof values === 'object' && values !== null && "base64_zlib" in values) {
                variable["hasValues"] = this.unzipString(values["base64_zlib"]);
            }
            else {
                variable["hasValues"] = values;
            }
        }
        return variable;
    }
    
    /**
     * Unzip a base64 encoded and zlib compressed string
     * @param string The base64 encoded and zlib compressed string
     * @returns The uncompressed string
     */
    private unzipString(string: string): string {
        try {
            // Convert base64 to binary
            const binaryString = Buffer.from(string, 'base64');
            
            // Decompress using zlib
            const decompressed = require('zlib').inflateSync(binaryString);
            
            // Convert buffer to string
            return decompressed.toString('utf-8');
        } catch (error) {
            logger.error('Could not decode/unzip the contents');
            throw new Error('Could not decode/unzip the contents');
        }
    }
} 
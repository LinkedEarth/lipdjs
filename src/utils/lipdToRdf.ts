/**
 * The LipdToRDF class helps in converting a LiPD file to an RDF Graph.
 * It uses the SCHEMA object (from globals/schema.ts) to do the conversion
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import AdmZip from 'adm-zip';
import * as Papa from 'papaparse';
import { Store } from 'n3';
import { DataFactory } from 'n3';
import { Logger } from '../utils/logger';
import { ONTONS, NAMESPACES, NSURL, DATAURL } from '../globals/urls';
import { SCHEMA } from '../globals/schema';
import { SYNONYMS } from '../globals/synonyms';

import { uniqid, sanitizeId, ucfirst, lcfirst, camelCase, escape, serializeStore } from './utils';
import { BLACKLIST } from '../globals/blacklist';
import { ChangeLog } from '../classes/changelog';
import JSZip from 'jszip';
import { isBrowser } from './env';

// Get the logger instance
const logger = Logger.getInstance();
const DF = DataFactory

function expandSchema(schema: any): any {
    // Clone schema to avoid modifying the original
    const expandedSchema = JSON.parse(JSON.stringify(schema));
    
    // Expand schema by adding alternate keys
    for (const key in expandedSchema) {
        for (const lipdKey in expandedSchema[key]) {
            const pdetails = expandedSchema[key][lipdKey];
            
            // Skip if not an object
            if (typeof pdetails !== 'object' || pdetails === null) {
                continue;
            }
            
            // Add alternates if they exist
            if (pdetails.alternates && Array.isArray(pdetails.alternates)) {
                for (const altKey of pdetails.alternates) {
                    expandedSchema[key][altKey] = { ...pdetails };
                }
            }
        }
    }
    // Mark as expanded
    expandedSchema.__expanded = true;
    return expandedSchema;
}

export class LipdToRDF {
    public store: Store;
    public graphUrl: string;
    public namespaces: {
        ont: any;
        rdf: any;
        rdfs: any;
        xsd: any;
        owl: any;
        wgs84: any;
    };
    private lipdCsvs: { [key: string]: any[][] } = {};
    private standardize: boolean;
    private addLabels: boolean;
    private schema: any;
    private namespace: string;

    constructor(standardize: boolean = true, addLabels: boolean = true) {
        this.store = new Store();
        this.graphUrl = NSURL;
        this.namespace = NSURL + "/"
        
        // Define namespaces using DataFactory
        this.namespaces = {
            ont: DF.namedNode(ONTONS),
            rdf: DF.namedNode(NAMESPACES.rdf),
            rdfs: DF.namedNode(NAMESPACES.rdfs),
            xsd: DF.namedNode(NAMESPACES.xsd),
            owl: DF.namedNode(NAMESPACES.owl),
            wgs84: DF.namedNode(NAMESPACES.wgs84)
        };
        this.standardize = standardize;
        this.addLabels = addLabels;
        this.schema = expandSchema(JSON.parse(JSON.stringify(SCHEMA)));
        logger.debug('LipdToRDF instance created with standardize=%s, addLabels=%s', standardize, addLabels);
    }

    /**
     * Convert LiPD file to RDF Graph
     * @param lipdPath Path to LiPD file (can be a local file or URL)
     */
    public async convert(lipdPath: string): Promise<void> {
        logger.debug('Starting conversion of LiPD file: %s', lipdPath);
        
        if (isBrowser()) {
            await this._convertBrowser(lipdPath);
            logger.debug('Browser conversion completed');
            return;
        }
        
        // Reset graph
        for (const quad of this.store.getQuads(null, null, null, null)) {
            this.store.removeQuad(quad);
        }
        
        // Get the base name of the LiPD file
        const lpdName = path.basename(lipdPath).replace('.lpd', '').replace(/\?.+$/, '');
        this.graphUrl = NSURL + "/" + lpdName;
        logger.debug('Set graph URL to: %s', this.graphUrl);
        
        // Create a temporary directory
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lipd_to_rdf_'));
        logger.debug('Created temporary directory: %s', tmpDir);
        
        try {
            // Unzip the LiPD file
            logger.debug('Unzipping LiPD file to temporary directory');
            this._unzipLipdFile(lipdPath, tmpDir);
            
            // Find JSON-LD files
            logger.debug('Looking for JSON-LD files in the extracted content');
            const jsons = this._findFilesWithExtension(tmpDir, 'jsonld');
            logger.debug('Found %d JSON-LD files', jsons.length);
            
            // Process each JSON-LD file
            for (const [jsonPath, jsonName] of jsons) {
                logger.debug('Processing JSON-LD file: %s', jsonName);
                const jsonDir = path.dirname(jsonPath);
                
                // Find CSV files
                logger.debug('Looking for CSV files in %s', jsonDir);
                const csvs = this._findFilesWithExtension(jsonDir, 'csv');
                logger.debug('Found %d CSV files', csvs.length);

                // Reset the CSV cache
                this.lipdCsvs = {};
                                
                // Load each CSV file
                for (const [csvPath, csvName] of csvs) {
                    try {
                        logger.debug('Processing CSV file: %s', csvName);
                        // Read the CSV file
                        const csvData = fs.readFileSync(csvPath, 'utf8');
                        // Parse the CSV
                        const parsedCsv = Papa.parse(csvData, { header: false });
                        
                        if (parsedCsv.data && Array.isArray(parsedCsv.data)) {
                            this.lipdCsvs[csvName] = parsedCsv.data as any[][];
                            logger.debug('Successfully loaded CSV file: %s', csvName);
                        }
                    } catch (error) {
                        logger.warn('CSV file %s might have inconsistent columns: %s', csvName, error instanceof Error ? error.message : String(error));
                        // Try to detect columns and load
                        this.lipdCsvs[csvName] = this._detectColumnsAndLoad(csvPath);
                    }
                }
                
                // Process the JSON file
                logger.debug('Loading JSON-LD data into RDF graph');
                this._loadLipdJsonToGraph(jsonPath);
            }
            
            logger.debug('Conversion completed successfully');
        } catch (error) {
            logger.error('Error during conversion: %s', error instanceof Error ? error.message : String(error));
            throw error;
        } finally {
            // Clean up the temporary directory
            try {
                logger.debug('Cleaning up temporary directory: %s', tmpDir);
                fs.rmSync(tmpDir, { recursive: true });
            } catch (error) {
                logger.error('Error cleaning up temporary directory: %s', error instanceof Error ? error.message : String(error));
            }
        }
    }

    /**
     * Load LiPD file from a File object (for browser file input)
     * @param file File object from HTML5 file input
     */
    public async loadFromFile(file: File): Promise<void> {
        if (!isBrowser()) {
            throw new Error('loadFromFile() is only available in browser environments');
        }

        logger.debug('Loading LiPD file from File object: %s', file.name);
        
        try {
            // Reset graph
            for (const quad of this.store.getQuads(null, null, null, null)) {
                this.store.removeQuad(quad);
            }

            // Read file as ArrayBuffer
            const arrayBuffer = await file.arrayBuffer();

            // Load with JSZip
            const zip = await JSZip.loadAsync(arrayBuffer);

            // Set graph URL based on filename
            const lpdName = file.name.replace('.lpd', '').replace(/\?.+$/, '');
            this.graphUrl = NSURL + "/" + sanitizeId(lpdName);
            logger.debug('Set graph URL to: %s', this.graphUrl);

            // Reset CSV cache
            this.lipdCsvs = {};

            // Separate CSV and JSON entries for two-pass processing
            const csvEntries: Array<[string, JSZip.JSZipObject]> = [];
            const jsonEntries: JSZip.JSZipObject[] = [];

            for (const fileName of Object.keys(zip.files)) {
                const zipFile = zip.files[fileName];
                if (zipFile.dir) continue;

                if (fileName.endsWith('.csv')) {
                    csvEntries.push([fileName, zipFile]);
                } else if (fileName.endsWith('.jsonld')) {
                    jsonEntries.push(zipFile);
                }
            }

            // Pass 1: cache CSVs
            for (const [fileName, zipFile] of csvEntries) {
                const csvContent = await zipFile.async('string');
                const parsedCsv = Papa.parse(csvContent, { header: false });
                this.lipdCsvs[fileName] = parsedCsv.data as any[][];
                const baseName = fileName.split('/').pop();
                if (baseName) {
                    this.lipdCsvs[baseName] = parsedCsv.data as any[][];
                }
                logger.debug(`Loaded CSV '${fileName}' (${parsedCsv.data.length}×${((parsedCsv.data as any[])[0] as any[]).length || 0})`);
            }

            // Pass 2: process JSON after CSVs are ready
            for (const zipFile of jsonEntries) {
                const jsonContent = await zipFile.async('string');
                this._loadLipdJsonString(jsonContent);
            }

            logger.debug('File loading completed successfully');
        } catch (error) {
            logger.error('Error loading LiPD file from File object: %s', error instanceof Error ? error.message : String(error));
            throw error;
        }
    }

    /**
     * Detect the number of columns in a CSV and load it
     * @param filePath Path to the CSV file
     * @returns Parsed CSV data as array of arrays
     */
    private _detectColumnsAndLoad(filePath: string): any[][] {
        // Detect number of columns
        let numColumns = 0;
        const lines = fs.readFileSync(filePath, 'utf8').split('\n');
        
        for (const line of lines) {
            const num = line.split(',').length;
            if (num > numColumns) {
                numColumns = num;
            }
        }
        
        // Parse the CSV with the detected number of columns
        const csvData = fs.readFileSync(filePath, 'utf8');
        const parsedCsv = Papa.parse(csvData, { header: false });
        return parsedCsv.data as any[][];
    }

    /**
     * Write LiPD RDF Graph to a file
     * @param toPath Path to output file
     * @param type Output format ('json', 'turtle', 'n3', 'ntriples', etc.)
     */
    public async serialize(toPath: string, type: string = 'turtle'): Promise<void> {
        logger.debug('Serializing graph to %s in %s format', toPath, type);
        
        if (this.store) {
            try {
                const serialized = await serializeStore(this.store, type, logger);
                fs.writeFileSync(toPath, serialized);
                logger.debug('Successfully wrote graph to: %s', toPath);
            } catch (error) {
                logger.error('Error serializing graph: %s', error instanceof Error ? error.message : String(error));
                throw new Error(`Failed to serialize graph: ${error instanceof Error ? error.message : String(error)}`);
            }
        } else {
            logger.error('Cannot serialize: Graph is null or undefined');
            throw new Error('Cannot serialize: Graph is null or undefined');
        }
    }

    /**
     * Write LiPD RDF Graph to a file
     * @param toPath Path to output file
     * @param type Output format ('json', 'turtle', 'n3', 'ntriples', etc.)
     */
    public async toString(type: string = 'turtle'): Promise<string> {
        if (this.store) {
            try {
                let serialized: string | undefined;
                serialized = await serializeStore(this.store, type, logger);
                
                return serialized || '';
            } catch (error) {
                logger.error('Error serializing graph:', error);
                throw new Error(`Failed to serialize graph: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
        return '';
    }

    /**
     * Unzip a LiPD file to a directory
     * @param lipdFile Path to the LiPD file
     * @param unzipDir Directory to extract to
     */
    private _unzipLipdFile(lipdFile: string, unzipDir: string): void {
        try {
            if (lipdFile.startsWith('http')) {
                // If this is a URL, fetch it first (would use fetch API in a full implementation)
                throw new Error('URL-based LiPD files not yet supported in this implementation');
            } else {
                // If this is a local file, unzip it
                logger.debug('Unzipping local file: %s to %s', lipdFile, unzipDir);
                const zip = new AdmZip(lipdFile);
                zip.extractAllTo(unzipDir, true);
                logger.debug('Unzipping completed successfully');
            }
        } catch (error) {
            logger.error('Error unzipping LiPD file: %s', error instanceof Error ? error.message : String(error));
            throw new Error(`Failed to unzip LiPD file: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * Find files with a specific extension in a directory (recursively)
     * @param directory Directory to search in
     * @param extension File extension to look for
     * @returns Array of [filePath, fileName] tuples
     */
    private _findFilesWithExtension(directory: string, extension: string): Array<[string, string]> {
        const regex = new RegExp(`\\.${extension}$`);
        const results: Array<[string, string]> = [];
        
        try {
            const entries = fs.readdirSync(directory, { withFileTypes: true });
            
            for (const entry of entries) {
                const entryPath = path.join(directory, entry.name);
                
                if (entry.isFile() && regex.test(entry.name)) {
                    results.push([entryPath, entry.name]);
                } else if (entry.isDirectory()) {
                    // Recursively search subdirectories
                    const subResults = this._findFilesWithExtension(entryPath, extension);
                    results.push(...subResults);
                }
            }
        } catch (error) {
            logger.error(`Cannot access ${directory}. Probably a permissions error:`, error);
        }
        return results;
    }

    /**
     * Load LiPD JSON data into the RDF graph
     * @param jsonPath Path to the JSON file
     * @param url Optional URL of the LiPD file
     */
    private _loadLipdJsonToGraph(jsonPath: string, url?: string): void {
        logger.debug('Loading JSON file to graph: %s', jsonPath);
        for (const quad of this.store.getQuads(null, null, null, null)) {
            this.store.removeQuad(quad);
        }
        
        try {
            // Read and parse the JSON file
            const jsonContent = fs.readFileSync(jsonPath, 'utf8');
            const obj = JSON.parse(jsonContent);
            logger.debug('JSON file parsed successfully');
            
            // Set the graph URL based on dataset name if available
            if (obj.dataSetName) {
                this.graphUrl = NSURL + "/" + sanitizeId(obj.dataSetName);
                logger.debug('Updated graph URL based on dataset name: %s', this.graphUrl);
            }
            
            // Map the LiPD data to RDF
            logger.debug('Mapping LiPD data to RDF structure');
            const objHash: Record<string, any> = {};
            this._mapLipdToJson(obj, null, null, 'Dataset', 'Dataset', objHash);
            
            // Set URL if provided
            if (url) {
                objHash[obj['@id']].hasUrl = url;
                logger.debug('Set URL from parameter: %s', url);
            } else if (obj['@id']) {
                objHash[obj['@id']].hasUrl = DATAURL + "/" + obj['@id'] + '.lpd';
                logger.debug('Set derived URL: %s', DATAURL + "/" + obj['@id'] + '.lpd');
            }
            
            // Create individuals for all objects in the hash
            logger.debug('Creating RDF individuals for %d objects', Object.keys(objHash).length);
            for (const [key, item] of Object.entries(objHash)) {
                this._createIndividualFull(item);
            }
            
            logger.debug('Successfully loaded JSON data into RDF graph');
        } catch (error) {
            logger.error('Error loading JSON to graph: %s', error instanceof Error ? error.message : String(error));
            throw new Error(`Failed to load JSON to graph: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * Map LiPD JSON data to a structured format suitable for RDF conversion
     * @param obj The JSON object to map
     * @param parent Parent object
     * @param index Index in parent's array
     * @param category Category of the object
     * @param schemaName Schema name to use
     * @param hash Object hash for storing objects by ID
     * @returns ID of the created object
     */
    private _mapLipdToJson(obj: any, parent: any, index: any, category: string, schemaName: string, hash: Record<string, any>): string {
        const schema = this.schema[schemaName] ? this.schema[schemaName] : {};
        
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        
        obj['@parent'] = parent;
        obj['@index'] = index;
        obj['@schema'] = schemaName;
        
        let objId = this.getObjectId(obj, category, schema);
        if ('@id' in obj) {
            objId = obj['@id'];
        }
        if (objId in hash) {
            return objId;
        }
        obj['@id'] = objId;
        
        [obj, hash] = this.modifyStructureIfNeeded(obj, hash, schema);
        
        if ('@category' in obj) {
            category = obj['@category'];
        }
        hash[objId] = {
            '@id': objId,
            '@category': category,
            '@schema': schemaName
        };
        const item = hash[objId];
        
        if (typeof obj === 'object') {
            for (const [propKey, value] of Object.entries(obj)) {
                if (propKey[0] === '@') {
                    continue;
                }
                
                if (propKey in BLACKLIST) {
                    continue;
                }
                
                let details: any = {};
                let pname = propKey;
                if (propKey in schema) {
                    details = schema[propKey];
                    pname = details['name'] ? details['name'] : propKey;
                }
                
                const dtype = details['type'] ? details['type'] : null;
                let cat = details['category'] ? details['category'] : null;
                let sch = details['schema'] ? details['schema'] : null;
                const fromJson = details['fromJson'] ? details['fromJson'] : null;
                
                if (sch && !cat) {
                    cat = sch;
                }
                
                if (fromJson) {
                    const fn = this[fromJson as keyof this] as Function;
                    const processedValue = fn.call(this, value, obj);
                    
                    if (!processedValue) {
                        continue;
                    }
                    
                    if (pname) {
                        if (Array.isArray(processedValue)) {
                            let idx = 1;
                            for (const subValue of processedValue) {
                                if (typeof subValue === 'object') {
                                    if (!(propKey in item)) {
                                        item[propKey] = [];
                                    }
                                    item[propKey].push(this._mapLipdToJson(subValue, obj, idx, cat, sch, hash));
                                    idx++;
                                }
                            }
                        } else if (typeof processedValue === 'object') {
                            item[propKey] = this._mapLipdToJson(processedValue, obj, null, cat, sch, hash);
                        } else {
                            item[propKey] = processedValue;
                        }
                    } else if (typeof processedValue === 'object') {
                        for (const [subPropKey, subValue] of Object.entries(processedValue)) {
                            item[subPropKey] = subValue;
                        }
                    }
                    continue;
                }
                
                if (!pname) {
                    continue;
                }
                
                if (Array.isArray(value)) {
                    let idx = 1;
                    for (const subValue of value) {
                        if (!(propKey in item)) {
                            item[propKey] = [];
                        }
                        item[propKey].push(this._mapLipdToJson(subValue, obj, idx, cat, sch, hash));
                        idx++;
                    }
                } else if (typeof value === 'object') {
                    if (!(propKey in item)) {
                        item[propKey] = [];
                    }
                    item[propKey].push(this._mapLipdToJson(value, obj, null, cat, sch, hash));
                } else {
                    if (dtype === 'Individual') {
                        item[propKey] = value;
                        if (!(String(value) in hash)) {
                            hash[String(value)] = {
                                '@id': value,
                                '@category': cat,
                                '@schema': sch
                            };
                        }
                    } else {
                        item[propKey] = value;
                    }
                }
            }
        }
        
        hash[objId] = item;
        return objId;
    }


    /**
     * Get compound key ID from an object
     * @param compoundKey Array of keys to traverse the object
     * @param obj Object to extract value from
     * @returns The value at the end of the key path or null if not found
     */
    private getCompoundKeyId(compoundKey: string[], obj: any): any {
        let tobj = obj;
        
        for (const key of compoundKey) {
            if (typeof tobj === 'object' && tobj !== null && key in tobj) {
                tobj = tobj[key];
            } else {
                return null;
            }
        }
        
        if (typeof tobj !== 'object' || tobj === null) {
            return tobj;
        }
        
        return null;
    }
    
    /**
     * Get binding key ID from an object
     * @param key Key or compound key (separated by dots) or alternative keys (separated by pipes)
     * @param obj Object to extract value from
     * @returns The value found or a unique ID if not found
     */
    private getBindingKeyId(key: string, obj: any): string {
        const keyOptions = key.split('|');
        
        for (const optKey of keyOptions) {
            const compoundKey = optKey.split('.');
            const keyId = this.getCompoundKeyId(compoundKey, obj);
            
            if (keyId) {
                return String(keyId);
            }
        }
        
        return uniqid();
    }
    
    /**
     * Apply a function to a key ID
     * @param fn Function name to apply
     * @param arg Argument for the function
     * @param curObjId Current object ID
     * @returns Modified object ID
     */
    private getFunctionKeyId(fn: string, arg: string, curObjId: string): string {
        if (fn === 'trunc') {
            return curObjId.substring(0, curObjId.length - parseInt(arg));
        } else if (fn === 'uniqid') {
            return String(curObjId) + uniqid(arg);
        }
        
        return curObjId;
    }
    
    /**
     * Create an ID from a pattern
     * @param pattern Array of pattern parts
     * @param obj Object to extract values from
     * @returns Generated ID string
     */
    private createIdFromPattern(pattern: string[], obj: any): string {
        let objId = '';
        
        for (const key of pattern) {
            const bindingMatch = key.match(/{(.+)}/);
            
            if (bindingMatch && bindingMatch.length > 1) {
                objId += String(this.getBindingKeyId(bindingMatch[1], obj));
            } else {
                const funcMatch = key.match(/_(.+)\((.*)\)/);
                
                if (funcMatch && funcMatch.length > 2) {
                    const fn = funcMatch[1];
                    const arg = funcMatch[2];
                    objId = String(this.getFunctionKeyId(fn, arg, objId));
                } else {
                    objId += String(key);
                }
            }
        }
        
        return objId;
    }
    
    /**
     * Fix title by replacing problematic characters
     * @param titleId Title ID to fix
     * @returns Fixed title ID
     */
    private fixTitle(titleId: string): string {
        return titleId.replace(/@\\x{FFFD}@u/g, '_');
    }
    
    /**
     * Get object ID based on schema and category
     * @param obj Object to generate ID for
     * @param category Category of the object
     * @param schema Schema definition
     * @returns Generated object ID
     */
    private getObjectId(obj: any, category: string, schema: any): string {
        let objId: string;
        
        if (typeof obj === 'object' && obj !== null) {
            objId = "Unknown." + uniqid(category);
        } else {
            objId = ucfirst(String(obj)).replace(/\s/g, '_');
        }
        
        if (schema && '@id' in schema) {
            objId = this.createIdFromPattern(schema['@id'], obj);
        }
        
        return this.fixTitle(objId);
    }

    /**
     * Modify the object structure if needed based on schema
     * @param obj Object to modify
     * @param hash Object hash
     * @param schema Schema definition
     * @returns [modified object, modified hash]
     */
    private modifyStructureIfNeeded(obj: any, hash: any, schema: any): [any, any] {
        if (schema['@fromJson']) {
            for (const func of schema['@fromJson']) {
                if (func in this) {
                    const fn = this[func as keyof LipdToRDF];
                    if (typeof fn === 'function') {
                        const result = (fn as Function).call(this, obj, hash);
                        if (Array.isArray(result) && result.length >= 2) {
                            [obj, hash] = result;
                        }
                    }
                }
            }
        }
        return [obj, hash];
    }
    
    /**
     * Guess the data value type based on string pattern
     * @param val Value to analyze
     * @returns Detected data type
     */
    private _guessDataValueType(val: any): string {
        const value = String(val);
        
        if (/^-?\d+$/.test(value)) {
            return "float"; // "integer"
        }
        
        if (/^-?\d+\.\d+$/.test(value)) {
            return "float";
        }
        
        if (/^[2][0-9]{3}[-][0-1][0-9][-][0-3][0-9]( |T)[0-9]{2}:[0-9]{2}:[0-9]{2}/.test(value)) {
            return "datetime";
        }
        
        if (/^[2][0-9]{3}[-][0-1][0-9][-][0-3][0-9]/.test(value)) {
            return "date";
        }
        
        if (/^(true|false)$/i.test(value)) {
            return "boolean";
        }
        
        if (/^http/.test(value)) {
            return "url";
        }
        
        // if (/^.+@.+\..+/.test(value)) {
        //     return "Email";
        // }
        
        if (/^".+"$/.test(value)) {
            return "string";
        }
        
        if (/^'.+'$/.test(value)) {
            return "string";
        }
        
        return "string";
    }
    
    /**
     * Guess the value type for any kind of value
     * @param value Value to analyze
     * @returns Detected data type
     */
    private _guessValueType(value: any): string {
        if (value) {
            if (Array.isArray(value)) {
                for (const subvalue of value) {
                    return this._guessValueType(subvalue);
                }
            } else if (typeof value === 'object' && value !== null) {
                return "Individual";
            } else {
                const valtype = this._guessDataValueType(value);
                return valtype;
            }
        }
        
        return "string";
    }
    
    /**
     * Get property details from schema and value
     * @param key Property key
     * @param schema Schema definition
     * @param value Property value
     * @returns Property details object
     */
    private getPropertyDetails(key: string, schema: any, value: any): any {
        let pname = key;
        const details: Record<string, any> = {
            "name": pname
        };
        
        if (key in schema && "@@processed" in schema[key]) {
            return schema[key];
        }
        
        // Get details from schema
        if (key in schema) {
            for (const [skey, svalue] of Object.entries(schema[key])) {
                details[skey] = svalue;
            }
        }
        
        if ("schema" in details) {
            details["type"] = "Individual";
        }
        
        pname = lcfirst(details["name"]);
        
        if (!("type" in details)) {
            details["type"] = this._guessValueType(value);
            if (!("type" in details)) {
                details["type"] = "string";
            }
        }
        
        details["@@processed"] = true;
        schema[key] = details;
        return details;
    }

    
    /**
     * Create an individual
     * @param objId ID of the individual
     * @returns Fully qualified URI for the individual
     */
    private createIndividual(objId: string): string {
        return this.namespace + sanitizeId(objId);
    }
    
    /**
     * Create a class
     * @param category Category name
     * @returns Fully qualified URI for the class
     */
    private createClass(category: string): string {
        return ONTONS + sanitizeId(category);
    }
    
    /**
     * Create a property
     * @param prop Property name
     * @param dtype Data type
     * @param cat Category
     * @param multiple Whether the property can have multiple values
     * @returns [property URI, data type, category, multiple flag]
     */
    private createProperty(prop: string, dtype: string, cat: string, multiple: boolean): [string, string, string, boolean] {
        const nsProp = prop.split(':', 2);
        let ns = ONTONS;
        
        if (nsProp.length > 1) {
            const prefix = nsProp[0];
            if (prefix in NAMESPACES) {
                ns = NAMESPACES[prefix];
            }
            prop = nsProp[1];
        }
        
        return [ns + lcfirst(sanitizeId(prop)), dtype, cat, multiple];
    }
    
    /**
     * Set individual classes
     * @param objId ID of the individual
     * @param category Primary category
     * @param extraCats Additional categories
     */
    private setIndividualClasses(objId: string, category: string | null, extraCats: string[]): void {
        if (objId && category) {
            this.store.addQuad(
                DF.quad(
                    DF.namedNode(objId),
                    DF.namedNode(NAMESPACES.rdf + 'type'),
                    DF.namedNode(category),
                    DF.namedNode(this.graphUrl)
                )
            );
        }
        
        for (const ecat of extraCats) {
            if (objId && ecat) {
                this.store.addQuad(
                    DF.quad(
                        DF.namedNode(objId),
                        DF.namedNode(NAMESPACES.rdf + 'type'),
                        DF.namedNode(this.createClass(ecat)),
                        DF.namedNode(this.graphUrl)
                    )
                );
            }
        }
    }
    
    /**
     * Set object label
     * @param objId ID of the object
     * @param label Label to set
     */
    private setObjectLabel(objId: string, label: string): void {
        if (objId && label) {
            DF.quad
            this.store.addQuad(
                DF.quad(
                    DF.namedNode(objId),
                    DF.namedNode(NAMESPACES.rdfs + 'label'),
                    DF.literal(label),
                    DF.namedNode(this.graphUrl)
                )
            );
        }
    }
    
    /**
     * Set property value
     * @param objId ID of the object
     * @param prop Property details (from _createProperty)
     * @param value Value to set
     */
    private setPropertyValue(objId: string, prop: [string, string, string, boolean], value: any): void {
        if (Array.isArray(value)) {
            for (const subValue of value) {
                this.setPropertyValue(objId, prop, subValue);
            }
            return;
        }
        
        const [propId, dtype, cat, multiple] = prop;
        if (!objId || value === null || value === undefined) {
            return;
        }
        
        let objItem = null;
        
        // Handle special values for numeric types
        if (dtype === 'float' || dtype === 'integer') {
            if (String(value).toLowerCase().includes('nan')) return;
            if (String(value).toLowerCase().includes('na')) return;
        }
        
        // Escape string values
        if (typeof value === 'string') {
            value = escape(value);
        }
        
        // Convert to appropriate type
        if (dtype === 'boolean') {
            value = String(value).toLowerCase();
            if (value !== 'true') {
                value = 'false';
            }
        } else if (dtype === 'float') {
            const match = String(value).match(/(-?\d+\.?\d*)/);
            if (match) {
                value = match[1];
            } else {
                value = 0.0;
            }
        } else if (dtype === 'integer') {
            const match = String(value).match(/(-?\d+)/);
            if (match) {
                value = match[1];
            } else {
                value = 0;
            }
        }
        
        // Create the appropriate RDF object
        if (dtype === 'Individual') {
            value = this.createIndividual(value);
            objItem = DF.namedNode(value);
        } else if (dtype === 'EnumeratedIndividual') {
            objItem = DF.namedNode(value);
        } else if (dtype === 'List') {
            objItem = value;
        } else {
            // Get XSD datatype URI
            let datatype = undefined;
            if (dtype === 'float') datatype = DF.namedNode(NAMESPACES.xsd + 'float');
            else if (dtype === 'integer') datatype = DF.namedNode(NAMESPACES.xsd + 'integer');
            else if (dtype === 'boolean') datatype = DF.namedNode(NAMESPACES.xsd + 'boolean');
            else if (dtype === 'date') datatype = DF.namedNode(NAMESPACES.xsd + 'date');
            else if (dtype === 'dateTime') datatype = DF.namedNode(NAMESPACES.xsd + 'dateTime');
            else if (dtype === 'string') datatype = DF.namedNode(NAMESPACES.xsd + 'string');
            
            objItem = DF.literal(String(value), datatype);
        }
        
        // Don't add if property doesn't allow multiple values and a value already exists
        if (!multiple) {
            const existing = this.store.getQuads(
                DF.namedNode(objId),
                DF.namedNode(propId),
                null,
                null
            );
            
            if (existing.length > 0) {
                return;
            }
        }
        
        // Add the triple to the graph
        this.store.addQuad(
            DF.quad(
                DF.namedNode(objId),
                DF.namedNode(propId),
                objItem,
                DF.namedNode(this.graphUrl)
            )
        );
    }
    
    /**
     * Create a full individual with all its properties
     * @param obj Object to create
     */
    private _createIndividualFull(obj: any): void {
        const category = obj['@category'];
        const extraCats = obj['@extracats'] || [];
        const schemaName = obj['@schema'] || category;
        const schema = this.schema[schemaName] || {};
        const objId = obj['@id'];
        
        if (!objId) {
            return;
        }
        
        // Create category class
        let categoryUri = null;
        if (category) {
            categoryUri = this.createClass(category);
        }
        
        // Create individual
        const objUri = this.createIndividual(objId);
        
        // Set individual classes
        this.setIndividualClasses(objUri, categoryUri, extraCats);
        
        // Set properties
        for (const [key, value] of Object.entries(obj)) {
            if (key[0] === '@') {
                continue;
            }
            
            const details = this.getPropertyDetails(key, schema, value);
            const prop = details.name;
            const dtype = details.type;
            const synonyms = details.synonyms || {};
            let cat = details.category || null;
            const sch = details.schema || null;
            const fromJson = details.fromJson || null;
            const multiple = details.multiple || false;
            
            if (!prop) {
                continue;
            }
            
            // Use schema if category is not set
            if (sch && !cat) {
                cat = sch;
            }
            
            // Create Property
            const propDI = this.createProperty(prop, dtype, cat, multiple);
            
            // Set property value
            if (dtype === 'Individual') {
                if (typeof value === 'string' && Object.keys(synonyms).length > 0) {
                    // If the value is a string and there are synonyms for this Individual
                    const lowerValue = value.toLowerCase();
                    if (synonyms[lowerValue]) {
                        // If we have a synonym-mapping for the value to an Individual
                        propDI[1] = 'EnumeratedIndividual'; // Rename property type to be an enumeration
                        let synId = synonyms[lowerValue].id;
                        
                        if (!this.standardize) {
                            // If we don't want to standardize, then create a unique id for the individual
                            synId += '.' + uniqid();
                        }
                        
                        this.setPropertyValue(objUri, propDI, synId);
                        
                        // Only add object label in the current graph if set
                        if (this.addLabels) {
                            let label;
                            if (this.standardize) {
                                // Set the standard label for the individual
                                label = synonyms[lowerValue].label;
                            } else {
                                // Set the user label for the individual
                                label = value;
                            }
                            this.setObjectLabel(synId, label);
                        }
                    } else {
                        // We don't have a synonym-mapping for the value
                        // Create an individual and set its label to the value
                        propDI[1] = 'EnumeratedIndividual';
                        const synId = this.createIndividual(value) + '.' + uniqid();
                        this.setPropertyValue(objUri, propDI, synId);
                        this.setObjectLabel(synId, value);
                    }
                } else {
                    // There are no synonyms, and value is not a string. Just use it directly
                    this.setPropertyValue(objUri, propDI, value);
                }
            } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                this.setPropertyValue(objUri, propDI, value);
            } else {
                if (dtype === 'File') {
                    // File handling could be implemented here
                    // Similar to the Python code's commented section
                } else {
                    this.setPropertyValue(objUri, propDI, value);
                }
            }
        }
    }
    
    /**
     * Parse persons string into array of person objects
     * @param authorString String containing author names
     * @param parent Optional parent object
     * @returns Array of parsed author names
     */
    private parsePersonsString(authorString: string, parent?: any): string[] {
        // Check for semi-colon delimiter and split accordingly
        if (authorString.includes(';')) {
            const authorSplit = authorString.split(/\s*;\s*/);
            // Further split the authors with commas if necessary
            const authorList: string[] = [];
            
            for (const author of authorSplit) {
                if (author.includes(',')) {
                    const lastFirst = author.split(/\s*,\s*/);
                    authorList.push(`${lastFirst[1]} ${lastFirst[0]}`);
                } else {
                    authorList.push(author);
                }
            }
            
            return authorList;
        } else {
            // Split the author string with commas
            const authorList: string[] = [];
            const authorSplit = authorString.split(/\s*,\s*/);
            
            if (authorSplit.length % 2 === 0) {
                // Even number: last name first name
                for (let i = 0; i < authorSplit.length; i += 2) {
                    authorList.push(`${authorSplit[i+1]} ${authorSplit[i]}`);
                }
            } else {
                // Odd number: first name last name
                for (const author of authorSplit) {
                    authorList.push(author);
                }
            }
            
            return authorList;
        }
    }
    
    /**
     * Parse persons object into standardized format
     * @param auths Author string or array of authors
     * @param parent Optional parent object
     * @returns Array of parsed person objects
     */
    private parsePersons(auths: any, parent?: any): any[] {
        const authors: string[] = [];
        
        if (!Array.isArray(auths)) {
            auths = [auths];
        }
        
        for (const authstr of auths) {
            let authname = null;
            
            if (typeof authstr === 'object' && authstr !== null) {
                if ('name' in authstr) {
                    authname = authstr.name;
                }
            } else {
                authname = authstr;
            }
            
            if (authname) {
                const auth = this.parsePersonsString(authname, parent);
                
                if (Array.isArray(auth)) {
                    authors.push(...auth);
                } else {
                    authors.push(auth);
                }
            }
        }
        
        return authors.map(auth => ({ name: auth }));
    }

    /**
     * Flatten array recursively (browser-compatible alternative to Array.flat())
     * @param arr Array to flatten
     * @returns Flattened array
     */
    private _flattenArray(arr: any[]): any[] {
        const result: any[] = [];
        for (const item of arr) {
            if (Array.isArray(item)) {
                result.push(...this._flattenArray(item));
            } else {
                result.push(item);
            }
        }
        return result;
    }

    /**
     * Set column numbers for variables
     * @param datatable Datatable object
     * @param parent Parent object
     * @returns Datatable object with ordered variables
     */
    private setColumnNumbers(datatable: any, parent: any = null): any {
        for (const [index, variable] of datatable.variables.entries()) {
            variable.columnNumber = index + 1;
            console.log("setColumnNumbers", variable);
        }
        return datatable;
    }

    /**
     * Parse changeLog object into standardized format
     * @param changes Change list
     * @param parent Optional parent object
     * @returns Array of parsed person objects
     */
    private parseChanges(changes: any, parent?: any): any {
        const newChanges: any = []
        if (!Array.isArray(changes)) {
            changes = [changes]
        }
        for (const change of changes) {
            for (const name of Object.keys(change)) {
                let notes = change[name] || []
                // Convert notes to 1-dimensional array (browser-compatible alternative to flat())
                notes = Array.isArray(notes) ? this._flattenArray(notes) : [notes];
                const newChange = {
                    name: name,
                    notes: notes
                }
                newChanges.push(newChange);
            }
        }
        return newChanges;
    }

    /**
     * Parse location object
     * @param geo Location object
     * @param parent Parent object
     * @returns Processed location object
     */
    private parseLocation(geo: any, parent?: any): any {
        const ngeo: Record<string, any> = {};
        
        ngeo.locationType = geo.type || null;
        if (parent && parent['@id']) {
            ngeo.coordinatesFor = parent['@id'];
        }
        
        if (geo.geometry && geo.geometry.coordinates) {
            const coords = geo.geometry.coordinates;
            
            if (coords && coords.length > 0) {
                ngeo.coordinates = `${coords[1]},${coords[0]}`;
                ngeo['wgs84:lat'] = coords[1];
                ngeo.hasLatitude = coords[1];
                ngeo.latitude = coords[1];
                
                ngeo['wgs84:long'] = coords[0];
                ngeo.longitude = coords[0];
                ngeo.hasLongitude = coords[0];
                
                if (coords.length > 2) {
                    ngeo['wgs84:alt'] = coords[2];
                    ngeo.elevation = coords[2];
                    ngeo.hasElevation = coords[2];
                }
            }
        }
        
        if (geo.properties && typeof geo.properties === 'object') {
            for (const [key, value] of Object.entries(geo.properties)) {
                ngeo[key] = value;
            }
        } else if (typeof geo === 'object') {
            for (const [key, value] of Object.entries(geo)) {
                if (key !== 'geometry') {
                    // Do not add lat long if they are already added
                    if (!(`wgs84:${key}` in ngeo)) {
                        ngeo[key] = value;
                    }
                }
            }
        }
        
        return ngeo;
    }
    
    /**
     * Process uncertainty values
     * @param val Uncertainty value
     * @param parent Parent object
     * @returns Uncertainty object
     */
    private getUncertainty(val: any, parent?: any): any {
        const uncertainty: Record<string, any> = {};
        uncertainty.hasValue = val;
        uncertainty.analytical = val;
        uncertainty.reproducibility = val;
        return uncertainty;
    }
    
    /**
     * Get Google Spreadsheet URL from key
     * @param key Spreadsheet key
     * @param parent Parent object
     * @returns Spreadsheet URL
     */
    private getGoogleSpreadsheetUrl(key: string, parent?: any): string {
        return `https://docs.google.com/spreadsheets/d/${key}`;
    }
    
    /**
     * Get a property from a parent object
     * @param obj Object with parent reference
     * @param prop Property to find
     * @returns Property value or null
     */
    private getParentProperty(obj: any, prop: string): any {
        let parent = obj['@parent'];
        while (parent) {
            if (prop in parent) {
                return parent[prop];
            }
            
            parent = parent['@parent'];
        }
        return null;
    }
    
    /**
     * Get a parent with a specific property value
     * @param obj Object with parent reference
     * @param prop Property to check
     * @param val Value to match
     * @returns Parent object or null
     */
    private getParentWithPropertyValue(obj: any, prop: string, val: any): any {
        let parent = obj['@parent'];
        while (parent) {
            if (prop in parent && parent[prop] === val) {
                return parent;
            }
            
            parent = parent['@parent'];
        }
        return null;
    }

    /**
     * Set identifier properties for publications
     * @param pub Publication object
     * @param objHash Object hash
     * @returns [modified publication, modified hash, added objects]
     */
    private setIdentifierProperties(pub: any, objHash: Record<string, any>): [any, Record<string, any>, string[]] {
        if ('identifier' in pub) {
            for (const identifier of pub.identifier) {
                if (identifier.type === 'doi') {
                    if (!('hasDOI' in pub)) {
                        pub.hasDOI = [];
                    }
                    pub.hasDOI.push(identifier.id);
                } else if (identifier.type === 'issn') {
                    if (!('hasISSN' in pub)) {
                        pub.hasISSN = [];
                    }
                    pub.hasISSN.push(identifier.id);
                } else if (identifier.type === 'isbn') {
                    if (!('hasISBN' in pub)) {
                        pub.hasISBN = [];
                    }
                    pub.hasISBN.push(identifier.id);
                }
                
                if ('url' in identifier) {
                    if (!('hasLink' in pub)) {
                        pub.hasLink = [];
                    }
                    pub.hasLink.push(identifier.url);
                }
            }
            
            delete pub.identifier;
        }
        
        return [pub, objHash, []];
    }
    
    /**
     * Convert values array to string
     * @param obj Object with values
     * @param objHash Object hash
     * @returns [modified object, modified hash, added objects]
     */
    private valuesToString(obj: any, objHash: Record<string, any>): [any, Record<string, any>, string[]] {
        if ('values' in obj && Array.isArray(obj.values)) {
            obj.values = obj.values.join(', ');
        }
        return [obj, objHash, []];
    }
    
    /**
     * Guess sensor type based on archive, observation, and sensor
     * @param archive Archive type
     * @param observation Observation type
     * @param sensor Sensor data
     * @returns Guessed sensor type
     */
    private guessSensorType(archive: string, observation: string, sensor: any): string {
        if (('sensorGenus' in sensor) || ('sensorSpecies' in sensor)) {
            if (archive === 'MarineSediment') {
                return 'Foraminifera';
            } else if (archive === 'Coral') {
                return 'Polyp';
            } else if (archive === 'Wood') {
                return 'Vegetation';
            } else if (archive === 'MolluskShell') {
                return 'Bivalves';
            } else if (archive === 'Sclerosponge') {
                return 'Sponge';
            }
            return 'OrganicSensor';
        } else {
            if (archive === 'MarineSediment' && (observation === 'Uk37' || observation === 'Alkenone')) {
                return 'Coccolithophores';
            } else if (archive === 'MarineSediment' && observation === 'TEX86') {
                return 'Archea';
            } else if (archive === 'MarineSediment' && observation === 'D18O') {
                return 'Foraminifera';
            } else if (archive === 'MarineSediment' && observation === 'Mg/Ca') {
                return 'Foraminifera';
            } else if (archive === 'LakeSediment' && (observation === 'Uk37' || observation === 'Alkenone')) {
                return 'Coccolithophores';
            } else if (archive === 'LakeSediment' && observation === 'TEX86') {
                return 'Archea';
            } else if (archive === 'LakeSediment' && observation === 'Midge') {
                return 'Chironomids';
            } else if (archive === 'LakeSediment' && observation === 'BSi') {
                return 'Diatoms';
            } else if (archive === 'LakeSediment' && observation === 'Chironomid') {
                return 'Chironomids';
            } else if (archive === 'LakeSediment' && observation === 'Reflectance') {
                return 'PhotosyntheticAlgae';
            } else if (archive === 'LakeSediment' && observation === 'Pollen') {
                return 'Watershed';
            } else if (archive === 'Coral') {
                return 'Polyp';
            } else if (archive === 'Wood') {
                return 'Vegetation';
            } else if (archive === 'MolluskShell') {
                return 'Bivalves';
            } else if (archive === 'Sclerosponge') {
                return 'Sponge';
            } else if (archive === 'Speleothem') {
                return 'Karst';
            } else if (archive === 'GlacierIce') {
                return 'Snow';
            } else if (archive === 'LakeSediment' && observation === 'VarveThickness') {
                return 'Catchment';
            } else if (archive === 'GlacierIce' && observation === 'Melt') {
                return 'IceSurface';
            } else if (archive === 'Borehole') {
                return 'Soil';
            } else {
                return 'InorganicSensor';
            }
        }
    }
    
    /**
     * Standardize observation names
     * @param observation Observation name
     * @returns Standardized observation name
     */
    private getObservation(observation: string | null | undefined): string | null {
        if (observation === null || observation === undefined) {
            return null;
        }
        if (observation.toLowerCase() === 'alkenone') {
            return 'Uk37';
        }
        return camelCase(observation);
    }
    
    /**
     * Generate a variable ID
     * @param obj Variable object
     * @param parentId Parent ID
     * @returns Generated variable ID
     */
    private getVariableId(obj: any, parentId: string): string {
        const iobj: Record<string, any> = {};
        
        // Convert keys to lowercase for case-insensitive matching
        for (const [key, value] of Object.entries(obj)) {
            iobj[key.toLowerCase()] = value;
        }
        
        if (!('tsid' in iobj)) {
            iobj.tsid = uniqid();
        }
        
        let id = `${parentId}.${iobj.tsid}`;
        id += `.${iobj.variablename || ''}`;
        
        return id;
    }
    
    /**
     * Wrap integration time data
     * @param obj Object with integration time data
     * @param objHash Object hash
     * @returns [modified object, modified hash, added objects]
     */
    private wrapIntegrationTime(obj: any, objHash: Record<string, any>): [any, Record<string, any>, string[]] {
        const objId = obj['@id'];
        const pvals: Record<string, any> = {};
        
        // Process all integration time related properties
        const keysToDelete: string[] = [];
        
        for (const [key, value] of Object.entries(obj)) {
            if (/^integrationTime$/i.test(key)) {
                pvals.hasValue = value;
                keysToDelete.push(key);
            } else {
                const match = key.match(/^integrationTime(.+)/);
                if (match) {
                    const nkey = match[1];
                    const nkeyLcfirst = lcfirst(nkey);
                    pvals[nkeyLcfirst] = value;
                    keysToDelete.push(key);
                }
            }
        }
        
        // Delete the processed keys
        for (const key of keysToDelete) {
            delete obj[key];
        }
        
        // If we found any integration time values, create a new object
        if (Object.keys(pvals).length > 0) {
            const inTimeId = `${objId}.IntegrationTime`;
            obj.integrationTime = inTimeId;
            
            const inTime: Record<string, any> = {
                '@id': inTimeId,
                '@category': 'IntegrationTime',
                '@schema': 'IntegrationTime'
            };
            
            // Add all properties
            Object.assign(inTime, pvals);
            
            // Add to object hash
            objHash[inTimeId] = inTime;
            
            return [obj, objHash, [inTimeId]];
        }
        
        return [obj, objHash, []];
    }
    
    /**
     * Add interpretation rank
     * @param obj Interpretation object
     * @param objHash Object hash
     * @returns [modified object, modified hash, added objects]
     */
    private addInterpretationRank(obj: any, objHash: Record<string, any>): [any, Record<string, any>, string[]] {
        if (!('rank' in obj) || typeof obj.rank !== 'number') {
            const rank = obj['@index'] - 1;
            obj.rank = rank;
        }
        return [obj, objHash, []];
    }
    
    /**
     * Wrap uncertainty data
     * @param obj Object with uncertainty data
     * @param objHash Object hash
     * @returns [modified object, modified hash, added objects]
     */
    private wrapUncertainty(obj: any, objHash: Record<string, any>): [any, Record<string, any>, string[]] {
        const objId = obj['@id'];
        const pvals: Record<string, any> = {};
        const keysToBeDeleted: string[] = [];
        
        // Process all uncertainty related properties
        for (const [key, value] of Object.entries(obj)) {
            if (/^uncertainty$/i.test(key)) {
                pvals.hasValue = value;
                keysToBeDeleted.push(key);
            } else if (/^uncertainty/i.test(key)) {
                pvals[key] = value;
                keysToBeDeleted.push(key);
            }
        }
        
        // Delete the processed keys
        for (const key of keysToBeDeleted) {
            delete obj[key];
        }
        
        // If we found any uncertainty values, create a new object
        if (Object.keys(pvals).length > 0) {
            const uncId = `${objId}.Uncertainty`;
            obj.hasUncertainty = uncId;
            
            const uncertainty: Record<string, any> = {
                '@id': uncId,
                '@category': 'Uncertainty'
            };
            
            // Add all properties
            for (const [prop, value] of Object.entries(pvals)) {
                uncertainty[prop] = value;
            }
            
            // Add to object hash
            objHash[uncId] = uncertainty;
            
            return [obj, objHash, [uncId]];
        }
        
        return [obj, objHash, []];
    }
    
    /**
     * Add found in table reference
     * @param obj Object to modify
     * @param objHash Object hash
     * @returns [modified object, modified hash, added objects]
     */
    private addFoundInTable(obj: any, objHash: Record<string, any>): [any, Record<string, any>, string[]] {
        if (obj['@parent'] && obj['@parent']['@id']) {
            obj.foundInTable = obj['@parent']['@id'];
        }
        return [obj, objHash, []];
    }
    
    /**
     * Add found in dataset reference
     * @param obj Object to modify
     * @param objHash Object hash
     * @returns [modified object, modified hash, added objects]
     */
    private addFoundInDataset(obj: any, objHash: Record<string, any>): [any, Record<string, any>, string[]] {
        let parent = obj['@parent'];
        let top = parent;
        
        while (parent) {
            top = parent;
            parent = parent['@parent'];
        }
        
        if (top && top['@id']) {
            obj.foundInDataset = top['@id'];
        }
        
        return [obj, objHash, []];
    }
    
    /**
     * Add variable values from CSV data
     * @param obj Variable object
     * @param objHash Object hash
     * @returns [modified object, modified hash, added objects]
     */
    private addVariableValues(obj: any, objHash: Record<string, any>): [any, Record<string, any>, string[]] {
        if (!obj['@parent'] || !obj['@parent']['@id']) {
            return [obj, objHash, []];
        }
        
        const csvName = `${obj['@parent']['@id']}.csv`;
        
        if (!('number' in obj)) {
            obj.number = obj['@index'];
        }
        
        if (typeof obj.number === 'string') {
            obj.number = parseInt(obj.number, 10);
        }
        
        if (!Array.isArray(obj.number)) {
            obj.number = [obj.number];
        }
        
        const indices = obj.number.map((col: any) => parseInt(col, 10) - 1);
        
        // Enhanced CSV lookup - try multiple variants
        let csvData: any[][] | null = null;
        const lookupKeys = [
            csvName,                    // e.g., "tableId.csv"
            csvName.split('/').pop(),   // basename only
        ];
        
        // Also try all CSV filenames that end with the expected name
        const availableCsvs = Object.keys(this.lipdCsvs);
        for (const availableCsv of availableCsvs) {
            if (availableCsv.endsWith(csvName)) {
                lookupKeys.push(availableCsv);
            }
        }
        
        logger.debug(`Looking for CSV with keys: ${lookupKeys.join(', ')}`);
        logger.debug(`Available CSVs: ${availableCsvs.join(', ')}`);
        
        for (const key of lookupKeys) {
            if (key && key in this.lipdCsvs) {
                csvData = this.lipdCsvs[key];
                logger.debug(`Found CSV data with key: ${key}`);
                break;
            }
        }
        
        if (csvData) {
            let values: any[] = [];
            
            if (indices.length === 1) {
                if (indices[0] >= 0 && csvData.length > 0 && indices[0] < csvData[0].length) {
                    // Extract column from all rows
                    values = csvData.map(row => row[indices[0]]);
                }
            } else {
                // Handle multiple columns
                values = indices.map((index: number) => {
                    return csvData!.map((row: any[]) => row[index]);
                });
            }
            
            // Convert to JSON string
            const valString = JSON.stringify(values);
            obj.hasValues = valString;
            logger.debug(`Added ${values.length} values for variable`);
            
            return [obj, objHash, []];
        } else {
            logger.debug(`CSV '${csvName}' not found in zip — cannot fill hasValues. Available: ${availableCsvs.join(', ')}`);
        }
        
        return [obj, objHash, []];
    }
    
    /**
     * Add standard variable reference
     * @param obj Variable object
     * @param objHash Object hash
     * @returns [modified object, modified hash, added objects]
     */
    private addStandardVariable(obj: any, objHash: Record<string, any>): [any, Record<string, any>, string[]] {
        if ('variableName' in obj) {
            const name = obj.variableName;
            const synonyms = SYNONYMS.VARIABLES?.PaleoVariable;
            
            if (typeof name === 'string' && synonyms && name.toLowerCase() in synonyms) {
                obj.hasStandardVariable = synonyms[name.toLowerCase()].id;
                
                // Only add object label in the current graph if set
                if (this.addLabels) {
                    const label = synonyms[name.toLowerCase()].label;
                    this.setObjectLabel(obj.hasStandardVariable, label);
                }
            }
        }
        
        return [obj, objHash, []];
    }
    
    /**
     * Stringify column numbers array
     * @param obj Variable object
     * @param objHash Object hash
     * @returns [modified object, modified hash, added objects]
     */
    private stringifyColumnNumbersArray(obj: any, objHash: Record<string, any>): [any, Record<string, any>, string[]] {
        if ('number' in obj && Array.isArray(obj.number) && obj.number.length > 1) {
            obj.hasColumnNumber = JSON.stringify(obj.number);
            delete obj.number;
        }
        
        return [obj, objHash, []];
    }

    private async _convertBrowser(lipdPath: string): Promise<void> {
        try {
            // Fetch the LiPD file as ArrayBuffer
            const response = await fetch(lipdPath);
            if (!response.ok) {
                throw new Error(`Failed to fetch LiPD file: ${response.statusText}`);
            }
            const arrayBuffer = await response.arrayBuffer();

            // Load with JSZip
            const zip = await JSZip.loadAsync(arrayBuffer);

            // Separate CSV and JSON entries so we can ensure CSVs are cached first
            const csvEntries: Array<[string, JSZip.JSZipObject]> = [];
            const jsonEntries: JSZip.JSZipObject[] = [];

            for (const fileName of Object.keys(zip.files)) {
                const file = zip.files[fileName];
                if (file.dir) continue;

                if (fileName.endsWith('.csv')) {
                    csvEntries.push([fileName, file]);
                } else if (fileName.endsWith('.jsonld')) {
                    jsonEntries.push(file);
                }
            }

            // Pass 1: load all CSVs
            for (const [fileName, file] of csvEntries) {
                const csvContent = await file.async('string');
                const parsedCsv = Papa.parse(csvContent, { header: false });
                this.lipdCsvs[fileName] = parsedCsv.data as any[][];
                const baseName = fileName.split('/').pop();
                if (baseName) {
                    this.lipdCsvs[baseName] = parsedCsv.data as any[][];
                }
                logger.debug(`Loaded CSV '${fileName}' (${parsedCsv.data.length}×${((parsedCsv.data as any[])[0] as any[]).length || 0})`);
            }

            // Pass 2: process JSON after CSVs are ready
            for (const file of jsonEntries) {
                const jsonContent = await file.async('string');
                this._loadLipdJsonString(jsonContent);
            }
        } catch (error) {
            logger.error('Error converting LiPD in browser: %s', error instanceof Error ? error.message : String(error));
            throw error;
        }
    }

    /**
     * Load LiPD JSON content that is already available as a string (used in browser flow)
     * @param jsonContent Raw JSON-LD content
     */
    private _loadLipdJsonString(jsonContent: string): void {
        try {
            const obj = JSON.parse(jsonContent);

            // Set graph URL based on dataset name if available
            if (obj.dataSetName) {
                this.graphUrl = NSURL + "/" + sanitizeId(obj.dataSetName);
            }

            // Map LiPD data to RDF
            const objHash: Record<string, any> = {};
            this._mapLipdToJson(obj, null, null, 'Dataset', 'Dataset', objHash);

            // Set hasUrl to the source if possible (not available from buffer)
            if (obj['@id']) {
                objHash[obj['@id']].hasUrl = DATAURL + "/" + obj['@id'] + '.lpd';
            }

            // Create individuals for all objects in the hash
            for (const item of Object.values(objHash)) {
                this._createIndividualFull(item);
            }
        } catch (error) {
            logger.error('Error loading JSON content in browser: %s', error instanceof Error ? error.message : String(error));
            throw error;
        }
    }
} 
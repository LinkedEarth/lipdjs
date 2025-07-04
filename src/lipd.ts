import { Store, Writer } from 'n3';
import * as fs from 'fs';
import * as path from 'path';
import JSZip from 'jszip';
import { isBrowser } from './utils/env';

import { Logger } from './utils/logger';
import { DEFAULT_GRAPH_URI, NSURL } from './globals/urls';
import { RDFGraph, AuthCredentials } from './rdfGraph';
import { RDFToLiPD } from './utils/rdfToLipd';
import { LipdToRDF } from './utils/lipdToRdf';
import { LiPDSeries } from './lipdSeries';
import {
    QUERY_DSNAME,
    QUERY_DSID,
    QUERY_UNIQUE_ARCHIVE_TYPE,
    QUERY_FILTER_DATASET_NAME,
    QUERY_FILTER_COMPILATION,
    QUERY_FILTER_TIME
} from './globals/queries';

import { multiLoadLipd } from './utils/multiProcessing';
import { sanitizeId, serializeStore } from './utils/utils';
import { Dataset } from './classes/dataset';
import { RDFToJSON } from './utils/rdfToJson';
import { JSONToRDF } from './utils/jsonToRdf';
import { v4 as uuidv4 } from 'uuid';
import * as pako from 'pako';

const logger = Logger.getInstance();

export class LiPD extends RDFGraph {
    /**
     * The LiPD class describes a LiPD (Linked Paleo Data) object. It contains an RDF Graph which is serialization 
     * of the LiPD data into an RDF graph containing terms from the LiPD Ontology.
     * @param store Optional N3 store to initialize with
     * @param quiet Whether to suppress log messages
     * @param endpoint Optional SPARQL endpoint URL
     * @param auth Optional authentication credentials for the SPARQL endpoint
     */
    constructor(store?: Store, quiet: boolean = false, endpoint?: string, auth?: AuthCredentials) {
        super(store, quiet, endpoint, auth);
    }

    /**
     * Load LiPD files from a directory
     * @param dirPath Path to the directory containing LiPD files
     * @param standardize Whether to standardize the data
     * @param addLabels Whether to add labels
     */
    public async loadFromDir(dirPath: string, standardize: boolean = true, addLabels: boolean = true): Promise<void> {
        if (!fs.existsSync(dirPath)) {
            throw new Error(`Directory ${dirPath} does not exist`);
        }

        const lipdFiles: string[] = [];
        const files = fs.readdirSync(dirPath);
        
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            if (fs.statSync(filePath).isFile() && file.endsWith('.lpd')) {
                lipdFiles.push(filePath);
            }
        }

        await this.load(lipdFiles, standardize, addLabels);
    }

    /**
     * Load LiPD files
     * @param lipdFiles Array of paths to LiPD files (can also be URLs)
     * @param standardize Whether to standardize the data
     * @param addLabels Whether to add labels
     */
    public async load(lipdFiles: string | string[], standardize: boolean = true, addLabels: boolean = true): Promise<void> {
        logger.debug('Loading LiPD files...' + lipdFiles);
        const files = Array.isArray(lipdFiles) ? lipdFiles : [lipdFiles];
        const numFiles = files.length;
        
        if (!this.quiet) {
            logger.debug(`Loading ${numFiles} LiPD files`);
        }

        this.store = await multiLoadLipd(this.store, files, true, standardize, addLabels);
        logger.debug('Multi-loading done');

        logger.debug(`Number of quads in LiPD: ${this.store.size}`);

        if (!this.quiet) {
            logger.debug('Loaded..');
        }
    }

    /**
     * Load LiPD file from a File object (for browser file input)
     * @param file File object from HTML5 file input
     * @param standardize Whether to standardize the data
     * @param addLabels Whether to add labels
     */
    public async loadFromFile(file: File, standardize: boolean = true, addLabels: boolean = true): Promise<void> {
        logger.debug('Loading LiPD file from File object: %s', file.name);
        
        if (!this.quiet) {
            logger.debug(`Loading LiPD file: ${file.name}`);
        }

        const converter = new LipdToRDF(standardize, addLabels);
        await converter.loadFromFile(file);
        
        // Merge the converted data into our store
        const quads = converter.store.getQuads(null, null, null, null);
        for (const quad of quads) {
            if (this.store.getQuads(quad.subject, quad.predicate, quad.object, quad.graph).length === 0) {
                this.store.addQuad(quad);
            }
        }

        logger.debug(`Number of quads in LiPD: ${this.store.size}`);

        if (!this.quiet) {
            logger.debug('File loaded successfully');
        }
    }

    /**
     * Get LiPD JSON for a dataset
     * @param dsname Dataset ID
     * @returns LiPD JSON
     */
    public getLipd(dsname: string): any {
        const converter = new RDFToLiPD(this.store);
        return converter.convertToJson(dsname);
    }

    /**
     * Create LiPD file for a dataset
     * @param dsname Dataset ID
     * @param lipdFile Path to LiPD file
     * @returns LiPD JSON
     */
    public async createLipd(dsname: string, lipdFile: string): Promise<any> {
        const converter = new RDFToLiPD(this.store);
        const lipdJson = await converter.convert(dsname, lipdFile);
        // Remove values from variables before creating LiPD file
        // Values should be stored in CSV files, not in metadata.jsonld
        return this._removeValuesFromVariables(lipdJson);
    }

    /**
     * Get dataset(s) from the graph and returns the popped LiPD object
     * @param dsnames Dataset name(s) to get
     * @returns LiPD object with the retrieved dataset(s)
     */
    public get(dsnames: string | string[]): LiPD {
        const names = Array.isArray(dsnames) ? dsnames : [dsnames];
        const dsids = names.map(name => 
            name.startsWith(NSURL) ? name : `${NSURL}/${name}`
        );

        const ds = super.get(dsids);
        return new LiPD(ds.getStore(), this.quiet, this.getEndpoint(), this.auth);
    }

    /**
     * Pop dataset(s) from the graph and returns the popped LiPD object
     * @param dsnames Dataset name(s) to be popped
     * @returns LiPD object with the popped dataset(s)
     */
    public pop(dsnames: string | string[]): LiPD {
        const names = Array.isArray(dsnames) ? dsnames : [dsnames];
        const dsids = names.map(name => 
            name.startsWith(NSURL) ? name : `${NSURL}/${name}`
        );

        const popped = super.pop(dsids);
        return new LiPD(popped.getStore(), this.quiet, this.getEndpoint(), this.auth);
    }

    /**
     * Remove dataset(s) from the graph
     * @param dsnames Dataset name(s) to be removed
     */
    public remove(dsnames: string | string[]): void {
        const names = Array.isArray(dsnames) ? dsnames : [dsnames];
        const dsids = names.map(name => 
            name.startsWith(NSURL) ? name : `${NSURL}/${name}`
        );

        super.remove(dsids);
    }

    /**
     * Get all dataset names
     * @returns List of dataset names
     */
    public async getAllDatasetNames(): Promise<string[]> {
        const [qres] = await this.query(QUERY_DSNAME);
        return qres.map((row: { dsname: any }) => sanitizeId(row.dsname.value));
    }

    /**
     * Get all dataset IDs
     * @returns List of dataset IDs
     */
    public async getAllDatasetIds(): Promise<string[]> {
        const [qres] = await this.query(QUERY_DSID);
        return qres.map((row: { dsid: string }) => sanitizeId(row.dsid));
    }

    /**
     * Get all archive types
     * @returns List of archive types
     */
    public async getAllArchiveTypes(): Promise<string[]> {
        const [qres] = await this.query(QUERY_UNIQUE_ARCHIVE_TYPE);
        return qres.map((row: { archiveType: string }) => String(row.archiveType));
    }

    /**
     * Get all datasets as Dataset class instances
     * @returns List of Dataset objects
     * 
     * @example
     * ```typescript
     * const lipd = new LiPD();
     * lipd.load('path/to/file.lpd').then(() => {
     *   lipd.getDatasets().then(datasets => {
     *     // Work with dataset objects
     *     console.log(datasets[0].getName());
     *   });
     * });
     * ```
     */
    public async getDatasets(): Promise<Dataset[]> {
        const datasets: Dataset[] = [];
        const datasetNames = await this.getAllDatasetNames();
        
        for (const dsname of datasetNames) {
            let dsuri = NSURL + "/" + dsname
            let r2j = new RDFToJSON(dsuri, this.store)
            let data = JSON.parse(r2j.toJson())
            let ds = Dataset.fromData(dsuri, data)
            
            // Order variables according to column number
            for (const pd of ds.getPaleoData()) {
                for (const table of pd.getMeasurementTables()) {
                    table.variables = table.variables.sort((a: any, b: any) => (a.columnNumber ?? 0) - (b.columnNumber ?? 0));
                }
            }
            datasets.push(ds)
        }
        
        return datasets;
    }

    /**
     * Loads instances of Dataset class into the LiPD graph
     * @param datasets List of Dataset objects
     * 
     * @example
     * ```typescript
     * // Load datasets from one LiPD object to another
     * const lipd1 = new LiPD();
     * lipd1.load('path/to/file.lpd').then(() => {
     *   lipd1.getDatasets().then(datasets => {
     *     // Modify datasets if needed
     *     
     *     // Create a new LiPD instance and load the datasets
     *     const lipd2 = new LiPD();
     *     lipd2.loadDatasets(datasets);
     *   });
     * });
     * ```
     */
    public loadDatasets(datasets: Dataset[]): void {
        for (const ds of datasets) {
            this._fixMissingIds(ds);
            const dsuri = ds.getId() || NSURL + "/" + ds.getName();
            const j2r = new JSONToRDF(this.store, dsuri);
            j2r.loadJson(ds.toData());
        }
    }

    /**
     * Generate a unique ID with a given prefix
     * @param prefix Prefix for the ID (default: 'PYD')
     * @returns Unique formatted ID
     * @private
     */
    private _generateUniqueId(prefix: string = 'PYD'): string {
        // Generate a random UUID
        const randomUuid = uuidv4();
        
        // Convert UUID format to the specific format we need
        const idStr = randomUuid;
        const formattedId = `${prefix}-${idStr.substring(0, 5)}-${idStr.substring(9, 13)}-${idStr.substring(14, 18)}-${idStr.substring(19, 23)}-${idStr.substring(24, 28)}`;
        
        return formattedId;
    }

    /**
     * Fix missing IDs in a dataset
     * @param ds Dataset to fix
     * @private
     */
    private _fixMissingIds(ds: Dataset): void {
        // Assign variable ids if not present
        // Assign datatable csv file name if not present
        let pdCounter = 0;
        for (const pd of ds.getPaleoData()) {
            let tableCounter = 0;
            for (const table of pd.getMeasurementTables()) {
                if (!table.getFileName()) {
                    table.setFileName(`paleo${pdCounter}measurement${tableCounter}.csv`);
                }
                for (const v of table.getVariables()) {
                    if (!v.getVariableId()) {
                        v.setVariableId(this._generateUniqueId('TS'));
                    }
                }
                tableCounter++;
            }
            pdCounter++;
        }

        let chronCounter = 0;
        for (const chron of ds.getChronData()) {
            let tableCounter = 0;
            for (const table of chron.getMeasurementTables()) {
                if (!table.getFileName()) {
                    table.setFileName(`chron${chronCounter}measurement${tableCounter}.csv`);
                }
                for (const v of table.getVariables()) {
                    if (!v.getVariableId()) {
                        v.setVariableId(this._generateUniqueId('TS'));
                    }
                }
                tableCounter++;
            }

            let modelCounter = 0;
            for (const model of chron.getModeledBy()) {
                let tableCounter = 0;
                for (const table of model.getEnsembleTables()) {
                    if (!table.getFileName()) {
                        table.setFileName(`chron${chronCounter}model${modelCounter}ensemble${tableCounter}.csv`);
                    }
                    for (const v of table.getVariables()) {
                        if (!v.getVariableId()) {
                            v.setVariableId(this._generateUniqueId('TS'));
                        }
                    }
                    tableCounter++;
                }
                modelCounter++;
            }
            chronCounter++;
        }
    }
    /**
     * Convert the LiPD object to a LiPDSeries object
     * @returns LiPDSeries object
     */
    public toLipdSeries(): LiPDSeries {
        const series = new LiPDSeries();
        series.load(this);
        return series;
    }

    /**
     * Filter datasets by name
     * @param datasetName Dataset name to filter by
     * @returns New LiPD object with filtered datasets
     */
    public async filterByDatasetName(datasetName: string): Promise<LiPD> {
        const query = QUERY_FILTER_DATASET_NAME.replace('[datasetName]', datasetName);
        const [qres] = await this.query(query);
        const dsnames = qres.map((row: { dsname: string }) => sanitizeId(row.dsname));
        return this.get(dsnames);
    }

    /**
     * Filter datasets by compilation name
     * @param compilationName Compilation name to filter by
     * @returns New LiPD object with filtered datasets
     */
    public async filterByCompilationName(compilationName: string): Promise<LiPD> {
        const query = QUERY_FILTER_COMPILATION.replace('[compilationName]', compilationName);
        const [qres] = await this.query(query);
        const dsnames = qres.map((row: { dataSetName: string }) => sanitizeId(row.dataSetName));
        return this.get(dsnames);
    }

    public async serialize(type: string = 'turtle'): Promise<string> {
        return await serializeStore(this.store, type, logger);
    }

    /**
     * Filter datasets by time interval
     * @param timeBound Minimum and maximum age values
     * @param timeBoundType Type of querying to perform
     * @param recordLength Minimum record length
     * @returns New LiPD object with filtered datasets
     */
    public async filterByTime(
        timeBound: [number, number],
        timeBoundType: 'any' | 'entire' | 'entirely' = 'any',
        recordLength?: number
    ): Promise<LiPD> {
        if (timeBound[0] > timeBound[1]) {
            timeBound = [timeBound[1], timeBound[0]];
        }

        const query = QUERY_FILTER_TIME;
        const [, df] = await this.query(query);

        let filterDf;
        if (recordLength === undefined) {
            switch (timeBoundType) {
                case 'entirely':
                    filterDf = df.filter((row: { minage: number; maxage: number }) => 
                        row.minage <= timeBound[0] && row.maxage >= timeBound[1]
                    );
                    break;
                case 'entire':
                    filterDf = df.filter((row: { minage: number; maxage: number }) => 
                        row.minage >= timeBound[0] && row.maxage <= timeBound[1]
                    );
                    break;
                case 'any':
                    filterDf = df.filter((row: { minage: number }) => row.minage <= timeBound[1]);
                    break;
                default:
                    throw new Error("timeBoundType must be in ['any', 'entirely', 'entire']");
            }
        } else {
            switch (timeBoundType) {
                case 'entirely':
                    filterDf = df.filter((row: { minage: number; maxage: number }) => 
                        row.minage <= timeBound[0] && 
                        row.maxage >= timeBound[1] && 
                        Math.abs(row.maxage - row.minage) >= recordLength
                    );
                    break;
                case 'entire':
                    filterDf = df.filter((row: { minage: number; maxage: number }) => 
                        row.minage >= timeBound[0] && 
                        row.maxage <= timeBound[1] && 
                        Math.abs(row.maxage - row.minage) >= recordLength
                    );
                    break;
                case 'any':
                    filterDf = df.filter((row: { minage: number }) => 
                        row.minage <= timeBound[1] && 
                        Math.abs(row.minage - timeBound[1]) >= recordLength
                    );
                    break;
                default:
                    throw new Error("timeBoundType must be in ['any', 'entirely', 'entire']");
            }
        }

        const dsnames = filterDf.map((row: { dsname: string }) => row.dsname);
        return this.get(dsnames);
    }

    /**
     * Updates local LiPD Graph for datasets to remote endpoint
     * @param dsnames Array of dataset names
     * @param batchSize Number of quads to include in each update batch (default: 100)
     * 
     * @example
     * ```typescript
     * // Update datasets to remote endpoint
     * const lipd = new LiPD();
     * lipd.setEndpoint("https://linkedearth.graphdb.mint.isi.edu/repositories/LiPDVerse-dynamic");
     * // Set authentication if needed
     * lipd.setAuth({ username: "user", password: "pass" });
     * lipd.updateRemoteDatasets(["MyDataset1", "MyDataset2"], 100);
     * ```
     */
    public async updateRemoteDatasets(dsnames: string | string[], batchSize: number = 100): Promise<void> { // batchSize ignored in bulk loader
        if (!this.endpoint) {
            throw new Error("No remote endpoint set");
        }

        const namesList = Array.isArray(dsnames) ? dsnames : [dsnames];
        if (namesList.length === 0) {
            throw new Error("No dataset names provided");
        }

        for (const dsname of namesList) {
            const graphUri = `${NSURL}/${dsname}`;
            const backupGraphUri = `${graphUri}_backup_${Date.now()}`;

            try {
                // ---------------------------------------------
                // 1. Backup remote graph if it exists
                // ---------------------------------------------
                this.setRemote(true);
                const graphExists = await this.askQuery(`ASK WHERE { GRAPH <${graphUri}> { ?s ?p ?o } }`);
                if (graphExists) {
                    await this.updateQuery(`COPY GRAPH <${graphUri}> TO GRAPH <${backupGraphUri}>`);
                }

                // ---------------------------------------------
                // 2. Extract local quads and serialise to N-Quads
                // ---------------------------------------------
                this.setRemote(false);
                const quads = this.store.getQuads(null, null, null, graphUri);
                if (quads.length === 0) {
                    logger.debug(`No quads found for dataset: ${dsname}`);
                    continue;
                }

                const nqData = await this._quadsToNQuads(quads);

                // ---------------------------------------------
                // 3. Clear remote graph (if existed) and bulk upload
                // ---------------------------------------------
                this.setRemote(true);
                if (graphExists) {
                    await this.updateQuery(`CLEAR GRAPH <${graphUri}>`);
                }

                // Prepare request
                let body: Uint8Array | string = nqData;
                const headers: Record<string, string> = {
                    'Content-Type': 'application/n-quads'
                };

                // gzip if sizable (>10 KB)
                if (nqData.length > 10_000) {
                    body = pako.gzip(nqData);
                    headers['Content-Encoding'] = 'gzip';
                }

                if (this.auth) {
                    const authStr = Buffer.from(`${this.auth.username}:${this.auth.password}`).toString('base64');
                    headers['Authorization'] = `Basic ${authStr}`;
                }

                const statementsEndpoint = this._getStatementsEndpoint();
                const url = `${statementsEndpoint}?context=${encodeURIComponent(`<${graphUri}>`)}`;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers as any,
                    body: body as any
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error from bulk loader (${response.status}): ${errorText}`);
                }

                // ---------------------------------------------
                // 4. Remove backup on success
                // ---------------------------------------------
                if (graphExists) {
                    await this.updateQuery(`DROP GRAPH <${backupGraphUri}>`);
                }
            } catch (err) {
                logger.error(`Failed to update remote graph for ${dsname}: ${err}`);

                // Attempt rollback from backup
                try {
                    this.setRemote(true);
                    const backupExists = await this.askQuery(`ASK WHERE { GRAPH <${backupGraphUri}> { ?s ?p ?o } }`);
                    if (backupExists) {
                        await this.updateQuery(`COPY GRAPH <${backupGraphUri}> TO GRAPH <${graphUri}>`);
                        await this.updateQuery(`DROP GRAPH <${backupGraphUri}>`);
                    }
                } catch (restoreErr) {
                    logger.error(`Failed to restore backup for ${dsname}: ${restoreErr}`);
                }

                throw err;
            } finally {
                this.setRemote(false);
            }
        }

        logger.debug("Remote datasets updated successfully");
    }

    /**
     * Convert an array of quads to an N-Quads string
     */
    private async _quadsToNQuads(quads: any[]): Promise<string> {
        return new Promise((resolve, reject) => {
            const writer = new Writer({ format: 'N-Quads' });
            writer.addQuads(quads);
            writer.end((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result as string);
                }
            });
        });
    }

    /**
     * Derive the /statements endpoint from this.endpoint
     */
    private _getStatementsEndpoint(): string {
        if (!this.endpoint) {
            throw new Error("Endpoint not set");
        }
        return this.endpoint.replace(/\/repositories\/([^/]+)$/, '/repositories/$1/statements');
    }
    
    /**
     * Builds an INSERT DATA query for a batch of quads
     * @param quads Array of quads to insert
     * @param graphUri URI of the graph to insert into
     * @returns SPARQL INSERT query
     * @private
     */
    private _buildInsertQuery(quads: any[], graphUri: string): string {
        // For debugging, log one of the quads to examine its structure
        if (quads.length > 0) {
            console.log("Sample quad structure:", JSON.stringify(quads[0], null, 2));
        }
        
        // Simpler, more robust approach to building the query
        let insertQuery = `INSERT DATA { GRAPH <${graphUri}> {\n`;
        
        for (const quad of quads) {
            let subject, predicate, object;
            
            // Handle subject based on term type
            if (quad.subject.termType === 'NamedNode') {
                subject = `<${quad.subject.value}>`;
            } else {
                subject = `_:${quad.subject.value}`;
            }
            
            // Handle predicate (always a named node)
            predicate = `<${quad.predicate.value}>`;
            
            // Handle object based on term type
            if (quad.object.termType === 'NamedNode') {
                object = `<${quad.object.value}>`;
            } else if (quad.object.termType === 'BlankNode') {
                object = `_:${quad.object.value}`;
            } else {
                // For literals, handle special characters and add language/datatype
                let literalValue = quad.object.value.toString()
                    .replace(/\\/g, '\\\\') // escape backslashes first
                    .replace(/"/g, '\\"')    // escape quotes
                    .replace(/\n/g, '\\n')   // escape newlines
                    .replace(/\r/g, '\\r')   // escape carriage returns
                    .replace(/\t/g, '\\t');  // escape tabs
                
                object = `"${literalValue}"`;
                
                // Add language tag if present
                if (quad.object.language) {
                    object += `@${quad.object.language}`;
                } 
                // Add datatype if present and not plain literal
                else if (quad.object.datatype && quad.object.datatype.value !== 'http://www.w3.org/2001/XMLSchema#string') {
                    object += `^^<${quad.object.datatype.value}>`;
                }
            }
            
            // Add the triple to the query with proper spacing
            insertQuery += `  ${subject} ${predicate} ${object} .\n`;
        }
        
        insertQuery += '}}';
        
        // Log a short preview of the query
        const previewLength = Math.min(insertQuery.length, 200);
        console.log(`Generated query preview (${insertQuery.length} chars): ${insertQuery.substring(0, previewLength)}${insertQuery.length > previewLength ? '...' : ''}`);
        
        return insertQuery;
    }

    /**
     * Loads remote datasets into cache if a remote endpoint is set
     * @param dsnames Array of dataset names
     * @param loadDefaultGraph Whether to load the default graph (default: true)
     * 
     * @example
     * ```typescript
     * // Fetch LiPD data from remote RDF Graph
     * const lipd = new LiPD();
     * lipd.setEndpoint("https://linkedearth.graphdb.mint.isi.edu/repositories/LiPDVerse-dynamic");
     * // Set authentication if needed
     * lipd.setAuth({ username: "user", password: "pass" });
     * lipd.loadRemoteDatasets(["Ocn-MadangLagoonPapuaNewGuinea.Kuhnert.2001", "MD98_2181.Stott.2007"]);
     * lipd.getAllDatasetNames().then(names => console.log(names));
     * ```
     */
    public async loadRemoteDatasets(dsnames: string | string[], loadDefaultGraph: boolean = true): Promise<void> {
        if (!this.endpoint) {
            throw new Error("No remote endpoint");
        }
        
        const namesList = Array.isArray(dsnames) ? dsnames : [dsnames];
        
        if (namesList.length === 0) {
            throw new Error("No dataset names to cache");
        }
        
        let dsnamestr = namesList.map(dsname => `<${NSURL}/${dsname}>`).join(' ');
        
        if (loadDefaultGraph) {
            dsnamestr += ` <${DEFAULT_GRAPH_URI}>`;
        }
        
        console.log("Caching datasets from remote endpoint..");
        
        this.setRemote(true);
        const [qres] = await this.query(`SELECT ?s ?p ?o ?g WHERE { GRAPH ?g { ?s ?p ?o } VALUES ?g { ${dsnamestr} } }`);
        this.setRemote(false);
        
        // Add quads to the store
        for (const row of qres) {
            this.store.addQuad(row.s, row.p, row.o, row.g);
        }
        
        console.log("Done..");
    }

    /**
     * Build a full LiPD (BagIt) archive entirely in-memory – browser-safe
     * @param dsname Dataset name to export
     * @param opts Options { includeCsv?: boolean }
     * @returns Blob in browsers, Buffer in Node
     */
    public async createLipdBrowser(dsname: string, opts: { includeCsv?: boolean } = {}): Promise<Blob | Uint8Array> {
        const includeCsv = opts.includeCsv !== false;
        // 1. Get LiPD JSON for the dataset
        const originalLipdJson = this.getLipd(dsname);
        if (!originalLipdJson) {
            throw new Error(`Dataset ${dsname} not found in LiPD graph`);
        }

        // 2. Build CSV files in-memory if requested (use original data with values)
        const csvMap: Record<string, string> = includeCsv ? this._generateCsvData(originalLipdJson) : {};

        // Remove values from variables before creating LiPD file
        // Values should be stored in CSV files, not in metadata.jsonld
        const lipdJson = this._removeValuesFromVariables(originalLipdJson);

        // 3. Assemble BagIt archive with JSZip (use cleaned lipdJson without values)
        const zip = new JSZip();
        const dataFolder = zip.folder('data')!;
        dataFolder.file('metadata.jsonld', JSON.stringify(lipdJson, null, 2));
        for (const [name, csv] of Object.entries(csvMap)) {
            dataFolder.file(name, csv);
        }

        // 4. bagit.txt & bag-info.txt
        const bagitTxt = 'BagIt-Version: 1.0\nTag-File-Character-Encoding: UTF-8';
        zip.file('bagit.txt', bagitTxt);
        const bagInfoTxt = `Bagging-Date: ${new Date().toISOString()}\nBag-Software-Agent: lipdjs`;
        zip.file('bag-info.txt', bagInfoTxt);

        // 5. manifest-sha256.txt – compute hashes for files in data/
        const manifestLines: string[] = [];
        const encoder = new TextEncoder();
        const computeHash = async (content: string): Promise<string> => {
            if (isBrowser() && typeof crypto !== 'undefined' && (crypto as any).subtle) {
                const buffer = encoder.encode(content);
                const digest = await (crypto as any).subtle.digest('SHA-256', buffer);
                return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
            } else {
                // Node fallback (dynamic import to avoid bundling crypto for browser)
                const { createHash } = await import('crypto');
                return createHash('sha256').update(content).digest('hex');
            }
        };

        // metadata.jsonld first
        manifestLines.push(`${await computeHash(JSON.stringify(lipdJson, null, 2))} data/metadata.jsonld`);
        // CSVs
        for (const [name, csv] of Object.entries(csvMap)) {
            manifestLines.push(`${await computeHash(csv)} data/${name}`);
        }
        zip.file('manifest-sha256.txt', manifestLines.join('\n'));

        // 6. Generate zip with compression
        const zipOptions = {
            compression: 'DEFLATE' as const,
            compressionOptions: { level: 6 } // 1=fastest, 9=best compression, 6=balanced
        };
        
        if (isBrowser()) {
            return await zip.generateAsync({ type: 'blob', ...zipOptions });
        }
        // Node – return Buffer/Uint8Array
        return await zip.generateAsync({ type: 'uint8array', ...zipOptions });
    }

    // ---------------------------------------------------------------------
    // Helper: generate CSV text for all tables in a LiPD JSON object
    // ---------------------------------------------------------------------
    private _generateCsvData(lipd: any): Record<string, string> {
        const csvs: Record<string, string> = {};
        const tableKeys: Array<[string, string]> = [
            ['paleoData', 'measurementTable'],
            ['chronData', 'measurementTable']
        ];
        for (const [sectionKey, tableKey] of tableKeys) {
            const section = lipd[sectionKey];
            if (!Array.isArray(section)) continue;
            for (const secItem of section) {
                if (Array.isArray(secItem[tableKey])) {
                    for (const table of secItem[tableKey]) {
                        const { filename, columns } = table;
                        if (!filename || !columns) continue;
                        const csvContent = this._tableToCsv(columns);
                        csvs[filename] = csvContent;
                    }
                }
                // Also handle model tables if present (ensembleTable, summaryTable, distributionTable)
                if (Array.isArray(secItem.model)) {
                    for (const model of secItem.model) {
                        const subTables = ['ensembleTable', 'summaryTable', 'distributionTable'];
                        for (const key of subTables) {
                            if (Array.isArray(model[key])) {
                                for (const table of model[key]) {
                                    const { filename, columns } = table;
                                    if (!filename || !columns) continue;
                                    csvs[filename] = this._tableToCsv(columns);
                                }
                            }
                        }
                    }
                }
            }
        }
        return csvs;
    }

    private _tableToCsv(columns: any[]): string {
        if (!Array.isArray(columns) || columns.length === 0) return '';
        const maxLen = Math.max(...columns.map(c => (c.values?.length ?? 0)));
        const rows: string[] = [];
        for (let i = 0; i < maxLen; i++) {
            const row = columns.map(col => (col.values?.[i] ?? ''));
            rows.push(row.join(','));
        }
        return rows.join('\n');
    }

    /**
     * Remove values from variables in a LiPD JSON object.
     * This is necessary because values are typically stored in CSV files,
     * not directly in the metadata.jsonld file.
     * @param lipdJson The LiPD JSON object to process.
     * @returns A new LiPD JSON object with values removed from variables.
     * @private
     */
    private _removeValuesFromVariables(lipdJson: any): any {
        if (typeof lipdJson !== 'object' || lipdJson === null) {
            return lipdJson;
        }

        if (Array.isArray(lipdJson)) {
            return lipdJson.map(item => this._removeValuesFromVariables(item));
        }

        if (typeof lipdJson === 'object') {
            const newObj: any = {};
            for (const key in lipdJson) {
                if (Object.prototype.hasOwnProperty.call(lipdJson, key)) {
                    // Skip the 'values' key if this looks like a variable object
                    if (key === 'values' && this._isVariableObject(lipdJson)) {
                        // Skip copying the values key for variable objects
                        continue;
                    }
                    newObj[key] = this._removeValuesFromVariables(lipdJson[key]);
                }
            }
            return newObj;
        }

        return lipdJson;
    }

    /**
     * Helper to check if an object looks like a variable object.
     * Variables typically have properties like variableId, variableName, values, units, etc.
     * @param obj The object to check.
     * @returns True if it looks like a variable object, false otherwise.
     * @private
     */
    private _isVariableObject(obj: any): boolean {
        if (!obj || typeof obj !== 'object') {
            return false;
        }
        
        // Check for common variable properties
        const variableProps = ['variableId', 'variableName', 'TSid', 'number', 'columnNumber'];
        const hasVariableProperty = variableProps.some(prop => prop in obj);
        
        // If it has values and at least one variable property, treat it as a variable
        return 'values' in obj && hasVariableProperty;
    }
} 
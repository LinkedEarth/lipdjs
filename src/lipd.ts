import { Store } from 'n3';
import * as fs from 'fs';
import * as path from 'path';

import { Logger } from './utils/logger';
import { DEFAULT_GRAPH_URI, NSURL } from './globals/urls';
import { RDFGraph } from './rdfGraph';
import { RDFToLiPD } from './utils/rdfToLipd';
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

const logger = Logger.getInstance();

export class LiPD extends RDFGraph {
    /**
     * The LiPD class describes a LiPD (Linked Paleo Data) object. It contains an RDF Graph which is serialization 
     * of the LiPD data into an RDF graph containing terms from the LiPD Ontology.
     */
    constructor(store?: Store, quiet: boolean = false) {
        super(store, quiet);
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
        return await converter.convert(dsname, lipdFile);
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
        return new LiPD(ds.getStore());
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
        return new LiPD(popped.getStore());
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
            // Order variables 
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
            const dsuri = ds.getDatasetId() || NSURL + "/" + ds.getName();
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
     * Loads remote datasets into cache if a remote endpoint is set
     * @param dsnames Array of dataset names
     * @param loadDefaultGraph Whether to load the default graph (default: true)
     * 
     * @example
     * ```typescript
     * // Fetch LiPD data from remote RDF Graph
     * const lipd = new LiPD();
     * lipd.setEndpoint("https://linkedearth.graphdb.mint.isi.edu/repositories/LiPDVerse-dynamic");
     * lipd.loadRemoteDatasets(["Ocn-MadangLagoonPapuaNewGuinea.Kuhnert.2001", "MD98_2181.Stott.2007", "Ant-WAIS-Divide.Severinghaus.2012"]);
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
     * Updates local LiPD Graph for datasets to remote endpoint
     * @param dsnames Array of dataset names
     */
    public updateRemoteDatasets(dsnames: string | string[]): void {
        if (!this.endpoint) {
            throw new Error("No remote endpoint");
        }
        // TODO: Implement this
    }
} 
import { Store } from 'n3';
import { QueryEngine } from '@comunica/query-sparql';
import { Logger } from './utils/logger';

const logger = Logger.getInstance();

// Type definition to represent the source parameter required by Comunica's QueryEngine
type QuerySourceUnidentified = any;

export class RDFGraph {
    protected store: Store;
    protected quiet: boolean;
    protected endpoint?: string;
    protected engine: QueryEngine;
    protected remote: boolean;

    constructor(store?: Store, quiet: boolean = false, endpoint?: string) {
        this.store = store || new Store();
        this.quiet = quiet;
        this.endpoint = endpoint;
        this.remote = false;
        this.engine = new QueryEngine();
    }

    /**
     * Query the RDF graph
     * @param queryStr SPARQL query string
     * @returns Query results as [raw results, dataframe]
     */
    protected async query(queryStr: string): Promise<[any[], any]> {
        try {
            logger.debug('Query: ' + queryStr);

            // Execute the query using Comunica
            const bindingsStream = await this.engine.queryBindings(queryStr, {
                sources: this.getSources()
            });
            const bindings = await bindingsStream.toArray();
            logger.debug("Bindings: " + JSON.stringify(bindings));
            
            const rawResults: any[] = [];
            for (const binding of bindings) {
                logger.debug('Binding: ' + JSON.stringify(binding));
                
                const result: any = {};
                for (const key of binding.keys()) {
                    const value = binding.get(key);
                    result[key.value] = value;
                }
                rawResults.push(result);
            }

            // Convert to DataFrame if needed
            // Convert raw results to a simple DataFrame-like structure
            const df = {
                columns: rawResults.length > 0 ? Object.keys(rawResults[0]) : [],
                data: rawResults.map(row => Object.values(row)),
                get: function(column: string) {
                    const colIndex = this.columns.indexOf(column);
                    if (colIndex === -1) return [];
                    return this.data.map(row => row[colIndex]);
                },
                toArray: function() {
                    return this.data;
                },
                toJSON: function() {
                    return rawResults;
                }
            };

            return [rawResults, df];
        } catch (error) {
            logger.error('Error executing query: ' + error);
            throw error;
        }
    }

    /**
     * Execute a SPARQL ASK query
     * @param queryStr SPARQL ASK query string
     * @returns Boolean result of the ASK query
     */
    public async askQuery(queryStr: string): Promise<boolean> {
        try {
            logger.debug('ASK Query: ' + queryStr);

            // Execute the query using Comunica
            return await this.engine.queryBoolean(queryStr, {
                sources: this.getSources()
            });
        } catch (error) {
            logger.error('Error executing ASK query: ' + error);
            throw error;
        }
    }

    /**
     * Execute a SPARQL Update query
     * @param queryStr SPARQL Update query string
     * @returns Boolean result of the Update query
     */
    public async updateQuery(queryStr: string): Promise<void> {
        try {
            logger.debug('Update Query: ' + queryStr);
            
            if (!this.remote || !this.endpoint) {
                throw new Error("Remote endpoint must be set for update operations");
            }
            
            // For GraphDB, update operations need to go to the /statements endpoint
            // instead of the standard /repositories/{repo} endpoint
            const updateEndpoint = this.endpoint.replace(/\/repositories\/([^/]+)$/, '/repositories/$1/statements');
            console.log(`Using update endpoint: ${updateEndpoint}`);
            
            // Make a direct HTTP fetch request to the statements endpoint
            const response = await fetch(updateEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/sparql-update',
                    'Accept': 'application/json'
                },
                body: queryStr
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error from update endpoint (${response.status}): ${errorText}`);
            }
            
            logger.debug('Update successful');
        } catch (error) {
            logger.error('Error executing Update query: ' + error);
            throw error;
        }
    }

    /**
     * Get the source configuration for queries
     * @returns Array containing either the store or a remote endpoint configuration
     * @private
     */
    private getSources(): [QuerySourceUnidentified, ...QuerySourceUnidentified[]] {
        const source = (this.remote && this.endpoint) ? {
            type: 'sparql',
            value: this.endpoint
        } : this.store;
        // Type assertion to satisfy TypeScript compiler
        return [source] as [QuerySourceUnidentified, ...QuerySourceUnidentified[]];
    }

    public getStore(): Store {
        return this.store;
    }

    /**
     * Get id(s) from the graph and returns a new RDFGraph object
     * @param ids Graph id(s) to get
     * @returns RDFGraph object with the retrieved graph(s)
     */
    public get(ids: string | string[]): RDFGraph {
        const newStore = new Store()
        const idList = Array.isArray(ids) ? ids : [ids];
        
        // Get all quads from the store
        const quads = this.store.getQuads(null, null, null, null);
        
        // Filter quads by graph ID
        for (const quad of quads) {
            if (quad.graph && idList.includes(quad.graph.value)) {
                newStore.addQuad(quad);
            }
        }
        
        return new RDFGraph(newStore, this.quiet, this.endpoint);
    }

    /**
     * Removes id(s) from the graph
     * @param ids Graph id(s) to be removed
     */
    public remove(ids: string | string[]): void {
        const idList = Array.isArray(ids) ? ids : [ids];
        
        // Get all quads from the store
        const quads = this.store.getQuads(null, null, null, null);
        
        // Remove quads by graph ID
        for (const quad of quads) {
            if (quad.graph && idList.includes(quad.graph.value)) {
                this.store.removeQuad(quad);
            }
        }
    }

    /**
     * Pops graph(s) from the combined graph and returns the popped RDF Graph
     * @param ids Graph id(s) to be popped
     * @returns RDFGraph object with the popped graph(s)
     */
    public pop(ids: string | string[]): RDFGraph {
        const popped = this.get(ids);
        this.remove(ids);
        return popped;
    }

    /**
     * Sets a SPARQL endpoint for a remote Knowledge Base (example: GraphDB)
     * @param endpoint URL for the SPARQL endpoint
     * 
     * @example
     * ```typescript
     * // Fetch LiPD data from remote RDF Graph
     * const rdf = new RDFGraph();
     * rdf.setEndpoint("https://linkedearth.graphdb.mint.isi.edu/repositories/LiPDVerse-dynamic");
     * rdf.setRemote(true);
     * const [result, resultDf] = await rdf.query("SELECT ?s ?p ?o WHERE {?s ?p ?o} LIMIT 10");
     * ```
     */
    public setEndpoint(endpoint: string): void {
        this.endpoint = endpoint;
    }

    public getEndpoint(): string | undefined {
        return this.endpoint;
    }

    public setRemote(remote: boolean): void {
        this.remote = remote;
    }

    public getRemote(): boolean {
        return this.remote;
    }
} 
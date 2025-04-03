import { DataFactory, Store } from 'n3';
import { QueryEngine } from '@comunica/query-sparql-rdfjs';
import { Logger } from './utils/logger';
import { serializeStore } from './utils/utils';

const logger = Logger.getInstance();

export class RDFGraph {
    protected store: Store;
    protected quiet: boolean;
    protected endpoint?: string;
    protected engine: QueryEngine;

    constructor(store?: Store, quiet: boolean = false, endpoint?: string) {
        this.store = store || new Store();
        this.quiet = quiet;
        this.endpoint = endpoint;
        this.engine = new QueryEngine();
    }

    /**
     * Query the RDF graph
     * @param queryStr SPARQL query string
     * @param remote Whether to make a remote query
     * @returns Query results as [raw results, dataframe]
     */
    protected async query(queryStr: string, remote: boolean = false): Promise<[any[], any]> {
        try {
            // Handle remote query if needed
            if (remote && this.endpoint) {
                // FIXME: For the remote query, connect the store to the endpoint ?
                logger.debug("Making remote query to endpoint: " + this.endpoint);
                const matches = queryStr.match(/(.*)\s*SELECT\s+(.+)\s+WHERE\s+{(.+)}\s*(.*)/i);
                if (matches) {
                    const [_, prefix, vars, where, suffix] = matches;
                    queryStr = `${prefix} SELECT ${vars} WHERE { SERVICE <${this.endpoint}> { ${where} } } ${suffix}`;
                }
            }
            logger.debug('Query: ' + queryStr);

            // Execute the query using Comunica
            const bindingsStream = await this.engine.queryBindings(queryStr, {
                sources: [this.store]
            });
            const bindings = await bindingsStream.toArray();
            logger.debug("Bindings: " + JSON.stringify(bindings));
            
            const rawResults: any[] = [];
            for (const binding of bindings) {
                logger.debug('Binding: ' + JSON.stringify(binding));
                
                const result: any = {};
                for (const key of binding.keys()) {
                    const value = binding.get(key);
                    result[key.value] = value ? value.value : null;
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
} 
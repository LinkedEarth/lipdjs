/**
 * The JSONToRDF class helps in converting JSON data to an RDF Graph.
 */

import { Store } from 'n3';
import { DataFactory, NamedNode, Literal } from 'n3';
import { Logger } from '../utils/logger';
import { ONTONS } from '../globals/urls';

const logger = Logger.getInstance();
const DF = DataFactory;

interface PropertyValue {
    '@type': 'uri' | 'literal';
    '@id'?: string;
    '@value'?: string;
    '@datatype'?: string;
}

export class JSONToRDF {
    private store: Store;
    private graphurl: string;

    /**
     * Constructor for JSONToRDF class
     * @param store The RDF graph to add triples to
     * @param graphurl The URL of the graph
     */
    constructor(store: Store, graphurl: string) {
        this.store = store;
        this.graphurl = graphurl;
        logger.debug('JSONToRDF instance created with graphurl: %s', graphurl);
    }

    /**
     * Load a triple into the RDF graph
     * @param subject The subject of the triple
     * @param prop The predicate of the triple
     * @param value The object of the triple
     */
    private _loadTripleIntoGraph(subject: string, prop: string, value: PropertyValue[]): void {
        for (const val of value) {
            let valitem: NamedNode | Literal | null = null;

            if (val['@type'] === 'uri' && val['@id']) {
                valitem = DF.namedNode(val['@id']);
            } else if (val['@type'] === 'literal' && val['@value'] !== undefined) {
                const dtype = val['@datatype'];
                if (dtype) {
                    // If the value is a string and no datatype is specified, use string
                    const finalDtype = typeof val['@value'] === 'string' && !dtype ? 
                        'http://www.w3.org/2001/XMLSchema#string' : dtype;
                    valitem = DF.literal(val['@value'], DF.namedNode(finalDtype));
                } else {
                    valitem = DF.literal(val['@value']);
                }
            }

            if (valitem) {
                const stmt = DF.quad(
                    DF.namedNode(subject),
                    DF.namedNode(prop),
                    valitem,
                    DF.namedNode(this.graphurl)
                );
                this.store.addQuad(stmt);
            }
        }
    }

    /**
     * Clear all triples from the current graph context
     */
    private _clearSubgraph(): void {
        const graphUri = DF.namedNode(this.graphurl);
        const quads = this.store.getQuads(null, null, null, graphUri);
        for (const quad of quads) {
            this.store.removeQuad(quad);
        }
    }

    /**
     * Load JSON data into the RDF graph
     * @param data The JSON data to load
     */
    public loadJson(data: Record<string, any>): void {
        // Clear the subgraph
        this._clearSubgraph();

        // Load data
        for (const [subject, predicates] of Object.entries(data)) {
            for (const [prop, value] of Object.entries(predicates)) {
                let propUri: string;
                
                if (prop === 'type') {
                    propUri = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
                } else if (prop === 'label') {
                    propUri = 'http://www.w3.org/2000/01/rdf-schema#label';
                } else {
                    propUri = ONTONS + prop;
                }

                this._loadTripleIntoGraph(subject, propUri, value as PropertyValue[]);
            }
        }
        
        logger.debug('Loaded %d subjects into RDF graph', Object.keys(data).length);
    }

    public getGraphUrl(): string {
        return this.graphurl;
    }

    public getStore(): Store {
        return this.store;
    }
} 
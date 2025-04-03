/**
 * The RDFToJSON class helps in converting an RDF Graph to Plain JSON
 * It uses the SCHEMA dictionary (from globals/schema.ts) to do the conversion
 */

import { Store } from 'n3';
import { DataFactory, Quad, NamedNode, Literal } from 'n3';
import { Logger } from '../utils/logger';

const logger = Logger.getInstance();
const DF = DataFactory;

interface PropertyValue {
    '@type': 'uri' | 'literal';
    '@id'?: string;
    '@value'?: string;
    '@datatype'?: string;
}

interface Facts {
    [key: string]: PropertyValue[];
}

export class RDFToJSON {
    private store: Store;
    private id: string;
    private facts: { [key: string]: Facts } = {};

    /**
     * Constructor for RDFToJSON class
     * @param id The ID of the root node to start conversion from
     * @param store The RDF graph to convert
     */
    constructor(id: string, store: Store) {
        this.id = id;
        this.store = store;
        this._getIndexedFacts(id);
        logger.debug('RDFToJSON instance created with id: %s', id);
    }

    /**
     * Get property values from query results
     * @param qres Query results from RDF graph
     * @returns Object containing property values
     */
    private _getPropValuesFromQueryResultPO(quads: Quad[]): Facts {
        const facts: Facts = {};
        for (const quad of quads) {
            const pname = this._localName(quad.predicate as NamedNode);
            if (!facts[pname]) {
                facts[pname] = [];
            }
            
            const value: PropertyValue = {
                '@type': quad.object instanceof NamedNode ? 'uri' : 'literal'
            };

            if (quad.object instanceof NamedNode) {
                value['@id'] = quad.object.value;
            } else if (quad.object instanceof Literal) {
                value['@value'] = quad.object.value;
                if (quad.object.datatype) {
                    value['@datatype'] = quad.object.datatype.value;
                }
            }
            
            facts[pname].push(value);
        }
        return facts;
    }

    /**
     * Get facts for a given ID from the RDF graph
     * @param id The ID to get facts for
     * @returns Object containing facts
     */
    private _getFacts(id: string): Facts {
        const subject = DF.namedNode(id);
        const quads = this.store.getQuads(subject, null, null, null);
        return this._getPropValuesFromQueryResultPO(quads);
    }

    /**
     * Get the local name from a URI
     * @param url The URI to get the local name from
     * @returns The local name
     */
    private _localName(url: NamedNode): string {
        const parts = url.value.split('#');
        return parts[parts.length - 1];
    }

    /**
     * Get indexed facts for a given ID and its related objects
     * @param id The ID to get indexed facts for
     */
    private _getIndexedFacts(id: string): void {
        this.facts[id] = this._getFacts(id);
    }

    /**
     * Convert the RDF graph to JSON string
     * @returns JSON string representation of the RDF graph
     */
    public toJson(): string {
        return JSON.stringify(this.facts, null, 3);
    }
} 
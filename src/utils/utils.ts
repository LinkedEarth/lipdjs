import { Writer } from 'n3';
import { Store } from 'n3';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from './logger';

// Helper export functions
export function uniqid(prefix: string = '', moreEntropy: boolean = false): string {
    let theUniqid: string;
    
    if (moreEntropy) {
        // Generate two UUIDs for extra entropy and combine them
        const uuid1 = uuidv4().replace(/-/g, '');
        const uuid2 = uuidv4().replace(/-/g, '').substring(0, 8); // Take first 8 chars of second UUID
        theUniqid = uuid1 + uuid2;
    } else {
        // Standard UUID4 without hyphens
        theUniqid = uuidv4().replace(/-/g, '');
    }
    
    // Add prefix if provided
    return (prefix || '') + theUniqid;
}

export function sanitizeId(id: string): string {
    if (!id) return '';
    return encodeURIComponent(id.replace(/[^a-zA-Z0-9\-\.]/g, '_'));
}

export function ucfirst(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function lcfirst(str: string): string {
    if (!str) return str;
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export function camelCase(str: string): string {
    if (!str) return str;
    // Remove non-alphanumeric characters and split by them
    const words = str.split(/[^a-zA-Z0-9]+/);
    return words.map((word, i) => {
        if (i === 0) return lcfirst(word);
        return ucfirst(word);
    }).join('');
}

export function escape(str: string): string {
    if (!str) return str;
    return str.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}


/**
 * Write LiPD RDF Graph to a file
 * @param type Output format ('json', 'turtle', 'n3', 'ntriples', etc.)
 * @returns Serialized string
 */
export async function serializeStore(store: Store, type: string = 'turtle', logger: Logger): Promise<string> {
    try {
        const quads = store.getQuads(null, null, null, null);
        
        // Create a new N3 writer with the specified format
        const writer = new Writer({ format: type });
        
        // Add each quad to the writer
        for (const quad of quads) {
            writer.addQuad(quad);
        }
        
        // Get the serialized string
        return new Promise((resolve, reject) => {
            writer.end((error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    } catch (error) {
        logger.error('Error serializing graph: %s', error instanceof Error ? error.message : String(error));
        throw new Error(`Failed to serialize graph: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export function parseVariableValues(valuestr: string): any {
    if (Array.isArray(valuestr)) {
        return valuestr;
    }
    
    let values;
    try {
        // First try direct parsing
        values = JSON.parse(valuestr);
    } catch (error) {
        // If direct parsing fails, the string might be already stringified
        // or contain escaped quotes that need another layer of parsing
        try {
            // Remove any extra escaping if present
            const cleanedStr = valuestr.replace(/\\"/g, '"');
            // Replace any NaN values with null
            // more ways to handle NaN values but not if it appears in a string
            
            const parsedStr = cleanedStr.replace(/NaN/g, 'null')
                .replace(/\bNaN\b/g, 'null')
                .replace(/\bnan\b/g, 'null')
                .replace(/\bNAN\b/g, 'null')
                .replace(/"NaN"/g, 'null')
                .replace(/"nan"/g, 'null')
                .replace(/"NAN"/g, 'null');
            values = JSON.parse(parsedStr);
        } catch (innerError) {
            // If all parsing attempts fail, log the error and use the original string
            console.error('Failed to parse variable values:', innerError);
            values = valuestr;
        }
    }        
    return values;
}
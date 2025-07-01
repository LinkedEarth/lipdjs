import { Logger } from './logger';
import { LipdToRDF } from './lipdToRdf';
import { Store } from 'n3';

const logger = Logger.getInstance();

/**
 * Convert a single LiPD file to an RDF graph
 * @param args Tuple containing [lipdfile, standardize, addLabels]
 * @returns RDF graph for the LiPD file
 */
async function convertLipdToGraph(args: [string, boolean, boolean]): Promise<Store> {
    const [lipdfile, standardize, addLabels] = args;
    try {
        const converter = new LipdToRDF(standardize, addLabels);
        await converter.convert(lipdfile);
        return converter.store;
    } catch (error) {
        logger.error('Error converting LiPD file %s to RDF: %s', lipdfile, error instanceof Error ? error.message : String(error));
        throw error;
    }
}

/**
 * Load multiple LiPD files into an RDF graph
 * @param graph Target RDF graph to add data to
 * @param lipdFiles Array of LiPD file paths
 * @param parallel Whether to process files in parallel
 * @param standardize Whether to standardize the data
 * @param addLabels Whether to add labels
 * @returns Updated RDF graph
 */
export async function multiLoadLipd(
    store: Store,
    lipdFiles: string[],
    parallel: boolean = true,
    standardize: boolean = true,
    addLabels: boolean = true
): Promise<Store> {
    const args = lipdFiles.map(file => [file, standardize, addLabels] as [string, boolean, boolean]);
    
    if (parallel) {
        // Process files in parallel
        const promises = args.map(arg => convertLipdToGraph(arg));
        const subgraphs = await Promise.all(promises);
        
        // Add all subgraphs to the main graph
        for (const subgraph of subgraphs) {
            // Merge the subgraph into the main graph
            const quads = subgraph.getQuads(null, null, null, null);
            for (const quad of quads) {
                if (store.getQuads(quad.subject, quad.predicate, quad.object, quad.graph).length === 0) {
                    store.addQuad(quad);
                }
            }
        }
    } else {
        // Process files sequentially
        for (const arg of args) {
            const subgraph = await convertLipdToGraph(arg);
            // Merge the subgraph into the main graph
            const quads = subgraph.getQuads(null, null, null, null);
            for (const quad of quads) {
                if (store.getQuads(quad.subject, quad.predicate, quad.object, quad.graph).length === 0) {
                    store.addQuad(quad);
                }
            }
        }
    }
    
    return store;
} 
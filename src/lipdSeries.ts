import { Logger } from './utils/logger';
import { RDFGraph } from './rdfGraph';
import { LiPD } from './lipd';
import { Store } from 'n3';

const logger = Logger.getInstance();

export class LiPDSeries extends RDFGraph {
    private lipds: { [key: string]: LiPD } = {};

    constructor(graph?: Store) {
        super(graph);
    }

    /**
     * Load LiPD data into the series
     * @param lipd LiPD object to load
     */
    public load(lipd: LiPD): void {
        // TODO: Implement loading of LiPD data into series
    }
} 
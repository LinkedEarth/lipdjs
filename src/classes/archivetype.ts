
interface ArchiveTypeSynonym {
    id: string;
    label: string;
}

interface ArchiveTypeSynonyms {
    [key: string]: ArchiveTypeSynonym;
}

export class ArchiveType {
    private id: string;
    private label: string;
    static synonyms: ArchiveTypeSynonyms = {'borehole': {'id': 'http://linked.earth/ontology/archive#Borehole', 'label': 'Borehole'}, 'coral': {'id': 'http://linked.earth/ontology/archive#Coral', 'label': 'Coral'}, 'fluvial sediment': {'id': 'http://linked.earth/ontology/archive#FluvialSediment', 'label': 'Fluvial sediment'}, 'fluvialsediment': {'id': 'http://linked.earth/ontology/archive#FluvialSediment', 'label': 'Fluvial sediment'}, 'creek': {'id': 'http://linked.earth/ontology/archive#FluvialSediment', 'label': 'Fluvial sediment'}, 'fluvial': {'id': 'http://linked.earth/ontology/archive#FluvialSediment', 'label': 'Fluvial sediment'}, 'river': {'id': 'http://linked.earth/ontology/archive#FluvialSediment', 'label': 'Fluvial sediment'}, 'stream': {'id': 'http://linked.earth/ontology/archive#FluvialSediment', 'label': 'Fluvial sediment'}, 'glacier ice': {'id': 'http://linked.earth/ontology/archive#GlacierIce', 'label': 'Glacier ice'}, 'glacierice': {'id': 'http://linked.earth/ontology/archive#GlacierIce', 'label': 'Glacier ice'}, 'ice cores': {'id': 'http://linked.earth/ontology/archive#GlacierIce', 'label': 'Glacier ice'}, 'ground ice': {'id': 'http://linked.earth/ontology/archive#GroundIce', 'label': 'Ground ice'}, 'groundice': {'id': 'http://linked.earth/ontology/archive#GroundIce', 'label': 'Ground ice'}, 'bulk ice': {'id': 'http://linked.earth/ontology/archive#GroundIce', 'label': 'Ground ice'}, 'lake sediment': {'id': 'http://linked.earth/ontology/archive#LakeSediment', 'label': 'Lake sediment'}, 'lakesediment': {'id': 'http://linked.earth/ontology/archive#LakeSediment', 'label': 'Lake sediment'}, 'lagoon': {'id': 'http://linked.earth/ontology/archive#LakeSediment', 'label': 'Lake sediment'}, 'lake': {'id': 'http://linked.earth/ontology/archive#LakeSediment', 'label': 'Lake sediment'}, 'marine sediment': {'id': 'http://linked.earth/ontology/archive#MarineSediment', 'label': 'Marine sediment'}, 'marinesediment': {'id': 'http://linked.earth/ontology/archive#MarineSediment', 'label': 'Marine sediment'}, 'delta': {'id': 'http://linked.earth/ontology/archive#MarineSediment', 'label': 'Marine sediment'}, 'marine': {'id': 'http://linked.earth/ontology/archive#MarineSediment', 'label': 'Marine sediment'}, 'midden': {'id': 'http://linked.earth/ontology/archive#Midden', 'label': 'Midden'}, 'mollusk shell': {'id': 'http://linked.earth/ontology/archive#MolluskShell', 'label': 'Mollusk shell'}, 'molluskshell': {'id': 'http://linked.earth/ontology/archive#MolluskShell', 'label': 'Mollusk shell'}, 'bivalve': {'id': 'http://linked.earth/ontology/archive#MolluskShell', 'label': 'Mollusk shell'}, 'molluskshells': {'id': 'http://linked.earth/ontology/archive#MolluskShell', 'label': 'Mollusk shell'}, 'peat': {'id': 'http://linked.earth/ontology/archive#Peat', 'label': 'Peat'}, 'bog': {'id': 'http://linked.earth/ontology/archive#Peat', 'label': 'Peat'}, 'fen': {'id': 'http://linked.earth/ontology/archive#Peat', 'label': 'Peat'}, 'marsh': {'id': 'http://linked.earth/ontology/archive#Peat', 'label': 'Peat'}, 'mire': {'id': 'http://linked.earth/ontology/archive#Peat', 'label': 'Peat'}, 'swamp': {'id': 'http://linked.earth/ontology/archive#Peat', 'label': 'Peat'}, 'sclerosponge': {'id': 'http://linked.earth/ontology/archive#Sclerosponge', 'label': 'Sclerosponge'}, 'shoreline': {'id': 'http://linked.earth/ontology/archive#Shoreline', 'label': 'Shoreline'}, 'lake levels': {'id': 'http://linked.earth/ontology/archive#Shoreline', 'label': 'Shoreline'}, 'lakedeposit': {'id': 'http://linked.earth/ontology/archive#Shoreline', 'label': 'Shoreline'}, 'lakedeposits': {'id': 'http://linked.earth/ontology/archive#Shoreline', 'label': 'Shoreline'}, 'speleothem': {'id': 'http://linked.earth/ontology/archive#Speleothem', 'label': 'Speleothem'}, 'speleothems': {'id': 'http://linked.earth/ontology/archive#Speleothem', 'label': 'Speleothem'}, 'cave': {'id': 'http://linked.earth/ontology/archive#Speleothem', 'label': 'Speleothem'}, 'terrestrial sediment': {'id': 'http://linked.earth/ontology/archive#TerrestrialSediment', 'label': 'Terrestrial sediment'}, 'terrestrialsediment': {'id': 'http://linked.earth/ontology/archive#TerrestrialSediment', 'label': 'Terrestrial sediment'}, 'dune': {'id': 'http://linked.earth/ontology/archive#TerrestrialSediment', 'label': 'Terrestrial sediment'}, 'loess': {'id': 'http://linked.earth/ontology/archive#TerrestrialSediment', 'label': 'Terrestrial sediment'}, 'wood': {'id': 'http://linked.earth/ontology/archive#Wood', 'label': 'Wood'}, 'tree ring': {'id': 'http://linked.earth/ontology/archive#Wood', 'label': 'Wood'}, 'tree': {'id': 'http://linked.earth/ontology/archive#Wood', 'label': 'Wood'}, 'documents': {'id': 'http://linked.earth/ontology/archive#Documents', 'label': 'Documents'}, 'other': {'id': 'http://linked.earth/ontology/archive#Other', 'label': 'Other'}};

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }

    getId(): string {
        return this.id;
    }

    getLabel(): string {
        return this.label;
    }

    toData(): Record<string, any> {
        return {
            [this.id]: {
                label: [{
                    "@datatype": null,
                    "@type": "literal",
                    "@value": this.label
                }]
            }
        };
    }

    toJson(): string {
        return this.label;
    }

    static fromSynonym(synonym: string): ArchiveType | null {
        const lowerSynonym = synonym.toLowerCase();
        if (lowerSynonym in ArchiveType.synonyms) {
            const synobj = ArchiveType.synonyms[lowerSynonym];
            return new ArchiveType(synobj.id, synobj.label);
        }
        return null;
    }
}

export const ArchiveTypeConstants = {
    Borehole: new ArchiveType( "http://linked.earth/ontology/archive#Borehole", "Borehole" ),
    Coral: new ArchiveType( "http://linked.earth/ontology/archive#Coral", "Coral" ),
    FluvialSediment: new ArchiveType( "http://linked.earth/ontology/archive#FluvialSediment", "Fluvial sediment" ),
    GlacierIce: new ArchiveType( "http://linked.earth/ontology/archive#GlacierIce", "Glacier ice" ),
    GroundIce: new ArchiveType( "http://linked.earth/ontology/archive#GroundIce", "Ground ice" ),
    LakeSediment: new ArchiveType( "http://linked.earth/ontology/archive#LakeSediment", "Lake sediment" ),
    MarineSediment: new ArchiveType( "http://linked.earth/ontology/archive#MarineSediment", "Marine sediment" ),
    Midden: new ArchiveType( "http://linked.earth/ontology/archive#Midden", "Midden" ),
    MolluskShell: new ArchiveType( "http://linked.earth/ontology/archive#MolluskShell", "Mollusk shell" ),
    Peat: new ArchiveType( "http://linked.earth/ontology/archive#Peat", "Peat" ),
    Sclerosponge: new ArchiveType( "http://linked.earth/ontology/archive#Sclerosponge", "Sclerosponge" ),
    Shoreline: new ArchiveType( "http://linked.earth/ontology/archive#Shoreline", "Shoreline" ),
    Speleothem: new ArchiveType( "http://linked.earth/ontology/archive#Speleothem", "Speleothem" ),
    TerrestrialSediment: new ArchiveType( "http://linked.earth/ontology/archive#TerrestrialSediment", "Terrestrial sediment" ),
    Wood: new ArchiveType( "http://linked.earth/ontology/archive#Wood", "Wood" ),
    Documents: new ArchiveType( "http://linked.earth/ontology/archive#Documents", "Documents" ),
    Other: new ArchiveType( "http://linked.earth/ontology/archive#Other", "Other" ),
};
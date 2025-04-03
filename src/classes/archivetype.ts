
// Auto-generated. Do not edit.
import { SYNONYMS } from "../globals/synonyms";

export class ArchiveType {
    private id: string;
    private label: string;
    static synonyms: any = SYNONYMS.ARCHIVES?.ArchiveType;

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }

    equals(value: ArchiveType): boolean {
        return this.id === value.id;
    }

    getLabel(): string {
        return this.label;
    }

    getId(): string {
        return this.id;
    }

    toData(data: Record<string, any> = {}): Record<string, any> {
        data[this.id] = {
            "label": [
                {
                    "@datatype": null,
                    "@type": "literal",
                    "@value": this.label
                }
            ]
        };
        return data;
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

export class ArchiveTypeConstants {
    static Borehole = new ArchiveType("http://linked.earth/ontology/archive#Borehole", "Borehole");
    static Coral = new ArchiveType("http://linked.earth/ontology/archive#Coral", "Coral");
    static FluvialSediment = new ArchiveType("http://linked.earth/ontology/archive#FluvialSediment", "Fluvial sediment");
    static GlacierIce = new ArchiveType("http://linked.earth/ontology/archive#GlacierIce", "Glacier ice");
    static GroundIce = new ArchiveType("http://linked.earth/ontology/archive#GroundIce", "Ground ice");
    static LakeSediment = new ArchiveType("http://linked.earth/ontology/archive#LakeSediment", "Lake sediment");
    static MarineSediment = new ArchiveType("http://linked.earth/ontology/archive#MarineSediment", "Marine sediment");
    static Midden = new ArchiveType("http://linked.earth/ontology/archive#Midden", "Midden");
    static MolluskShell = new ArchiveType("http://linked.earth/ontology/archive#MolluskShell", "Mollusk shell");
    static Peat = new ArchiveType("http://linked.earth/ontology/archive#Peat", "Peat");
    static Sclerosponge = new ArchiveType("http://linked.earth/ontology/archive#Sclerosponge", "Sclerosponge");
    static Shoreline = new ArchiveType("http://linked.earth/ontology/archive#Shoreline", "Shoreline");
    static Speleothem = new ArchiveType("http://linked.earth/ontology/archive#Speleothem", "Speleothem");
    static TerrestrialSediment = new ArchiveType("http://linked.earth/ontology/archive#TerrestrialSediment", "Terrestrial sediment");
    static Wood = new ArchiveType("http://linked.earth/ontology/archive#Wood", "Wood");
    static Documents = new ArchiveType("http://linked.earth/ontology/archive#Documents", "Documents");
    static Other = new ArchiveType("http://linked.earth/ontology/archive#Other", "Other");
}
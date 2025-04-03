
// Auto-generated. Do not edit.
import { SYNONYMS } from "../globals/synonyms";

export class InterpretationVariable {
    private id: string;
    private label: string;
    static synonyms: any = SYNONYMS.INTERPRETATION?.InterpretationVariable;

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }

    equals(value: InterpretationVariable): boolean {
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

    static fromSynonym(synonym: string): InterpretationVariable | null {
        const lowerSynonym = synonym.toLowerCase();
        if (lowerSynonym in InterpretationVariable.synonyms) {
            const synobj = InterpretationVariable.synonyms[lowerSynonym];
            return new InterpretationVariable(synobj.id, synobj.label);
        }
        return null;
    }
}

export class InterpretationVariableConstants {
    static C3C4Ratio = new InterpretationVariable("http://linked.earth/ontology/interpretation#C3C4Ratio", "C3C4Ratio");
    static circulationIndex = new InterpretationVariable("http://linked.earth/ontology/interpretation#circulationIndex", "circulationIndex");
    static circulationVariable = new InterpretationVariable("http://linked.earth/ontology/interpretation#circulationVariable", "circulationVariable");
    static dissolvedOxygen = new InterpretationVariable("http://linked.earth/ontology/interpretation#dissolvedOxygen", "dissolvedOxygen");
    static dust = new InterpretationVariable("http://linked.earth/ontology/interpretation#dust", "dust");
    static ELA = new InterpretationVariable("http://linked.earth/ontology/interpretation#ELA", "ELA");
    static evaporation = new InterpretationVariable("http://linked.earth/ontology/interpretation#evaporation", "evaporation");
    static fire = new InterpretationVariable("http://linked.earth/ontology/interpretation#fire", "fire");
    static growingDegreeDays = new InterpretationVariable("http://linked.earth/ontology/interpretation#growingDegreeDays", "growingDegreeDays");
    static hydrologicBalance = new InterpretationVariable("http://linked.earth/ontology/interpretation#hydrologicBalance", "hydrologicBalance");
    static lakeWaterIsotope = new InterpretationVariable("http://linked.earth/ontology/interpretation#lakeWaterIsotope", "lakeWaterIsotope");
    static meltwater = new InterpretationVariable("http://linked.earth/ontology/interpretation#meltwater", "meltwater");
    static needsToBeReplaced = new InterpretationVariable("http://linked.earth/ontology/interpretation#needsToBeReplaced", "needsToBeReplaced");
    static P_E = new InterpretationVariable("http://linked.earth/ontology/interpretation#P-E", "P-E");
    static precipitation = new InterpretationVariable("http://linked.earth/ontology/interpretation#precipitation", "precipitation");
    static precipitationDeuteriumExcess = new InterpretationVariable("http://linked.earth/ontology/interpretation#precipitationDeuteriumExcess", "precipitationDeuteriumExcess");
    static precipitationIsotope = new InterpretationVariable("http://linked.earth/ontology/interpretation#precipitationIsotope", "precipitationIsotope");
    static productivity = new InterpretationVariable("http://linked.earth/ontology/interpretation#productivity", "productivity");
    static relativeHumidity = new InterpretationVariable("http://linked.earth/ontology/interpretation#relativeHumidity", "relativeHumidity");
    static salinity = new InterpretationVariable("http://linked.earth/ontology/interpretation#salinity", "salinity");
    static seaIce = new InterpretationVariable("http://linked.earth/ontology/interpretation#seaIce", "seaIce");
    static seasonality = new InterpretationVariable("http://linked.earth/ontology/interpretation#seasonality", "seasonality");
    static seawaterIsotope = new InterpretationVariable("http://linked.earth/ontology/interpretation#seawaterIsotope", "seawaterIsotope");
    static streamflow = new InterpretationVariable("http://linked.earth/ontology/interpretation#streamflow", "streamflow");
    static sunlight = new InterpretationVariable("http://linked.earth/ontology/interpretation#sunlight", "sunlight");
    static surfacePressure = new InterpretationVariable("http://linked.earth/ontology/interpretation#surfacePressure", "surfacePressure");
    static temperature = new InterpretationVariable("http://linked.earth/ontology/interpretation#temperature", "temperature");
    static upwelling = new InterpretationVariable("http://linked.earth/ontology/interpretation#upwelling", "upwelling");
    static windSpeed = new InterpretationVariable("http://linked.earth/ontology/interpretation#windSpeed", "windSpeed");
}
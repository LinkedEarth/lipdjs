
// Auto-generated. Do not edit.
import { SYNONYMS } from "../globals/synonyms";

export class InterpretationSeasonality {
    private id: string;
    private label: string;
    static synonyms: any = SYNONYMS.INTERPRETATION?.InterpretationSeasonality;

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }

    equals(value: InterpretationSeasonality): boolean {
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

    static fromSynonym(synonym: string): InterpretationSeasonality | null {
        const lowerSynonym = synonym.toLowerCase();
        if (lowerSynonym in InterpretationSeasonality.synonyms) {
            const synobj = InterpretationSeasonality.synonyms[lowerSynonym];
            return new InterpretationSeasonality(synobj.id, synobj.label);
        }
        return null;
    }
}

export class InterpretationSeasonalityConstants {
    static Oct_May = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Oct-May", "Oct-May");
    static Jun = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jun", "Jun");
    static Jul = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jul", "Jul");
    static Aug = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Aug", "Aug");
    static Annual = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Annual", "Annual");
    static Winter = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Winter", "Winter");
    static Apr = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Apr", "Apr");
    static Apr_Aug = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Apr-Aug", "Apr-Aug");
    static Apr_Dec = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Apr-Dec", "Apr-Dec");
    static Apr_Feb = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Apr-Feb", "Apr-Feb");
    static Apr_Jan = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Apr-Jan", "Apr-Jan");
    static Apr_Jul = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Apr-Jul", "Apr-Jul");
    static Apr_Jun = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Apr-Jun", "Apr-Jun");
    static Apr_Mar = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Apr-Mar", "Apr-Mar");
    static Apr_May = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Apr-May", "Apr-May");
    static Apr_Nov = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Apr-Nov", "Apr-Nov");
    static Apr_Oct = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Apr-Oct", "Apr-Oct");
    static Apr_Sep = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Apr-Sep", "Apr-Sep");
    static Summer = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Summer", "Summer");
    static Aug_Apr = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Aug-Apr", "Aug-Apr");
    static Aug_Dec = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Aug-Dec", "Aug-Dec");
    static Aug_Feb = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Aug-Feb", "Aug-Feb");
    static Aug_Jan = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Aug-Jan", "Aug-Jan");
    static Aug_Jul = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Aug-Jul", "Aug-Jul");
    static Aug_Jun = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Aug-Jun", "Aug-Jun");
    static Aug_Mar = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Aug-Mar", "Aug-Mar");
    static Aug_May = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Aug-May", "Aug-May");
    static Aug_Nov = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Aug-Nov", "Aug-Nov");
    static Aug_Oct = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Aug-Oct", "Aug-Oct");
    static Aug_Sep = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Aug-Sep", "Aug-Sep");
    static Growing_Season = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Growing_Season", "Growing Season");
    static Coldest_Month = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Coldest_Month", "Coldest Month");
    static Dec_Apr = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Dec-Apr", "Dec-Apr");
    static Dec_Aug = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Dec-Aug", "Dec-Aug");
    static Dec_Feb = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Dec-Feb", "Dec-Feb");
    static Dec_Jan = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Dec-Jan", "Dec-Jan");
    static Dec_Jul = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Dec-Jul", "Dec-Jul");
    static Dec_Jun = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Dec-Jun", "Dec-Jun");
    static Dec_Mar = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Dec-Mar", "Dec-Mar");
    static Dec_May = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Dec-May", "Dec-May");
    static Dec_Oct = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Dec-Oct", "Dec-Oct");
    static Dec_Sep = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Dec-Sep", "Dec-Sep");
    static Fall = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Fall", "Fall");
    static Feb_Aug = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Feb-Aug", "Feb-Aug");
    static Feb_Apr = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Feb-Apr", "Feb-Apr");
    static Feb_Dec = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Feb-Dec", "Feb-Dec");
    static Feb_Jul = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Feb-Jul", "Feb-Jul");
    static Feb_Jun = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Feb-Jun", "Feb-Jun");
    static Feb_Mar = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Feb-Mar", "Feb-Mar");
    static Feb_May = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Feb-May", "Feb-May");
    static Feb_Nov = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Feb-Nov", "Feb-Nov");
    static Feb_Oct = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Feb-Oct", "Feb-Oct");
    static Feb_Sep = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Feb-Sep", "Feb-Sep");
    static Jan = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jan", "Jan");
    static Jan_Apr = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jan-Apr", "Jan-Apr");
    static Jan_Aug = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jan-Aug", "Jan-Aug");
    static Jan_Feb = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jan-Feb", "Jan-Feb");
    static Jan_Jul = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jan-Jul", "Jan-Jul");
    static Jan_Jun = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jan-Jun", "Jan-Jun");
    static Jan_Mar = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jan-Mar", "Jan-Mar");
    static Jan_May = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jan-May", "Jan-May");
    static Jan_Nov = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jan-Nov", "Jan-Nov");
    static Jan_Oct = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jan-Oct", "Jan-Oct");
    static Jan_Sep = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jan-Sep", "Jan-Sep");
    static May_Sep = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#May-Sep", "May-Sep");
    static Jul_Apr = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jul-Apr", "Jul-Apr");
    static Jul_Aug = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jul-Aug", "Jul-Aug");
    static Jul_Dec = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jul-Dec", "Jul-Dec");
    static Jul_Feb = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jul-Feb", "Jul-Feb");
    static Jul_Jan = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jul-Jan", "Jul-Jan");
    static Jul_Jun = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jul-Jun", "Jul-Jun");
    static Jul_Mar = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jul-Mar", "Jul-Mar");
    static Jul_May = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jul-May", "Jul-May");
    static Jul_Nov = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jul-Nov", "Jul-Nov");
    static Jul_Oct = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jul-Oct", "Jul-Oct");
    static Jul_Sep = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jul-Sep", "Jul-Sep");
    static Jun_Apr = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jun-Apr", "Jun-Apr");
    static Jun_Aug = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jun-Aug", "Jun-Aug");
    static Jun_Sep = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jun-Sep", "Jun-Sep");
    static Jun_Dec = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jun-Dec", "Jun-Dec");
    static Jun_Feb = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jun-Feb", "Jun-Feb");
    static Jun_Jan = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jun-Jan", "Jun-Jan");
    static Jun_Jul = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jun-Jul", "Jun-Jul");
    static Jun_Mar = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jun-Mar", "Jun-Mar");
    static Jun_Nov = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jun-Nov", "Jun-Nov");
    static Jun_Oct = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Jun-Oct", "Jun-Oct");
    static Mar = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Mar", "Mar");
    static Mar_Apr = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Mar-Apr", "Mar-Apr");
    static Mar_Aug = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Mar-Aug", "Mar-Aug");
    static Mar_Dec = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Mar-Dec", "Mar-Dec");
    static Mar_Jan = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Mar-Jan", "Mar-Jan");
    static Mar_Jul = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Mar-Jul", "Mar-Jul");
    static Mar_Jun = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Mar-Jun", "Mar-Jun");
    static Mar_May = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Mar-May", "Mar-May");
    static Mar_Nov = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Mar-Nov", "Mar-Nov");
    static Mar_Oct = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Mar-Oct", "Mar-Oct");
    static Mar_Sep = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Mar-Sep", "Mar-Sep");
    static May_Apr = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#May-Apr", "May-Apr");
    static May_Aug = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#May-Aug", "May-Aug");
    static May_Dec = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#May-Dec", "May-Dec");
    static May_Oct = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#May-Oct", "May-Oct");
    static May_Feb = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#May-Feb", "May-Feb");
    static May_Jan = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#May-Jan", "May-Jan");
    static May_Jul = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#May-Jul", "May-Jul");
    static May_Jun = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#May-Jun", "May-Jun");
    static May_Mar = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#May-Mar", "May-Mar");
    static May_Nov = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#May-Nov", "May-Nov");
    static needsToBeChanged = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#needsToBeChanged", "needsToBeChanged");
    static Nov_Apr = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Nov-Apr", "Nov-Apr");
    static Nov_Aug = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Nov-Aug", "Nov-Aug");
    static Nov_Dec = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Nov-Dec", "Nov-Dec");
    static Nov_Feb = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Nov-Feb", "Nov-Feb");
    static Nov_Jan = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Nov-Jan", "Nov-Jan");
    static Nov_Jul = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Nov-Jul", "Nov-Jul");
    static Nov_Jun = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Nov-Jun", "Nov-Jun");
    static Nov_Mar = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Nov-Mar", "Nov-Mar");
    static Nov_May = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Nov-May", "Nov-May");
    static Nov_Oct = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Nov-Oct", "Nov-Oct");
    static Nov_Sep = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Nov-Sep", "Nov-Sep");
    static Oct_Apr = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Oct-Apr", "Oct-Apr");
    static Oct_Aug = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Oct-Aug", "Oct-Aug");
    static Oct_Dec = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Oct-Dec", "Oct-Dec");
    static Oct_Feb = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Oct-Feb", "Oct-Feb");
    static Oct_Jan = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Oct-Jan", "Oct-Jan");
    static Oct_Jul = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Oct-Jul", "Oct-Jul");
    static Oct_Jun = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Oct-Jun", "Oct-Jun");
    static Oct_Mar = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Oct-Mar", "Oct-Mar");
    static Oct_Nov = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Oct-Nov", "Oct-Nov");
    static Oct_Sep = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Oct-Sep", "Oct-Sep");
    static Sep_Apr = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Sep-Apr", "Sep-Apr");
    static Sep_Aug = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Sep-Aug", "Sep-Aug");
    static Sep_Dec = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Sep-Dec", "Sep-Dec");
    static Sep_Feb = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Sep-Feb", "Sep-Feb");
    static Sep_Jan = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Sep-Jan", "Sep-Jan");
    static Sep_Jul = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Sep-Jul", "Sep-Jul");
    static Sep_Jun = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Sep-Jun", "Sep-Jun");
    static Sep_Mar = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Sep-Mar", "Sep-Mar");
    static Sep_May = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Sep-May", "Sep-May");
    static Sep_Nov = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Sep-Nov", "Sep-Nov");
    static Sep_Oct = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Sep-Oct", "Sep-Oct");
    static Spr_Sum = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Spr-Sum", "Spr-Sum");
    static Spring = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Spring", "Spring");
    static subannual = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#subannual", "subannual");
    static Warmest_Month = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Warmest_Month", "Warmest Month");
    static Wet_Season = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Wet_Season", "Wet Season");
    static Win_Spr = new InterpretationSeasonality("http://linked.earth/ontology/interpretation#Win-Spr", "Win-Spr");
}
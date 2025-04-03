
// Auto-generated. Do not edit.
import { SYNONYMS } from "../globals/synonyms";

export class PaleoUnit {
    private id: string;
    private label: string;
    static synonyms: any = SYNONYMS.UNITS?.PaleoUnit;

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }

    equals(value: PaleoUnit): boolean {
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

    static fromSynonym(synonym: string): PaleoUnit | null {
        const lowerSynonym = synonym.toLowerCase();
        if (lowerSynonym in PaleoUnit.synonyms) {
            const synobj = PaleoUnit.synonyms[lowerSynonym];
            return new PaleoUnit(synobj.id, synobj.label);
        }
        return null;
    }
}

export class PaleoUnitConstants {
    static atomic_ratio = new PaleoUnit("http://linked.earth/ontology/paleo_units#atomic_ratio", "atomic ratio");
    static cgs = new PaleoUnit("http://linked.earth/ontology/paleo_units#cgs", "cgs");
    static cm = new PaleoUnit("http://linked.earth/ontology/paleo_units#cm", "cm");
    static cm_kyr = new PaleoUnit("http://linked.earth/ontology/paleo_units#cm_kyr", "cm/kyr");
    static cm_yr = new PaleoUnit("http://linked.earth/ontology/paleo_units#cm_yr", "cm/yr");
    static cm3 = new PaleoUnit("http://linked.earth/ontology/paleo_units#cm3", "cm3");
    static count = new PaleoUnit("http://linked.earth/ontology/paleo_units#count", "count");
    static count_century = new PaleoUnit("http://linked.earth/ontology/paleo_units#count_century", "count/century");
    static count_cm2 = new PaleoUnit("http://linked.earth/ontology/paleo_units#count_cm2", "count/cm2");
    static count_cm2_yr = new PaleoUnit("http://linked.earth/ontology/paleo_units#count_cm2_yr", "count/cm2/yr");
    static count_cm3 = new PaleoUnit("http://linked.earth/ontology/paleo_units#count_cm3", "count/cm3");
    static count_g = new PaleoUnit("http://linked.earth/ontology/paleo_units#count_g", "count/g");
    static count_kyr = new PaleoUnit("http://linked.earth/ontology/paleo_units#count_kyr", "count/kyr");
    static count_mL = new PaleoUnit("http://linked.earth/ontology/paleo_units#count_mL", "count/mL");
    static count_yr = new PaleoUnit("http://linked.earth/ontology/paleo_units#count_yr", "count/yr");
    static cps = new PaleoUnit("http://linked.earth/ontology/paleo_units#cps", "cps");
    static day = new PaleoUnit("http://linked.earth/ontology/paleo_units#day", "day");
    static degC = new PaleoUnit("http://linked.earth/ontology/paleo_units#degC", "degC");
    static degree = new PaleoUnit("http://linked.earth/ontology/paleo_units#degree", "degree");
    static fraction = new PaleoUnit("http://linked.earth/ontology/paleo_units#fraction", "fraction");
    static g = new PaleoUnit("http://linked.earth/ontology/paleo_units#g", "g");
    static g_cm_yr = new PaleoUnit("http://linked.earth/ontology/paleo_units#g_cm_yr", "g/cm/yr");
    static g_cm2 = new PaleoUnit("http://linked.earth/ontology/paleo_units#g_cm2", "g/cm2");
    static g_cm2_kyr = new PaleoUnit("http://linked.earth/ontology/paleo_units#g_cm2_kyr", "g/cm2/kyr");
    static g_cm2_yr = new PaleoUnit("http://linked.earth/ontology/paleo_units#g_cm2_yr", "g/cm2/yr");
    static g_cm3 = new PaleoUnit("http://linked.earth/ontology/paleo_units#g_cm3", "g/cm3");
    static g_L = new PaleoUnit("http://linked.earth/ontology/paleo_units#g_L", "g/L");
    static g_m2 = new PaleoUnit("http://linked.earth/ontology/paleo_units#g_m2", "g/m2");
    static g_m2_yr = new PaleoUnit("http://linked.earth/ontology/paleo_units#g_m2_yr", "g/m2/yr");
    static grayscale = new PaleoUnit("http://linked.earth/ontology/paleo_units#grayscale", "grayscale");
    static kg_m2_yr = new PaleoUnit("http://linked.earth/ontology/paleo_units#kg_m2_yr", "kg/m2/yr");
    static kg_m3 = new PaleoUnit("http://linked.earth/ontology/paleo_units#kg_m3", "kg/m3");
    static km2 = new PaleoUnit("http://linked.earth/ontology/paleo_units#km2", "km2");
    static km3 = new PaleoUnit("http://linked.earth/ontology/paleo_units#km3", "km3");
    static log_mg_L_ = new PaleoUnit("http://linked.earth/ontology/paleo_units#log_mg_L_", "log(mg/L)");
    static m = new PaleoUnit("http://linked.earth/ontology/paleo_units#m", "m");
    static m3_kg = new PaleoUnit("http://linked.earth/ontology/paleo_units#m3_kg", "m3/kg");
    static mg = new PaleoUnit("http://linked.earth/ontology/paleo_units#mg", "mg");
    static mg_cm2_yr = new PaleoUnit("http://linked.earth/ontology/paleo_units#mg_cm2_yr", "mg/cm2/yr");
    static mg_g = new PaleoUnit("http://linked.earth/ontology/paleo_units#mg_g", "mg/g");
    static mg_kg = new PaleoUnit("http://linked.earth/ontology/paleo_units#mg_kg", "mg/kg");
    static mg_L = new PaleoUnit("http://linked.earth/ontology/paleo_units#mg_L", "mg/L");
    static mm = new PaleoUnit("http://linked.earth/ontology/paleo_units#mm", "mm");
    static mm_day = new PaleoUnit("http://linked.earth/ontology/paleo_units#mm_day", "mm/day");
    static mm_season = new PaleoUnit("http://linked.earth/ontology/paleo_units#mm_season", "mm/season");
    static mm_yr = new PaleoUnit("http://linked.earth/ontology/paleo_units#mm_yr", "mm/yr");
    static mmol_mol = new PaleoUnit("http://linked.earth/ontology/paleo_units#mmol_mol", "mmol/mol");
    static months_year = new PaleoUnit("http://linked.earth/ontology/paleo_units#months_year", "months/year");
    static needsToBeChanged = new PaleoUnit("http://linked.earth/ontology/paleo_units#needsToBeChanged", "needsToBeChanged");
    static ng = new PaleoUnit("http://linked.earth/ontology/paleo_units#ng", "ng");
    static ng_g = new PaleoUnit("http://linked.earth/ontology/paleo_units#ng_g", "ng/g");
    static peak_area = new PaleoUnit("http://linked.earth/ontology/paleo_units#peak_area", "peak area");
    static percent = new PaleoUnit("http://linked.earth/ontology/paleo_units#percent", "percent");
    static permil = new PaleoUnit("http://linked.earth/ontology/paleo_units#permil", "permil");
    static pH = new PaleoUnit("http://linked.earth/ontology/paleo_units#pH", "pH");
    static ppb = new PaleoUnit("http://linked.earth/ontology/paleo_units#ppb", "ppb");
    static ppm = new PaleoUnit("http://linked.earth/ontology/paleo_units#ppm", "ppm");
    static practical_salinity_unit = new PaleoUnit("http://linked.earth/ontology/paleo_units#practical_salinity_unit", "practical salinity unit");
    static ratio = new PaleoUnit("http://linked.earth/ontology/paleo_units#ratio", "ratio");
    static SI = new PaleoUnit("http://linked.earth/ontology/paleo_units#SI", "SI");
    static ug_cm2_yr = new PaleoUnit("http://linked.earth/ontology/paleo_units#ug_cm2_yr", "ug/cm2/yr");
    static ug_g = new PaleoUnit("http://linked.earth/ontology/paleo_units#ug_g", "ug/g");
    static um = new PaleoUnit("http://linked.earth/ontology/paleo_units#um", "um");
    static umol_mol = new PaleoUnit("http://linked.earth/ontology/paleo_units#umol_mol", "umol/mol");
    static unitless = new PaleoUnit("http://linked.earth/ontology/paleo_units#unitless", "unitless");
    static yr_14C_BP = new PaleoUnit("http://linked.earth/ontology/paleo_units#yr_14C_BP", "yr 14C BP");
    static yr_AD = new PaleoUnit("http://linked.earth/ontology/paleo_units#yr_AD", "yr AD");
    static yr_b2k = new PaleoUnit("http://linked.earth/ontology/paleo_units#yr_b2k", "yr b2k");
    static yr_BP = new PaleoUnit("http://linked.earth/ontology/paleo_units#yr_BP", "yr BP");
    static yr_ka = new PaleoUnit("http://linked.earth/ontology/paleo_units#yr_ka", "yr ka");
    static z_score = new PaleoUnit("http://linked.earth/ontology/paleo_units#z_score", "z score");
}
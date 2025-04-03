
// Auto-generated. Do not edit.
import { SYNONYMS } from "../globals/synonyms";

export class PaleoProxy {
    private id: string;
    private label: string;
    static synonyms: any = SYNONYMS.PROXIES?.PaleoProxy;

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }

    equals(value: PaleoProxy): boolean {
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

    static fromSynonym(synonym: string): PaleoProxy | null {
        const lowerSynonym = synonym.toLowerCase();
        if (lowerSynonym in PaleoProxy.synonyms) {
            const synobj = PaleoProxy.synonyms[lowerSynonym];
            return new PaleoProxy(synobj.id, synobj.label);
        }
        return null;
    }
}

export class PaleoProxyConstants {
    static accumulation_rate = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#accumulation_rate", "accumulation rate");
    static ACL = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#ACL", "ACL");
    static Al2O3 = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Al2O3", "Al2O3");
    static alkenone = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#alkenone", "alkenone");
    static amoeba = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#amoeba", "amoeba");
    static Ba_Al = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Ba_Al", "Ba/Al");
    static Ba_Ca = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Ba_Ca", "Ba/Ca");
    static biomarker = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#biomarker", "biomarker");
    static BIT = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#BIT", "BIT");
    static borehole = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#borehole", "borehole");
    static BSi = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#BSi", "BSi");
    static bubble_frequency = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#bubble_frequency", "bubble frequency");
    static bulk_density = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#bulk_density", "bulk density");
    static bulk_sediment = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#bulk_sediment", "bulk sediment");
    static C_N = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#C_N", "C/N");
    static Ca_K = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Ca_K", "Ca/K");
    static Ca_Ti = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Ca_Ti", "Ca/Ti");
    static CaCO3 = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#CaCO3", "CaCO3");
    static calcification_rate = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#calcification_rate", "calcification rate");
    static calcite = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#calcite", "calcite");
    static carbonate = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#carbonate", "carbonate");
    static cellulose = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#cellulose", "cellulose");
    static charcoal = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#charcoal", "charcoal");
    static chironomid = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#chironomid", "chironomid");
    static chlorophyll = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#chlorophyll", "chlorophyll");
    static chrysophyte_assemblage = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#chrysophyte_assemblage", "chrysophyte assemblage");
    static cladoceran = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#cladoceran", "cladoceran");
    static coccolithophore = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#coccolithophore", "coccolithophore");
    static d13C = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#d13C", "d13C");
    static d15N = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#d15N", "d15N");
    static d15N_d40Ar = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#d15N_d40Ar", "d15N/d40Ar");
    static d18O = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#d18O", "d18O");
    static dD = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#dD", "dD");
    static deuterium_excess = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#deuterium_excess", "deuterium excess");
    static diatom = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#diatom", "diatom");
    static dinocyst = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#dinocyst", "dinocyst");
    static dry_bulk_density = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#dry_bulk_density", "dry bulk density");
    static Eu_Zr = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Eu_Zr", "Eu/Zr");
    static Fe = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Fe", "Fe");
    static Fe_Al = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Fe_Al", "Fe/Al");
    static foraminifera = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#foraminifera", "foraminifera");
    static GDGT = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#GDGT", "GDGT");
    static grain_size = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#grain_size", "grain size");
    static HBI = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#HBI", "HBI");
    static historical = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#historical", "historical");
    static humification = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#humification", "humification");
    static ice_accumulation = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#ice_accumulation", "ice accumulation");
    static ice_melt = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#ice_melt", "ice melt");
    static inorganic_carbon = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#inorganic_carbon", "inorganic carbon");
    static IP25 = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#IP25", "IP25");
    static lake_level = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#lake_level", "lake level");
    static latewood_cellulose = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#latewood_cellulose", "latewood cellulose");
    static LDI = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#LDI", "LDI");
    static macrofossils = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#macrofossils", "macrofossils");
    static magnetic = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#magnetic", "magnetic");
    static magnetic_susceptibility = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#magnetic_susceptibility", "magnetic susceptibility");
    static mass_accumulation_rate = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#mass_accumulation_rate", "mass accumulation rate");
    static maximum_latewood_density = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#maximum_latewood_density", "maximum latewood density");
    static Mg = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Mg", "Mg");
    static Mg_Ca = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Mg_Ca", "Mg/Ca");
    static multiproxy = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#multiproxy", "multiproxy");
    static Ti = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Ti", "Ti");
    static needs_to_be_changed = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#needs_to_be_changed", "needs to be changed");
    static needsToBeChanged = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#needsToBeChanged", "needsToBeChanged");
    static ostracod = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#ostracod", "ostracod");
    static P_aqueous = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#P-aqueous", "P-aqueous");
    static peat_ash = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#peat_ash", "peat ash");
    static pH = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#pH", "pH");
    static pollen = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#pollen", "pollen");
    static radiolaria = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#radiolaria", "radiolaria");
    static Rb = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Rb", "Rb");
    static Rb_Sr = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Rb_Sr", "Rb/Sr");
    static reflectance = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#reflectance", "reflectance");
    static ring_width = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#ring_width", "ring width");
    static Sr = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Sr", "Sr");
    static Sr_Ca = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Sr_Ca", "Sr/Ca");
    static stratigraphy = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#stratigraphy", "stratigraphy");
    static sulfur = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#sulfur", "sulfur");
    static TEX86 = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#TEX86", "TEX86");
    static Ti_Al = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Ti_Al", "Ti/Al");
    static Ti_Ca = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#Ti_Ca", "Ti/Ca");
    static TOC = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#TOC", "TOC");
    static total_nitrogen = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#total_nitrogen", "total nitrogen");
    static varve_thickness = new PaleoProxy("http://linked.earth/ontology/paleo_proxy#varve_thickness", "varve thickness");
}
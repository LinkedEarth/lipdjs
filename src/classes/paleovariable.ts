
// Auto-generated. Do not edit.
import { SYNONYMS } from "../globals/synonyms";

export class PaleoVariable {
    private id: string;
    private label: string;
    static synonyms: any = SYNONYMS.VARIABLES?.PaleoVariable;

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }

    equals(value: PaleoVariable): boolean {
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

    static fromSynonym(synonym: string): PaleoVariable | null {
        const lowerSynonym = synonym.toLowerCase();
        if (lowerSynonym in PaleoVariable.synonyms) {
            const synobj = PaleoVariable.synonyms[lowerSynonym];
            return new PaleoVariable(synobj.id, synobj.label);
        }
        return null;
    }
}

export class PaleoVariableConstants {
    static ACL = new PaleoVariable("http://linked.earth/ontology/paleo_variables#ACL", "ACL");
    static AET_PET = new PaleoVariable("http://linked.earth/ontology/paleo_variables#AET_PET", "AET/PET");
    static ARM_IRM = new PaleoVariable("http://linked.earth/ontology/paleo_variables#ARM_IRM", "ARM/IRM");
    static ARSTAN = new PaleoVariable("http://linked.earth/ontology/paleo_variables#ARSTAN", "ARSTAN");
    static Al = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Al", "Al");
    static Al2O3 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Al2O3", "Al2O3");
    static As = new PaleoVariable("http://linked.earth/ontology/paleo_variables#As", "As");
    static BIT = new PaleoVariable("http://linked.earth/ontology/paleo_variables#BIT", "BIT");
    static BSi = new PaleoVariable("http://linked.earth/ontology/paleo_variables#BSi", "BSi");
    static Ba = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Ba", "Ba");
    static Ba_Al = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Ba_Al", "Ba/Al");
    static Ba_Ca = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Ba_Ca", "Ba/Ca");
    static Be = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Be", "Be");
    static Br = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Br", "Br");
    static C20n_alkenoicAcid = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C20n-alkenoicAcid", "C20n-alkenoicAcid");
    static C21n_alkanoicAcid = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C21n-alkanoicAcid", "C21n-alkanoicAcid");
    static C22n_alkanoicAcid = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C22n-alkanoicAcid", "C22n-alkanoicAcid");
    static C23n_alkanoicAcid = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C23n-alkanoicAcid", "C23n-alkanoicAcid");
    static C24n_alkanoicAcid = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C24n-alkanoicAcid", "C24n-alkanoicAcid");
    static C25_2n_alkanoicAcid = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C25_2n-alkanoicAcid", "C25_2n-alkanoicAcid");
    static C25n_alkanoicAcid = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C25n-alkanoicAcid", "C25n-alkanoicAcid");
    static C26n_alkanoicAcid = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C26n-alkanoicAcid", "C26n-alkanoicAcid");
    static C27n_alkanoicAcid = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C27n-alkanoicAcid", "C27n-alkanoicAcid");
    static C28n_alkanoicAcid = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C28n-alkanoicAcid", "C28n-alkanoicAcid");
    static C29n_alkanoicAcid = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C29n-alkanoicAcid", "C29n-alkanoicAcid");
    static C30n_alkanoicAcid = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C30n-alkanoicAcid", "C30n-alkanoicAcid");
    static C31n_alkanoicAcid = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C31n-alkanoicAcid", "C31n-alkanoicAcid");
    static C37Alkenone = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C37Alkenone", "C37Alkenone");
    static C37_2Alkenone = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C37_2Alkenone", "C37:2Alkenone");
    static C37_3aAlkenone = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C37_3aAlkenone", "C37:3aAlkenone");
    static C37_3bAlkenone = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C37_3bAlkenone", "C37:3bAlkenone");
    static C37_4Alkenone = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C37_4Alkenone", "C37:4Alkenone");
    static CBT = new PaleoVariable("http://linked.earth/ontology/paleo_variables#CBT", "CBT");
    static CCA1 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#CCA1", "CCA1");
    static CCA2 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#CCA2", "CCA2");
    static CPI = new PaleoVariable("http://linked.earth/ontology/paleo_variables#CPI", "CPI");
    static C_N = new PaleoVariable("http://linked.earth/ontology/paleo_variables#C_N", "C/N");
    static Ca = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Ca", "Ca");
    static CaCO3 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#CaCO3", "CaCO3");
    static CaO = new PaleoVariable("http://linked.earth/ontology/paleo_variables#CaO", "CaO");
    static Ca_K = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Ca_K", "Ca/K");
    static Ca_Sr = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Ca_Sr", "Ca/Sr");
    static Ca_Ti = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Ca_Ti", "Ca/Ti");
    static Ti_Ca = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Ti_Ca", "Ti/Ca");
    static Cd = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Cd", "Cd");
    static Cd_Mn = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Cd_Mn", "Cd/Mn");
    static Cl = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Cl", "Cl");
    static Co = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Co", "Co");
    static Cr = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Cr", "Cr");
    static Cu = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Cu", "Cu");
    static DWHI = new PaleoVariable("http://linked.earth/ontology/paleo_variables#DWHI", "DWHI");
    static Dd2H = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Dd2H", "Dd2H");
    static EPS = new PaleoVariable("http://linked.earth/ontology/paleo_variables#EPS", "EPS");
    static ElNinoEvent = new PaleoVariable("http://linked.earth/ontology/paleo_variables#ElNinoEvent", "ElNinoEvent");
    static Eu_Zr = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Eu_Zr", "Eu/Zr");
    static Fe = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Fe", "Fe");
    static Fe2O3 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Fe2O3", "Fe2O3");
    static Fe_Al = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Fe_Al", "Fe/Al");
    static Fe_Ca = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Fe_Ca", "Fe/Ca");
    static Fe_K = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Fe_K", "Fe/K");
    static Fe_Mn = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Fe_Mn", "Fe/Mn");
    static GDGT = new PaleoVariable("http://linked.earth/ontology/paleo_variables#GDGT", "GDGT");
    static GDGT_0_Cren = new PaleoVariable("http://linked.earth/ontology/paleo_variables#GDGT-0_Cren", "GDGT-0/Cren");
    static IP25 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#IP25", "IP25");
    static IRM = new PaleoVariable("http://linked.earth/ontology/paleo_variables#IRM", "IRM");
    static ITCZ = new PaleoVariable("http://linked.earth/ontology/paleo_variables#ITCZ", "ITCZ");
    static JulianDay = new PaleoVariable("http://linked.earth/ontology/paleo_variables#JulianDay", "JulianDay");
    static K2O = new PaleoVariable("http://linked.earth/ontology/paleo_variables#K2O", "K2O");
    static K37 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#K37", "K37");
    static K_Al = new PaleoVariable("http://linked.earth/ontology/paleo_variables#K_Al", "K/Al");
    static LDI = new PaleoVariable("http://linked.earth/ontology/paleo_variables#LDI", "LDI");
    static LOI = new PaleoVariable("http://linked.earth/ontology/paleo_variables#LOI", "LOI");
    static La = new PaleoVariable("http://linked.earth/ontology/paleo_variables#La", "La");
    static MAR = new PaleoVariable("http://linked.earth/ontology/paleo_variables#MAR", "MAR");
    static MBT = new PaleoVariable("http://linked.earth/ontology/paleo_variables#MBT", "MBT");
    static MS = new PaleoVariable("http://linked.earth/ontology/paleo_variables#MS", "MS");
    static Si = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Si", "Si");
    static MXD = new PaleoVariable("http://linked.earth/ontology/paleo_variables#MXD", "MXD");
    static Mg = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Mg", "Mg");
    static MgO = new PaleoVariable("http://linked.earth/ontology/paleo_variables#MgO", "MgO");
    static Mg_Ca = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Mg_Ca", "Mg/Ca");
    static Mn = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Mn", "Mn");
    static MnO = new PaleoVariable("http://linked.earth/ontology/paleo_variables#MnO", "MnO");
    static Mn_Fe = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Mn_Fe", "Mn/Fe");
    static Mn_Mo = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Mn_Mo", "Mn/Mo");
    static Mo = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Mo", "Mo");
    static NO3 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#NO3", "NO3");
    static nitrate = new PaleoVariable("http://linked.earth/ontology/paleo_variables#nitrate", "nitrate");
    static N_C = new PaleoVariable("http://linked.earth/ontology/paleo_variables#N_C", "N/C");
    static Na2O = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Na2O", "Na2O");
    static Ni = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Ni", "Ni");
    static PC1 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#PC1", "PC1");
    static PC3 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#PC3", "PC3");
    static PC2 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#PC2", "PC2");
    static Paq = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Paq", "Paq");
    static Pb = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Pb", "Pb");
    static Picea_Artemisia = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Picea_Artemisia", "Picea/Artemisia");
    static Picea_Pinus = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Picea_Pinus", "Picea/Pinus");
    static Pinus_Artemisia = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Pinus_Artemisia", "Pinus/Artemisia");
    static Poaceae_Ephedra = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Poaceae_Ephedra", "Poaceae/Ephedra");
    static R570_R630 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#R570_R630", "R570/R630");
    static R650_R700 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#R650_R700", "R650/R700");
    static RABD660670 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#RABD660670", "RABD660670");
    static RAN15 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#RAN15", "RAN15");
    static RBAR = new PaleoVariable("http://linked.earth/ontology/paleo_variables#RBAR", "RBAR");
    static Rb = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Rb", "Rb");
    static Rb87_Sr86 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Rb87_Sr86", "Rb87/Sr86");
    static SO4 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#SO4", "SO4");
    static sulfate = new PaleoVariable("http://linked.earth/ontology/paleo_variables#sulfate", "sulfate");
    static salinity = new PaleoVariable("http://linked.earth/ontology/paleo_variables#salinity", "salinity");
    static Sc = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Sc", "Sc");
    static Si_Al = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Si_Al", "Si/Al");
    static Si_Ti = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Si_Ti", "Si/Ti");
    static Sr = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Sr", "Sr");
    static Sr_Ca = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Sr_Ca", "Sr/Ca");
    static TDS = new PaleoVariable("http://linked.earth/ontology/paleo_variables#TDS", "TDS");
    static TEX86 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#TEX86", "TEX86");
    static TIC = new PaleoVariable("http://linked.earth/ontology/paleo_variables#TIC", "TIC");
    static TOC = new PaleoVariable("http://linked.earth/ontology/paleo_variables#TOC", "TOC");
    static organicCarbon = new PaleoVariable("http://linked.earth/ontology/paleo_variables#organicCarbon", "organicCarbon");
    static TOC_TN = new PaleoVariable("http://linked.earth/ontology/paleo_variables#TOC_TN", "TOC/TN");
    static Ti = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Ti", "Ti");
    static TiO2 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#TiO2", "TiO2");
    static Ti_Al = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Ti_Al", "Ti/Al");
    static Uk37 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Uk37", "Uk37");
    static UK37 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#UK37", "UK37");
    static Uk37_ = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Uk37_", "Uk37’");
    static V = new PaleoVariable("http://linked.earth/ontology/paleo_variables#V", "V");
    static V_Al = new PaleoVariable("http://linked.earth/ontology/paleo_variables#V_Al", "V/Al");
    static Y = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Y", "Y");
    static Zn = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Zn", "Zn");
    static Zr = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Zr", "Zr");
    static Zr_Al = new PaleoVariable("http://linked.earth/ontology/paleo_variables#Zr_Al", "Zr/Al");
    static accumulation = new PaleoVariable("http://linked.earth/ontology/paleo_variables#accumulation", "accumulation");
    static age = new PaleoVariable("http://linked.earth/ontology/paleo_variables#age", "age");
    static age14C = new PaleoVariable("http://linked.earth/ontology/paleo_variables#age14C", "age14C");
    static ammonium = new PaleoVariable("http://linked.earth/ontology/paleo_variables#ammonium", "ammonium");
    static amps = new PaleoVariable("http://linked.earth/ontology/paleo_variables#amps", "amps");
    static aragonite = new PaleoVariable("http://linked.earth/ontology/paleo_variables#aragonite", "aragonite");
    static ash = new PaleoVariable("http://linked.earth/ontology/paleo_variables#ash", "ash");
    static boron = new PaleoVariable("http://linked.earth/ontology/paleo_variables#boron", "boron");
    static brGDGT_IIIa = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-IIIa", "brGDGT-IIIa");
    static brGDGT_Id = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-Id", "brGDGT-Id");
    static brGDGT_IIIa_ = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-IIIa_", "brGDGT-IIIa’");
    static brGDGT_IIIb = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-IIIb", "brGDGT-IIIb");
    static brGDGT_IIIb_ = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-IIIb_", "brGDGT-IIIb’");
    static brGDGT_IIIc = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-IIIc", "brGDGT-IIIc");
    static brGDGT_IIIc_ = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-IIIc_", "brGDGT-IIIc’");
    static brGDGT_IIa = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-IIa", "brGDGT-IIa");
    static brGDGT_IIa_ = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-IIa_", "brGDGT-IIa’");
    static brGDGT_IIb = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-IIb", "brGDGT-IIb");
    static brGDGT_IIb_ = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-IIb_", "brGDGT-IIb’");
    static brGDGT_IIc = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-IIc", "brGDGT-IIc");
    static brGDGT_IIc_ = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-IIc_", "brGDGT-IIc’");
    static brGDGT_Ia = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-Ia", "brGDGT-Ia");
    static brGDGT_Ib = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-Ib", "brGDGT-Ib");
    static brGDGT_Ic = new PaleoVariable("http://linked.earth/ontology/paleo_variables#brGDGT-Ic", "brGDGT-Ic");
    static sampleID = new PaleoVariable("http://linked.earth/ontology/paleo_variables#sampleID", "sampleID");
    static bubbleNumberDensity = new PaleoVariable("http://linked.earth/ontology/paleo_variables#bubbleNumberDensity", "bubbleNumberDensity");
    static bulkDensity = new PaleoVariable("http://linked.earth/ontology/paleo_variables#bulkDensity", "bulkDensity");
    static calcificationRate = new PaleoVariable("http://linked.earth/ontology/paleo_variables#calcificationRate", "calcificationRate");
    static calcite = new PaleoVariable("http://linked.earth/ontology/paleo_variables#calcite", "calcite");
    static carbon = new PaleoVariable("http://linked.earth/ontology/paleo_variables#carbon", "carbon");
    static carbonate = new PaleoVariable("http://linked.earth/ontology/paleo_variables#carbonate", "carbonate");
    static charcoal = new PaleoVariable("http://linked.earth/ontology/paleo_variables#charcoal", "charcoal");
    static chloride = new PaleoVariable("http://linked.earth/ontology/paleo_variables#chloride", "chloride");
    static circulationIndex = new PaleoVariable("http://linked.earth/ontology/paleo_variables#circulationIndex", "circulationIndex");
    static clay = new PaleoVariable("http://linked.earth/ontology/paleo_variables#clay", "clay");
    static cluster = new PaleoVariable("http://linked.earth/ontology/paleo_variables#cluster", "cluster");
    static index = new PaleoVariable("http://linked.earth/ontology/paleo_variables#index", "index");
    static composite = new PaleoVariable("http://linked.earth/ontology/paleo_variables#composite", "composite");
    static concentration = new PaleoVariable("http://linked.earth/ontology/paleo_variables#concentration", "concentration");
    static core = new PaleoVariable("http://linked.earth/ontology/paleo_variables#core", "core");
    static correction = new PaleoVariable("http://linked.earth/ontology/paleo_variables#correction", "correction");
    static correlationCoefficient = new PaleoVariable("http://linked.earth/ontology/paleo_variables#correlationCoefficient", "correlationCoefficient");
    static sampleCount = new PaleoVariable("http://linked.earth/ontology/paleo_variables#sampleCount", "sampleCount");
    static count = new PaleoVariable("http://linked.earth/ontology/paleo_variables#count", "count");
    static d13C = new PaleoVariable("http://linked.earth/ontology/paleo_variables#d13C", "d13C");
    static d15N = new PaleoVariable("http://linked.earth/ontology/paleo_variables#d15N", "d15N");
    static d18O = new PaleoVariable("http://linked.earth/ontology/paleo_variables#d18O", "d18O");
    static d2H = new PaleoVariable("http://linked.earth/ontology/paleo_variables#d2H", "d2H");
    static d2HUncertaintyHigh80 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#d2HUncertaintyHigh80", "d2HUncertaintyHigh80");
    static d2HUncertaintyLow80 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#d2HUncertaintyLow80", "d2HUncertaintyLow80");
    static deleteMe = new PaleoVariable("http://linked.earth/ontology/paleo_variables#deleteMe", "deleteMe");
    static needsToBeChanged = new PaleoVariable("http://linked.earth/ontology/paleo_variables#needsToBeChanged", "needsToBeChanged");
    static deltaRelativeHumidity = new PaleoVariable("http://linked.earth/ontology/paleo_variables#deltaRelativeHumidity", "deltaRelativeHumidity");
    static deltaTemperature = new PaleoVariable("http://linked.earth/ontology/paleo_variables#deltaTemperature", "deltaTemperature");
    static density = new PaleoVariable("http://linked.earth/ontology/paleo_variables#density", "density");
    static depth = new PaleoVariable("http://linked.earth/ontology/paleo_variables#depth", "depth");
    static depthBottom = new PaleoVariable("http://linked.earth/ontology/paleo_variables#depthBottom", "depthBottom");
    static depthTop = new PaleoVariable("http://linked.earth/ontology/paleo_variables#depthTop", "depthTop");
    static deuteriumExcess = new PaleoVariable("http://linked.earth/ontology/paleo_variables#deuteriumExcess", "deuteriumExcess");
    static diatom = new PaleoVariable("http://linked.earth/ontology/paleo_variables#diatom", "diatom");
    static diatomCount = new PaleoVariable("http://linked.earth/ontology/paleo_variables#diatomCount", "diatomCount");
    static dinocyst = new PaleoVariable("http://linked.earth/ontology/paleo_variables#dinocyst", "dinocyst");
    static dolomite = new PaleoVariable("http://linked.earth/ontology/paleo_variables#dolomite", "dolomite");
    static dryBulkDensity = new PaleoVariable("http://linked.earth/ontology/paleo_variables#dryBulkDensity", "dryBulkDensity");
    static duration = new PaleoVariable("http://linked.earth/ontology/paleo_variables#duration", "duration");
    static dust = new PaleoVariable("http://linked.earth/ontology/paleo_variables#dust", "dust");
    static effectivePrecipitation = new PaleoVariable("http://linked.earth/ontology/paleo_variables#effectivePrecipitation", "effectivePrecipitation");
    static elevation = new PaleoVariable("http://linked.earth/ontology/paleo_variables#elevation", "elevation");
    static zscore = new PaleoVariable("http://linked.earth/ontology/paleo_variables#zscore", "zscore");
    static epsilonC28C22 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#epsilonC28C22", "epsilonC28C22");
    static epsilonC28C24 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#epsilonC28C24", "epsilonC28C24");
    static epsilonC29C23 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#epsilonC29C23", "epsilonC29C23");
    static equilibriumLineAltitude = new PaleoVariable("http://linked.earth/ontology/paleo_variables#equilibriumLineAltitude", "equilibriumLineAltitude");
    static event = new PaleoVariable("http://linked.earth/ontology/paleo_variables#event", "event");
    static eventLayer = new PaleoVariable("http://linked.earth/ontology/paleo_variables#eventLayer", "eventLayer");
    static facies = new PaleoVariable("http://linked.earth/ontology/paleo_variables#facies", "facies");
    static feldspar = new PaleoVariable("http://linked.earth/ontology/paleo_variables#feldspar", "feldspar");
    static flood = new PaleoVariable("http://linked.earth/ontology/paleo_variables#flood", "flood");
    static fluorine = new PaleoVariable("http://linked.earth/ontology/paleo_variables#fluorine", "fluorine");
    static foraminifera = new PaleoVariable("http://linked.earth/ontology/paleo_variables#foraminifera", "foraminifera");
    static gamma = new PaleoVariable("http://linked.earth/ontology/paleo_variables#gamma", "gamma");
    static glacierCoverage = new PaleoVariable("http://linked.earth/ontology/paleo_variables#glacierCoverage", "glacierCoverage");
    static globigerinoidesRuber = new PaleoVariable("http://linked.earth/ontology/paleo_variables#globigerinoidesRuber", "globigerinoidesRuber");
    static grainSize = new PaleoVariable("http://linked.earth/ontology/paleo_variables#grainSize", "grainSize");
    static lithics = new PaleoVariable("http://linked.earth/ontology/paleo_variables#lithics", "lithics");
    static grayscale = new PaleoVariable("http://linked.earth/ontology/paleo_variables#grayscale", "grayscale");
    static growing_degree_days = new PaleoVariable("http://linked.earth/ontology/paleo_variables#growing_degree_days", "growing degree days");
    static growthRate = new PaleoVariable("http://linked.earth/ontology/paleo_variables#growthRate", "growthRate");
    static hasGap = new PaleoVariable("http://linked.earth/ontology/paleo_variables#hasGap", "hasGap");
    static hasHiatus = new PaleoVariable("http://linked.earth/ontology/paleo_variables#hasHiatus", "hasHiatus");
    static hole = new PaleoVariable("http://linked.earth/ontology/paleo_variables#hole", "hole");
    static humidificationIndex = new PaleoVariable("http://linked.earth/ontology/paleo_variables#humidificationIndex", "humidificationIndex");
    static iceMelt = new PaleoVariable("http://linked.earth/ontology/paleo_variables#iceMelt", "iceMelt");
    static iceRaftedDebris = new PaleoVariable("http://linked.earth/ontology/paleo_variables#iceRaftedDebris", "iceRaftedDebris");
    static inc_coh = new PaleoVariable("http://linked.earth/ontology/paleo_variables#inc_coh", "inc/coh");
    static isReliable = new PaleoVariable("http://linked.earth/ontology/paleo_variables#isReliable", "isReliable");
    static lakeArea = new PaleoVariable("http://linked.earth/ontology/paleo_variables#lakeArea", "lakeArea");
    static lakeLevel = new PaleoVariable("http://linked.earth/ontology/paleo_variables#lakeLevel", "lakeLevel");
    static lakeTrend = new PaleoVariable("http://linked.earth/ontology/paleo_variables#lakeTrend", "lakeTrend");
    static lakeVolume = new PaleoVariable("http://linked.earth/ontology/paleo_variables#lakeVolume", "lakeVolume");
    static landscapeCover = new PaleoVariable("http://linked.earth/ontology/paleo_variables#landscapeCover", "landscapeCover");
    static percent = new PaleoVariable("http://linked.earth/ontology/paleo_variables#percent", "percent");
    static latitude = new PaleoVariable("http://linked.earth/ontology/paleo_variables#latitude", "latitude");
    static layerThickness = new PaleoVariable("http://linked.earth/ontology/paleo_variables#layerThickness", "layerThickness");
    static longitude = new PaleoVariable("http://linked.earth/ontology/paleo_variables#longitude", "longitude");
    static material = new PaleoVariable("http://linked.earth/ontology/paleo_variables#material", "material");
    static mineralogy = new PaleoVariable("http://linked.earth/ontology/paleo_variables#mineralogy", "mineralogy");
    static sulfur = new PaleoVariable("http://linked.earth/ontology/paleo_variables#sulfur", "sulfur");
    static needsToBeSplitIntoMultipleColumns = new PaleoVariable("http://linked.earth/ontology/paleo_variables#needsToBeSplitIntoMultipleColumns", "needsToBeSplitIntoMultipleColumns");
    static nitrogen = new PaleoVariable("http://linked.earth/ontology/paleo_variables#nitrogen", "nitrogen");
    static notes = new PaleoVariable("http://linked.earth/ontology/paleo_variables#notes", "notes");
    static organicMatter = new PaleoVariable("http://linked.earth/ontology/paleo_variables#organicMatter", "organicMatter");
    static organicNitrogen = new PaleoVariable("http://linked.earth/ontology/paleo_variables#organicNitrogen", "organicNitrogen");
    static oxygen = new PaleoVariable("http://linked.earth/ontology/paleo_variables#oxygen", "oxygen");
    static pH = new PaleoVariable("http://linked.earth/ontology/paleo_variables#pH", "pH");
    static peat = new PaleoVariable("http://linked.earth/ontology/paleo_variables#peat", "peat");
    static phosphorus = new PaleoVariable("http://linked.earth/ontology/paleo_variables#phosphorus", "phosphorus");
    static potassium = new PaleoVariable("http://linked.earth/ontology/paleo_variables#potassium", "potassium");
    static precipitation = new PaleoVariable("http://linked.earth/ontology/paleo_variables#precipitation", "precipitation");
    static productivity = new PaleoVariable("http://linked.earth/ontology/paleo_variables#productivity", "productivity");
    static pyrite = new PaleoVariable("http://linked.earth/ontology/paleo_variables#pyrite", "pyrite");
    static quartz = new PaleoVariable("http://linked.earth/ontology/paleo_variables#quartz", "quartz");
    static reflectance = new PaleoVariable("http://linked.earth/ontology/paleo_variables#reflectance", "reflectance");
    static relativeHumidity = new PaleoVariable("http://linked.earth/ontology/paleo_variables#relativeHumidity", "relativeHumidity");
    static residualChronology = new PaleoVariable("http://linked.earth/ontology/paleo_variables#residualChronology", "residualChronology");
    static ringWidth = new PaleoVariable("http://linked.earth/ontology/paleo_variables#ringWidth", "ringWidth");
    static sand = new PaleoVariable("http://linked.earth/ontology/paleo_variables#sand", "sand");
    static seaIce = new PaleoVariable("http://linked.earth/ontology/paleo_variables#seaIce", "seaIce");
    static section = new PaleoVariable("http://linked.earth/ontology/paleo_variables#section", "section");
    static sedimentDry = new PaleoVariable("http://linked.earth/ontology/paleo_variables#sedimentDry", "sedimentDry");
    static sedimentationRate = new PaleoVariable("http://linked.earth/ontology/paleo_variables#sedimentationRate", "sedimentationRate");
    static segmentLength = new PaleoVariable("http://linked.earth/ontology/paleo_variables#segmentLength", "segmentLength");
    static sequence = new PaleoVariable("http://linked.earth/ontology/paleo_variables#sequence", "sequence");
    static silt = new PaleoVariable("http://linked.earth/ontology/paleo_variables#silt", "silt");
    static site = new PaleoVariable("http://linked.earth/ontology/paleo_variables#site", "site");
    static siteCount = new PaleoVariable("http://linked.earth/ontology/paleo_variables#siteCount", "siteCount");
    static sodium = new PaleoVariable("http://linked.earth/ontology/paleo_variables#sodium", "sodium");
    static solarIrradiance = new PaleoVariable("http://linked.earth/ontology/paleo_variables#solarIrradiance", "solarIrradiance");
    static streamflow = new PaleoVariable("http://linked.earth/ontology/paleo_variables#streamflow", "streamflow");
    static temperature = new PaleoVariable("http://linked.earth/ontology/paleo_variables#temperature", "temperature");
    static thickness = new PaleoVariable("http://linked.earth/ontology/paleo_variables#thickness", "thickness");
    static totalCarbon = new PaleoVariable("http://linked.earth/ontology/paleo_variables#totalCarbon", "totalCarbon");
    static totalNitrogen = new PaleoVariable("http://linked.earth/ontology/paleo_variables#totalNitrogen", "totalNitrogen");
    static totalPollen = new PaleoVariable("http://linked.earth/ontology/paleo_variables#totalPollen", "totalPollen");
    static treeCover = new PaleoVariable("http://linked.earth/ontology/paleo_variables#treeCover", "treeCover");
    static uncertainty = new PaleoVariable("http://linked.earth/ontology/paleo_variables#uncertainty", "uncertainty");
    static uncertainty1s = new PaleoVariable("http://linked.earth/ontology/paleo_variables#uncertainty1s", "uncertainty1s");
    static uncertainty2s = new PaleoVariable("http://linked.earth/ontology/paleo_variables#uncertainty2s", "uncertainty2s");
    static uncertaintyHigh = new PaleoVariable("http://linked.earth/ontology/paleo_variables#uncertaintyHigh", "uncertaintyHigh");
    static uncertaintyHigh1s = new PaleoVariable("http://linked.earth/ontology/paleo_variables#uncertaintyHigh1s", "uncertaintyHigh1s");
    static uncertaintyLow95 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#uncertaintyLow95", "uncertaintyLow95");
    static uncertaintyHigh50 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#uncertaintyHigh50", "uncertaintyHigh50");
    static uncertaintyHigh90 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#uncertaintyHigh90", "uncertaintyHigh90");
    static uncertaintyHigh95 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#uncertaintyHigh95", "uncertaintyHigh95");
    static uncertaintyLow = new PaleoVariable("http://linked.earth/ontology/paleo_variables#uncertaintyLow", "uncertaintyLow");
    static uncertaintyLow1s = new PaleoVariable("http://linked.earth/ontology/paleo_variables#uncertaintyLow1s", "uncertaintyLow1s");
    static uncertaintyLow90 = new PaleoVariable("http://linked.earth/ontology/paleo_variables#uncertaintyLow90", "uncertaintyLow90");
    static upwelling = new PaleoVariable("http://linked.earth/ontology/paleo_variables#upwelling", "upwelling");
    static uranium = new PaleoVariable("http://linked.earth/ontology/paleo_variables#uranium", "uranium");
    static varveThickness = new PaleoVariable("http://linked.earth/ontology/paleo_variables#varveThickness", "varveThickness");
    static volume = new PaleoVariable("http://linked.earth/ontology/paleo_variables#volume", "volume");
    static waterContent = new PaleoVariable("http://linked.earth/ontology/paleo_variables#waterContent", "waterContent");
    static waterTableDepth = new PaleoVariable("http://linked.earth/ontology/paleo_variables#waterTableDepth", "waterTableDepth");
    static wetBulkDensity = new PaleoVariable("http://linked.earth/ontology/paleo_variables#wetBulkDensity", "wetBulkDensity");
    static year = new PaleoVariable("http://linked.earth/ontology/paleo_variables#year", "year");
}
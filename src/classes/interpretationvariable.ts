
interface InterpretationVariableSynonym {
    id: string;
    label: string;
}

interface InterpretationVariableSynonyms {
    [key: string]: InterpretationVariableSynonym;
}

export class InterpretationVariable {
    private id: string;
    private label: string;
    static synonyms: InterpretationVariableSynonyms = {'c3c4ratio': {'id': 'http://linked.earth/ontology/interpretation#C3C4Ratio', 'label': 'C3C4Ratio'}, 'composition c3-c4 plants': {'id': 'http://linked.earth/ontology/interpretation#C3C4Ratio', 'label': 'C3C4Ratio'}, 'circulationindex': {'id': 'http://linked.earth/ontology/interpretation#circulationIndex', 'label': 'circulationIndex'}, 'circulation index': {'id': 'http://linked.earth/ontology/interpretation#circulationIndex', 'label': 'circulationIndex'}, 'mode': {'id': 'http://linked.earth/ontology/interpretation#circulationIndex', 'label': 'circulationIndex'}, 'nao index': {'id': 'http://linked.earth/ontology/interpretation#circulationIndex', 'label': 'circulationIndex'}, 'circulationvariable': {'id': 'http://linked.earth/ontology/interpretation#circulationVariable', 'label': 'circulationVariable'}, 'circulation variable': {'id': 'http://linked.earth/ontology/interpretation#circulationVariable', 'label': 'circulationVariable'}, 'changes in monsoon intensity.': {'id': 'http://linked.earth/ontology/interpretation#circulationVariable', 'label': 'circulationVariable'}, 'circulation': {'id': 'http://linked.earth/ontology/interpretation#circulationVariable', 'label': 'circulationVariable'}, 'dissolvedoxygen': {'id': 'http://linked.earth/ontology/interpretation#dissolvedOxygen', 'label': 'dissolvedOxygen'}, 'dissolved oxygen': {'id': 'http://linked.earth/ontology/interpretation#dissolvedOxygen', 'label': 'dissolvedOxygen'}, 'suboxia': {'id': 'http://linked.earth/ontology/interpretation#dissolvedOxygen', 'label': 'dissolvedOxygen'}, 'dust': {'id': 'http://linked.earth/ontology/interpretation#dust', 'label': 'dust'}, 'ela': {'id': 'http://linked.earth/ontology/interpretation#ELA', 'label': 'ELA'}, 'equilibrium line altitude': {'id': 'http://linked.earth/ontology/interpretation#ELA', 'label': 'ELA'}, 'evaporation': {'id': 'http://linked.earth/ontology/interpretation#evaporation', 'label': 'evaporation'}, 'fire': {'id': 'http://linked.earth/ontology/interpretation#fire', 'label': 'fire'}, 'fire history': {'id': 'http://linked.earth/ontology/interpretation#fire', 'label': 'fire'}, 'growingdegreedays': {'id': 'http://linked.earth/ontology/interpretation#growingDegreeDays', 'label': 'growingDegreeDays'}, 'growing degree days': {'id': 'http://linked.earth/ontology/interpretation#growingDegreeDays', 'label': 'growingDegreeDays'}, 'gdd': {'id': 'http://linked.earth/ontology/interpretation#growingDegreeDays', 'label': 'growingDegreeDays'}, 'hydrologicbalance': {'id': 'http://linked.earth/ontology/interpretation#hydrologicBalance', 'label': 'hydrologicBalance'}, 'gw-e': {'id': 'http://linked.earth/ontology/interpretation#hydrologicBalance', 'label': 'hydrologicBalance'}, 'i_e': {'id': 'http://linked.earth/ontology/interpretation#hydrologicBalance', 'label': 'hydrologicBalance'}, 'hydrology': {'id': 'http://linked.earth/ontology/interpretation#hydrologicBalance', 'label': 'hydrologicBalance'}, 'lakewaterisotope': {'id': 'http://linked.earth/ontology/interpretation#lakeWaterIsotope', 'label': 'lakeWaterIsotope'}, 'lake water and precipitation d2h': {'id': 'http://linked.earth/ontology/interpretation#lakeWaterIsotope', 'label': 'lakeWaterIsotope'}, 'lake water d18o': {'id': 'http://linked.earth/ontology/interpretation#lakeWaterIsotope', 'label': 'lakeWaterIsotope'}, 'lake water d2h': {'id': 'http://linked.earth/ontology/interpretation#lakeWaterIsotope', 'label': 'lakeWaterIsotope'}, 'liso': {'id': 'http://linked.earth/ontology/interpretation#lakeWaterIsotope', 'label': 'lakeWaterIsotope'}, 'meltwater': {'id': 'http://linked.earth/ontology/interpretation#meltwater', 'label': 'meltwater'}, 'ice melt': {'id': 'http://linked.earth/ontology/interpretation#meltwater', 'label': 'meltwater'}, 'needstobereplaced': {'id': 'http://linked.earth/ontology/interpretation#needsToBeReplaced', 'label': 'needsToBeReplaced'}, 'anoxia': {'id': 'http://linked.earth/ontology/interpretation#needsToBeReplaced', 'label': 'needsToBeReplaced'}, 'carbonate_ion_concentration': {'id': 'http://linked.earth/ontology/interpretation#needsToBeReplaced', 'label': 'needsToBeReplaced'}, 'export-productivity': {'id': 'http://linked.earth/ontology/interpretation#needsToBeReplaced', 'label': 'needsToBeReplaced'}, 'gdgt': {'id': 'http://linked.earth/ontology/interpretation#needsToBeReplaced', 'label': 'needsToBeReplaced'}, 'mixed': {'id': 'http://linked.earth/ontology/interpretation#needsToBeReplaced', 'label': 'needsToBeReplaced'}, 'precipitation d2h + evap': {'id': 'http://linked.earth/ontology/interpretation#needsToBeReplaced', 'label': 'needsToBeReplaced'}, 't+ela': {'id': 'http://linked.earth/ontology/interpretation#needsToBeReplaced', 'label': 'needsToBeReplaced'}, 'plant community composition': {'id': 'http://linked.earth/ontology/interpretation#needsToBeReplaced', 'label': 'needsToBeReplaced'}, 'liso/p-e': {'id': 'http://linked.earth/ontology/interpretation#needsToBeReplaced', 'label': 'needsToBeReplaced'}, 'organic matter source': {'id': 'http://linked.earth/ontology/interpretation#needsToBeReplaced', 'label': 'needsToBeReplaced'}, 'p-e': {'id': 'http://linked.earth/ontology/interpretation#P-E', 'label': 'P-E'}, 'precipitation minus evaporation': {'id': 'http://linked.earth/ontology/interpretation#P-E', 'label': 'P-E'}, 'effective moisture': {'id': 'http://linked.earth/ontology/interpretation#P-E', 'label': 'P-E'}, 'm': {'id': 'http://linked.earth/ontology/interpretation#P-E', 'label': 'P-E'}, 'p_e': {'id': 'http://linked.earth/ontology/interpretation#P-E', 'label': 'P-E'}, 'p=e': {'id': 'http://linked.earth/ontology/interpretation#P-E', 'label': 'P-E'}, 'precipitation': {'id': 'http://linked.earth/ontology/interpretation#precipitation', 'label': 'precipitation'}, 'pmax': {'id': 'http://linked.earth/ontology/interpretation#precipitation', 'label': 'precipitation'}, 'pmin': {'id': 'http://linked.earth/ontology/interpretation#precipitation', 'label': 'precipitation'}, 'p': {'id': 'http://linked.earth/ontology/interpretation#precipitation', 'label': 'precipitation'}, 'p_amount': {'id': 'http://linked.earth/ontology/interpretation#precipitation', 'label': 'precipitation'}, 'precipitationdeuteriumexcess': {'id': 'http://linked.earth/ontology/interpretation#precipitationDeuteriumExcess', 'label': 'precipitationDeuteriumExcess'}, 'precipitation d-excess': {'id': 'http://linked.earth/ontology/interpretation#precipitationDeuteriumExcess', 'label': 'precipitationDeuteriumExcess'}, 'precipitationisotope': {'id': 'http://linked.earth/ontology/interpretation#precipitationIsotope', 'label': 'precipitationIsotope'}, 'dd': {'id': 'http://linked.earth/ontology/interpretation#precipitationIsotope', 'label': 'precipitationIsotope'}, 'd18o of precipitation': {'id': 'http://linked.earth/ontology/interpretation#precipitationIsotope', 'label': 'precipitationIsotope'}, 'p_isotope': {'id': 'http://linked.earth/ontology/interpretation#precipitationIsotope', 'label': 'precipitationIsotope'}, 'piso': {'id': 'http://linked.earth/ontology/interpretation#precipitationIsotope', 'label': 'precipitationIsotope'}, 'precipitation d18o': {'id': 'http://linked.earth/ontology/interpretation#precipitationIsotope', 'label': 'precipitationIsotope'}, 'precipitation d2h': {'id': 'http://linked.earth/ontology/interpretation#precipitationIsotope', 'label': 'precipitationIsotope'}, 'precipitation isotope': {'id': 'http://linked.earth/ontology/interpretation#precipitationIsotope', 'label': 'precipitationIsotope'}, 'source': {'id': 'http://linked.earth/ontology/interpretation#precipitationIsotope', 'label': 'precipitationIsotope'}, 'productivity': {'id': 'http://linked.earth/ontology/interpretation#productivity', 'label': 'productivity'}, 'algal productivity': {'id': 'http://linked.earth/ontology/interpretation#productivity', 'label': 'productivity'}, 'relativehumidity': {'id': 'http://linked.earth/ontology/interpretation#relativeHumidity', 'label': 'relativeHumidity'}, 'relative humidity': {'id': 'http://linked.earth/ontology/interpretation#relativeHumidity', 'label': 'relativeHumidity'}, 'rh': {'id': 'http://linked.earth/ontology/interpretation#relativeHumidity', 'label': 'relativeHumidity'}, 'salinity': {'id': 'http://linked.earth/ontology/interpretation#salinity', 'label': 'salinity'}, 's': {'id': 'http://linked.earth/ontology/interpretation#salinity', 'label': 'salinity'}, 'sss': {'id': 'http://linked.earth/ontology/interpretation#salinity', 'label': 'salinity'}, 'seaice': {'id': 'http://linked.earth/ontology/interpretation#seaIce', 'label': 'seaIce'}, 'sea ice cover': {'id': 'http://linked.earth/ontology/interpretation#seaIce', 'label': 'seaIce'}, 'ice': {'id': 'http://linked.earth/ontology/interpretation#seaIce', 'label': 'seaIce'}, 'seasonality': {'id': 'http://linked.earth/ontology/interpretation#seasonality', 'label': 'seasonality'}, 'seawaterisotope': {'id': 'http://linked.earth/ontology/interpretation#seawaterIsotope', 'label': 'seawaterIsotope'}, 'seawater_isotope': {'id': 'http://linked.earth/ontology/interpretation#seawaterIsotope', 'label': 'seawaterIsotope'}, 'streamflow': {'id': 'http://linked.earth/ontology/interpretation#streamflow', 'label': 'streamflow'}, 'q': {'id': 'http://linked.earth/ontology/interpretation#streamflow', 'label': 'streamflow'}, 'sunlight': {'id': 'http://linked.earth/ontology/interpretation#sunlight', 'label': 'sunlight'}, 'solar irradiance': {'id': 'http://linked.earth/ontology/interpretation#sunlight', 'label': 'sunlight'}, 'sun': {'id': 'http://linked.earth/ontology/interpretation#sunlight', 'label': 'sunlight'}, 'surfacepressure': {'id': 'http://linked.earth/ontology/interpretation#surfacePressure', 'label': 'surfacePressure'}, 'surface pressure': {'id': 'http://linked.earth/ontology/interpretation#surfacePressure', 'label': 'surfacePressure'}, 'temperature': {'id': 'http://linked.earth/ontology/interpretation#temperature', 'label': 'temperature'}, 'sst': {'id': 'http://linked.earth/ontology/interpretation#temperature', 'label': 'temperature'}, 'subt': {'id': 'http://linked.earth/ontology/interpretation#temperature', 'label': 'temperature'}, 'surface water temp': {'id': 'http://linked.earth/ontology/interpretation#temperature', 'label': 'temperature'}, 't': {'id': 'http://linked.earth/ontology/interpretation#temperature', 'label': 'temperature'}, 't_air': {'id': 'http://linked.earth/ontology/interpretation#temperature', 'label': 'temperature'}, 't_water': {'id': 'http://linked.earth/ontology/interpretation#temperature', 'label': 'temperature'}, 'temperature_water': {'id': 'http://linked.earth/ontology/interpretation#temperature', 'label': 'temperature'}, 'lake water temperature': {'id': 'http://linked.earth/ontology/interpretation#temperature', 'label': 'temperature'}, 'upwelling': {'id': 'http://linked.earth/ontology/interpretation#upwelling', 'label': 'upwelling'}, 'upwelling index': {'id': 'http://linked.earth/ontology/interpretation#upwelling', 'label': 'upwelling'}, 'windspeed': {'id': 'http://linked.earth/ontology/interpretation#windSpeed', 'label': 'windSpeed'}, 'wind speed': {'id': 'http://linked.earth/ontology/interpretation#windSpeed', 'label': 'windSpeed'}, 'w': {'id': 'http://linked.earth/ontology/interpretation#windSpeed', 'label': 'windSpeed'}};

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

    static fromSynonym(synonym: string): InterpretationVariable | null {
        const lowerSynonym = synonym.toLowerCase();
        if (lowerSynonym in InterpretationVariable.synonyms) {
            const synobj = InterpretationVariable.synonyms[lowerSynonym];
            return new InterpretationVariable(synobj.id, synobj.label);
        }
        return null;
    }
}

export const InterpretationVariableConstants = {
    C3C4Ratio: new InterpretationVariable( "http://linked.earth/ontology/interpretation#C3C4Ratio", "C3C4Ratio" ),
    circulationIndex: new InterpretationVariable( "http://linked.earth/ontology/interpretation#circulationIndex", "circulationIndex" ),
    circulationVariable: new InterpretationVariable( "http://linked.earth/ontology/interpretation#circulationVariable", "circulationVariable" ),
    dissolvedOxygen: new InterpretationVariable( "http://linked.earth/ontology/interpretation#dissolvedOxygen", "dissolvedOxygen" ),
    dust: new InterpretationVariable( "http://linked.earth/ontology/interpretation#dust", "dust" ),
    ELA: new InterpretationVariable( "http://linked.earth/ontology/interpretation#ELA", "ELA" ),
    evaporation: new InterpretationVariable( "http://linked.earth/ontology/interpretation#evaporation", "evaporation" ),
    fire: new InterpretationVariable( "http://linked.earth/ontology/interpretation#fire", "fire" ),
    growingDegreeDays: new InterpretationVariable( "http://linked.earth/ontology/interpretation#growingDegreeDays", "growingDegreeDays" ),
    hydrologicBalance: new InterpretationVariable( "http://linked.earth/ontology/interpretation#hydrologicBalance", "hydrologicBalance" ),
    lakeWaterIsotope: new InterpretationVariable( "http://linked.earth/ontology/interpretation#lakeWaterIsotope", "lakeWaterIsotope" ),
    meltwater: new InterpretationVariable( "http://linked.earth/ontology/interpretation#meltwater", "meltwater" ),
    needsToBeReplaced: new InterpretationVariable( "http://linked.earth/ontology/interpretation#needsToBeReplaced", "needsToBeReplaced" ),
    P_E: new InterpretationVariable( "http://linked.earth/ontology/interpretation#P-E", "P-E" ),
    precipitation: new InterpretationVariable( "http://linked.earth/ontology/interpretation#precipitation", "precipitation" ),
    precipitationDeuteriumExcess: new InterpretationVariable( "http://linked.earth/ontology/interpretation#precipitationDeuteriumExcess", "precipitationDeuteriumExcess" ),
    precipitationIsotope: new InterpretationVariable( "http://linked.earth/ontology/interpretation#precipitationIsotope", "precipitationIsotope" ),
    productivity: new InterpretationVariable( "http://linked.earth/ontology/interpretation#productivity", "productivity" ),
    relativeHumidity: new InterpretationVariable( "http://linked.earth/ontology/interpretation#relativeHumidity", "relativeHumidity" ),
    salinity: new InterpretationVariable( "http://linked.earth/ontology/interpretation#salinity", "salinity" ),
    seaIce: new InterpretationVariable( "http://linked.earth/ontology/interpretation#seaIce", "seaIce" ),
    seasonality: new InterpretationVariable( "http://linked.earth/ontology/interpretation#seasonality", "seasonality" ),
    seawaterIsotope: new InterpretationVariable( "http://linked.earth/ontology/interpretation#seawaterIsotope", "seawaterIsotope" ),
    streamflow: new InterpretationVariable( "http://linked.earth/ontology/interpretation#streamflow", "streamflow" ),
    sunlight: new InterpretationVariable( "http://linked.earth/ontology/interpretation#sunlight", "sunlight" ),
    surfacePressure: new InterpretationVariable( "http://linked.earth/ontology/interpretation#surfacePressure", "surfacePressure" ),
    temperature: new InterpretationVariable( "http://linked.earth/ontology/interpretation#temperature", "temperature" ),
    upwelling: new InterpretationVariable( "http://linked.earth/ontology/interpretation#upwelling", "upwelling" ),
    windSpeed: new InterpretationVariable( "http://linked.earth/ontology/interpretation#windSpeed", "windSpeed" ),
};
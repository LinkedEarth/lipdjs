// Constants for URLs - these would be imported from globals/urls.ts in a full implementation
export const NSURL = 'http://linked.earth/lipd';
export const ONTONS = 'http://linked.earth/ontology#';
export const DATAURL = "https://data.mint.isi.edu/files/lipd"

export const ARCHIVEURL = "http://linked.earth/ontology/archive"
export const PROXYURL = "http://linked.earth/ontology/proxy"
export const UNITSURL = "http://linked.earth/ontology/units"
export const VARIABLEURL = "http://linked.earth/ontology/variables"
export const DEFAULT_GRAPH_URI = "http://www.openrdf.org/schema/sesame#nil"

// Define namespaces used in URI creation
export const NAMESPACES: Record<string, string> = {
    'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
    'xsd': 'http://www.w3.org/2001/XMLSchema#',
    'owl': 'http://www.w3.org/2002/07/owl#',
    'wgs84': 'http://www.w3.org/2003/01/geo/wgs84_pos#',
    "le_archive": ARCHIVEURL,
    "le_proxy": PROXYURL,
    "le_units": UNITSURL,
    "le_variables": VARIABLEURL    
};
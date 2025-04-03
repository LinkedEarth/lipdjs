// Type definitions for synonyms structure
export interface SynonymEntry {
  id: string;
  label: string;
}

// Type for a collection of synonym entries indexed by lowercase names
export interface SynonymCollection {
  [key: string]: SynonymEntry;
}

// Types for different synonym categories
export interface ArchiveTypes {
  ArchiveType?: SynonymCollection;
}

export interface InterpretationTypes {
  InterpretationVariable?: SynonymCollection;
  InterpretationSeasonality?: SynonymCollection;
}

export interface VariableTypes {
  PaleoVariable?: SynonymCollection;
  ChronVariable?: SynonymCollection;
}

export interface UnitTypes {
  PaleoUnit?: SynonymCollection;
  ChronUnit?: SynonymCollection;
}

export interface ProxyTypes {
    PaleoProxy?: SynonymCollection;
    PaleoProxyGeneral?: SynonymCollection;
    ChronProxy?: SynonymCollection;
    ChronProxyGeneral?: SynonymCollection;
}

// Full synonym structure
export interface SynonymsType {
  ARCHIVES: ArchiveTypes;
  INTERPRETATION: InterpretationTypes;
  VARIABLES?: VariableTypes;
  PROXIES?: ProxyTypes;
  UNITS?: UnitTypes;
} 
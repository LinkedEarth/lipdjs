
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";
import { ArchiveType } from "./archivetype";
import { Calibration } from "./calibration";
import { Compilation } from "./compilation";
import { Interpretation } from "./interpretation";
import { PaleoProxy } from "./paleoproxy";
import { PaleoProxyGeneral } from "./paleoproxygeneral";
import { PaleoUnit } from "./paleounit";
import { PaleoVariable } from "./paleovariable";
import { PhysicalSample } from "./physicalsample";
import { Resolution } from "./resolution";



export class Variable {

    protected archiveType: ArchiveType | null;
    protected calibratedVias: Calibration[];
    protected columnNumber: number | null;
    protected composite: boolean | null;
    protected description: string | null;
    protected foundInDataset: null | null;
    protected foundInTable: null | null;
    protected instrument: null | null;
    protected interpretations: Interpretation[];
    protected maxValue: number | null;
    protected meanValue: number | null;
    protected medianValue: number | null;
    protected minValue: number | null;
    protected missingValue: string | null;
    protected name: string | null;
    protected notes: string | null;
    protected partOfCompilation: Compilation | null;
    protected physicalSamples: PhysicalSample[];
    protected primary: boolean | null;
    protected proxy: PaleoProxy | null;
    protected proxyGeneral: PaleoProxyGeneral | null;
    protected resolution: Resolution | null;
    protected standardVariable: PaleoVariable | null;
    protected uncertainty: string | null;
    protected uncertaintyAnalytical: string | null;
    protected uncertaintyReproducibility: string | null;
    protected units: PaleoUnit | null;
    protected values: string | null;
    protected variableId: string | null;
    protected variableType: string | null;
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.archiveType = null;
        this.calibratedVias = [];
        this.columnNumber = null;
        this.composite = null;
        this.description = null;
        this.foundInDataset = null;
        this.foundInTable = null;
        this.instrument = null;
        this.interpretations = [];
        this.maxValue = null;
        this.meanValue = null;
        this.medianValue = null;
        this.minValue = null;
        this.missingValue = null;
        this.name = null;
        this.notes = null;
        this.partOfCompilation = null;
        this.physicalSamples = [];
        this.primary = null;
        this.proxy = null;
        this.proxyGeneral = null;
        this.resolution = null;
        this.standardVariable = null;
        this.uncertainty = null;
        this.uncertaintyAnalytical = null;
        this.uncertaintyReproducibility = null;
        this.units = null;
        this.values = null;
        this.variableId = null;
        this.variableType = null;
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "https://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#Variable";
        this._id = this._ns + "/" + uniqid("Variable");
    }

    public getId(): string {
        return this._id;
    }

    public getType(): string {
        return this._type;
    }    

    public getMisc(): Record<string, any> {
        return this._misc;
    }
    
    public static fromData(id: string, data: Record<string, any>): Variable {
        const thisObj = new Variable();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
            }
            
            else if (key === "calibratedVia") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Calibration.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.calibratedVias.push(obj);
                }
            }
            
            else if (key === "foundInDataset") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = val["@id"];
                    thisObj.foundInDataset = obj;
                }
            }
            
            else if (key === "foundInTable") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = val["@id"];
                    thisObj.foundInTable = obj;
                }
            }
            
            else if (key === "hasArchiveType") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = ArchiveType.fromSynonym(val["@id"].replace(/^.*?#/, ""));
                    thisObj.archiveType = obj;
                }
            }
            
            else if (key === "hasColumnNumber") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.columnNumber = obj;
                }
            }
            
            else if (key === "hasDescription") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.description = obj;
                }
            }
            
            else if (key === "hasInstrument") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = val["@id"];
                    thisObj.instrument = obj;
                }
            }
            
            else if (key === "hasInterpretation") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Interpretation.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.interpretations.push(obj);
                }
            }
            
            else if (key === "hasMaxValue") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.maxValue = obj;
                }
            }
            
            else if (key === "hasMeanValue") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.meanValue = obj;
                }
            }
            
            else if (key === "hasMedianValue") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.medianValue = obj;
                }
            }
            
            else if (key === "hasMinValue") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.minValue = obj;
                }
            }
            
            else if (key === "hasMissingValue") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.missingValue = obj;
                }
            }
            
            else if (key === "hasName") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.name = obj;
                }
            }
            
            else if (key === "hasNotes") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.notes = obj;
                }
            }
            
            else if (key === "hasPhysicalSample") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = PhysicalSample.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.physicalSamples.push(obj);
                }
            }
            
            else if (key === "hasProxy") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = PaleoProxy.fromSynonym(val["@id"].replace(/^.*?#/, ""));
                    thisObj.proxy = obj;
                }
            }
            
            else if (key === "hasProxyGeneral") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = PaleoProxyGeneral.fromSynonym(val["@id"].replace(/^.*?#/, ""));
                    thisObj.proxyGeneral = obj;
                }
            }
            
            else if (key === "hasResolution") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Resolution.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.resolution = obj;
                }
            }
            
            else if (key === "hasStandardVariable") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = PaleoVariable.fromSynonym(val["@id"].replace(/^.*?#/, ""));
                    thisObj.standardVariable = obj;
                }
            }
            
            else if (key === "hasType") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.variableType = obj;
                }
            }
            
            else if (key === "hasUncertainty") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.uncertainty = obj;
                }
            }
            
            else if (key === "hasUncertaintyAnalytical") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.uncertaintyAnalytical = obj;
                }
            }
            
            else if (key === "hasUncertaintyReproducibility") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.uncertaintyReproducibility = obj;
                }
            }
            
            else if (key === "hasUnits") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = PaleoUnit.fromSynonym(val["@id"].replace(/^.*?#/, ""));
                    thisObj.units = obj;
                }
            }
            
            else if (key === "hasValues") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.values = obj;
                }
            }
            
            else if (key === "hasVariableId") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.variableId = obj;
                }
            }
            
            else if (key === "isComposite") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.composite = obj;
                }
            }
            
            else if (key === "isPrimary") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.primary = obj;
                }
            }
            
            else if (key === "partOfCompilation") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Compilation.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.partOfCompilation = obj;
                }
            }
            // Store unknown properties in misc
            for (const val of value as any[]) {
                let obj: any;
                if ("@id" in val) {
                    obj = data[val["@id"]];
                } else if ("@value" in val) {
                    obj = val["@value"];
                }
                thisObj._misc[key] = obj;
            }
        }
        return thisObj;
    }


    public toData(data: Record<string, any> = {}): Record<string, any> {
        data[this._id] = {};
        data[this._id]["type"] = [
            {
                "@id": this._type,
                "@type": "uri"
            }
        ]
        if (this.archiveType !== null) {
            const valueObj = this.archiveType;
            const obj = typeof valueObj === "string" ? {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            } : {
                "@id": valueObj.getId(),
                "@type": "uri"
            }
            data[this._id]["hasArchiveType"] = [obj];
        }
        if (this.calibratedVias.length > 0) {
            data[this._id]["calibratedVia"] = [];
            for (const valueObj of this.calibratedVias) {
            const obj = typeof valueObj === "string" ? {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            } : {
                "@id": valueObj.getId(),
                "@type": "uri"
            }
                data[this._id]["calibratedVia"].push(obj);
            }
        }
        if (this.columnNumber !== null) {
            const valueObj = this.columnNumber;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#integer"
            }
            data[this._id]["hasColumnNumber"] = [obj];
        }
        if (this.composite !== null) {
            const valueObj = this.composite;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#boolean"
            }
            data[this._id]["isComposite"] = [obj];
        }
        if (this.description !== null) {
            const valueObj = this.description;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasDescription"] = [obj];
        }
        if (this.foundInDataset !== null) {
            const valueObj = this.foundInDataset;
            const obj = {
                "@id": valueObj,
                "@type": "uri"
            }
            data[this._id]["foundInDataset"] = [obj];
        }
        if (this.foundInTable !== null) {
            const valueObj = this.foundInTable;
            const obj = {
                "@id": valueObj,
                "@type": "uri"
            }
            data[this._id]["foundInTable"] = [obj];
        }
        if (this.instrument !== null) {
            const valueObj = this.instrument;
            const obj = {
                "@id": valueObj,
                "@type": "uri"
            }
            data[this._id]["hasInstrument"] = [obj];
        }
        if (this.interpretations.length > 0) {
            data[this._id]["hasInterpretation"] = [];
            for (const valueObj of this.interpretations) {
            const obj = typeof valueObj === "string" ? {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            } : {
                "@id": valueObj.getId(),
                "@type": "uri"
            }
                data[this._id]["hasInterpretation"].push(obj);
            }
        }
        if (this.maxValue !== null) {
            const valueObj = this.maxValue;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#float"
            }
            data[this._id]["hasMaxValue"] = [obj];
        }
        if (this.meanValue !== null) {
            const valueObj = this.meanValue;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#float"
            }
            data[this._id]["hasMeanValue"] = [obj];
        }
        if (this.medianValue !== null) {
            const valueObj = this.medianValue;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#float"
            }
            data[this._id]["hasMedianValue"] = [obj];
        }
        if (this.minValue !== null) {
            const valueObj = this.minValue;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#float"
            }
            data[this._id]["hasMinValue"] = [obj];
        }
        if (this.missingValue !== null) {
            const valueObj = this.missingValue;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasMissingValue"] = [obj];
        }
        if (this.name !== null) {
            const valueObj = this.name;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasName"] = [obj];
        }
        if (this.notes !== null) {
            const valueObj = this.notes;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasNotes"] = [obj];
        }
        if (this.partOfCompilation !== null) {
            const valueObj = this.partOfCompilation;
            const obj = typeof valueObj === "string" ? {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            } : {
                "@id": valueObj.getId(),
                "@type": "uri"
            }
            data[this._id]["partOfCompilation"] = [obj];
        }
        if (this.physicalSamples.length > 0) {
            data[this._id]["hasPhysicalSample"] = [];
            for (const valueObj of this.physicalSamples) {
            const obj = typeof valueObj === "string" ? {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            } : {
                "@id": valueObj.getId(),
                "@type": "uri"
            }
                data[this._id]["hasPhysicalSample"].push(obj);
            }
        }
        if (this.primary !== null) {
            const valueObj = this.primary;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#boolean"
            }
            data[this._id]["isPrimary"] = [obj];
        }
        if (this.proxy !== null) {
            const valueObj = this.proxy;
            const obj = typeof valueObj === "string" ? {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            } : {
                "@id": valueObj.getId(),
                "@type": "uri"
            }
            data[this._id]["hasProxy"] = [obj];
        }
        if (this.proxyGeneral !== null) {
            const valueObj = this.proxyGeneral;
            const obj = typeof valueObj === "string" ? {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            } : {
                "@id": valueObj.getId(),
                "@type": "uri"
            }
            data[this._id]["hasProxyGeneral"] = [obj];
        }
        if (this.resolution !== null) {
            const valueObj = this.resolution;
            const obj = typeof valueObj === "string" ? {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            } : {
                "@id": valueObj.getId(),
                "@type": "uri"
            }
            data[this._id]["hasResolution"] = [obj];
        }
        if (this.standardVariable !== null) {
            const valueObj = this.standardVariable;
            const obj = typeof valueObj === "string" ? {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            } : {
                "@id": valueObj.getId(),
                "@type": "uri"
            }
            data[this._id]["hasStandardVariable"] = [obj];
        }
        if (this.uncertainty !== null) {
            const valueObj = this.uncertainty;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasUncertainty"] = [obj];
        }
        if (this.uncertaintyAnalytical !== null) {
            const valueObj = this.uncertaintyAnalytical;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasUncertaintyAnalytical"] = [obj];
        }
        if (this.uncertaintyReproducibility !== null) {
            const valueObj = this.uncertaintyReproducibility;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasUncertaintyReproducibility"] = [obj];
        }
        if (this.units !== null) {
            const valueObj = this.units;
            const obj = typeof valueObj === "string" ? {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            } : {
                "@id": valueObj.getId(),
                "@type": "uri"
            }
            data[this._id]["hasUnits"] = [obj];
        }
        if (this.values !== null) {
            const valueObj = this.values;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasValues"] = [obj];
        }
        if (this.variableId !== null) {
            const valueObj = this.variableId;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasVariableId"] = [obj];
        }
        if (this.variableType !== null) {
            const valueObj = this.variableType;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasType"] = [obj];
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[this._id][key] = [];
            let ptype: string | null = null;
            const tp = typeof value;
            if (tp === "number") {
                if (Number.isInteger(value)) {
                    ptype = "http://www.w3.org/2001/XMLSchema#integer";
                } else {
                    ptype = "http://www.w3.org/2001/XMLSchema#float";
                }
            } else if (tp === "string") {
                if (/\d{4}-\d{2}-\d{2}( |T)\d{2}:\d{2}:\d{2}/.test(value as string)) {
                    ptype = "http://www.w3.org/2001/XMLSchema#datetime";
                } else if (/\d{4}-\d{2}-\d{2}/.test(value as string)) {
                    ptype = "http://www.w3.org/2001/XMLSchema#date";
                } else {
                    ptype = "http://www.w3.org/2001/XMLSchema#string";
                }
            } else if (tp === "boolean") {
                ptype = "http://www.w3.org/2001/XMLSchema#boolean";
            }

            data[this._id][key].push({
                "@value": value,
                "@type": "literal",
                "@datatype": ptype
            });
        }
        return data;
    }

    public toJson(): Record<string, any> {
        const data: Record<string, any> = {
            "@id": this._id
        }
        if (this.archiveType !== null) {
            const valueObj = this.archiveType;
                const obj = valueObj.toJson()
            data["archiveType"] = obj;
        }
        if (this.calibratedVias.length > 0) {
            data["calibration"] = [];
            for (const valueObj of this.calibratedVias) {
                const obj = valueObj.toJson()
                data["calibration"].push(obj);
            }
        }
        if (this.columnNumber !== null) {
            const valueObj = this.columnNumber;
                const obj = valueObj
            data["number"] = obj;
        }
        if (this.composite !== null) {
            const valueObj = this.composite;
                const obj = valueObj
            data["isComposite"] = obj;
        }
        if (this.description !== null) {
            const valueObj = this.description;
                const obj = valueObj
            data["description"] = obj;
        }
        if (this.instrument !== null) {
            const valueObj = this.instrument;
                const obj = valueObj
            data["measurementInstrument"] = obj;
        }
        if (this.interpretations.length > 0) {
            data["interpretation"] = [];
            for (const valueObj of this.interpretations) {
                const obj = valueObj.toJson()
                data["interpretation"].push(obj);
            }
        }
        if (this.maxValue !== null) {
            const valueObj = this.maxValue;
                const obj = valueObj
            data["hasMaxValue"] = obj;
        }
        if (this.meanValue !== null) {
            const valueObj = this.meanValue;
                const obj = valueObj
            data["hasMeanValue"] = obj;
        }
        if (this.medianValue !== null) {
            const valueObj = this.medianValue;
                const obj = valueObj
            data["hasMedianValue"] = obj;
        }
        if (this.minValue !== null) {
            const valueObj = this.minValue;
                const obj = valueObj
            data["hasMinValue"] = obj;
        }
        if (this.missingValue !== null) {
            const valueObj = this.missingValue;
                const obj = valueObj
            data["missingValue"] = obj;
        }
        if (this.name !== null) {
            const valueObj = this.name;
                const obj = valueObj
            data["variableName"] = obj;
        }
        if (this.notes !== null) {
            const valueObj = this.notes;
                const obj = valueObj
            data["notes"] = obj;
        }
        if (this.partOfCompilation !== null) {
            const valueObj = this.partOfCompilation;
                const obj = valueObj.toJson()
            data["inCompilationBeta"] = obj;
        }
        if (this.physicalSamples.length > 0) {
            data["physicalSample"] = [];
            for (const valueObj of this.physicalSamples) {
                const obj = valueObj.toJson()
                data["physicalSample"].push(obj);
            }
        }
        if (this.primary !== null) {
            const valueObj = this.primary;
                const obj = valueObj
            data["isPrimary"] = obj;
        }
        if (this.proxy !== null) {
            const valueObj = this.proxy;
                const obj = valueObj.toJson()
            data["proxy"] = obj;
        }
        if (this.proxyGeneral !== null) {
            const valueObj = this.proxyGeneral;
                const obj = valueObj.toJson()
            data["proxyGeneral"] = obj;
        }
        if (this.resolution !== null) {
            const valueObj = this.resolution;
                const obj = valueObj.toJson()
            data["resolution"] = obj;
        }
        if (this.standardVariable !== null) {
            const valueObj = this.standardVariable;
                const obj = valueObj.toJson()
            data["hasStandardVariable"] = obj;
        }
        if (this.uncertainty !== null) {
            const valueObj = this.uncertainty;
                const obj = valueObj
            data["uncertainty"] = obj;
        }
        if (this.uncertaintyAnalytical !== null) {
            const valueObj = this.uncertaintyAnalytical;
                const obj = valueObj
            data["uncertaintyAnalytical"] = obj;
        }
        if (this.uncertaintyReproducibility !== null) {
            const valueObj = this.uncertaintyReproducibility;
                const obj = valueObj
            data["uncertaintyReproducibility"] = obj;
        }
        if (this.units !== null) {
            const valueObj = this.units;
                const obj = valueObj.toJson()
            data["units"] = obj;
        }
        if (this.values !== null) {
            const valueObj = this.values;
                const obj = valueObj
            data["hasValues"] = obj;
        }
        if (this.variableId !== null) {
            const valueObj = this.variableId;
                const obj = valueObj
            data["TSid"] = obj;
        }
        if (this.variableType !== null) {
            const valueObj = this.variableType;
                const obj = valueObj
            data["variableType"] = obj;
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): Variable {
        const thisObj = new Variable();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = value as string;
                continue;
            }
            if (key === "TSid") {
                let obj: any = null;
                    obj = value
                thisObj.variableId = obj;
                continue;
            }
            if (key === "archiveType") {
                let obj: any = null;
                    obj = ArchiveType.fromSynonym(value.replace(/^.*?#/, ""))
                thisObj.archiveType = obj;
                continue;
            }
            if (key === "calibration") {
                let obj: any = null;
                if (Array.isArray(value)) {
                    obj = Calibration.fromJson(value)
                    thisObj.calibratedVias.push(obj);
                }
                continue;
            }
            if (key === "description") {
                let obj: any = null;
                    obj = value
                thisObj.description = obj;
                continue;
            }
            if (key === "foundInDataset") {
                let obj: any = null;
                    obj = value
                thisObj.foundInDataset = obj;
                continue;
            }
            if (key === "foundInTable") {
                let obj: any = null;
                    obj = value
                thisObj.foundInTable = obj;
                continue;
            }
            if (key === "hasMaxValue") {
                let obj: any = null;
                    obj = value
                thisObj.maxValue = obj;
                continue;
            }
            if (key === "hasMeanValue") {
                let obj: any = null;
                    obj = value
                thisObj.meanValue = obj;
                continue;
            }
            if (key === "hasMedianValue") {
                let obj: any = null;
                    obj = value
                thisObj.medianValue = obj;
                continue;
            }
            if (key === "hasMinValue") {
                let obj: any = null;
                    obj = value
                thisObj.minValue = obj;
                continue;
            }
            if (key === "hasStandardVariable") {
                let obj: any = null;
                    obj = PaleoVariable.fromSynonym(value.replace(/^.*?#/, ""))
                thisObj.standardVariable = obj;
                continue;
            }
            if (key === "hasValues") {
                let obj: any = null;
                    obj = value
                thisObj.values = obj;
                continue;
            }
            if (key === "inCompilationBeta") {
                let obj: any = null;
                    obj = Compilation.fromJson(value)
                thisObj.partOfCompilation = obj;
                continue;
            }
            if (key === "interpretation") {
                let obj: any = null;
                if (Array.isArray(value)) {
                    obj = Interpretation.fromJson(value)
                    thisObj.interpretations.push(obj);
                }
                continue;
            }
            if (key === "isComposite") {
                let obj: any = null;
                    obj = value
                thisObj.composite = obj;
                continue;
            }
            if (key === "isPrimary") {
                let obj: any = null;
                    obj = value
                thisObj.primary = obj;
                continue;
            }
            if (key === "measurementInstrument") {
                let obj: any = null;
                    obj = value
                thisObj.instrument = obj;
                continue;
            }
            if (key === "missingValue") {
                let obj: any = null;
                    obj = value
                thisObj.missingValue = obj;
                continue;
            }
            if (key === "notes") {
                let obj: any = null;
                    obj = value
                thisObj.notes = obj;
                continue;
            }
            if (key === "number") {
                let obj: any = null;
                    obj = value
                thisObj.columnNumber = obj;
                continue;
            }
            if (key === "physicalSample") {
                let obj: any = null;
                if (Array.isArray(value)) {
                    obj = PhysicalSample.fromJson(value)
                    thisObj.physicalSamples.push(obj);
                }
                continue;
            }
            if (key === "proxy") {
                let obj: any = null;
                    obj = PaleoProxy.fromSynonym(value.replace(/^.*?#/, ""))
                thisObj.proxy = obj;
                continue;
            }
            if (key === "proxyGeneral") {
                let obj: any = null;
                    obj = PaleoProxyGeneral.fromSynonym(value.replace(/^.*?#/, ""))
                thisObj.proxyGeneral = obj;
                continue;
            }
            if (key === "resolution") {
                let obj: any = null;
                    obj = Resolution.fromJson(value)
                thisObj.resolution = obj;
                continue;
            }
            if (key === "uncertainty") {
                let obj: any = null;
                    obj = value
                thisObj.uncertainty = obj;
                continue;
            }
            if (key === "uncertaintyAnalytical") {
                let obj: any = null;
                    obj = value
                thisObj.uncertaintyAnalytical = obj;
                continue;
            }
            if (key === "uncertaintyReproducibility") {
                let obj: any = null;
                    obj = value
                thisObj.uncertaintyReproducibility = obj;
                continue;
            }
            if (key === "units") {
                let obj: any = null;
                    obj = PaleoUnit.fromSynonym(value.replace(/^.*?#/, ""))
                thisObj.units = obj;
                continue;
            }
            if (key === "variableName") {
                let obj: any = null;
                    obj = value
                thisObj.name = obj;
                continue;
            }
            if (key === "variableType") {
                let obj: any = null;
                    obj = value
                thisObj.variableType = obj;
                continue;
            }
            // Store unknown properties in misc
            thisObj._misc[key] = value;
        }
        return thisObj;
    }

    public setNonStandardProperty(key: string, value: unknown): void {
        this._misc[key] = value;
    }
    
    public getNonStandardProperty(key: string): unknown {
        return this._misc[key];
    }
                
    public getAllNonStandardProperties(): Record<string, unknown> {
        return this._misc;
    }

    public addNonStandardProperty(key: string, value: unknown): void {
        if (!(key in this._misc)) {
            this._misc[key] = [];
        }
        (this._misc[key] as unknown[]).push(value);
    }
    
    getArchiveType(): ArchiveType | null {
        return this.archiveType;
    }

    setArchiveType(archiveType: ArchiveType): void {
        // if (!(archiveType instanceof ArchiveType)) {
        //     throw new Error(`Error: '${archiveType}' is not of type ArchiveType\nYou can create a new ArchiveType object from a string using the following syntax:\n- Fetch existing ArchiveType by synonym: ArchiveType.fromSynonym("${archiveType}")\n- Create a new custom ArchiveType: new ArchiveType("${archiveType}")`);
        // }
        this.archiveType = archiveType;
    }
    getCalibratedVias(): Calibration[] {
        return this.calibratedVias;
    }

    setCalibratedVias(calibratedVias: Calibration[]): void {
        // if (!Array.isArray(calibratedVias)) {
        //     throw new Error("Error: calibratedVias is not an array");
        // }
        // if (!calibratedVias.every(x => x instanceof Calibration)) {
        //     throw new Error(`Error: '${calibratedVias}' is not of type Calibration`);
        // }
        this.calibratedVias = calibratedVias;
    }

    addCalibratedVia(calibratedVias: Calibration): void {
        // if (!(calibratedVias instanceof Calibration)) {
        //     throw new Error(`Error: '${calibratedVias}' is not of type Calibration`);
        // }
        this.calibratedVias.push(calibratedVias);
    }
    getColumnNumber(): number | null {
        return this.columnNumber;
    }

    setColumnNumber(columnNumber: number): void {
        // if (!(columnNumber instanceof number)) {
        //     throw new Error(`Error: '${columnNumber}' is not of type number`);
        // }
        this.columnNumber = columnNumber;
    }
    getDescription(): string | null {
        return this.description;
    }

    setDescription(description: string): void {
        // if (!(description instanceof string)) {
        //     throw new Error(`Error: '${description}' is not of type string`);
        // }
        this.description = description;
    }
    getFoundInDataset(): null | null {
        return this.foundInDataset;
    }

    setFoundInDataset(foundInDataset: null): void {
        // if (!(foundInDataset instanceof null)) {
        //     throw new Error(`Error: '${foundInDataset}' is not of type null`);
        // }
        this.foundInDataset = foundInDataset;
    }
    getFoundInTable(): null | null {
        return this.foundInTable;
    }

    setFoundInTable(foundInTable: null): void {
        // if (!(foundInTable instanceof null)) {
        //     throw new Error(`Error: '${foundInTable}' is not of type null`);
        // }
        this.foundInTable = foundInTable;
    }
    getInstrument(): null | null {
        return this.instrument;
    }

    setInstrument(instrument: null): void {
        // if (!(instrument instanceof null)) {
        //     throw new Error(`Error: '${instrument}' is not of type null`);
        // }
        this.instrument = instrument;
    }
    getInterpretations(): Interpretation[] {
        return this.interpretations;
    }

    setInterpretations(interpretations: Interpretation[]): void {
        // if (!Array.isArray(interpretations)) {
        //     throw new Error("Error: interpretations is not an array");
        // }
        // if (!interpretations.every(x => x instanceof Interpretation)) {
        //     throw new Error(`Error: '${interpretations}' is not of type Interpretation`);
        // }
        this.interpretations = interpretations;
    }

    addInterpretation(interpretations: Interpretation): void {
        // if (!(interpretations instanceof Interpretation)) {
        //     throw new Error(`Error: '${interpretations}' is not of type Interpretation`);
        // }
        this.interpretations.push(interpretations);
    }
    getMaxValue(): number | null {
        return this.maxValue;
    }

    setMaxValue(maxValue: number): void {
        // if (!(maxValue instanceof number)) {
        //     throw new Error(`Error: '${maxValue}' is not of type number`);
        // }
        this.maxValue = maxValue;
    }
    getMeanValue(): number | null {
        return this.meanValue;
    }

    setMeanValue(meanValue: number): void {
        // if (!(meanValue instanceof number)) {
        //     throw new Error(`Error: '${meanValue}' is not of type number`);
        // }
        this.meanValue = meanValue;
    }
    getMedianValue(): number | null {
        return this.medianValue;
    }

    setMedianValue(medianValue: number): void {
        // if (!(medianValue instanceof number)) {
        //     throw new Error(`Error: '${medianValue}' is not of type number`);
        // }
        this.medianValue = medianValue;
    }
    getMinValue(): number | null {
        return this.minValue;
    }

    setMinValue(minValue: number): void {
        // if (!(minValue instanceof number)) {
        //     throw new Error(`Error: '${minValue}' is not of type number`);
        // }
        this.minValue = minValue;
    }
    getMissingValue(): string | null {
        return this.missingValue;
    }

    setMissingValue(missingValue: string): void {
        // if (!(missingValue instanceof string)) {
        //     throw new Error(`Error: '${missingValue}' is not of type string`);
        // }
        this.missingValue = missingValue;
    }
    getName(): string | null {
        return this.name;
    }

    setName(name: string): void {
        // if (!(name instanceof string)) {
        //     throw new Error(`Error: '${name}' is not of type string`);
        // }
        this.name = name;
    }
    getNotes(): string | null {
        return this.notes;
    }

    setNotes(notes: string): void {
        // if (!(notes instanceof string)) {
        //     throw new Error(`Error: '${notes}' is not of type string`);
        // }
        this.notes = notes;
    }
    getPartOfCompilation(): Compilation | null {
        return this.partOfCompilation;
    }

    setPartOfCompilation(partOfCompilation: Compilation): void {
        // if (!(partOfCompilation instanceof Compilation)) {
        //     throw new Error(`Error: '${partOfCompilation}' is not of type Compilation`);
        // }
        this.partOfCompilation = partOfCompilation;
    }
    getPhysicalSamples(): PhysicalSample[] {
        return this.physicalSamples;
    }

    setPhysicalSamples(physicalSamples: PhysicalSample[]): void {
        // if (!Array.isArray(physicalSamples)) {
        //     throw new Error("Error: physicalSamples is not an array");
        // }
        // if (!physicalSamples.every(x => x instanceof PhysicalSample)) {
        //     throw new Error(`Error: '${physicalSamples}' is not of type PhysicalSample`);
        // }
        this.physicalSamples = physicalSamples;
    }

    addPhysicalSample(physicalSamples: PhysicalSample): void {
        // if (!(physicalSamples instanceof PhysicalSample)) {
        //     throw new Error(`Error: '${physicalSamples}' is not of type PhysicalSample`);
        // }
        this.physicalSamples.push(physicalSamples);
    }
    getProxy(): PaleoProxy | null {
        return this.proxy;
    }

    setProxy(proxy: PaleoProxy): void {
        // if (!(proxy instanceof PaleoProxy)) {
        //     throw new Error(`Error: '${proxy}' is not of type PaleoProxy\nYou can create a new PaleoProxy object from a string using the following syntax:\n- Fetch existing PaleoProxy by synonym: PaleoProxy.fromSynonym("${proxy}")\n- Create a new custom PaleoProxy: new PaleoProxy("${proxy}")`);
        // }
        this.proxy = proxy;
    }
    getProxyGeneral(): PaleoProxyGeneral | null {
        return this.proxyGeneral;
    }

    setProxyGeneral(proxyGeneral: PaleoProxyGeneral): void {
        // if (!(proxyGeneral instanceof PaleoProxyGeneral)) {
        //     throw new Error(`Error: '${proxyGeneral}' is not of type PaleoProxyGeneral\nYou can create a new PaleoProxyGeneral object from a string using the following syntax:\n- Fetch existing PaleoProxyGeneral by synonym: PaleoProxyGeneral.fromSynonym("${proxyGeneral}")\n- Create a new custom PaleoProxyGeneral: new PaleoProxyGeneral("${proxyGeneral}")`);
        // }
        this.proxyGeneral = proxyGeneral;
    }
    getResolution(): Resolution | null {
        return this.resolution;
    }

    setResolution(resolution: Resolution): void {
        // if (!(resolution instanceof Resolution)) {
        //     throw new Error(`Error: '${resolution}' is not of type Resolution`);
        // }
        this.resolution = resolution;
    }
    getStandardVariable(): PaleoVariable | null {
        return this.standardVariable;
    }

    setStandardVariable(standardVariable: PaleoVariable): void {
        // if (!(standardVariable instanceof PaleoVariable)) {
        //     throw new Error(`Error: '${standardVariable}' is not of type PaleoVariable\nYou can create a new PaleoVariable object from a string using the following syntax:\n- Fetch existing PaleoVariable by synonym: PaleoVariable.fromSynonym("${standardVariable}")\n- Create a new custom PaleoVariable: new PaleoVariable("${standardVariable}")`);
        // }
        this.standardVariable = standardVariable;
    }
    getUncertainty(): string | null {
        return this.uncertainty;
    }

    setUncertainty(uncertainty: string): void {
        // if (!(uncertainty instanceof string)) {
        //     throw new Error(`Error: '${uncertainty}' is not of type string`);
        // }
        this.uncertainty = uncertainty;
    }
    getUncertaintyAnalytical(): string | null {
        return this.uncertaintyAnalytical;
    }

    setUncertaintyAnalytical(uncertaintyAnalytical: string): void {
        // if (!(uncertaintyAnalytical instanceof string)) {
        //     throw new Error(`Error: '${uncertaintyAnalytical}' is not of type string`);
        // }
        this.uncertaintyAnalytical = uncertaintyAnalytical;
    }
    getUncertaintyReproducibility(): string | null {
        return this.uncertaintyReproducibility;
    }

    setUncertaintyReproducibility(uncertaintyReproducibility: string): void {
        // if (!(uncertaintyReproducibility instanceof string)) {
        //     throw new Error(`Error: '${uncertaintyReproducibility}' is not of type string`);
        // }
        this.uncertaintyReproducibility = uncertaintyReproducibility;
    }
    getUnits(): PaleoUnit | null {
        return this.units;
    }

    setUnits(units: PaleoUnit): void {
        // if (!(units instanceof PaleoUnit)) {
        //     throw new Error(`Error: '${units}' is not of type PaleoUnit\nYou can create a new PaleoUnit object from a string using the following syntax:\n- Fetch existing PaleoUnit by synonym: PaleoUnit.fromSynonym("${units}")\n- Create a new custom PaleoUnit: new PaleoUnit("${units}")`);
        // }
        this.units = units;
    }
    getValues(): string | null {
        return this.values;
    }

    setValues(values: string): void {
        // if (!(values instanceof string)) {
        //     throw new Error(`Error: '${values}' is not of type string`);
        // }
        this.values = values;
    }
    getVariableId(): string | null {
        return this.variableId;
    }

    setVariableId(variableId: string): void {
        // if (!(variableId instanceof string)) {
        //     throw new Error(`Error: '${variableId}' is not of type string`);
        // }
        this.variableId = variableId;
    }
    getVariableType(): string | null {
        return this.variableType;
    }

    setVariableType(variableType: string): void {
        // if (!(variableType instanceof string)) {
        //     throw new Error(`Error: '${variableType}' is not of type string`);
        // }
        this.variableType = variableType;
    }
    isComposite(): boolean | null {
        return this.composite;
    }

    setComposite(composite: boolean): void {
        // if (!(composite instanceof boolean)) {
        //     throw new Error(`Error: '${composite}' is not of type boolean`);
        // }
        this.composite = composite;
    }
    isPrimary(): boolean | null {
        return this.primary;
    }

    setPrimary(primary: boolean): void {
        // if (!(primary instanceof boolean)) {
        //     throw new Error(`Error: '${primary}' is not of type boolean`);
        // }
        this.primary = primary;
    }
}

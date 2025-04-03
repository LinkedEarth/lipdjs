
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";



export class Calibration {

    protected dOI: string | null;
    protected datasetRange: string | null;
    protected equation: string | null;
    protected equationIntercept: string | null;
    protected equationR2: string | null;
    protected equationSlope: string | null;
    protected equationSlopeUncertainty: string | null;
    protected method: string | null;
    protected methodDetail: string | null;
    protected notes: string | null;
    protected proxyDataset: string | null;
    protected seasonality: string | null;
    protected targetDataset: string | null;
    protected uncertainty: string | null;
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.dOI = null;
        this.datasetRange = null;
        this.equation = null;
        this.equationIntercept = null;
        this.equationR2 = null;
        this.equationSlope = null;
        this.equationSlopeUncertainty = null;
        this.method = null;
        this.methodDetail = null;
        this.notes = null;
        this.proxyDataset = null;
        this.seasonality = null;
        this.targetDataset = null;
        this.uncertainty = null;
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "https://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#Calibration";
        this._id = this._ns + "/" + uniqid("Calibration");
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
    
    public static fromData(id: string, data: Record<string, any>): Calibration {
        const thisObj = new Calibration();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
            }
            
            else if (key === "hasDOI") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.dOI = obj;
                }
            }
            
            else if (key === "hasDatasetRange") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.datasetRange = obj;
                }
            }
            
            else if (key === "hasEquation") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.equation = obj;
                }
            }
            
            else if (key === "hasEquationIntercept") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.equationIntercept = obj;
                }
            }
            
            else if (key === "hasEquationR2") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.equationR2 = obj;
                }
            }
            
            else if (key === "hasEquationSlope") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.equationSlope = obj;
                }
            }
            
            else if (key === "hasEquationSlopeUncertainty") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.equationSlopeUncertainty = obj;
                }
            }
            
            else if (key === "hasMethod") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.method = obj;
                }
            }
            
            else if (key === "hasMethodDetail") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.methodDetail = obj;
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
            
            else if (key === "hasProxyDataset") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.proxyDataset = obj;
                }
            }
            
            else if (key === "hasTargetDataset") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.targetDataset = obj;
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
            
            else if (key === "seasonality") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.seasonality = obj;
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
        if (this.dOI !== null) {
            const valueObj = this.dOI;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasDOI"] = [obj];
        }
        if (this.datasetRange !== null) {
            const valueObj = this.datasetRange;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasDatasetRange"] = [obj];
        }
        if (this.equation !== null) {
            const valueObj = this.equation;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasEquation"] = [obj];
        }
        if (this.equationIntercept !== null) {
            const valueObj = this.equationIntercept;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasEquationIntercept"] = [obj];
        }
        if (this.equationR2 !== null) {
            const valueObj = this.equationR2;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasEquationR2"] = [obj];
        }
        if (this.equationSlope !== null) {
            const valueObj = this.equationSlope;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasEquationSlope"] = [obj];
        }
        if (this.equationSlopeUncertainty !== null) {
            const valueObj = this.equationSlopeUncertainty;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasEquationSlopeUncertainty"] = [obj];
        }
        if (this.method !== null) {
            const valueObj = this.method;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasMethod"] = [obj];
        }
        if (this.methodDetail !== null) {
            const valueObj = this.methodDetail;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasMethodDetail"] = [obj];
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
        if (this.proxyDataset !== null) {
            const valueObj = this.proxyDataset;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasProxyDataset"] = [obj];
        }
        if (this.seasonality !== null) {
            const valueObj = this.seasonality;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["seasonality"] = [obj];
        }
        if (this.targetDataset !== null) {
            const valueObj = this.targetDataset;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasTargetDataset"] = [obj];
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
        if (this.dOI !== null) {
            const valueObj = this.dOI;
                const obj = valueObj
            data["doi"] = obj;
        }
        if (this.datasetRange !== null) {
            const valueObj = this.datasetRange;
                const obj = valueObj
            data["datasetRange"] = obj;
        }
        if (this.equation !== null) {
            const valueObj = this.equation;
                const obj = valueObj
            data["equation"] = obj;
        }
        if (this.equationIntercept !== null) {
            const valueObj = this.equationIntercept;
                const obj = valueObj
            data["equationIntercept"] = obj;
        }
        if (this.equationR2 !== null) {
            const valueObj = this.equationR2;
                const obj = valueObj
            data["equationR2"] = obj;
        }
        if (this.equationSlope !== null) {
            const valueObj = this.equationSlope;
                const obj = valueObj
            data["equationSlope"] = obj;
        }
        if (this.equationSlopeUncertainty !== null) {
            const valueObj = this.equationSlopeUncertainty;
                const obj = valueObj
            data["equationSlopeUncertainty"] = obj;
        }
        if (this.method !== null) {
            const valueObj = this.method;
                const obj = valueObj
            data["method"] = obj;
        }
        if (this.methodDetail !== null) {
            const valueObj = this.methodDetail;
                const obj = valueObj
            data["methodDetail"] = obj;
        }
        if (this.notes !== null) {
            const valueObj = this.notes;
                const obj = valueObj
            data["notes"] = obj;
        }
        if (this.proxyDataset !== null) {
            const valueObj = this.proxyDataset;
                const obj = valueObj
            data["proxyDataset"] = obj;
        }
        if (this.seasonality !== null) {
            const valueObj = this.seasonality;
                const obj = valueObj
            data["hasSeasonality"] = obj;
        }
        if (this.targetDataset !== null) {
            const valueObj = this.targetDataset;
                const obj = valueObj
            data["targetDataset"] = obj;
        }
        if (this.uncertainty !== null) {
            const valueObj = this.uncertainty;
                const obj = valueObj
            data["uncertainty"] = obj;
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): Calibration {
        const thisObj = new Calibration();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = value as string;
                continue;
            }
            if (key === "datasetRange") {
                let obj: any = null;
                    obj = value
                thisObj.datasetRange = obj;
                continue;
            }
            if (key === "doi") {
                let obj: any = null;
                    obj = value
                thisObj.dOI = obj;
                continue;
            }
            if (key === "equation") {
                let obj: any = null;
                    obj = value
                thisObj.equation = obj;
                continue;
            }
            if (key === "equationIntercept") {
                let obj: any = null;
                    obj = value
                thisObj.equationIntercept = obj;
                continue;
            }
            if (key === "equationR2") {
                let obj: any = null;
                    obj = value
                thisObj.equationR2 = obj;
                continue;
            }
            if (key === "equationSlope") {
                let obj: any = null;
                    obj = value
                thisObj.equationSlope = obj;
                continue;
            }
            if (key === "equationSlopeUncertainty") {
                let obj: any = null;
                    obj = value
                thisObj.equationSlopeUncertainty = obj;
                continue;
            }
            if (key === "hasSeasonality") {
                let obj: any = null;
                    obj = value
                thisObj.seasonality = obj;
                continue;
            }
            if (key === "method") {
                let obj: any = null;
                    obj = value
                thisObj.method = obj;
                continue;
            }
            if (key === "methodDetail") {
                let obj: any = null;
                    obj = value
                thisObj.methodDetail = obj;
                continue;
            }
            if (key === "notes") {
                let obj: any = null;
                    obj = value
                thisObj.notes = obj;
                continue;
            }
            if (key === "proxyDataset") {
                let obj: any = null;
                    obj = value
                thisObj.proxyDataset = obj;
                continue;
            }
            if (key === "targetDataset") {
                let obj: any = null;
                    obj = value
                thisObj.targetDataset = obj;
                continue;
            }
            if (key === "uncertainty") {
                let obj: any = null;
                    obj = value
                thisObj.uncertainty = obj;
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
    
    getDOI(): string | null {
        return this.dOI;
    }

    setDOI(dOI: string): void {
        // if (!(dOI instanceof string)) {
        //     throw new Error(`Error: '${dOI}' is not of type string`);
        // }
        this.dOI = dOI;
    }
    getDatasetRange(): string | null {
        return this.datasetRange;
    }

    setDatasetRange(datasetRange: string): void {
        // if (!(datasetRange instanceof string)) {
        //     throw new Error(`Error: '${datasetRange}' is not of type string`);
        // }
        this.datasetRange = datasetRange;
    }
    getEquation(): string | null {
        return this.equation;
    }

    setEquation(equation: string): void {
        // if (!(equation instanceof string)) {
        //     throw new Error(`Error: '${equation}' is not of type string`);
        // }
        this.equation = equation;
    }
    getEquationIntercept(): string | null {
        return this.equationIntercept;
    }

    setEquationIntercept(equationIntercept: string): void {
        // if (!(equationIntercept instanceof string)) {
        //     throw new Error(`Error: '${equationIntercept}' is not of type string`);
        // }
        this.equationIntercept = equationIntercept;
    }
    getEquationR2(): string | null {
        return this.equationR2;
    }

    setEquationR2(equationR2: string): void {
        // if (!(equationR2 instanceof string)) {
        //     throw new Error(`Error: '${equationR2}' is not of type string`);
        // }
        this.equationR2 = equationR2;
    }
    getEquationSlope(): string | null {
        return this.equationSlope;
    }

    setEquationSlope(equationSlope: string): void {
        // if (!(equationSlope instanceof string)) {
        //     throw new Error(`Error: '${equationSlope}' is not of type string`);
        // }
        this.equationSlope = equationSlope;
    }
    getEquationSlopeUncertainty(): string | null {
        return this.equationSlopeUncertainty;
    }

    setEquationSlopeUncertainty(equationSlopeUncertainty: string): void {
        // if (!(equationSlopeUncertainty instanceof string)) {
        //     throw new Error(`Error: '${equationSlopeUncertainty}' is not of type string`);
        // }
        this.equationSlopeUncertainty = equationSlopeUncertainty;
    }
    getMethod(): string | null {
        return this.method;
    }

    setMethod(method: string): void {
        // if (!(method instanceof string)) {
        //     throw new Error(`Error: '${method}' is not of type string`);
        // }
        this.method = method;
    }
    getMethodDetail(): string | null {
        return this.methodDetail;
    }

    setMethodDetail(methodDetail: string): void {
        // if (!(methodDetail instanceof string)) {
        //     throw new Error(`Error: '${methodDetail}' is not of type string`);
        // }
        this.methodDetail = methodDetail;
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
    getProxyDataset(): string | null {
        return this.proxyDataset;
    }

    setProxyDataset(proxyDataset: string): void {
        // if (!(proxyDataset instanceof string)) {
        //     throw new Error(`Error: '${proxyDataset}' is not of type string`);
        // }
        this.proxyDataset = proxyDataset;
    }
    getSeasonality(): string | null {
        return this.seasonality;
    }

    setSeasonality(seasonality: string): void {
        // if (!(seasonality instanceof string)) {
        //     throw new Error(`Error: '${seasonality}' is not of type string`);
        // }
        this.seasonality = seasonality;
    }
    getTargetDataset(): string | null {
        return this.targetDataset;
    }

    setTargetDataset(targetDataset: string): void {
        // if (!(targetDataset instanceof string)) {
        //     throw new Error(`Error: '${targetDataset}' is not of type string`);
        // }
        this.targetDataset = targetDataset;
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
}

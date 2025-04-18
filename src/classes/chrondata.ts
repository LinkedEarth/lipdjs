
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";
import { DataTable } from "./datatable";
import { Model } from "./model";



export class ChronData {

    public measurementTables: DataTable[];
    public modeledBy: Model[];
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.measurementTables = [];
        this.modeledBy = [];
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#ChronData";
        this._id = this._ns + "/" + uniqid("ChronData");
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
    
    public static fromDictionary(data: Record<string, any>): ChronData {
        const thisObj = new ChronData();
        thisObj._id = data._id;
        thisObj._type = data._type;
        thisObj._misc = data._misc;
        thisObj._ontns = data._ontns;
        thisObj._ns = data._ns;
        thisObj.measurementTables = [];
        for (const value of (data.measurementTables || []) as any[]) {
            thisObj.measurementTables.push(DataTable.fromDictionary(value));
        }
        thisObj.modeledBy = [];
        for (const value of (data.modeledBy || []) as any[]) {
            thisObj.modeledBy.push(Model.fromDictionary(value));
        }
        return thisObj;
    }

    public static fromData(id: string, data: Record<string, any>): ChronData {
        const thisObj = new ChronData();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
            }
            
            else if (key === "hasMeasurementTable") {
                thisObj.measurementTables = [];
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = DataTable.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.measurementTables.push(obj);
                }
            }
            
            else if (key === "modeledBy") {
                thisObj.modeledBy = [];
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Model.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.modeledBy.push(obj);
                }
            }
            else {
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
        if (this.measurementTables.length > 0) {
            data[this._id]["hasMeasurementTable"] = [];
            for (const valueObj of this.measurementTables) {
            let obj: any = null;
            if (typeof valueObj === "string") {
                obj = {
                    "@value": valueObj,
                    "@type": "literal",
                    "@datatype": "http://www.w3.org/2001/XMLSchema#string"
                }
            } else {
                obj = {
                    "@id": valueObj.getId(),
                    "@type": "uri"
                }
                data = valueObj.toData(data); 
            }
                data[this._id]["hasMeasurementTable"].push(obj);
            }
        }
        if (this.modeledBy.length > 0) {
            data[this._id]["modeledBy"] = [];
            for (const valueObj of this.modeledBy) {
            let obj: any = null;
            if (typeof valueObj === "string") {
                obj = {
                    "@value": valueObj,
                    "@type": "literal",
                    "@datatype": "http://www.w3.org/2001/XMLSchema#string"
                }
            } else {
                obj = {
                    "@id": valueObj.getId(),
                    "@type": "uri"
                }
                data = valueObj.toData(data); 
            }
                data[this._id]["modeledBy"].push(obj);
            }
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
        if (this.measurementTables.length > 0) {
            data["measurementTable"] = [];
            for (const valueObj of this.measurementTables) {
                const obj = valueObj.toJson()
                data["measurementTable"].push(obj);
            }
        }
        if (this.modeledBy.length > 0) {
            data["model"] = [];
            for (const valueObj of this.modeledBy) {
                const obj = valueObj.toJson()
                data["model"].push(obj);
            }
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): ChronData {
        const thisObj = new ChronData();
        for (const [key, pvalue] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = pvalue as string;
                continue;
            }
            if (key === "measurementTable") {
                let obj: any = null;
                thisObj.measurementTables = [];
                for (const value of pvalue as any[]) {
                    obj = DataTable.fromJson(value)
                    thisObj.measurementTables.push(obj);
                }
                continue;
            }
            if (key === "model") {
                let obj: any = null;
                thisObj.modeledBy = [];
                for (const value of pvalue as any[]) {
                    obj = Model.fromJson(value)
                    thisObj.modeledBy.push(obj);
                }
                continue;
            }
            // Store unknown properties in misc
            thisObj._misc[key] = pvalue;
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
    
    getMeasurementTables(): DataTable[] {
        return this.measurementTables;
    }

    setMeasurementTables(measurementTables: DataTable[]): void {
        // if (!Array.isArray(measurementTables)) {
        //     throw new Error("Error: measurementTables is not an array");
        // }
        // if (!measurementTables.every(x => x instanceof DataTable)) {
        //     throw new Error(`Error: '${measurementTables}' is not of type DataTable`);
        // }
        this.measurementTables = measurementTables;
    }

    addMeasurementTable(measurementTables: DataTable): void {
        // if (!(measurementTables instanceof DataTable)) {
        //     throw new Error(`Error: '${measurementTables}' is not of type DataTable`);
        // }
        this.measurementTables.push(measurementTables);
    }
    getModeledBy(): Model[] {
        return this.modeledBy;
    }

    setModeledBy(modeledBy: Model[]): void {
        // if (!Array.isArray(modeledBy)) {
        //     throw new Error("Error: modeledBy is not an array");
        // }
        // if (!modeledBy.every(x => x instanceof Model)) {
        //     throw new Error(`Error: '${modeledBy}' is not of type Model`);
        // }
        this.modeledBy = modeledBy;
    }

    addModeledBy(modeledBy: Model): void {
        // if (!(modeledBy instanceof Model)) {
        //     throw new Error(`Error: '${modeledBy}' is not of type Model`);
        // }
        this.modeledBy.push(modeledBy);
    }
}


// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";
import { DataTable } from "./datatable";



export class Model {

    public code: string | null;
    public distributionTables: DataTable[];
    public ensembleTables: DataTable[];
    public summaryTables: DataTable[];
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.code = null;
        this.distributionTables = [];
        this.ensembleTables = [];
        this.summaryTables = [];
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "https://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#Model";
        this._id = this._ns + "/" + uniqid("Model");
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
    
    public static fromDictionary(data: Record<string, any>): Model {
        const thisObj = new Model();
        Object.assign(thisObj, data);
        return thisObj;
    }
    public static fromData(id: string, data: Record<string, any>): Model {
        const thisObj = new Model();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
            }
            
            else if (key === "hasCode") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.code = obj;
                }
            }
            
            else if (key === "hasDistributionTable") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = DataTable.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.distributionTables.push(obj);
                }
            }
            
            else if (key === "hasEnsembleTable") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = DataTable.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.ensembleTables.push(obj);
                }
            }
            
            else if (key === "hasSummaryTable") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = DataTable.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.summaryTables.push(obj);
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
        if (this.code !== null) {
            const valueObj = this.code;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasCode"] = [obj];
        }
        if (this.distributionTables.length > 0) {
            data[this._id]["hasDistributionTable"] = [];
            for (const valueObj of this.distributionTables) {
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
                data[this._id]["hasDistributionTable"].push(obj);
            }
        }
        if (this.ensembleTables.length > 0) {
            data[this._id]["hasEnsembleTable"] = [];
            for (const valueObj of this.ensembleTables) {
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
                data[this._id]["hasEnsembleTable"].push(obj);
            }
        }
        if (this.summaryTables.length > 0) {
            data[this._id]["hasSummaryTable"] = [];
            for (const valueObj of this.summaryTables) {
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
                data[this._id]["hasSummaryTable"].push(obj);
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
        if (this.code !== null) {
            const valueObj = this.code;
                const obj = valueObj
            data["method"] = obj;
        }
        if (this.distributionTables.length > 0) {
            data["distributionTable"] = [];
            for (const valueObj of this.distributionTables) {
                const obj = valueObj.toJson()
                data["distributionTable"].push(obj);
            }
        }
        if (this.ensembleTables.length > 0) {
            data["ensembleTable"] = [];
            for (const valueObj of this.ensembleTables) {
                const obj = valueObj.toJson()
                data["ensembleTable"].push(obj);
            }
        }
        if (this.summaryTables.length > 0) {
            data["summaryTable"] = [];
            for (const valueObj of this.summaryTables) {
                const obj = valueObj.toJson()
                data["summaryTable"].push(obj);
            }
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): Model {
        const thisObj = new Model();
        for (const [key, pvalue] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = pvalue as string;
                continue;
            }
            if (key === "distributionTable") {
                let obj: any = null;
                for (const value of pvalue as any[]) {
                    obj = DataTable.fromJson(value)
                    thisObj.distributionTables.push(obj);
                }
                continue;
            }
            if (key === "ensembleTable") {
                let obj: any = null;
                for (const value of pvalue as any[]) {
                    obj = DataTable.fromJson(value)
                    thisObj.ensembleTables.push(obj);
                }
                continue;
            }
            if (key === "method") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.code = obj;
                continue;
            }
            if (key === "summaryTable") {
                let obj: any = null;
                for (const value of pvalue as any[]) {
                    obj = DataTable.fromJson(value)
                    thisObj.summaryTables.push(obj);
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
    
    getCode(): string | null {
        return this.code;
    }

    setCode(code: string): void {
        // if (!(code instanceof string)) {
        //     throw new Error(`Error: '${code}' is not of type string`);
        // }
        this.code = code;
    }
    getDistributionTables(): DataTable[] {
        return this.distributionTables;
    }

    setDistributionTables(distributionTables: DataTable[]): void {
        // if (!Array.isArray(distributionTables)) {
        //     throw new Error("Error: distributionTables is not an array");
        // }
        // if (!distributionTables.every(x => x instanceof DataTable)) {
        //     throw new Error(`Error: '${distributionTables}' is not of type DataTable`);
        // }
        this.distributionTables = distributionTables;
    }

    addDistributionTable(distributionTables: DataTable): void {
        // if (!(distributionTables instanceof DataTable)) {
        //     throw new Error(`Error: '${distributionTables}' is not of type DataTable`);
        // }
        this.distributionTables.push(distributionTables);
    }
    getEnsembleTables(): DataTable[] {
        return this.ensembleTables;
    }

    setEnsembleTables(ensembleTables: DataTable[]): void {
        // if (!Array.isArray(ensembleTables)) {
        //     throw new Error("Error: ensembleTables is not an array");
        // }
        // if (!ensembleTables.every(x => x instanceof DataTable)) {
        //     throw new Error(`Error: '${ensembleTables}' is not of type DataTable`);
        // }
        this.ensembleTables = ensembleTables;
    }

    addEnsembleTable(ensembleTables: DataTable): void {
        // if (!(ensembleTables instanceof DataTable)) {
        //     throw new Error(`Error: '${ensembleTables}' is not of type DataTable`);
        // }
        this.ensembleTables.push(ensembleTables);
    }
    getSummaryTables(): DataTable[] {
        return this.summaryTables;
    }

    setSummaryTables(summaryTables: DataTable[]): void {
        // if (!Array.isArray(summaryTables)) {
        //     throw new Error("Error: summaryTables is not an array");
        // }
        // if (!summaryTables.every(x => x instanceof DataTable)) {
        //     throw new Error(`Error: '${summaryTables}' is not of type DataTable`);
        // }
        this.summaryTables = summaryTables;
    }

    addSummaryTable(summaryTables: DataTable): void {
        // if (!(summaryTables instanceof DataTable)) {
        //     throw new Error(`Error: '${summaryTables}' is not of type DataTable`);
        // }
        this.summaryTables.push(summaryTables);
    }
}

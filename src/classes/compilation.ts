
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";



export class Compilation {

    public name: string | null;
    public versions: string[];
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.name = null;
        this.versions = [];
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#Compilation";
        this._id = this._ns + "/" + uniqid("Compilation");
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
    
    public static fromDictionary(data: Record<string, any>): Compilation {
        const thisObj = new Compilation();
        thisObj._id = data._id;
        thisObj._type = data._type;
        thisObj._misc = data._misc;
        thisObj._ontns = data._ontns;
        thisObj._ns = data._ns;
        if (data.name !== null) {
            thisObj.name = data.name;
        }
        thisObj.versions = [];
        for (const value of (data.versions || []) as any[]) {
            thisObj.versions.push(value);
        }
        return thisObj;
    }

    public static fromData(id: string, data: Record<string, any>): Compilation {
        const thisObj = new Compilation();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
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
            
            else if (key === "hasVersion") {
                thisObj.versions = [];
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.versions.push(obj);
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
        if (this.name !== null) {
            const valueObj = this.name;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasName"] = [obj];
        }
        if (this.versions.length > 0) {
            data[this._id]["hasVersion"] = [];
            for (const valueObj of this.versions) {
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
                data[this._id]["hasVersion"].push(obj);
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
        if (this.name !== null) {
            const valueObj = this.name;
                const obj = valueObj
            data["compilationName"] = obj;
        }
        if (this.versions.length > 0) {
            data["compilationVersion"] = [];
            for (const valueObj of this.versions) {
                const obj = valueObj
                data["compilationVersion"].push(obj);
            }
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): Compilation {
        const thisObj = new Compilation();
        for (const [key, pvalue] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = pvalue as string;
                continue;
            }
            if (key === "compilationName") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.name = obj;
                continue;
            }
            if (key === "compilationVersion") {
                let obj: any = null;
                thisObj.versions = [];
                for (const value of pvalue as any[]) {
                    obj = value
                    thisObj.versions.push(obj);
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
    
    getName(): string | null {
        return this.name;
    }

    setName(name: string): void {
        // if (!(name instanceof string)) {
        //     throw new Error(`Error: '${name}' is not of type string`);
        // }
        this.name = name;
    }
    getVersions(): string[] {
        return this.versions;
    }

    setVersions(versions: string[]): void {
        // if (!Array.isArray(versions)) {
        //     throw new Error("Error: versions is not an array");
        // }
        // if (!versions.every(x => x instanceof string)) {
        //     throw new Error(`Error: '${versions}' is not of type string`);
        // }
        this.versions = versions;
    }

    addVersion(versions: string): void {
        // if (!(versions instanceof string)) {
        //     throw new Error(`Error: '${versions}' is not of type string`);
        // }
        this.versions.push(versions);
    }
}

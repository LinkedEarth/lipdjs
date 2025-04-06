
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";



export class PhysicalSample {

    protected housedAt: string | null;
    protected iGSN: string | null;
    protected name: string | null;
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.housedAt = null;
        this.iGSN = null;
        this.name = null;
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "https://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#PhysicalSample";
        this._id = this._ns + "/" + uniqid("PhysicalSample");
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
    
    public static fromData(id: string, data: Record<string, any>): PhysicalSample {
        const thisObj = new PhysicalSample();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
            }
            
            else if (key === "hasIGSN") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.iGSN = obj;
                }
            }
            
            else if (key === "housedAt") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.housedAt = obj;
                }
            }
            
            else if (key === "name") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.name = obj;
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
        if (this.housedAt !== null) {
            const valueObj = this.housedAt;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["housedAt"] = [obj];
        }
        if (this.iGSN !== null) {
            const valueObj = this.iGSN;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasIGSN"] = [obj];
        }
        if (this.name !== null) {
            const valueObj = this.name;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["name"] = [obj];
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
        if (this.housedAt !== null) {
            const valueObj = this.housedAt;
                const obj = valueObj
            data["housedat"] = obj;
        }
        if (this.iGSN !== null) {
            const valueObj = this.iGSN;
                const obj = valueObj
            data["hasidentifier"] = obj;
        }
        if (this.name !== null) {
            const valueObj = this.name;
                const obj = valueObj
            data["hasname"] = obj;
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): PhysicalSample {
        const thisObj = new PhysicalSample();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = value as string;
                continue;
            }
            if (key === "hasidentifier") {
                let obj: any = null;
                    obj = value
                thisObj.iGSN = obj;
                continue;
            }
            if (key === "hasname") {
                let obj: any = null;
                    obj = value
                thisObj.name = obj;
                continue;
            }
            if (key === "housedat") {
                let obj: any = null;
                    obj = value
                thisObj.housedAt = obj;
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
    
    getHousedAt(): string | null {
        return this.housedAt;
    }

    setHousedAt(housedAt: string): void {
        // if (!(housedAt instanceof string)) {
        //     throw new Error(`Error: '${housedAt}' is not of type string`);
        // }
        this.housedAt = housedAt;
    }
    getIGSN(): string | null {
        return this.iGSN;
    }

    setIGSN(iGSN: string): void {
        // if (!(iGSN instanceof string)) {
        //     throw new Error(`Error: '${iGSN}' is not of type string`);
        // }
        this.iGSN = iGSN;
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
}

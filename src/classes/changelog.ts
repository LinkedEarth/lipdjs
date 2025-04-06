
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";



export class ChangeLog {

    protected changes: null | null;
    protected notes: string | null;
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.changes = null;
        this.notes = null;
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "https://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#ChangeLog";
        this._id = this._ns + "/" + uniqid("ChangeLog");
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
    
    public static fromData(id: string, data: Record<string, any>): ChangeLog {
        const thisObj = new ChangeLog();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
            }
            
            else if (key === "hasChanges") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = val["@id"];
                    thisObj.changes = obj;
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
        if (this.changes !== null) {
            const valueObj = this.changes;
            const obj = {
                "@id": valueObj,
                "@type": "uri"
            }
            data[this._id]["hasChanges"] = [obj];
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
        if (this.changes !== null) {
            const valueObj = this.changes;
                const obj = valueObj
            data["changes"] = obj;
        }
        if (this.notes !== null) {
            const valueObj = this.notes;
                const obj = valueObj
            data["notes"] = obj;
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): ChangeLog {
        const thisObj = new ChangeLog();
        for (const [key, pvalue] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = pvalue as string;
                continue;
            }
            if (key === "changes") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.changes = obj;
                continue;
            }
            if (key === "notes") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.notes = obj;
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
    
    getChanges(): null | null {
        return this.changes;
    }

    setChanges(changes: null): void {
        // if (!(changes instanceof null)) {
        //     throw new Error(`Error: '${changes}' is not of type null`);
        // }
        this.changes = changes;
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
}

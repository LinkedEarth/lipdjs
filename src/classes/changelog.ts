
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";
import { Change } from "./change";



export class ChangeLog {

    public changes: Change[];
    public curator: string | null;
    public lastVersion: string | null;
    public notes: string | null;
    public timestamp: string | null;
    public version: string | null;
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.changes = [];
        this.curator = null;
        this.lastVersion = null;
        this.notes = null;
        this.timestamp = null;
        this.version = null;
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/lipd";
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
    
    public static fromDictionary(data: Record<string, any>): ChangeLog {
        const thisObj = new ChangeLog();
        thisObj._id = data._id;
        thisObj._type = data._type;
        thisObj._misc = data._misc;
        thisObj._ontns = data._ontns;
        thisObj._ns = data._ns;
        if (data.curator !== null) {
            thisObj.curator = data.curator;
        }
        if (data.lastVersion !== null) {
            thisObj.lastVersion = data.lastVersion;
        }
        if (data.notes !== null) {
            thisObj.notes = data.notes;
        }
        if (data.timestamp !== null) {
            thisObj.timestamp = data.timestamp;
        }
        if (data.version !== null) {
            thisObj.version = data.version;
        }
        thisObj.changes = [];
        for (const value of (data.changes || []) as any[]) {
            thisObj.changes.push(Change.fromDictionary(value));
        }
        return thisObj;
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
                thisObj.changes = [];
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Change.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.changes.push(obj);
                }
            }
            
            else if (key === "hasCurator") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.curator = obj;
                }
            }
            
            else if (key === "hasLastVersion") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.lastVersion = obj;
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
            
            else if (key === "hasTimestamp") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.timestamp = obj;
                }
            }
            
            else if (key === "hasVersion") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.version = obj;
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
        if (this.changes.length > 0) {
            data[this._id]["hasChanges"] = [];
            for (const valueObj of this.changes) {
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
                data[this._id]["hasChanges"].push(obj);
            }
        }
        if (this.curator !== null) {
            const valueObj = this.curator;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasCurator"] = [obj];
        }
        if (this.lastVersion !== null) {
            const valueObj = this.lastVersion;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasLastVersion"] = [obj];
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
        if (this.timestamp !== null) {
            const valueObj = this.timestamp;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasTimestamp"] = [obj];
        }
        if (this.version !== null) {
            const valueObj = this.version;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasVersion"] = [obj];
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
        if (this.changes.length > 0) {
            data["changes"] = [];
            for (const valueObj of this.changes) {
                const obj = valueObj.toJson()
                data["changes"].push(obj);
            }
        }
        if (this.curator !== null) {
            const valueObj = this.curator;
                const obj = valueObj
            data["curator"] = obj;
        }
        if (this.lastVersion !== null) {
            const valueObj = this.lastVersion;
                const obj = valueObj
            data["lastVersion"] = obj;
        }
        if (this.notes !== null) {
            const valueObj = this.notes;
                const obj = valueObj
            data["notes"] = obj;
        }
        if (this.timestamp !== null) {
            const valueObj = this.timestamp;
                const obj = valueObj
            data["timestamp"] = obj;
        }
        if (this.version !== null) {
            const valueObj = this.version;
                const obj = valueObj
            data["version"] = obj;
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
                thisObj.changes = [];
                for (const value of pvalue as any[]) {
                    obj = Change.fromJson(value)
                    thisObj.changes.push(obj);
                }
                continue;
            }
            if (key === "curator") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.curator = obj;
                continue;
            }
            if (key === "lastVersion") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.lastVersion = obj;
                continue;
            }
            if (key === "notes") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.notes = obj;
                continue;
            }
            if (key === "timestamp") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.timestamp = obj;
                continue;
            }
            if (key === "version") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.version = obj;
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
    
    getChanges(): Change[] {
        return this.changes;
    }

    setChanges(changes: Change[]): void {
        // if (!Array.isArray(changes)) {
        //     throw new Error("Error: changes is not an array");
        // }
        // if (!changes.every(x => x instanceof Change)) {
        //     throw new Error(`Error: '${changes}' is not of type Change`);
        // }
        this.changes = changes;
    }

    addChanges(changes: Change): void {
        // if (!(changes instanceof Change)) {
        //     throw new Error(`Error: '${changes}' is not of type Change`);
        // }
        this.changes.push(changes);
    }
    getCurator(): string | null {
        return this.curator;
    }

    setCurator(curator: string): void {
        // if (!(curator instanceof string)) {
        //     throw new Error(`Error: '${curator}' is not of type string`);
        // }
        this.curator = curator;
    }
    getLastVersion(): string | null {
        return this.lastVersion;
    }

    setLastVersion(lastVersion: string): void {
        // if (!(lastVersion instanceof string)) {
        //     throw new Error(`Error: '${lastVersion}' is not of type string`);
        // }
        this.lastVersion = lastVersion;
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
    getTimestamp(): string | null {
        return this.timestamp;
    }

    setTimestamp(timestamp: string): void {
        // if (!(timestamp instanceof string)) {
        //     throw new Error(`Error: '${timestamp}' is not of type string`);
        // }
        this.timestamp = timestamp;
    }
    getVersion(): string | null {
        return this.version;
    }

    setVersion(version: string): void {
        // if (!(version instanceof string)) {
        //     throw new Error(`Error: '${version}' is not of type string`);
        // }
        this.version = version;
    }
}

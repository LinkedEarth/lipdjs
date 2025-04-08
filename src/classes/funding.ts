
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";
import { Person } from "./person";



export class Funding {

    public fundingAgency: string | null;
    public fundingCountry: string | null;
    public grants: string[];
    public investigators: Person[];
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.fundingAgency = null;
        this.fundingCountry = null;
        this.grants = [];
        this.investigators = [];
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "https://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#Funding";
        this._id = this._ns + "/" + uniqid("Funding");
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
    
    public static fromDictionary(data: Record<string, any>): Funding {
        const thisObj = new Funding();
        Object.assign(thisObj, data);
        return thisObj;
    }
    public static fromData(id: string, data: Record<string, any>): Funding {
        const thisObj = new Funding();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
            }
            
            else if (key === "hasFundingAgency") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.fundingAgency = obj;
                }
            }
            
            else if (key === "hasFundingCountry") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.fundingCountry = obj;
                }
            }
            
            else if (key === "hasGrant") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.grants.push(obj);
                }
            }
            
            else if (key === "hasInvestigator") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Person.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.investigators.push(obj);
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
        if (this.fundingAgency !== null) {
            const valueObj = this.fundingAgency;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasFundingAgency"] = [obj];
        }
        if (this.fundingCountry !== null) {
            const valueObj = this.fundingCountry;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasFundingCountry"] = [obj];
        }
        if (this.grants.length > 0) {
            data[this._id]["hasGrant"] = [];
            for (const valueObj of this.grants) {
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
                data[this._id]["hasGrant"].push(obj);
            }
        }
        if (this.investigators.length > 0) {
            data[this._id]["hasInvestigator"] = [];
            for (const valueObj of this.investigators) {
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
                data[this._id]["hasInvestigator"].push(obj);
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
        if (this.fundingAgency !== null) {
            const valueObj = this.fundingAgency;
                const obj = valueObj
            data["agency"] = obj;
        }
        if (this.fundingCountry !== null) {
            const valueObj = this.fundingCountry;
                const obj = valueObj
            data["country"] = obj;
        }
        if (this.grants.length > 0) {
            data["grant"] = [];
            for (const valueObj of this.grants) {
                const obj = valueObj
                data["grant"].push(obj);
            }
        }
        if (this.investigators.length > 0) {
            data["investigator"] = [];
            for (const valueObj of this.investigators) {
                const obj = valueObj.toJson()
                data["investigator"].push(obj);
            }
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): Funding {
        const thisObj = new Funding();
        for (const [key, pvalue] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = pvalue as string;
                continue;
            }
            if (key === "agency") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.fundingAgency = obj;
                continue;
            }
            if (key === "country") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.fundingCountry = obj;
                continue;
            }
            if (key === "grant") {
                let obj: any = null;
                for (const value of pvalue as any[]) {
                    obj = value
                    thisObj.grants.push(obj);
                }
                continue;
            }
            if (key === "investigator") {
                let obj: any = null;
                for (const value of pvalue as any[]) {
                    obj = Person.fromJson(value)
                    thisObj.investigators.push(obj);
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
    
    getFundingAgency(): string | null {
        return this.fundingAgency;
    }

    setFundingAgency(fundingAgency: string): void {
        // if (!(fundingAgency instanceof string)) {
        //     throw new Error(`Error: '${fundingAgency}' is not of type string`);
        // }
        this.fundingAgency = fundingAgency;
    }
    getFundingCountry(): string | null {
        return this.fundingCountry;
    }

    setFundingCountry(fundingCountry: string): void {
        // if (!(fundingCountry instanceof string)) {
        //     throw new Error(`Error: '${fundingCountry}' is not of type string`);
        // }
        this.fundingCountry = fundingCountry;
    }
    getGrants(): string[] {
        return this.grants;
    }

    setGrants(grants: string[]): void {
        // if (!Array.isArray(grants)) {
        //     throw new Error("Error: grants is not an array");
        // }
        // if (!grants.every(x => x instanceof string)) {
        //     throw new Error(`Error: '${grants}' is not of type string`);
        // }
        this.grants = grants;
    }

    addGrant(grants: string): void {
        // if (!(grants instanceof string)) {
        //     throw new Error(`Error: '${grants}' is not of type string`);
        // }
        this.grants.push(grants);
    }
    getInvestigators(): Person[] {
        return this.investigators;
    }

    setInvestigators(investigators: Person[]): void {
        // if (!Array.isArray(investigators)) {
        //     throw new Error("Error: investigators is not an array");
        // }
        // if (!investigators.every(x => x instanceof Person)) {
        //     throw new Error(`Error: '${investigators}' is not of type Person`);
        // }
        this.investigators = investigators;
    }

    addInvestigator(investigators: Person): void {
        // if (!(investigators instanceof Person)) {
        //     throw new Error(`Error: '${investigators}' is not of type Person`);
        // }
        this.investigators.push(investigators);
    }
}

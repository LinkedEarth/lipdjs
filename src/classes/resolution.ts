
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";
import { PaleoUnit } from "./paleounit";



export class Resolution {

    protected maxValue: number | null;
    protected meanValue: number | null;
    protected medianValue: number | null;
    protected minValue: number | null;
    protected units: PaleoUnit | null;
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.maxValue = null;
        this.meanValue = null;
        this.medianValue = null;
        this.minValue = null;
        this.units = null;
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "https://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#Resolution";
        this._id = this._ns + "/" + uniqid("Resolution");
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
    
    public static fromData(id: string, data: Record<string, any>): Resolution {
        const thisObj = new Resolution();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
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
            
            else if (key === "hasUnits") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = PaleoUnit.fromSynonym(val["@id"].replace(/^.*?#/, ""));
                    thisObj.units = obj;
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
        if (this.units !== null) {
            const valueObj = this.units;
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
            data[this._id]["hasUnits"] = [obj];
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
        if (this.units !== null) {
            const valueObj = this.units;
                const obj = valueObj.toJson()
            data["units"] = obj;
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): Resolution {
        const thisObj = new Resolution();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = value as string;
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
            if (key === "units") {
                let obj: any = null;
                    obj = PaleoUnit.fromSynonym(value.replace(/^.*?#/, ""))
                thisObj.units = obj;
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
    getUnits(): PaleoUnit | null {
        return this.units;
    }

    setUnits(units: PaleoUnit): void {
        // if (!(units instanceof PaleoUnit)) {
        //     throw new Error(`Error: '${units}' is not of type PaleoUnit\nYou can create a new PaleoUnit object from a string using the following syntax:\n- Fetch existing PaleoUnit by synonym: PaleoUnit.fromSynonym("${units}")\n- Create a new custom PaleoUnit: new PaleoUnit("${units}")`);
        // }
        this.units = units;
    }
}

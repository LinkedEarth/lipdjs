
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";
import { InterpretationSeasonality } from "./interpretationseasonality";
import { InterpretationVariable } from "./interpretationvariable";



export class Interpretation {

    public basis: string | null;
    public direction: string | null;
    public local: string | null;
    public mathematicalRelation: string | null;
    public notes: string | null;
    public rank: string | null;
    public scope: string | null;
    public seasonality: InterpretationSeasonality | null;
    public seasonalityGeneral: InterpretationSeasonality | null;
    public seasonalityOriginal: InterpretationSeasonality | null;
    public variable: InterpretationVariable | null;
    public variableDetail: string | null;
    public variableGeneral: string | null;
    public variableGeneralDirection: string | null;
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.basis = null;
        this.direction = null;
        this.local = null;
        this.mathematicalRelation = null;
        this.notes = null;
        this.rank = null;
        this.scope = null;
        this.seasonality = null;
        this.seasonalityGeneral = null;
        this.seasonalityOriginal = null;
        this.variable = null;
        this.variableDetail = null;
        this.variableGeneral = null;
        this.variableGeneralDirection = null;
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "https://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#Interpretation";
        this._id = this._ns + "/" + uniqid("Interpretation");
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
    
    public static fromDictionary(data: Record<string, any>): Interpretation {
        const thisObj = new Interpretation();
        Object.assign(thisObj, data);
        return thisObj;
    }
    public static fromData(id: string, data: Record<string, any>): Interpretation {
        const thisObj = new Interpretation();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
            }
            
            else if (key === "hasBasis") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.basis = obj;
                }
            }
            
            else if (key === "hasDirection") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.direction = obj;
                }
            }
            
            else if (key === "hasMathematicalRelation") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.mathematicalRelation = obj;
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
            
            else if (key === "hasRank") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.rank = obj;
                }
            }
            
            else if (key === "hasScope") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.scope = obj;
                }
            }
            
            else if (key === "hasSeasonality") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = InterpretationSeasonality.fromSynonym(val["@id"].replace(/^.*?#/, ""));
                    thisObj.seasonality = obj;
                }
            }
            
            else if (key === "hasSeasonalityGeneral") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = InterpretationSeasonality.fromSynonym(val["@id"].replace(/^.*?#/, ""));
                    thisObj.seasonalityGeneral = obj;
                }
            }
            
            else if (key === "hasSeasonalityOriginal") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = InterpretationSeasonality.fromSynonym(val["@id"].replace(/^.*?#/, ""));
                    thisObj.seasonalityOriginal = obj;
                }
            }
            
            else if (key === "hasVariable") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = InterpretationVariable.fromSynonym(val["@id"].replace(/^.*?#/, ""));
                    thisObj.variable = obj;
                }
            }
            
            else if (key === "hasVariableDetail") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.variableDetail = obj;
                }
            }
            
            else if (key === "hasVariableGeneral") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.variableGeneral = obj;
                }
            }
            
            else if (key === "hasVariableGeneralDirection") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.variableGeneralDirection = obj;
                }
            }
            
            else if (key === "isLocal") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.local = obj;
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
        if (this.basis !== null) {
            const valueObj = this.basis;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasBasis"] = [obj];
        }
        if (this.direction !== null) {
            const valueObj = this.direction;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasDirection"] = [obj];
        }
        if (this.local !== null) {
            const valueObj = this.local;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["isLocal"] = [obj];
        }
        if (this.mathematicalRelation !== null) {
            const valueObj = this.mathematicalRelation;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasMathematicalRelation"] = [obj];
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
        if (this.rank !== null) {
            const valueObj = this.rank;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasRank"] = [obj];
        }
        if (this.scope !== null) {
            const valueObj = this.scope;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasScope"] = [obj];
        }
        if (this.seasonality !== null) {
            const valueObj = this.seasonality;
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
            data[this._id]["hasSeasonality"] = [obj];
        }
        if (this.seasonalityGeneral !== null) {
            const valueObj = this.seasonalityGeneral;
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
            data[this._id]["hasSeasonalityGeneral"] = [obj];
        }
        if (this.seasonalityOriginal !== null) {
            const valueObj = this.seasonalityOriginal;
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
            data[this._id]["hasSeasonalityOriginal"] = [obj];
        }
        if (this.variable !== null) {
            const valueObj = this.variable;
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
            data[this._id]["hasVariable"] = [obj];
        }
        if (this.variableDetail !== null) {
            const valueObj = this.variableDetail;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasVariableDetail"] = [obj];
        }
        if (this.variableGeneral !== null) {
            const valueObj = this.variableGeneral;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasVariableGeneral"] = [obj];
        }
        if (this.variableGeneralDirection !== null) {
            const valueObj = this.variableGeneralDirection;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasVariableGeneralDirection"] = [obj];
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
        if (this.basis !== null) {
            const valueObj = this.basis;
                const obj = valueObj
            data["basis"] = obj;
        }
        if (this.direction !== null) {
            const valueObj = this.direction;
                const obj = valueObj
            data["direction"] = obj;
        }
        if (this.local !== null) {
            const valueObj = this.local;
                const obj = valueObj
            data["isLocal"] = obj;
        }
        if (this.mathematicalRelation !== null) {
            const valueObj = this.mathematicalRelation;
                const obj = valueObj
            data["mathematicalRelation"] = obj;
        }
        if (this.notes !== null) {
            const valueObj = this.notes;
                const obj = valueObj
            data["notes"] = obj;
        }
        if (this.rank !== null) {
            const valueObj = this.rank;
                const obj = valueObj
            data["rank"] = obj;
        }
        if (this.scope !== null) {
            const valueObj = this.scope;
                const obj = valueObj
            data["scope"] = obj;
        }
        if (this.seasonality !== null) {
            const valueObj = this.seasonality;
                const obj = valueObj.toJson()
            data["seasonality"] = obj;
        }
        if (this.seasonalityGeneral !== null) {
            const valueObj = this.seasonalityGeneral;
                const obj = valueObj.toJson()
            data["seasonalityGeneral"] = obj;
        }
        if (this.seasonalityOriginal !== null) {
            const valueObj = this.seasonalityOriginal;
                const obj = valueObj.toJson()
            data["seasonalityOriginal"] = obj;
        }
        if (this.variable !== null) {
            const valueObj = this.variable;
                const obj = valueObj.toJson()
            data["variable"] = obj;
        }
        if (this.variableDetail !== null) {
            const valueObj = this.variableDetail;
                const obj = valueObj
            data["variableDetail"] = obj;
        }
        if (this.variableGeneral !== null) {
            const valueObj = this.variableGeneral;
                const obj = valueObj
            data["variableGeneral"] = obj;
        }
        if (this.variableGeneralDirection !== null) {
            const valueObj = this.variableGeneralDirection;
                const obj = valueObj
            data["variableGeneralDirection"] = obj;
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): Interpretation {
        const thisObj = new Interpretation();
        for (const [key, pvalue] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = pvalue as string;
                continue;
            }
            if (key === "basis") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.basis = obj;
                continue;
            }
            if (key === "direction") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.direction = obj;
                continue;
            }
            if (key === "isLocal") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.local = obj;
                continue;
            }
            if (key === "mathematicalRelation") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.mathematicalRelation = obj;
                continue;
            }
            if (key === "notes") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.notes = obj;
                continue;
            }
            if (key === "rank") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.rank = obj;
                continue;
            }
            if (key === "scope") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.scope = obj;
                continue;
            }
            if (key === "seasonality") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = InterpretationSeasonality.fromSynonym(value.replace(/^.*?#/, ""))
                thisObj.seasonality = obj;
                continue;
            }
            if (key === "seasonalityGeneral") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = InterpretationSeasonality.fromSynonym(value.replace(/^.*?#/, ""))
                thisObj.seasonalityGeneral = obj;
                continue;
            }
            if (key === "seasonalityOriginal") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = InterpretationSeasonality.fromSynonym(value.replace(/^.*?#/, ""))
                thisObj.seasonalityOriginal = obj;
                continue;
            }
            if (key === "variable") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = InterpretationVariable.fromSynonym(value.replace(/^.*?#/, ""))
                thisObj.variable = obj;
                continue;
            }
            if (key === "variableDetail") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.variableDetail = obj;
                continue;
            }
            if (key === "variableGeneral") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.variableGeneral = obj;
                continue;
            }
            if (key === "variableGeneralDirection") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.variableGeneralDirection = obj;
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
    
    getBasis(): string | null {
        return this.basis;
    }

    setBasis(basis: string): void {
        // if (!(basis instanceof string)) {
        //     throw new Error(`Error: '${basis}' is not of type string`);
        // }
        this.basis = basis;
    }
    getDirection(): string | null {
        return this.direction;
    }

    setDirection(direction: string): void {
        // if (!(direction instanceof string)) {
        //     throw new Error(`Error: '${direction}' is not of type string`);
        // }
        this.direction = direction;
    }
    getMathematicalRelation(): string | null {
        return this.mathematicalRelation;
    }

    setMathematicalRelation(mathematicalRelation: string): void {
        // if (!(mathematicalRelation instanceof string)) {
        //     throw new Error(`Error: '${mathematicalRelation}' is not of type string`);
        // }
        this.mathematicalRelation = mathematicalRelation;
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
    getRank(): string | null {
        return this.rank;
    }

    setRank(rank: string): void {
        // if (!(rank instanceof string)) {
        //     throw new Error(`Error: '${rank}' is not of type string`);
        // }
        this.rank = rank;
    }
    getScope(): string | null {
        return this.scope;
    }

    setScope(scope: string): void {
        // if (!(scope instanceof string)) {
        //     throw new Error(`Error: '${scope}' is not of type string`);
        // }
        this.scope = scope;
    }
    getSeasonality(): InterpretationSeasonality | null {
        return this.seasonality;
    }

    setSeasonality(seasonality: InterpretationSeasonality): void {
        // if (!(seasonality instanceof InterpretationSeasonality)) {
        //     throw new Error(`Error: '${seasonality}' is not of type InterpretationSeasonality\nYou can create a new InterpretationSeasonality object from a string using the following syntax:\n- Fetch existing InterpretationSeasonality by synonym: InterpretationSeasonality.fromSynonym("${seasonality}")\n- Create a new custom InterpretationSeasonality: new InterpretationSeasonality("${seasonality}")`);
        // }
        this.seasonality = seasonality;
    }
    getSeasonalityGeneral(): InterpretationSeasonality | null {
        return this.seasonalityGeneral;
    }

    setSeasonalityGeneral(seasonalityGeneral: InterpretationSeasonality): void {
        // if (!(seasonalityGeneral instanceof InterpretationSeasonality)) {
        //     throw new Error(`Error: '${seasonalityGeneral}' is not of type InterpretationSeasonality\nYou can create a new InterpretationSeasonality object from a string using the following syntax:\n- Fetch existing InterpretationSeasonality by synonym: InterpretationSeasonality.fromSynonym("${seasonalityGeneral}")\n- Create a new custom InterpretationSeasonality: new InterpretationSeasonality("${seasonalityGeneral}")`);
        // }
        this.seasonalityGeneral = seasonalityGeneral;
    }
    getSeasonalityOriginal(): InterpretationSeasonality | null {
        return this.seasonalityOriginal;
    }

    setSeasonalityOriginal(seasonalityOriginal: InterpretationSeasonality): void {
        // if (!(seasonalityOriginal instanceof InterpretationSeasonality)) {
        //     throw new Error(`Error: '${seasonalityOriginal}' is not of type InterpretationSeasonality\nYou can create a new InterpretationSeasonality object from a string using the following syntax:\n- Fetch existing InterpretationSeasonality by synonym: InterpretationSeasonality.fromSynonym("${seasonalityOriginal}")\n- Create a new custom InterpretationSeasonality: new InterpretationSeasonality("${seasonalityOriginal}")`);
        // }
        this.seasonalityOriginal = seasonalityOriginal;
    }
    getVariable(): InterpretationVariable | null {
        return this.variable;
    }

    setVariable(variable: InterpretationVariable): void {
        // if (!(variable instanceof InterpretationVariable)) {
        //     throw new Error(`Error: '${variable}' is not of type InterpretationVariable\nYou can create a new InterpretationVariable object from a string using the following syntax:\n- Fetch existing InterpretationVariable by synonym: InterpretationVariable.fromSynonym("${variable}")\n- Create a new custom InterpretationVariable: new InterpretationVariable("${variable}")`);
        // }
        this.variable = variable;
    }
    getVariableDetail(): string | null {
        return this.variableDetail;
    }

    setVariableDetail(variableDetail: string): void {
        // if (!(variableDetail instanceof string)) {
        //     throw new Error(`Error: '${variableDetail}' is not of type string`);
        // }
        this.variableDetail = variableDetail;
    }
    getVariableGeneral(): string | null {
        return this.variableGeneral;
    }

    setVariableGeneral(variableGeneral: string): void {
        // if (!(variableGeneral instanceof string)) {
        //     throw new Error(`Error: '${variableGeneral}' is not of type string`);
        // }
        this.variableGeneral = variableGeneral;
    }
    getVariableGeneralDirection(): string | null {
        return this.variableGeneralDirection;
    }

    setVariableGeneralDirection(variableGeneralDirection: string): void {
        // if (!(variableGeneralDirection instanceof string)) {
        //     throw new Error(`Error: '${variableGeneralDirection}' is not of type string`);
        // }
        this.variableGeneralDirection = variableGeneralDirection;
    }
    isLocal(): string | null {
        return this.local;
    }

    setLocal(local: string): void {
        // if (!(local instanceof string)) {
        //     throw new Error(`Error: '${local}' is not of type string`);
        // }
        this.local = local;
    }
}

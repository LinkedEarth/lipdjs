
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";
import { Variable } from "./variable";


interface VariableMetadata {
    hasValues?: boolean;
    [key: string]: any;
}

type DataFrameData = {
    [K in string]: any[];
};

interface DataFrame {
    data: DataFrameData;
    metadata: Record<string, VariableMetadata>;
}


export class DataTable {

    protected fileName: string | null;
    protected missingValue: string | null;
    protected variables: Variable[];
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.fileName = null;
        this.missingValue = null;
        this.variables = [];
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "https://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#DataTable";
        this._id = this._ns + "/" + uniqid("DataTable");
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
    
    public static fromData(id: string, data: Record<string, any>): DataTable {
        const thisObj = new DataTable();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
            }
            
            else if (key === "hasFileName") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.fileName = obj;
                }
            }
            
            else if (key === "hasMissingValue") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.missingValue = obj;
                }
            }
            
            else if (key === "hasVariable") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Variable.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.variables.push(obj);
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
        if (this.fileName !== null) {
            const valueObj = this.fileName;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasFileName"] = [obj];
        }
        if (this.missingValue !== null) {
            const valueObj = this.missingValue;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasMissingValue"] = [obj];
        }
        if (this.variables.length > 0) {
            data[this._id]["hasVariable"] = [];
            for (const valueObj of this.variables) {
            const obj = typeof valueObj === "string" ? {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            } : {
                "@id": valueObj.getId(),
                "@type": "uri"
            }
                data[this._id]["hasVariable"].push(obj);
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
        if (this.fileName !== null) {
            const valueObj = this.fileName;
                const obj = valueObj
            data["filename"] = obj;
        }
        if (this.missingValue !== null) {
            const valueObj = this.missingValue;
                const obj = valueObj
            data["missingValue"] = obj;
        }
        if (this.variables.length > 0) {
            data["columns"] = [];
            for (const valueObj of this.variables) {
                const obj = valueObj.toJson()
                data["columns"].push(obj);
            }
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): DataTable {
        const thisObj = new DataTable();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = value as string;
                continue;
            }
            if (key === "columns") {
                let obj: any = null;
                if (Array.isArray(value)) {
                    obj = Variable.fromJson(value)
                    thisObj.variables.push(obj);
                }
                continue;
            }
            if (key === "filename") {
                let obj: any = null;
                    obj = value
                thisObj.fileName = obj;
                continue;
            }
            if (key === "missingValue") {
                let obj: any = null;
                    obj = value
                thisObj.missingValue = obj;
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
    
    getFileName(): string | null {
        return this.fileName;
    }

    setFileName(fileName: string): void {
        // if (!(fileName instanceof string)) {
        //     throw new Error(`Error: '${fileName}' is not of type string`);
        // }
        this.fileName = fileName;
    }
    getMissingValue(): string | null {
        return this.missingValue;
    }

    setMissingValue(missingValue: string): void {
        // if (!(missingValue instanceof string)) {
        //     throw new Error(`Error: '${missingValue}' is not of type string`);
        // }
        this.missingValue = missingValue;
    }
    getVariables(): Variable[] {
        return this.variables;
    }

    setVariables(variables: Variable[]): void {
        // if (!Array.isArray(variables)) {
        //     throw new Error("Error: variables is not an array");
        // }
        // if (!variables.every(x => x instanceof Variable)) {
        //     throw new Error(`Error: '${variables}' is not of type Variable`);
        // }
        this.variables = variables;
    }

    addVariable(variables: Variable): void {
        // if (!(variables instanceof Variable)) {
        //     throw new Error(`Error: '${variables}' is not of type Variable`);
        // }
        this.variables.push(variables);
    }
    /**
     * Get data as a DataFrame-like structure
     * @param useStandardNames Whether to use standard variable names instead of custom names
     * @returns Object containing data and metadata
    */
    public getDataFrame(useStandardNames: boolean = false): DataFrame {
        const result: DataFrame = {
            data: {},
            metadata: {}
        };
        
        for (const v of this.variables) {
            const name = v.getName();
            if (!name) continue;
            
            let colname = name;
            const standardVar = v.getStandardVariable();
            if (useStandardNames && standardVar !== null) {
                const label = standardVar.getLabel();
                if (label) colname = label;
            }
            
            // Get values
            const values = v.getValues();
            if (values) {
                result.data[colname] = parseVariableValues(values);
            }
            
            // Get metadata
            const varMetadata = v.toJson() as VariableMetadata;
            if (varMetadata) {
                // delete varMetadata.hasValues;
                result.metadata[colname] = varMetadata;
                delete result.metadata[colname].hasValues;
                delete result.metadata[colname].values;
            }
        }
        
        return result;
    }

    /**
     * Set data from a DataFrame-like structure
     * @param data Object containing data and metadata
     */
    public setDataFrame(data: DataFrame): void {
        // Create new set of variable objects using the metadata
        this.variables = [];
        
        for (const [colname, values] of Object.entries(data.data)) {
            const metadata = data.metadata[colname];
            if (!metadata) continue;
            
            const v = Variable.fromJson(metadata);
            if (v) {
                v.setValues(JSON.stringify(values));
                this.addVariable(v);
            }
        }
    }

}

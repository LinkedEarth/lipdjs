
// Auto-generated. Do not edit.
import { parseVariableValues } from "../utils/utils";
import { Variable } from "./variable";


interface VariableMetadata {
    [key: string]: any;
}

type DataFrameData = {
    [K in string]: any[];
};

interface DataFrame {
    data: DataFrameData;
    metadata: Record<string, VariableMetadata>;
}


type DataTableProperty = Variable | boolean | null | number | string;

export class DataTable {
    [key: string]: DataTableProperty | DataTableProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private fileName: string | null = null;
    private variables: Variable[] = [];
    private missingValue: string | null = null;

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getFileName(): string | null {
        return this.fileName;
    }

    public setFileName(value: string | null): void {
        this.fileName = value;
    }

    public getVariables(): Variable[] {
        return this.variables;
    }

    public setVariables(value: Variable[]): void {
        this.variables = value;
    }

    public addVariable(value: Variable): void {
        this.variables.push(value);
    }

    public getMissingValue(): string | null {
        return this.missingValue;
    }

    public setMissingValue(value: string | null): void {
        this.missingValue = value;
    }

    public toJson(): Record<string, unknown> {
        const data: Record<string, unknown> = {
            "@id": this._id
        };

        if (this.fileName !== null) {
            data["filename"] = this.fileName;
        }

        if (this.variables.length > 0) {
            data["columns"] = this.variables.map(value => value.toJson());
        }

        if (this.missingValue !== null) {
            data["missingValue"] = this.missingValue;
        }

        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, unknown>): DataTable {
        const obj = new DataTable();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "filename") {
                obj.fileName = value ? value as string : null;
                continue;
            }

            if (key === "columns") {
                obj.variables = Array.isArray(value) ? value.map(item => Variable.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "missingValue") {
                obj.missingValue = value ? value as string : null;
                continue;
            }

            // Store unknown properties in misc
            obj._misc[key] = value;
        }
        return obj;
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

import { Variable } from '../variable';
import { parseVariableValues } from "../../utils/utils";

// START TYPES
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

interface DataList {
    data: any[];
    metadata: VariableMetadata[];
}
// END TYPES

export class DataTable {
    private variables: Variable[] = [];

    // START TEMPLATE FUNCTION
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
    // END TEMPLATE FUNCTION

    // START TEMPLATE FUNCTION
    public getDataList(): DataList {
        const result: DataList = {
            data: [],
            metadata: []
        };
        
        for (const v of this.variables) {
            // Get values
            const values = v.getValues();
            if (values) {
                result.data.push(parseVariableValues(values));
            }
            
            // Get metadata
            const varMetadata = v.toJson() as VariableMetadata;
            if (varMetadata) {
                // delete varMetadata.hasValues;
                delete varMetadata.hasValues;
                delete varMetadata.values;
                result.metadata.push(varMetadata);
            }
        }
        return result;
    }    
    // END TEMPLATE FUNCTION

    // START TEMPLATE FUNCTION
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
    // END TEMPLATE FUNCTION

        // START TEMPLATE FUNCTION
    /**
     * Set data from a DataFrame-like structure
     * @param data Object containing data and metadata
     */
    public setDataList(data: DataList): void {
        // Create new set of variable objects using the metadata
        this.variables = [];

        // Transpose the data which is currently a list of rows with each row being a list of values
        // into a list of columns with each column being a list of values
        const transposedData: any[][] = [];
        
        // Initialize transposed data structure
        for (let i = 0; i < data.metadata.length; i++) {
            transposedData[i] = [];
        }
        
        // Transpose rows to columns
        for (let rowIndex = 0; rowIndex < data.data.length; rowIndex++) {
            const row = data.data[rowIndex];
            for (let colIndex = 0; colIndex < row.length; colIndex++) {
                if (colIndex < transposedData.length) {
                    transposedData[colIndex].push(row[colIndex]);
                }
            }
        }
        
        // Create variables from metadata and transposed data
        for (let i = 0; i < data.metadata.length; i++) {
            const values = transposedData[i];
            const metadata = data.metadata[i];
            if (!metadata) continue;
            
            const v = Variable.fromJson(metadata);
            if (v) {
                console.log(values);
                v.setValues(JSON.stringify(values));
                this.addVariable(v);
            }
        }
    }
    // END TEMPLATE FUNCTION

    private addVariable(variable: Variable): void {
        this.variables.push(variable);
    }
}
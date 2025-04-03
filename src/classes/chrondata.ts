
// Auto-generated. Do not edit.
import { Model } from "./model";
import { DataTable } from "./datatable";


type ChronDataProperty = DataTable | Model | boolean | null | number | string;

export class ChronData {
    [key: string]: ChronDataProperty | ChronDataProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private measurementTables: DataTable[] = [];
    private modeledBy: Model[] = [];

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getMeasurementTables(): DataTable[] {
        return this.measurementTables;
    }

    public setMeasurementTables(value: DataTable[]): void {
        this.measurementTables = value;
    }

    public addMeasurementTable(value: DataTable): void {
        this.measurementTables.push(value);
    }

    public getModeledBy(): Model[] {
        return this.modeledBy;
    }

    public setModeledBy(value: Model[]): void {
        this.modeledBy = value;
    }

    public addModeledB(value: Model): void {
        this.modeledBy.push(value);
    }

    public toJson(): Record<string, unknown> {
        const data: Record<string, unknown> = {
            "@id": this._id
        };

        if (this.measurementTables.length > 0) {
            data["measurementTable"] = this.measurementTables.map(value => value.toJson());
        }

        if (this.modeledBy.length > 0) {
            data["model"] = this.modeledBy.map(value => value.toJson());
        }

        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, unknown>): ChronData {
        const obj = new ChronData();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "measurementTable") {
                obj.measurementTables = Array.isArray(value) ? value.map(item => DataTable.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "model") {
                obj.modeledBy = Array.isArray(value) ? value.map(item => Model.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            // Store unknown properties in misc
            obj._misc[key] = value;
        }
        return obj;
    }
}

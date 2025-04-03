
// Auto-generated. Do not edit.
import { DataTable } from "./datatable";


type ModelProperty = DataTable | boolean | null | number | string;

export class Model {
    [key: string]: ModelProperty | ModelProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private code: string | null = null;
    private summaryTables: DataTable[] = [];
    private ensembleTables: DataTable[] = [];
    private distributionTables: DataTable[] = [];

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getCode(): string | null {
        return this.code;
    }

    public setCode(value: string | null): void {
        this.code = value;
    }

    public getSummaryTables(): DataTable[] {
        return this.summaryTables;
    }

    public setSummaryTables(value: DataTable[]): void {
        this.summaryTables = value;
    }

    public addSummaryTable(value: DataTable): void {
        this.summaryTables.push(value);
    }

    public getEnsembleTables(): DataTable[] {
        return this.ensembleTables;
    }

    public setEnsembleTables(value: DataTable[]): void {
        this.ensembleTables = value;
    }

    public addEnsembleTable(value: DataTable): void {
        this.ensembleTables.push(value);
    }

    public getDistributionTables(): DataTable[] {
        return this.distributionTables;
    }

    public setDistributionTables(value: DataTable[]): void {
        this.distributionTables = value;
    }

    public addDistributionTable(value: DataTable): void {
        this.distributionTables.push(value);
    }

    public toJson(): Record<string, unknown> {
        const data: Record<string, unknown> = {
            "@id": this._id
        };

        if (this.code !== null) {
            data["method"] = this.code;
        }

        if (this.summaryTables.length > 0) {
            data["summaryTable"] = this.summaryTables.map(value => value.toJson());
        }

        if (this.ensembleTables.length > 0) {
            data["ensembleTable"] = this.ensembleTables.map(value => value.toJson());
        }

        if (this.distributionTables.length > 0) {
            data["distributionTable"] = this.distributionTables.map(value => value.toJson());
        }

        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, unknown>): Model {
        const obj = new Model();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "method") {
                obj.code = value ? value as string : null;
                continue;
            }

            if (key === "summaryTable") {
                obj.summaryTables = Array.isArray(value) ? value.map(item => DataTable.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "ensembleTable") {
                obj.ensembleTables = Array.isArray(value) ? value.map(item => DataTable.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "distributionTable") {
                obj.distributionTables = Array.isArray(value) ? value.map(item => DataTable.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            // Store unknown properties in misc
            obj._misc[key] = value;
        }
        return obj;
    }
}

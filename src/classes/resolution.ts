
// Auto-generated. Do not edit.
import { PaleoUnit } from "./paleounit";


type ResolutionProperty = PaleoUnit | boolean | null | number | string;

export class Resolution {
    [key: string]: ResolutionProperty | ResolutionProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private maxValue: string | null = null;
    private minValue: string | null = null;
    private meanValue: string | null = null;
    private medianValue: string | null = null;
    private units: PaleoUnit | null = null;

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getMaxValue(): string | null {
        return this.maxValue;
    }

    public setMaxValue(value: string | null): void {
        this.maxValue = value;
    }

    public getMinValue(): string | null {
        return this.minValue;
    }

    public setMinValue(value: string | null): void {
        this.minValue = value;
    }

    public getMeanValue(): string | null {
        return this.meanValue;
    }

    public setMeanValue(value: string | null): void {
        this.meanValue = value;
    }

    public getMedianValue(): string | null {
        return this.medianValue;
    }

    public setMedianValue(value: string | null): void {
        this.medianValue = value;
    }

    public getUnits(): PaleoUnit | null {
        return this.units;
    }

    public setUnits(value: PaleoUnit | null): void {
        this.units = value;
    }

    public toJson(): Record<string, unknown> {
        const data: Record<string, unknown> = {
            "@id": this._id
        };

        if (this.maxValue !== null) {
            data["hasMaxValue"] = this.maxValue;
        }

        if (this.minValue !== null) {
            data["hasMinValue"] = this.minValue;
        }

        if (this.meanValue !== null) {
            data["hasMeanValue"] = this.meanValue;
        }

        if (this.medianValue !== null) {
            data["hasMedianValue"] = this.medianValue;
        }

        if (this.units !== null) {
            data["units"] = this.units.toJson();
        }

        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, unknown>): Resolution {
        const obj = new Resolution();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "hasMaxValue") {
                obj.maxValue = value ? value as string : null;
                continue;
            }

            if (key === "hasMinValue") {
                obj.minValue = value ? value as string : null;
                continue;
            }

            if (key === "hasMeanValue") {
                obj.meanValue = value ? value as string : null;
                continue;
            }

            if (key === "hasMedianValue") {
                obj.medianValue = value ? value as string : null;
                continue;
            }

            if (key === "units") {
                obj.units = value ? PaleoUnit.fromSynonym(value as string) : null;
                continue;
            }

            // Store unknown properties in misc
            obj._misc[key] = value;
        }
        return obj;
    }
}

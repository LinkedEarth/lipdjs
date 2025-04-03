
// Auto-generated. Do not edit.


type PhysicalSampleProperty = boolean | null | number | string;

export class PhysicalSample {
    [key: string]: PhysicalSampleProperty | PhysicalSampleProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private iGSN: string | null = null;
    private name: string | null = null;
    private housedAt: string | null = null;

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getIGSN(): string | null {
        return this.iGSN;
    }

    public setIGSN(value: string | null): void {
        this.iGSN = value;
    }

    public getName(): string | null {
        return this.name;
    }

    public setName(value: string | null): void {
        this.name = value;
    }

    public getHousedAt(): string | null {
        return this.housedAt;
    }

    public setHousedAt(value: string | null): void {
        this.housedAt = value;
    }

    public toJson(): Record<string, unknown> {
        const data: Record<string, unknown> = {
            "@id": this._id
        };

        if (this.iGSN !== null) {
            data["hasidentifier"] = this.iGSN;
        }

        if (this.name !== null) {
            data["hasname"] = this.name;
        }

        if (this.housedAt !== null) {
            data["housedat"] = this.housedAt;
        }

        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, unknown>): PhysicalSample {
        const obj = new PhysicalSample();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "hasidentifier") {
                obj.iGSN = value ? value as string : null;
                continue;
            }

            if (key === "hasname") {
                obj.name = value ? value as string : null;
                continue;
            }

            if (key === "housedat") {
                obj.housedAt = value ? value as string : null;
                continue;
            }

            // Store unknown properties in misc
            obj._misc[key] = value;
        }
        return obj;
    }
}

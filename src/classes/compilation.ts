
// Auto-generated. Do not edit.


type CompilationProperty = boolean | null | number | string;

export class Compilation {
    [key: string]: CompilationProperty | CompilationProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private name: string | null = null;
    private version: string | null = null;

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getName(): string | null {
        return this.name;
    }

    public setName(value: string | null): void {
        this.name = value;
    }

    public getVersion(): string | null {
        return this.version;
    }

    public setVersion(value: string | null): void {
        this.version = value;
    }

    public toJson(): Record<string, unknown> {
        const data: Record<string, unknown> = {
            "@id": this._id
        };

        if (this.name !== null) {
            data["compilationName"] = this.name;
        }

        if (this.version !== null) {
            data["compilationVersion"] = this.version;
        }

        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, unknown>): Compilation {
        const obj = new Compilation();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "compilationName") {
                obj.name = value ? value as string : null;
                continue;
            }

            if (key === "compilationVersion") {
                obj.version = value ? value as string : null;
                continue;
            }

            // Store unknown properties in misc
            obj._misc[key] = value;
        }
        return obj;
    }
}

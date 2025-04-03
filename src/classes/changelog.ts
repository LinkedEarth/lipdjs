
// Auto-generated. Do not edit.


type ChangeLogProperty = boolean | null | number | string;

export class ChangeLog {
    [key: string]: ChangeLogProperty | ChangeLogProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private changes: string | null = null;
    private notes: string | null = null;

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getChanges(): string | null {
        return this.changes;
    }

    public setChanges(value: string | null): void {
        this.changes = value;
    }

    public getNotes(): string | null {
        return this.notes;
    }

    public setNotes(value: string | null): void {
        this.notes = value;
    }

    public toJson(): Record<string, unknown> {
        const data: Record<string, unknown> = {
            "@id": this._id
        };

        if (this.changes !== null) {
            data["changes"] = this.changes;
        }

        if (this.notes !== null) {
            data["notes"] = this.notes;
        }

        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, unknown>): ChangeLog {
        const obj = new ChangeLog();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "changes") {
                obj.changes = value ? value as string : null;
                continue;
            }

            if (key === "notes") {
                obj.notes = value ? value as string : null;
                continue;
            }

            // Store unknown properties in misc
            obj._misc[key] = value;
        }
        return obj;
    }
}

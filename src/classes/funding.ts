
// Auto-generated. Do not edit.
import { Person } from "./person";


type FundingProperty = Person | boolean | null | number | string;

export class Funding {
    [key: string]: FundingProperty | FundingProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private fundingAgency: string | null = null;
    private grants: string[] = [];
    private fundingCountry: string | null = null;
    private investigators: Person[] = [];

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getFundingAgency(): string | null {
        return this.fundingAgency;
    }

    public setFundingAgency(value: string | null): void {
        this.fundingAgency = value;
    }

    public getGrants(): string[] {
        return this.grants;
    }

    public setGrants(value: string[]): void {
        this.grants = value;
    }

    public addGrant(value: string): void {
        this.grants.push(value);
    }

    public getFundingCountry(): string | null {
        return this.fundingCountry;
    }

    public setFundingCountry(value: string | null): void {
        this.fundingCountry = value;
    }

    public getInvestigators(): Person[] {
        return this.investigators;
    }

    public setInvestigators(value: Person[]): void {
        this.investigators = value;
    }

    public addInvestigator(value: Person): void {
        this.investigators.push(value);
    }

    public toJson(): Record<string, unknown> {
        const data: Record<string, unknown> = {
            "@id": this._id
        };

        if (this.fundingAgency !== null) {
            data["agency"] = this.fundingAgency;
        }

        if (this.grants.length > 0) {
            data["grant"] = this.grants.map(value => value);
        }

        if (this.fundingCountry !== null) {
            data["country"] = this.fundingCountry;
        }

        if (this.investigators.length > 0) {
            data["investigator"] = this.investigators.map(value => value.toJson());
        }

        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, unknown>): Funding {
        const obj = new Funding();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "agency") {
                obj.fundingAgency = value ? value as string : null;
                continue;
            }

            if (key === "grant") {
                obj.grants = Array.isArray(value) ? value.map(item => item as string) : [];
                continue;
            }

            if (key === "country") {
                obj.fundingCountry = value ? value as string : null;
                continue;
            }

            if (key === "investigator") {
                obj.investigators = Array.isArray(value) ? value.map(item => Person.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            // Store unknown properties in misc
            obj._misc[key] = value;
        }
        return obj;
    }
}

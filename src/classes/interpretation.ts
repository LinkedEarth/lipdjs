
// Auto-generated. Do not edit.
import { InterpretationSeasonality } from "./interpretationseasonality";
import { InterpretationVariable } from "./interpretationvariable";


type InterpretationProperty = InterpretationSeasonality | InterpretationVariable | boolean | null | number | string;

export class Interpretation {
    [key: string]: InterpretationProperty | InterpretationProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private variable: InterpretationVariable | null = null;
    private variableGeneral: string | null = null;
    private variableGeneralDirection: string | null = null;
    private variableDetail: string | null = null;
    private seasonality: InterpretationSeasonality | null = null;
    private seasonalityOriginal: InterpretationSeasonality | null = null;
    private seasonalityGeneral: InterpretationSeasonality | null = null;
    private notes: string | null = null;
    private rank: string | null = null;
    private basis: string | null = null;
    private scope: string | null = null;
    private mathematicalRelation: string | null = null;
    private direction: string | null = null;
    private local: string | null = null;

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getVariable(): InterpretationVariable | null {
        return this.variable;
    }

    public setVariable(value: InterpretationVariable | null): void {
        this.variable = value;
    }

    public getVariableGeneral(): string | null {
        return this.variableGeneral;
    }

    public setVariableGeneral(value: string | null): void {
        this.variableGeneral = value;
    }

    public getVariableGeneralDirection(): string | null {
        return this.variableGeneralDirection;
    }

    public setVariableGeneralDirection(value: string | null): void {
        this.variableGeneralDirection = value;
    }

    public getVariableDetail(): string | null {
        return this.variableDetail;
    }

    public setVariableDetail(value: string | null): void {
        this.variableDetail = value;
    }

    public getSeasonality(): InterpretationSeasonality | null {
        return this.seasonality;
    }

    public setSeasonality(value: InterpretationSeasonality | null): void {
        this.seasonality = value;
    }

    public getSeasonalityOriginal(): InterpretationSeasonality | null {
        return this.seasonalityOriginal;
    }

    public setSeasonalityOriginal(value: InterpretationSeasonality | null): void {
        this.seasonalityOriginal = value;
    }

    public getSeasonalityGeneral(): InterpretationSeasonality | null {
        return this.seasonalityGeneral;
    }

    public setSeasonalityGeneral(value: InterpretationSeasonality | null): void {
        this.seasonalityGeneral = value;
    }

    public getNotes(): string | null {
        return this.notes;
    }

    public setNotes(value: string | null): void {
        this.notes = value;
    }

    public getRank(): string | null {
        return this.rank;
    }

    public setRank(value: string | null): void {
        this.rank = value;
    }

    public getBasis(): string | null {
        return this.basis;
    }

    public setBasis(value: string | null): void {
        this.basis = value;
    }

    public getScope(): string | null {
        return this.scope;
    }

    public setScope(value: string | null): void {
        this.scope = value;
    }

    public getMathematicalRelation(): string | null {
        return this.mathematicalRelation;
    }

    public setMathematicalRelation(value: string | null): void {
        this.mathematicalRelation = value;
    }

    public getDirection(): string | null {
        return this.direction;
    }

    public setDirection(value: string | null): void {
        this.direction = value;
    }

    public getLocal(): string | null {
        return this.local;
    }

    public setLocal(value: string | null): void {
        this.local = value;
    }

    public toJson(): Record<string, unknown> {
        const data: Record<string, unknown> = {
            "@id": this._id
        };

        if (this.variable !== null) {
            data["variable"] = this.variable.toJson();
        }

        if (this.variableGeneral !== null) {
            data["variableGeneral"] = this.variableGeneral;
        }

        if (this.variableGeneralDirection !== null) {
            data["variableGeneralDirection"] = this.variableGeneralDirection;
        }

        if (this.variableDetail !== null) {
            data["variableDetail"] = this.variableDetail;
        }

        if (this.seasonality !== null) {
            data["seasonality"] = this.seasonality.toJson();
        }

        if (this.seasonalityOriginal !== null) {
            data["seasonalityOriginal"] = this.seasonalityOriginal.toJson();
        }

        if (this.seasonalityGeneral !== null) {
            data["seasonalityGeneral"] = this.seasonalityGeneral.toJson();
        }

        if (this.notes !== null) {
            data["notes"] = this.notes;
        }

        if (this.rank !== null) {
            data["rank"] = this.rank;
        }

        if (this.basis !== null) {
            data["basis"] = this.basis;
        }

        if (this.scope !== null) {
            data["scope"] = this.scope;
        }

        if (this.mathematicalRelation !== null) {
            data["mathematicalRelation"] = this.mathematicalRelation;
        }

        if (this.direction !== null) {
            data["direction"] = this.direction;
        }

        if (this.local !== null) {
            data["isLocal"] = this.local;
        }

        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, unknown>): Interpretation {
        const obj = new Interpretation();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "variable") {
                obj.variable = value ? InterpretationVariable.fromSynonym(value as string) : null;
                continue;
            }

            if (key === "variableGeneral") {
                obj.variableGeneral = value ? value as string : null;
                continue;
            }

            if (key === "variableGeneralDirection") {
                obj.variableGeneralDirection = value ? value as string : null;
                continue;
            }

            if (key === "variableDetail") {
                obj.variableDetail = value ? value as string : null;
                continue;
            }

            if (key === "seasonality") {
                obj.seasonality = value ? InterpretationSeasonality.fromSynonym(value as string) : null;
                continue;
            }

            if (key === "seasonalityOriginal") {
                obj.seasonalityOriginal = value ? InterpretationSeasonality.fromSynonym(value as string) : null;
                continue;
            }

            if (key === "seasonalityGeneral") {
                obj.seasonalityGeneral = value ? InterpretationSeasonality.fromSynonym(value as string) : null;
                continue;
            }

            if (key === "notes") {
                obj.notes = value ? value as string : null;
                continue;
            }

            if (key === "rank") {
                obj.rank = value ? value as string : null;
                continue;
            }

            if (key === "basis") {
                obj.basis = value ? value as string : null;
                continue;
            }

            if (key === "scope") {
                obj.scope = value ? value as string : null;
                continue;
            }

            if (key === "mathematicalRelation") {
                obj.mathematicalRelation = value ? value as string : null;
                continue;
            }

            if (key === "direction") {
                obj.direction = value ? value as string : null;
                continue;
            }

            if (key === "isLocal") {
                obj.local = value ? value as string : null;
                continue;
            }

            // Store unknown properties in misc
            obj._misc[key] = value;
        }
        return obj;
    }
}


// Auto-generated. Do not edit.


type CalibrationProperty = boolean | null | number | string;

export class Calibration {
    [key: string]: CalibrationProperty | CalibrationProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private datasetRange: string | null = null;
    private dOI: string | null = null;
    private equation: string | null = null;
    private equationIntercept: string | null = null;
    private equationR2: string | null = null;
    private equationSlope: string | null = null;
    private equationSlopeUncertainty: string | null = null;
    private method: string | null = null;
    private methodDetail: string | null = null;
    private proxyDataset: string | null = null;
    private targetDataset: string | null = null;
    private seasonality: string | null = null;
    private notes: string | null = null;
    private uncertainty: string | null = null;

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getDatasetRange(): string | null {
        return this.datasetRange;
    }

    public setDatasetRange(value: string | null): void {
        this.datasetRange = value;
    }

    public getDOI(): string | null {
        return this.dOI;
    }

    public setDOI(value: string | null): void {
        this.dOI = value;
    }

    public getEquation(): string | null {
        return this.equation;
    }

    public setEquation(value: string | null): void {
        this.equation = value;
    }

    public getEquationIntercept(): string | null {
        return this.equationIntercept;
    }

    public setEquationIntercept(value: string | null): void {
        this.equationIntercept = value;
    }

    public getEquationR2(): string | null {
        return this.equationR2;
    }

    public setEquationR2(value: string | null): void {
        this.equationR2 = value;
    }

    public getEquationSlope(): string | null {
        return this.equationSlope;
    }

    public setEquationSlope(value: string | null): void {
        this.equationSlope = value;
    }

    public getEquationSlopeUncertainty(): string | null {
        return this.equationSlopeUncertainty;
    }

    public setEquationSlopeUncertainty(value: string | null): void {
        this.equationSlopeUncertainty = value;
    }

    public getMethod(): string | null {
        return this.method;
    }

    public setMethod(value: string | null): void {
        this.method = value;
    }

    public getMethodDetail(): string | null {
        return this.methodDetail;
    }

    public setMethodDetail(value: string | null): void {
        this.methodDetail = value;
    }

    public getProxyDataset(): string | null {
        return this.proxyDataset;
    }

    public setProxyDataset(value: string | null): void {
        this.proxyDataset = value;
    }

    public getTargetDataset(): string | null {
        return this.targetDataset;
    }

    public setTargetDataset(value: string | null): void {
        this.targetDataset = value;
    }

    public getSeasonality(): string | null {
        return this.seasonality;
    }

    public setSeasonality(value: string | null): void {
        this.seasonality = value;
    }

    public getNotes(): string | null {
        return this.notes;
    }

    public setNotes(value: string | null): void {
        this.notes = value;
    }

    public getUncertainty(): string | null {
        return this.uncertainty;
    }

    public setUncertainty(value: string | null): void {
        this.uncertainty = value;
    }

    public toJson(): Record<string, unknown> {
        const data: Record<string, unknown> = {
            "@id": this._id
        };

        if (this.datasetRange !== null) {
            data["datasetRange"] = this.datasetRange;
        }

        if (this.dOI !== null) {
            data["doi"] = this.dOI;
        }

        if (this.equation !== null) {
            data["equation"] = this.equation;
        }

        if (this.equationIntercept !== null) {
            data["equationIntercept"] = this.equationIntercept;
        }

        if (this.equationR2 !== null) {
            data["equationR2"] = this.equationR2;
        }

        if (this.equationSlope !== null) {
            data["equationSlope"] = this.equationSlope;
        }

        if (this.equationSlopeUncertainty !== null) {
            data["equationSlopeUncertainty"] = this.equationSlopeUncertainty;
        }

        if (this.method !== null) {
            data["method"] = this.method;
        }

        if (this.methodDetail !== null) {
            data["methodDetail"] = this.methodDetail;
        }

        if (this.proxyDataset !== null) {
            data["proxyDataset"] = this.proxyDataset;
        }

        if (this.targetDataset !== null) {
            data["targetDataset"] = this.targetDataset;
        }

        if (this.seasonality !== null) {
            data["hasSeasonality"] = this.seasonality;
        }

        if (this.notes !== null) {
            data["notes"] = this.notes;
        }

        if (this.uncertainty !== null) {
            data["uncertainty"] = this.uncertainty;
        }

        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, unknown>): Calibration {
        const obj = new Calibration();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "datasetRange") {
                obj.datasetRange = value ? value as string : null;
                continue;
            }

            if (key === "doi") {
                obj.dOI = value ? value as string : null;
                continue;
            }

            if (key === "equation") {
                obj.equation = value ? value as string : null;
                continue;
            }

            if (key === "equationIntercept") {
                obj.equationIntercept = value ? value as string : null;
                continue;
            }

            if (key === "equationR2") {
                obj.equationR2 = value ? value as string : null;
                continue;
            }

            if (key === "equationSlope") {
                obj.equationSlope = value ? value as string : null;
                continue;
            }

            if (key === "equationSlopeUncertainty") {
                obj.equationSlopeUncertainty = value ? value as string : null;
                continue;
            }

            if (key === "method") {
                obj.method = value ? value as string : null;
                continue;
            }

            if (key === "methodDetail") {
                obj.methodDetail = value ? value as string : null;
                continue;
            }

            if (key === "proxyDataset") {
                obj.proxyDataset = value ? value as string : null;
                continue;
            }

            if (key === "targetDataset") {
                obj.targetDataset = value ? value as string : null;
                continue;
            }

            if (key === "hasSeasonality") {
                obj.seasonality = value ? value as string : null;
                continue;
            }

            if (key === "notes") {
                obj.notes = value ? value as string : null;
                continue;
            }

            if (key === "uncertainty") {
                obj.uncertainty = value ? value as string : null;
                continue;
            }

            // Store unknown properties in misc
            obj._misc[key] = value;
        }
        return obj;
    }
}


// Auto-generated. Do not edit.
import { Resolution } from "./resolution";
import { PaleoProxyGeneral } from "./paleoproxygeneral";
import { PhysicalSample } from "./physicalsample";
import { PaleoVariable } from "./paleovariable";
import { ArchiveType } from "./archivetype";
import { Interpretation } from "./interpretation";
import { PaleoProxy } from "./paleoproxy";
import { Compilation } from "./compilation";
import { Calibration } from "./calibration";
import { PaleoUnit } from "./paleounit";


type VariableProperty = ArchiveType | Calibration | Compilation | Interpretation | PaleoProxy | PaleoProxyGeneral | PaleoUnit | PaleoVariable | PhysicalSample | Resolution | boolean | null | number | string;

export class Variable {
    [key: string]: VariableProperty | VariableProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private columnNumber: number | null = null;
    private variableId: string | null = null;
    private name: string | null = null;
    private type: string | null = null;
    private archiveType: ArchiveType | null = null;
    private units: PaleoUnit | null = null;
    private missingValue: string | null = null;
    private maxValue: string | null = null;
    private minValue: string | null = null;
    private meanValue: string | null = null;
    private medianValue: string | null = null;
    private description: string | null = null;
    private primary: boolean | null = null;
    private composite: boolean | null = null;
    private instrument: string | null = null;
    private calibratedVias: Calibration[] = [];
    private interpretations: Interpretation[] = [];
    private resolution: Resolution | null = null;
    private physicalSamples: PhysicalSample[] = [];
    private uncertainty: string | null = null;
    private uncertaintyAnalytical: string | null = null;
    private uncertaintyReproducibility: string | null = null;
    private proxy: PaleoProxy | null = null;
    private proxyGeneral: PaleoProxyGeneral | null = null;
    private partOfCompilation: Compilation | null = null;
    private notes: string | null = null;
    private values: string | null = null;
    private foundInTable: string | null = null;
    private foundInDataset: string | null = null;
    private standardVariable: PaleoVariable | null = null;

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getColumnNumber(): number | null {
        return this.columnNumber;
    }

    public setColumnNumber(value: number | null): void {
        this.columnNumber = value;
    }

    public getVariableId(): string | null {
        return this.variableId;
    }

    public setVariableId(value: string | null): void {
        this.variableId = value;
    }

    public getName(): string | null {
        return this.name;
    }

    public setName(value: string | null): void {
        this.name = value;
    }

    public getType(): string | null {
        return this.type;
    }

    public setType(value: string | null): void {
        this.type = value;
    }

    public getArchiveType(): ArchiveType | null {
        return this.archiveType;
    }

    public setArchiveType(value: ArchiveType | null): void {
        this.archiveType = value;
    }

    public getUnits(): PaleoUnit | null {
        return this.units;
    }

    public setUnits(value: PaleoUnit | null): void {
        this.units = value;
    }

    public getMissingValue(): string | null {
        return this.missingValue;
    }

    public setMissingValue(value: string | null): void {
        this.missingValue = value;
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

    public getDescription(): string | null {
        return this.description;
    }

    public setDescription(value: string | null): void {
        this.description = value;
    }

    public getPrimary(): boolean | null {
        return this.primary;
    }

    public setPrimary(value: boolean | null): void {
        this.primary = value;
    }

    public getComposite(): boolean | null {
        return this.composite;
    }

    public setComposite(value: boolean | null): void {
        this.composite = value;
    }

    public getInstrument(): string | null {
        return this.instrument;
    }

    public setInstrument(value: string | null): void {
        this.instrument = value;
    }

    public getCalibratedVias(): Calibration[] {
        return this.calibratedVias;
    }

    public setCalibratedVias(value: Calibration[]): void {
        this.calibratedVias = value;
    }

    public addCalibratedVia(value: Calibration): void {
        this.calibratedVias.push(value);
    }

    public getInterpretations(): Interpretation[] {
        return this.interpretations;
    }

    public setInterpretations(value: Interpretation[]): void {
        this.interpretations = value;
    }

    public addInterpretation(value: Interpretation): void {
        this.interpretations.push(value);
    }

    public getResolution(): Resolution | null {
        return this.resolution;
    }

    public setResolution(value: Resolution | null): void {
        this.resolution = value;
    }

    public getPhysicalSamples(): PhysicalSample[] {
        return this.physicalSamples;
    }

    public setPhysicalSamples(value: PhysicalSample[]): void {
        this.physicalSamples = value;
    }

    public addPhysicalSample(value: PhysicalSample): void {
        this.physicalSamples.push(value);
    }

    public getUncertainty(): string | null {
        return this.uncertainty;
    }

    public setUncertainty(value: string | null): void {
        this.uncertainty = value;
    }

    public getUncertaintyAnalytical(): string | null {
        return this.uncertaintyAnalytical;
    }

    public setUncertaintyAnalytical(value: string | null): void {
        this.uncertaintyAnalytical = value;
    }

    public getUncertaintyReproducibility(): string | null {
        return this.uncertaintyReproducibility;
    }

    public setUncertaintyReproducibility(value: string | null): void {
        this.uncertaintyReproducibility = value;
    }

    public getProxy(): PaleoProxy | null {
        return this.proxy;
    }

    public setProxy(value: PaleoProxy | null): void {
        this.proxy = value;
    }

    public getProxyGeneral(): PaleoProxyGeneral | null {
        return this.proxyGeneral;
    }

    public setProxyGeneral(value: PaleoProxyGeneral | null): void {
        this.proxyGeneral = value;
    }

    public getPartOfCompilation(): Compilation | null {
        return this.partOfCompilation;
    }

    public setPartOfCompilation(value: Compilation | null): void {
        this.partOfCompilation = value;
    }

    public getNotes(): string | null {
        return this.notes;
    }

    public setNotes(value: string | null): void {
        this.notes = value;
    }

    public getValues(): string | null {
        return this.values;
    }

    public setValues(value: string | null): void {
        this.values = value;
    }

    public getFoundInTable(): string | null {
        return this.foundInTable;
    }

    public setFoundInTable(value: string | null): void {
        this.foundInTable = value;
    }

    public getFoundInDataset(): string | null {
        return this.foundInDataset;
    }

    public setFoundInDataset(value: string | null): void {
        this.foundInDataset = value;
    }

    public getStandardVariable(): PaleoVariable | null {
        return this.standardVariable;
    }

    public setStandardVariable(value: PaleoVariable | null): void {
        this.standardVariable = value;
    }

    public toJson(): Record<string, unknown> {
        const data: Record<string, unknown> = {
            "@id": this._id
        };

        if (this.columnNumber !== null) {
            data["number"] = this.columnNumber;
        }

        if (this.variableId !== null) {
            data["TSid"] = this.variableId;
        }

        if (this.name !== null) {
            data["variableName"] = this.name;
        }

        if (this.type !== null) {
            data["variableType"] = this.type;
        }

        if (this.archiveType !== null) {
            data["archiveType"] = this.archiveType.toJson();
        }

        if (this.units !== null) {
            data["units"] = this.units.toJson();
        }

        if (this.missingValue !== null) {
            data["missingValue"] = this.missingValue;
        }

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

        if (this.description !== null) {
            data["description"] = this.description;
        }

        if (this.primary !== null) {
            data["isPrimary"] = this.primary;
        }

        if (this.composite !== null) {
            data["isComposite"] = this.composite;
        }

        if (this.instrument !== null) {
            data["measurementInstrument"] = this.instrument;
        }

        if (this.calibratedVias.length > 0) {
            data["calibration"] = this.calibratedVias.map(value => value.toJson());
        }

        if (this.interpretations.length > 0) {
            data["interpretation"] = this.interpretations.map(value => value.toJson());
        }

        if (this.resolution !== null) {
            data["resolution"] = this.resolution.toJson();
        }

        if (this.physicalSamples.length > 0) {
            data["physicalSample"] = this.physicalSamples.map(value => value.toJson());
        }

        if (this.uncertainty !== null) {
            data["uncertainty"] = this.uncertainty;
        }

        if (this.uncertaintyAnalytical !== null) {
            data["uncertaintyAnalytical"] = this.uncertaintyAnalytical;
        }

        if (this.uncertaintyReproducibility !== null) {
            data["uncertaintyReproducibility"] = this.uncertaintyReproducibility;
        }

        if (this.proxy !== null) {
            data["proxy"] = this.proxy.toJson();
        }

        if (this.proxyGeneral !== null) {
            data["proxyGeneral"] = this.proxyGeneral.toJson();
        }

        if (this.partOfCompilation !== null) {
            data["inCompilationBeta"] = this.partOfCompilation.toJson();
        }

        if (this.notes !== null) {
            data["notes"] = this.notes;
        }

        if (this.values !== null) {
            data["hasValues"] = this.values;
        }

        if (this.foundInTable !== null) {
            data["foundInTable"] = this.foundInTable;
        }

        if (this.foundInDataset !== null) {
            data["foundInDataset"] = this.foundInDataset;
        }

        if (this.standardVariable !== null) {
            data["hasStandardVariable"] = this.standardVariable.toJson();
        }

        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, unknown>): Variable {
        const obj = new Variable();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "number") {
                obj.columnNumber = value ? value as number : null;
                continue;
            }

            if (key === "TSid") {
                obj.variableId = value ? value as string : null;
                continue;
            }

            if (key === "variableName") {
                obj.name = value ? value as string : null;
                continue;
            }

            if (key === "variableType") {
                obj.type = value ? value as string : null;
                continue;
            }

            if (key === "archiveType") {
                obj.archiveType = value ? ArchiveType.fromSynonym(value as string) : null;
                continue;
            }

            if (key === "units") {
                obj.units = value ? PaleoUnit.fromSynonym(value as string) : null;
                continue;
            }

            if (key === "missingValue") {
                obj.missingValue = value ? value as string : null;
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

            if (key === "description") {
                obj.description = value ? value as string : null;
                continue;
            }

            if (key === "isPrimary") {
                obj.primary = value ? value as boolean : null;
                continue;
            }

            if (key === "isComposite") {
                obj.composite = value ? value as boolean : null;
                continue;
            }

            if (key === "measurementInstrument") {
                obj.instrument = value ? value as string : null;
                continue;
            }

            if (key === "calibration") {
                obj.calibratedVias = Array.isArray(value) ? value.map(item => Calibration.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "interpretation") {
                obj.interpretations = Array.isArray(value) ? value.map(item => Interpretation.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "resolution") {
                obj.resolution = value ? Resolution.fromJson(value as Record<string, unknown>) : null;
                continue;
            }

            if (key === "physicalSample") {
                obj.physicalSamples = Array.isArray(value) ? value.map(item => PhysicalSample.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "uncertainty") {
                obj.uncertainty = value ? value as string : null;
                continue;
            }

            if (key === "uncertaintyAnalytical") {
                obj.uncertaintyAnalytical = value ? value as string : null;
                continue;
            }

            if (key === "uncertaintyReproducibility") {
                obj.uncertaintyReproducibility = value ? value as string : null;
                continue;
            }

            if (key === "proxy") {
                obj.proxy = value ? PaleoProxy.fromSynonym(value as string) : null;
                continue;
            }

            if (key === "proxyGeneral") {
                obj.proxyGeneral = value ? PaleoProxyGeneral.fromSynonym(value as string) : null;
                continue;
            }

            if (key === "inCompilationBeta") {
                obj.partOfCompilation = value ? Compilation.fromJson(value as Record<string, unknown>) : null;
                continue;
            }

            if (key === "notes") {
                obj.notes = value ? value as string : null;
                continue;
            }

            if (key === "hasValues") {
                obj.values = value ? value as string : null;
                continue;
            }

            if (key === "foundInTable") {
                obj.foundInTable = value ? value as string : null;
                continue;
            }

            if (key === "foundInDataset") {
                obj.foundInDataset = value ? value as string : null;
                continue;
            }

            if (key === "hasStandardVariable") {
                obj.standardVariable = value ? PaleoVariable.fromSynonym(value as string) : null;
                continue;
            }

            // Store unknown properties in misc
            obj._misc[key] = value;
        }
        return obj;
    }
}

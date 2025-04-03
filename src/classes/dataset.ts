
// Auto-generated. Do not edit.
import { Publication } from "./publication";
import { PaleoData } from "./paleodata";
import { Funding } from "./funding";
import { ChronData } from "./chrondata";
import { Location } from "./location";
import { ArchiveType } from "./archivetype";
import { ChangeLog } from "./changelog";
import { Person } from "./person";


type DatasetProperty = ArchiveType | ChangeLog | ChronData | Funding | Location | PaleoData | Person | Publication | boolean | null | number | string;

export class Dataset {
    [key: string]: DatasetProperty | DatasetProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private datasetId: string | null = null;
    private name: string | null = null;
    private dataSource: string | null = null;
    private originalDataUrl: string | null = null;
    private contributor: Person | null = null;
    private archiveType: ArchiveType | null = null;
    private changeLog: ChangeLog | null = null;
    private notes: string | null = null;
    private collectionName: string | null = null;
    private collectionYear: string | null = null;
    private investigators: Person[] = [];
    private creators: Person[] = [];
    private fundings: Funding[] = [];
    private publications: Publication[] = [];
    private location: Location | null = null;
    private paleoData: PaleoData[] = [];
    private chronData: ChronData[] = [];
    private spreadsheetLink: string | null = null;
    private version: string | null = null;
    private compilationNest: string | null = null;

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getDatasetId(): string | null {
        return this.datasetId;
    }

    public setDatasetId(value: string | null): void {
        this.datasetId = value;
    }

    public getName(): string | null {
        return this.name;
    }

    public setName(value: string | null): void {
        this.name = value;
    }

    public getDataSource(): string | null {
        return this.dataSource;
    }

    public setDataSource(value: string | null): void {
        this.dataSource = value;
    }

    public getOriginalDataUrl(): string | null {
        return this.originalDataUrl;
    }

    public setOriginalDataUrl(value: string | null): void {
        this.originalDataUrl = value;
    }

    public getContributor(): Person | null {
        return this.contributor;
    }

    public setContributor(value: Person | null): void {
        this.contributor = value;
    }

    public getArchiveType(): ArchiveType | null {
        return this.archiveType;
    }

    public setArchiveType(value: ArchiveType | null): void {
        this.archiveType = value;
    }

    public getChangeLog(): ChangeLog | null {
        return this.changeLog;
    }

    public setChangeLog(value: ChangeLog | null): void {
        this.changeLog = value;
    }

    public getNotes(): string | null {
        return this.notes;
    }

    public setNotes(value: string | null): void {
        this.notes = value;
    }

    public getCollectionName(): string | null {
        return this.collectionName;
    }

    public setCollectionName(value: string | null): void {
        this.collectionName = value;
    }

    public getCollectionYear(): string | null {
        return this.collectionYear;
    }

    public setCollectionYear(value: string | null): void {
        this.collectionYear = value;
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

    public getCreators(): Person[] {
        return this.creators;
    }

    public setCreators(value: Person[]): void {
        this.creators = value;
    }

    public addCreator(value: Person): void {
        this.creators.push(value);
    }

    public getFundings(): Funding[] {
        return this.fundings;
    }

    public setFundings(value: Funding[]): void {
        this.fundings = value;
    }

    public addFunding(value: Funding): void {
        this.fundings.push(value);
    }

    public getPublications(): Publication[] {
        return this.publications;
    }

    public setPublications(value: Publication[]): void {
        this.publications = value;
    }

    public addPublication(value: Publication): void {
        this.publications.push(value);
    }

    public getLocation(): Location | null {
        return this.location;
    }

    public setLocation(value: Location | null): void {
        this.location = value;
    }

    public getPaleoData(): PaleoData[] {
        return this.paleoData;
    }

    public setPaleoData(value: PaleoData[]): void {
        this.paleoData = value;
    }

    public addPaleoDat(value: PaleoData): void {
        this.paleoData.push(value);
    }

    public getChronData(): ChronData[] {
        return this.chronData;
    }

    public setChronData(value: ChronData[]): void {
        this.chronData = value;
    }

    public addChronDat(value: ChronData): void {
        this.chronData.push(value);
    }

    public getSpreadsheetLink(): string | null {
        return this.spreadsheetLink;
    }

    public setSpreadsheetLink(value: string | null): void {
        this.spreadsheetLink = value;
    }

    public getVersion(): string | null {
        return this.version;
    }

    public setVersion(value: string | null): void {
        this.version = value;
    }

    public getCompilationNest(): string | null {
        return this.compilationNest;
    }

    public setCompilationNest(value: string | null): void {
        this.compilationNest = value;
    }

    public toJson(): Record<string, unknown> {
        const data: Record<string, unknown> = {
            "@id": this._id
        };

        if (this.datasetId !== null) {
            data["datasetId"] = this.datasetId;
        }

        if (this.name !== null) {
            data["dataSetName"] = this.name;
        }

        if (this.dataSource !== null) {
            data["dataSource"] = this.dataSource;
        }

        if (this.originalDataUrl !== null) {
            data["originalDataURL"] = this.originalDataUrl;
        }

        if (this.contributor !== null) {
            data["dataContributor"] = this.contributor.toJson();
        }

        if (this.archiveType !== null) {
            data["archiveType"] = this.archiveType.toJson();
        }

        if (this.changeLog !== null) {
            data["changelog"] = this.changeLog.toJson();
        }

        if (this.notes !== null) {
            data["notes"] = this.notes;
        }

        if (this.collectionName !== null) {
            data["collectionName"] = this.collectionName;
        }

        if (this.collectionYear !== null) {
            data["collectionYear"] = this.collectionYear;
        }

        if (this.investigators.length > 0) {
            data["investigator"] = this.investigators.map(value => value.toJson());
        }

        if (this.creators.length > 0) {
            data["creator"] = this.creators.map(value => value.toJson());
        }

        if (this.fundings.length > 0) {
            data["funding"] = this.fundings.map(value => value.toJson());
        }

        if (this.publications.length > 0) {
            data["pub"] = this.publications.map(value => value.toJson());
        }

        if (this.location !== null) {
            data["geo"] = this.location.toJson();
        }

        if (this.paleoData.length > 0) {
            data["paleoData"] = this.paleoData.map(value => value.toJson());
        }

        if (this.chronData.length > 0) {
            data["chronData"] = this.chronData.map(value => value.toJson());
        }

        if (this.spreadsheetLink !== null) {
            data["googleSpreadSheetKey"] = this.spreadsheetLink;
        }

        if (this.version !== null) {
            data["dataSetVersion"] = this.version;
        }

        if (this.compilationNest !== null) {
            data["compilation_nest"] = this.compilationNest;
        }

        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, unknown>): Dataset {
        const obj = new Dataset();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "datasetId") {
                obj.datasetId = value ? value as string : null;
                continue;
            }

            if (key === "dataSetName") {
                obj.name = value ? value as string : null;
                continue;
            }

            if (key === "dataSource") {
                obj.dataSource = value ? value as string : null;
                continue;
            }

            if (key === "originalDataURL") {
                obj.originalDataUrl = value ? value as string : null;
                continue;
            }

            if (key === "dataContributor") {
                obj.contributor = value ? Person.fromJson(value as Record<string, unknown>) : null;
                continue;
            }

            if (key === "archiveType") {
                obj.archiveType = value ? ArchiveType.fromSynonym(value as string) : null;
                continue;
            }

            if (key === "changelog") {
                obj.changeLog = value ? ChangeLog.fromJson(value as Record<string, unknown>) : null;
                continue;
            }

            if (key === "notes") {
                obj.notes = value ? value as string : null;
                continue;
            }

            if (key === "collectionName") {
                obj.collectionName = value ? value as string : null;
                continue;
            }

            if (key === "collectionYear") {
                obj.collectionYear = value ? value as string : null;
                continue;
            }

            if (key === "investigator") {
                obj.investigators = Array.isArray(value) ? value.map(item => Person.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "creator") {
                obj.creators = Array.isArray(value) ? value.map(item => Person.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "funding") {
                obj.fundings = Array.isArray(value) ? value.map(item => Funding.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "pub") {
                obj.publications = Array.isArray(value) ? value.map(item => Publication.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "geo") {
                obj.location = value ? Location.fromJson(value as Record<string, unknown>) : null;
                continue;
            }

            if (key === "paleoData") {
                obj.paleoData = Array.isArray(value) ? value.map(item => PaleoData.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "chronData") {
                obj.chronData = Array.isArray(value) ? value.map(item => ChronData.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "googleSpreadSheetKey") {
                obj.spreadsheetLink = value ? value as string : null;
                continue;
            }

            if (key === "dataSetVersion") {
                obj.version = value ? value as string : null;
                continue;
            }

            if (key === "compilation_nest") {
                obj.compilationNest = value ? value as string : null;
                continue;
            }

            // Store unknown properties in misc
            obj._misc[key] = value;
        }
        return obj;
    }
}

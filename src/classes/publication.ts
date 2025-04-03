
// Auto-generated. Do not edit.
import { Person } from "./person";


type PublicationProperty = Person | boolean | null | number | string;

export class Publication {
    [key: string]: PublicationProperty | PublicationProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private title: string | null = null;
    private abstract: string | null = null;
    private institution: string | null = null;
    private issue: string | null = null;
    private journal: string | null = null;
    private volume: string | null = null;
    private pages: string | null = null;
    private year: number | null = null;
    private publisher: string | null = null;
    private report: string | null = null;
    private type: string | null = null;
    private citation: string | null = null;
    private citeKey: string | null = null;
    private urls: string[] = [];
    private dataUrls: string[] = [];
    private dOI: string | null = null;
    private authors: Person[] = [];
    private firstAuthor: Person | null = null;

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getTitle(): string | null {
        return this.title;
    }

    public setTitle(value: string | null): void {
        this.title = value;
    }

    public getAbstract(): string | null {
        return this.abstract;
    }

    public setAbstract(value: string | null): void {
        this.abstract = value;
    }

    public getInstitution(): string | null {
        return this.institution;
    }

    public setInstitution(value: string | null): void {
        this.institution = value;
    }

    public isIssue(): string | null {
        return this.issue;
    }

    public setIssue(value: string | null): void {
        this.issue = value;
    }

    public getJournal(): string | null {
        return this.journal;
    }

    public setJournal(value: string | null): void {
        this.journal = value;
    }

    public getVolume(): string | null {
        return this.volume;
    }

    public setVolume(value: string | null): void {
        this.volume = value;
    }

    public getPages(): string | null {
        return this.pages;
    }

    public setPages(value: string | null): void {
        this.pages = value;
    }

    public getYear(): number | null {
        return this.year;
    }

    public setYear(value: number | null): void {
        this.year = value;
    }

    public getPublisher(): string | null {
        return this.publisher;
    }

    public setPublisher(value: string | null): void {
        this.publisher = value;
    }

    public getReport(): string | null {
        return this.report;
    }

    public setReport(value: string | null): void {
        this.report = value;
    }

    public getType(): string | null {
        return this.type;
    }

    public setType(value: string | null): void {
        this.type = value;
    }

    public getCitation(): string | null {
        return this.citation;
    }

    public setCitation(value: string | null): void {
        this.citation = value;
    }

    public getCiteKey(): string | null {
        return this.citeKey;
    }

    public setCiteKey(value: string | null): void {
        this.citeKey = value;
    }

    public getUrls(): string[] {
        return this.urls;
    }

    public setUrls(value: string[]): void {
        this.urls = value;
    }

    public addUrl(value: string): void {
        this.urls.push(value);
    }

    public getDataUrls(): string[] {
        return this.dataUrls;
    }

    public setDataUrls(value: string[]): void {
        this.dataUrls = value;
    }

    public addDataUrl(value: string): void {
        this.dataUrls.push(value);
    }

    public getDOI(): string | null {
        return this.dOI;
    }

    public setDOI(value: string | null): void {
        this.dOI = value;
    }

    public getAuthors(): Person[] {
        return this.authors;
    }

    public setAuthors(value: Person[]): void {
        this.authors = value;
    }

    public addAuthor(value: Person): void {
        this.authors.push(value);
    }

    public getFirstAuthor(): Person | null {
        return this.firstAuthor;
    }

    public setFirstAuthor(value: Person | null): void {
        this.firstAuthor = value;
    }

    public toJson(): Record<string, unknown> {
        const data: Record<string, unknown> = {
            "@id": this._id
        };

        if (this.title !== null) {
            data["title"] = this.title;
        }

        if (this.abstract !== null) {
            data["abstract"] = this.abstract;
        }

        if (this.institution !== null) {
            data["institution"] = this.institution;
        }

        if (this.issue !== null) {
            data["issue"] = this.issue;
        }

        if (this.journal !== null) {
            data["journal"] = this.journal;
        }

        if (this.volume !== null) {
            data["volume"] = this.volume;
        }

        if (this.pages !== null) {
            data["pages"] = this.pages;
        }

        if (this.year !== null) {
            data["year"] = this.year;
        }

        if (this.publisher !== null) {
            data["publisher"] = this.publisher;
        }

        if (this.report !== null) {
            data["report"] = this.report;
        }

        if (this.type !== null) {
            data["type"] = this.type;
        }

        if (this.citation !== null) {
            data["citation"] = this.citation;
        }

        if (this.citeKey !== null) {
            data["citeKey"] = this.citeKey;
        }

        if (this.urls.length > 0) {
            data["url"] = this.urls.map(value => value);
        }

        if (this.dataUrls.length > 0) {
            data["dataUrl"] = this.dataUrls.map(value => value);
        }

        if (this.dOI !== null) {
            data["doi"] = this.dOI;
        }

        if (this.authors.length > 0) {
            data["author"] = this.authors.map(value => value.toJson());
        }

        if (this.firstAuthor !== null) {
            data["firstauthor"] = this.firstAuthor.toJson();
        }

        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, unknown>): Publication {
        const obj = new Publication();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "title") {
                obj.title = value ? value as string : null;
                continue;
            }

            if (key === "abstract") {
                obj.abstract = value ? value as string : null;
                continue;
            }

            if (key === "institution") {
                obj.institution = value ? value as string : null;
                continue;
            }

            if (key === "issue") {
                obj.issue = value ? value as string : null;
                continue;
            }

            if (key === "journal") {
                obj.journal = value ? value as string : null;
                continue;
            }

            if (key === "volume") {
                obj.volume = value ? value as string : null;
                continue;
            }

            if (key === "pages") {
                obj.pages = value ? value as string : null;
                continue;
            }

            if (key === "year") {
                obj.year = value ? value as number : null;
                continue;
            }

            if (key === "publisher") {
                obj.publisher = value ? value as string : null;
                continue;
            }

            if (key === "report") {
                obj.report = value ? value as string : null;
                continue;
            }

            if (key === "type") {
                obj.type = value ? value as string : null;
                continue;
            }

            if (key === "citation") {
                obj.citation = value ? value as string : null;
                continue;
            }

            if (key === "citeKey") {
                obj.citeKey = value ? value as string : null;
                continue;
            }

            if (key === "url") {
                obj.urls = Array.isArray(value) ? value.map(item => item as string) : [];
                continue;
            }

            if (key === "dataUrl") {
                obj.dataUrls = Array.isArray(value) ? value.map(item => item as string) : [];
                continue;
            }

            if (key === "doi") {
                obj.dOI = value ? value as string : null;
                continue;
            }

            if (key === "author") {
                obj.authors = Array.isArray(value) ? value.map(item => Person.fromJson(item as Record<string, unknown>)) : [];
                continue;
            }

            if (key === "firstauthor") {
                obj.firstAuthor = value ? Person.fromJson(value as Record<string, unknown>) : null;
                continue;
            }

            // Store unknown properties in misc
            obj._misc[key] = value;
        }
        return obj;
    }
}

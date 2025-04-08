
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";
import { Person } from "./person";



export class Publication {

    public abstract: string | null;
    public authors: Person[];
    public citation: string | null;
    public citeKey: string | null;
    public dOI: string | null;
    public dataUrls: string[];
    public firstAuthor: Person | null;
    public institution: string | null;
    public issue: string | null;
    public journal: string | null;
    public pages: string | null;
    public publicationType: string | null;
    public publisher: string | null;
    public report: string | null;
    public title: string | null;
    public urls: string[];
    public volume: string | null;
    public year: number | null;
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.abstract = null;
        this.authors = [];
        this.citation = null;
        this.citeKey = null;
        this.dOI = null;
        this.dataUrls = [];
        this.firstAuthor = null;
        this.institution = null;
        this.issue = null;
        this.journal = null;
        this.pages = null;
        this.publicationType = null;
        this.publisher = null;
        this.report = null;
        this.title = null;
        this.urls = [];
        this.volume = null;
        this.year = null;
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "https://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#Publication";
        this._id = this._ns + "/" + uniqid("Publication");
    }

    public getId(): string {
        return this._id;
    }

    public getType(): string {
        return this._type;
    }    

    public getMisc(): Record<string, any> {
        return this._misc;
    }
    
    public static fromDictionary(data: Record<string, any>): Publication {
        const thisObj = new Publication();
        Object.assign(thisObj, data);
        return thisObj;
    }
    public static fromData(id: string, data: Record<string, any>): Publication {
        const thisObj = new Publication();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
            }
            
            else if (key === "hasAbstract") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.abstract = obj;
                }
            }
            
            else if (key === "hasAuthor") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Person.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.authors.push(obj);
                }
            }
            
            else if (key === "hasCitation") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.citation = obj;
                }
            }
            
            else if (key === "hasCiteKey") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.citeKey = obj;
                }
            }
            
            else if (key === "hasDOI") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.dOI = obj;
                }
            }
            
            else if (key === "hasDataUrl") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.dataUrls.push(obj);
                }
            }
            
            else if (key === "hasFirstAuthor") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Person.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.firstAuthor = obj;
                }
            }
            
            else if (key === "hasInstitution") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.institution = obj;
                }
            }
            
            else if (key === "hasIssue") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.issue = obj;
                }
            }
            
            else if (key === "hasJournal") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.journal = obj;
                }
            }
            
            else if (key === "hasPages") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.pages = obj;
                }
            }
            
            else if (key === "hasPublisher") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.publisher = obj;
                }
            }
            
            else if (key === "hasReport") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.report = obj;
                }
            }
            
            else if (key === "hasTitle") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.title = obj;
                }
            }
            
            else if (key === "hasType") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.publicationType = obj;
                }
            }
            
            else if (key === "hasUrl") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.urls.push(obj);
                }
            }
            
            else if (key === "hasVolume") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.volume = obj;
                }
            }
            
            else if (key === "hasYear") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.year = obj;
                }
            }
            else {
                // Store unknown properties in misc
                for (const val of value as any[]) {
                    let obj: any;
                    if ("@id" in val) {
                        obj = data[val["@id"]];
                    } else if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj._misc[key] = obj;
                }
            }
        }
        return thisObj;
    }


    public toData(data: Record<string, any> = {}): Record<string, any> {
        data[this._id] = {};
        data[this._id]["type"] = [
            {
                "@id": this._type,
                "@type": "uri"
            }
        ]
        if (this.abstract !== null) {
            const valueObj = this.abstract;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasAbstract"] = [obj];
        }
        if (this.authors.length > 0) {
            data[this._id]["hasAuthor"] = [];
            for (const valueObj of this.authors) {
            let obj: any = null;
            if (typeof valueObj === "string") {
                obj = {
                    "@value": valueObj,
                    "@type": "literal",
                    "@datatype": "http://www.w3.org/2001/XMLSchema#string"
                }
            } else {
                obj = {
                    "@id": valueObj.getId(),
                    "@type": "uri"
                }
                data = valueObj.toData(data); 
            }
                data[this._id]["hasAuthor"].push(obj);
            }
        }
        if (this.citation !== null) {
            const valueObj = this.citation;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasCitation"] = [obj];
        }
        if (this.citeKey !== null) {
            const valueObj = this.citeKey;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasCiteKey"] = [obj];
        }
        if (this.dOI !== null) {
            const valueObj = this.dOI;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasDOI"] = [obj];
        }
        if (this.dataUrls.length > 0) {
            data[this._id]["hasDataUrl"] = [];
            for (const valueObj of this.dataUrls) {
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
                data[this._id]["hasDataUrl"].push(obj);
            }
        }
        if (this.firstAuthor !== null) {
            const valueObj = this.firstAuthor;
            let obj: any = null;
            if (typeof valueObj === "string") {
                obj = {
                    "@value": valueObj,
                    "@type": "literal",
                    "@datatype": "http://www.w3.org/2001/XMLSchema#string"
                }
            } else {
                obj = {
                    "@id": valueObj.getId(),
                    "@type": "uri"
                }
                data = valueObj.toData(data); 
            }
            data[this._id]["hasFirstAuthor"] = [obj];
        }
        if (this.institution !== null) {
            const valueObj = this.institution;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasInstitution"] = [obj];
        }
        if (this.issue !== null) {
            const valueObj = this.issue;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasIssue"] = [obj];
        }
        if (this.journal !== null) {
            const valueObj = this.journal;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasJournal"] = [obj];
        }
        if (this.pages !== null) {
            const valueObj = this.pages;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasPages"] = [obj];
        }
        if (this.publicationType !== null) {
            const valueObj = this.publicationType;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasType"] = [obj];
        }
        if (this.publisher !== null) {
            const valueObj = this.publisher;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasPublisher"] = [obj];
        }
        if (this.report !== null) {
            const valueObj = this.report;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasReport"] = [obj];
        }
        if (this.title !== null) {
            const valueObj = this.title;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasTitle"] = [obj];
        }
        if (this.urls.length > 0) {
            data[this._id]["hasUrl"] = [];
            for (const valueObj of this.urls) {
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
                data[this._id]["hasUrl"].push(obj);
            }
        }
        if (this.volume !== null) {
            const valueObj = this.volume;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasVolume"] = [obj];
        }
        if (this.year !== null) {
            const valueObj = this.year;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#integer"
            }
            data[this._id]["hasYear"] = [obj];
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[this._id][key] = [];
            let ptype: string | null = null;
            const tp = typeof value;
            if (tp === "number") {
                if (Number.isInteger(value)) {
                    ptype = "http://www.w3.org/2001/XMLSchema#integer";
                } else {
                    ptype = "http://www.w3.org/2001/XMLSchema#float";
                }
            } else if (tp === "string") {
                if (/\d{4}-\d{2}-\d{2}( |T)\d{2}:\d{2}:\d{2}/.test(value as string)) {
                    ptype = "http://www.w3.org/2001/XMLSchema#datetime";
                } else if (/\d{4}-\d{2}-\d{2}/.test(value as string)) {
                    ptype = "http://www.w3.org/2001/XMLSchema#date";
                } else {
                    ptype = "http://www.w3.org/2001/XMLSchema#string";
                }
            } else if (tp === "boolean") {
                ptype = "http://www.w3.org/2001/XMLSchema#boolean";
            }

            data[this._id][key].push({
                "@value": value,
                "@type": "literal",
                "@datatype": ptype
            });
        }
        return data;
    }

    public toJson(): Record<string, any> {
        const data: Record<string, any> = {
            "@id": this._id
        }
        if (this.abstract !== null) {
            const valueObj = this.abstract;
                const obj = valueObj
            data["abstract"] = obj;
        }
        if (this.authors.length > 0) {
            data["author"] = [];
            for (const valueObj of this.authors) {
                const obj = valueObj.toJson()
                data["author"].push(obj);
            }
        }
        if (this.citation !== null) {
            const valueObj = this.citation;
                const obj = valueObj
            data["citation"] = obj;
        }
        if (this.citeKey !== null) {
            const valueObj = this.citeKey;
                const obj = valueObj
            data["citeKey"] = obj;
        }
        if (this.dOI !== null) {
            const valueObj = this.dOI;
                const obj = valueObj
            data["doi"] = obj;
        }
        if (this.dataUrls.length > 0) {
            data["dataUrl"] = [];
            for (const valueObj of this.dataUrls) {
                const obj = valueObj
                data["dataUrl"].push(obj);
            }
        }
        if (this.firstAuthor !== null) {
            const valueObj = this.firstAuthor;
                const obj = valueObj.toJson()
            data["firstauthor"] = obj;
        }
        if (this.institution !== null) {
            const valueObj = this.institution;
                const obj = valueObj
            data["institution"] = obj;
        }
        if (this.issue !== null) {
            const valueObj = this.issue;
                const obj = valueObj
            data["issue"] = obj;
        }
        if (this.journal !== null) {
            const valueObj = this.journal;
                const obj = valueObj
            data["journal"] = obj;
        }
        if (this.pages !== null) {
            const valueObj = this.pages;
                const obj = valueObj
            data["pages"] = obj;
        }
        if (this.publicationType !== null) {
            const valueObj = this.publicationType;
                const obj = valueObj
            data["type"] = obj;
        }
        if (this.publisher !== null) {
            const valueObj = this.publisher;
                const obj = valueObj
            data["publisher"] = obj;
        }
        if (this.report !== null) {
            const valueObj = this.report;
                const obj = valueObj
            data["report"] = obj;
        }
        if (this.title !== null) {
            const valueObj = this.title;
                const obj = valueObj
            data["title"] = obj;
        }
        if (this.urls.length > 0) {
            data["url"] = [];
            for (const valueObj of this.urls) {
                const obj = valueObj
                data["url"].push(obj);
            }
        }
        if (this.volume !== null) {
            const valueObj = this.volume;
                const obj = valueObj
            data["volume"] = obj;
        }
        if (this.year !== null) {
            const valueObj = this.year;
                const obj = valueObj
            data["year"] = obj;
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): Publication {
        const thisObj = new Publication();
        for (const [key, pvalue] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = pvalue as string;
                continue;
            }
            if (key === "abstract") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.abstract = obj;
                continue;
            }
            if (key === "author") {
                let obj: any = null;
                for (const value of pvalue as any[]) {
                    obj = Person.fromJson(value)
                    thisObj.authors.push(obj);
                }
                continue;
            }
            if (key === "citation") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.citation = obj;
                continue;
            }
            if (key === "citeKey") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.citeKey = obj;
                continue;
            }
            if (key === "dataUrl") {
                let obj: any = null;
                for (const value of pvalue as any[]) {
                    obj = value
                    thisObj.dataUrls.push(obj);
                }
                continue;
            }
            if (key === "doi") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.dOI = obj;
                continue;
            }
            if (key === "firstauthor") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = Person.fromJson(value)
                thisObj.firstAuthor = obj;
                continue;
            }
            if (key === "institution") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.institution = obj;
                continue;
            }
            if (key === "issue") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.issue = obj;
                continue;
            }
            if (key === "journal") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.journal = obj;
                continue;
            }
            if (key === "pages") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.pages = obj;
                continue;
            }
            if (key === "publisher") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.publisher = obj;
                continue;
            }
            if (key === "report") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.report = obj;
                continue;
            }
            if (key === "title") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.title = obj;
                continue;
            }
            if (key === "type") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.publicationType = obj;
                continue;
            }
            if (key === "url") {
                let obj: any = null;
                for (const value of pvalue as any[]) {
                    obj = value
                    thisObj.urls.push(obj);
                }
                continue;
            }
            if (key === "volume") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.volume = obj;
                continue;
            }
            if (key === "year") {
                let obj: any = null;
                let value: any = pvalue;
                    obj = value
                thisObj.year = obj;
                continue;
            }
            // Store unknown properties in misc
            thisObj._misc[key] = pvalue;
        }
        return thisObj;
    }

    public setNonStandardProperty(key: string, value: unknown): void {
        this._misc[key] = value;
    }
    
    public getNonStandardProperty(key: string): unknown {
        return this._misc[key];
    }
                
    public getAllNonStandardProperties(): Record<string, unknown> {
        return this._misc;
    }

    public addNonStandardProperty(key: string, value: unknown): void {
        if (!(key in this._misc)) {
            this._misc[key] = [];
        }
        (this._misc[key] as unknown[]).push(value);
    }
    
    getAbstract(): string | null {
        return this.abstract;
    }

    setAbstract(abstract: string): void {
        // if (!(abstract instanceof string)) {
        //     throw new Error(`Error: '${abstract}' is not of type string`);
        // }
        this.abstract = abstract;
    }
    getAuthors(): Person[] {
        return this.authors;
    }

    setAuthors(authors: Person[]): void {
        // if (!Array.isArray(authors)) {
        //     throw new Error("Error: authors is not an array");
        // }
        // if (!authors.every(x => x instanceof Person)) {
        //     throw new Error(`Error: '${authors}' is not of type Person`);
        // }
        this.authors = authors;
    }

    addAuthor(authors: Person): void {
        // if (!(authors instanceof Person)) {
        //     throw new Error(`Error: '${authors}' is not of type Person`);
        // }
        this.authors.push(authors);
    }
    getCitation(): string | null {
        return this.citation;
    }

    setCitation(citation: string): void {
        // if (!(citation instanceof string)) {
        //     throw new Error(`Error: '${citation}' is not of type string`);
        // }
        this.citation = citation;
    }
    getCiteKey(): string | null {
        return this.citeKey;
    }

    setCiteKey(citeKey: string): void {
        // if (!(citeKey instanceof string)) {
        //     throw new Error(`Error: '${citeKey}' is not of type string`);
        // }
        this.citeKey = citeKey;
    }
    getDOI(): string | null {
        return this.dOI;
    }

    setDOI(dOI: string): void {
        // if (!(dOI instanceof string)) {
        //     throw new Error(`Error: '${dOI}' is not of type string`);
        // }
        this.dOI = dOI;
    }
    getDataUrls(): string[] {
        return this.dataUrls;
    }

    setDataUrls(dataUrls: string[]): void {
        // if (!Array.isArray(dataUrls)) {
        //     throw new Error("Error: dataUrls is not an array");
        // }
        // if (!dataUrls.every(x => x instanceof string)) {
        //     throw new Error(`Error: '${dataUrls}' is not of type string`);
        // }
        this.dataUrls = dataUrls;
    }

    addDataUrl(dataUrls: string): void {
        // if (!(dataUrls instanceof string)) {
        //     throw new Error(`Error: '${dataUrls}' is not of type string`);
        // }
        this.dataUrls.push(dataUrls);
    }
    getFirstAuthor(): Person | null {
        return this.firstAuthor;
    }

    setFirstAuthor(firstAuthor: Person): void {
        // if (!(firstAuthor instanceof Person)) {
        //     throw new Error(`Error: '${firstAuthor}' is not of type Person`);
        // }
        this.firstAuthor = firstAuthor;
    }
    getInstitution(): string | null {
        return this.institution;
    }

    setInstitution(institution: string): void {
        // if (!(institution instanceof string)) {
        //     throw new Error(`Error: '${institution}' is not of type string`);
        // }
        this.institution = institution;
    }
    getIssue(): string | null {
        return this.issue;
    }

    setIssue(issue: string): void {
        // if (!(issue instanceof string)) {
        //     throw new Error(`Error: '${issue}' is not of type string`);
        // }
        this.issue = issue;
    }
    getJournal(): string | null {
        return this.journal;
    }

    setJournal(journal: string): void {
        // if (!(journal instanceof string)) {
        //     throw new Error(`Error: '${journal}' is not of type string`);
        // }
        this.journal = journal;
    }
    getPages(): string | null {
        return this.pages;
    }

    setPages(pages: string): void {
        // if (!(pages instanceof string)) {
        //     throw new Error(`Error: '${pages}' is not of type string`);
        // }
        this.pages = pages;
    }
    getPublicationType(): string | null {
        return this.publicationType;
    }

    setPublicationType(publicationType: string): void {
        // if (!(publicationType instanceof string)) {
        //     throw new Error(`Error: '${publicationType}' is not of type string`);
        // }
        this.publicationType = publicationType;
    }
    getPublisher(): string | null {
        return this.publisher;
    }

    setPublisher(publisher: string): void {
        // if (!(publisher instanceof string)) {
        //     throw new Error(`Error: '${publisher}' is not of type string`);
        // }
        this.publisher = publisher;
    }
    getReport(): string | null {
        return this.report;
    }

    setReport(report: string): void {
        // if (!(report instanceof string)) {
        //     throw new Error(`Error: '${report}' is not of type string`);
        // }
        this.report = report;
    }
    getTitle(): string | null {
        return this.title;
    }

    setTitle(title: string): void {
        // if (!(title instanceof string)) {
        //     throw new Error(`Error: '${title}' is not of type string`);
        // }
        this.title = title;
    }
    getUrls(): string[] {
        return this.urls;
    }

    setUrls(urls: string[]): void {
        // if (!Array.isArray(urls)) {
        //     throw new Error("Error: urls is not an array");
        // }
        // if (!urls.every(x => x instanceof string)) {
        //     throw new Error(`Error: '${urls}' is not of type string`);
        // }
        this.urls = urls;
    }

    addUrl(urls: string): void {
        // if (!(urls instanceof string)) {
        //     throw new Error(`Error: '${urls}' is not of type string`);
        // }
        this.urls.push(urls);
    }
    getVolume(): string | null {
        return this.volume;
    }

    setVolume(volume: string): void {
        // if (!(volume instanceof string)) {
        //     throw new Error(`Error: '${volume}' is not of type string`);
        // }
        this.volume = volume;
    }
    getYear(): number | null {
        return this.year;
    }

    setYear(year: number): void {
        // if (!(year instanceof number)) {
        //     throw new Error(`Error: '${year}' is not of type number`);
        // }
        this.year = year;
    }
}

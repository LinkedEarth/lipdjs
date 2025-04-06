
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";
import { ArchiveType } from "./archivetype";
import { ChangeLog } from "./changelog";
import { ChronData } from "./chrondata";
import { Funding } from "./funding";
import { Location } from "./location";
import { PaleoData } from "./paleodata";
import { Person } from "./person";
import { Publication } from "./publication";



export class Dataset {

    protected archiveType: ArchiveType | null;
    protected changeLog: ChangeLog | null;
    protected chronData: ChronData[];
    protected collectionName: string | null;
    protected collectionYear: string | null;
    protected compilationNest: string | null;
    protected contributor: Person | null;
    protected creators: Person[];
    protected dataSource: string | null;
    protected datasetId: string | null;
    protected fundings: Funding[];
    protected investigators: Person[];
    protected location: Location | null;
    protected name: string | null;
    protected notes: string | null;
    protected originalDataUrl: string | null;
    protected paleoData: PaleoData[];
    protected publications: Publication[];
    protected spreadsheetLink: string | null;
    protected version: string | null;
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.archiveType = null;
        this.changeLog = null;
        this.chronData = [];
        this.collectionName = null;
        this.collectionYear = null;
        this.compilationNest = null;
        this.contributor = null;
        this.creators = [];
        this.dataSource = null;
        this.datasetId = null;
        this.fundings = [];
        this.investigators = [];
        this.location = null;
        this.name = null;
        this.notes = null;
        this.originalDataUrl = null;
        this.paleoData = [];
        this.publications = [];
        this.spreadsheetLink = null;
        this.version = null;
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "https://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#Dataset";
        this._id = this._ns + "/" + uniqid("Dataset");
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
    
    public static fromData(id: string, data: Record<string, any>): Dataset {
        const thisObj = new Dataset();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
            }
            
            else if (key === "hasArchiveType") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = ArchiveType.fromSynonym(val["@id"].replace(/^.*?#/, ""));
                    thisObj.archiveType = obj;
                }
            }
            
            else if (key === "hasChangeLog") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = ChangeLog.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.changeLog = obj;
                }
            }
            
            else if (key === "hasChronData") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = ChronData.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.chronData.push(obj);
                }
            }
            
            else if (key === "hasCollectionName") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.collectionName = obj;
                }
            }
            
            else if (key === "hasCollectionYear") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.collectionYear = obj;
                }
            }
            
            else if (key === "hasCompilationNest") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.compilationNest = obj;
                }
            }
            
            else if (key === "hasContributor") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Person.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.contributor = obj;
                }
            }
            
            else if (key === "hasCreator") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Person.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.creators.push(obj);
                }
            }
            
            else if (key === "hasDataSource") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.dataSource = obj;
                }
            }
            
            else if (key === "hasDatasetId") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.datasetId = obj;
                }
            }
            
            else if (key === "hasFunding") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Funding.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.fundings.push(obj);
                }
            }
            
            else if (key === "hasInvestigator") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Person.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.investigators.push(obj);
                }
            }
            
            else if (key === "hasLocation") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Location.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.location = obj;
                }
            }
            
            else if (key === "hasName") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.name = obj;
                }
            }
            
            else if (key === "hasNotes") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.notes = obj;
                }
            }
            
            else if (key === "hasOriginalDataUrl") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.originalDataUrl = obj;
                }
            }
            
            else if (key === "hasPaleoData") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = PaleoData.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.paleoData.push(obj);
                }
            }
            
            else if (key === "hasPublication") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@id" in val) {
                        obj = Publication.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }
                    thisObj.publications.push(obj);
                }
            }
            
            else if (key === "hasSpreadsheetLink") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.spreadsheetLink = obj;
                }
            }
            
            else if (key === "hasVersion") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.version = obj;
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
        if (this.archiveType !== null) {
            const valueObj = this.archiveType;
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
            data[this._id]["hasArchiveType"] = [obj];
        }
        if (this.changeLog !== null) {
            const valueObj = this.changeLog;
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
            data[this._id]["hasChangeLog"] = [obj];
        }
        if (this.chronData.length > 0) {
            data[this._id]["hasChronData"] = [];
            for (const valueObj of this.chronData) {
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
                data[this._id]["hasChronData"].push(obj);
            }
        }
        if (this.collectionName !== null) {
            const valueObj = this.collectionName;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasCollectionName"] = [obj];
        }
        if (this.collectionYear !== null) {
            const valueObj = this.collectionYear;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasCollectionYear"] = [obj];
        }
        if (this.compilationNest !== null) {
            const valueObj = this.compilationNest;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasCompilationNest"] = [obj];
        }
        if (this.contributor !== null) {
            const valueObj = this.contributor;
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
            data[this._id]["hasContributor"] = [obj];
        }
        if (this.creators.length > 0) {
            data[this._id]["hasCreator"] = [];
            for (const valueObj of this.creators) {
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
                data[this._id]["hasCreator"].push(obj);
            }
        }
        if (this.dataSource !== null) {
            const valueObj = this.dataSource;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasDataSource"] = [obj];
        }
        if (this.datasetId !== null) {
            const valueObj = this.datasetId;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasDatasetId"] = [obj];
        }
        if (this.fundings.length > 0) {
            data[this._id]["hasFunding"] = [];
            for (const valueObj of this.fundings) {
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
                data[this._id]["hasFunding"].push(obj);
            }
        }
        if (this.investigators.length > 0) {
            data[this._id]["hasInvestigator"] = [];
            for (const valueObj of this.investigators) {
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
                data[this._id]["hasInvestigator"].push(obj);
            }
        }
        if (this.location !== null) {
            const valueObj = this.location;
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
            data[this._id]["hasLocation"] = [obj];
        }
        if (this.name !== null) {
            const valueObj = this.name;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasName"] = [obj];
        }
        if (this.notes !== null) {
            const valueObj = this.notes;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasNotes"] = [obj];
        }
        if (this.originalDataUrl !== null) {
            const valueObj = this.originalDataUrl;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasOriginalDataUrl"] = [obj];
        }
        if (this.paleoData.length > 0) {
            data[this._id]["hasPaleoData"] = [];
            for (const valueObj of this.paleoData) {
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
                data[this._id]["hasPaleoData"].push(obj);
            }
        }
        if (this.publications.length > 0) {
            data[this._id]["hasPublication"] = [];
            for (const valueObj of this.publications) {
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
                data[this._id]["hasPublication"].push(obj);
            }
        }
        if (this.spreadsheetLink !== null) {
            const valueObj = this.spreadsheetLink;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasSpreadsheetLink"] = [obj];
        }
        if (this.version !== null) {
            const valueObj = this.version;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasVersion"] = [obj];
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
        if (this.archiveType !== null) {
            const valueObj = this.archiveType;
                const obj = valueObj.toJson()
            data["archiveType"] = obj;
        }
        if (this.changeLog !== null) {
            const valueObj = this.changeLog;
                const obj = valueObj.toJson()
            data["changelog"] = obj;
        }
        if (this.chronData.length > 0) {
            data["chronData"] = [];
            for (const valueObj of this.chronData) {
                const obj = valueObj.toJson()
                data["chronData"].push(obj);
            }
        }
        if (this.collectionName !== null) {
            const valueObj = this.collectionName;
                const obj = valueObj
            data["collectionName"] = obj;
        }
        if (this.collectionYear !== null) {
            const valueObj = this.collectionYear;
                const obj = valueObj
            data["collectionYear"] = obj;
        }
        if (this.compilationNest !== null) {
            const valueObj = this.compilationNest;
                const obj = valueObj
            data["compilation_nest"] = obj;
        }
        if (this.contributor !== null) {
            const valueObj = this.contributor;
                const obj = valueObj.toJson()
            data["dataContributor"] = obj;
        }
        if (this.creators.length > 0) {
            data["creator"] = [];
            for (const valueObj of this.creators) {
                const obj = valueObj.toJson()
                data["creator"].push(obj);
            }
        }
        if (this.dataSource !== null) {
            const valueObj = this.dataSource;
                const obj = valueObj
            data["dataSource"] = obj;
        }
        if (this.datasetId !== null) {
            const valueObj = this.datasetId;
                const obj = valueObj
            data["datasetId"] = obj;
        }
        if (this.fundings.length > 0) {
            data["funding"] = [];
            for (const valueObj of this.fundings) {
                const obj = valueObj.toJson()
                data["funding"].push(obj);
            }
        }
        if (this.investigators.length > 0) {
            data["investigator"] = [];
            for (const valueObj of this.investigators) {
                const obj = valueObj.toJson()
                data["investigator"].push(obj);
            }
        }
        if (this.location !== null) {
            const valueObj = this.location;
                const obj = valueObj.toJson()
            data["geo"] = obj;
        }
        if (this.name !== null) {
            const valueObj = this.name;
                const obj = valueObj
            data["dataSetName"] = obj;
        }
        if (this.notes !== null) {
            const valueObj = this.notes;
                const obj = valueObj
            data["notes"] = obj;
        }
        if (this.originalDataUrl !== null) {
            const valueObj = this.originalDataUrl;
                const obj = valueObj
            data["originalDataURL"] = obj;
        }
        if (this.paleoData.length > 0) {
            data["paleoData"] = [];
            for (const valueObj of this.paleoData) {
                const obj = valueObj.toJson()
                data["paleoData"].push(obj);
            }
        }
        if (this.publications.length > 0) {
            data["pub"] = [];
            for (const valueObj of this.publications) {
                const obj = valueObj.toJson()
                data["pub"].push(obj);
            }
        }
        if (this.spreadsheetLink !== null) {
            const valueObj = this.spreadsheetLink;
                const obj = valueObj
            data["googleSpreadSheetKey"] = obj;
        }
        if (this.version !== null) {
            const valueObj = this.version;
                const obj = valueObj
            data["dataSetVersion"] = obj;
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): Dataset {
        const thisObj = new Dataset();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = value as string;
                continue;
            }
            if (key === "archiveType") {
                let obj: any = null;
                    obj = ArchiveType.fromSynonym(value.replace(/^.*?#/, ""))
                thisObj.archiveType = obj;
                continue;
            }
            if (key === "changelog") {
                let obj: any = null;
                    obj = ChangeLog.fromJson(value)
                thisObj.changeLog = obj;
                continue;
            }
            if (key === "chronData") {
                let obj: any = null;
                if (Array.isArray(value)) {
                    obj = ChronData.fromJson(value)
                    thisObj.chronData.push(obj);
                }
                continue;
            }
            if (key === "collectionName") {
                let obj: any = null;
                    obj = value
                thisObj.collectionName = obj;
                continue;
            }
            if (key === "collectionYear") {
                let obj: any = null;
                    obj = value
                thisObj.collectionYear = obj;
                continue;
            }
            if (key === "compilation_nest") {
                let obj: any = null;
                    obj = value
                thisObj.compilationNest = obj;
                continue;
            }
            if (key === "creator") {
                let obj: any = null;
                if (Array.isArray(value)) {
                    obj = Person.fromJson(value)
                    thisObj.creators.push(obj);
                }
                continue;
            }
            if (key === "dataContributor") {
                let obj: any = null;
                    obj = Person.fromJson(value)
                thisObj.contributor = obj;
                continue;
            }
            if (key === "dataSetName") {
                let obj: any = null;
                    obj = value
                thisObj.name = obj;
                continue;
            }
            if (key === "dataSetVersion") {
                let obj: any = null;
                    obj = value
                thisObj.version = obj;
                continue;
            }
            if (key === "dataSource") {
                let obj: any = null;
                    obj = value
                thisObj.dataSource = obj;
                continue;
            }
            if (key === "datasetId") {
                let obj: any = null;
                    obj = value
                thisObj.datasetId = obj;
                continue;
            }
            if (key === "funding") {
                let obj: any = null;
                if (Array.isArray(value)) {
                    obj = Funding.fromJson(value)
                    thisObj.fundings.push(obj);
                }
                continue;
            }
            if (key === "geo") {
                let obj: any = null;
                    obj = Location.fromJson(value)
                thisObj.location = obj;
                continue;
            }
            if (key === "googleSpreadSheetKey") {
                let obj: any = null;
                    obj = value
                thisObj.spreadsheetLink = obj;
                continue;
            }
            if (key === "investigator") {
                let obj: any = null;
                if (Array.isArray(value)) {
                    obj = Person.fromJson(value)
                    thisObj.investigators.push(obj);
                }
                continue;
            }
            if (key === "notes") {
                let obj: any = null;
                    obj = value
                thisObj.notes = obj;
                continue;
            }
            if (key === "originalDataURL") {
                let obj: any = null;
                    obj = value
                thisObj.originalDataUrl = obj;
                continue;
            }
            if (key === "paleoData") {
                let obj: any = null;
                if (Array.isArray(value)) {
                    obj = PaleoData.fromJson(value)
                    thisObj.paleoData.push(obj);
                }
                continue;
            }
            if (key === "pub") {
                let obj: any = null;
                if (Array.isArray(value)) {
                    obj = Publication.fromJson(value)
                    thisObj.publications.push(obj);
                }
                continue;
            }
            // Store unknown properties in misc
            thisObj._misc[key] = value;
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
    
    getArchiveType(): ArchiveType | null {
        return this.archiveType;
    }

    setArchiveType(archiveType: ArchiveType): void {
        // if (!(archiveType instanceof ArchiveType)) {
        //     throw new Error(`Error: '${archiveType}' is not of type ArchiveType\nYou can create a new ArchiveType object from a string using the following syntax:\n- Fetch existing ArchiveType by synonym: ArchiveType.fromSynonym("${archiveType}")\n- Create a new custom ArchiveType: new ArchiveType("${archiveType}")`);
        // }
        this.archiveType = archiveType;
    }
    getChangeLog(): ChangeLog | null {
        return this.changeLog;
    }

    setChangeLog(changeLog: ChangeLog): void {
        // if (!(changeLog instanceof ChangeLog)) {
        //     throw new Error(`Error: '${changeLog}' is not of type ChangeLog`);
        // }
        this.changeLog = changeLog;
    }
    getChronData(): ChronData[] {
        return this.chronData;
    }

    setChronData(chronData: ChronData[]): void {
        // if (!Array.isArray(chronData)) {
        //     throw new Error("Error: chronData is not an array");
        // }
        // if (!chronData.every(x => x instanceof ChronData)) {
        //     throw new Error(`Error: '${chronData}' is not of type ChronData`);
        // }
        this.chronData = chronData;
    }

    addChronData(chronData: ChronData): void {
        // if (!(chronData instanceof ChronData)) {
        //     throw new Error(`Error: '${chronData}' is not of type ChronData`);
        // }
        this.chronData.push(chronData);
    }
    getCollectionName(): string | null {
        return this.collectionName;
    }

    setCollectionName(collectionName: string): void {
        // if (!(collectionName instanceof string)) {
        //     throw new Error(`Error: '${collectionName}' is not of type string`);
        // }
        this.collectionName = collectionName;
    }
    getCollectionYear(): string | null {
        return this.collectionYear;
    }

    setCollectionYear(collectionYear: string): void {
        // if (!(collectionYear instanceof string)) {
        //     throw new Error(`Error: '${collectionYear}' is not of type string`);
        // }
        this.collectionYear = collectionYear;
    }
    getCompilationNest(): string | null {
        return this.compilationNest;
    }

    setCompilationNest(compilationNest: string): void {
        // if (!(compilationNest instanceof string)) {
        //     throw new Error(`Error: '${compilationNest}' is not of type string`);
        // }
        this.compilationNest = compilationNest;
    }
    getContributor(): Person | null {
        return this.contributor;
    }

    setContributor(contributor: Person): void {
        // if (!(contributor instanceof Person)) {
        //     throw new Error(`Error: '${contributor}' is not of type Person`);
        // }
        this.contributor = contributor;
    }
    getCreators(): Person[] {
        return this.creators;
    }

    setCreators(creators: Person[]): void {
        // if (!Array.isArray(creators)) {
        //     throw new Error("Error: creators is not an array");
        // }
        // if (!creators.every(x => x instanceof Person)) {
        //     throw new Error(`Error: '${creators}' is not of type Person`);
        // }
        this.creators = creators;
    }

    addCreator(creators: Person): void {
        // if (!(creators instanceof Person)) {
        //     throw new Error(`Error: '${creators}' is not of type Person`);
        // }
        this.creators.push(creators);
    }
    getDataSource(): string | null {
        return this.dataSource;
    }

    setDataSource(dataSource: string): void {
        // if (!(dataSource instanceof string)) {
        //     throw new Error(`Error: '${dataSource}' is not of type string`);
        // }
        this.dataSource = dataSource;
    }
    getDatasetId(): string | null {
        return this.datasetId;
    }

    setDatasetId(datasetId: string): void {
        // if (!(datasetId instanceof string)) {
        //     throw new Error(`Error: '${datasetId}' is not of type string`);
        // }
        this.datasetId = datasetId;
    }
    getFundings(): Funding[] {
        return this.fundings;
    }

    setFundings(fundings: Funding[]): void {
        // if (!Array.isArray(fundings)) {
        //     throw new Error("Error: fundings is not an array");
        // }
        // if (!fundings.every(x => x instanceof Funding)) {
        //     throw new Error(`Error: '${fundings}' is not of type Funding`);
        // }
        this.fundings = fundings;
    }

    addFunding(fundings: Funding): void {
        // if (!(fundings instanceof Funding)) {
        //     throw new Error(`Error: '${fundings}' is not of type Funding`);
        // }
        this.fundings.push(fundings);
    }
    getInvestigators(): Person[] {
        return this.investigators;
    }

    setInvestigators(investigators: Person[]): void {
        // if (!Array.isArray(investigators)) {
        //     throw new Error("Error: investigators is not an array");
        // }
        // if (!investigators.every(x => x instanceof Person)) {
        //     throw new Error(`Error: '${investigators}' is not of type Person`);
        // }
        this.investigators = investigators;
    }

    addInvestigator(investigators: Person): void {
        // if (!(investigators instanceof Person)) {
        //     throw new Error(`Error: '${investigators}' is not of type Person`);
        // }
        this.investigators.push(investigators);
    }
    getLocation(): Location | null {
        return this.location;
    }

    setLocation(location: Location): void {
        // if (!(location instanceof Location)) {
        //     throw new Error(`Error: '${location}' is not of type Location`);
        // }
        this.location = location;
    }
    getName(): string | null {
        return this.name;
    }

    setName(name: string): void {
        // if (!(name instanceof string)) {
        //     throw new Error(`Error: '${name}' is not of type string`);
        // }
        this.name = name;
        this._id = this._ns + '/' + name; // This is a hack to set the id of the dataset based on the name
    }
    getNotes(): string | null {
        return this.notes;
    }

    setNotes(notes: string): void {
        // if (!(notes instanceof string)) {
        //     throw new Error(`Error: '${notes}' is not of type string`);
        // }
        this.notes = notes;
    }
    getOriginalDataUrl(): string | null {
        return this.originalDataUrl;
    }

    setOriginalDataUrl(originalDataUrl: string): void {
        // if (!(originalDataUrl instanceof string)) {
        //     throw new Error(`Error: '${originalDataUrl}' is not of type string`);
        // }
        this.originalDataUrl = originalDataUrl;
    }
    getPaleoData(): PaleoData[] {
        return this.paleoData;
    }

    setPaleoData(paleoData: PaleoData[]): void {
        // if (!Array.isArray(paleoData)) {
        //     throw new Error("Error: paleoData is not an array");
        // }
        // if (!paleoData.every(x => x instanceof PaleoData)) {
        //     throw new Error(`Error: '${paleoData}' is not of type PaleoData`);
        // }
        this.paleoData = paleoData;
    }

    addPaleoData(paleoData: PaleoData): void {
        // if (!(paleoData instanceof PaleoData)) {
        //     throw new Error(`Error: '${paleoData}' is not of type PaleoData`);
        // }
        this.paleoData.push(paleoData);
    }
    getPublications(): Publication[] {
        return this.publications;
    }

    setPublications(publications: Publication[]): void {
        // if (!Array.isArray(publications)) {
        //     throw new Error("Error: publications is not an array");
        // }
        // if (!publications.every(x => x instanceof Publication)) {
        //     throw new Error(`Error: '${publications}' is not of type Publication`);
        // }
        this.publications = publications;
    }

    addPublication(publications: Publication): void {
        // if (!(publications instanceof Publication)) {
        //     throw new Error(`Error: '${publications}' is not of type Publication`);
        // }
        this.publications.push(publications);
    }
    getSpreadsheetLink(): string | null {
        return this.spreadsheetLink;
    }

    setSpreadsheetLink(spreadsheetLink: string): void {
        // if (!(spreadsheetLink instanceof string)) {
        //     throw new Error(`Error: '${spreadsheetLink}' is not of type string`);
        // }
        this.spreadsheetLink = spreadsheetLink;
    }
    getVersion(): string | null {
        return this.version;
    }

    setVersion(version: string): void {
        // if (!(version instanceof string)) {
        //     throw new Error(`Error: '${version}' is not of type string`);
        // }
        this.version = version;
    }
}


// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";



export class Location {

    protected continent: string | null;
    protected coordinates: string | null;
    protected coordinatesFor: null | null;
    protected country: string | null;
    protected countryOcean: string | null;
    protected description: string | null;
    protected elevation: string | null;
    protected geometryType: string | null;
    protected latitude: string | null;
    protected locationName: string | null;
    protected locationType: string | null;
    protected longitude: string | null;
    protected notes: string | null;
    protected ocean: string | null;
    protected siteName: string | null;
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {
        this.continent = null;
        this.coordinates = null;
        this.coordinatesFor = null;
        this.country = null;
        this.countryOcean = null;
        this.description = null;
        this.elevation = null;
        this.geometryType = null;
        this.latitude = null;
        this.locationName = null;
        this.locationType = null;
        this.longitude = null;
        this.notes = null;
        this.ocean = null;
        this.siteName = null;
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "https://linked.earth/lipd";
        this._type = "http://linked.earth/ontology#Location";
        this._id = this._ns + "/" + uniqid("Location");
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
    
    public static fromData(id: string, data: Record<string, any>): Location {
        const thisObj = new Location();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
            }
            
            else if (key === "coordinates") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.coordinates = obj;
                }
            }
            
            else if (key === "coordinatesFor") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    obj = val["@id"];
                    thisObj.coordinatesFor = obj;
                }
            }
            
            else if (key === "hasContinent") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.continent = obj;
                }
            }
            
            else if (key === "hasCountry") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.country = obj;
                }
            }
            
            else if (key === "hasCountryOcean") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.countryOcean = obj;
                }
            }
            
            else if (key === "hasDescription") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.description = obj;
                }
            }
            
            else if (key === "hasElevation") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.elevation = obj;
                }
            }
            
            else if (key === "hasGeometryType") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.geometryType = obj;
                }
            }
            
            else if (key === "hasLatitude") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.latitude = obj;
                }
            }
            
            else if (key === "hasLocationName") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.locationName = obj;
                }
            }
            
            else if (key === "hasLongitude") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.longitude = obj;
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
            
            else if (key === "hasOcean") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.ocean = obj;
                }
            }
            
            else if (key === "hasSiteName") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.siteName = obj;
                }
            }
            
            else if (key === "hasType") {
                for (const val of value as any[]) {
                    let obj: any = null;
                    if ("@value" in val) {
                        obj = val["@value"];
                    }
                    thisObj.locationType = obj;
                }
            }
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
        if (this.continent !== null) {
            const valueObj = this.continent;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasContinent"] = [obj];
        }
        if (this.coordinates !== null) {
            const valueObj = this.coordinates;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["coordinates"] = [obj];
        }
        if (this.coordinatesFor !== null) {
            const valueObj = this.coordinatesFor;
            const obj = {
                "@id": valueObj,
                "@type": "uri"
            }
            data[this._id]["coordinatesFor"] = [obj];
        }
        if (this.country !== null) {
            const valueObj = this.country;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasCountry"] = [obj];
        }
        if (this.countryOcean !== null) {
            const valueObj = this.countryOcean;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasCountryOcean"] = [obj];
        }
        if (this.description !== null) {
            const valueObj = this.description;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasDescription"] = [obj];
        }
        if (this.elevation !== null) {
            const valueObj = this.elevation;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasElevation"] = [obj];
        }
        if (this.geometryType !== null) {
            const valueObj = this.geometryType;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasGeometryType"] = [obj];
        }
        if (this.latitude !== null) {
            const valueObj = this.latitude;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasLatitude"] = [obj];
        }
        if (this.locationName !== null) {
            const valueObj = this.locationName;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasLocationName"] = [obj];
        }
        if (this.locationType !== null) {
            const valueObj = this.locationType;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasType"] = [obj];
        }
        if (this.longitude !== null) {
            const valueObj = this.longitude;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasLongitude"] = [obj];
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
        if (this.ocean !== null) {
            const valueObj = this.ocean;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasOcean"] = [obj];
        }
        if (this.siteName !== null) {
            const valueObj = this.siteName;
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#string"
            }
            data[this._id]["hasSiteName"] = [obj];
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
        if (this.continent !== null) {
            const valueObj = this.continent;
                const obj = valueObj
            data["continent"] = obj;
        }
        if (this.coordinates !== null) {
            const valueObj = this.coordinates;
                const obj = valueObj
            data["coordinates"] = obj;
        }
        if (this.coordinatesFor !== null) {
            const valueObj = this.coordinatesFor;
                const obj = valueObj
            data["coordinatesFor"] = obj;
        }
        if (this.country !== null) {
            const valueObj = this.country;
                const obj = valueObj
            data["country"] = obj;
        }
        if (this.countryOcean !== null) {
            const valueObj = this.countryOcean;
                const obj = valueObj
            data["countryOcean"] = obj;
        }
        if (this.description !== null) {
            const valueObj = this.description;
                const obj = valueObj
            data["description"] = obj;
        }
        if (this.elevation !== null) {
            const valueObj = this.elevation;
                const obj = valueObj
            data["elevation"] = obj;
        }
        if (this.geometryType !== null) {
            const valueObj = this.geometryType;
                const obj = valueObj
            data["geometryType"] = obj;
        }
        if (this.latitude !== null) {
            const valueObj = this.latitude;
                const obj = valueObj
            data["latitude"] = obj;
        }
        if (this.locationName !== null) {
            const valueObj = this.locationName;
                const obj = valueObj
            data["locationName"] = obj;
        }
        if (this.locationType !== null) {
            const valueObj = this.locationType;
                const obj = valueObj
            data["type"] = obj;
        }
        if (this.longitude !== null) {
            const valueObj = this.longitude;
                const obj = valueObj
            data["longitude"] = obj;
        }
        if (this.notes !== null) {
            const valueObj = this.notes;
                const obj = valueObj
            data["notes"] = obj;
        }
        if (this.ocean !== null) {
            const valueObj = this.ocean;
                const obj = valueObj
            data["ocean"] = obj;
        }
        if (this.siteName !== null) {
            const valueObj = this.siteName;
                const obj = valueObj
            data["siteName"] = obj;
        }
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }

    public static fromJson(data: Record<string, any>): Location {
        const thisObj = new Location();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = value as string;
                continue;
            }
            if (key === "continent") {
                let obj: any = null;
                    obj = value
                thisObj.continent = obj;
                continue;
            }
            if (key === "coordinates") {
                let obj: any = null;
                    obj = value
                thisObj.coordinates = obj;
                continue;
            }
            if (key === "coordinatesFor") {
                let obj: any = null;
                    obj = value
                thisObj.coordinatesFor = obj;
                continue;
            }
            if (key === "country") {
                let obj: any = null;
                    obj = value
                thisObj.country = obj;
                continue;
            }
            if (key === "countryOcean") {
                let obj: any = null;
                    obj = value
                thisObj.countryOcean = obj;
                continue;
            }
            if (key === "description") {
                let obj: any = null;
                    obj = value
                thisObj.description = obj;
                continue;
            }
            if (key === "elevation") {
                let obj: any = null;
                    obj = value
                thisObj.elevation = obj;
                continue;
            }
            if (key === "geometryType") {
                let obj: any = null;
                    obj = value
                thisObj.geometryType = obj;
                continue;
            }
            if (key === "latitude") {
                let obj: any = null;
                    obj = value
                thisObj.latitude = obj;
                continue;
            }
            if (key === "locationName") {
                let obj: any = null;
                    obj = value
                thisObj.locationName = obj;
                continue;
            }
            if (key === "longitude") {
                let obj: any = null;
                    obj = value
                thisObj.longitude = obj;
                continue;
            }
            if (key === "notes") {
                let obj: any = null;
                    obj = value
                thisObj.notes = obj;
                continue;
            }
            if (key === "ocean") {
                let obj: any = null;
                    obj = value
                thisObj.ocean = obj;
                continue;
            }
            if (key === "siteName") {
                let obj: any = null;
                    obj = value
                thisObj.siteName = obj;
                continue;
            }
            if (key === "type") {
                let obj: any = null;
                    obj = value
                thisObj.locationType = obj;
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
    
    getContinent(): string | null {
        return this.continent;
    }

    setContinent(continent: string): void {
        // if (!(continent instanceof string)) {
        //     throw new Error(`Error: '${continent}' is not of type string`);
        // }
        this.continent = continent;
    }
    getCoordinates(): string | null {
        return this.coordinates;
    }

    setCoordinates(coordinates: string): void {
        // if (!(coordinates instanceof string)) {
        //     throw new Error(`Error: '${coordinates}' is not of type string`);
        // }
        this.coordinates = coordinates;
    }
    getCoordinatesFor(): null | null {
        return this.coordinatesFor;
    }

    setCoordinatesFor(coordinatesFor: null): void {
        // if (!(coordinatesFor instanceof null)) {
        //     throw new Error(`Error: '${coordinatesFor}' is not of type null`);
        // }
        this.coordinatesFor = coordinatesFor;
    }
    getCountry(): string | null {
        return this.country;
    }

    setCountry(country: string): void {
        // if (!(country instanceof string)) {
        //     throw new Error(`Error: '${country}' is not of type string`);
        // }
        this.country = country;
    }
    getCountryOcean(): string | null {
        return this.countryOcean;
    }

    setCountryOcean(countryOcean: string): void {
        // if (!(countryOcean instanceof string)) {
        //     throw new Error(`Error: '${countryOcean}' is not of type string`);
        // }
        this.countryOcean = countryOcean;
    }
    getDescription(): string | null {
        return this.description;
    }

    setDescription(description: string): void {
        // if (!(description instanceof string)) {
        //     throw new Error(`Error: '${description}' is not of type string`);
        // }
        this.description = description;
    }
    getElevation(): string | null {
        return this.elevation;
    }

    setElevation(elevation: string): void {
        // if (!(elevation instanceof string)) {
        //     throw new Error(`Error: '${elevation}' is not of type string`);
        // }
        this.elevation = elevation;
    }
    getGeometryType(): string | null {
        return this.geometryType;
    }

    setGeometryType(geometryType: string): void {
        // if (!(geometryType instanceof string)) {
        //     throw new Error(`Error: '${geometryType}' is not of type string`);
        // }
        this.geometryType = geometryType;
    }
    getLatitude(): string | null {
        return this.latitude;
    }

    setLatitude(latitude: string): void {
        // if (!(latitude instanceof string)) {
        //     throw new Error(`Error: '${latitude}' is not of type string`);
        // }
        this.latitude = latitude;
    }
    getLocationName(): string | null {
        return this.locationName;
    }

    setLocationName(locationName: string): void {
        // if (!(locationName instanceof string)) {
        //     throw new Error(`Error: '${locationName}' is not of type string`);
        // }
        this.locationName = locationName;
    }
    getLocationType(): string | null {
        return this.locationType;
    }

    setLocationType(locationType: string): void {
        // if (!(locationType instanceof string)) {
        //     throw new Error(`Error: '${locationType}' is not of type string`);
        // }
        this.locationType = locationType;
    }
    getLongitude(): string | null {
        return this.longitude;
    }

    setLongitude(longitude: string): void {
        // if (!(longitude instanceof string)) {
        //     throw new Error(`Error: '${longitude}' is not of type string`);
        // }
        this.longitude = longitude;
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
    getOcean(): string | null {
        return this.ocean;
    }

    setOcean(ocean: string): void {
        // if (!(ocean instanceof string)) {
        //     throw new Error(`Error: '${ocean}' is not of type string`);
        // }
        this.ocean = ocean;
    }
    getSiteName(): string | null {
        return this.siteName;
    }

    setSiteName(siteName: string): void {
        // if (!(siteName instanceof string)) {
        //     throw new Error(`Error: '${siteName}' is not of type string`);
        // }
        this.siteName = siteName;
    }
}

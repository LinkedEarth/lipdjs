
// Auto-generated. Do not edit.


type LocationProperty = boolean | null | number | string;

export class Location {
    [key: string]: LocationProperty | LocationProperty[] | Record<string, unknown> | unknown | ((...args: unknown[]) => unknown);
    private _id: string;
    private _type: string;
    private _misc: Record<string, unknown>;
    private _ontns: string;
    private _ns: string;
    private coordinates: string | null = null;
    private coordinatesFor: string | null = null;
    private type: string | null = null;
    private continent: string | null = null;
    private country: string | null = null;
    private countryOcean: string | null = null;
    private description: string | null = null;
    private elevation: string | null = null;
    private geometryType: string | null = null;
    private latitude: string | null = null;
    private longitude: string | null = null;
    private locationName: string | null = null;
    private ocean: string | null = null;
    private siteName: string | null = null;
    private notes: string | null = null;

    constructor() {
        this._id = "";
        this._type = "";
        this._misc = {};
        this._ontns = "http://linked.earth/ontology#";
        this._ns = "http://linked.earth/data#";
    }

    public getCoordinates(): string | null {
        return this.coordinates;
    }

    public setCoordinates(value: string | null): void {
        this.coordinates = value;
    }

    public getCoordinatesFor(): string | null {
        return this.coordinatesFor;
    }

    public setCoordinatesFor(value: string | null): void {
        this.coordinatesFor = value;
    }

    public getType(): string | null {
        return this.type;
    }

    public setType(value: string | null): void {
        this.type = value;
    }

    public getContinent(): string | null {
        return this.continent;
    }

    public setContinent(value: string | null): void {
        this.continent = value;
    }

    public getCountry(): string | null {
        return this.country;
    }

    public setCountry(value: string | null): void {
        this.country = value;
    }

    public getCountryOcean(): string | null {
        return this.countryOcean;
    }

    public setCountryOcean(value: string | null): void {
        this.countryOcean = value;
    }

    public getDescription(): string | null {
        return this.description;
    }

    public setDescription(value: string | null): void {
        this.description = value;
    }

    public getElevation(): string | null {
        return this.elevation;
    }

    public setElevation(value: string | null): void {
        this.elevation = value;
    }

    public getGeometryType(): string | null {
        return this.geometryType;
    }

    public setGeometryType(value: string | null): void {
        this.geometryType = value;
    }

    public getLatitude(): string | null {
        return this.latitude;
    }

    public setLatitude(value: string | null): void {
        this.latitude = value;
    }

    public getLongitude(): string | null {
        return this.longitude;
    }

    public setLongitude(value: string | null): void {
        this.longitude = value;
    }

    public getLocationName(): string | null {
        return this.locationName;
    }

    public setLocationName(value: string | null): void {
        this.locationName = value;
    }

    public getOcean(): string | null {
        return this.ocean;
    }

    public setOcean(value: string | null): void {
        this.ocean = value;
    }

    public getSiteName(): string | null {
        return this.siteName;
    }

    public setSiteName(value: string | null): void {
        this.siteName = value;
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

        if (this.coordinates !== null) {
            data["coordinates"] = this.coordinates;
        }

        if (this.coordinatesFor !== null) {
            data["coordinatesFor"] = this.coordinatesFor;
        }

        if (this.type !== null) {
            data["type"] = this.type;
        }

        if (this.continent !== null) {
            data["continent"] = this.continent;
        }

        if (this.country !== null) {
            data["country"] = this.country;
        }

        if (this.countryOcean !== null) {
            data["countryOcean"] = this.countryOcean;
        }

        if (this.description !== null) {
            data["description"] = this.description;
        }

        if (this.elevation !== null) {
            data["elevation"] = this.elevation;
        }

        if (this.geometryType !== null) {
            data["geometryType"] = this.geometryType;
        }

        if (this.latitude !== null) {
            data["latitude"] = this.latitude;
        }

        if (this.longitude !== null) {
            data["longitude"] = this.longitude;
        }

        if (this.locationName !== null) {
            data["locationName"] = this.locationName;
        }

        if (this.ocean !== null) {
            data["ocean"] = this.ocean;
        }

        if (this.siteName !== null) {
            data["siteName"] = this.siteName;
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

    public static fromJson(data: Record<string, unknown>): Location {
        const obj = new Location();
        for (const [key, value] of Object.entries(data)) {
            if (key === "@id") {
                obj._id = value as string;
                continue;
            }

            if (key === "coordinates") {
                obj.coordinates = value ? value as string : null;
                continue;
            }

            if (key === "coordinatesFor") {
                obj.coordinatesFor = value ? value as string : null;
                continue;
            }

            if (key === "type") {
                obj.type = value ? value as string : null;
                continue;
            }

            if (key === "continent") {
                obj.continent = value ? value as string : null;
                continue;
            }

            if (key === "country") {
                obj.country = value ? value as string : null;
                continue;
            }

            if (key === "countryOcean") {
                obj.countryOcean = value ? value as string : null;
                continue;
            }

            if (key === "description") {
                obj.description = value ? value as string : null;
                continue;
            }

            if (key === "elevation") {
                obj.elevation = value ? value as string : null;
                continue;
            }

            if (key === "geometryType") {
                obj.geometryType = value ? value as string : null;
                continue;
            }

            if (key === "latitude") {
                obj.latitude = value ? value as string : null;
                continue;
            }

            if (key === "longitude") {
                obj.longitude = value ? value as string : null;
                continue;
            }

            if (key === "locationName") {
                obj.locationName = value ? value as string : null;
                continue;
            }

            if (key === "ocean") {
                obj.ocean = value ? value as string : null;
                continue;
            }

            if (key === "siteName") {
                obj.siteName = value ? value as string : null;
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

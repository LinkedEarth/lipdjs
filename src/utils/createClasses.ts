import fs from 'fs';
import path from 'path';
import { SCHEMA } from '../globals/schema';
import { ONTONS } from '../globals/urls';
import { NSURL } from '../globals/urls';
import { REVERSE_BLACKLIST } from '../globals/blacklist';
import { SYNONYMS } from '../globals/synonyms';

// Get script directory and class directory
const SCRIPTDIR = __dirname;
const CLASSDIR = path.resolve(`${SCRIPTDIR}/../classes`);

// Create all necessary directories
fs.mkdirSync(path.dirname(CLASSDIR), { recursive: true });
fs.mkdirSync(CLASSDIR, { recursive: true });

console.log(`Generating TypeScript classes in: ${CLASSDIR}`);

function getToJsonItem(ptype: string, pname: string, tsType: string | null): string {
    let tojsonitem = "";
    if (ptype === "literal") {
        tojsonitem += `
                const obj = valueObj`;
    } else if (ptype === "object") {
        tojsonitem += `
                const obj = valueObj.toJson()`;
    }
    return tojsonitem;
}

function getFromJsonItem(ptype: string, tsType: string | null, isEnum: boolean): string {
    let fromjsonitem = "";
    if (ptype === "object" && tsType !== null) {
        if (isEnum) {
            fromjsonitem += `
                    obj = ${tsType}.fromSynonym(value.replace(/^.*?#/, ""))`;
        } else {
            fromjsonitem += `
                    obj = ${tsType}.fromJson(value)`;
        }
    } else if (tsType) {
        fromjsonitem += `
                    obj = value`;
    } else {
        fromjsonitem += `
                    obj = value`;
    }
    return fromjsonitem;
}


function getToDataItem(ptype: string, range: string | null): string {
    if (ptype === "literal" && range) {
        return `
            const obj = {
                "@value": valueObj,
                "@type": "literal",
                "@datatype": "http://www.w3.org/2001/XMLSchema#${range}"
            }`;
    } else if (ptype === "literal") {
        return `
            const obj = {
                "@id": valueObj,
                "@type": "uri"
            }`;
    } else if (ptype === "object") {
        return `
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
            }`;
    }
    return "";
}

function getFromDataItem(ptype: string, range: string | null, isEnum: boolean): string {
    let fromdataitem = `
                for (const val of value as any[]) {
                    let obj: any = null;`;
    
    if (ptype === "object" && range !== null) {
        if (isEnum) {
            fromdataitem += `
                    obj = ${range}.fromSynonym(val["@id"].replace(/^.*?#/, ""));`;
        } else {
            fromdataitem += `
                    if ("@id" in val) {
                        obj = ${range}.fromData(val["@id"], data);
                    } else {
                        obj = val["@value"];
                    }`;
        }
    } else if (range) {
        fromdataitem += `
                    if ("@value" in val) {
                        obj = val["@value"];
                    }`;
    } else {
        fromdataitem += `
                    obj = val["@id"];`;
    }
    
    return fromdataitem;
}

function fetchExtraTemplateFunctions(clsid: string): [string[], string[], string[]] {
    const imports: string[] = [];
    const structures: string[] = [];
    const fns: string[] = [];

    const tplfilename = `${CLASSDIR}/templates/${clsid.toLowerCase()}.ts`;
    if (fs.existsSync(tplfilename)) {
        console.log(`Fetching extra template functions from: ${tplfilename}`);
        const fileContent = fs.readFileSync(tplfilename, 'utf8');
        const lines = fileContent.split('\n');
        
        let curfn = "";
        let fnOngoing = false;
        let structureOngoing = true;
        
        for (const line of lines) {
            if (/^import /.test(line.trim()) || /^from .+ import /.test(line.trim())) {
                imports.push(line);
            } else if (/^export class/.test(line.trim())) {
                structureOngoing = false;
            } else if (/^\/\/.*START TEMPLATE FUNCTION/.test(line.trim())) {
                fnOngoing = true;
            } else if (/^\/\/.*END TEMPLATE FUNCTION/.test(line.trim())) {
                fnOngoing = false;
                if (curfn) {
                    fns.push("\n" + curfn);
                }
                curfn = "";
            } else if (/^\/\/.*START TYPES/.test(line.trim())) {
                structureOngoing = true;
            } else if (/^\/\/.*END TYPES/.test(line.trim())) {
                structureOngoing = false;
            } else if (fnOngoing) {
                curfn += line + "\n";
            } else if (structureOngoing) {
                structures.push(line);
            }
        }
    }
    return [imports, structures, fns];
}

function generateClassFile(
    clsid: string, 
    importSnippets: string[], 
    defvarSnippets: string[], 
    initvarSnippets: string[], 
    todataSnippets: string[], 
    fromdataSnippets: string[], 
    tojsonSnippets: string[], 
    fromjsonSnippets: string[], 
    fnSnippets: string[]
): void {
    const [ximports, xstructures, xfnSnippets] = fetchExtraTemplateFunctions(clsid);
    fnSnippets = [...fnSnippets, ...xfnSnippets];

    const filename = `${CLASSDIR}/${clsid.toLowerCase()}.ts`;
    let tsCode = `
// Auto-generated. Do not edit.
import { uniqid } from "../utils/utils";
import { parseVariableValues } from "../utils/utils";
`;

    // Write the imports
    // for (const im of ximports) {
    //     tsCode += `${im}\n`;
    // }
    
    for (const im of importSnippets) {
        tsCode += `import { ${im} } from "./${im.toLowerCase()}";\n`;
    }
    tsCode += "\n";

    // Write the structures
    for (const st of xstructures) {
        tsCode += `${st}\n`;
    }

    // Write the class header
    tsCode += `\n\nexport class ${clsid} {\n`;

    // Write the class variables
    for (const snippet of defvarSnippets) {
        tsCode += `
    ${snippet}`;
    }

    // Write the init function
    tsCode += `
    protected _id: string;
    protected _type: string;
    protected _misc: Record<string, any>;
    protected _ontns: string;
    protected _ns: string;

    constructor() {`;
    for (const snippet of initvarSnippets) {
        tsCode += `
        ${snippet}`;
    }
    tsCode += `
        this._misc = {};
        this._ontns = "${ONTONS}";
        this._ns = "${NSURL}";
        this._type = "${ONTONS}${clsid}";
        this._id = this._ns + "/" + uniqid("${clsid}");
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
    `;

    tsCode += `
    public static fromDictionary(data: Record<string, any>): ${clsid} {
        const thisObj = new ${clsid}();
        Object.assign(thisObj, data);
        return thisObj;
    }`

    // Write the fromData function
    tsCode += `
    public static fromData(id: string, data: Record<string, any>): ${clsid} {
        const thisObj = new ${clsid}();
        thisObj._id = id;
        const mydata = data[id] as any;
        for (const [key, value] of Object.entries(mydata)) {
            if (key === "type") {
                for (const val of value as any[]) {
                    thisObj._type = val["@id"];
                }
                continue;
            }`;
    for (const snippet of fromdataSnippets) {
        tsCode += `
            ${snippet}`;
    }
    tsCode += `
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
    }\n`;

    // Write the toData function
    tsCode += `

    public toData(data: Record<string, any> = {}): Record<string, any> {
        data[this._id] = {};
        data[this._id]["type"] = [
            {
                "@id": this._type,
                "@type": "uri"
            }
        ]`;
    for (const snippet of todataSnippets) {
        tsCode += `${snippet}`;
    }
    tsCode += `
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
                if (/\\d{4}-\\d{2}-\\d{2}( |T)\\d{2}:\\d{2}:\\d{2}/.test(value as string)) {
                    ptype = "http://www.w3.org/2001/XMLSchema#datetime";
                } else if (/\\d{4}-\\d{2}-\\d{2}/.test(value as string)) {
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
    }\n`;

    // Write the toJson function
    tsCode += `
    public toJson(): Record<string, any> {
        const data: Record<string, any> = {
            "@id": this._id
        }`;
    for (const snippet of tojsonSnippets) {
        tsCode += `${snippet}`;
    }
    tsCode += `
        // Add misc properties
        for (const [key, value] of Object.entries(this._misc)) {
            data[key] = value;
        }
        return data;
    }\n`;

    // Write the fromJson function
    tsCode += `
    public static fromJson(data: Record<string, any>): ${clsid} {
        const thisObj = new ${clsid}();
        for (const [key, pvalue] of Object.entries(data)) {
            if (key === "@id") {
                thisObj._id = pvalue as string;
                continue;
            }`;
    for (const snippet of fromjsonSnippets) {
        tsCode += `${snippet}`;
    }
    tsCode += `
            // Store unknown properties in misc
            thisObj._misc[key] = pvalue;
        }
        return thisObj;
    }\n`;

    // Write the functions to handle non standard properties
    tsCode += `
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
    `;

    // Write the getter/setter functions       
    for (const fn of fnSnippets) {
        tsCode += fn;
    }

    tsCode += `\n}\n`;
    
    // Write to file
    fs.writeFileSync(filename, tsCode);
}

function getMultiValuePropertySnippets(
    clsid: string,
    pid: string,
    propid: string,
    pname: string,
    ptype: string,
    ontRange: string | null,
    tsType: string | null,
    getter: string,
    setter: string,
    adder: string | null,
    isEnum: boolean
): [string, string, string, string, string, string, string] {
    // Create the TypeScript snippet for initializing property variables
    const defvar = `public ${pname}: ${tsType}[];`;
    const initvar = `this.${pname} = [];`;

    // Create the TypeScript function snippet for this property to convert the class to a dictionary (todata)
    const todataitem = getToDataItem(ptype, ontRange);
    const todata = `
        if (this.${pname}.length > 0) {
            data[this._id]["${propid}"] = [];
            for (const valueObj of this.${pname}) {${todataitem}
                data[this._id]["${propid}"].push(obj);
            }
        }`;

    // Create the TypeScript function snippet for this property to convert from data dictionary to a class (fromdata)
    const fromdataitem = getFromDataItem(ptype, tsType, isEnum);
    const fromdata = `
            else if (key === "${propid}") {
                thisObj.${pname} = [];${fromdataitem}
                    thisObj.${pname}.push(obj);
                }
            }`;

    // Create the TypeScript function snippet for this property to convert the class to json (tojson)
    let tojson = "";
    if (!(pid in REVERSE_BLACKLIST)) {
        const tojsonitem = getToJsonItem(ptype, pname, tsType);
        tojson = `
        if (this.${pname}.length > 0) {
            data["${pid}"] = [];
            for (const valueObj of this.${pname}) {${tojsonitem}
                data["${pid}"].push(obj);
            }
        }`;
    }

    // Create the TypeScript function snippet for this property to convert from json dictionary to a class (fromjson)
    const fromjsonitem = getFromJsonItem(ptype, tsType, isEnum);
    const fromjson = `
            if (key === "${pid}") {
                let obj: any = null;
                thisObj.${pname} = [];
                for (const value of pvalue as any[]) {${fromjsonitem}
                    thisObj.${pname}.push(obj);
                }
                continue;
            }`;

    if (tsType === null) {
        tsType = "object";
    }

    // Create error message for type checking
    let errorMsg = `Error: '\${${pname}}' is not of type ${tsType}`;
    if (isEnum) {
        errorMsg += `\\nYou can create a new ${tsType} object from a string using the following syntax:\\n`;
        errorMsg += `- Fetch existing ${tsType} by synonym: ${tsType}.fromSynonym("\${${pname}}")\\n`;
        errorMsg += `- Create a new custom ${tsType}: new ${tsType}("\${${pname}}")`;
    }

    // Create the TypeScript snippet for getter/setter/adders
    const fns = `
    ${getter}(): ${tsType}[] {
        return this.${pname};
    }

    ${setter}(${pname}: ${tsType}[]): void {
        // if (!Array.isArray(${pname})) {
        //     throw new Error("Error: ${pname} is not an array");
        // }
        // if (!${pname}.every(x => x instanceof ${tsType})) {
        //     throw new Error(\`${errorMsg}\`);
        // }
        this.${pname} = ${pname};
    }

    ${adder}(${pname}: ${tsType}): void {
        // if (!(${pname} instanceof ${tsType})) {
        //     throw new Error(\`${errorMsg}\`);
        // }
        this.${pname}.push(${pname});
    }`;

    return [defvar, initvar, todata, fromdata, tojson, fromjson, fns];
}

function getPropertySnippets(
    clsid: string,
    pid: string,
    propid: string,
    pname: string,
    ptype: string,
    ontRange: string | null,
    tsType: string | null,
    getter: string,
    setter: string,
    isEnum: boolean
): [string, string, string, string, string, string, string] {
    // Create the TypeScript snippet for initializing property variables
    const defvar = `public ${pname}: ${tsType} | null;`;
    const initvar = `this.${pname} = null;`;

    // Create the TypeScript function snippet for this property to convert the class to a dictionary (todata)
    const todataitem = getToDataItem(ptype, ontRange);
    const todata = `
        if (this.${pname} !== null) {
            const valueObj = this.${pname};${todataitem}
            data[this._id]["${propid}"] = [obj];
        }`;

    // Create the TypeScript function snippet for this property to convert from data dictionary to a class (fromdata)
    const fromdataitem = getFromDataItem(ptype, tsType, isEnum);
    const fromdata = `
            else if (key === "${propid}") {${fromdataitem}
                    thisObj.${pname} = obj;
                }
            }`;

    // Create the TypeScript function snippet for this property to convert the class to json (tojson)
    let tojson = "";
    if (!(pid in REVERSE_BLACKLIST)) {
        const tojsonitem = getToJsonItem(ptype, pname, tsType);
        tojson = `
        if (this.${pname} !== null) {
            const valueObj = this.${pname};${tojsonitem}
            data["${pid}"] = obj;
        }`;
    }

    // Create the TypeScript function snippet for this property to convert from json dictionary to a class (fromjson)
    const fromjsonitem = getFromJsonItem(ptype, tsType, isEnum);
    const fromjson = `
            if (key === "${pid}") {
                let obj: any = null;
                let value: any = pvalue;${fromjsonitem}
                thisObj.${pname} = obj;
                continue;
            }`;

    // Create error message for type checking
    let errorMsg = `Error: '\${${pname}}' is not of type ${tsType}`;
    if (isEnum) {
        errorMsg += `\\nYou can create a new ${tsType} object from a string using the following syntax:\\n`;
        errorMsg += `- Fetch existing ${tsType} by synonym: ${tsType}.fromSynonym("\${${pname}}")\\n`;
        errorMsg += `- Create a new custom ${tsType}: new ${tsType}("\${${pname}}")`;
    }

    // Create the TypeScript snippet for getter/setter
    let fns = `
    ${getter}(): ${tsType} | null {
        return this.${pname};
    }

    ${setter}(${pname}: ${tsType}): void {
        // if (!(${pname} instanceof ${tsType})) {
        //     throw new Error(\`${errorMsg}\`);
        // }
        this.${pname} = ${pname};`

    // Special case for Dataset
    if (clsid === "Dataset" && pname === "name") {
        fns += `
        this._id = this._ns + '/' + ${pname}; // This is a hack to set the id of the dataset based on the name`;
    }
    fns += `
    }`;

    return [defvar, initvar, todata, fromdata, tojson, fromjson, fns];
}

function generateEnumClasses(): void {
    for (const sectionid in SYNONYMS) {
        for (const clsid in SYNONYMS[sectionid as keyof typeof SYNONYMS]) {
            const done: Record<string, boolean> = {};
            const synonyms = (SYNONYMS[sectionid as keyof typeof SYNONYMS] as any)[clsid];

            const fileid = clsid.toLowerCase();
            const filename = `${CLASSDIR}/${fileid}.ts`;
            let tsCode = `
// Auto-generated. Do not edit.
import { SYNONYMS } from "../globals/synonyms";

export class ${clsid} {
    private id: string;
    private label: string;
    static synonyms: any = SYNONYMS.${sectionid}?.${clsid};

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }

    equals(value: ${clsid}): boolean {
        return this.id === value.id;
    }

    getLabel(): string {
        return this.label;
    }

    getId(): string {
        return this.id;
    }

    toData(data: Record<string, any> = {}): Record<string, any> {
        data[this.id] = {
            "label": [
                {
                    "@datatype": null,
                    "@type": "literal",
                    "@value": this.label
                }
            ]
        };
        return data;
    }

    toJson(): string {
        return this.label;
    }

    static fromSynonym(synonym: string): ${clsid} | null {
        const lowerSynonym = synonym.toLowerCase();
        if (lowerSynonym in ${clsid}.synonyms) {
            const synobj = ${clsid}.synonyms[lowerSynonym];
            return new ${clsid}(synobj.id, synobj.label);
        }
        return null;
    }
}

export class ${clsid}Constants {`;

            for (const synonym in synonyms) {
                const synobj = synonyms[synonym];
                const synid = synobj.id.replace(/.*?#/, "").replace(/[^a-zA-Z0-9]/g, "_");
                if (synid in done) {
                    continue;
                }
                done[synid] = true;
                tsCode += `
    static ${synid} = new ${clsid}("${synobj.id}", "${synobj.label}");`;
            }

            tsCode += `
}`;

            fs.writeFileSync(filename, tsCode);
        }
    }
}


function generateLipdClasses(): void {
    // Check all classes in Schema
    for (const clsid in SCHEMA) {
        const props = SCHEMA[clsid as keyof typeof SCHEMA];

        const importSnippets = new Set<string>();
        const defvarSnippets = new Set<string>();
        const initvarSnippets = new Set<string>();
        const fromdataSnippets = new Set<string>();
        const todataSnippets = new Set<string>();
        const tojsonSnippets = new Set<string>();
        const fromjsonSnippets = new Set<string>();
        const fnSnippets = new Set<string>();

        // Check all properties
        for (const pid in props) {
            if (pid[0] === "@") {
                continue;
            }
            const prop = props[pid as keyof typeof props];
            
            let propid = pid;
            if ("name" in prop) {
                propid = prop["name"];
            }

            // Create the TypeScript property name (pname) from ontology property id (propid)
            let pname = propid;
            if (propid.startsWith("has")) {
                pname = propid.substring(3);
            } else if (propid.startsWith("is")) {
                pname = propid.substring(2);
            }
            // Fix if property name is "type". Gets mixed up
            if (pname.toLowerCase() === "type") {
                pname = `${clsid}Type`;
            }
            pname = pname[0].toLowerCase() + pname.substring(1);

            // Check if the property is supposed to have multiple values. Rename accordingly
            const multiple = (prop as any).multiple || false;
            let mpname = pname;
            if (multiple && !pname.match(/.*(data|by|s)$/i)) {
                mpname += "s";
            }

            const isEnum = "synonyms" in prop;

            // Create getter/setter/adder function names
            let adder: string | null = null;
            const suffix = pname[0].toUpperCase() + pname.substring(1);
            let setter = "set" + suffix;
            let getter: string;
            if (propid.startsWith("is")) {
                getter = "is" + suffix;
            } else {
                getter = "get" + suffix;
            }
            if (multiple) {
                adder = "add" + suffix;
                if (!pname.match(/.*(data|by|s)$/i)) {
                    setter += "s";
                    getter += "s";
                }
            }
            
            // Get the range of the property
            let ontRange: string | null = "string";
            let ptype = "literal";
            if ("class_type" in prop) {
                ontRange = prop["class_type"];
            } else if ("type" in prop) {
                ontRange = prop["type"];
                if (ontRange === "Individual") {
                    ontRange = null;
                }
            }
            if ("class_range" in prop) {
                ptype = "object";
                ontRange = prop["class_range"];
            } else if ("schema" in prop) {
                ptype = "object";
                ontRange = prop["schema"];
            }

            let tsType = ontRange || "object";
            // Rewrite the property range to TypeScript types
            if (ontRange === "integer") {
                tsType = "number";
            } else if (ontRange === "float") {
                tsType = "number";            
            } else if (ontRange === "string") {
                tsType = "string";
            } else if (ontRange === "boolean") {
                tsType = "boolean";
            } else if (ontRange === "datetime") {
                tsType = "Date";
            } else if (ontRange === "date") {
                tsType = "Date";
            }

            // Get TypeScript snippets for initialization function, todata function, fromdata from, and the setter/getter functions
            let defvar: string;
            let initvar: string;
            let todata: string;
            let fromdata: string;
            let tojson: string;
            let fromjson: string;
            let fns: string;
            
            if (multiple) {
                [defvar, initvar, todata, fromdata, tojson, fromjson, fns] = getMultiValuePropertySnippets(
                    clsid, pid, propid, mpname, ptype, 
                    ontRange, tsType, 
                    getter, setter, adder, isEnum
                );
            } else {
                [defvar, initvar, todata, fromdata, tojson, fromjson, fns] = getPropertySnippets(
                    clsid, pid, propid, mpname, ptype, 
                    ontRange, tsType, 
                    getter, setter, isEnum
                );
            }
            
            // Collect all snippets
            // Import the range class (in case the range is a class)
            if (ptype === "object") {
                importSnippets.add(tsType ?? "");
            }
            defvarSnippets.add(defvar);
            initvarSnippets.add(initvar);
            todataSnippets.add(todata);
            fromdataSnippets.add(fromdata);
            tojsonSnippets.add(tojson);
            fromjsonSnippets.add(fromjson);
            fnSnippets.add(fns);
        }
        
        // Write outputs
        generateClassFile(
            clsid, 
            Array.from(importSnippets).sort(), 
            Array.from(defvarSnippets).sort(), 
            Array.from(initvarSnippets).sort(), 
            Array.from(todataSnippets).sort(), 
            Array.from(fromdataSnippets).sort(), 
            Array.from(tojsonSnippets).sort(), 
            Array.from(fromjsonSnippets).sort(), 
            Array.from(fnSnippets).sort()
        );
    }
}

// Main execution
generateLipdClasses();
generateEnumClasses();
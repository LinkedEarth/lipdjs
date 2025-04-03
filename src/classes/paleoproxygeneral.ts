
// Auto-generated. Do not edit.
import { SYNONYMS } from "../globals/synonyms";

export class PaleoProxyGeneral {
    private id: string;
    private label: string;
    static synonyms: any = SYNONYMS.PROXIES?.PaleoProxyGeneral;

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }

    equals(value: PaleoProxyGeneral): boolean {
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

    static fromSynonym(synonym: string): PaleoProxyGeneral | null {
        const lowerSynonym = synonym.toLowerCase();
        if (lowerSynonym in PaleoProxyGeneral.synonyms) {
            const synobj = PaleoProxyGeneral.synonyms[lowerSynonym];
            return new PaleoProxyGeneral(synobj.id, synobj.label);
        }
        return null;
    }
}

export class PaleoProxyGeneralConstants {
    static biogenic = new PaleoProxyGeneral("http://linked.earth/ontology/paleo_proxy#biogenic", "biogenic");
    static cryophysical = new PaleoProxyGeneral("http://linked.earth/ontology/paleo_proxy#cryophysical", "cryophysical");
    static dendrophysical = new PaleoProxyGeneral("http://linked.earth/ontology/paleo_proxy#dendrophysical", "dendrophysical");
    static elemental = new PaleoProxyGeneral("http://linked.earth/ontology/paleo_proxy#elemental", "elemental");
    static faunal_assemblage = new PaleoProxyGeneral("http://linked.earth/ontology/paleo_proxy#faunal_assemblage", "faunal assemblage");
    static floral_assemblage = new PaleoProxyGeneral("http://linked.earth/ontology/paleo_proxy#floral_assemblage", "floral assemblage");
    static isotopic = new PaleoProxyGeneral("http://linked.earth/ontology/paleo_proxy#isotopic", "isotopic");
    static mineral = new PaleoProxyGeneral("http://linked.earth/ontology/paleo_proxy#mineral", "mineral");
    static pyrogenic = new PaleoProxyGeneral("http://linked.earth/ontology/paleo_proxy#pyrogenic", "pyrogenic");
    static sedimentology = new PaleoProxyGeneral("http://linked.earth/ontology/paleo_proxy#sedimentology", "sedimentology");
}
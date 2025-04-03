
interface PaleoProxyGeneralSynonym {
    id: string;
    label: string;
}

interface PaleoProxyGeneralSynonyms {
    [key: string]: PaleoProxyGeneralSynonym;
}

export class PaleoProxyGeneral {
    private id: string;
    private label: string;
    static synonyms: PaleoProxyGeneralSynonyms = {'biogenic': {'id': 'http://linked.earth/ontology/paleo_proxy#biogenic', 'label': 'biogenic'}, 'biological material': {'id': 'http://linked.earth/ontology/paleo_proxy#biogenic', 'label': 'biogenic'}, 'cryophysical': {'id': 'http://linked.earth/ontology/paleo_proxy#cryophysical', 'label': 'cryophysical'}, 'dendrophysical': {'id': 'http://linked.earth/ontology/paleo_proxy#dendrophysical', 'label': 'dendrophysical'}, 'elemental': {'id': 'http://linked.earth/ontology/paleo_proxy#elemental', 'label': 'elemental'}, 'faunal assemblage': {'id': 'http://linked.earth/ontology/paleo_proxy#faunal_assemblage', 'label': 'faunal assemblage'}, 'faunal_assemblage': {'id': 'http://linked.earth/ontology/paleo_proxy#faunal_assemblage', 'label': 'faunal assemblage'}, 'floral assemblage': {'id': 'http://linked.earth/ontology/paleo_proxy#floral_assemblage', 'label': 'floral assemblage'}, 'floral_assemblage': {'id': 'http://linked.earth/ontology/paleo_proxy#floral_assemblage', 'label': 'floral assemblage'}, 'isotopic': {'id': 'http://linked.earth/ontology/paleo_proxy#isotopic', 'label': 'isotopic'}, 'isotope': {'id': 'http://linked.earth/ontology/paleo_proxy#isotopic', 'label': 'isotopic'}, 'mineral': {'id': 'http://linked.earth/ontology/paleo_proxy#mineral', 'label': 'mineral'}, 'pyrogenic': {'id': 'http://linked.earth/ontology/paleo_proxy#pyrogenic', 'label': 'pyrogenic'}, 'fire history': {'id': 'http://linked.earth/ontology/paleo_proxy#pyrogenic', 'label': 'pyrogenic'}, 'sedimentology': {'id': 'http://linked.earth/ontology/paleo_proxy#sedimentology', 'label': 'sedimentology'}};

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }

    getId(): string {
        return this.id;
    }

    getLabel(): string {
        return this.label;
    }

    toData(): Record<string, any> {
        return {
            [this.id]: {
                label: [{
                    "@datatype": null,
                    "@type": "literal",
                    "@value": this.label
                }]
            }
        };
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

export const PaleoProxyGeneralConstants = {
    biogenic: new PaleoProxyGeneral( "http://linked.earth/ontology/paleo_proxy#biogenic", "biogenic" ),
    cryophysical: new PaleoProxyGeneral( "http://linked.earth/ontology/paleo_proxy#cryophysical", "cryophysical" ),
    dendrophysical: new PaleoProxyGeneral( "http://linked.earth/ontology/paleo_proxy#dendrophysical", "dendrophysical" ),
    elemental: new PaleoProxyGeneral( "http://linked.earth/ontology/paleo_proxy#elemental", "elemental" ),
    faunal_assemblage: new PaleoProxyGeneral( "http://linked.earth/ontology/paleo_proxy#faunal_assemblage", "faunal assemblage" ),
    floral_assemblage: new PaleoProxyGeneral( "http://linked.earth/ontology/paleo_proxy#floral_assemblage", "floral assemblage" ),
    isotopic: new PaleoProxyGeneral( "http://linked.earth/ontology/paleo_proxy#isotopic", "isotopic" ),
    mineral: new PaleoProxyGeneral( "http://linked.earth/ontology/paleo_proxy#mineral", "mineral" ),
    pyrogenic: new PaleoProxyGeneral( "http://linked.earth/ontology/paleo_proxy#pyrogenic", "pyrogenic" ),
    sedimentology: new PaleoProxyGeneral( "http://linked.earth/ontology/paleo_proxy#sedimentology", "sedimentology" ),
};
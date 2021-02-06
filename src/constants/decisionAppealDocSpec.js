import { Util } from 'react-xml-editor/lib';

const decisionAppealDocSpec = {
    elements: {
        item: {
            attributes: {
                label: {
                    asker: Util.askString,
                    menu: [{
                        action: Util.deleteAttribute,
                        caption: 'Delete attribute',
                    }],
                },
                type: {
                    asker: Util.askPicklist([{
                        value: 'short', caption: 'short'
                    },{
                        value: 'medium', caption: 'medium',
                    }, 'long']),
                },
            },
            menu: [{
                action: Util.newElementChild('<child />'),
                caption: 'Append child <child />',
            },{
                action: Util.newAttribute({
                    name: 'label',
                    value: 'default value',
                }),
                caption: 'Add attribute @label',
                hideIf: (xml, id) => {
                    const element = Util.getXmlNode(xml, "testId");
                    return element && element.$ && typeof element.$.label !== 'undefined';
                },
            },{
                action: Util.deleteElement,
                caption: 'Delete this <item />',
            },{
                action: Util.newElementBefore('<item />'),
                caption: 'New <item /> before this',
            },{
                action: Util.newElementAfter('<item />'),
                caption: 'New <item /> after this',
            },{
                action: Util.duplicateElement,
                caption: 'Copy <item />',
            },{
                action: Util.moveElementUp,
                caption: 'Move <item /> up',
                // hideIf: (xml, id) => !Util.canMoveElementUp(xml, id),
            },{
                action: Util.moveElementDown,
                caption: 'Move <item /> down',
                // hideIf: (xml, id) => !Util.canMoveElementDown(xml, id),
            }]
        },
    }
  };

const SUBMITTER = {
    individual:  `
        <za:Fizicko_lice property="pred:submitterType" content="FIZICKO_LICE">
        <sh:Ime>Ime</sh:Ime>
        <sh:Prezime>Prezime</sh:Prezime>
        <sh:Adresa>
            <sh:Grad>Grad</sh:Grad>
            <sh:Ulica>Ulica</sh:Ulica>
            <sh:Broj>1</sh:Broj>
            <sh:Postanski_broj>21000</sh:Postanski_broj>
        </sh:Adresa>
        </za:Fizicko_lice>
    `,
    legalEntity: `
        <za:Pravno_lice property="pred:submitterType" content="PRAVNO_LICE">
            <sh:Naziv>Naziv</sh:Naziv>
            <sh:Adresa>
            <sh:Grad>Grad</sh:Grad>
            <sh:Ulica>Ulica</sh:Ulica>
            <sh:Broj>1</sh:Broj>
            <sh:Postanski_broj>21000</sh:Postanski_broj>
        </sh:Adresa>
        </za:Pravno_lice>
    `
}

  export const xmlString = (submitter, requestId, creatorId) => `
  <?xml version="1.0" encoding="UTF-8"?>
<za:ZalbaRoot
    xmlns:za="http://www.zalbanaodluku.com"
    xmlns:sh="http://www.shared.com"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.zalbanaodluku.com ../xsd/zalbanaodluku.xsd"
    xmlns:pred="http://www.tim21.com/predicate/"
    
    rel="pred:appealForRequest"
    href="http://zahtevi/${requestId}"
>
    <za:Zalba>
        <za:Naslov>
            Naslov
        </za:Naslov>
        <za:Primaoc
            rel="pred:recipient"
            href="http://users/com@gmail.com"
            >
            <sh:Uloga>Поверенику за информације од јавног значаја и заштиту података о личности</sh:Uloga>
            <sh:Adresa>
                <sh:Grad property="pred:recipientCity">Beograd</sh:Grad>
                <sh:Ulica property="pred:recipientStreet">Булевар краља Александрa</sh:Ulica>
                <sh:Broj property="pred:recipientStreetnum">15</sh:Broj>
                <sh:Postanski_broj>11000</sh:Postanski_broj>
            </sh:Adresa>
        </za:Primaoc>
        <za:Podnaslov>ZALBA</za:Podnaslov>
        ${SUBMITTER[submitter]}
        <za:Tekst_zalbe>
         
            <za:Datum_podnosenja_zahteva property="pred:requestDate">${new Date().toLocaleDateString("en-CA")}</za:Datum_podnosenja_zahteva>
          
            <za:Osnova_zalbe  property="pred:appealBasis">
                Osnova zalbe
            </za:Osnova_zalbe>
                
        </za:Tekst_zalbe>
        <za:Grad>Unesite Grad</za:Grad>
        <za:Datum property="pred:appealDate">${new Date().toLocaleDateString("en-CA")}</za:Datum>
        <za:Podnosilac 
            rel="pred:submitter"
            href="http://users/${creatorId}"
        >
            <sh:Ime property="pred:submitterName">Ime</sh:Ime>
            <sh:Prezime property="pred:submitterLastname">Prezime</sh:Prezime>
            <sh:Adresa>
                <sh:Grad property="pred:submitterCity">Grad</sh:Grad>
                <sh:Ulica property="pred:submitterStreet">Ulica</sh:Ulica>
                <sh:Broj property="pred:submitterStreetnum">1</sh:Broj>
                <sh:Postanski_broj>21000</sh:Postanski_broj>
            </sh:Adresa>
            <sh:drugi_podaci_za_kontakt>Drugi podaci za kontakt</sh:drugi_podaci_za_kontakt>
        </za:Podnosilac>
        <za:Napomena>
            Napomena
        </za:Napomena>
    </za:Zalba>
</za:ZalbaRoot>
  `

  export default decisionAppealDocSpec;
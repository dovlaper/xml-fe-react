import { Util } from 'react-xml-editor/lib';

const silenceAppealDocSpec = {
    elements: {
        'zal:razlog': {
            asker: Util.askPicklist([{
                value: 'није поступио', caption: 'Nije postupio'
            },{
                value: 'није поступио у целости', caption: 'Nije postupio u celosti',
            },{
                value: 'није поступио у законском року', caption: 'Nije postupio u zakonskom roku',
            }]),
        }
    }
  };

export const xmlString = (requestId, citizenId) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <zal:ZalbaCutanjeRoot
        xmlns:zal="http://www.zalbacutanje.com"
        xmlns:sh="http://www.shared.com"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.zalbacutanje.com ../xsd/zalbacutanje.xsd"
        
        rel="pred:appealForRequest"
        href="http://zahtevi/${requestId}"
        >
        <zal:zalbaCutanje>
        <zal:naziv>
            ЖАЛБА КАДА ОРГАН ВЛАСТИ НИЈЕ ПОСТУПИО/ није поступио у целости/ ПО ЗАХТЕВУ ТРАЖИОЦА У ЗАКОНСКОМ  РОКУ  (ЋУТАЊЕ УПРАВЕ)
        </zal:naziv>
        
        <zal:primaoc
            rel="pred:recipient"
            href="http://users/poverenik@gmail.com"
            >
            <sh:Uloga>Поверенику за информације од јавног значаја и заштиту података о личности</sh:Uloga>
            <sh:Adresa>
                <sh:Grad property="pred:recipientCity">Zabjelo</sh:Grad>
                <sh:Ulica property="pred:recipientStreet">Булевар краља Александрa</sh:Ulica>
                <sh:Broj property="pred:recipientStreetnum">15</sh:Broj>
                <sh:Postanski_broj>11000</sh:Postanski_broj>
            </sh:Adresa>
        </zal:primaoc>
        
        <zal:sadrzaj>
            У складу са чланом 22. Закона о слободном приступу информацијама од јавног значаја подносим:
            <zal:podnaslov>Ж А Л Б У</zal:podnaslov>
            против
            <zal:naziv_organa property="pred:authorityName">Naziv organa vlasti nekii</zal:naziv_organa>
            због тога што орган власти: 
            <zal:razlog>није поступио</zal:razlog> 
            (подвући  због чега се изјављује жалба)
            
            
            по мом захтеву  за слободан приступ информацијама од јавног значаја који сам поднео  том органу  дана 
            <zal:datum property="pred:requestDate">2020-09-10</zal:datum> 
            године, а којим сам тражио/ла да ми се у складу са Законом о слободном приступу информацијама од јавног значаја омогући увид- копија документа који садржи информације  о /у вези са :
            <zal:podaci_o_zahtevu property="pred:requestDetails">neki podaci o zahtevu</zal:podaci_o_zahtevu>
            (навести податке о захтеву и информацији/ама)
            
            На основу изнетог, предлажем да Повереник уважи моју жалбу и омогући ми приступ траженој/им  информацији/ма.
            Као доказ , уз жалбу достављам копију захтева са доказом о предаји органу власти.
            <zal:istaknuto>Напомена:</zal:istaknuto> Код жалбе  због непоступању по захтеву у целости, треба приложити и добијени одговор органа власти
            
            <zal:podnosilac_zalbe 
                rel="pred:submitter"
                href="http://users/${citizenId}"
                >
                <sh:Ime property="pred:submitterName">Milenaa</sh:Ime>
                <sh:Prezime property="pred:submitterLastname"></sh:Prezime>
                <sh:Adresa>
                    <sh:Grad property="pred:submitterCity">Beograd</sh:Grad>
                    <sh:Ulica property="pred:submitterStreet"></sh:Ulica>
                    <sh:Broj property="pred:submitterStreetnum">1</sh:Broj>
                    <sh:Postanski_broj>11000</sh:Postanski_broj>
                </sh:Adresa>
                <sh:drugi_podaci_za_kontakt>skmwk</sh:drugi_podaci_za_kontakt>
            </zal:podnosilac_zalbe>
            <zal:datum_vreme>
                <sh:vreme property="pred:appealTime">09:15:00</sh:vreme>
                <sh:datum property="pred:appealDate">2021-01-01</sh:datum>
            </zal:datum_vreme>
            
        </zal:sadrzaj>
        
        
        </zal:zalbaCutanje>
        
    </zal:ZalbaCutanjeRoot>`};

export default silenceAppealDocSpec;
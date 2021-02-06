import { Util } from 'react-xml-editor/lib';

const createRescriptDocSpec = {
    elements: {
        Resenje: {
            attributes: {
                xmlns: {
                    isInvisible: true,
                },
                'xmlns:sh': {
                    isReadOnly: true
                },
                about: {
                    isInvisible: true,
                },
                dopustena_zalba: {
                    asker: Util.askPicklist([{
                        value: 'da', caption: 'da'
                    },{
                        value: 'ne', caption: 'ne',
                    }]),
                },
            },
        },
        Status_zalbe: {
            attributes: {},
            asker: Util.askPicklist([{
                value: 'ODBIJENA', caption: 'ODBIJENA'
            },{
                value: 'PRIHVACENA', caption: 'PRIHVACENA',
            }]),
        },
        Stavke_resenja: {
            attributes: {
                broj: {
                    asker: Util.askPicklist([{
                        value: 'da', caption: 'da'
                    },{
                        value: 'ne', caption: 'ne',
                    }]),
                }
            },
            menu: [{
                caption: "Dodaj tacku",
                action: Util.newElementChild('<sh:Tacka broj="3">Tacka 3</sh:Tacka>'),
                actionParameter: "param"
            }]
        },
        'sh:Ime': {
            readOnly: true,
            asker: Util.askPicklist([{
                value: 'ODBIJENA', caption: 'ODBIJENA'
            },{
                value: 'PRIHVACENA', caption: 'PRIHVACENA',
            }]),
        }
            // menu: [{
            //     action: Util.newElementChild('<child />'),
            //     caption: 'Append child <child />',
            // },{
            //     action: Util.newAttribute({
            //         name: 'label',
            //         value: 'default value',
            //     }),
            //     caption: 'Add attribute @label',
            //     hideIf: (xml, id) => {
            //         console.log(xml, id)
            //         const element = Util.getXmlNode(xml, "testId");
            //         return element && element.$ && typeof element.$.label !== 'undefined';
            //     },
            // },{
            //     action: Util.deleteElement,
            //     caption: 'Delete this <item />',
            // },{
            //     action: Util.newElementBefore('<item />'),
            //     caption: 'New <item /> before this',
            // },{
            //     action: Util.newElementAfter('<item />'),
            //     caption: 'New <item /> after this',
            // },{
            //     action: Util.duplicateElement,
            //     caption: 'Copy <item />',
            // },{
            //     action: Util.moveElementUp,
            //     caption: 'Move <item /> up',
            //     // hideIf: (xml, id) => !Util.canMoveElementUp(xml, id),
            // },{
            //     action: Util.moveElementDown,
            //     caption: 'Move <item /> down',
            //     // hideIf: (xml, id) => !Util.canMoveElementDown(xml, id),
            // }]
        },
};

export default createRescriptDocSpec;
export const xmlString = (commissionerHref, appealHref, submitter) => {
    return `
    <?xml version="1.0" encoding="UTF-8"?>
    <ResenjeRoot 
        xmlns="http://www.resenje.com"
        xmlns:sh="http://www.shared.com"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:pred="http://www.tim21.com/predicate/"
        xsi:schemaLocation="http://www.resenje.com ../xsd/resenje.xsd"
        dopustena_zalba="ne"

        property="pred:submitter"
        content="${submitter}"
        submitter="${submitter}"
        about="http://resenja/1"
        rel="pred:rescriptForAppeal"
        href="${appealHref}"
        >
    <Resenje
       
        >
        <ID>071-01-1114/2020-03</ID>
        <Datum property="pred:rescriptDate">2020-09-08</Datum>
        <Status_zalbe property="pred:appealStatus">PRIHVACENA</Status_zalbe>
        <Opis_resenja>
            Повереник за информације од јавног значаја и заштиту података о личности, у поступку по алби
            коју је изјавио AA, због непоступања Учитељског факултета у Призрену са привременим седиштем
            у Лепосавићу, ул. Немањина бб, по његовом захтеву од 16.04.2020. године за приступ
            информацијама од јавног значаја, на основу члана 35. став 1. тачка 5. Закона о слободном приступу
            информацијама од јавног значаја („Сл. гласник РС“, бр. 120/04, 54/07, 104/09 и 36/10), а у вези са
            чланом 4. тачка 22. Закона о заштити података о личности („Сл. гласник РС“, број 87/18), као и члана
            23. и члана 24. став 4. Закона о слободном приступу информацијама од јавног значаја и члана 173.
            став 2. Закона о општем управном поступку („Сл. гласник РС“, бр. 18/2016 и 95/2018-аутентично
            тумачење), доноси Р Е Ш Е Њ Е
        <Stavke_resenja>
            <sh:Tacka broj="1">
                Налаже се Учитељском факултету у Призрену са привременим седиштем у Лепосавићу, да
                без одлагања, а најкасније у року од пет дана од дана пријема овог решења, обавести АА, да ли
                поседује тражене информације односно документ у коме су исте садржане, и то: Уговор о раду који
                је као последњи потписан између тог Факултета и ББ, те да му, уколико такав документ поседује
                достави копију истог електронском поштом на адресу … или поштом, с тим што ће пре достављања
                заштитити и учинити недоступним податке о личности којима би се повредило право на приватност
                лица на које се информације односе, као што су: адреса становања, лични матични број грађана, име
                оца, радни стаж, просечна оцена студирања и сл. уколико су такви подаци садржани у траженом
                документу. 
            </sh:Tacka>
            <sh:Tacka broj="2">
                О извршењу решења Учитељски факултет у Призрену са привременим седиштем у
                Лепосавићу, ће обавестити Повереника у року од седам дана од пријема овог решења
            </sh:Tacka>
        </Stavke_resenja>
    </Opis_resenja>
    
    <Obrazlozenje>
        <Opis_zalbe>
            АА, као тражилац информација, изјавио је дана 07.05.2020. године жалбу Поверенику, због
            непоступања Учитељског факултета у Призрену са привременим седиштем у Лепосавићу по
            његовом захтеву од 16.04.2020. године за приступ информацијама од јавног значаја и у прилогу
            доставио копију истог
        </Opis_zalbe>
        <Postupak_poverenika>
            Поступајући по жалби, Повереник је дана 11.05.2020. године упутио исту на изјашњење
            Учитељском факултету у Призрену са привременим седиштем у Лепосавићу, као органу власти у
            смислу члана 3. Закона о слободном приступу информацијама од јавног значаја и затражио да се
            изјасни о наводима жалбе, посебно о разлозима непоступања у законском року по поднетом захтеву
            у складу са одредбама члана 16. ст.1-9. или ст. 10. Закона, остављајући рок од осам дана, поводом
            чега није добио одговор.
        </Postupak_poverenika>
        <Odgovor_na_zalbu>
                По разматрању жалбе и осталих списа овог предмета, донета је одлука као у диспозитиву
            решења из следећих разлога:
            <Razlozi>
                <sh:Tacka broj="1">
                    Увидом у списе предмета утврђено је да је АА, дана 16.04.2020. године, поднео Учитељском
                    факултету у Призрену са привременим седиштем у Лепосавићу, захтев за приступ информацијама
                    од јавног значаја, електронском поштом, којим је тражио информације од јавног значаја, ближе
                    наведенe у ставу I диспозитива овог решења.
                </sh:Tacka>
                <sh:Tacka broj="1">
                    Такође је увидом у списе предмета утврђено да по захтеву жалиоца од 16.04.2020. године,
                    орган власти није поступио, што је био дужан да учини без одлагања, а најкасније у року од 15 дана
                    од пријема захтева те да жалиоца, у смислу члана 16. став 1. Закона о слободном приступу информацијама од јавног значаја, обавести да ли поседује тражене информације и да му, уколико
                    исте поседује, стави на увид документ који исте садржи односно изда му или достави копију
                    документа у коме су тражене информације садржане, или да у супротном донесе решење о одбијању
                    захтева, у смислу става 10. истог члана.
                </sh:Tacka>
            </Razlozi>
              
                Имајући у виду да орган власти по захтеву жалиоца од 16.04.2020. године није поступио у
            складу са наведеним одредбама Закона о слободном приступу информацијама од јавног значаја, а
            да није оправдао разлоге непоступања по поднетом захтеву, Повереник је у поступку по жалби, на
            основу члана 23. и члана 24. ст. 1. и 4. Закона о слободном приступу информацијама од јавног
            значаја и члана 173. ст. 2. Закона о општем управном поступку, одлучио као у ставу I диспозитива
            овог решења, нашавши да је жалба основана, односно да је неспорно право жалиоца на тражене
            информације у смислу члана 5. Закона о слободном приступу информацијама од јавног значаја, по
            коме свако има право да му буде саопштено да ли орган власти поседује или му је доступна одређена
            информација од јавног значаја, као и да му се информација, уколико је у поседу органа, учини
            доступном, на начин како је то наложено у ставу I диспозитива овог решења, што је у складу са
            одредбом члана 12. Закона о слободном приступу информацијама од јавног значаја, која предвиђа
            могућност издвајања тражене информације од јавног значаја од осталих информација садржаних у
            документу у које орган власти није дужан да тражиоцу омогући увид, јер би се доступношћу тим
            информацијама повредило право на приватност и заштиту података о личности лица на која се
            тражене информације односе.
                Учитељски факултет у Призрену са привременим седиштем у Лепосавићу, је дужан да о
            извршењу решења из става I диспозитива, обавести Повереника у складу са чланом 24. став 3. Закона
            о слободном приступу информацијама од јавног значаја. 
        </Odgovor_na_zalbu>
        
        <Uputstvo_o_pravnom_sredstvu >
            Против овог решења није 
            допуштена жалба већ се, у складу са Законом о управним
            споровима, може покренути управни спор тужбом Управном суду у Београду, у року од 30 дана од
            дана пријема решења. Такса на тужбу износи 
            <Taksa>390.2</Taksa>
            динара.
        </Uputstvo_o_pravnom_sredstvu>
        
    </Obrazlozenje>
    
    <Poverenik 
        about="http://resenja/1"
        rel="pred:commisioner"
        href="${commissionerHref}"
        >
        <sh:Ime property="pred:commisionerName">Milan</sh:Ime>
        <sh:Prezime property="pred:commisionerLastname">Marinovic</sh:Prezime>
    </Poverenik>
    </Resenje>
    </ResenjeRoot>
`};

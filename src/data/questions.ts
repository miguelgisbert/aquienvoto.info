import type { Evidence, Option, Question, Stance } from "../types";

const OPTIONS: Option[] = [
  {
    id: "a_favor",
    text: { es: "A favor", ca: "A favor", gl: "A favor", eu: "Alde" },
    description: {
      es: "De acuerdo con la medida",
      ca: "D'acord amb la mesura",
      gl: "De acordo coa medida",
      eu: "Neurketarekin ados",
    },
  },
  {
    id: "en_contra",
    text: { es: "En contra", ca: "En contra", gl: "En contra", eu: "Aurka" },
    description: {
      es: "En desacuerdo con la medida",
      ca: "En desacord amb la mesura",
      gl: "En desacordo coa medida",
      eu: "Neurketaren aurka",
    },
  },
  {
    id: "parcial",
    text: { es: "Con matices", ca: "Amb matisos", gl: "Con matices", eu: "Matizekin" },
    description: {
      es: "Solo parte de la medida",
      ca: "Només una part de la mesura",
      gl: "Só unha parte da medida",
      eu: "Neurketaren zati bat baizik",
    },
  },
];

const byId = (id: Stance): Option =>
  OPTIONS.find((o) => o.id === id) as Option;

// Ordres variades d'opcions per pregunta (evita patrons repetitius)
const OPT: Record<string, Option[]> = {
  FCP: ["a_favor", "en_contra", "parcial"].map(byId),
  CFP: ["en_contra", "a_favor", "parcial"].map(byId),
  PFC: ["parcial", "a_favor", "en_contra"].map(byId),
  FPC: ["a_favor", "parcial", "en_contra"].map(byId),
  CPF: ["en_contra", "parcial", "a_favor"].map(byId),
  PCF: ["parcial", "en_contra", "a_favor"].map(byId),
};

// Votació del Pleno a quevotan.eu (mostra el vot de cada grup i formació)
const votacion = (id: string, title: string, date: string): Evidence => {
  const [, sessio, numero] = id.split("-");
  return {
    kind: "votacion",
    title,
    url: `https://quevotan.eu/XV/votacion/${sessio}/${numero}/`,
    date,
  };
};

export const questions: Question[] = [
  {
    id: "habitatge",
    title: {
      es: "Frenar las subidas del alquiler y alargar los contratos",
      ca: "Frenar les pujades del lloguer i allargar els contractes",
      gl: "Frear as subidas do aluguer e alongar os contratos",
      eu: "Alokairuaren igoerak gelditu eta kontratuak luzatu",
    },
    description: {
      es: "El inquilino podría quedarse dos años más en su vivienda sin que le puedan echar, y cada año el casero solo podría subir el alquiler como mucho un 2%.",
      ca: "El llogater podria quedar-se dos anys més a la seva vivenda sense que el puguin fer fora, i cada any el propietari només podria pujar el lloguer com a molt un 2%.",
      gl: "O inquilino podería quedarse dous anos máis na súa vivenda sen que o poidan facer fora, e cada ano o propietario só podería subir o aluguer como moito un 2%.",
      eu: "Alokatzaileak bi urte gehiago jarrai lezake etxean, etxetik atera ez diezaieten, eta urtero jabeak alokairua gehienez %2 igo lezake.",
    },
    context: {
      es: "Si se aprueba, los contratos se renovarían de forma automática dos años más y las subidas anuales quedarían limitadas. A algunos caseros les compensaría alquilar con reglas claras; otros pueden optar por sacar la vivienda del mercado o pedir menos garantías. Para los inquilinos significa menos sustos y más tiempo para organizar su vida.",
      ca: "Si s'aprova, els contractes es renovarien automàticament dos anys més i les pujades anuals quedarien limitades. A alguns propietaris els compensaria llogar amb regles clares; altres poden optar per treure la vivenda del mercat o demanar menys garanties. Per als llogaters vol dir menys ensurts i més temps per organitzar la seua vida.",
      gl: "Se se aproba, os contratos renovaríanse automaticamente dous anos máis e as subidas anuais quedarían limitadas. A algúns propietarios compénsalles alugar con regras claras; outros poden optar por sacar a vivenda do mercado ou pedir menos garantías. Para os inquilinos significa menos sustos e máis tempo para organizar a súa vida.",
      eu: "Onartzen bada, kontratuak bi urtez gehiago berrituko lirateke automatikoki eta urteko igoerak mugatuko lirateke. Jabe batzuei arau argiekin alokatzea konbeni zaie; beste batzuek etxea merkatutik ateratzea edo berme gutxiago eskatzea aukera dezakete. Alokatzaileentzat ezusteko gutxiago eta bizitza antolatzeko denbora gehiago esan nahi du.",
    },
    justification: {
      es: "El 28 de abril de 2026 el Congreso rechazó por 166 a 177 (5 abstenciones del PNV) la convalidación del Real Decreto-ley 8/2026, que prorrogaba dos años los contratos de alquiler y limitaba al 2% la actualización de la renta: PP, Vox, UPN y Junts votaron en contra, y los grupos de izquierda más Coalición Canaria, a favor. El decreto quedó derogado. En 2024 ya se había rechazado por 172 a 178 la Proposición de Ley de Sumar sobre los contratos de alquiler.",
      ca: "El 28 d'abril de 2026 el Congrés va rebutjar per 166 a 177 (5 abstencions del PNV) la convalidació del Reial Decret Llei 8/2026, que prorrogava dos anys els contractes de lloguer i limitava al 2% l'actualització de la renda: PP, Vox, UPN i Junts van votar en contra, i els grups d'esquerra més Coalició Canària, a favor. El decret va quedar derogat. El 2024 ja s'havia rebutjat per 172 a 178 la Proposició de Llei de Sumar sobre els contractes de lloguer.",
      gl: "O 28 de abril de 2026 o Congreso rexeitou por 166 a 177 (5 abstencións do PNV) a convalidación do Real Decreto-ley 8/2026, que prorrogaba dous anos os contratos de aluguer e limitaba ao 2% a actualización da renda: PP, Vox, UPN e Junts votaron en contra, e os grupos de esquerda máis Coalición Canaria, a favor. O decretou quedou derogado. En 2024 xa se rexeitara por 172 a 178 a Proposición de Lei de Sumar sobre os contratos de aluguer.",
      eu: "2026ko apirilaren 28an Kongresuak 166 eta 177rekin (EAJren 5 abstentzio) ukatu zuen 8/2026 Errege Dekretu-Aren balioztapena, alokairu-kontratuak bi urtez luzatzen eta errentaren eguneraketaren %2a mugatzen zuena: PP, VOX, UPN eta Junts-ek aurka bozkatu zuten, eta ezkerrko taldeek eta Kanariar Koalizioak alde. Dekretua indargabetu egin zen. 2024an Sumarren alokairu-kontratuei buruzko Lege-Proposamena 172 eta 178rekin ukatua izan zen.",
    },
    options: OPT.FCP,
    evidence: [
      votacion(
        "15-175-3",
        "Convalidación del Real Decreto-ley 8/2026 de medidas en el alquiler (rechazada: 166-177-5)",
        "2026-04-28"
      ),
      votacion(
        "15-59-1",
        "Proposición de Ley de Sumar sobre contratos de alquiler (toma en consideración rechazada: 172-178)",
        "2024-09-17"
      ),
    ],
    positions: [
      { party: "psoe", stance: "a_favor" },
      { party: "pp", stance: "en_contra" },
      { party: "vox", stance: "en_contra" },
      { party: "fa", stance: "a_favor" },
      { party: "podemos", stance: "a_favor" },
      { party: "compromis", stance: "a_favor" },
      { party: "erc", stance: "a_favor" },
      { party: "junts", stance: "en_contra" },
      {
        party: "pnv",
        stance: "parcial",
        note: {
          es: "Se abstuvo en el RDL 8/2026 y votó a favor de la Proposición de Ley de Sumar de 2024.",
          ca: "Es va abstindre en el RDL 8/2026 i va votar a favor de la Proposició de Llei de Sumar del 2024.",
          gl: "Abstuvo no RDL 8/2026 e votou a favor da Proposición de Lei de Sumar de 2024.",
          eu: "8/2026 RDLan abstentzioan bozkatu zuen eta 2024ko Sumarren Lege-Proposamenaren alde.",
        },
      },
      { party: "izqs", stance: "a_favor" },
      {
        party: "cc",
        stance: "a_favor",
        note: {
          es: "Apoyó el RDL 8/2026 y la Proposición de Ley de Sumar; en octubre de 2026 votó en contra de los RDL 26/2026 y 27/2026 de prórroga de alquiler.",
          ca: "Va donar suport al RDL 8/2026 i a la Proposició de Llei de Sumar; l'octubre de 2026 va votar en contra dels RDL 26/2026 i 27/2026 de pròrroga de lloguer.",
          gl: "Apoiou o RDL 8/2026 e a Proposición de Lei de Sumar; en outubro de 2026 votou en contra dos RDL 26/2026 e 27/2026 de prórroga de aluguer.",
          eu: "8/2026 RDLaren eta Sumarren Lege-Proposamenaren alde bozkatu zuen; 2026ko urrian alokairuaren luzapeneko 26/2026 eta 27/2026 RDLen aurka.",
        },
      },
    ],
  },
  {
    id: "fiscalitat",
    title: {
      es: "Que las grandes fortunas y los beneficios récord paguen más",
      ca: "Que les grans fortunes i els beneficis rècord paguen més",
      gl: "Que as grandes fortunas e os beneficios récord paguen máis",
      eu: "Fortuna handiek eta errekordeko irabaziak gehiago ordain dezatela",
    },
    description: {
      es: "Impuestos extraordinarios a las ganancias que se disparan muy por encima de lo normal, sobre todo en banca, seguros y energía, y a las grandes fortunas.",
      ca: "Impostos extraordinaris als guanys que es disparen molt per damunt del normal, sobretot en banca, assegurances i energia, i a les grans fortunes.",
      gl: "Impostos extraordinarios aos ganancias que se disparan moi por riba do normal, sobre todo en banca, seguros e enerxía, e ás grandes fortunas.",
      eu: "Aparteko zergak ohikoa baino askoz gehiago diren irabazietan, batez ere banku, aseguru eta energian, eta fortuna handietan.",
    },
    context: {
      es: "La idea es que quien ha ganado mucho más de lo habitual en los últimos años aporte una parte extra. Sus defensores dicen que es justo y que ese dinero iría a servicios públicos; sus críticos temen que frenen inversiones o que algunas rentas se vayan del país.",
      ca: "La idea és que qui ha guanyat molt més del habitual en els últims anys aporte una part extra. Els qui ho defensen diuen que és just i que eixos diners anirien a serveis públics; els qui hi estan en contra temen que freen inversions o que algunes rendes se'n vagen del país.",
      gl: "A idea é que quen gañou moito máis do habitual nos últimos anos achegue unha parte extra. Os seus defensores din que é xusto e que ese diñeiro iría a servizos públicos; os críticos temen que freen investimentos ou que algúns rendas vaian do país.",
      eu: "Ideak azken urteetan ohikoa baino askoz gehiago irabazi duenak gehigarri bat ekar dezala da. Aldekoek justua dela eta dirua zerbitzu publikoetara joango dela diote; aurkakoek inbertsioak moteldu ditzaketela edo errenta batzuk herrialdetik atera daitezkeela uste dute.",
    },
    justification: {
      es: "El impuesto de solidaridad de las grandes fortunas (Ley 38/2022) recaudó miles de millones desde 2022. El 30 de septiembre de 2026 el Congreso rechazó la PNL del PSOE para una contribución europea excepcional sobre rentas de la guerra (166 a favor, 176 en contra, 5 abstenciones del PNV): solo PP, Vox, UPN y Junts votaron en contra.",
      ca: "L'impost de solidaritat de les grans fortunes (Llei 38/2022) va recaptar milers de milions des del 2022. El 30 de setembre de 2026 el Congrés va rebutjar la PNL del PSOE per a una contribució europea excepcional sobre rendes de la guerra (166 a favor, 176 en contra, 5 abstencions del PNV): només PP, Vox, UPN i Junts van votar en contra.",
      gl: "O imposto de solidariedade das grandes fortunas (Lei 38/2022) recadou miles de millóns desde 2022. O 30 de setembro de 2026 o Congreso rexeitou a PNL do PSOE para unha contribución europea excepcional sobre rendas da guerra (166 a favor, 176 en contra, 5 abstencións do PNV): só PP, Vox, UPN e Junts votaron en contra.",
      eu: "Fortuna handien solidaritate-zergak (38/2022 Legea) milioika euro bildu zituen 2022tik. 2026ko irailaren 30ean Kongresuak PSOEren PNLa ukatu zuen gerrako errentei buruzko Europako aparteko ekarpenerako (166 alde, 176 aurka, EAJren 5 abstentzio): PP, VOX, UPN eta Junts bakarrik bozkatu zuten aurka.",
    },
    options: OPT.CFP,
    evidence: [
      votacion(
        "15-202-2",
        "PNL del PSOE sobre contribución europea excepcional (rechazada)",
        "2026-09-30"
      ),
    ],
    positions: [
      {
        party: "psoe",
        stance: "a_favor",
        note: {
          es: "Autor de la Ley 38/2022; en el eje sus votaciones están divididas entre sí y no por el carácter de algunas mociones de la oposición.",
          ca: "Autor de la Llei 38/2022; en l'eix els seus vots estan dividits entre sí i no pel caràcter d'algunes mocions de l'oposició.",
          gl: "Autor da Lei 38/2022; no eixe os seus votos están divididos entre si e non polo carácter dalgúns controis da oposición.",
          eu: "38/2022 Legearen egilea; ardatzean bere bozketak bai eta ez banatuta daude oposizioaren mozioren izaeragatik.",
        },
      },
      { party: "pp", stance: "en_contra" },
      { party: "vox", stance: "en_contra" },
      { party: "fa", stance: "a_favor" },
      { party: "podemos", stance: "a_favor" },
      { party: "compromis", stance: "a_favor" },
      { party: "erc", stance: "a_favor" },
      { party: "junts", stance: "en_contra" },
      {
        party: "pnv",
        stance: "abstencion",
        note: {
          es: "Se abstuvo en la PNL de contribución europea; en el eje fiscal sus votaciones son mixtas.",
          ca: "Es va abstindre en la PNL de contribució europea; en l'eix fiscal els seus vots són mixts.",
          gl: "Abstuvo na PNL de contribución europea; no eixe fiscal os seus votos son mixtos.",
          eu: "Europako ekarpenaren PNLan abstentzioan bozkatu zuen; ardatz fiskalean bere bozketa mistoa da.",
        },
      },
      { party: "izqs", stance: "a_favor" },
      { party: "cc", stance: "a_favor" },
    ],
  },
  {
    id: "pensions",
    title: {
      es: "Que las pensiones suban con los precios y jubilar sin castigo",
      ca: "Que les pensions pugen amb els preus i jubilar-se sense càstig",
      gl: "Que as pensións suban cos prezos e xubilarse sen castigo",
      eu: "Pentsioek prezuekin igo dezaten eta zigorrik gabe erretiratzea",
    },
    description: {
      es: "Cada año las pensiones subirían al mismo ritmo que los precios, y quien ha trabajado toda su vida podría jubilarse sin que le recorten la pensión.",
      ca: "Cada any les pensions pujarien al mateix ritme que els preus, i qui ha treballat tota la vida podria jubilar-se sense que li retallen la pensió.",
      gl: "Cada ano as pensións subirían ao mesmo ritme que os prezos, e quen traballou toda a vida podería xubilarse sen que lle recorten a pensión.",
      eu: "Urtero pentsioek prezuekin abiadura berdinean igoko lukete, eta bizitza osoan lan egin duenak bere pentsioa murriztu gabe erretiratu ahal izango luke.",
    },
    context: {
      es: "Hoy muchas pensiones pierden poder de compra cuando la vida se encarece, y jubilarse antes de tiempo puede suponer una rebaja. Esta medida busca que la pensión no pierda valor y que cotizar toda la vida salga a cuenta. El coste lo asume la Seguridad Social, que habrá que financiar con impuestos o con cotizaciones.",
      ca: "Ara moltes pensions perden poder de compra quan la vida s'encareix, i jubilar-se abans de temps pot suposar una rebaixa. Esta mesura busca que la pensió no perda valor i que cotitzar tota la vida isca a compte. El cost l'assuma la Seguretat Social, que caldrà finançar amb impostos o amb cotitzacions.",
      gl: "Agora moitas pensións perden poder de compra cando a vida encarece, e xubilarse antes de tempo pode supoñer unha rebaixa. Esta medida busca que a pensión non perda valor e que cotizar toda a vida saia a conta. O custo asúmeo a Seguridade Social, que habera que finacialo con impostos ou con cotizacións.",
      eu: "Orain pentsio askok erosahotasuna galtzen dute bizitza garestitzen denean, eta aurretik erretiratzeak murrizketa ekar dezake. Neurri honek pentsioak balioa gal ez dezan eta bizitza osoan kotizatzeak merezi duela bilatzen du. Kostua Gizarte Segurantzak hartzen du, eta zergen edo kotizazioen bidez finantzatu beharko da.",
    },
    justification: {
      es: "En febrero de 2026 el Congreso convalidó la revalorización del RDL 3/2026 con el apoyo de todos los grupos, siendo Vox el único en contra. En septiembre de 2026 se aprobó la PNL de jubilación sin penalización con todos los grupos a favor, salvo el PP, que se abstuvo, y Vox, que votó en contra.",
      ca: "Al febrer de 2026 el Congrés va validar la revalorització del RDL 3/2026 amb el suport de tots els grups, amb Vox com a únic en contra. Al setembre de 2026 es va aprovar la PNL de jubilació sense penalització amb tots els grups a favor, excepte el PP, que es va abstindre, i Vox, que va votar en contra.",
      gl: "En febreiro de 2026 o Congreso validou a revalorización do RDL 3/2026 co apoio de todos os grupos, con Vox como único en contra. En setembro de 2026 aprobouse a PNL de xubilación sen penalización con todos os grupos a favor, agás o PP, que abstuvo, e Vox, que votou en contra.",
      eu: "2026ko otsailean Kongresuak RDL 3/2026ren berrizbalorizazioa balioztatu zuen talde guztien babesa, VOX bakarrik aurka. 2026ko irailean zigorrik gabeko erretiratzearen PNL onartu zen talde guztien alde, PPk abstentzioan bozkatu izan ezik, eta VOXek aurka.",
    },
    options: OPT.PFC,
    evidence: [
      votacion(
        "15-164-23",
        "Real Decreto-ley 3/2026, revalorización de las pensiones (convalidado: todos a favor salvo Vox)",
        "2026-02-26"
      ),
      votacion(
        "15-199-2",
        "PNL de jubilación sin penalización (aprobada, PP en abstención)",
        "2026-09-22"
      ),
    ],
    positions: [
      { party: "psoe", stance: "a_favor" },
      {
        party: "pp",
        stance: "parcial",
        note: {
          es: "Aprobó la revalorización de pensiones; se abstuvo en la PNL de jubilación sin penalización.",
          ca: "Va aprovar la revalorització de pensions; es va abstindre en la PNL de jubilació sense penalització.",
          gl: "Aprobou a revalorización das pensións; abstuvo na PNL de xubilación sen penalización.",
          eu: "Pentsioen berrizbalorizazioa onartu zuen; abstentzioan bozkatu zuen zigorrik gabeko erretiratzearen PNLan.",
        },
      },
      { party: "vox", stance: "en_contra" },
      { party: "fa", stance: "a_favor" },
      { party: "podemos", stance: "a_favor" },
      { party: "compromis", stance: "a_favor" },
      { party: "erc", stance: "a_favor" },
      { party: "junts", stance: "a_favor" },
      { party: "pnv", stance: "a_favor" },
      { party: "izqs", stance: "a_favor" },
      { party: "cc", stance: "a_favor" },
    ],
  },
  {
    id: "sanitat",
    title: {
      es: "Sanidad pública para todo el mundo, con o sin papeles",
      ca: "Sanitat pública per a tothom, amb o sense papers",
      gl: "Sanidade pública para todo o mundo, con ou sen papeis",
      eu: "Osasun publikoa denontzat, agiriekin edo agiririk gabe",
    },
    description: {
      es: "Cualquiera que viva aquí podría atenderse en la sanidad pública solo con empadronarse: también los menores, los migrantes y quienes no tienen papeles.",
      ca: "Qualsevol que visca aquí podria atendre's a la sanitat pública només amb empadronar-se: també els menors, els migrants i qui no té papers.",
      gl: "Calquera que viva aquí podería atenderse na sanidade pública só con empadroarse: tamén os menores, os migrantes e quen non ten papeis.",
      eu: "Hemen bizi den orok arta dezake osasun publikoan soilik erroldatzearekin: adingabeak, migratzaileak eta agiririk ez dutenak ere.",
    },
    context: {
      es: "Hoy, quien no tiene papeles o está sin empadronar a veces no puede curarse, y entre todos pagamos la factura porque los problemas se detectan tarde. Garantizar la atención por residencia cuesta dinero, pero se argumenta que sale más barato que atender en urgencias; también se pide controlar mejor los requisitos. Nadie tendría que elegir entre pagar una consulta o no curarse.",
      ca: "Hui, qui no té papers o està sense empadronar a vegades no pot curar-se, i entre tots paguem la factura perquè els problemes es detecten tard. Garantir l'atenció per residència costa diners, però s'argumenta que surt més barat que atendre en urgències; també es demana controlar millor els requisits. Ningú hauria de triar entre pagar una consulta o no curar-se.",
      gl: "Hoxe, quen non ten papeis ou está sen empadroar ás veces non pode curarse, e entre todos pagamos a factura porque os problemas detéctanse tarde. Garantir a atención por residencia custa diñeiro, pero s'argumenta que sae máis barato que atender en urxencias; tamén se pide controlar mellor os requisitos. Nadie tería que escoller entre pagar unha consulta ou non curarse.",
      eu: "Gaur, agiririk gabeko edo erroldatu gabe dagoenak batzuetan sendatu ezin du, eta denon kontura ordaintzen dugu factura, arazoak berandu detektatzen baitira. Egoitza-entzunbidea bermatzeak dirua kostatzen du, baina larrialdietan artatzea baino merkeagoa dela esaten da; baldintzak hobeto kontrolatzeko ere eskatzen da. Inork ez luke ordaindu edo sendatu aukeratu behar.",
    },
    justification: {
      es: "El 12 de febrero de 2025 el Congreso aprobó por unanimidad, salvo Vox, una moción sobre la atención sanitaria a los miles de migrantes que llegan a Canarias. La LO 4/2000 reconoce la atención sanitaria por empadronamiento, y en mayo de 2026 el Gobierno repartió fondos adicionales de salud mental.",
      ca: "El 12 de febrer de 2025 el Congrés va aprovar per unanimitat, excepte Vox, una moció sobre l'atenció sanitària als milers de migrants que arriben a les Canàries. La LO 4/2000 reconeix l'atenció sanitària per empadronament, i al maig de 2026 el Govern va repartir fons addicionals de salut mental.",
      gl: "O 12 de febreiro de 2025 o Congreso aprobou por unanimidade, agás Vox, unha moción sobre a atención sanitaria aos miles de migrantes que chegan a Canarias. A LO 4/2000 recoñece a atención sanitaria por empadroamento, e en maio de 2026 o Goberno repartiu fondos adicionais de saúde mental.",
      eu: "2025eko otsailaren 12an Kongresuak aho batez onartu zuen, VOXek izan ezik, Kanarietara iristen diren milaka migratzaileen osasun-arazoari buruzko mozio bat. 4/2000 LOak erroldatzeagatiko osasun-laguntza aitortzen du, eta 2026ko maiatzean Gobernuak osasun mentaleko gehigarriak banatu zituen.",
    },
    options: OPT.FPC,
    evidence: [
      votacion(
        "15-91-3",
        "Moción sobre atención sanitaria a migrantes en Canarias (aprobada por todos salvo Vox)",
        "2025-02-12"
      ),
    ],
    positions: [
      { party: "psoe", stance: "a_favor" },
      { party: "pp", stance: "a_favor" },
      { party: "vox", stance: "en_contra" },
      { party: "fa", stance: "a_favor" },
      { party: "podemos", stance: "a_favor" },
      { party: "compromis", stance: "a_favor" },
      { party: "erc", stance: "a_favor" },
      { party: "junts", stance: "a_favor" },
      { party: "pnv", stance: "a_favor" },
      { party: "izqs", stance: "a_favor" },
      { party: "cc", stance: "a_favor" },
    ],
  },
  {
    id: "educacio",
    title: {
      es: "Todos en la clase de siempre y educación sexual en el aula",
      ca: "Tots a l'aula de sempre i educació sexual a l'aula",
      gl: "Todos na aula de sempre e educación sexual na aula",
      eu: "Denak gelan betiko eta hezkuntza sexuala gelan",
    },
    description: {
      es: "El alumnado con necesidades especiales seguiría en la clase de siempre con apoyos, y en el colegio se hablaría también de afectividad, sexualidad y emociones.",
      ca: "L'alumnat amb necessitats especials continuaria a l'aula de sempre amb suports, i a l'escola es parlaria també d'afectivitat, sexualitat i emocions.",
      gl: "O alumnado con necesidades especiais continuaría na aula de sempre con apoios, e no colexio tamén se falaría de afectividade, sexualidade e emocións.",
      eu: "Behar bereziko ikasleek betiko gelan jarraituko lukete laguntzekin, eta eskolan afektibitateaz, sexualitateaz eta emozioaz ere hitz egingo litzateke.",
    },
    context: {
      es: "Quien lo defensa dice que así nadie queda apartado del grupo y que hablar en clase de afectos y sexualidad ayuda a prevenir el acoso; quien lo pone en duda teme que los maestros no estén preparados, que se quite tiempo a otras materias y que sean las familias quienes decidan esos temas. Habría que meter más apoyos en el aula y respetar lo que cada familia quiera.",
      ca: "Qui ho defensa diu que així ningú queda apartat del grup i que parlar a l'aula d'afectes i sexualitat ajuda a previndre l'assetjament; qui ho posa en duda teme que els mestres no estiguen preparats, que es traga temps a altres matèries i que siguen les famílies qui decidisca aquests temes. Caldria posar més suports a l'aula i respectar el que cada família vullga.",
      gl: "Quen o defende di que así ninguén queda apartado do grupo e que falar na aula de afectos e sexualidade axuda a previr o acoso; quen o pon en duda teme que os mestres non estean preparados, que se lle quite tempo a outras materias e que sexan as familias quen decida estes temas. Habería que meter máis apoios na aula e respectar o que cada familia queira.",
      eu: "Aldekoek dioela inork ez dela taldetik kanpo geratzen eta gelan afektuez eta sexualitateaz hitz egitea jazarpena prebenitzen laguntzen duela esaten dute; zalantzan jartzen dutenek irakasleak prest ez daudela, beste materietako denbora kentzea eta gai horien inguruan familiak erabakitzea beldur dira. Gelan laguntza gehiago jarri beharko litzateke eta familia bakoitzak nahi duena errespetatu.",
    },
    justification: {
      es: "En septiembre de 2025 el Congreso rechazó la PNL del PP para eliminar la preferencia de escolarización ordinaria del alumnado con NESE (170 a favor del PP, Vox y UPN; 177 en contra). En junio de 2026 aprobó la PNL del PSOE sobre educación afectivo-sexual, con Junts en abstención y el PP, Vox y UPN en contra.",
      ca: "Al setembre de 2025 el Congrés va rebutjar la PNL del PP per eliminar la preferència d'escolarització ordinària de l'alumnat amb NESE (170 a favor del PP, Vox i UPN; 177 en contra). Al juny de 2026 va aprovar la PNL del PSOE sobre educació afectivo-sexual, amb Junts en abstenció i el PP, Vox i UPN en contra.",
      gl: "En setembro de 2025 o Congreso rexeitou a PNL do PP para eliminar a preferencia de escolarización ordinaria do alumnado con NESE (170 a favor do PP, Vox e UPN; 177 en contra). En xuño de 2026 aprobou a PNL do PSOE sobre educación afectivo-sexual, con Junts en abstención e o PP, Vox e UPN en contra.",
      eu: "2025eko irailean Kongresuak PPren PNLa ukatu zuen HEED-eko ikasleen eskolatze arruntaren lehentasuna kentzeko (170 alde PP, VOX eta UPN; 177 aurka). 2026ko ekainean PSOEren PNL onartu zuen hezkuntza afektibo-sexualari buruz, Junts abstentzioan eta PP, VOX eta UPN aurka.",
    },
    options: OPT.CPF,
    evidence: [
      votacion(
        "15-129-1",
        "PNL del PP sobre escolarización del alumnado con NESE (rechazada)",
        "2025-09-09"
      ),
      votacion(
        "15-191-14",
        "PNL del PSOE de educación afectivo-sexual (aprobada, Junts en abstención)",
        "2026-06-25"
      ),
    ],
    positions: [
      { party: "psoe", stance: "a_favor" },
      { party: "pp", stance: "en_contra" },
      { party: "vox", stance: "en_contra" },
      { party: "fa", stance: "a_favor" },
      { party: "podemos", stance: "a_favor" },
      { party: "compromis", stance: "a_favor" },
      { party: "erc", stance: "a_favor" },
      {
        party: "junts",
        stance: "parcial",
        note: {
          es: "Se opuso a eliminar la escolarización ordinaria (PNL del PP) y se abstuvo en la de educación afectivo-sexual.",
          ca: "Es va oposar a eliminar l'escolarització ordinària (PNL del PP) i es va abstindre en la d'educació afectivo-sexual.",
          gl: "Opuñose a eliminar a escolarización ordinaria (PNL do PP) e abstuvo na de educación afectivo-sexual.",
          eu: "Eskolatze arrunta kentzearen aurka bozkatu zuen (PPren PNL) eta hezkuntza afektibo-sexualean abstentzioan.",
        },
      },
      { party: "pnv", stance: "a_favor" },
      { party: "izqs", stance: "a_favor" },
      { party: "cc", stance: "a_favor" },
    ],
  },
  {
    id: "clima",
    title: {
      es: "Apostar por la energía limpia y frenar el cambio climático",
      ca: "Apostar per l'energia neta i frenar el canvi climàtic",
      gl: "Apostar pola enerxía limpa e frear o cambio climático",
      eu: "Energia garbia aukeratu eta klima-aldaketa gelditu",
    },
    description: {
      es: "Retirar poco a poco los coches y calefacciones de gasoil, apoyar el viento y el sol y ahorrar energía en casa.",
      ca: "Retirar a poces cotxes i calefaccions de gasoil, donar suport al vent i al sol i estalviar energia a casa.",
      gl: "Retirar a pouco os coches e calefaccións de gasóleo, apoiar o vento e o sol e aforrar enerxía na casa.",
      eu: "Poliki-poliki kotxeak eta erregaizko berogailuak kentzea, haizea eta eguzkia babestea eta etxean energia aurreztea.",
    },
    context: {
      es: "La idea es contaminar menos para llegar a los objetivos de 2050: más tren y autobús, más placas y molinos y menos factura de la luz. Sus defensores hablan de aire más limpio, trabajos nuevos y no depender del gas de fuera; sus críticos temen que se encarezca el combustible, que se pierdan puestos en la industria y el coche, y que las renovables no aguanten sin respaldo. El cambio costará dinero y costumbres, y habrá que acompañar a los que más lo noten.",
      ca: "La idea és contaminar menys per a complir els objectius del 2050: més tren i autobús, més plaques i molins i menys factura de la llum. Qui ho defensa parla d'aire més net, treballs nous i no dependre del gas de fora; qui ho tem diu que es carregarà el combustible, que es perdran llocs a la indústria i el cotxe, i que les renovables no aguanten sense suport. El canvi costarà diners i costums, i caldrà acompanyar als que més ho noten.",
      gl: "A idea é contaminar menos para cumprir os obxectivos do 2050: máis tren e autobús, máis placas e muíños e menos factura da luz. Quen o defende fala de aire máis limpo, traballos novos e non depender do gas de fóra; quen o teme di que se encarecerá o combustible, que se perderán postos na industria e o coche, e que as renovables non aguanten sen respaldo. O cambio custará diñeiro e costumes, e habera que acompañar aos que máis o noten.",
      eu: "Idea kutsatzeko gutxiago dela 2050eko helburuak betetzeko: tren gehiago, autobus gehiago, plaka gehiago eta haize-errota gehiago, eta argi-faktura gutxiago. Aldekoek aire garbiagoaz, lan berriak eta kanpoko gasarekiko dependentziarik ez izateaz hitz egiten dute; beldur direnek erregaia garestitzea, industria eta kotxeetako lanpostuak galtzea eta babesik gabe erreserbarik ez dutela uste dute. Aldaketak dirua eta ohituren kostua izango du, eta gehien dutenak lagundu beharko dira.",
    },
    justification: {
      es: "La Ley 7/2021 fija la neutralidad climática en 2050 y el RDL 10/2022 limitó el precio del gas durante la crisis de la guerra de Ucrania. En la XV legislatura todos los grupos apoyaron mayoritariamente las medidas del Pacto Verde, excepto Vox, que vota sistemáticamente en contra.",
      ca: "La Llei 7/2021 fixa la neutralitat climàtica el 2050 i el RDL 10/2022 va limitar el preu del gas durant la crisi de la guerra d'Ucraïna. A la XV legislatura tots els grups van donar suport majoritàriament a les mesures del Pacte Verd, excepte Vox, que vota sistemàticament en contra.",
      gl: "A Lei 7/2021 fixa a neutralidade climática no 2050 e o RDL 10/2022 limitou o prezo do gas durante a crise da guerra de Ucraína. Na XV lexislatura todos os grupos apoiaron maioritariamente as medidas do Pacto Verde, agás Vox, que vota sistemáticamente en contra.",
      eu: "7/2021 Legeak klima-neutralitatea 2050ean finkatzen du, eta 10/2022 RDLak gasaren prezua mugatu zuen Ukrainako gerraren krisian. XV legegintzaldian talde guztiek Hesi Berdeko neurriak babestu zituzten gehiengoz, VOXek izan ezik, sistemaren aurka bozkatzen duelako.",
    },
    options: OPT.PCF,
    evidence: [
      votacion(
        "15-88-65",
        "Moción del PNV sobre transición energética e inversión en redes (punto 8 aprobado)",
        "2024-12-19"
      ),
    ],
    positions: [
      { party: "psoe", stance: "a_favor" },
      { party: "pp", stance: "a_favor" },
      { party: "vox", stance: "en_contra" },
      { party: "fa", stance: "a_favor" },
      { party: "podemos", stance: "a_favor" },
      { party: "compromis", stance: "a_favor" },
      { party: "erc", stance: "a_favor" },
      { party: "junts", stance: "a_favor" },
      { party: "pnv", stance: "a_favor" },
      {
        party: "izqs",
        stance: "parcial",
        note: {
          es: "EH Bildu votó a favor y BNG se abstuvo en la moción enlazada.",
          ca: "EH Bildu va votar a favor i BNG es va abstindre en la moció enllaçada.",
          gl: "EH Bildu votou a favor e BNG abstuvo na moción ligada.",
          eu: "EH Bildu-k alde bozkatu zuen eta BNG-k abstentzioan lotutako mozioan.",
        },
      },
      { party: "cc", stance: "a_favor" },
    ],
  },
  {
    id: "territorial",
    title: {
      es: "Amnistía para quienes participaron en el procés",
      ca: "Amnistia per a qui va participar en el procés",
      gl: "Amnistía para quen participou no procés",
      eu: "Prozesuan parte hartu zutenentzako amnistia",
    },
    description: {
      es: "Perdonar las multas y condenas de quienes montaron el referéndum independentista de 2017 y dejarles volver a la política.",
      ca: "Perdonar les multes i condemnes de qui van muntar el referèndum independentista del 2017 i deixar-los tornar a la política.",
      gl: "Perdoar as multas e condenas de quen montou o referendo independentista do 2017 e deixarlles voltar á política.",
      eu: "2017ko independentzia erreferenduma antolatu zutenen isun eta zigorrei barkamena eta politikara itzultzeko baimena ematea.",
    },
    context: {
      es: "La amnistía permitió a los implicados en el procés volver a la política y a sus cargos, y borró las sanciones por desobediencia. Quienes la apoyan dicen que así se cierra una herida y se deja de perseguir ideas; quienes la rechazan ven una injusticia para quienes cumplieron la ley y temen que se dé por buena la desobediencia. En Cataluña sigue el desacuerdo: unos piden perdón, otros quieren ir más allá.",
      ca: "L'amnistia va permetre als implicats en el procés tornar a la política i als seus càrrecs, i va esborrar les sancions per desobediència. Qui la recolza diu que així es tanca una ferida i es deixa de perseguir idees; qui la rebutja veu una injustícia per a qui va complir la llei i teme que es done per bona la desobediència. A Catalunya continua el desacord: uns demanen perdó, uns altres volen anar més enllà.",
      gl: "A amnistía permitiu aos implicados no procés voltar á política e aos seus cargos, e borrou as sancións por desobediencia. Quen a apoia di que así se pecha unha ferida e se deixa de perseguir ideas; quen a rexeita ve unha inxustiza para quen cumpriu a lei e teme que se dea por boa a desobediencia. En Cataluña segue o desacordo: uns piden perdón, outros queren ir máis alá.",
      eu: "Amnistiak prozesuan inplikatuei politikara eta karguetara itzultzeko aukera eman zien, eta desobedientziagatiko zigorrak ezabatu zituen. Aldekoek horrela zauria itxaten dela eta ideiak ez jazar-tzea diote; aurkakoek legea bete zutenentzako injustizia ikusten dute eta desobedientzia onartzearen beldur dira. Katalunian desadostasuna jarraitzen du: batzuek barkamena eskatzen dute, beste batzuek urrutiago joan nahi dute.",
    },
    justification: {
      es: "La LO 1/2024 se aprobó el 30 de mayo de 2024; el PP presentó un recurso ante el Tribunal Constitucional (6436-2024). En la toma en consideración (14/03/2024) solo PP, Vox, UPN y Coalición Canaria votaron en contra (172 frente a 178 a favor).",
      ca: "La LO 1/2024 es va aprovar el 30 de maig de 2024; el PP va presentar un recurs davant el Tribunal Constitucional (6436-2024). En la presa en consideració (14/03/2024) només PP, Vox, UPN i Coalició Canària van votar en contra (172 davant 178 a favor).",
      gl: "A LO 1/2024 aprobouse o 30 de maio de 2024; o PP presentou un recurso ante o Tribunal Constitucional (6436-2024). Na toma en consideración (14/03/2024) só PP, Vox, UPN e Coalición Canaria votaron en contra (172 fronte 178 a favor).",
      eu: "1/2024 LOa 2024ko maiatzaren 30ean onartu zen; PPrek helegitea aurkeztu zuen Konstituzio Auzitegian (6436-2024). Kontsiderazio hartzeko bozketan (14/03/2024) PP, VOX, UPN eta Kanariar Koalizioak bakarrik bozkatu zuten aurka (172 aurre 178 alde).",
    },
    options: OPT.FCP,
    evidence: [
      votacion(
        "15-30-1",
        "Proposición de Ley Orgánica de amnistía (toma en consideración aprobada)",
        "2024-03-14"
      ),
    ],
    positions: [
      { party: "psoe", stance: "a_favor" },
      { party: "pp", stance: "en_contra" },
      { party: "vox", stance: "en_contra" },
      { party: "fa", stance: "a_favor" },
      { party: "podemos", stance: "a_favor" },
      { party: "compromis", stance: "a_favor" },
      { party: "erc", stance: "a_favor" },
      { party: "junts", stance: "a_favor" },
      { party: "pnv", stance: "a_favor" },
      { party: "izqs", stance: "a_favor" },
      { party: "cc", stance: "en_contra" },
    ],
  },
  {
    id: "drets",
    title: {
      es: "Igualdad para personas trans y memoria de las víctimas",
      ca: "Igualtat per a les persones trans i memòria de les víctimes",
      gl: "Igualdade para as persoas trans e memoria das vítimas",
      eu: "Pertsona transen berdintasuna eta biktimen memoria",
    },
    description: {
      es: "Que las personas trans puedan cambiar su nombre y género en los papeles sin informes médicos, y reconocer a quienes sufrieron la dictadura.",
      ca: "Que les persones trans puguen canviar el seu nom i gènere en els papers sense informes mèdics, i reconéixer a qui van patir la dictadura.",
      gl: "Que as persoas trans poidan cambiar o seu nome e xénero nos papeis sen informes médicos, e recoñecer a quen padeceron a ditadura.",
      eu: "Pertsona transak agirietan izena eta generoa mediku-txostenik gabe aldatu ahal izatea, eta diktadura jasan zutenak aitortzea.",
    },
    context: {
      es: "El cambio de nombre y género en el DNI se haría por declaración, sin informes médicos, y se ampliaría la protección frente a los delitos de odio; la memoria de las víctimas del franquismo traería reconocimiento, exhumaciones y retirar honores a los responsables. Quienes lo apoyan lo ven una cuestión de dignidad y de no dejar a nadie atrás; quienes lo cuestionan temen que se rompan garantías o que se reabran heridas sin consenso. En la práctica, el colectivo LGTBI sigue sufriendo más agresiones que la media.",
      ca: "El canvi de nom i gènere en el DNI es faria per declaració, sense informes mèdics, i s'ampliaria la protecció davant dels delictes d'odi; la memòria de les víctimes del franquisme portaria reconeixement, exhumacions i retirar honors als responsables. Qui ho recolza ho veu una qüestió de dignitat i de no deixar ningú enrere; qui ho qüestiona teme que es trenquen garanties o que es reobren ferides sense consens. En la pràctica, el col·lectiu LGTBI continua patint més agressions que la mitjana.",
      gl: "O cambio de nome e xénero no DNI faríase por declaración, sen informes médicos, e ampliaríase a protección fronte aos delitos de odio; a memoria das vítimas do franquismo traería recoñecemento, exhumacións e retirar honores aos responsables. Quen o apoia ve unha cuestión de dignidade e de non deixar a ninguén atrás; quen o cuestiona teme que se rompan garantías ou que se reabran feridas sen consenso. Na práctica, o colectivo LGTBI segue a sufrir máis agresións que a media.",
      eu: "DNIan izena eta generoa adierazpen bidez aldatuko lirateke, mediku-txostenik gabe, eta gorroto-delituen babesa zabalduko litzateke; frankismoaren biktimen memoriak aitorpena, hobenak eta arduradunei ohoreak kentzea ekarriko lituzke. Aldekoek duintasun gai bat dela eta inor atzean uzten ez dela ikusten dute; zalantzan jartzen dutenek bermatasunak hautsi edo adostasunik gabe zauriak berriro irekitzeko beldurra dute. Praktikan, LGTBI kolektiboak batez bestekoaren aurpegarri jazarpen gehiago jasaten ditu.",
    },
    justification: {
      es: "La Ley 4/2023 garantiza la igualdad trans y la Ley 20/2022 de Memoria Democrática reconoce a las víctimas del franquismo. En el eje de derechos LGTBI y memoria, PP y Vox votan sistemáticamente en contra; Coalición Canaria y Junts apoyaron la mayoría de normas (Junts se dividió en la memoria).",
      ca: "La Llei 4/2023 garanteix la igualtat trans i la Llei 20/2022 de Memòria Democràtica reconeix les víctimes del franquisme. A l'eix de drets LGTBI i memòria, PP i Vox voten sistemàticament en contra; Coalició Canària i Junts van donar suport a la majoria de normes (Junts es va dividir en la memòria).",
      gl: "A Lei 4/2023 garante a igualdade trans e a Lei 20/2022 de Memoria Democrática recoñece as vítimas do franquismo. No eixe de dereitos LGTBI e memoria, PP e Vox votan sistemáticamente en contra; Coalición Canaria e Junts apoiaron a maioría das normas (Junts dividiuse na memoria).",
      eu: "4/2023 Legeak berdintasun transa bermatzen du eta 20/2022 Memoria Demokratikoaren Legeak frankismoaren biktimei aitortza ematen die. LGBTI eskubide eta memoriaren ardatzean, PP eta VOX-ek sistemaren aurka bozkatzen dute; Kanariar Koalizioak eta Junts-ek araudi gehiena onartu dute (Junts banandu zen memorian).",
    },
    options: OPT.CFP,
    evidence: [
      votacion(
        "15-169-54",
        "Real Decreto-ley 6/2026, de memoria democrática (tramitación como Proyecto de Ley)",
        "2026-03-26"
      ),
    ],
    positions: [
      { party: "psoe", stance: "a_favor" },
      { party: "pp", stance: "en_contra" },
      { party: "vox", stance: "en_contra" },
      { party: "fa", stance: "a_favor" },
      { party: "podemos", stance: "a_favor" },
      { party: "compromis", stance: "a_favor" },
      { party: "erc", stance: "a_favor" },
      { party: "junts", stance: "a_favor" },
      { party: "pnv", stance: "a_favor" },
      { party: "izqs", stance: "a_favor" },
      { party: "cc", stance: "a_favor" },
    ],
  },
  {
    id: "defensa",
    title: {
      es: "Gastar más en el ejército (el 2% del PIB)",
      ca: "Gastar més en l'exèrcit (el 2% del PIB)",
      gl: "Gastar máis no exército (o 2% do PIB)",
      eu: "Armadan gastu gehiago (BPGren %2a)",
    },
    description: {
      es: "Dedicar más dinero del presupuesto a armas, bases y soldados, hasta llegar al 2% de lo que produce el país.",
      ca: "Dedicar més diners del pressupost a armes, bases i soldats, fins a arribar al 2% del que produïx el país.",
      gl: "Dedicar máis diñeiro do presuposto a armas, bases e soldados, ata chegar ao 2% do que produce o país.",
      eu: "Aurrekontuko diru gehiago arma, base eta soldaduetara herrialdeak ekoizten duenaren %2ra iritsi arte.",
    },
    context: {
      es: "Más gasto militar significa comprar aviones, barcos y misiles y reforzar las bases; el compromiso internacional es llegar al 2% de lo que produce el país. Quienes lo defienden creen que así España cumple con sus aliados y que parte del dinero volverá como encargos a la industria; sus críticos ven que hay que escoger entre cañones y sanidad o escuelas, y que muchas misiones militares no sirven para evitar guerras. El dinero es del presupuesto común: lo que se gasta aquí no se gasta en otra parte.",
      ca: "Més despesa militar significa comprar avions, vaixells i míssils i reforçar les bases; el compromís internacional és arribar al 2% del que produïx el país. Qui ho defensa creu que així Espanya compleix amb els seus aliats i que part del diner tornarà com a encàrrecs a la indústria; qui ho tem veu que cal escollir entre canons i sanitat o escoles, i que moltes missions militars no serveixen per a evitar guerres. El diner és del pressupost comú: el que es gasta ací no es gastarà en una altra part.",
      gl: "Máis gasto militar significa comprar avións, barcos e mísiles e reforzar as bases; o compromiso internacional é chegar ao 2% do que produce o país. Quen o defende cre que así España cumpre cos seus aliados e que parte do diñeiro volverá como encargos á industria; quen o teme ve que hai que escoller entre canóns e sanidade ou escolas, e que moitas misións militares non serve para evitar guerras. O diñeiro é do presuposto común: o que se gasta aquí non se gastará noutra parte.",
      eu: "Militar gastu handiagoak hegazkinak, itsasontziak eta misilak erostea eta baseak indartzea esan nahi du; nazioarteko konpromisoa herrialdeak ekoizten duenaren %2ra iristea da. Aldekoek Espainiak aliatuekin betetzen duela eta diruaren zati bat industriako eskaeretan itzuliko dela uste dute; beldur direnek kanoiak eta osasuna edo eskolak artean aukeratu behar dela eta misio militar askok gerrak ekiditeko balio ez dutela ikusten dute. Dirua aurrekontu komuna da: hemen gastatzen dena beste nonbait ez da gastatuko.",
    },
    justification: {
      es: "En junio de 2025 el Gobierno anunció un acuerdo con la OTAN para el 2,1% del PIB en defensa (10.471 M€ adicionales en 2025). En el eje de gasto militar, PP, UPN, Vox, PNV y Coalición Canaria votan a favor; Sumar, ERC, EH Bildu y BNG, en contra; Junts se dividió entre apoyos y abstenciones.",
      ca: "Al juny de 2025 el Govern va anunciar un acord amb l'OTAN per al 2,1% del PIB en defensa (10.471 M€ addicionals el 2025). A l'eix de despesa militar, PP, UPN, Vox, PNV i Coalició Canària voten a favor; Sumar, ERC, EH Bildu i BNG, en contra; Junts es va dividir entre suports i abstencions.",
      gl: "En xuño de 2025 o Goberno anunciou un acordo coa OTAN para o 2,1% do PIB en defensa (10.471 M€ adicionais en 2025). No eixe de gasto militar, PP, UPN, Vox, PNV e Coalición Canaria votan a favor; Sumar, ERC, EH Bildu e BNG, en contra; Junts dividiuse entre apoios e abstencións.",
      eu: "2025eko ekainean Gobernuak NATOrekin akordioa iragarri zuen defentsarako BPGren %2,1erako (10.471 milioi euro gehiago 2025ean). Militar gastuaren ardatzean, PP, UPN, VOX, EAJ eta Kanariar Koalizioak alde bozkatzen dute; Sumar, ERC, EH Bildu eta BNG-ek aurka; Junts banandu egin zen babesen eta abstentzioen artean.",
    },
    options: OPT.FPC,
    evidence: [
      votacion(
        "15-40-7",
        "Moción del PP: compromiso con la OTAN del 2% del PIB en defensa (punto 3 aprobado)",
        "2024-05-23"
      ),
    ],
    positions: [
      {
        party: "psoe",
        stance: "a_favor",
        note: {
          es: "El Gobierno se comprometió al 2,1% del PIB; sus votaciones en el eje están divididas (3 a favor, 3 en contra).",
          ca: "El Govern es va comprometre al 2,1% del PIB; els seus vots a l'eix estan dividits (3 a favor, 3 en contra).",
          gl: "O Goberno comprometeuse ao 2,1% do PIB; os seus votos no eixe están divididos (3 a favor, 3 en contra).",
          eu: "Gobernuak BPGren %2,1erako konpromisoa hartu zuen; ardatzean bere bozketa banatuta dago (3 alde, 3 aurka).",
        },
      },
      { party: "pp", stance: "a_favor" },
      { party: "vox", stance: "a_favor" },
      { party: "fa", stance: "en_contra" },
      { party: "podemos", stance: "en_contra" },
      { party: "compromis", stance: "en_contra" },
      { party: "erc", stance: "en_contra" },
      {
        party: "junts",
        stance: "abstencion",
        note: {
          es: "Se abstuvo en la votación enlazada; en el eje de gasto militar, posiciones divididas (2 a favor, 1 en contra, 3 abstenciones).",
          ca: "Es va abstindre en la votació enllaçada; a l'eix de despesa militar, posicions dividides (2 a favor, 1 en contra, 3 abstencions).",
          gl: "Abstuvo na votación ligada; no eixe de gasto militar, posicións divididas (2 a favor, 1 en contra, 3 abstencións).",
          eu: "Lotutako bozketan abstentzioan; militar gastuaren ardatzean, posizio banatuak (2 alde, 1 aurka, 3 abstentzio).",
        },
      },
      { party: "pnv", stance: "a_favor" },
      { party: "izqs", stance: "en_contra" },
      { party: "cc", stance: "a_favor" },
    ],
  },
  {
    id: "treball",
    title: {
      es: "Trabajar menos horas (hacia 35-37,5 a la semana)",
      ca: "Treballar menys hores (cap a 35-37,5 a la setmana)",
      gl: "Traballar menos horas ( cara 35-37,5 á semana)",
      eu: "Lan ordu gutxiago (astero 35-37,5era)",
    },
    description: {
      es: "Bajar el tope de horas que se puede obligar a trabajar a la semana sin cobrar más, y con el mismo sueldo.",
      ca: "Baixar el sostre d'hores que es pot obligar a treballar a la setmana sense cobrar més, i amb el mateix sou.",
      gl: "Baixar o teito de horas que se pode obrigar a traballar á semana sen cobrar máis, e co mesmo salario.",
      eu: "Aste osoan ordaindu gabe lan egitera derrigotu ahal den orduen muga jaitsi, soldata berarekin.",
    },
    context: {
      es: "La jornada ya bajó a 37,5 horas y hay quien quiere ir a 35; el sueldo y las vacaciones no cambiarían. Para quien lo defiende es tiempo para la familia, la salud y consumir menos; para quien lo teme, menos horas pueden ser menos producción, turnos más difíciles en fábricas y servicios y la presión de contratar a dos por el mismo trabajo. Las empresas pequeñas dicen que no podrán seguir igual; los sindicatos piden que nadie pierda sueldo por hacer las mismas horas.",
      ca: "La jornada ja ha baixat a 37,5 hores i hi ha qui vol anar a 35; el sou i les vacances no canviarien. Per a qui ho defensa és temps per a la família, la salut i consumir menys; per a qui ho tem, menys hores poden ser menys producció, torns més difícils a fàbriques i serveis i la pressió de contractar a dos pel mateix treball. Les petites empreses diuen que no podran seguir igual; els sindicats demanen que ningú perda sou per fer les mateixes hores.",
      gl: "A xornada xa baixou a 37,5 horas e hai quen quere ir a 35; o salario e as vacacións non cambiarían. Para quen o defende é tempo para a familia, a saude e consumir menos; para quen o teme, menos horas poden ser menos produción, quendas máis difíciles nas fábricas e servizos e a presión de contratar a dous polo mesmo traballo. As pequenas empresas din que non poderán seguir igual; os sindicatos piden que ninguén perda salario por facer as mesmas horas.",
      eu: "Lan-eguna 37,5 orduetara jaitsi da eta 35era joan nahi duenik dago; soldata eta oporrak ez lirateke aldatuko. Aldekoentzat familia, osasunerako eta gutxiago kontsumitzeko denbora da; beldur direnentzat, ordu gutxiagoak ekoizpen gutxiago, lantegi eta zerbitzuetako txanda zailagoak eta lan bererako bi kontratatzearen presioa izan daitezke. Enpresa txikiek berdin jarraituko ez dutela diote; sindikatuek inork ez dadila soldata galtzen ordu berak egiten dituelako eskatzen dute.",
    },
    justification: {
      es: "El Congreso aprobó en 2024 la PNL de reducción de jornada (162/000129) y rechazó en 2025 la PNL de 35 horas (122/000159), con el PP, Vox y UPN en contra y el PNV en abstención. El salario mínimo se fijó por decreto en febrero de 2026 (RD 126/2026). Junts se abstuvo en la reducción general de jornada y votó en contra de la de 35 horas.",
      ca: "El Congrés va aprovar el 2024 la PNL de reducció de jornada (162/000129) i va rebutjar el 2025 la PNL de 35 hores (122/000159), amb el PP, Vox i UPN en contra i el PNV en abstenció. El salari mínim es va fixar per decret al febrer de 2026 (RD 126/2026). Junts es va abstindre en la reducció general de jornada i va votar en contra de la de 35 hores.",
      gl: "O Congreso aprobou en 2024 a PNL de redución de xornada (162/000129) e rexeitou en 2025 a PNL de 35 horas (122/000159), co PP, Vox e UPN en contra e o PNV en abstención. O salario mínimo fixouse por decreto en febreiro de 2026 (RD 126/2026). Junts abstuvo na redución xeral de xornada e votou en contra da de 35 horas.",
      eu: "Kongresuak 2024an lan-eguna murriztzeko PNLa onartu zuen (162/000129) eta 2025ean 35 orduko PNLa ukatu (122/000159), PP, VOX eta UPN aurka eta EAJ abstentzioan. Gutxieneko soldata dekretuz finkatu zen 2026ko otsailean (126/2026 RD). Junts-ek abstentzioan bozkatu zuen lan-egunaren murrizketa orokorrean eta aurka 35 ordukoan.",
    },
    options: OPT.PCF,
    evidence: [
      votacion(
        "15-23-2",
        "PNL de reducción de la jornada máxima legal (aprobada)",
        "2024-02-22"
      ),
      votacion(
        "15-137-1",
        "PNL de reducción de la jornada a 35 horas (rechazada)",
        "2025-10-14"
      ),
    ],
    positions: [
      { party: "psoe", stance: "a_favor" },
      {
        party: "pp",
        stance: "en_contra",
        note: {
          es: "Se abstuvo en la PNL de reducción general de jornada y votó en contra de la de 35 horas.",
          ca: "Es va abstindre en la PNL de reducció general de jornada i va votar en contra de la de 35 hores.",
          gl: "Abstuvo na PNL de redución xeral de xornada e votou en contra da de 35 horas.",
          eu: "Lan-egunaren murrizketa orokorreko PNLan abstentzioan bozkatu zuen eta 35 ordukoaren aurka.",
        },
      },
      { party: "vox", stance: "en_contra" },
      { party: "fa", stance: "a_favor" },
      { party: "podemos", stance: "a_favor" },
      { party: "compromis", stance: "a_favor" },
      { party: "erc", stance: "a_favor" },
      {
        party: "junts",
        stance: "en_contra",
        note: {
          es: "Se abstuvo en la PNL de reducción general de jornada y votó en contra de la de 35 horas.",
          ca: "Es va abstindre en la PNL de reducció general de jornada i va votar en contra de la de 35 hores.",
          gl: "Abstuvo na PNL de redución xeral de xornada e votou en contra da de 35 horas.",
          eu: "Lan-egunaren murrizketa orokorreko PNLan abstentzioan bozkatu zuen eta 35 ordukoaren aurka.",
        },
      },
      {
        party: "pnv",
        stance: "parcial",
        note: {
          es: "Votó a favor de la reducción general de jornada y se abstuvo en la de 35 horas.",
          ca: "Va votar a favor de la reducció general de jornada i es va abstindre en la de 35 hores.",
          gl: "Votou a favor da redución xeral de xornada e abstuvo na de 35 horas.",
          eu: "Lan-egunaren murrizketa orokorraren alde bozkatu zuen eta 35 ordukoan abstentzioan.",
        },
      },
      { party: "izqs", stance: "a_favor" },
      {
        party: "cc",
        stance: "parcial",
        note: {
          es: "Votó a favor de la reducción general de jornada y se abstuvo en la PNL de 35 horas.",
          ca: "Va votar a favor de la reducció general de jornada i es va abstindre en la PNL de 35 hores.",
          gl: "Votou a favor da redución xeral de xornada e abstuvo na PNL de 35 horas.",
          eu: "Lan-egunaren murrizketa orokorraren alde bozkatu zuen eta 35 orduko PNLan abstentzioan.",
        },
      },
    ],
  },
  {
    id: "mordaza",
    title: {
      es: "Endulzar la «ley mordaza»: menos multas por protestar",
      ca: "Endolcir la «llei mordassa»: menys multes per manifestar-se",
      gl: "Amansar a «lei mordaza»: menos multas por manifestarse",
      eu: "«Mordaza legea» arintzea: gutxiago isuna protestagatik",
    },
    description: {
      es: "Reducir las multas por desobedecer a la policía o por insultar a un agente, y que solo un juez pueda imponerlas.",
      ca: "Reduir les multes per desobeir la policia o per insultar un agent, i que només un jutge puga imposar-les.",
      gl: "Reducir as multas por desobedecer á policía ou por insultar un axente, e que só un xuíz poida impoñelas.",
      eu: "Poliziari desobeditzeagatiko edo agente bat iraintzeagatiko isunak murriztea, eta epaile batek bakarrik ezar ditzan.",
    },
    context: {
      es: "Hoy la policía puede multar por desobediencia o por una conducta que considera grave, sin que nadie lo autorice antes. La reforma busca que solo un juez pueda poner esas multas y que bajen las cantidades. Para quienes la apoyan es proteger el derecho a protestar y evitar abusos; para quienes la rechazan es dejar a la policía sin herramientas frente a altercados y dar pie a que se impida trabajar. En las manifestaciones siguen habiendo heridos y sanciones en las dos direcciones.",
      ca: "Hui la policia pot multar per desobediència o per una conducta que considera greu, sense que ningú ho autorise abans. La reforma busca que només un jutge puga posar eixes multes i que baixen les quantitats. Qui la recolza parla de protegir el dret a manifestar-se i evitar abusos; qui la rebutja diu que deixa la policia sense eines davant d'aldarulls i dona peu a que s'impedisque treballar. En les manifestacions continuen havent-hi ferits i sancions en les dues direccions.",
      gl: "Hoxe a policía pode multar por desobediencia ou por unha conduta que considera grave, sen que ninguño o autorice antes. A reforma busca que só un xuíz poida poñer esas multas e que baixen as cantidades. Quen a apoia fala de protexer o dereito a manifestarse e evitar abusos; quen a rexeita di que deixa á policía sen ferramentas fronte a alborotos e dá pé a que se impida traballar. Nas manifestacións seguen habendo feridos e sancións nas dúas direccións.",
      eu: "Gaur poliziak desobedientzia edo larritzat jotzen duen jokabideagatiko isuna eman dezake, inork baimendu aurretik. Erreformak epaile batek bakarrik isun horiek jartzeko aukera eta zenbatekoak jaisteko bidea bilatzen du. Aldekoek protestatzeko eskubidea babestea eta gehiegikeriak saihestea da; aurkakoek poliziari tresnarik gabe utzi eta lana eragozteko bidea ematea. Manifestazioetan zaurituak eta isunak jarraitzen dute bi noranzkoetan.",
    },
    justification: {
      es: "El 29 de octubre de 2024 el Congreso admitió a trámite por 176 a 170 la Proposición de Ley de PSOE, Sumar, EH Bildu y PNV para reformar la «ley mordaza» (LO 4/2015): todos los grupos la apoyaron salvo PP, Vox y UPN. El 12 de diciembre de 2024 se rechazó por 169 a 176 la enmienda a la totalidad con texto alternativo presentada por el PP, respaldada únicamente por PP, Vox y UPN.",
      ca: "El 29 d'octubre de 2024 el Congrés va admetre a tràmit per 176 a 170 la Proposició de Llei de PSOE, Sumar, EH Bildu i PNV per a reformar la «llei mordassa» (LO 4/2015): tots els grups la van donar suport excepte PP, Vox i UPN. El 12 de desembre de 2024 es va rebutjar per 169 a 176 l'esmena a la totalitat amb text alternatiu presentada pel PP, recolzada només per PP, Vox i UPN.",
      gl: "O 29 de outubro de 2024 o Congreso admitiu a trámite por 176 a 170 a Proposición de Lei de PSOE, Sumar, EH Bildu e PNV para reformar a «lei mordaza» (LO 4/2015): todos os grupos a apoiaron agás PP, Vox e UPN. O 12 de decembro de 2024 rexeitouse por 169 a 176 a emenda á totalidade con texto alternativo presentada polo PP, respaldada unicamente por PP, Vox e UPN.",
      eu: "2024ko urriaren 29an Kongresuak 176 eta 170rekin onartu zuen tramitera PSOE, Sumar, EH Bildu eta EAJren «mordaza legea» (4/2015 LO) berritzeko Lege-Proposamena: talde guztiek babestu zuten, PP, VOX eta UPN izan ezik. 2024ko abenduaren 12an 169 eta 176rekin ukatu zen PPrek aurkeztutako ordezko testuaren orokorreko emenda, PP, VOX eta UPN bakarrik onartuta.",
    },
    options: OPT.PFC,
    evidence: [
      votacion(
        "15-71-1",
        "Toma en consideración de la Proposición de Ley orgánica de protección de las libertades y seguridad ciudadana (aprobada: 176-170)",
        "2024-10-29"
      ),
      votacion(
        "15-85-8",
        "Enmienda a la totalidad con texto alternativo del PP (rechazada: 169-176)",
        "2024-12-12"
      ),
    ],
    positions: [
      { party: "psoe", stance: "a_favor" },
      { party: "pp", stance: "en_contra" },
      { party: "vox", stance: "en_contra" },
      { party: "fa", stance: "a_favor" },
      { party: "podemos", stance: "a_favor" },
      { party: "compromis", stance: "a_favor" },
      { party: "erc", stance: "a_favor" },
      { party: "junts", stance: "a_favor" },
      { party: "pnv", stance: "a_favor" },
      { party: "izqs", stance: "a_favor" },
      { party: "cc", stance: "a_favor" },
    ],
  },
  {
    id: "nuclear",
    title: {
      es: "Mantener las centrales nucleares encendidas más tiempo",
      ca: "Mantenir les centrals nuclears enceses més temps",
      gl: "Manter as centrais nucleares encendidas máis tempo",
      eu: "Zentral nuklearrak denbora gehiago piztuta mantendu",
    },
    description: {
      es: "Alargar la vida de las centrales que ya están en marcha para que sigan dando luz, en vez de cerrarlas como está previsto.",
      ca: "Allargar la vida de les centrals que ja estan en marxa perquè continuen donant llum, en comptes de tancar-les com està previst.",
      gl: "Alongar a vida das centrais que xa están en marcha para que continúen dando luz, en vez de pechalas como está previsto.",
      eu: "Martxan dauden zentralen bizitza luzatzen jarraitzea argia ematen jarraitzeko, aurreikusita dagoen bezala itxi beharrean.",
    },
    context: {
      es: "Las centrales nucleares españolas está previsto cerrarlas por etapas en los próximos años, y esta medida buscaría seguir usándolas más tiempo. Sus defensores ven luz barata y estable sin quemar carbón ni gas, y tiempo para preparar otras fuentes; sus críticos temen un accidente, los residuos que siguen siendo peligrosos durante siglos y que retrasar los cierres frene las renovables. Hay que decidir cuánto pesa el riesgo frente a lo que cuesta.",
      ca: "Les centrals nuclears espanyoles està previst tancar-les per etapes en els propers anys, i esta mesura buscaria continuar usant-les més temps. Qui la defensa veu llum barata i estable sense cremar carbó ni gas, i temps per a preparar altres fonts; qui la teme diu que por un accident, que els residuos continuen sent perillosos durant segles i que retardar els tancaments frene les renovables. Cal decidir quant pesa el risc frente al que costa.",
      gl: "As centrais nucleares españolas está previsto pechalas por etapas nos próximos anos, e esta medida buscaría seguirlas usando máis tempo. Quen a defende ve luz barata e estable sen queimar carbón nin gas, e tempo para preparar outras fontes; quen a teme di que por un accidente, que os residuos seguen sendo perigosos durante séculos e que retardar os peches frene as renovables. Hai que decidir canto pesa o risco fronte ao que custa.",
      eu: "Espainiako zentral nuklearrak etapaka ixteko aurreikusita dago datozen urteotan, eta neurri honek denbora gehiago erabiltzen jarraitzea bilatzen du. Aldekoek ikatza edo gasik gabe argi merke eta egonkorra ikusten dute, eta beste iturriak prestatzeko denbora; beldur direnek istripu baten beldur, mendeetan arriskutsuak jarraitzen duten hondakinen beldur eta itxierak atzeratzeak berriztagarriak moteltzearen beldur. Arriskuak eta kostuak zenbat pisatzen duten erabaki behar da.",
    },
    justification: {
      es: "El 17 de junio de 2025 el Congreso aprobó por 171 a 166 la Proposición de Ley del PP para garantizar la aportación de la energía nuclear en la descarbonización: solo la apoyaron PP, Vox y UPN. PSOE, Sumar, PNV, ERC, EH Bildu, BNG y Coalición Canaria votaron en contra; Junts se abstuvo.",
      ca: "El 17 de juny de 2025 el Congrés va aprovar per 171 a 166 la Proposició de Llei del PP per a garantir l'aportació de l'energia nuclear en la descarbonització: només la van donar suport PP, Vox i UPN. PSOE, Sumar, PNV, ERC, EH Bildu, BNG i Coalició Canària van votar en contra; Junts, en abstenció.",
      gl: "O 17 de xuño de 2025 o Congreso aprobou por 171 a 166 a Proposición de Lei do PP para garantir a aportación da enerxía nuclear na descarbonización: só a apoiaron PP, Vox e UPN. PSOE, Sumar, PNV, ERC, EH Bildu, BNG e Coalición Canaria votaron en contra; Junts, en abstención.",
      eu: "2025eko ekainaren 17an Kongresuak 171 eta 166rekin onartu zuen PPren deskarbonizazioko energia nuklearraren ekarpena bermatzeko Lege-Proposamena: PP, VOX eta UPN bakarrik babestu zuten. PSOE, Sumar, EAJ, ERC, EH Bildu, BNG eta Kanariar Koalizioak aurka bozkatu zuten; Junts-ek abstentzioan.",
    },
    options: OPT.CPF,
    evidence: [
      votacion(
        "15-119-1",
        "Proposición de Ley del PP sobre la aportación de la energía nuclear en la descarbonización (aprobada: 171-166)",
        "2025-06-17"
      ),
    ],
    positions: [
      { party: "psoe", stance: "en_contra" },
      { party: "pp", stance: "a_favor" },
      { party: "vox", stance: "a_favor" },
      { party: "fa", stance: "en_contra" },
      { party: "podemos", stance: "en_contra" },
      { party: "compromis", stance: "en_contra" },
      { party: "erc", stance: "en_contra" },
      {
        party: "junts",
        stance: "abstencion",
        note: {
          es: "Se abstuvo en la votación enlazada.",
          ca: "Es va abstindre en la votació enllaçada.",
          gl: "Abstuvo na votación ligada.",
          eu: "Lotutako bozketan abstentzioan bozkatu zuen.",
        },
      },
      { party: "pnv", stance: "en_contra" },
      { party: "izqs", stance: "en_contra" },
      { party: "cc", stance: "en_contra" },
    ],
  },
];

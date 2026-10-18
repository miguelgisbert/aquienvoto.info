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
      es: "El alquiler solo podría subir como mucho un 2% al año y los contratos se renovarían automáticamente dos años más: quien quiera seguir viviendo allí podrá quedarse mientras siga pagando.",
      ca: "El lloguer només podria pujar com a molt un 2% a l'any i els contractes es renovarien automàticament dos anys més: qui vulga continuar vivint allí podrà quedar-se mentre continue pagant.",
      gl: "O aluguer só podería subir como moito un 2% ao ano e os contratos renovaríanse automaticamente dous anos máis: quen queira seguir vivindo alí poderá quedarse mentres siga pagando.",
      eu: "Alokairua urtean gehienez %2 igo daiteke, eta kontratuak bi urtez berrituko lirateke automatikoki: han jarraitu nahi duenak bertan jarraitu ahal izango du ordaintzen jarraitzen duen bitartean.",
    },
    context: {
      es: "Si se aprueba, un contrato que llega a su fin se renueva automáticamente por dos años más y las subidas anuales quedan limitadas al 2%. El inquilino sigue pagando el alquiler y también puede marcharse avisando, mientras que el propietario puede recuperar la vivienda si no pagan o si se incumplen las condiciones. A algunos caseros les compensaría alquilar con reglas claras; otros pueden optar por sacar la vivienda del mercado o pedir menos garantías. Para los inquilinos significa menos sustos y más tiempo para organizar su vida.",
      ca: "Si s'aprova, un contracte que arriba al seu fi es renova automàticament dos anys més i les pujades anuals queden limitades al 2%. El llogater continua pagant el lloguer i també pot marxar avisant, mentre que el propietari pot recuperar la vivenda si no paguen o si es compleixen les condicions. A alguns propietaris els compensaria llogar amb regles clares; altres poden optar per treure la vivenda del mercat o demanar menys garanties. Per als llogaters vol dir menys ensurts i més temps per organitzar la seua vida.",
      gl: "Se se aproba, un contrato que chega ao seu fin renóvase automaticamente dous anos máis e as subidas anuais quedan limitadas ao 2%. O inquilino segue pagando o aluguer e tamén pode marcharse avisando, mentres que o propietario pode recuperar a vivenda se non pagan ou se se cumpren as condicións. A algúns propietarios compénsalles alugar con regras claras; outros poden optar por sacar a vivenda do mercado ou pedir menos garantías. Para os inquilinos significa menos sustos e máis tempo para organizar a súa vida.",
      eu: "Onartzen bada, iraungo den kontratua bi urtez berrituko lirateke automatikoki eta urteko igoerak %2an mugatuko lirateke. Alokatzaileak alokairua ordaintzen jarraitzen du, eta abisatu ere egin dezake joateko, eta jabeak etxea berreskuratu ahal izango du ordaindu ez badute edo baldintzak hausten badituzte. Jabe batzuei arau argiekin alokatzea konbeni zaie; beste batzuek etxea merkatutik ateratzea edo berme gutxiago eskatzea aukera dezakete. Alokatzaileentzat ezusteko gutxiago eta bizitza antolatzeko denbora gehiago esan nahi du.",
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
      es: "Impuestos extraordinarios a los beneficios que se disparan por la guerra y otras situaciones excepcionales, sobre todo en energía, seguros y banca, y a las grandes fortunas.",
      ca: "Impostos extraordinaris als beneficis que es disparen per la guerra i altres situacions excepcionals, sobretot en energia, assegurances i banca, i a les grans fortunes.",
      gl: "Impostos extraordinarios aos beneficios que se disparen pola guerra e outras situacións excepcionais, sobre todo en enerxía, seguros e banca, e ás grandes fortunas.",
      eu: "Aparteko zergak gerragatik eta bestelako salbuespenezko egoerek puzten dituzten irabazietan, batez ere energian, aseguruetan eta bankuetan, eta fortuna handietan.",
    },
    context: {
      es: "La idea es que quien se ha beneficiado mucho más de lo habitual, sobre todo por la guerra y otras situaciones excepcionales de los últimos años, aporte una parte extra. Sus defensores dicen que es justo y que ese dinero iría a servicios públicos; sus críticos temen que frenen inversiones o que algunas rentas se vayan del país.",
      ca: "La idea és que qui s'ha beneficiat molt més del habitual, sobretot per la guerra i altres situacions excepcionals dels últims anys, aporte una part extra. Els qui ho defensen diuen que és just i que eixos diners anirien a serveis públics; els qui hi estan en contra temen que freen inversions o que algunes rendes se'n vagen del país.",
      gl: "A idea é que quen se beneficiou moito máis do habitual, sobre todo pola guerra e outras situacións excepcionais dos últimos anos, achegue unha parte extra. Os seus defensores din que é xusto e que ese diñeiro iría a servizos públicos; os críticos temen que freen investimentos ou que algúns rendas vaian do país.",
      eu: "Ideak azken urteetan ohikoa baino askoz gehiago irabazi edo mesedeak jasotu dituenak, batez ere gerragatik eta bestelako salbuespenezko egoerengatik, gehigarri bat ekar dezala da. Aldekoek justua dela eta dirua zerbitzu publikoetara joango dela diote; aurkakoek inbertsioak moteldu ditzaketela edo errenta batzuk herrialdetik atera daitezkeela uste dute.",
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
      es: "Reforzar la salud mental con más recursos públicos",
      ca: "Reforsar la salut mental amb més recursos públics",
      gl: "Reforzar a saúde mental con máis recursos públicos",
      eu: "Osasun mentala baliabide publiko gehiagorekin indartu",
    },
    description: {
      es: "Más profesionales de salud mental en la sanidad pública: psicólogos clínicos, psiquiatras y enfermería, más prevención desde la escuela y frente al riesgo de suicidio, y un trato más humano en los servicios.",
      ca: "Més professionals de salut mental en la sanitat pública: psicòlegs clínics, psiquiatres i infermeria, més prevenció des de l'escola i davant el risc de suïcidi, i un tracte més humà als serveis.",
      gl: "Máis profesionais de saúde mental na sanidade pública: psicólogos clínicos, psiquiatras e enfermaría, máis prevención desde a escola e diante do risco de suicidio, e un trato máis humano nos servizos.",
      eu: "Osasun publikoan osasun mentaleko profesional gehiago: psikologo klinikoak, psikiatrak eta erizaintza, eskolatik eta suizidio arriskuaren aurrean prebentzio gehiago, eta zerbitzuetan tratamendu humanoagoa.",
    },
    context: {
      es: "Quien lo apoya dice que hay que contratar más gente y detectar los problemas a tiempo, también en menores y adolescentes, y que la salud mental depende además de la vivienda y del trabajo. Quien lo rechaza ve que la propuesta se queda en declaraciones de intenciones y no compromete dinero ni plazas. El coste depende de las plazas que se decidan cada año, y hay que pesar el gasto frente a lo que cuesta detectar tarde los problemas.",
      ca: "Qui ho recolza diu que cal contractar més gent i detectar els problemes a temps, també en menors i adolescents, i que la salut mental depèn a més de l'habitatge i del treball. Qui ho rebutja ve que la proposta es queda en declaracions d'intencions i no compromet diners ni places. El cost depèn de les places que es decidisquen cada any, i cal pesar la despesa front al que costa detectar tard els problemes.",
      gl: "Quen o apoia di que hai que contratar máis xente e detectar os problemas a tempo, tamén en menores e adolescentes, e que a saúde mental depende ademais da vivenda e do traballo. Quen o rexeita ve que a proposta queda en declaracións de intencións e non compromete diñeiro nin prazas. O custo depende das prazas que se decidan cada ano, e hai que pesar o gasto fronte ao que costa detectar tarde os problemas.",
      eu: "Aldekoek gehiago kontratatzea eta arazoak garaiz detektatzea beharrezkoa dela diote, adingabeetan ere, eta osasun mentalak etxebizitza eta lanaren araberakoa ere badela. Aurkakoek proposamena asmo-adierazpenetan geratzen dela eta dirurik ez dela konprometitzen ikusten dute. Kostua urtero erabakitzen diren plaza araberakoa da, eta gastua arazoak berandu detektzearen kostuarekin konparatu behar da.",
    },
    justification: {
      es: "El 17 de septiembre de 2025 el Congreso aprobó por 313 a 33 el informe de la Subcomisión para mejorar la protección, la promoción y la atención integral de la salud mental, que recomienda más plantillas de psicología clínica, psiquiatría y enfermería, prevención del suicidio y atención en la infancia: todos los grupos a favor salvo Vox, que votó en contra. En diciembre de 2023 el Congreso ya había aprobado por 296 a 0 (49 abstenciones) el Pacto de Estado por la Salud Mental.",
      ca: "El 17 de setembre de 2025 el Congrés va aprovar per 313 a 33 l'informe de la Subcomissió per a millorar la protecció, la promoció i l'atenció integral de la salut mental, que recomana més plantilles de psicologia clínica, psiquiatria i infermeria, prevenció del suïcidi i atenció a la infància: tots els grups a favor excepte Vox, que va votar en contra. Al desembre de 2023 el Congrés ja havia aprovat per 296 a 0 (49 abstencions) el Pacte d'Estat per la Salut Mental.",
      gl: "O 17 de setembro de 2025 o Congreso aprobou por 313 a 33 o informe da Subcomisión para mellorar a protección, a promoción e a atención integral da saúde mental, que recomenda máis plantillas de psicoloxía clínica, psiquiatría e enfermaría, prevención do suicidio e atención á infancia: todos os grupos a favor agás Vox, que votou en contra. En decembro de 2023 o Congreso xa aprobara por 296 a 0 (49 abstencións) o Pacto de Estado pola Saúde Mental.",
      eu: "2025eko irailaren 17an Kongresuak 313 eta 33rekin onartu zuen osasun mentalaren babesa, sustapena eta ar integrala hobetzeko Batzorde Txikiaren txostena, psikologia klinikoko, psikiatriako eta erizaintzako plantilla gehiago, suizidioaren prebentzioa eta haurtzaroko arretaren gomendioekin: talde guztiek alde, VOXek izan ezik, aurka bozkatu zuen. 2023ko abenduan Kongresuak 296 eta 0rekin (49 abstentzio) onartu zuen Osasun Mentaleko Estatu Ituna.",
    },
    options: OPT.FPC,
    evidence: [
      votacion(
        "15-132-26",
        "Informe de la Subcomisión de salud mental (aprobada: 313-33)",
        "2025-09-17"
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
      es: "Educación sexual y emocional en el aula",
      ca: "Educació sexual i emocional a l'aula",
      gl: "Educación sexual e emocional na aula",
      eu: "Hezkuntza sexuala eta emozionala gelan",
    },
    description: {
      es: "Las clases incluirían también educación en afectividad, sexualidad y emociones, con formación para el profesorado.",
      ca: "Les classes inclourien també educació en afectivitat, sexualitat i emocions, amb formació per al professorat.",
      gl: "As clases incluirían tamén educación en afectividade, sexualidade e emocións, con formación para o profesorado.",
      eu: "Hirako klaseetan afektibitateari, sexualitateari eta emozioei buruzko hezkuntza ere sartuko litzateke, irakasleentzako prestakuntzarekin.",
    },
    context: {
      es: "Quien lo defiende dice que así nadie queda apartado del grupo y que hablar en clase de afectos y sexualidad ayuda a prevenir el acoso; quien lo pone en duda teme que los maestros no estén preparados, que se quite tiempo a otras materias y que sean las familias quienes decidan esos temas. Habría que formar al profesorado y respetar lo que cada familia quiera.",
      ca: "Qui ho defensa diu que així ningú queda apartat del grup i que parlar a l'aula d'afectes i sexualitat ajuda a previndre l'assetjament; qui ho posa en duda teme que els mestres no estiguen preparats, que es traga temps a altres matèries i que siguen les famílies qui decidisca aquests temes. Caldria formar el professorat i respectar el que cada família vullga.",
      gl: "Quen o defende di que así ninguén queda apartado do grupo e que falar na aula de afectos e sexualidade axuda a previr o acoso; quen o pon en duda teme que os mestres non estean preparados, que se lle quite tempo a outras materias e que sexan as familias quen decida estes temas. Habería que formar ao profesorado e respectar o que cada familia queira.",
      eu: "Aldekoek dioela inork ez dela taldetik kanpo geratzen eta gelan afektuez eta sexualitateaz hitz egitea jazarpena prebenitzen laguntzen duela esaten dute; zalantzan jartzen dutenek irakasleak prest ez daudela, beste materietako denbora kentzea eta gai horien inguruan familiak erabakitzea beldur dira. Irakasleak prestatu beharko lirateke eta familia bakoitzak nahi duena errespetatu.",
    },
    justification: {
      es: "El 25 de junio de 2026 el Congreso aprobó por 172 a 170 (7 abstenciones) la PNL del PSOE sobre educación afectivo-sexual: todos los grupos a favor salvo PP, Vox y UPN, que votaron en contra, y Junts, que se abstuvo.",
      ca: "El 25 de juny de 2026 el Congrés va aprovar per 172 a 170 (7 abstencions) la PNL del PSOE sobre educació afectivo-sexual: tots els grups a favor excepte PP, Vox i UPN, que van votar en contra, i Junts, que es va abstindre.",
      gl: "O 25 de xuño de 2026 o Congreso aprobou por 172 a 170 (7 abstencións) a PNL do PSOE sobre educación afectivo-sexual: todos os grupos a favor agás PP, Vox e UPN, que votaron en contra, e Junts, que abstuvo.",
      eu: "2026ko ekainaren 25ean Kongresuak 172 eta 170rekin (7 abstentzio) onartu zuen PSOEren hezkuntza afektibo-sexualari buruzko PNL: talde guztiek alde, PPk, VOXek eta UPNek aurka bozkatu zutenetik, eta Junts-ek abstentzioan.",
    },
    options: OPT.CPF,
    evidence: [
      votacion(
        "15-191-14",
        "PNL del PSOE de educación afectivo-sexual (aprobada: 172-170-7)",
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
      { party: "junts", stance: "abstencion" },
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
      es: "Retirar poco a poco los coches y calefacciones de gasoil, apoyar el viento y el sol, ahorrar energía en casa y depender menos del gasoil y del gas que vienen de fuera.",
      ca: "Retirar a poces cotxes i calefaccions de gasoil, donar suport al vent i al sol, estalviar energia a casa i dependre menys del gasoil i del gas que vénen de fora.",
      gl: "Retirar a pouco os coches e calefaccións de gasóleo, apoiar o vento e o sol, aforrar enerxía na casa e depender menos do gasóleo e do gas que veñen de fóra.",
      eu: "Poliki-poliki kotxeak eta erregaizko berogailuak kentzea, haizea eta eguzkia babestea, etxean energia aurreztea eta kanpotik datozen gasolioarekiko eta gasarekiko dependentzia gutxiago izatea.",
    },
    context: {
      es: "La idea es contaminar menos para llegar a los objetivos de 2050: más tren y autobús, más placas y molinos y menos factura de la luz. Sus defensores hablan de aire más limpio, trabajos nuevos y de no depender del gas ni del gasoil de fuera, que en tiempos de guerra encarece la factura y nos deja en manos de otros países; sus críticos temen que se encarezca el combustible, que se pierdan puestos en la industria y el coche, y que las renovables no aguanten sin respaldo. El cambio costará dinero y costumbres, y habrá que acompañar a los que más lo noten.",
      ca: "La idea és contaminar menys per a complir els objectius del 2050: més tren i autobús, més plaques i molins i menys factura de la llum. Qui ho defensa parla d'aire més net, treballs nous i de no dependre del gas ni del gasoil de fora, que en temps de guerra encareix la factura i ens deixa en mans d'altres països; qui ho tem diu que es carregarà el combustible, que es perdran llocs a la indústria i el cotxe, i que les renovables no aguanten sense suport. El canvi costarà diners i costums, i caldrà acompanyar als que més ho noten.",
      gl: "A idea é contaminar menos para cumprir os obxectivos do 2050: máis tren e autobús, máis placas e muíños e menos factura da luz. Quen o defende fala de aire máis limpo, traballos novos e de non depender do gas nin do gasóleo de fóra, que en tempos de guerra encarece a factura e déixannos en mans doutros países; quen o teme di que se encarecerá o combustible, que se perderán postos na industria e o coche, e que as renovables non aguanten sen respaldo. O cambio custará diñeiro e costumes, e habera que acompañar aos que máis o noten.",
      eu: "Idea kutsatzeko gutxiago dela 2050eko helburuak betetzeko: tren gehiago, autobus gehiago, plaka gehiago eta haize-errota gehiago, eta argi-faktura gutxiago. Aldekoek aire garbiagoaz, lan berriak eta kanpoko gasarekiko eta gasolioarekiko dependentziarik ez izateaz hitz egiten dute, garaian faktura garestitzen duelako eta beste herrialdeen esku utzigaituelako; beldur direnek erregaia garestitzea, industria eta kotxeetako lanpostuak galtzea eta babesik gabe erreserbarik ez dutela uste dute. Aldaketak dirua eta ohituren kostua izango du, eta gehien dutenak lagundu beharko dira.",
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
      es: "La amnistía permitió a los implicados en el procés volver a la política y a sus cargos, y borró las sanciones por desobediencia. Quienes la apoyan dicen que así se cierra una herida, se deja de perseguir ideas y que ha servido para reducir el independentismo en Cataluña; quienes la rechazan ven una injusticia para quienes sí cumplieron la ley y temen que se dé por buena la desobediencia.",
      ca: "L'amnistia va permetre als implicats en el procés tornar a la política i als seus càrrecs, i va esborrar les sancions per desobediència. Qui la recolza diu que així es tanca una ferida, es deixa de perseguir idees i que ha servit per a reduir l'independentisme a Catalunya; qui la rebutja veu una injustícia per a qui sí va complir la llei i teme que es done per bona la desobediència.",
      gl: "A amnistía permitiu aos implicados no procés voltar á política e aos seus cargos, e borrou as sancións por desobediencia. Quen a apoia di que así se pecha unha ferida, se deixa de perseguir ideas e que serviu para reducir o independentismo en Cataluña; quen a rexeita ve unha inxustiza para quen si cumpriu a lei e teme que se dea por boa a desobediencia.",
      eu: "Amnistiak prozesuan inplikatuei politikara eta karguetara itzultzeko aukera eman zien, eta desobedientziagatiko zigorrak ezabatu zituen. Aldekoek horrela zauria itxaten dela, ideiak ez jazar-tzea diote eta independentismoa Katalunian murrizten lagundu duela diote; aurkakoek legea bete zutenentzako injustizia ikusten dute eta desobedientzia onartzearen beldur dira.",
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
      es: "Que las personas trans puedan cambiar su nombre y género en los papeles sin informes médicos, proteger a quienes sufrieron terapias de conversión y reconocer a quienes padecieron la dictadura.",
      ca: "Que les persones trans puguen canviar el seu nom i gènere en els papers sense informes mèdics, protegir a qui van patir teràpies de conversió i reconéixer a qui van patir la dictadura.",
      gl: "Que as persoas trans poidan cambiar o seu nome e xénero nos papeis sen informes médicos, protexer a quen padeceron terapias de conversión e recoñecer a quen padeceron a ditadura.",
      eu: "Pertsona transak agirietan izena eta generoa mediku-txostenik gabe aldatu ahal izatea, bihurketa-terapiak jasan zutenak babestea eta diktadura jasan zutenak aitortzea.",
    },
    context: {
      es: "El cambio de nombre y género en el DNI se haría por declaración, sin informes médicos, y se protegería a quienes sufrieron terapias de conversión para cambiar su orientación o su identidad, además de ampliar la protección frente a los delitos de odio; la memoria de las víctimas del franquismo traería reconocimiento, exhumaciones y retirar honores a los responsables. Quienes lo apoyan lo ven una cuestión de dignidad y de no dejar a nadie atrás; quienes lo cuestionan temen que se rompan garantías o que se reabran heridas sin consenso. En la práctica, el colectivo LGTBI sigue sufriendo más agresiones que la media.",
      ca: "El canvi de nom i gènere en el DNI es faria per declaració, sense informes mèdics, i es protegiria a qui van patir teràpies de conversió per a canviar la seua orientació o identitat, a més d'ampliar la protecció davant dels delictes d'odi; la memòria de les víctimes del franquisme portaria reconeixement, exhumacions i retirar honors als responsables. Qui ho recolza ho veu una qüestió de dignitat i de no deixar ningú enrere; qui ho qüestiona teme que es trenquen garanties o que es reobren ferides sense consens. En la pràctica, el col·lectiu LGTBI continua patint més agressions que la mitjana.",
      gl: "O cambio de nome e xénero no DNI faríase por declaración, sen informes médicos, e protexeríase a quen padeceron terapias de conversión para cambiar a súa orientación ou identidade, ademais de ampliar a protección fronte aos delitos de odio; a memoria das vítimas do franquismo traería recoñecemento, exhumacións e retirar honores aos responsables. Quen o apoia ve unha cuestión de dignidade e de non deixar a ninguén atrás; quen o cuestiona teme que se rompan garantías ou que se reabran feridas sen consenso. Na práctica, o colectivo LGTBI segue a sufrir máis agresións que a media.",
      eu: "DNIan izena eta generoa adierazpen bidez aldatuko lirateke, mediku-txostenik gabe, eta bihurketa-terapiak jasan zituztenak babestuko lirateke beren orientazioa edo identitatea aldatzeko, gorroto-delituen babesa zabaltzeaz gain; frankismoaren biktimen memoriak aitorpena, hobenak eta arduradunei ohoreak kentzea ekarriko lituzke. Aldekoek duintasun gai bat dela eta inor atzean uzten ez dela ikusten dute; zalantzan jartzen dutenek bermatasunak hautsi edo adostasunik gabe zauriak berriro irekitzeko beldurra dute. Praktikan, LGTBI kolektiboak batez bestekoaren aurpegarri jazarpen gehiago jasaten ditu.",
    },
    justification: {
      es: "La Ley 4/2023 garantiza la igualdad trans y la Ley 20/2022 de Memoria Democrática reconoce a las víctimas del franquismo. El 25 de junio de 2026 el Congreso aprobó por 174 a 169 la moción de apoyo a las víctimas de las pseudoterapias de conversión LGTBIQ+, con todos los grupos a favor salvo PP y Vox y el PNV en abstención. En marzo de 2026 se convalidó por 179 a 171 el RDL 6/2026 de memoria: a favor todos los grupos menos PP y Vox, con Junts en abstención en la convalidación y a favor en la tramitación.",
      ca: "La Llei 4/2023 garanteix la igualtat trans i la Llei 20/2022 de Memòria Democràtica reconeix les víctimes del franquisme. El 25 de juny de 2026 el Congrés va aprovar per 174 a 169 la moció de suport a les víctimes de les pseudoteràpies de conversió LGTBIQ+, amb tots els grups a favor excepte PP i Vox i el PNV en abstenció. Al març de 2026 es va validar per 179 a 171 el RDL 6/2026 de memòria: a favor tots els grups menys PP i Vox, amb Junts en abstenció en la validació i a favor en la tramitació.",
      gl: "A Lei 4/2023 garante a igualdade trans e a Lei 20/2022 de Memoria Democrática recoñece as vítimas do franquismo. O 25 de xuño de 2026 o Congreso aprobou por 174 a 169 a moción de apoio ás vítimas das pseudoterapias de conversión LGTBIQ+, con todos os grupos a favor agás PP e Vox e o PNV en abstención. En marzo de 2026 validouse por 179 a 171 o RDL 6/2026 de memoria: a favor todos os grupos agás PP e Vox, con Junts en abstención na validación e a favor na tramitación.",
      eu: "4/2023 Legeak berdintasun transa bermatzen du eta 20/2022 Memoria Demokratikoaren Legeak frankismoaren biktimei aitortza ematen die. 2026ko ekainaren 25ean Kongresuak 174 eta 169rekin onartu zuen LGTBIQ+ pseuentzako bihurketa-terapien biktimentzako babes-mozioa, talde guztiek alde PPk eta VOXek izan ezik, eta EAJ abstentzioan. 2026ko martxoan 179 eta 171rekin balioztatu zen 6/2026 RDL memoria: alde talde guztiek PP eta VOX izan ezik, Junts abstentzioan balidatzean eta alde tramitazioan.",
    },
    options: OPT.CFP,
    evidence: [
      votacion(
        "15-169-54",
        "Real Decreto-ley 6/2026, de memoria democrática (tramitación como Proyecto de Ley)",
        "2026-03-26"
      ),
      votacion(
        "15-191-15",
        "Moción sobre apoyo a las víctimas de las pseudoterapias de conversión LGTBIQ+ (aprobada: 174-169-5)",
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
      { party: "junts", stance: "a_favor" },
      {
        party: "pnv",
        stance: "parcial",
        note: {
          es: "Aprobó la memoria democrática y se abstuvo en la moción sobre las pseudoterapias de conversión LGTBIQ+.",
          ca: "Va aprovar la memòria democràtica i es va abstindre en la moció sobre les pseudoteràpies de conversió LGTBIQ+.",
          gl: "Aprobou a memoria democrática e abstuvo na moción sobre as pseudoterapias de conversión LGTBIQ+.",
          eu: "Memoria demokratikoa onartu zuen eta abstentzioan bozkatu zuen LGTBIQ+ pseuentzako bihurketa-terapiei buruzko mozioan.",
        },
      },
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
      es: "La jornada ya bajó a 37,5 horas y hay quien quiere ir a 35; el sueldo y las vacaciones no cambiarían. Para quien lo defiende es tiempo para la familia y la salud; para quien lo teme, menos horas pueden ser menos producción y turnos más difíciles en fábricas y servicios.",
      ca: "La jornada ja ha baixat a 37,5 hores i hi ha qui vol anar a 35; el sou i les vacances no canviarien. Per a qui ho defensa és temps per a la família i la salut; per a qui ho tem, menys hores poden ser menys producció i torns més difícils a fàbriques i serveis.",
      gl: "A xornada xa baixou a 37,5 horas e hai quen quere ir a 35; o salario e as vacacións non cambiarían. Para quen o defende é tempo para a familia e a saude; para quen o teme, menos horas poden ser menos produción e quendas máis difíciles nas fábricas e servizos.",
      eu: "Lan-eguna 37,5 orduetara jaitsi da eta 35era joan nahi duenik dago; soldata eta oporrak ez lirateke aldatuko. Aldekoentzat familia eta osasunerako denbora da; beldur direnentzat, ordu gutxiagoak ekoizpen gutxiago eta lantegi eta zerbitzuetako txanda zailagoak izan daitezke.",
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

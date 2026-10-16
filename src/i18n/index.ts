import { createContext, createElement, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Language, LocalizedString } from "../types";

const es = {
  "nav.tagline": "Tu orientador electoral",
  "nav.home": "Inicio",
  "nav.test": "Test",
  "nav.results": "Resultados",

  "home.badge": "Elecciones generales: 29 de noviembre de 2026",
  "home.title1": "Descubre tu",
  "home.title2": "Orientación Política",
  "home.lead":
    "Conoce qué partidos se alinean mejor con tus ideas, basándose en votaciones reales del Congreso de los Diputados de España.",
  "home.meta": "11 partidos · 12 preguntas · votaciones reales del Congreso",
  "home.cta": "Comenzar el test",
  "home.f1t": "Datos reales",
  "home.f1d": "Basado en votaciones verificables del Congreso de los Diputados.",
  "home.f2t": "Transparente",
  "home.f2d": "Cada resultado incluye enlaces a las fuentes oficiales (BOE y Congreso).",
  "home.f3t": "Imparcial",
  "home.f3d": "No revelamos las posiciones partidarias hasta el final.",
  "home.how": "¿Cómo funciona?",
  "home.s1t": "Respondes",
  "home.s1d": "Contestas preguntas sobre temas importantes",
  "home.s2t": "Comparamos",
  "home.s2d": "Analizamos tus respuestas con votos reales",
  "home.s3t": "Calculamos",
  "home.s3d": "Determinamos tu afinidad con cada partido",
  "home.s4t": "Mostramos",
  "home.s4d": "Recibes resultados con fuentes oficiales",
  "home.sources": "Fuentes de datos",
  "home.src1t": "Congreso de los Diputados",
  "home.src1d": "Portal oficial de votaciones y decisiones parlamentarias",
  "home.src2t": "Boletín Oficial del Estado",
  "home.src2d": "Publicaciones oficiales y legislación aprobada",
  "home.src3t": "Datos abiertos",
  "home.src3d": "Recuentos por partido de quevotan.eu (XV legislatura, hasta el 30/09/2026)",

  "test.progress": "Pregunta {n} de {m}",
  "test.percent": "{v}% completado",
  "test.context": "Contexto",
  "test.back": "Volver al inicio",
  "test.prev": "Anterior",
  "test.next": "Siguiente",
  "test.finish": "Ver resultados",
  "test.intentTitle": "Última pregunta (opcional)",
  "test.intentLead":
    "Si quieres, indica qué partido pensabas votar antes del test y qué piensas votar ahora si has cambiado de opinión.",
  "test.intentBefore": "¿Qué partido pensabas votar antes de hacer el test?",
  "test.intentAfter": "¿Has cambiado de opinión?",
  "test.intentPlaceholder": "Elige un partido…",
  "test.intentNone": "Ninguno / no lo sé",
  "test.intentAbstain": "No votaría",
  "test.intentSave": "Guardar respuestas",
  "test.intentSkip": "Omitir",
  "test.intentThanks": "¡Gracias! Tus respuestas se han guardado.",

  "results.title": "Tus resultados",
  "results.lead": "Afinidad con cada partido basada en votaciones reales del Congreso",
  "results.matches": "{a} de {b} coincidencias",
  "results.affinity": "afinidad",
  "results.breakdown": "Desglose detallado de votaciones",
  "results.yourAnswer": "Tu respuesta",
  "results.evidence": "Fuentes",
  "results.coherence": "Coincidencia en cada pregunta",
  "results.colParty": "Partido",
  "results.legendMatch": "acuerdo",
  "results.legendDiff": "discrepancia",
  "results.legendAbst": "abstención (no cuenta)",
  "results.justification": "Justificación de las posiciones",
  "results.noPosition": "Sin posición registrada",
  "results.restart": "Hacer el test de nuevo",
  "results.warnTitle": "Importante",
  "results.warn":
    "Test orientativo basado en votaciones de la XV legislatura (datos hasta el 30/09/2026, más la votación del 02/10/2026). Los programas electorales del 29-N aún no se han publicado: consulta las fuentes oficiales y los programas completos antes de decidir.",

  "pos.a_favor": "A favor",
  "pos.en_contra": "En contra",
  "pos.parcial": "Con matices",
  "pos.abstencion": "Abstención",

  "admin.title": "Panel completo",
  "admin.total": "Respuestas totales",
  "admin.today": "Respuestas de hoy",
  "admin.completed": "Completadas (12/12)",
  "admin.source": "Fuente",
  "admin.sourceSupabase": "Supabase",
  "admin.sourceLocal": "localStorage (este dispositivo)",
  "admin.refresh": "Actualizar",
  "admin.byQuestion": "Respuestas por pregunta",
  "admin.avgAffinity": "Afinidad media por partido",
  "admin.langs": "Idiomas",
  "admin.empty": "Aún no hay respuestas",
  "admin.needLogin": "Inicia sesión para ver las estadísticas",
  "admin.email": "Correo",
  "admin.password": "Contraseña",
  "admin.login": "Entrar",
  "admin.logout": "Cerrar sesión",
  "admin.loginError":
    "No se ha podido iniciar sesión. Revisa el correo y la contraseña.",
  "admin.perDay": "Respuestas por día (14 días)",
  "admin.intention": "Intención de voto (antes → ahora)",
  "admin.intentKept": "Mantienen el partido",
  "admin.intentChanged": "Han cambiado de partido",
  "admin.intentNoData": "Sin dato",
  "admin.insertOn": "Inserción remota: activa (solo producción)",
  "admin.insertOff": "Inserción remota: desactivada (no es producción)",
  "admin.colBefore": "antes",
  "admin.colAfter": "ahora",

  "footer.contact": "Contacto",
  "contact.title": "¿Has encontrado un error o tienes una mejora?",
  "contact.lead": "Escríbeme y lo reviso: correcciones de datos, partidos, preguntas o sugerencias.",
  "contact.name": "Tu nombre",
  "contact.email": "Tu correo",
  "contact.message": "Mensaje",
  "contact.send": "Enviar",
  "contact.sending": "Enviando…",
  "contact.success": "¡Gracias! Te responderé pronto.",
  "contact.error": "No se ha podido enviar. Inténtalo de nuevo.",
  "contact.close": "Cerrar",
} as const;

type Dict = typeof es;

const ca: Dict = {
  "nav.tagline": "El teu orientador electoral",
  "nav.home": "Inici",
  "nav.test": "Test",
  "nav.results": "Resultats",

  "home.badge": "Eleccions generals: 29 de novembre de 2026",
  "home.title1": "Descobreix la teva",
  "home.title2": "Orientació Política",
  "home.lead":
    "Coneix quins partits s'alineen millor amb les teves idees, a partir de votacions reals del Congrés dels Diputats d'Espanya.",
  "home.meta": "11 partits · 12 preguntes · votacions reals del Congrés",
  "home.cta": "Començar el test",
  "home.f1t": "Dades reals",
  "home.f1d": "Basat en votacions verificables del Congrés dels Diputats.",
  "home.f2t": "Transparent",
  "home.f2d": "Cada resultat inclou enllaços a les fonts oficials (BOE i Congrés).",
  "home.f3t": "Imparcial",
  "home.f3d": "No revel·lem les posicions partidistes fins al final.",
  "home.how": "Com funciona?",
  "home.s1t": "Respon",
  "home.s1d": "Contestes preguntes sobre temes importants",
  "home.s2t": "Comparem",
  "home.s2d": "Analitzem les teves respostes amb vots reals",
  "home.s3t": "Calculem",
  "home.s3d": "Determinem la teva afinitat amb cada partit",
  "home.s4t": "Mostrem",
  "home.s4d": "Rep resultats amb fonts oficials",
  "home.sources": "Fonts de dades",
  "home.src1t": "Congrés dels Diputats",
  "home.src1d": "Portal oficial de votacions i decisions parlamentàries",
  "home.src2t": "Butlletí Oficial de l'Estat",
  "home.src2d": "Publicacions oficials i legislació aprovada",
  "home.src3t": "Dades obertes",
  "home.src3d": "Recomptes per partit de quevotan.eu (XV legislatura, fins al 30/09/2026)",

  "test.progress": "Pregunta {n} de {m}",
  "test.percent": "{v}% completat",
  "test.context": "Context",
  "test.back": "Tornar a l'inici",
  "test.prev": "Anterior",
  "test.next": "Següent",
  "test.finish": "Veure resultats",
  "test.intentTitle": "Darrera pregunta (opcional)",
  "test.intentLead":
    "Si vols, indica quin partit pensaves votar abans del test i què penses votar ara si has canviat d'opinió.",
  "test.intentBefore": "Quin partit pensaves votar abans de fer el test?",
  "test.intentAfter": "Has canviat d'opinió?",
  "test.intentPlaceholder": "Tria un partit…",
  "test.intentNone": "Cap / no ho sé",
  "test.intentAbstain": "No votaria",
  "test.intentSave": "Guarda les respostes",
  "test.intentSkip": "Omet",
  "test.intentThanks": "Gràcies! Les teues respostes s'han guardat.",

  "results.title": "Els teus resultats",
  "results.lead": "Afinitat amb cada partit basada en votacions reals del Congrés",
  "results.matches": "{a} de {b} coincidències",
  "results.affinity": "afinitat",
  "results.breakdown": "Desglossament detallat de votacions",
  "results.yourAnswer": "La teva resposta",
  "results.evidence": "Fonts",
  "results.coherence": "Coincidència en cada pregunta",
  "results.colParty": "Partit",
  "results.legendMatch": "acord",
  "results.legendDiff": "discrepància",
  "results.legendAbst": "abstenció (no compta)",
  "results.justification": "Justificació de les posicions",
  "results.noPosition": "Sense posició registrada",
  "results.restart": "Tornar a fer el test",
  "results.warnTitle": "Important",
  "results.warn":
    "Test orientatiu basat en votacions de la XV legislatura (dades fins al 30/09/2026, més la votació del 02/10/2026). Els programes electorals del 29-N encara no s'han publicat: consulta les fonts oficials i els programes complets abans de decidir.",

  "pos.a_favor": "A favor",
  "pos.en_contra": "En contra",
  "pos.parcial": "Amb matisos",
  "pos.abstencion": "Abstenció",

  "admin.title": "Quadre complet",
  "admin.total": "Respostes totals",
  "admin.today": "Respostes d'avui",
  "admin.completed": "Completades (12/12)",
  "admin.source": "Font",
  "admin.sourceSupabase": "Supabase",
  "admin.sourceLocal": "localStorage (aquest dispositiu)",
  "admin.refresh": "Actualitzar",
  "admin.byQuestion": "Respostes per pregunta",
  "admin.avgAffinity": "Afinitat mitjana per partit",
  "admin.langs": "Idiomes",
  "admin.empty": "Encara no hi ha respostes",
  "admin.needLogin": "Inicia sessió per veure les estadístiques",
  "admin.email": "Correu",
  "admin.password": "Contrasenya",
  "admin.login": "Entrar",
  "admin.logout": "Tancar sessió",
  "admin.loginError":
    "No s'ha pogut iniciar sessió. Revisa el correu i la contrasenya.",
  "admin.perDay": "Respostes per dia (14 dies)",
  "admin.intention": "Intenció de vot (abans → ara)",
  "admin.intentKept": "Mantenen el partit",
  "admin.intentChanged": "Han canviat de partit",
  "admin.intentNoData": "Sense dada",
  "admin.insertOn": "Inserció remota: activa (només producció)",
  "admin.insertOff": "Inserció remota: desactivada (no ets a producció)",
  "admin.colBefore": "abans",
  "admin.colAfter": "ara",

  "footer.contact": "Contacte",
  "contact.title": "Has trobat un error o tens una millora?",
  "contact.lead": "Escriu-me i ho reviso: correccions de dades, partits, preguntes o suggeriments.",
  "contact.name": "El teu nom",
  "contact.email": "El teu correu",
  "contact.message": "Missatge",
  "contact.send": "Enviar",
  "contact.sending": "Enviant…",
  "contact.success": "Gràcies! Et respondré aviat.",
  "contact.error": "No s'ha pogut enviar. Torna-ho a provar.",
  "contact.close": "Tancar",
};

const gl: Dict = {
  "nav.tagline": "O teu orientador electoral",
  "nav.home": "Inicio",
  "nav.test": "Test",
  "nav.results": "Resultados",

  "home.badge": "Eleccións xerais: 29 de novembro de 2026",
  "home.title1": "Descubre a tú",
  "home.title2": "Orientación Política",
  "home.lead":
    "Coñece que partidos se aliñan mellor coas túas ideas, a partir de votacións reais do Congreso dos Deputados de España.",
  "home.meta": "11 partidos · 12 preguntas · votacións reais do Congreso",
  "home.cta": "Comezar o test",
  "home.f1t": "Datos reais",
  "home.f1d": "Basado en votacións verificables do Congreso dos Deputados.",
  "home.f2t": "Transparente",
  "home.f2d": "Cada resultado inclúe ligazóns ás fontes oficiais (BOE e Congreso).",
  "home.f3t": "Imparcial",
  "home.f3d": "Non revelamos as posicións partidistas ata o final.",
  "home.how": "Como funciona?",
  "home.s1t": "Respondes",
  "home.s1d": "Contestas preguntas sobre temas importantes",
  "home.s2t": "Comparamos",
  "home.s2d": "Analizamos as túas respostas con votos reais",
  "home.s3t": "Calculamos",
  "home.s3d": "Determinamos a túa afinidade con cada partido",
  "home.s4t": "Mostramos",
  "home.s4d": "Recibes resultados con fontes oficiais",
  "home.sources": "Fontes de datos",
  "home.src1t": "Congreso dos Deputados",
  "home.src1d": "Portal oficial de votacións e decisións parlamentarias",
  "home.src2t": "Boletín Oficial do Estado",
  "home.src2d": "Publicacións oficiais e lexislación aprobada",
  "home.src3t": "Datos abertos",
  "home.src3d": "Recontos por partido de quevotan.eu (XV lexislatura, ata o 30/09/2026)",

  "test.progress": "Pregunta {n} de {m}",
  "test.percent": "{v}% completado",
  "test.context": "Contexto",
  "test.back": "Volver ao inicio",
  "test.prev": "Anterior",
  "test.next": "Seguinte",
  "test.finish": "Ver resultados",
  "test.intentTitle": "Última pregunta (opcional)",
  "test.intentLead":
    "Se queres, indica que partido pensabas votar antes da proba e que pensas votar agora se cambiaches de opinión.",
  "test.intentBefore": "Que partido pensabas votar antes de facer a proba?",
  "test.intentAfter": "Cambiaches de opinión?",
  "test.intentPlaceholder": "Escolle un partido…",
  "test.intentNone": "Ningún / non o sei",
  "test.intentAbstain": "Non votaría",
  "test.intentSave": "Gardar as respostas",
  "test.intentSkip": "Omitir",
  "test.intentThanks": "Grazas! As túas respostas gardáronse.",

  "results.title": "Os teus resultados",
  "results.lead": "Afinidade con cada partido baseada en votacións reais do Congreso",
  "results.matches": "{a} de {b} coincidencias",
  "results.affinity": "afinidade",
  "results.breakdown": "Desglose detallado de votacións",
  "results.yourAnswer": "A túa resposta",
  "results.evidence": "Fontes",
  "results.coherence": "Coincidencia en cada pregunta",
  "results.colParty": "Partido",
  "results.legendMatch": "acordo",
  "results.legendDiff": "discrepancia",
  "results.legendAbst": "abstención (non conta)",
  "results.justification": "Justificación das posicións",
  "results.noPosition": "Sen posición rexistrada",
  "results.restart": "Facer o test de novo",
  "results.warnTitle": "Importante",
  "results.warn":
    "Test orientativo baseado en votacións da XV lexislatura (datos ata o 30/09/2026, máis a votación do 02/10/2026). Os programas electorais do 29-N aínda non se publicaron: consulta as fontes oficiais e os programas completos antes de decidir.",

  "pos.a_favor": "A favor",
  "pos.en_contra": "En contra",
  "pos.parcial": "Con matices",
  "pos.abstencion": "Abstención",

  "admin.title": "Panel completo",
  "admin.total": "Respostas totais",
  "admin.today": "Respostas de hoxe",
  "admin.completed": "Completadas (12/12)",
  "admin.source": "Fonte",
  "admin.sourceSupabase": "Supabase",
  "admin.sourceLocal": "localStorage (este dispositivo)",
  "admin.refresh": "Actualizar",
  "admin.byQuestion": "Respostas por pregunta",
  "admin.avgAffinity": "Afinidade media por partido",
  "admin.langs": "Idiomas",
  "admin.empty": "Aínda non hai respostes",
  "admin.needLogin": "Inicia sesión para ver as estatísticas",
  "admin.email": "Correo",
  "admin.password": "Contrasinal",
  "admin.login": "Entrar",
  "admin.logout": "Pechar sesión",
  "admin.loginError":
    "Non se puido iniciar sesión. Revise o correo e o contrasinal.",
  "admin.perDay": "Respostas por día (14 días)",
  "admin.intention": "Intención de voto (antes → agora)",
  "admin.intentKept": "Mantenen o partido",
  "admin.intentChanged": "Mudaron de partido",
  "admin.intentNoData": "Sen dato",
  "admin.insertOn": "Inserción remota: activa (só produción)",
  "admin.insertOff": "Inserción remota: desactivada (non es produción)",
  "admin.colBefore": "antes",
  "admin.colAfter": "agora",

  "footer.contact": "Contacto",
  "contact.title": "Cochaches un erro ou tes unha mellora?",
  "contact.lead": "Escríbeme e reviso: correccións de datos, partidos, preguntas ou suxestións.",
  "contact.name": "O teu nome",
  "contact.email": "O teu correo",
  "contact.message": "Mensaxe",
  "contact.send": "Enviar",
  "contact.sending": "Enviando…",
  "contact.success": "Grazas! Responderache axiña.",
  "contact.error": "Non se puido enviar. Inténtao de novo.",
  "contact.close": "Pechar",
};

const eu: Dict = {
  "nav.tagline": "Zure hauteskunde orientatzailea",
  "nav.home": "Hasiera",
  "nav.test": "Testa",
  "nav.results": "Emaitzak",

  "home.badge": "Hauteskunde orokorrak: 2026ko azaroak 29",
  "home.title1": "Aurkitu",
  "home.title2": "Orientazio Politikoa",
  "home.lead":
    "Jakitu zein alderdi datorkizun hobekien zure ideiekin, Espainiako Diputatuen Kongresuko benetako bozketetatik abiatuta.",
  "home.meta": "11 alderdi · 12 galdera · Kongresuko benetako bozketa",
  "home.cta": "Hasi testa",
  "home.f1t": "Benetako datuak",
  "home.f1d": "Diputatuen Kongresuko bozka egiaztagarrietan oinarrituta.",
  "home.f2t": "Gardena",
  "home.f2d": "Emaitza bakoitzak iturri ofizialen estekak ditu (BOE eta Kongresua).",
  "home.f3t": "Inpartziala",
  "home.f3d": "Ez dugu alderdien posiziorik erakusten amaierara arte.",
  "home.how": "Nola funtzionatzen du?",
  "home.s1t": "Erantzuten duzu",
  "home.s1d": "Gai garrantzitsuei buruzko galderak erantzuten dituzu",
  "home.s2t": "Konparatzen dugu",
  "home.s2d": "Zure erantzunak benetako bozkekin aztertzen ditugu",
  "home.s3t": "Kalkulatzen dugu",
  "home.s3d": "Zure afinitatea zehazten dugu alderdi bakoitzarekin",
  "home.s4t": "Erakusten dugu",
  "home.s4d": "Emaitzak jasotzen dituzu iturri ofizialekin",
  "home.sources": "Datu iturriak",
  "home.src1t": "Diputatuen Kongresua",
  "home.src1d": "Bozka eta erabaki parlamentarioen atari ofiziala",
  "home.src2t": "Estatuko Aldizkari Ofiziala",
  "home.src2d": "Argitalpen ofizialak eta legeztapen onartua",
  "home.src3t": "Datu irekiak",
  "home.src3d": "Alderdi bakoitzeko kopuruak quevotan.eu-tik (XV legegintzaldia, 2026/09/30ra arte)",

  "test.progress": "{m} galderatatik {n}.",
  "test.percent": "%{v} amaituta",
  "test.context": "Testuingurua",
  "test.back": "Itzuli hasierara",
  "test.prev": "Aurrekoa",
  "test.next": "Hurrengoa",
  "test.finish": "Ikusi emaitzak",
  "test.intentTitle": "Azken galdera (aukerazkoa)",
  "test.intentLead":
    "Nahi izanez gero, adierazi zein alderdi pentsatzen zenuen bozkatzea testa egin aurretik eta orain bozkatuko zenukeena iritziz aldatu baduzu.",
  "test.intentBefore":
    "Zein alderdi pentsatzen zenuen bozkatzea testa egin aurretik?",
  "test.intentAfter": "Iritziz aldatu al duzu?",
  "test.intentPlaceholder": "Aukeratu alderdi bat…",
  "test.intentNone": "Bat ere ez / ez dakit",
  "test.intentAbstain": "Ez dut bozkatuko",
  "test.intentSave": "Gorde erantzunak",
  "test.intentSkip": "Utzi",
  "test.intentThanks": "Eskerrik asko! Zure erantzunak gorde dira.",

  "results.title": "Zure emaitzak",
  "results.lead": "Alderdi bakoitzarekiko afinitatea Kongresuko benetako bozketetan oinarrituta",
  "results.matches": "{b}tik {a} bat etortze",
  "results.affinity": "afinitatea",
  "results.breakdown": "Bozken xehetasunak",
  "results.yourAnswer": "Zure erantzuna",
  "results.evidence": "Iturriak",
  "results.coherence": "Galderako bat-etortzea",
  "results.colParty": "Alderdi",
  "results.legendMatch": "adostasuna",
  "results.legendDiff": "desadostasuna",
  "results.legendAbst": "betoiketa (ez da kontatzen)",
  "results.justification": "Posizioen justifikazioa",
  "results.noPosition": "Ez dago posiziorik erregistratuta",
  "results.restart": "Berriro egin testa",
  "results.warnTitle": "Garrantzitsua",
  "results.warn":
    "XV legegintzaldiko bozketetan oinarritako test orientatiboa (datuak 2026/09/30ra arte, gehi 2026/10/02ko bozketa). 29ko N-ko hauteskunde programa ofizialak oraindik argitaratu gabe daude: kontsultatu iturri ofizialak eta programa osoak erabaki aurretik.",

  "pos.a_favor": "Alde",
  "pos.en_contra": "Aurka",
  "pos.parcial": "Matizekin",
  "pos.abstencion": "Betoiketa",

  "admin.title": "Panel osoa",
  "admin.total": "Erantzun guztiak",
  "admin.today": "Gaurko erantzunak",
  "admin.completed": "Beteak (12/12)",
  "admin.source": "Iturria",
  "admin.sourceSupabase": "Supabase",
  "admin.sourceLocal": "localStorage (gailu hau)",
  "admin.refresh": "Berritu",
  "admin.byQuestion": "Erantzunak galderako",
  "admin.avgAffinity": "Batez besteko afinitatea alderdiko",
  "admin.langs": "Hizkuntzak",
  "admin.empty": "Oraindik ez dago erantzunik",
  "admin.needLogin": "Hasi saioa estatistikak ikusteko",
  "admin.email": "Posta",
  "admin.password": "Pasahitza",
  "admin.login": "Sartu",
  "admin.logout": "Amaitu saioa",
  "admin.loginError":
    "Ezin izan da saioa hasi. Egiaztatu posta eta pasahitza.",
  "admin.perDay": "Erantzunak eguneko (14 egun)",
  "admin.intention": "Bozkazio asmoa (aro → orain)",
  "admin.intentKept": "Alderdiari eusten diote",
  "admin.intentChanged": "Alderdia aldatu dute",
  "admin.intentNoData": "Daturik ez",
  "admin.insertOn": "Txertatze urruna: aktiboa (produkzioa soilik)",
  "admin.insertOff": "Txertatze urruna: desaktibatua (ez zaude produkzioan)",
  "admin.colBefore": "lehenago",
  "admin.colAfter": "orain",

  "footer.contact": "Kontaktua",
  "contact.title": "Akats bat aurkitu duzu edo hobekuntza bat duzu?",
  "contact.lead": "Idatzi iezadazu eta berrikusiko dut: datuen, alderdien, galderen zuzenketak edo iradokizunak.",
  "contact.name": "Zure izena",
  "contact.email": "Zure posta",
  "contact.message": "Mezua",
  "contact.send": "Bidali",
  "contact.sending": "Bidaltzen…",
  "contact.success": "Eskerrik asko! Laster erantzunen dizut.",
  "contact.error": "Ezin izan da bidali. Saiatu berriro.",
  "contact.close": "Itxi",
};

const dictionaries: Record<Language, Dict> = { es, ca, gl, eu };

const STORAGE_KEY = "aquienvoto_lang";

function detectLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "ca" || stored === "gl" || stored === "eu") {
      return stored;
    }
  } catch {
    /* localStorage no disponible */
  }
  const nav = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "es";
  if (nav.startsWith("ca")) return "ca";
  if (nav.startsWith("gl")) return "gl";
  if (nav.startsWith("eu")) return "eu";
  return "es";
}

export type TranslateVars = Record<string, string | number>;

export interface I18nValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof Dict, vars?: TranslateVars) => string;
  loc: (value: LocalizedString | undefined) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => detectLanguage());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignorar */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<I18nValue>(() => {
    const dict = dictionaries[lang];
    return {
      lang,
      setLang: setLangState,
      t: (key, vars) => {
        let text: string = dict[key] ?? String(key);
        if (vars) {
          for (const [k, v] of Object.entries(vars)) {
            text = text.split(`{${k}}`).join(String(v));
          }
        }
        return text;
      },
      loc: (v) => (v ? v[lang] : ""),
    };
  }, [lang]);

  return createElement(I18nContext.Provider, { value }, children);
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n debe usarse dentro de I18nProvider");
  }
  return ctx;
}

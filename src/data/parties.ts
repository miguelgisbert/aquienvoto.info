import type { Party } from "../types";

export const parties: Party[] = [
  {
    id: "psoe",
    short: { es: "PSOE", ca: "PSOE", gl: "PSOE", eu: "PSOE" },
    full: {
      es: "Partido Socialista Obrero Español",
      ca: "Partit Socialista Obrer Espanyol",
      gl: "Partido Obreiro Español",
      eu: "Espainiako Langile Alderdi Sozialista",
    },
    color: "#E4002B",
  },
  {
    id: "pp",
    short: { es: "PP", ca: "PP", gl: "PP", eu: "PP" },
    full: {
      es: "Partido Popular (incluye UPN y Foro)",
      ca: "Partit Popular (inclou UPN i Foro)",
      gl: "Partido Popular (inclúe UPN e Foro)",
      eu: "Alderdi Popularra (UPN eta Foro barne)",
    },
    color: "#1E5BC6",
    note: {
      es: "Los resultados de UPN (Navarra) y Foro (Asturias) se incluyen en el PP.",
      ca: "Els resultats d'UPN (Navarra) i Foro (Astúries) s'inclouen dins del PP.",
      gl: "Os resultados de UPN (Navarra) e Foro (Asturias) inclúense no PP.",
      eu: "UPN (Nafarroa) eta Foro (Asturias) emaitzak PP barruan sartzen dira.",
    },
  },
  {
    id: "vox",
    short: { es: "VOX", ca: "VOX", gl: "VOX", eu: "VOX" },
    full: { es: "Vox", ca: "Vox", gl: "Vox", eu: "Vox" },
    color: "#7CB342",
  },
  {
    id: "fa",
    short: {
      es: "Frente Amplio",
      ca: "Frente Amplio",
      gl: "Frente Amplio",
      eu: "Frente Amplio",
    },
    full: {
      es: "Frente Amplio (Sumar, IU, Más Madrid, Comuns)",
      ca: "Frente Amplio (Sumar, IU, Más Madrid, Comuns)",
      gl: "Frente Amplio (Sumar, IU, Más Madrid, Comuns)",
      eu: "Frente Amplio (Sumar, IU, Más Madrid, Comuns)",
    },
    color: "#E0457B",
    note: {
      es: "Coalición de 2026 (IU, Movimiento Sumar, Más Madrid, Comuns y otras formaciones); no incluye a Podemos y no concurre en Canarias, Baleares ni Comunidad Valenciana.",
      ca: "Coalició de 2026 (IU, Moviment Sumar, Más Madrid, Comuns i altres formacions); no inclou Podemos i no concúria a Canàries, Balears ni Comunitat Valenciana.",
      gl: "Coalición de 2026 (IU, Movimento Sumar, Más Madrid, Comuns e outras formacións); non inclúe a Podemos e non concurre en Canarias, Baleares nin Comunidade Valenciana.",
      eu: "2026ko koalizioa (IU, Movimiento Sumar, Más Madrid, Comuns eta beste formazio batzuk); Podemos ez du eta ez da Kanariaetan, Balearretan ezta Valentziako Erkidegoan ere aurkezten.",
    },
  },
  {
    id: "podemos",
    short: { es: "Podemos", ca: "Podemos", gl: "Podemos", eu: "Podemos" },
    full: { es: "Podemos", ca: "Podemos", gl: "Podemos", eu: "Podemos" },
    color: "#7B1FA2",
    note: {
      es: "Candidatura separada del Frente Amplio: en 2026 solo comparte coalición con él en Canarias (Unidad del Pueblo Canario) y en la Comunidad Valenciana va en Compromís: Front Valencià. Sus votaciones en el Congreso coincidieron con el bloque de Sumar.",
      ca: "Candidatura separada del Frente Amplio: el 2026 només comparteix coalició amb ell a Canàries (Unidad del Pueblo Canario) i a la Comunitat Valenciana va en Compromís: Front Valencià. Els seus vots al Congrés van coincidir amb el bloc de Sumar.",
      gl: "Candidatura separada do Frente Amplio: en 2026 só comparte coalición con el en Canarias (Unidad del Pueblo Canario) e na Comunidade Valenciana vai en Compromís: Front Valencià. Os seus votos no Congreso coincidiron co bloque de Sumar.",
      eu: "Frente Ampliotik bereizitako hautagaitza: 2026an koalizioa partekatzen du berarekin Kanarietan (Unidad del Pueblo Canario) eta Valentziako Erkidegoan Compromís: Front Valencià-n doa. Kongresuko bozketak Sumar blokearekin bat egin zuten.",
    },
  },
  {
    id: "compromis",
    short: { es: "Compromís", ca: "Compromís", gl: "Compromís", eu: "Compromís" },
    full: { es: "Compromís", ca: "Compromís", gl: "Compromís", eu: "Compromís" },
    color: "#F57C00",
    scope: {
      es: "Solo Comunidad Valenciana",
      ca: "Només Comunitat Valenciana",
      gl: "Só Comunidade Valenciana",
      eu: "Valentziako Erkidegoa bakarrik",
    },
    note: {
      es: "En 2026 va en la coalición Compromís: Front Valencià (con Podemos, EUPV y otras formaciones) y, en el Senado, en Senado de Progreso (con PSOE, IU, Sumar y Más Madrid); sus votaciones se miden con los datos del bloque.",
      ca: "El 2026 va en la coalició Compromís: Front Valencià (amb Podemos, EUPV i altres formacions) i, al Senat, en Senado de Progreso (amb PSOE, IU, Sumar i Más Madrid); els seus vots es mesuren amb les dades del bloc.",
      gl: "En 2026 vai na coalición Compromís: Front Valencià (con Podemos, EUPV e outras formacións) e, no Senado, en Senado de Progreso (con PSOE, IU, Sumar e Más Madrid); os seus votos mídense cos datos do bloque.",
      eu: "2026an Compromís: Front Valencià koalizioan doa (Podemos, EUPV eta beste formazio batzuekin) eta, Senatuan, Senado de Progreson (PSOE, IU, Sumar eta Más Madridekin); bere bozketak blokeko datuekin neurtzen dira.",
    },
  },
  {
    id: "erc",
    short: { es: "ERC", ca: "ERC", gl: "ERC", eu: "ERC" },
    full: {
      es: "Esquerra Republicana de Catalunya",
      ca: "Esquerra Republicana de Catalunya",
      gl: "Esquerra Republicana de Catalunya",
      eu: "Kataluniako Errepublikako Ezkerra",
    },
    color: "#E6B800",
    scope: {
      es: "Solo Cataluña",
      ca: "Només Catalunya",
      gl: "Só Cataluña",
      eu: "Katalonia bakarrik",
    },
  },
  {
    id: "junts",
    short: { es: "Junts", ca: "Junts", gl: "Junts", eu: "Junts" },
    full: {
      es: "Junts per Catalunya",
      ca: "Junts per Catalunya",
      gl: "Junts per Catalunya",
      eu: "Junts Kataluniarentzat",
    },
    color: "#1BA0C4",
    scope: {
      es: "Solo Cataluña",
      ca: "Només Catalunya",
      gl: "Só Cataluña",
      eu: "Katalonia bakarrik",
    },
  },
  {
    id: "pnv",
    short: { es: "PNV", ca: "PNV", gl: "PNV", eu: "EAJ" },
    full: {
      es: "Partido Nacionalista Vasco",
      ca: "Partit Nacionalista Basc",
      gl: "Partido Nacionalista Vasco",
      eu: "Eusko Alderdi Jeltzalea",
    },
    color: "#007A33",
    scope: {
      es: "Solo Euskadi",
      ca: "Només Euskadi",
      gl: "Só Euskadi",
      eu: "Euskadi bakarrik",
    },
  },
  {
    id: "izqs",
    short: {
      es: "Izq. Soberanista",
      ca: "Esq. Sobiranista",
      gl: "Esq. Soberanista",
      eu: "Ezker Subiranista",
    },
    full: {
      es: "Izquierda Soberanista (EH Bildu, BNG, Geroa Bai)",
      ca: "Esquerra Sobiranista (EH Bildu, BNG, Geroa Bai)",
      gl: "Esquerda Soberanista (EH Bildu, BNG, Geroa Bai)",
      eu: "Ezker Subiranista (EH Bildu, BNG, Geroa Bai)",
    },
    color: "#455A64",
    scope: {
      es: "Galicia y Euskadi",
      ca: "Galícia i Euskadi",
      gl: "Galicia e Euskadi",
      eu: "Galizia eta Euskadi",
    },
    note: {
      es: "No es una coalición electoral: agrupa las votaciones de EH Bildu y BNG (Geroa Bai no obtuvo escaño en la XV legislatura).",
      ca: "No és una coalició electoral: agrupa els vots d'EH Bildu i BNG (Geroa Bai no va obtenir escó a la XV legislatura).",
      gl: "Non é unha coalición electoral: agrupa os votos de EH Bildu e BNG (Geroa Bai non obtivo escano na XV lexislatura).",
      eu: "Hauteskoalizazio bat ez da: EH Bildu eta BNG bozketak biltzen ditu (Geroa Bai-k ez zuen eserlekurik XV legegintzaldian).",
    },
  },
  {
    id: "cc",
    short: { es: "CC", ca: "CC", gl: "CC", eu: "CC" },
    full: { es: "Coalición Canaria", ca: "Coalició Canària", gl: "Coalición Canaria", eu: "Kanariar Koalizioa" },
    color: "#3949AB",
    scope: {
      es: "Solo Canarias",
      ca: "Només Canàries",
      gl: "Só Canarias",
      eu: "Kanariak bakarrik",
    },
    note: {
      es: "En las elecciones de 2026 concurre con Municipalistas Primero Canarias (Coalición Canaria + Municipalistas Primero).",
      ca: "A les eleccions de 2026 concorre amb Municipalistas Primero Canarias (Coalición Canaria + Municipalistas Primero).",
      gl: "Nas eleccións de 2026 concurre con Municipalistas Primero Canarias (Coalición Canaria + Municipalistas Primero).",
      eu: "2026ko hauteskundeetan Municipalistas Primero Canariasekin aurkezten da (Coalición Canaria + Municipalistas Primero).",
    },
  },
];

export const partyById: Record<string, Party> = Object.fromEntries(
  parties.map((p) => [p.id, p])
);

export const partyColor: Record<string, string> = Object.fromEntries(
  parties.map((p) => [p.id, p.color])
);

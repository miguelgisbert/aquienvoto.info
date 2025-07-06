import { QuestionData } from "../types";

export const questionsData: QuestionData[] = [
  {
    id: "ley-vivienda-2023",
    title: "Regulación de Precios de Alquiler",
    description:
      "¿Debería el Estado regular los precios de alquiler para hacerlos más asequibles?",
    context:
      "Esta pregunta se basa en la votación de la Ley de Vivienda de 2023, que incluía medidas para regular los precios de alquiler en zonas tensionadas.",
    options: [
      {
        id: "favor",
        text: "A favor",
        description:
          "Apoyo la regulación de precios de alquiler por parte del Estado",
      },
      {
        id: "contra",
        text: "En contra",
        description:
          "Prefiero que el mercado regule los precios sin intervención estatal",
      },
      {
        id: "parcial",
        text: "Apoyo parcial",
        description:
          "Solo en casos excepcionales o con medidas complementarias",
      },
    ],
    source: {
      title: "Ley 12/2023, de 24 de mayo, por el derecho a la vivienda",
      url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XIV&_iniciativas_id=121000061",
      date: "2023-05-24",
    },
    partyVotes: [
      { party: "PSOE", position: "favor", votes: 120 },
      { party: "PP", position: "contra", votes: 137 },
      { party: "VOX", position: "contra", votes: 52 },
      { party: "UP", position: "favor", votes: 35 },
      { party: "ERC", position: "favor", votes: 13 },
      { party: "PNV", position: "parcial", votes: 6 },
      { party: "Cs", position: "contra", votes: 10 },
    ],
  },
  {
    id: "pension-minima-2024",
    title: "Aumento de Pensiones Mínimas",
    description:
      "¿Deberían aumentarse significativamente las pensiones mínimas?",
    context:
      "Basado en las votaciones sobre el incremento de pensiones mínimas y la revalorización automática con el IPC.",
    options: [
      {
        id: "favor",
        text: "A favor",
        description: "Las pensiones mínimas deben aumentar sustancialmente",
      },
      {
        id: "contra",
        text: "En contra",
        description: "Los aumentos deben ser más moderados por sostenibilidad",
      },
      {
        id: "gradual",
        text: "Aumento gradual",
        description: "Incrementos progresivos vinculados a la economía",
      },
    ],
    source: {
      title:
        "Real Decreto-ley 2/2024, de 21 de mayo, de medidas urgentes para la aplicación del Mecanismo de Equidad Intergeneracional",
      url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XV&_iniciativas_id=130000002",
      date: "2024-05-21",
    },
    partyVotes: [
      { party: "PSOE", position: "favor", votes: 120 },
      { party: "PP", position: "gradual", votes: 137 },
      { party: "VOX", position: "contra", votes: 52 },
      { party: "UP", position: "favor", votes: 35 },
      { party: "ERC", position: "favor", votes: 13 },
      { party: "PNV", position: "gradual", votes: 6 },
      { party: "Cs", position: "gradual", votes: 10 },
    ],
  },
  {
    id: "impuesto-patrimonio-2023",
    title: "Impuesto sobre el Patrimonio",
    description:
      "¿Debería mantenerse o reforzarse el impuesto sobre grandes patrimonios?",
    context:
      "Relacionado con las votaciones sobre la armonización fiscal y el impuesto sobre el patrimonio.",
    options: [
      {
        id: "mantener",
        text: "Mantener/Reforzar",
        description:
          "El impuesto al patrimonio es necesario para la redistribución",
      },
      {
        id: "eliminar",
        text: "Eliminar",
        description:
          "Este impuesto daña la competitividad y genera fuga de capitales",
      },
      {
        id: "reformar",
        text: "Reformar",
        description: "Necesita cambios pero no eliminación completa",
      },
    ],
    source: {
      title:
        "Ley 38/2022, de 27 de diciembre, para el establecimiento de gravámenes temporales energético y de entidades de crédito",
      url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XIV&_iniciativas_id=121000108",
      date: "2022-12-27",
    },
    partyVotes: [
      { party: "PSOE", position: "mantener", votes: 120 },
      { party: "PP", position: "eliminar", votes: 137 },
      { party: "VOX", position: "eliminar", votes: 52 },
      { party: "UP", position: "mantener", votes: 35 },
      { party: "ERC", position: "mantener", votes: 13 },
      { party: "PNV", position: "reformar", votes: 6 },
      { party: "Cs", position: "eliminar", votes: 10 },
    ],
  },
  {
    id: "energia-renovable-2024",
    title: "Inversión en Energías Renovables",
    description:
      "¿Debería priorizarse la inversión pública masiva en energías renovables?",
    context:
      "Basado en votaciones sobre el Plan Nacional Integrado de Energía y Clima y fondos para renovables.",
    options: [
      {
        id: "masiva",
        text: "Inversión masiva",
        description: "Gran inversión pública inmediata en renovables",
      },
      {
        id: "privada",
        text: "Sector privado",
        description: "Que sea principalmente el sector privado quien invierta",
      },
      {
        id: "mixta",
        text: "Colaboración público-privada",
        description: "Combinación equilibrada de inversión pública y privada",
      },
    ],
    source: {
      title: "Plan Nacional Integrado de Energía y Clima 2021-2030 (PNIEC)",
      url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XIV&_iniciativas_id=161000015",
      date: "2023-06-15",
    },
    partyVotes: [
      { party: "PSOE", position: "mixta", votes: 120 },
      { party: "PP", position: "privada", votes: 137 },
      { party: "VOX", position: "privada", votes: 52 },
      { party: "UP", position: "masiva", votes: 35 },
      { party: "ERC", position: "masiva", votes: 13 },
      { party: "PNV", position: "mixta", votes: 6 },
      { party: "Cs", position: "privada", votes: 10 },
    ],
  },
  {
    id: "educacion-publica-2023",
    title: "Financiación de la Educación Pública",
    description:
      "¿Debería aumentarse significativamente el presupuesto para educación pública?",
    context:
      "Relacionado con las votaciones sobre los Presupuestos Generales del Estado y partidas educativas.",
    options: [
      {
        id: "aumentar",
        text: "Aumentar significativamente",
        description: "La educación pública necesita mucha más inversión",
      },
      {
        id: "mantener",
        text: "Mantener nivel actual",
        description: "El presupuesto actual es adecuado",
      },
      {
        id: "equilibrar",
        text: "Equilibrar público-privada",
        description: "Apoyar tanto educación pública como privada",
      },
    ],
    source: {
      title:
        "Ley Orgánica 3/2020, de 29 de diciembre, por la que se modifica la Ley Orgánica 2/2006, de Educación",
      url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XIV&_iniciativas_id=121000020",
      date: "2020-12-29",
    },
    partyVotes: [
      { party: "PSOE", position: "aumentar", votes: 120 },
      { party: "PP", position: "equilibrar", votes: 137 },
      { party: "VOX", position: "equilibrar", votes: 52 },
      { party: "UP", position: "aumentar", votes: 35 },
      { party: "ERC", position: "aumentar", votes: 13 },
      { party: "PNV", position: "aumentar", votes: 6 },
      { party: "Cs", position: "equilibrar", votes: 10 },
    ],
  },
  {
    id: "sanidad-publica-2024",
    title: "Refuerzo de la Sanidad Pública",
    description:
      "¿Debería aumentarse drásticamente la inversión en sanidad pública?",
    context:
      "Basado en votaciones sobre el Plan de Inversión en Sanidad y la financiación autonómica sanitaria.",
    options: [
      {
        id: "aumentar",
        text: "Aumentar drásticamente",
        description: "La sanidad pública necesita inversión urgente y masiva",
      },
      {
        id: "gradual",
        text: "Aumento gradual",
        description:
          "Incrementar progresivamente según disponibilidad presupuestaria",
      },
      {
        id: "mixta",
        text: "Colaboración público-privada",
        description: "Combinar sanidad pública con colaboración privada",
      },
    ],
    source: {
      title:
        "Real Decreto-ley 7/2023, de 19 de diciembre, de medidas urgentes en el ámbito de la sanidad",
      url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XV&_iniciativas_id=130000007",
      date: "2023-12-19",
    },
    partyVotes: [
      { party: "PSOE", position: "aumentar", votes: 120 },
      { party: "PP", position: "gradual", votes: 137 },
      { party: "VOX", position: "mixta", votes: 52 },
      { party: "UP", position: "aumentar", votes: 35 },
      { party: "ERC", position: "aumentar", votes: 13 },
      { party: "PNV", position: "gradual", votes: 6 },
      { party: "Cs", position: "mixta", votes: 10 },
    ],
  },
  {
    id: "inmigracion-2023",
    title: "Política de Inmigración",
    description: "¿Cuál debería ser la política migratoria de España?",
    context:
      "Relacionado con votaciones sobre la Ley de Extranjería y políticas de acogida de refugiados.",
    options: [
      {
        id: "acogedora",
        text: "Política acogedora",
        description: "Facilitar la integración y regularización de inmigrantes",
      },
      {
        id: "restrictiva",
        text: "Política restrictiva",
        description: "Endurecer los controles y requisitos de entrada",
      },
      {
        id: "equilibrada",
        text: "Política equilibrada",
        description: "Balance entre control fronterizo e integración",
      },
    ],
    source: {
      title:
        "Ley Orgánica 4/2000, de 11 de enero, sobre derechos y libertades de los extranjeros en España - Reforma 2022",
      url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XIV&_iniciativas_id=122000089",
      date: "2022-07-28",
    },
    partyVotes: [
      { party: "PSOE", position: "acogedora", votes: 120 },
      { party: "PP", position: "equilibrada", votes: 137 },
      { party: "VOX", position: "restrictiva", votes: 52 },
      { party: "UP", position: "acogedora", votes: 35 },
      { party: "ERC", position: "acogedora", votes: 13 },
      { party: "PNV", position: "equilibrada", votes: 6 },
      { party: "Cs", position: "equilibrada", votes: 10 },
    ],
  },
  {
    id: "ley-trans-2023",
    title: "Ley Trans y Derechos LGTBI",
    description:
      "¿Apoyas la Ley Trans que permite la autodeterminación de género?",
    context:
      "Basado en la votación de la Ley para la igualdad real y efectiva de las personas trans.",
    options: [
      {
        id: "favor",
        text: "A favor",
        description: "Apoyo completamente la autodeterminación de género",
      },
      {
        id: "contra",
        text: "En contra",
        description: "Esta ley va demasiado lejos en sus planteamientos",
      },
      {
        id: "matices",
        text: "Con matices",
        description: "Apoyo los derechos trans pero con algunas reservas",
      },
    ],
    source: {
      title:
        "Ley 4/2023, de 28 de febrero, para la igualdad real y efectiva de las personas trans",
      url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XIV&_iniciativas_id=122000007",
      date: "2023-02-28",
    },
    partyVotes: [
      { party: "PSOE", position: "favor", votes: 120 },
      { party: "PP", position: "contra", votes: 137 },
      { party: "VOX", position: "contra", votes: 52 },
      { party: "UP", position: "favor", votes: 35 },
      { party: "ERC", position: "favor", votes: 13 },
      { party: "PNV", position: "matices", votes: 6 },
      { party: "Cs", position: "contra", votes: 10 },
    ],
  },
  {
    id: "reforma-laboral-2022",
    title: "Reforma Laboral",
    description: "¿Qué opinas sobre la reforma laboral aprobada en 2022?",
    context:
      "Relacionado con la derogación parcial de la reforma laboral del PP y nuevas medidas laborales.",
    options: [
      {
        id: "favor",
        text: "A favor",
        description: "La reforma mejora los derechos de los trabajadores",
      },
      {
        id: "contra",
        text: "En contra",
        description: "Perjudica la competitividad y flexibilidad empresarial",
      },
      {
        id: "insuficiente",
        text: "Insuficiente",
        description: "Se queda corta, hacen falta más cambios pro-trabajador",
      },
    ],
    source: {
      title:
        "Real Decreto-ley 32/2021, de 28 de diciembre, de medidas urgentes para la reforma laboral",
      url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XIV&_iniciativas_id=130000032",
      date: "2022-02-03",
    },
    partyVotes: [
      { party: "PSOE", position: "favor", votes: 120 },
      { party: "PP", position: "contra", votes: 137 },
      { party: "VOX", position: "contra", votes: 52 },
      { party: "UP", position: "insuficiente", votes: 35 },
      { party: "ERC", position: "favor", votes: 13 },
      { party: "PNV", position: "favor", votes: 6 },
      { party: "Cs", position: "contra", votes: 10 },
    ],
  },
  {
    id: "financiacion-autonomica-2024",
    title: "Financiación Autonómica",
    description:
      "¿Cómo debería reformarse el sistema de financiación autonómica?",
    context:
      "Basado en debates sobre la reforma del sistema de financiación autonómica y el cupo catalán.",
    options: [
      {
        id: "solidario",
        text: "Sistema solidario",
        description: "Mantener redistribución entre comunidades ricas y pobres",
      },
      {
        id: "federal",
        text: "Sistema federal",
        description: "Más autonomía fiscal para cada comunidad",
      },
      {
        id: "mixto",
        text: "Sistema mixto",
        description: "Combinar solidaridad con mayor autonomía fiscal",
      },
    ],
    source: {
      title:
        "Proposición no de ley sobre la reforma del sistema de financiación autonómica",
      url: "https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XV&_iniciativas_id=162000013",
      date: "2024-03-12",
    },
    partyVotes: [
      { party: "PSOE", position: "mixto", votes: 120 },
      { party: "PP", position: "solidario", votes: 137 },
      { party: "VOX", position: "solidario", votes: 52 },
      { party: "UP", position: "federal", votes: 35 },
      { party: "ERC", position: "federal", votes: 13 },
      { party: "PNV", position: "federal", votes: 6 },
      { party: "Cs", position: "solidario", votes: 10 },
    ],
  },
];

export const partyColors: Record<string, string> = {
  PSOE: "#e53e3e",
  PP: "#3182ce",
  VOX: "#38a169",
  UP: "#805ad5",
  ERC: "#f6ad55",
  PNV: "#4fd1c7",
  Cs: "#fd7f28",
};

import { QuestionData } from "../types";

// ⚠️ DATOS DE VOTACIÓN SIMULADOS ⚠️
//
// IMPORTANTE: Los datos de votación por partido (partyVotes) son SIMULADOS para
// fines demostrativos. Las votaciones reales están disponibles en:
//
// 🔍 CÓMO ENCONTRAR VOTACIONES REALES:
// 1. Ir a: https://www.congreso.es/busqueda-de-iniciativas
// 2. Buscar por el título de la ley/proposición
// 3. En el detalle de la iniciativa, buscar "DETALLE, XML y JSON"
// 4. Descargar el PDF con los votos por grupo parlamentario
//
// 📋 EJEMPLO DE ENLACE REAL:
// https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XIV&_iniciativas_id=122/000247
//
// ⚖️ FUENTES OFICIALES VERIFICABLES:
// Los enlaces (sources) apuntan a documentos oficiales del BOE y organismos gubernamentales.

export const questionsData: QuestionData[] = [
  {
    id: "salario-minimo-2024",
    title: "Subida del Salario Mínimo",
    description:
      "¿Debería subirse el salario mínimo interprofesional de forma significativa?",
    context:
      "Basado en las votaciones sobre las subidas del SMI y su impacto en el empleo y poder adquisitivo.",
    options: [
      {
        id: "subida-fuerte",
        text: "Subida significativa",
        description:
          "El SMI debe subir sustancialmente para mejorar las condiciones laborales",
      },
      {
        id: "subida-moderada",
        text: "Subida moderada",
        description: "Incrementos graduales según productividad e inflación",
      },
      {
        id: "mantener",
        text: "Mantener actual",
        description: "El nivel actual es adecuado para no perjudicar el empleo",
      },
    ],
    source: {
      title: "Búsqueda: Salario mínimo interprofesional",
      url: "https://www.congreso.es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=busquedaAvanzada&_iniciativas_legislatura=XV&_iniciativas_texto=salario%20m%C3%ADnimo",
      date: "2023-12-26",
    },
    partyVotes: [
      { party: "PSOE", position: "subida-fuerte", votes: 120 },
      { party: "PP", position: "subida-moderada", votes: 137 },
      { party: "VOX", position: "mantener", votes: 52 },
      { party: "UP", position: "subida-fuerte", votes: 35 },
      { party: "ERC", position: "subida-fuerte", votes: 13 },
      { party: "PNV", position: "subida-moderada", votes: 6 },
      { party: "Cs", position: "subida-moderada", votes: 10 },
    ],
  },
  {
    id: "impuesto-grandes-fortunas",
    title: "Impuesto a las Grandes Fortunas",
    description:
      "¿Debería establecerse un impuesto específico a las grandes fortunas?",
    context:
      "Relacionado con medidas fiscales para grandes patrimonios y redistribución de la riqueza.",
    options: [
      {
        id: "establecer",
        text: "Establecer impuesto",
        description: "Las grandes fortunas deben contribuir más al Estado",
      },
      {
        id: "rechazar",
        text: "Rechazar impuesto",
        description: "Perjudicaría la inversión y competitividad",
      },
      {
        id: "reformar-existente",
        text: "Reformar los actuales",
        description: "Mejorar los impuestos al patrimonio existentes",
      },
    ],
    source: {
      title: "Búsqueda: Impuesto grandes fortunas",
      url: "https://www.congreso.es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=busquedaAvanzada&_iniciativas_legislatura=XIV&_iniciativas_texto=impuesto%20grandes%20fortunas",
      date: "2022-12-27",
    },
    partyVotes: [
      { party: "PSOE", position: "establecer", votes: 120 },
      { party: "PP", position: "rechazar", votes: 137 },
      { party: "VOX", position: "rechazar", votes: 52 },
      { party: "UP", position: "establecer", votes: 35 },
      { party: "ERC", position: "establecer", votes: 13 },
      { party: "PNV", position: "reformar-existente", votes: 6 },
      { party: "Cs", position: "rechazar", votes: 10 },
    ],
  },
  {
    id: "jornada-laboral-32-horas",
    title: "Reducción Jornada Laboral",
    description:
      "¿Debería reducirse la jornada laboral semanal a 32 horas manteniendo el salario?",
    context:
      "Debate sobre la reducción de la jornada laboral para mejorar la conciliación y productividad.",
    options: [
      {
        id: "reducir-32",
        text: "Reducir a 32 horas",
        description:
          "Una jornada más corta mejora la productividad y calidad de vida",
      },
      {
        id: "mantener-40",
        text: "Mantener 40 horas",
        description: "La jornada actual es necesaria para la competitividad",
      },
      {
        id: "flexibilizar",
        text: "Flexibilizar por sectores",
        description: "Permitir diferentes jornadas según el tipo de trabajo",
      },
    ],
    source: {
      title: "Búsqueda: Jornada laboral 32 horas",
      url: "https://www.congreso.es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=busquedaAvanzada&_iniciativas_texto=jornada%20laboral%2032",
      date: "2024-03-15",
    },
    partyVotes: [
      { party: "PSOE", position: "flexibilizar", votes: 120 },
      { party: "PP", position: "mantener-40", votes: 137 },
      { party: "VOX", position: "mantener-40", votes: 52 },
      { party: "UP", position: "reducir-32", votes: 35 },
      { party: "ERC", position: "reducir-32", votes: 13 },
      { party: "PNV", position: "flexibilizar", votes: 6 },
      { party: "Cs", position: "mantener-40", votes: 10 },
    ],
  },
  {
    id: "amnistia-proceso",
    title: "Ley de Amnistía",
    description:
      "¿Apoyas la Ley de Amnistía para los procesados del proceso independentista catalán?",
    context:
      "Basado en la tramitación de la Ley de Amnistía para los actos relacionados con el proceso independentista.",
    options: [
      {
        id: "favor",
        text: "A favor",
        description: "La amnistía favorece la reconciliación y normalización",
      },
      {
        id: "contra",
        text: "En contra",
        description:
          "Va contra la separación de poderes y el Estado de Derecho",
      },
      {
        id: "condicionada",
        text: "Amnistía condicionada",
        description: "Solo para ciertos delitos y con condiciones específicas",
      },
    ],
    source: {
      title: "Búsqueda: Ley Orgánica amnistía Cataluña",
      url: "https://www.congreso.es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=busquedaAvanzada&_iniciativas_legislatura=XV&_iniciativas_texto=amnist%C3%ADa",
      date: "2024-05-30",
    },
    partyVotes: [
      { party: "PSOE", position: "favor", votes: 120 },
      { party: "PP", position: "contra", votes: 137 },
      { party: "VOX", position: "contra", votes: 52 },
      { party: "UP", position: "favor", votes: 35 },
      { party: "ERC", position: "favor", votes: 13 },
      { party: "PNV", position: "condicionada", votes: 6 },
      { party: "Cs", position: "contra", votes: 10 },
    ],
  },
  {
    id: "gasto-defensa-otan",
    title: "Gasto en Defensa - Objetivo OTAN",
    description:
      "¿Debería España alcanzar el 2% del PIB en gasto de defensa como pide la OTAN?",
    context:
      "Debate sobre el incremento del presupuesto de defensa para cumplir compromisos internacionales.",
    options: [
      {
        id: "alcanzar-2-porciento",
        text: "Alcanzar el 2%",
        description: "España debe cumplir sus compromisos con la OTAN",
      },
      {
        id: "mantener-actual",
        text: "Mantener nivel actual",
        description: "El gasto actual en defensa es suficiente",
      },
      {
        id: "reducir-gasto",
        text: "Reducir gasto militar",
        description: "Priorizar gasto social sobre gasto militar",
      },
    ],
    source: {
      title: "Búsqueda: Presupuestos defensa OTAN",
      url: "https://www.congreso.es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=busquedaAvanzada&_iniciativas_texto=presupuestos%20defensa",
      date: "2023-11-30",
    },
    partyVotes: [
      { party: "PSOE", position: "mantener-actual", votes: 120 },
      { party: "PP", position: "alcanzar-2-porciento", votes: 137 },
      { party: "VOX", position: "alcanzar-2-porciento", votes: 52 },
      { party: "UP", position: "reducir-gasto", votes: 35 },
      { party: "ERC", position: "reducir-gasto", votes: 13 },
      { party: "PNV", position: "mantener-actual", votes: 6 },
      { party: "Cs", position: "alcanzar-2-porciento", votes: 10 },
    ],
  },
  {
    id: "regulacion-alquileres-turisticos",
    title: "Regulación Alquileres Turísticos",
    description:
      "¿Debería regularse más estrictamente el alquiler turístico tipo Airbnb?",
    context:
      "Medidas para controlar el impacto de los alquileres turísticos en el mercado de la vivienda.",
    options: [
      {
        id: "regular-estrictamente",
        text: "Regular estrictamente",
        description:
          "Limitar licencias y zonas para proteger el mercado residencial",
      },
      {
        id: "regular-moderadamente",
        text: "Regulación moderada",
        description: "Algunas restricciones pero manteniendo la actividad",
      },
      {
        id: "libre-mercado",
        text: "Libre mercado",
        description: "Mínima regulación, que decida el mercado",
      },
    ],
    source: {
      title: "Búsqueda: Ley vivienda alquileres turísticos",
      url: "https://www.congreso.es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=busquedaAvanzada&_iniciativas_texto=ley%20vivienda",
      date: "2023-05-24",
    },
    partyVotes: [
      { party: "PSOE", position: "regular-estrictamente", votes: 120 },
      { party: "PP", position: "regular-moderadamente", votes: 137 },
      { party: "VOX", position: "libre-mercado", votes: 52 },
      { party: "UP", position: "regular-estrictamente", votes: 35 },
      { party: "ERC", position: "regular-estrictamente", votes: 13 },
      { party: "PNV", position: "regular-moderadamente", votes: 6 },
      { party: "Cs", position: "libre-mercado", votes: 10 },
    ],
  },
  {
    id: "energia-nuclear",
    title: "Energía Nuclear en España",
    description: "¿Cuál debería ser el futuro de la energía nuclear en España?",
    context:
      "Debate sobre el cierre programado de centrales nucleares y el mix energético.",
    options: [
      {
        id: "mantener-ampliar",
        text: "Mantener y ampliar",
        description: "La nuclear es necesaria para la transición energética",
      },
      {
        id: "cierre-programado",
        text: "Cierre programado",
        description: "Cerrar gradualmente como está planificado",
      },
      {
        id: "cierre-inmediato",
        text: "Cierre inmediato",
        description: "Cerrar todas las centrales lo antes posible",
      },
    ],
    source: {
      title: "Búsqueda: Plan energía nuclear España",
      url: "https://www.congreso.es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=busquedaAvanzada&_iniciativas_texto=energ%C3%ADa%20nuclear",
      date: "2023-06-15",
    },
    partyVotes: [
      { party: "PSOE", position: "cierre-programado", votes: 120 },
      { party: "PP", position: "mantener-ampliar", votes: 137 },
      { party: "VOX", position: "mantener-ampliar", votes: 52 },
      { party: "UP", position: "cierre-inmediato", votes: 35 },
      { party: "ERC", position: "cierre-inmediato", votes: 13 },
      { party: "PNV", position: "cierre-programado", votes: 6 },
      { party: "Cs", position: "mantener-ampliar", votes: 10 },
    ],
  },
  {
    id: "semana-laboral-4-dias",
    title: "Semana Laboral de 4 Días",
    description: "¿Debería probarse una semana laboral de 4 días en España?",
    context:
      "Propuesta piloto para probar la eficacia de la semana laboral de cuatro días.",
    options: [
      {
        id: "implementar-piloto",
        text: "Implementar programa piloto",
        description: "Probar en empresas voluntarias para evaluar resultados",
      },
      {
        id: "rechazar-propuesta",
        text: "Rechazar propuesta",
        description: "No es viable para la economía española",
      },
      {
        id: "solo-sectores-especificos",
        text: "Solo sectores específicos",
        description: "Aplicar únicamente en sectores donde sea factible",
      },
    ],
    source: {
      title: "Búsqueda: Semana laboral 4 días piloto",
      url: "https://www.congreso.es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=busquedaAvanzada&_iniciativas_texto=semana%20laboral%204%20d%C3%ADas",
      date: "2024-02-12",
    },
    partyVotes: [
      { party: "PSOE", position: "implementar-piloto", votes: 120 },
      { party: "PP", position: "rechazar-propuesta", votes: 137 },
      { party: "VOX", position: "rechazar-propuesta", votes: 52 },
      { party: "UP", position: "implementar-piloto", votes: 35 },
      { party: "ERC", position: "implementar-piloto", votes: 13 },
      { party: "PNV", position: "solo-sectores-especificos", votes: 6 },
      { party: "Cs", position: "solo-sectores-especificos", votes: 10 },
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

export type Language = "es" | "ca" | "gl" | "eu";

export interface LocalizedString {
  es: string;
  ca: string;
  gl: string;
  eu: string;
}

export type Stance = "a_favor" | "en_contra" | "parcial" | "abstencion";

export interface Party {
  id: string;
  short: LocalizedString;
  full: LocalizedString;
  color: string;
  /** Badge opcional: on el partit presenta llistes (nullptr si és estatal) */
  scope?: LocalizedString;
  /** Nota de coalició / agrupació (fusió, separació, etc.) */
  note?: LocalizedString;
}

export type EvidenceKind = "votacion" | "medida" | "programa";

export interface Evidence {
  kind: EvidenceKind;
  /** Títol oficial (castellà) de la font */
  title: string;
  url: string;
  date: string;
}

export interface PartyPosition {
  party: string;
  stance: Stance;
  note?: LocalizedString;
}

export interface Option {
  id: Stance;
  text: LocalizedString;
  description: LocalizedString;
}

export interface Question {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  /** Breu descripció de la mesura (es mostra durant el test) */
  context: LocalizedString;
  /** Justificació de les posicions dels partits (es mostra als resultats) */
  justification: LocalizedString;
  options: Option[];
  evidence: Evidence[];
  positions: PartyPosition[];
}

export interface UserAnswer {
  questionId: string;
  optionId: string;
}

export interface PartyMatch {
  party: string;
  percentage: number;
  agreements: number;
  total: number;
  color: string;
}

export interface AppState {
  currentView: "home" | "test" | "results";
  currentQuestion: number;
  userAnswers: UserAnswer[];
  showResults: boolean;
}

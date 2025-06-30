export interface Question {
  id: string;
  title: string;
  description: string;
  context: string;
  options: Option[];
  source: {
    title: string;
    url: string;
    date: string;
  };
}

export interface Option {
  id: string;
  text: string;
  description: string;
}

export interface PartyVote {
  party: string;
  position: string; // 'favor', 'contra', 'abstencion', 'ausente'
  votes: number;
}

export interface QuestionData extends Question {
  partyVotes: PartyVote[];
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
  currentView: 'home' | 'test' | 'results';
  currentQuestion: number;
  userAnswers: UserAnswer[];
  showResults: boolean;
}
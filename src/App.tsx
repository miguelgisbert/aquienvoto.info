import { useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Test from "./components/Test";
import Results from "./components/Results";
import AdminStats from "./components/AdminStats";
import Footer from "./components/Footer";
import { UserAnswer, AppState } from "./types";
import { questions } from "./data/questions";
import {
  useAnalytics,
  useResponseStorage,
  updateStoredIntents,
} from "./hooks/useAnalytics";
import { updateResponseIntents } from "./lib/supabase";
import { prefetchGeo } from "./lib/geo";
import { useI18n } from "./i18n";

interface SavedResponse {
  id: string | null;
  at: string;
}

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentView: "home",
    currentQuestion: 0,
    userAnswers: [],
    showResults: false,
  });
  const [testDurationMs, setTestDurationMs] = useState<number | null>(null);
  const [intentionOpen, setIntentionOpen] = useState(false);
  const savePromise = useRef<Promise<SavedResponse | null> | null>(null);

  const { track } = useAnalytics();
  const { saveResponse } = useResponseStorage();
  const { lang } = useI18n();

  // Mode embed (?embed=1): sense capçalera ni peu, per a iframes d'altres webs
  const isEmbed = useMemo(() => {
    try {
      return new URLSearchParams(window.location.search).get("embed") === "1";
    } catch {
      return false;
    }
  }, []);

  // En canviar de vista es va a dalt: en acabar el test la vista de
  // resultats ha de mostrarse des de l'inici, no on estava l'scroll
  const scrollToTop = () => window.scrollTo({ top: 0 });

  const handleNavigate = (view: "home" | "test" | "results") => {
    if (view === "results" && appState.userAnswers.length === 0) {
      return; // Don't allow navigation to results without answers
    }
    setAppState((prev) => ({ ...prev, currentView: view }));
    scrollToTop();
  };

  const handleStartTest = () => {
    // Geolocalització aproximada: es demana en iniciar el test perquè, quan
    // es desen les respostes, ja estiga en caché i no endarrerege l'inserció
    prefetchGeo();
    setAppState((prev) => ({
      ...prev,
      currentView: "test",
      currentQuestion: 0,
      userAnswers: [],
      showResults: false,
    }));
    setIntentionOpen(false);
    savePromise.current = null;
    scrollToTop();
  };

  // Guardat en dues fases: la fila es desa en acabar el test (sense
  // intencions) i les intencions s'afegeixen quan l'usuari contesta el
  // bloc que es mostra a baix dels resultats.
  const handleTestComplete = (answers: UserAnswer[], durationMs: number) => {
    const completedAt = new Date().toISOString();
    setTestDurationMs(durationMs);
    setIntentionOpen(true);
    track("intention_step_shown", { label: "Optional intention step" });
    setAppState((prev) => ({
      ...prev,
      currentView: "results",
      userAnswers: answers,
      showResults: true,
    }));
    scrollToTop();

    savePromise.current = saveResponse(answers, {
      lang,
      test_completed_at: completedAt,
      duration_ms: durationMs,
      total_questions: questions.length,
      intent_before: null,
      intent_after: null,
    }).then((result) =>
      result.success ? { id: result.id, at: completedAt } : null
    );
  };

  // Un cop es mostren els resultats: el bloc d'intenció → actualitza la fila
  const handleIntentionDone = (
    before: string | null,
    after: string | null
  ) => {
    if (before || after) {
      track("intention_submitted", {
        before,
        after,
        label: `abans=${before} ara=${after}`,
      });
    } else {
      track("intention_skipped", { label: "Intention step skipped" });
    }

    void (savePromise.current ?? Promise.resolve(null)).then((saved) => {
      if (!saved) {
        // La inserció inicial va fallar: es desa sencer amb les intencions
        void saveResponse(appState.userAnswers, {
          lang,
          test_completed_at: new Date().toISOString(),
          duration_ms: testDurationMs ?? 0,
          total_questions: questions.length,
          intent_before: before,
          intent_after: after,
        });
        return;
      }
      if (!before && !after) return; // res a actualitzar
      updateStoredIntents(saved.at, before, after);
      if (saved.id) void updateResponseIntents(saved.id, before, after);
    });
  };

  const handleRestart = () => {
    setAppState({
      currentView: "home",
      currentQuestion: 0,
      userAnswers: [],
      showResults: false,
    });
    setIntentionOpen(false);
    setTestDurationMs(null);
    savePromise.current = null;
    scrollToTop();
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isEmbed ? "" : "pt-16"}`}>
      {!isEmbed && (
        <Header currentView={appState.currentView} onNavigate={handleNavigate} />
      )}

      {appState.currentView === "home" && (
        <Home onStartTest={handleStartTest} />
      )}

      {appState.currentView === "test" && (
        <Test
          onComplete={handleTestComplete}
          onBack={() => handleNavigate("home")}
        />
      )}

      {appState.currentView === "results" &&
        appState.userAnswers.length > 0 && (
          <Results
            userAnswers={appState.userAnswers}
            onRestart={handleRestart}
            intentionOpen={intentionOpen}
            onIntentionDone={handleIntentionDone}
          />
        )}

      {/* Component d'estadístiques (només visible amb ?admin=true) */}
      {!isEmbed && <AdminStats />}

      {!isEmbed && <Footer />}
    </div>
  );
}

export default App;

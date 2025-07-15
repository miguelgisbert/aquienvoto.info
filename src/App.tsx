import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Test from "./components/Test";
import Results from "./components/Results";
import AdminStats from "./components/AdminStats";
import { UserAnswer, AppState } from "./types";

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentView: "home",
    currentQuestion: 0,
    userAnswers: [],
    showResults: false,
  });

  const handleNavigate = (view: "home" | "test" | "results") => {
    if (view === "results" && appState.userAnswers.length === 0) {
      return; // Don't allow navigation to results without answers
    }
    setAppState((prev) => ({ ...prev, currentView: view }));
  };

  const handleStartTest = () => {
    setAppState((prev) => ({
      ...prev,
      currentView: "test",
      currentQuestion: 0,
      userAnswers: [],
      showResults: false,
    }));
  };

  const handleTestComplete = (answers: UserAnswer[]) => {
    setAppState((prev) => ({
      ...prev,
      currentView: "results",
      userAnswers: answers,
      showResults: true,
    }));
  };

  const handleRestart = () => {
    setAppState({
      currentView: "home",
      currentQuestion: 0,
      userAnswers: [],
      showResults: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Header currentView={appState.currentView} onNavigate={handleNavigate} />

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
          />
        )}

      {/* Component d'estadístiques (només visible amb ?admin=true) */}
      <AdminStats />
    </div>
  );
}

export default App;

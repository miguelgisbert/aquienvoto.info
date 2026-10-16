import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, X, Minus, ChevronDown } from "lucide-react";
import { questions } from "../data/questions";
import { Stance, UserAnswer } from "../types";
import { useAnalytics } from "../hooks/useAnalytics";
import { useI18n } from "../i18n";

interface TestProps {
  onComplete: (answers: UserAnswer[], durationMs: number) => void;
  onBack: () => void;
}

const Test: React.FC<TestProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showContext, setShowContext] = useState(
    () => typeof window === "undefined" || window.innerWidth >= 640
  );
  const startedAt = useRef(Date.now());

  const { track } = useAnalytics();
  const { t, loc } = useI18n();

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const getOptionIcon = (id: Stance) => {
    switch (id) {
      case "a_favor":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" aria-hidden="true" />;
      case "en_contra":
        return <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0" aria-hidden="true" />;
      case "parcial":
        return <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 shrink-0" aria-hidden="true" />;
      default:
        return null;
    }
  };

  const handleAnswer = (optionId: string) => {
    setSelectedOption(optionId);

    track("question_answered", {
      question_id: question.id,
      question_number: currentQuestion + 1,
      option_selected: optionId,
      label: `Q${currentQuestion + 1}: ${optionId}`,
    });
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswer: UserAnswer = {
      questionId: question.id,
      optionId: selectedOption,
    };

    const updatedAnswers = [
      ...answers.filter((a) => a.questionId !== question.id),
      newAnswer,
    ];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");

      track("question_navigation", {
        from_question: currentQuestion + 1,
        to_question: currentQuestion + 2,
        label: `Navigate Q${currentQuestion + 1} to Q${currentQuestion + 2}`,
      });
    } else {
      track("test_completed", {
        total_questions: questions.length,
        completion_time: Date.now(),
        label: "Test finished",
      });
      onComplete(updatedAnswers, Date.now() - startedAt.current);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers.find(
        (a) => a.questionId === questions[currentQuestion - 1].id
      );
      setSelectedOption(previousAnswer?.optionId || "");
    }
  };

  return (
    <div className="min-h-[calc(100svh_-_4rem)] bg-linear-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-3 sm:py-8">
        {/* Progress Bar */}
        <div className="mb-3 sm:mb-8">
          <div className="flex justify-between items-center mb-1.5 sm:mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {t("test.progress", { n: currentQuestion + 1, m: questions.length })}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {t("test.percent", { v: Math.round(progress) })}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
            <div
              className="bg-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-3 sm:p-8 mb-3 sm:mb-8">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg narrow:text-base sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
              {loc(question.title)}
            </h2>
            <p className="text-sm narrow:text-[13px] sm:text-lg text-gray-700 mb-2 sm:mb-4 leading-snug sm:leading-normal">
              {loc(question.description)}
            </p>
            <button
              type="button"
              onClick={() => setShowContext((v) => !v)}
              aria-expanded={showContext}
              className="sm:hidden mb-2 flex items-center gap-1 text-xs font-semibold text-blue-700"
            >
              {t("test.context")}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${showContext ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`bg-blue-50 p-3 sm:p-4 rounded-lg ${showContext ? "" : "hidden"} sm:block`}
            >
              <p className="text-xs sm:text-sm text-blue-800 leading-snug">
                <strong className="hidden sm:inline">{t("test.context")}:</strong>{" "}
                {loc(question.context)}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-8">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`w-full p-2.5 sm:p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedOption === option.id
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start space-x-2.5 sm:space-x-3">
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                      selectedOption === option.id
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedOption === option.id && (
                      <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {getOptionIcon(option.id)}
                      <h4 className="font-semibold text-gray-900 text-[15px] sm:text-base">
                        {loc(option.text)}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-snug">
                      {loc(option.description)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={currentQuestion === 0 ? onBack : handlePrevious}
            className="flex items-center px-4 sm:px-6 py-2.5 sm:py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <ArrowLeft className="mr-1.5 sm:mr-2 h-4 w-4" />
            {currentQuestion === 0 ? t("test.back") : t("test.prev")}
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`flex items-center px-5 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-lg transition-colors ${
              selectedOption
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentQuestion === questions.length - 1
              ? t("test.finish")
              : t("test.next")}
            <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;

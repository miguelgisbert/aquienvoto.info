import React, { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { questionsData } from "../data/questions_old";
import { UserAnswer } from "../types";

interface TestProps {
  onComplete: (answers: UserAnswer[]) => void;
  onBack: () => void;
}

const Test: React.FC<TestProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const question = questionsData[currentQuestion];
  const progress = ((currentQuestion + 1) / questionsData.length) * 100;

  const handleAnswer = (optionId: string) => {
    setSelectedOption(optionId);
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

    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else {
      onComplete(updatedAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers.find(
        (a) => a.questionId === questionsData[currentQuestion - 1].id
      );
      setSelectedOption(previousAnswer?.optionId || "");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Pregunta {currentQuestion + 1} de {questionsData.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% completado
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {question.title}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{question.description}</p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Contexto:</strong> {question.context}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedOption === option.id
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      selectedOption === option.id
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedOption === option.id && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {option.text}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={currentQuestion === 0 ? onBack : handlePrevious}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentQuestion === 0 ? "Volver al inicio" : "Anterior"}
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`flex items-center px-8 py-3 font-semibold rounded-lg transition-colors ${
              selectedOption
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentQuestion === questionsData.length - 1
              ? "Ver Resultados"
              : "Siguiente"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;

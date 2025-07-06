import React from "react";
import {
  ExternalLink,
  ArrowLeft,
  BarChart3,
  CheckCircle,
  X,
  Minus,
} from "lucide-react";
import { UserAnswer, PartyMatch } from "../types";
import { questionsData, partyColors } from "../data/questions_old";

interface ResultsProps {
  userAnswers: UserAnswer[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ userAnswers, onRestart }) => {
  const calculateMatches = (): PartyMatch[] => {
    const parties = ["PSOE", "PP", "VOX", "UP", "ERC", "PNV", "Cs"];
    const matches: PartyMatch[] = [];

    parties.forEach((party) => {
      let agreements = 0;
      let total = 0;

      userAnswers.forEach((answer) => {
        const question = questionsData.find((q) => q.id === answer.questionId);
        if (question) {
          const partyVote = question.partyVotes.find(
            (pv) => pv.party === party
          );
          if (partyVote) {
            total++;
            if (partyVote.position === answer.optionId) {
              agreements++;
            }
          }
        }
      });

      const percentage = total > 0 ? (agreements / total) * 100 : 0;
      matches.push({
        party,
        percentage,
        agreements,
        total,
        color: partyColors[party],
      });
    });

    return matches.sort((a, b) => b.percentage - a.percentage);
  };

  const matches = calculateMatches();

  const getPositionIcon = (position: string) => {
    switch (position) {
      case "favor":
      case "aumentar":
      case "mantener":
      case "masiva":
      case "mixta":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "contra":
      case "eliminar":
      case "privada":
        return <X className="h-4 w-4 text-red-500" />;
      case "parcial":
      case "gradual":
      case "reformar":
      case "equilibrar":
        return <Minus className="h-4 w-4 text-yellow-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPositionText = (position: string) => {
    const positionMap: Record<string, string> = {
      favor: "A favor",
      contra: "En contra",
      parcial: "Apoyo parcial",
      aumentar: "Aumentar",
      mantener: "Mantener",
      gradual: "Gradual",
      eliminar: "Eliminar",
      reformar: "Reformar",
      masiva: "Inversión masiva",
      privada: "Sector privado",
      mixta: "Mixta",
      equilibrar: "Equilibrar",
    };
    return positionMap[position] || position;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tus Resultados
          </h1>
          <p className="text-xl text-gray-600">
            Aquí tienes tu afinidad con cada partido político basada en
            votaciones reales del Congreso
          </p>
        </div>

        {/* Party Matches */}
        <div className="grid gap-6 mb-12">
          {matches.map((match, index) => (
            <div
              key={match.party}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-gray-400">
                    #{index + 1}
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: match.color }}
                    >
                      {match.party}
                    </h3>
                    <p className="text-gray-600">
                      {match.agreements} de {match.total} coincidencias
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-3xl font-bold"
                    style={{ color: match.color }}
                  >
                    {Math.round(match.percentage)}%
                  </div>
                  <p className="text-sm text-gray-500">afinidad</p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${match.percentage}%`,
                    backgroundColor: match.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Desglose Detallado de Votaciones
          </h2>

          <div className="space-y-8">
            {questionsData.map((question) => {
              const userAnswer = userAnswers.find(
                (a) => a.questionId === question.id
              );
              if (!userAnswer) return null;

              return (
                <div
                  key={question.id}
                  className="border-b border-gray-200 pb-8 last:border-b-0"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {question.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{question.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      <span className="font-medium">Tu respuesta:</span>
                      <span className="px-2 py-1 bg-blue-100 rounded">
                        {
                          question.options.find(
                            (o) => o.id === userAnswer.optionId
                          )?.text
                        }
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {question.partyVotes.map((partyVote) => (
                      <div
                        key={partyVote.party}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          <span
                            className="font-semibold"
                            style={{ color: partyColors[partyVote.party] }}
                          >
                            {partyVote.party}
                          </span>
                          {getPositionIcon(partyVote.position)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {getPositionText(partyVote.position)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <ExternalLink className="h-4 w-4" />
                    <a
                      href={question.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 underline"
                    >
                      {question.source.title} ({question.source.date})
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Hacer el test de nuevo
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 mb-2">Importante</h3>
          <p className="text-yellow-700 text-sm">
            Este test es orientativo y se basa en una muestra limitada de
            votaciones. Para una decisión electoral informada, te recomendamos
            consultar los programas completos de los partidos y diversas fuentes
            de información política.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;

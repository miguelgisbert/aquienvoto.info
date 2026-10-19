import React, { useEffect, useState } from "react";
import {
  ExternalLink,
  ArrowLeft,
  CheckCircle,
  X,
  Minus,
  CircleSlash,
} from "lucide-react";
import { UserAnswer, PartyMatch, Stance } from "../types";
import { questions } from "../data/questions";
import { parties, partyById } from "../data/parties";
import IntentionBlock from "./IntentionBlock";
import ShareCard from "./ShareCard";
import { useI18n } from "../i18n";

interface ResultsProps {
  userAnswers: UserAnswer[];
  onRestart: () => void;
  intentionOpen?: boolean;
  onIntentionDone?: (before: string | null, after: string | null) => void;
}

type CellState = "match" | "diff" | "abst" | "none";

const Results: React.FC<ResultsProps> = ({
  userAnswers,
  onRestart,
  intentionOpen,
  onIntentionDone,
}) => {
  const { t, loc } = useI18n();

  const [grow, setGrow] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (grow) return;
    const id = window.requestAnimationFrame(() => setGrow(true));
    return () => window.cancelAnimationFrame(id);
  }, [grow]);

  const calculateMatches = (): PartyMatch[] => {
    const matches: PartyMatch[] = [];

    parties.forEach((party) => {
      let agreements = 0;
      let total = 0;

      questions.forEach((question) => {
        const position = question.positions.find(
          (p) => p.party === party.id
        );
        if (!position) return;
        total++;
        const answer = userAnswers.find(
          (a) => a.questionId === question.id
        );
        if (answer && answer.optionId === position.stance) {
          agreements++;
        }
      });

      matches.push({
        party: party.id,
        percentage: total > 0 ? (agreements / total) * 100 : 0,
        agreements,
        total,
        color: party.color,
      });
    });

    return matches.sort((a, b) => b.percentage - a.percentage);
  };

  const matches = calculateMatches();

  const getStanceIcon = (stance: Stance) => {
    switch (stance) {
      case "a_favor":
        return <CheckCircle className="h-3.5 w-3.5 text-green-500" aria-hidden="true" />;
      case "en_contra":
        return <X className="h-3.5 w-3.5 text-red-500" aria-hidden="true" />;
      case "parcial":
        return <Minus className="h-3.5 w-3.5 text-yellow-600" aria-hidden="true" />;
      case "abstencion":
        return <CircleSlash className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />;
    }
  };

  const getStanceText = (stance: Stance) => t(`pos.${stance}`);

  const cellState = (
    partyId: string,
    questionIndex: number
  ): { state: CellState; label: string } => {
    const question = questions[questionIndex];
    const position = question.positions.find((p) => p.party === partyId);
    const answer = userAnswers.find((a) => a.questionId === question.id);
    if (!position || !answer) {
      return { state: "none", label: t("results.noPosition") };
    }
    const stanceText = getStanceText(position.stance);
    const label = `${loc(question.title)} — ${stanceText}`;
    if (position.stance === "abstencion") {
      return { state: "abst", label };
    }
    return {
      state: answer.optionId === position.stance ? "match" : "diff",
      label,
    };
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 narrow:px-2 py-6">
        {/* Header */}
        <header className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {t("results.title")}
          </h1>
          <p className="text-sm text-gray-500">{t("results.lead")}</p>
        </header>

        {/* Scoreboard: els 11 partits + matriu de coherència en una sola vista */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 short:p-3 mb-8 overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-0.5 text-sm">
            <thead>
              <tr className="text-[11px] text-gray-500">
                <th className="text-left font-medium pb-2 align-bottom">
                  #
                </th>
                <th className="text-left font-medium pb-2 align-bottom">
                  {t("results.colParty")}
                </th>
                <th className="hidden sm:table-cell w-24 pb-2 align-bottom" />
                <th className="text-right font-medium pb-2 pr-1 sm:pr-3 narrow:text-[10px] align-bottom">
                  {t("results.affinity")}
                </th>
                <th
                  colSpan={12}
                  className="text-left font-medium pb-2 pl-1 align-bottom"
                >
                  {t("results.coherence")}
                </th>
              </tr>
              <tr className="text-[10px] text-gray-400">
                <th colSpan={3} className="pb-1 sm:hidden" />
                <th colSpan={4} className="hidden sm:table-cell pb-1" />
                {questions.map((question, index) => (
                  <th
                    key={question.id}
                    className="pb-1 px-0 sm:px-0.5 text-center narrow:text-[9px] font-medium"
                  >
                    <a
                      href={`#q-${question.id}`}
                      title={loc(question.title)}
                      className="hover:text-blue-600"
                    >
                      {index + 1}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => {
                const party = partyById[match.party];
                return (
                  <tr
                    key={match.party}
                    className={
                      index === 0
                        ? "bg-blue-50"
                        : index % 2 === 0
                          ? "bg-gray-50"
                          : ""
                    }
                  >
                    <td className="pl-1 narrow:pl-0 text-xs font-semibold text-gray-400 tabular-nums align-middle">
                      {index + 1}
                    </td>
                    <td className="py-1.5 pr-1 sm:pr-2 align-middle">
                      <div
                        className="flex items-center gap-2 min-w-0"
                        title={loc(party.full)}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-sm shrink-0"
                          style={{ backgroundColor: match.color }}
                        />
                        <span className="font-semibold text-gray-900 line-clamp-1 text-ellipsis min-w-0 short:text-xs">
                          {loc(party.short)}
                        </span>
                        {party.scope && (
                          <span className="hidden lg:inline text-[10px] leading-none whitespace-nowrap px-1.5 py-1 rounded-full bg-white border border-gray-200 text-gray-500">
                            {loc(party.scope)}
                          </span>
                        )}
                      </div>
                      {/* Barra de progrés (només mòbil; a sm+ hi ha la columna dedicada) */}
                      <div className="mt-1.5 sm:hidden h-1 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-1 rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: grow ? `${match.percentage}%` : "0%",
                            backgroundColor: match.color,
                            transitionDelay: `${index * 60}ms`,
                          }}
                        />
                      </div>
                    </td>
                    <td className="hidden sm:table-cell w-24 pr-3 align-middle">
                      <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-1.5 rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: grow ? `${match.percentage}%` : "0%",
                            backgroundColor: match.color,
                            transitionDelay: `${index * 60}ms`,
                          }}
                        />
                      </div>
                    </td>
                    <td className="text-right pr-1 sm:pr-3 whitespace-nowrap align-middle tabular-nums">
                      <div className="font-semibold text-gray-600 leading-tight text-[11px] sm:text-sm sm:font-bold sm:text-gray-900">
                        {Math.round(match.percentage)}%
                      </div>
                      <div
                        className="text-[10px] text-gray-500 leading-tight"
                        title={t("results.matches", {
                          a: match.agreements,
                          b: match.total,
                        })}
                      >
                        {match.agreements}/{match.total}
                      </div>
                    </td>
                    {questions.map((_, questionIndex) => {
                      const { state, label } = cellState(
                        match.party,
                        questionIndex
                      );
                      return (
                        <td
                          key={questions[questionIndex].id}
                          className="px-0 sm:px-0.5 py-1 align-middle"
                        >
                          <div
                            title={label}
                            className={`mx-auto w-3.5 h-3.5 sm:w-5 sm:h-5 short:border short:border-white rounded flex items-center justify-center ${
                              state === "match"
                                ? ""
                                : state === "diff"
                                  ? "bg-red-50"
                                  : state === "abst"
                                    ? "bg-gray-100"
                                    : "bg-gray-50"
                            }`}
                            style={
                              state === "match"
                                ? { backgroundColor: match.color }
                                : undefined
                            }
                          >
                            {state === "match" && (
                              <CheckCircle
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
                                aria-hidden="true"
                              />
                            )}
                            {state === "diff" && (
                              <X
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400"
                                aria-hidden="true"
                              />
                            )}
                            {state === "abst" && (
                              <CircleSlash
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400"
                                aria-hidden="true"
                              />
                            )}
                            <span className="sr-only">{label}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Llegenda de la matriu */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-green-500" aria-hidden="true" />
              {t("results.legendMatch")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <X className="h-3.5 w-3.5 text-red-400" aria-hidden="true" />
              {t("results.legendDiff")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CircleSlash className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
              {t("results.legendAbst")}
            </span>
          </div>

          {/* Ablast (scope) en pantalles petites: els xips de la taula no hi caben */}
          {parties.some((p) => p.scope) && (
            <p className="mt-2 text-xs text-gray-500 lg:hidden">
              {parties
                .filter((p) => p.scope)
                .map((p, idx) => (
                  <span key={p.id}>
                    {idx > 0 && <span className="text-gray-300"> · </span>}
                    <span className="font-medium text-gray-600">
                      {loc(p.short)}:
                    </span>{" "}
                    {loc(p.scope)}
                  </span>
                ))}
            </p>
          )}

          {/* Notes dels partits */}
          {parties.filter((p) => p.note).length > 0 && (
            <p className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
              {parties
                .filter((p) => p.note)
                .map((p, idx) => (
                  <span key={p.id}>
                    {idx > 0 && <span className="text-gray-300"> · </span>}
                    <span className="font-medium text-gray-600">
                      {loc(p.short)}:
                    </span>{" "}
                    {loc(p.note)}
                  </span>
                ))}
            </p>
          )}
        </div>

        {/* Bloc d'intenció: just a sota dels resultats principals */}
        {intentionOpen && onIntentionDone && (
          <IntentionBlock onDone={onIntentionDone} />
        )}

        {/* Detailed Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            {t("results.breakdown")}
          </h2>

          <div className="space-y-6">
            {questions.map((question, questionIndex) => {
              const userAnswer = userAnswers.find(
                (a) => a.questionId === question.id
              );
              if (!userAnswer) return null;
              const option = question.options.find(
                (o) => o.id === userAnswer.optionId
              );
              const noted = question.positions.filter((p) => p.note);

              return (
                <div
                  key={question.id}
                  id={`q-${question.id}`}
                  className="scroll-mt-4 border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 mb-3">
                    <span className="text-xs font-bold text-blue-600 tabular-nums">
                      {questionIndex + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {loc(question.title)}
                    </h3>
                    <span className="text-xs bg-blue-50 text-blue-700 rounded-md px-2 py-1">
                      <span className="font-semibold">
                        {t("results.yourAnswer")}:
                      </span>{" "}
                      {option ? loc(option.text) : userAnswer.optionId}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {parties.map((party) => {
                      const position = question.positions.find(
                        (p) => p.party === party.id
                      );
                      return (
                        <span
                          key={party.id}
                          title={`${loc(party.short)}: ${
                            position
                              ? getStanceText(position.stance)
                              : t("results.noPosition")
                          }`}
                          className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 pl-1.5 pr-2 py-1 text-xs text-gray-600"
                        >
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: party.color }}
                          />
                          <span className="font-medium text-gray-800">
                            {loc(party.short)}
                          </span>
                          {position && getStanceIcon(position.stance)}
                          <span>
                            {position
                              ? getStanceText(position.stance)
                              : t("results.noPosition")}
                          </span>
                        </span>
                      );
                    })}
                  </div>

                  {noted.length > 0 && (
                    <p className="text-xs text-gray-500 mb-2">
                      {noted.map((p, idx) => (
                        <span key={p.party}>
                          {idx > 0 && <span className="text-gray-300"> · </span>}
                          <span className="font-medium text-gray-600">
                            {loc(partyById[p.party].short)}:
                          </span>{" "}
                          {p.note ? loc(p.note) : ""}
                        </span>
                      ))}
                    </p>
                  )}

                  <div className="flex flex-col gap-1">
                    {question.evidence.map((evidence) => (
                      <a
                        key={evidence.url}
                        href={evidence.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 text-sm text-gray-500 hover:text-blue-600 underline underline-offset-2"
                      >
                        <ExternalLink
                          className="h-3.5 w-3.5 mt-1 shrink-0"
                          aria-hidden="true"
                        />
                        <span>
                          {evidence.title} ({evidence.date})
                        </span>
                      </a>
                    ))}
                  </div>

                  <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1">
                      {t("results.justification")}
                    </p>
                    <p className="text-sm text-amber-900">
                      {loc(question.justification)}
                    </p>
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
            {t("results.restart")}
          </button>
        </div>

        {/* Compartir */}
        <ShareCard matches={matches} />

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-1">
            {t("results.warnTitle")}
          </h3>
          <p className="text-yellow-700 text-sm">{t("results.warn")}</p>
        </div>
      </div>
    </div>
  );
};

export default Results;

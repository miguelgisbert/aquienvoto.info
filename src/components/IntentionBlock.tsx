import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { parties } from "../data/parties";
import { useI18n } from "../i18n";

interface IntentionBlockProps {
  onDone: (before: string | null, after: string | null) => void;
}

type BlockPhase = "form" | "thanks" | "hidden";

const IntentionBlock: React.FC<IntentionBlockProps> = ({ onDone }) => {
  const [phase, setPhase] = useState<BlockPhase>("form");
  const [intentBefore, setIntentBefore] = useState("");
  const [intentAfter, setIntentAfter] = useState("");
  const { t, loc } = useI18n();

  const handleSubmit = () => {
    onDone(intentBefore || null, intentAfter || null);
    setPhase("thanks");
  };

  const handleSkip = () => {
    onDone(null, null);
    setPhase("hidden");
  };

  if (phase === "hidden") return null;

  return (
    <section
      id="intention"
      data-testid="intention-block"
      aria-label={t("test.intentTitle")}
      className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {t("test.intentTitle")}
      </h2>
      <p className="text-sm text-gray-600 mb-5 leading-snug">
        {t("test.intentLead")}
      </p>

      {phase === "form" ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="block text-sm font-semibold text-gray-800 mb-1.5">
                {t("test.intentBefore")}
              </span>
              <select
                value={intentBefore}
                onChange={(e) => setIntentBefore(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-[15px] bg-white text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option value="">{t("test.intentPlaceholder")}</option>
                <option value="__none__">{t("test.intentNone")}</option>
                <option value="__abstain__">{t("test.intentAbstain")}</option>
                {parties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {loc(p.short)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-gray-800 mb-1.5">
                {t("test.intentAfter")}
              </span>
              <select
                value={intentAfter}
                onChange={(e) => setIntentAfter(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-[15px] bg-white text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option value="">{t("test.intentPlaceholder")}</option>
                <option value="__none__">{t("test.intentNone")}</option>
                <option value="__abstain__">{t("test.intentAbstain")}</option>
                {parties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {loc(p.short)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={handleSkip}
              data-testid="intention-skip"
              className="px-5 py-2.5 text-gray-600 font-medium rounded-lg transition-colors hover:text-gray-900 hover:bg-gray-100"
            >
              {t("test.intentSkip")}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              data-testid="intention-save"
              className="px-5 sm:px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg transition-colors hover:bg-blue-700 shadow-lg hover:shadow-xl"
            >
              {t("test.intentSave")}
            </button>
          </div>
        </>
      ) : (
        <p
          data-testid="intention-thanks"
          className="flex items-center gap-2 text-sm font-semibold text-green-700"
        >
          <CheckCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {t("test.intentThanks")}
        </p>
      )}
    </section>
  );
};

export default IntentionBlock;

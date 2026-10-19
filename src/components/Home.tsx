import React from "react";
import { ArrowRight, CheckCircle, ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { useAnalytics } from "../hooks/useAnalytics";
import { useI18n } from "../i18n";

interface HomeProps {
  onStartTest: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartTest }) => {
  const { track } = useAnalytics();
  const { t } = useI18n();

  const handleStartTest = () => {
    track("test_started", {
      source: "home_page",
      label: "Start Test Button",
    });
    onStartTest();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
            {t("home.badge")}
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t("home.title1")}{" "}
            <span className="text-blue-600">{t("home.title2")}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            {t("home.lead")}
          </p>
          <p className="text-sm font-medium text-gray-500 mb-8">
            {t("home.meta")}
          </p>
          <button
            onClick={handleStartTest}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            {t("home.cta")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 max-w-2xl mx-auto">
            <ShieldCheck className="h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
            {t("home.trust")}
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">{t("home.f1t")}</h3>
            <p className="text-gray-600">{t("home.f1d")}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <FileText className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">{t("home.f2t")}</h3>
            <p className="text-gray-600">{t("home.f2d")}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <ExternalLink className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">{t("home.f3t")}</h3>
            <p className="text-gray-600">{t("home.f3d")}</p>
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            {t("home.sources")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <ExternalLink className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold">{t("home.src1t")}</h4>
                <p className="text-gray-600 text-sm">{t("home.src1d")}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ExternalLink className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold">{t("home.src2t")}</h4>
                <p className="text-gray-600 text-sm">{t("home.src2d")}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ExternalLink className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold">{t("home.src3t")}</h4>
                <p className="text-gray-600 text-sm">{t("home.src3d")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { Vote, Home, BarChart3 } from "lucide-react";
import { useI18n } from "../i18n";
import type { Language } from "../types";

interface HeaderProps {
  currentView: string;
  onNavigate: (view: "home" | "test" | "results") => void;
}

const LANGS: { code: Language; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "ca", label: "CA" },
  { code: "gl", label: "GL" },
  { code: "eu", label: "EU" },
];

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { t, lang, setLang } = useI18n();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-xs border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-1 min-w-0">
            <button
              onClick={() => onNavigate("home")}
              className="focus:outline-none"
              aria-label="aQuiénVoto.info"
            >
              <Vote className="h-8 w-8 text-blue-600" />
            </button>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">
                <button
                  onClick={() => onNavigate("home")}
                  className="cursor-pointer transition-colors hover:text-blue-600"
                  aria-label="aQuiénVoto.info"
                >
                  aQuiénVoto.info
                </button>
              </h1>
              <p className="text-xs text-gray-500">{t("nav.tagline")}</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate("home")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === "home"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>{t("nav.home")}</span>
            </button>
            <button
              onClick={() => onNavigate("test")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === "test"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <Vote className="h-4 w-4" />
              <span>{t("nav.test")}</span>
            </button>
            <button
              onClick={() => onNavigate("results")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === "results"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>{t("nav.results")}</span>
            </button>
          </nav>
          <div className="flex items-center md:ml-6 border border-gray-200 rounded-md overflow-hidden">
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`px-2 py-1 text-xs font-semibold transition-colors ${
                  lang === code
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

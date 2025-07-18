import React from "react";
import { Vote, Home, BarChart3 } from "lucide-react";

interface HeaderProps {
  currentView: string;
  onNavigate: (view: "home" | "test" | "results") => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-1 min-w-0">
            <button
              onClick={() => onNavigate("home")}
              className="focus:outline-none"
              aria-label="Ir al inicio"
            >
              <Vote className="h-8 w-8 text-blue-600" />
            </button>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">
                aQuiénVoto.info
              </h1>
              <p className="text-xs text-gray-500">Tu orientador electoral</p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="ml-4 mt-1 w-fit bg-yellow-100 text-yellow-800 text-xs font-semibold rounded px-2 py-1 border border-yellow-300">
                Página en pruebas - puede tener datos erróneos
              </div>
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
              <span>Inicio</span>
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
              <span>Test</span>
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
              <span>Resultados</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

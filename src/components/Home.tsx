import React from 'react';
import { ArrowRight, CheckCircle, ExternalLink, FileText } from 'lucide-react';

interface HomeProps {
  onStartTest: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartTest }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Descubre tu <span className="text-blue-600">Orientación Política</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Conoce qué partidos políticos se alinean mejor con tus ideas basándose en 
            <strong> votaciones reales</strong> del Congreso de los Diputados de España.
          </p>
          <button
            onClick={onStartTest}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Comenzar Test
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Datos Reales</h3>
            <p className="text-gray-600">
              Basado en votaciones verificables del Congreso de los Diputados.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <FileText className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Transparente</h3>
            <p className="text-gray-600">
              Cada resultado incluye enlaces a las fuentes oficiales.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <ExternalLink className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Imparcial</h3>
            <p className="text-gray-600">
              No revelamos las posiciones partidarias hasta el final.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">¿Cómo Funciona?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">1</div>
              <h4 className="font-semibold mb-2">Respondes</h4>
              <p className="text-gray-600 text-sm">Contestas preguntas sobre temas importantes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">2</div>
              <h4 className="font-semibold mb-2">Comparamos</h4>
              <p className="text-gray-600 text-sm">Analizamos tus respuestas con votos reales</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">3</div>
              <h4 className="font-semibold mb-2">Calculamos</h4>
              <p className="text-gray-600 text-sm">Determinamos tu afinidad con cada partido</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">4</div>
              <h4 className="font-semibold mb-2">Mostramos</h4>
              <p className="text-gray-600 text-sm">Recibes resultados con fuentes oficiales</p>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Fuentes de Datos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <ExternalLink className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold">Congreso de los Diputados</h4>
                <p className="text-gray-600 text-sm">Portal oficial de votaciones y decisiones parlamentarias</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ExternalLink className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold">Boletín Oficial del Estado</h4>
                <p className="text-gray-600 text-sm">Publicaciones oficiales y legislación aprobada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from "react";
import { BarChart3, Users, TrendingUp } from "lucide-react";
import { useResponseStorage } from "../hooks/useAnalytics";

const AdminStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalResponses: 0,
    todayResponses: 0,
    popularAnswers: {} as Record<string, number>,
    responsesByDay: [] as any[],
  });

  const { getStoredResponses } = useResponseStorage();

  useEffect(() => {
    const responses = getStoredResponses();
    const today = new Date().toDateString();

    // Calcular estadístiques
    const todayResponses = responses.filter(
      (r: any) => new Date(r.timestamp).toDateString() === today
    ).length;

    // Contar respostes populars
    const answerCounts: Record<string, number> = {};
    responses.forEach((response: any) => {
      response.responses?.forEach((answer: any) => {
        const key = `${answer.questionId}-${answer.optionId}`;
        answerCounts[key] = (answerCounts[key] || 0) + 1;
      });
    });

    setStats({
      totalResponses: responses.length,
      todayResponses,
      popularAnswers: answerCounts,
      responsesByDay: responses,
    });
  }, []);

  // Només mostrar si l'URL conté "?admin=true"
  if (!window.location.search.includes("admin=true")) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm">
      <div className="flex items-center mb-3">
        <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="font-semibold text-gray-900">Estadístiques</h3>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center">
          <Users className="h-4 w-4 text-green-600 mr-2" />
          <span>Total respostes: {stats.totalResponses}</span>
        </div>

        <div className="flex items-center">
          <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
          <span>Avui: {stats.todayResponses}</span>
        </div>

        <details className="mt-3">
          <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
            Veure detalls
          </summary>
          <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
            <p>Respostes més populars:</p>
            {Object.entries(stats.popularAnswers)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([key, count]) => (
                <div key={key} className="flex justify-between">
                  <span className="truncate">{key.split("-")[1]}</span>
                  <span>{count}</span>
                </div>
              ))}
          </div>
        </details>
      </div>
    </div>
  );
};

export default AdminStats;

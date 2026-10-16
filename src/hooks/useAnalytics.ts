// Hook per gestionar analytics i emmagatzematge de dades

import { insertResponse, supabaseEnabled } from "../lib/supabase";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    plausible: (
      event: string,
      options?: { props?: Record<string, unknown> }
    ) => void;
  }
}

export interface StoredAnswer {
  questionId: string;
  optionId: string;
}

export interface StoredResponse {
  responses: StoredAnswer[];
  timestamp: string;
  userAgent: string;
  [key: string]: unknown;
}

type TrackData = Record<string, unknown> & { label?: string; value?: number };

export interface SaveResult {
  success: boolean;
  remote: boolean;
  id: string | null;
  data?: StoredResponse;
  error?: unknown;
}

export const useAnalytics = () => {
  const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackPlausible = (eventName: string, props?: Record<string, unknown>) => {
    if (typeof window !== "undefined" && window.plausible) {
      window.plausible(eventName, { props });
    }
  };

  const track = (eventName: string, data?: TrackData) => {
    trackEvent(eventName, "user_interaction", data?.label, data?.value);
    trackPlausible(eventName, data);
  };

  return {
    track,
    trackEvent,
    trackPlausible,
  };
};

// Llig les respostes guardades en localStorage (còpia local de seguretat)
export const getStoredResponses = (): StoredResponse[] => {
  try {
    return JSON.parse(
      localStorage.getItem("aquienvoto_responses") || "[]"
    ) as StoredResponse[];
  } catch {
    return [];
  }
};

// Actualitza les intencions de la còpia local de la resposta guardada
// (es busca pel camp test_completed_at, que es fixa en acabar el test)
export const updateStoredIntents = (
  testCompletedAt: string,
  before: string | null,
  after: string | null
): void => {
  try {
    const rows = getStoredResponses();
    let touched = false;
    for (const row of rows) {
      if (row.test_completed_at === testCompletedAt) {
        row.intent_before = before;
        row.intent_after = after;
        touched = true;
      }
    }
    if (touched) {
      localStorage.setItem("aquienvoto_responses", JSON.stringify(rows));
    }
  } catch {
    /* localStorage no disponible */
  }
};

// Hook per emmagatzemar respostes: Supabase + còpia local
export const useResponseStorage = () => {
  const saveResponse = async (
    responses: StoredAnswer[],
    userMetadata?: Record<string, unknown>
  ): Promise<SaveResult> => {
    try {
      const responseData: StoredResponse = {
        responses,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ...userMetadata,
      };

      // Còpia local (panell admin offline / fallback)
      const existingData = getStoredResponses();
      existingData.push(responseData);
      localStorage.setItem(
        "aquienvoto_responses",
        JSON.stringify(existingData)
      );

      // Enviament a Supabase (si està configurat)
      let remote = false;
      let id: string | null = null;
      if (supabaseEnabled) {
        id = await insertResponse({
          lang: String(userMetadata?.lang ?? "es"),
          answers: responses,
          user_agent: navigator.userAgent,
          completed_at:
            (userMetadata?.test_completed_at as string | undefined) ?? null,
          duration_ms: (userMetadata?.duration_ms as number | undefined) ?? null,
          intent_before:
            (userMetadata?.intent_before as string | null | undefined) ?? null,
          intent_after:
            (userMetadata?.intent_after as string | null | undefined) ?? null,
        });
        remote = id !== null;
      }

      return { success: true, remote, id, data: responseData };
    } catch (error) {
      console.error("Error guardant respostes:", error);
      return { success: false, remote: false, id: null, error };
    }
  };

  return {
    saveResponse,
    getStoredResponses,
  };
};

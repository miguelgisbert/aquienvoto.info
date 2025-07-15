// Hook per gestionar analytics i emmagatzematge de dades

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    plausible: (...args: any[]) => void;
  }
}

export const useAnalytics = () => {
  // Funció per enviar events a Google Analytics
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

  // Funció per enviar events a Plausible
  const trackPlausible = (eventName: string, props?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.plausible) {
      window.plausible(eventName, { props });
    }
  };

  // Funció combinada per enviar a ambdós
  const track = (eventName: string, data?: Record<string, any>) => {
    trackEvent(eventName, "user_interaction", data?.label, data?.value);
    trackPlausible(eventName, data);
  };

  return {
    track,
    trackEvent,
    trackPlausible,
  };
};

// Hook per emmagatzemar respostes dels usuaris
export const useResponseStorage = () => {
  const saveResponse = async (responses: any[], userMetadata?: any) => {
    try {
      // Opció 1: LocalStorage (només client)
      const responseData = {
        responses,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ...userMetadata,
      };

      // Guardar localment
      const existingData = JSON.parse(
        localStorage.getItem("aquienvoto_responses") || "[]"
      );
      existingData.push(responseData);
      localStorage.setItem(
        "aquienvoto_responses",
        JSON.stringify(existingData)
      );

      // Opció 2: Enviar a un servei extern (Supabase, Firebase, etc.)
      // await sendToExternalService(responseData);

      console.log("Respostes guardades:", responseData);
      return { success: true, data: responseData };
    } catch (error) {
      console.error("Error guardant respostes:", error);
      return { success: false, error };
    }
  };

  const getStoredResponses = () => {
    try {
      return JSON.parse(localStorage.getItem("aquienvoto_responses") || "[]");
    } catch {
      return [];
    }
  };

  return {
    saveResponse,
    getStoredResponses,
  };
};

// Funció per enviar dades a Supabase (configurar després)
export const setupSupabaseLogging = () => {
  // Configuració de Supabase per emmagatzemar respostes
  // const supabase = createClient(url, key);

  const logToSupabase = async (data: any) => {
    // const { error } = await supabase
    //   .from('user_responses')
    //   .insert([data]);
    // return !error;
    console.log("Enviaria a Supabase:", data);
    return true;
  };

  return { logToSupabase };
};

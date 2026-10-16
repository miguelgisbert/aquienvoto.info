// Client Supabase mínim via REST (sense dependències externes)

export interface ResponseRow {
  id?: string;
  created_at?: string;
  lang: string;
  answers: unknown;
  user_agent?: string | null;
  completed_at?: string | null;
  duration_ms?: number | null;
  intent_before?: string | null;
  intent_after?: string | null;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number; // segons (epoch)
  user?: { email?: string };
}

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseEnabled = Boolean(url && anonKey);

const PROD_HOSTS = ["aquienvoto.info", "www.aquienvoto.info"];
const SESSION_KEY = "aquienvoto_admin_session";

// Les dades només s'envien des de la URL de producció (mai des de localhost/dev)
export function isProductionHost(): boolean {
  if (typeof window === "undefined") return false;
  return PROD_HOSTS.includes(window.location.hostname);
}

function headers(accessToken?: string): Record<string, string> {
  return {
    "Content-Type": "application/json",
    apikey: anonKey as string,
    Authorization: `Bearer ${accessToken ?? (anonKey as string)}`,
  };
}

export async function insertResponse(row: ResponseRow): Promise<string | null> {
  if (!supabaseEnabled) return null;
  if (!isProductionHost()) {
    console.info("[supabase] inserció desactivada: no ets a la URL de producció");
    return null;
  }
  try {
    const res = await fetch(`${url}/rest/v1/responses`, {
      method: "POST",
      headers: { ...headers(), Prefer: "return=representation" },
      body: JSON.stringify(row),
    });
    if (!res.ok) return null;
    const rows = (await res.json()) as ResponseRow[];
    return rows?.[0]?.id ?? null;
  } catch (error) {
    console.error("Error guardant a Supabase:", error);
    return null;
  }
}

// Actualitza les intencions d'una fila ja inserida (quan l'usuari contesta
// el bloc d'intenció després de veure els resultats)
export async function updateResponseIntents(
  id: string,
  before: string | null,
  after: string | null
): Promise<boolean> {
  if (!supabaseEnabled) return false;
  if (!isProductionHost()) return false;
  try {
    const res = await fetch(
      `${url}/rest/v1/responses?id=eq.${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: { ...headers(), Prefer: "return=minimal" },
        body: JSON.stringify({ intent_before: before, intent_after: after }),
      }
    );
    return res.ok;
  } catch (error) {
    console.error("Error actualitzant intencions a Supabase:", error);
    return false;
  }
}

export async function fetchResponses(
  limit = 2000,
  accessToken?: string
): Promise<ResponseRow[]> {
  if (!supabaseEnabled) return [];
  try {
    const res = await fetch(
      `${url}/rest/v1/responses?select=*&order=created_at.desc&limit=${limit}`,
      { headers: headers(accessToken) }
    );
    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    return (await res.json()) as ResponseRow[];
  } catch (error) {
    console.error("Error llegint de Supabase:", error);
    return [];
  }
}

// --- Autenticació (GoTrue via REST, per al panell d'admin) ---

function sessionExpiry(data: Record<string, unknown>): number | undefined {
  if (typeof data.expires_at === "number") return data.expires_at;
  if (typeof data.expires_in === "number")
    return Math.floor(Date.now() / 1000) + (data.expires_in as number);
  return undefined;
}

function normalizeSession(data: Record<string, unknown>): AuthSession {
  return {
    access_token: String(data.access_token ?? ""),
    refresh_token: String(data.refresh_token ?? ""),
    expires_at: sessionExpiry(data),
    user: (data.user as AuthSession["user"]) ?? undefined,
  };
}

function authErrorDetail(json: Record<string, unknown>): string {
  return String(json.error_description ?? json.msg ?? json.error ?? "Error");
}

export async function signIn(
  email: string,
  password: string
): Promise<AuthSession> {
  if (!supabaseEnabled) throw new Error("Supabase no està configurat");
  const res = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) throw new Error(authErrorDetail(json));
  const session = normalizeSession(json);
  storeSession(session);
  return session;
}

export async function refreshSession(
  refreshToken: string
): Promise<AuthSession | null> {
  if (!supabaseEnabled) return null;
  try {
    const res = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as Record<string, unknown>;
    const session = normalizeSession(json);
    storeSession(session);
    return session;
  } catch {
    return null;
  }
}

export async function signOut(accessToken: string): Promise<void> {
  storeSession(null);
  if (!supabaseEnabled) return;
  try {
    await fetch(`${url}/auth/v1/logout`, {
      method: "POST",
      headers: headers(accessToken),
    });
  } catch {
    /* ja ens n'anem */
  }
}

export function getStoredSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as AuthSession;
    return s.access_token ? s : null;
  } catch {
    return null;
  }
}

export function storeSession(session: AuthSession | null): void {
  try {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* localStorage no disponible */
  }
}

export function isSessionExpired(s: AuthSession, skewSeconds = 30): boolean {
  if (!s.expires_at) return false;
  return Date.now() / 1000 + skewSeconds >= s.expires_at;
}

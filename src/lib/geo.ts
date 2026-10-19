// Geolocalització aproximada de la resposta (sense cap permís de l'usuari).
// Font: ipwho.is (CORS obert, sense clau). Només desem país/regió/ciutat;
// l'IP mai es guarda. Si la consulta falla o és lenta, es conserva la zona
// horària del navegador, que també dona una pista de ubicació.

export interface GeoInfo {
  country: string | null;
  region: string | null;
  city: string | null;
  tz: string | null;
}

const CACHE_KEY = "aquienvoto_geo";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 3000;

let inflight: Promise<GeoInfo> | null = null;

function browserTz(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
}

function tzOnly(): GeoInfo {
  return { country: null, region: null, city: null, tz: browserTz() };
}

function readCache(): GeoInfo | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GeoInfo & { at?: number };
    if (!parsed.at || Date.now() - parsed.at > CACHE_TTL_MS) return null;
    if (!parsed.country && !parsed.city && !parsed.region) return null;
    return {
      country: parsed.country ?? null,
      region: parsed.region ?? null,
      city: parsed.city ?? null,
      tz: parsed.tz ?? browserTz(),
    };
  } catch {
    return null;
  }
}

function writeCache(info: GeoInfo): void {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ...info, at: Date.now() })
    );
  } catch {
    /* sessionStorage no disponible */
  }
}

export function getGeoInfo(): Promise<GeoInfo> {
  const cached = readCache();
  if (cached) return Promise.resolve(cached);
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), FETCH_TIMEOUT_MS);
      const res = await fetch("https://ipwho.is/", { signal: ctl.signal });
      clearTimeout(timer);
      if (!res.ok) return tzOnly();
      const data = (await res.json()) as {
        success?: boolean;
        country?: string;
        region?: string;
        city?: string;
        timezone?: { id?: string };
      };
      if (data.success === false) return tzOnly();
      const info: GeoInfo = {
        country: data.country || null,
        region: data.region || null,
        city: data.city || null,
        tz: data.timezone?.id || browserTz(),
      };
      if (info.country || info.region || info.city) writeCache(info);
      return info;
    } catch {
      return tzOnly();
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

// Inicia la consulta anticipadament (al començar el test) perquè, quan
// l'usuari acabe, la dada ja estiga en caché i el desat siga instantani.
export function prefetchGeo(): void {
  void getGeoInfo();
}

// Domini d'entrada de la visita (null si és directa o interna).
export function entryReferrer(): string | null {
  try {
    if (!document.referrer) return null;
    const host = new URL(document.referrer).hostname.replace(/^www\./, "");
    if (!host || host === window.location.hostname.replace(/^www\./, "")) {
      return null;
    }
    return host;
  } catch {
    return null;
  }
}

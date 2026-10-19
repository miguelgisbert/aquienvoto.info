import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart3,
  Users,
  TrendingUp,
  CheckCircle,
  RefreshCw,
  LogOut,
  Lock,
  X,
  Globe,
  Smartphone,
  Monitor,
  Link2,
} from "lucide-react";
import { getStoredResponses } from "../hooks/useAnalytics";
import {
  fetchResponses,
  supabaseEnabled,
  ResponseRow,
  signIn,
  signOut,
  refreshSession,
  getStoredSession,
  isSessionExpired,
  isProductionHost,
  AuthSession,
} from "../lib/supabase";
import { questions } from "../data/questions";
import { parties, partyById } from "../data/parties";
import { useI18n } from "../i18n";

type AnswerList = { questionId: string; optionId: string }[];

interface Prepared {
  answers: AnswerList;
  lang: string;
  createdAt?: string;
  intentBefore?: string | null;
  intentAfter?: string | null;
  durationMs?: number | null;
  userAgent?: string | null;
  country?: string | null;
  city?: string | null;
  referrer?: string | null;
}

interface Stats {
  total: number;
  today: number;
  completed: number;
  langs: Record<string, number>;
  byQuestion: Record<string, Record<string, number>>;
  avgAffinity: { party: string; pct: number; n: number }[];
  perDay: { key: string; day: number; n: number }[];
  intention: {
    before: Record<string, number>;
    after: Record<string, number>;
    answeredBefore: number;
    answeredAfter: number;
    both: number;
    changed: number;
  };
  avgDurationMs: number | null;
  countries: Record<string, number>;
  cities: Record<string, number>;
  noGeo: number;
  devices: Record<string, number>;
  referrers: Record<string, number>;
  source: "supabase" | "local";
}

const DIRECT_REFERRER = "__direct__";

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function deviceOf(ua?: string | null): "mobile" | "desktop" | null {
  if (!ua) return null;
  return /Mobi|Android|iPhone|iPod|Opera Mini|IEMobile|iPad|Tablet/i.test(ua)
    ? "mobile"
    : "desktop";
}

function fmtDuration(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}

function topEntries(rec: Record<string, number>, limit = 99): [string, number][] {
  return Object.entries(rec)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

function computeStats(prepared: Prepared[], source: Stats["source"]): Stats {
  const byQuestion: Stats["byQuestion"] = {};
  questions.forEach((q) => {
    byQuestion[q.id] = {};
    q.options.forEach((o) => (byQuestion[q.id][o.id] = 0));
  });

  const langs: Record<string, number> = {};
  const dayMap: Record<string, number> = {};
  const before: Record<string, number> = {};
  const after: Record<string, number> = {};
  const countries: Record<string, number> = {};
  const cities: Record<string, number> = {};
  const devices: Record<string, number> = {};
  const referrers: Record<string, number> = {};
  const todayKey = dayKey(new Date());
  let completed = 0;
  let today = 0;
  let answeredBefore = 0;
  let answeredAfter = 0;
  let both = 0;
  let changed = 0;
  let noGeo = 0;
  let durationSum = 0;
  let durationN = 0;

  prepared.forEach((p) => {
    langs[p.lang] = (langs[p.lang] || 0) + 1;

    if (p.createdAt) {
      const key = dayKey(new Date(p.createdAt));
      dayMap[key] = (dayMap[key] || 0) + 1;
      if (key === todayKey) today++;
    }

    if (p.answers.length >= questions.length) completed++;

    if (p.durationMs && p.durationMs > 0) {
      durationSum += p.durationMs;
      durationN++;
    }

    if (p.country) countries[p.country] = (countries[p.country] || 0) + 1;
    if (p.city) cities[p.city] = (cities[p.city] || 0) + 1;
    if (!p.country && !p.city) noGeo++;

    const dev = deviceOf(p.userAgent);
    if (dev) devices[dev] = (devices[dev] || 0) + 1;

    const ref = p.referrer || DIRECT_REFERRER;
    referrers[ref] = (referrers[ref] || 0) + 1;

    p.answers.forEach((a) => {
      if (byQuestion[a.questionId]) {
        byQuestion[a.questionId][a.optionId] =
          (byQuestion[a.questionId][a.optionId] || 0) + 1;
      }
    });

    if (p.intentBefore) {
      before[p.intentBefore] = (before[p.intentBefore] || 0) + 1;
      answeredBefore++;
    }
    if (p.intentAfter) {
      after[p.intentAfter] = (after[p.intentAfter] || 0) + 1;
      answeredAfter++;
    }
    if (p.intentBefore && p.intentAfter) {
      both++;
      if (p.intentBefore !== p.intentAfter) changed++;
    }
  });

  const perDay: Stats["perDay"] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = dayKey(d);
    perDay.push({ key, day: d.getDate(), n: dayMap[key] || 0 });
  }

  const avgAffinity = parties
    .map((party) => {
      let sum = 0;
      let n = 0;
      prepared.forEach((p) => {
        let agreements = 0;
        let total = 0;
        questions.forEach((q) => {
          const pos = q.positions.find((x) => x.party === party.id);
          if (!pos) return;
          total++;
          const a = p.answers.find((x) => x.questionId === q.id);
          if (a && a.optionId === pos.stance) agreements++;
        });
        if (total > 0) {
          sum += (agreements / total) * 100;
          n++;
        }
      });
      return { party: party.id, pct: n > 0 ? sum / n : 0, n };
    })
    .sort((a, b) => b.pct - a.pct);

  return {
    total: prepared.length,
    today,
    completed,
    langs,
    byQuestion,
    avgAffinity,
    perDay,
    intention: {
      before,
      after,
      answeredBefore,
      answeredAfter,
      both,
      changed,
    },
    avgDurationMs: durationN > 0 ? durationSum / durationN : null,
    countries,
    cities,
    noGeo,
    devices,
    referrers,
    source,
  };
}

const AdminStats: React.FC = () => {
  const { t, loc } = useI18n();
  const [visible, setVisible] = useState(
    () =>
      typeof window !== "undefined" &&
      window.location.search.includes("admin=true")
  );

  const [session, setSession] = useState<AuthSession | null>(() =>
    getStoredSession()
  );
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Valida/renova la sessió desada
  useEffect(() => {
    if (!visible) return;
    const stored = getStoredSession();
    if (!stored) return;
    if (isSessionExpired(stored)) {
      void refreshSession(stored.refresh_token).then((fresh) => {
        setSession(fresh);
        if (!fresh) setAuthError(null);
      });
    } else {
      setSession(stored);
    }
  }, [visible]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      let prepared: Prepared[] = [];
      let source: Stats["source"] = "local";

      if (supabaseEnabled && session) {
        const remote = await fetchResponses(2000, session.access_token);
        if (remote.length > 0) {
          prepared = remote.map((r: ResponseRow) => ({
            answers: (r.answers ?? []) as AnswerList,
            lang: r.lang || "es",
            createdAt: r.created_at,
            intentBefore: r.intent_before ?? null,
            intentAfter: r.intent_after ?? null,
            durationMs: r.duration_ms ?? null,
            userAgent: r.user_agent ?? null,
            country: r.country ?? null,
            city: r.city ?? null,
            referrer: r.referrer ?? null,
          }));
          source = "supabase";
        }
      }

      if (prepared.length === 0) {
        const local = getStoredResponses();
        prepared = local.map((r) => ({
          answers: r.responses ?? [],
          lang: String(r.lang ?? "es"),
          createdAt: r.timestamp,
          intentBefore: (r.intent_before as string | null | undefined) ?? null,
          intentAfter: (r.intent_after as string | null | undefined) ?? null,
          durationMs: (r.duration_ms as number | null | undefined) ?? null,
          userAgent: r.userAgent ?? null,
          country: (r.country as string | null | undefined) ?? null,
          city: (r.city as string | null | undefined) ?? null,
          referrer: (r.referrer as string | null | undefined) ?? null,
        }));
        source = "local";
      }

      setStats(computeStats(prepared, source));
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!visible) return;
    if (supabaseEnabled && !session) return;
    void load();
  }, [visible, session, load]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError(null);
    try {
      const s = await signIn(email, password);
      setSession(s);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    if (session) await signOut(session.access_token);
    setSession(null);
    setStats(null);
    setPassword("");
  };

  const closePanel = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("admin");
      window.history.replaceState(
        {},
        "",
        url.pathname + url.search + url.hash
      );
    } catch {
      /* history no disponible */
    }
    setVisible(false);
  };

  if (!visible) return null;

  const needsLogin = supabaseEnabled && !session;

  const maxCount = stats
    ? Math.max(
        1,
        ...Object.values(stats.byQuestion).flatMap((opts) =>
          Object.values(opts)
        )
      )
    : 1;
  const maxDay = stats ? Math.max(1, ...stats.perDay.map((d) => d.n)) : 1;
  const maxCountry = stats ? Math.max(1, ...Object.values(stats.countries)) : 1;
  const maxCity = stats ? Math.max(1, ...Object.values(stats.cities)) : 1;

  const intentLabel = (v: string) => {
    if (v === "__none__") return t("test.intentNone");
    if (v === "__abstain__") return t("test.intentAbstain");
    const p = partyById[v];
    return p ? loc(p.short) : v;
  };

  const referrerLabel = (v: string) =>
    v === DIRECT_REFERRER ? t("admin.direct") : v;

  const intentionRows = stats
    ? Array.from(
        new Set([
          ...Object.keys(stats.intention.before),
          ...Object.keys(stats.intention.after),
        ])
      ).sort(
        (a, b) =>
          (stats.intention.before[b] || 0) +
          (stats.intention.after[b] || 0) -
          ((stats.intention.before[a] || 0) + (stats.intention.after[a] || 0))
      )
    : [];

  const pct = (n: number, d: number) =>
    d > 0 ? Math.round((n / d) * 100) : 0;

  const kpis: {
    icon: React.ReactNode;
    value: string;
    label: string;
    sub?: string;
  }[] = stats
    ? [
        {
          icon: <Users className="h-4 w-4" aria-hidden="true" />,
          value: String(stats.total),
          label: t("admin.total"),
        },
        {
          icon: <TrendingUp className="h-4 w-4" aria-hidden="true" />,
          value: String(stats.today),
          label: t("admin.today"),
        },
        {
          icon: <CheckCircle className="h-4 w-4" aria-hidden="true" />,
          value: String(stats.completed),
          label: t("admin.completed"),
          sub: `${pct(stats.completed, stats.total)}%`,
        },
        {
          icon: <BarChart3 className="h-4 w-4" aria-hidden="true" />,
          value: stats.avgDurationMs
            ? fmtDuration(stats.avgDurationMs)
            : "—",
          label: t("admin.duration"),
        },
        {
          icon: <TrendingUp className="h-4 w-4" aria-hidden="true" />,
          value: String(stats.intention.changed),
          label: t("admin.intentChanged"),
          sub: `${pct(stats.intention.changed, stats.intention.both)}%`,
        },
        {
          icon: <Globe className="h-4 w-4" aria-hidden="true" />,
          value: String(Object.keys(stats.countries).length),
          label: t("admin.countries"),
        },
      ]
    : [];

  const Section: React.FC<{
    title: string;
    meta?: string;
    className?: string;
    children: React.ReactNode;
  }> = ({ title, meta, className, children }) => (
    <section
      className={`border border-gray-200 rounded-lg bg-white p-4 ${className ?? ""}`}
    >
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {meta && <span className="text-xs text-gray-400">{meta}</span>}
      </div>
      {children}
    </section>
  );

  const MiniBars: React.FC<{
    entries: [string, number][];
    max: number;
    label?: (k: string) => string;
  }> = ({ entries, max, label }) => (
    <div className="space-y-1.5">
      {entries.map(([k, n]) => (
        <div key={k} className="flex items-center gap-2 text-xs">
          <span
            className="w-24 shrink-0 truncate text-gray-600"
            title={label ? label(k) : k}
          >
            {label ? label(k) : k}
          </span>
          <div className="flex-1 h-2 bg-gray-100 rounded-sm overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-sm"
              style={{ width: `${(n / max) * 100}%` }}
            />
          </div>
          <span className="w-8 text-right text-gray-700 tabular-nums">{n}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <BarChart3 className="h-5 w-5 text-blue-600 shrink-0" />
            <h2 className="font-semibold text-gray-900 truncate">
              {t("admin.title")}
            </h2>
            {stats && (
              <span
                className={`hidden sm:inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full ${
                  stats.source === "supabase"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    stats.source === "supabase" ? "bg-blue-500" : "bg-amber-500"
                  }`}
                />
                {stats.source === "supabase"
                  ? t("admin.sourceSupabase")
                  : t("admin.sourceLocal")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {!needsLogin && (
              <button
                onClick={() => void load()}
                className="p-2 rounded hover:bg-gray-100"
                title={t("admin.refresh")}
              >
                <RefreshCw
                  className={`h-4 w-4 text-gray-500 ${loading ? "animate-spin" : ""}`}
                />
              </button>
            )}
            {session && (
              <button
                onClick={() => void handleLogout()}
                className="p-2 rounded hover:bg-gray-100"
                title={t("admin.logout")}
              >
                <LogOut className="h-4 w-4 text-gray-500" />
              </button>
            )}
            <button
              onClick={closePanel}
              className="p-2 rounded hover:bg-gray-100"
              title={t("admin.close")}
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      {needsLogin ? (
        <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <p className="flex items-center gap-1.5 text-xs text-gray-600">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              {t("admin.needLogin")}
            </p>
            <label className="block">
              <span className="text-xs font-medium text-gray-600">
                {t("admin.email")}
              </span>
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-gray-600">
                {t("admin.password")}
              </span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </label>
            {authError && (
              <div className="text-xs text-red-600">
                <p>{t("admin.loginError")}</p>
                <p className="text-red-500">{authError}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {loginLoading ? "…" : t("admin.login")}
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-5 pb-16">
          {!stats ? (
            <p className="text-gray-500 text-sm py-12 text-center">
              {t("admin.refresh")}
            </p>
          ) : (
            <div className="space-y-4">
              {/* Franja d'indicadors */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                {kpis.map((k) => (
                  <div key={k.label} className="bg-gray-900 px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-gray-500 mb-1.5">
                      {k.icon}
                      <span className="text-xs">{k.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-semibold text-white tabular-nums leading-none">
                        {k.value}
                      </span>
                      {k.sub && (
                        <span className="text-xs text-gray-400 tabular-nums">
                          {k.sub}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span>
                  {t("admin.langs")}:{" "}
                  {topEntries(stats.langs)
                    .map(([l, n]) => `${l} ${n}`)
                    .join(", ") || "—"}
                </span>
                <span className="hidden sm:inline text-gray-300">·</span>
                <span>
                  {isProductionHost()
                    ? t("admin.insertOn")
                    : t("admin.insertOff")}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Respostes per dia */}
                <Section
                  title={t("admin.perDay")}
                  meta={`${stats.perDay.reduce((s, d) => s + d.n, 0)}`}
                  className="lg:col-span-2 flex flex-col"
                >
                  <div className="flex items-end gap-[2px] flex-1 min-h-28">
                    {stats.perDay.map((d, i) => (
                      <div
                        key={d.key}
                        className="flex-1 min-w-0 flex flex-col items-center justify-end h-full"
                        title={`${d.key}: ${d.n}`}
                      >
                        {d.n > 0 && (
                          <span className="text-[9px] text-gray-500 leading-none mb-0.5 tabular-nums">
                            {d.n}
                          </span>
                        )}
                        <div
                          className="w-full bg-blue-600 rounded-t-sm"
                          style={{
                            height: `calc(${Math.round(
                              (d.n / maxDay) * 100
                            )}% - 26px)`,
                            minHeight: d.n > 0 ? 3 : 0,
                            opacity: d.n > 0 ? 1 : 0.12,
                          }}
                        />
                        <span className="text-[9px] text-gray-400 leading-none mt-1">
                          {i % 3 === 0 ? d.day : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Intenció de vot */}
                <Section title={t("admin.intention")}>
                  {stats.intention.answeredBefore +
                    stats.intention.answeredAfter ===
                  0 ? (
                    <p className="text-xs text-gray-400">
                      {t("admin.intentNoData")}
                    </p>
                  ) : (
                    <>
                      {stats.intention.both > 0 && (
                        <div className="mb-3">
                          <div className="flex h-3 rounded overflow-hidden bg-gray-100">
                            <div
                              className="bg-green-500"
                              style={{
                                width: `${
                                  ((stats.intention.both -
                                    stats.intention.changed) /
                                    stats.intention.both) *
                                  100
                                }%`,
                                title: `${t("admin.intentKept")}: ${stats.intention.both - stats.intention.changed}`,
                              }}
                            />
                            <div
                              className="bg-amber-500"
                              style={{
                                width: `${
                                  (stats.intention.changed /
                                    stats.intention.both) *
                                  100
                                }%`,
                                title: `${t("admin.intentChanged")}: ${stats.intention.changed}`,
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                            <span className="text-green-700">
                              {t("admin.intentKept")}:{" "}
                              {stats.intention.both - stats.intention.changed}
                            </span>
                            <span className="text-amber-700">
                              {t("admin.intentChanged")}:{" "}
                              {stats.intention.changed}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                          <span className="w-28 shrink-0" />
                          <span className="w-5 text-right">
                            {t("admin.colBefore")}
                          </span>
                          <span />
                          <span className="w-5 text-right">
                            {t("admin.colAfter")}
                          </span>
                        </div>
                        {intentionRows.map((v) => {
                          const party = partyById[v];
                          return (
                            <div
                              key={v}
                              className="flex items-center gap-1 text-xs"
                            >
                              <span className="w-28 shrink-0 truncate text-gray-700 flex items-center gap-1.5">
                                {party && (
                                  <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: party.color }}
                                  />
                                )}
                                {intentLabel(v)}
                              </span>
                              <span className="w-5 text-right text-gray-500 tabular-nums">
                                {stats.intention.before[v] || 0}
                              </span>
                              <span className="text-gray-400">→</span>
                              <span className="w-5 text-right text-gray-900 font-semibold tabular-nums">
                                {stats.intention.after[v] || 0}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </Section>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                {/* Ubicació */}
                <Section title={t("admin.geo")}>
                  {Object.keys(stats.countries).length === 0 &&
                  Object.keys(stats.cities).length === 0 ? (
                    <p className="text-xs text-gray-400">
                      {t("admin.noGeo")}
                      {stats.noGeo > 0 ? ` (${stats.noGeo})` : ""}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-2">
                          {t("admin.countries")}
                        </h4>
                        <MiniBars
                          entries={topEntries(stats.countries, 6)}
                          max={maxCountry}
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-2">
                          {t("admin.cities")}
                        </h4>
                        <MiniBars
                          entries={topEntries(stats.cities, 8)}
                          max={maxCity}
                        />
                      </div>
                    </div>
                  )}
                </Section>

                {/* Idiomes, dispositiu i referent */}
                <Section title={t("admin.langs")}>
                  <div className="space-y-4">
                    <MiniBars
                      entries={topEntries(stats.langs)}
                      max={Math.max(1, ...Object.values(stats.langs))}
                    />
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 mb-2">
                        {t("admin.device")}
                      </h4>
                      <div className="space-y-1.5">
                        {(
                          [
                            ["mobile", <Smartphone key="m" className="h-3.5 w-3.5" />],
                            ["desktop", <Monitor key="d" className="h-3.5 w-3.5" />],
                          ] as const
                        ).map(([key, icon]) => {
                          const n = stats.devices[key] || 0;
                          const totalDev = Object.values(stats.devices).reduce(
                            (s, x) => s + x,
                            0
                          );
                          return (
                            <div key={key} className="flex items-center gap-2 text-xs">
                              <span className="text-gray-500">{icon}</span>
                              <span className="w-16 text-gray-600">
                                {key === "mobile"
                                  ? t("admin.mobile")
                                  : t("admin.desktop")}
                              </span>
                              <div className="flex-1 h-2 bg-gray-100 rounded-sm overflow-hidden">
                                <div
                                  className="h-full bg-blue-600 rounded-sm"
                                  style={{
                                    width: `${
                                      totalDev > 0 ? (n / totalDev) * 100 : 0
                                    }%`,
                                  }}
                                />
                              </div>
                              <span className="w-8 text-right text-gray-700 tabular-nums">
                                {n}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-2">
                        <Link2 className="h-3.5 w-3.5" />
                        {t("admin.referrer")}
                      </h4>
                      {Object.keys(stats.referrers).length === 0 ? (
                        <p className="text-xs text-gray-400">—</p>
                      ) : (
                        <MiniBars
                          entries={topEntries(stats.referrers, 6)}
                          max={Math.max(
                            1,
                            ...Object.values(stats.referrers)
                          )}
                          label={referrerLabel}
                        />
                      )}
                    </div>
                  </div>
                </Section>
              </div>

              {/* Respostes per pregunta */}
              <Section title={t("admin.byQuestion")}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
                  {questions.map((q, i) => {
                    const qTotal = q.options.reduce(
                      (s, o) => s + (stats.byQuestion[q.id]?.[o.id] ?? 0),
                      0
                    );
                    return (
                      <div key={q.id}>
                        <p className="text-xs text-gray-600 leading-snug">
                          {i + 1}. {loc(q.title)}
                        </p>
                        <div className="space-y-1 mt-1">
                          {q.options.map((o) => {
                            const count =
                              stats.byQuestion[q.id]?.[o.id] ?? 0;
                            return (
                              <div
                                key={o.id}
                                className="flex items-center gap-1.5"
                              >
                                <span className="text-[11px] w-16 shrink-0 text-gray-500 truncate">
                                  {loc(o.text)}
                                </span>
                                <div className="flex-1 bg-gray-100 rounded-sm h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-sm"
                                    style={{
                                      width: `${(count / maxCount) * 100}%`,
                                    }}
                                  />
                                </div>
                                <span className="text-[11px] w-16 text-right text-gray-600 tabular-nums">
                                  {count} · {pct(count, qTotal)}%
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>

              {/* Afinitat mitjana */}
              <Section title={t("admin.avgAffinity")}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
                  {stats.avgAffinity.map(({ party, pct: p, n }) => {
                    const pty = parties.find((x) => x.id === party)!;
                    return (
                      <div key={party} className="flex items-center gap-2">
                        <span
                          className="text-xs w-24 shrink-0 font-semibold truncate"
                          style={{ color: pty.color }}
                        >
                          {loc(pty.short)}
                        </span>
                        <div className="flex-1 bg-gray-100 rounded-sm h-2.5 overflow-hidden">
                          <div
                            className="h-full rounded-sm"
                            style={{
                              width: `${p}%`,
                              backgroundColor: pty.color,
                            }}
                          />
                        </div>
                        <span className="text-xs w-8 text-right text-gray-700 tabular-nums">
                          {Math.round(p)}%
                        </span>
                        <span className="text-[11px] text-gray-400 w-7 text-right tabular-nums">
                          ({n})
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Section>

              {stats.total === 0 && (
                <p className="text-sm text-gray-500 text-center py-8">
                  {t("admin.empty")}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminStats;

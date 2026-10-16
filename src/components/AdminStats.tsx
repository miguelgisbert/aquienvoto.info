import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart3,
  Users,
  TrendingUp,
  CheckCircle,
  RefreshCw,
  LogOut,
  Lock,
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
  source: "supabase" | "local";
}

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
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
  const todayKey = dayKey(new Date());
  let completed = 0;
  let today = 0;
  let answeredBefore = 0;
  let answeredAfter = 0;
  let both = 0;
  let changed = 0;

  prepared.forEach((p) => {
    langs[p.lang] = (langs[p.lang] || 0) + 1;

    if (p.createdAt) {
      const key = dayKey(new Date(p.createdAt));
      dayMap[key] = (dayMap[key] || 0) + 1;
      if (key === todayKey) today++;
    }

    if (p.answers.length >= questions.length) completed++;

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
  for (let i = 13; i >= 0; i--) {
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
    source,
  };
}

const AdminStats: React.FC = () => {
  const { t, loc } = useI18n();
  const adminVisible =
    typeof window !== "undefined" &&
    window.location.search.includes("admin=true");

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
    if (!adminVisible) return;
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
  }, [adminVisible]);

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
        }));
        source = "local";
      }

      setStats(computeStats(prepared, source));
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!adminVisible) return;
    if (supabaseEnabled && !session) return;
    void load();
  }, [adminVisible, session, load]);

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

  if (!adminVisible) {
    return null;
  }

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

  const intentLabel = (v: string) => {
    if (v === "__none__") return t("test.intentNone");
    if (v === "__abstain__") return t("test.intentAbstain");
    const p = partyById[v];
    return p ? loc(p.short) : v;
  };

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

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 w-96 max-w-[calc(100vw-2rem)] z-40">
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center">
          <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="font-semibold text-gray-900">{t("admin.title")}</h3>
        </div>
        <div className="flex items-center gap-1">
          {session && (
            <button
              onClick={() => void handleLogout()}
              className="p-1 rounded hover:bg-gray-100"
              title={t("admin.logout")}
            >
              <LogOut className="h-4 w-4 text-gray-500" />
            </button>
          )}
          {!needsLogin && (
            <button
              onClick={() => void load()}
              className="p-1 rounded hover:bg-gray-100"
              title={t("admin.refresh")}
            >
              <RefreshCw
                className={`h-4 w-4 text-gray-500 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          )}
        </div>
      </div>

      {needsLogin ? (
        <form onSubmit={handleLogin} className="p-3 space-y-3 text-sm">
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
              className="mt-1 w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
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
              className="mt-1 w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
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
      ) : (
        <div className="p-3 max-h-[75vh] overflow-y-auto space-y-4 text-sm">
          {!stats || stats.total === 0 ? (
            <p className="text-gray-500">{t("admin.empty")}</p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-blue-50 rounded">
                  <div className="flex items-center text-blue-700">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-lg font-bold">{stats.total}</span>
                  </div>
                  <p className="text-xs text-blue-600">{t("admin.total")}</p>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <div className="flex items-center text-green-700">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-lg font-bold">{stats.today}</span>
                  </div>
                  <p className="text-xs text-green-600">{t("admin.today")}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <div className="flex items-center text-purple-700">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-lg font-bold">{stats.completed}</span>
                  </div>
                  <p className="text-xs text-purple-600">
                    {t("admin.completed")}
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                {t("admin.source")}:{" "}
                <strong>
                  {stats.source === "supabase"
                    ? t("admin.sourceSupabase")
                    : t("admin.sourceLocal")}
                </strong>
                {Object.keys(stats.langs).length > 0 && (
                  <>
                    {" · "}
                    {t("admin.langs")}:{" "}
                    {Object.entries(stats.langs)
                      .map(([l, n]) => `${l} ${n}`)
                      .join(" · ")}
                  </>
                )}
              </div>

              <div className="text-xs text-gray-400">
                {isProductionHost() ? t("admin.insertOn") : t("admin.insertOff")}
              </div>

              {/* Respostes per dia */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {t("admin.perDay")}
                </h4>
                <div className="flex items-end gap-[3px] h-16">
                  {stats.perDay.map((d) => (
                    <div
                      key={d.key}
                      className="flex-1 min-w-0 flex flex-col items-center justify-end h-full"
                      title={`${d.key}: ${d.n}`}
                    >
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{
                          height: `${Math.round((d.n / maxDay) * 48)}px`,
                          minHeight: d.n > 0 ? 2 : 0,
                          opacity: d.n > 0 ? 1 : 0.15,
                        }}
                      />
                      <span className="text-[8px] text-gray-400 leading-none mt-0.5">
                        {d.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intenció de vot */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {t("admin.intention")}
                </h4>
                {stats.intention.answeredBefore +
                  stats.intention.answeredAfter ===
                0 ? (
                  <p className="text-xs text-gray-400">
                    {t("admin.intentNoData")}
                  </p>
                ) : (
                  <>
                    {stats.intention.both > 0 && (
                      <div className="mb-2">
                        <div className="flex h-3 rounded overflow-hidden bg-gray-100">
                          <div
                            className="bg-green-500"
                            style={{
                              width: `${
                                ((stats.intention.both - stats.intention.changed) /
                                  stats.intention.both) *
                                100
                              }%`,
                            }}
                            title={`${t("admin.intentKept")}: ${
                              stats.intention.both - stats.intention.changed
                            }`}
                          />
                          <div
                            className="bg-amber-500"
                            style={{
                              width: `${
                                (stats.intention.changed /
                                  stats.intention.both) *
                                100
                              }%`,
                            }}
                            title={`${t("admin.intentChanged")}: ${stats.intention.changed}`}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 mt-0.5">
                          <span>
                            {t("admin.intentKept")}:{" "}
                            {stats.intention.both - stats.intention.changed}
                          </span>
                          <span>
                            {t("admin.intentChanged")}: {stats.intention.changed}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                        <span className="w-28 shrink-0" />
                        <span className="w-6 text-right">{t("admin.colBefore")}</span>
                        <span />
                        <span className="w-6 text-right">{t("admin.colAfter")}</span>
                      </div>
                      {intentionRows.map((v) => (
                        <div
                          key={v}
                          className="flex items-center gap-1 text-xs"
                        >
                          <span className="w-28 shrink-0 truncate text-gray-700">
                            {intentLabel(v)}
                          </span>
                          <span className="w-6 text-right text-gray-500 tabular-nums">
                            {stats.intention.before[v] || 0}
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="w-6 text-right text-gray-800 font-semibold tabular-nums">
                            {stats.intention.after[v] || 0}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Respostes per pregunta */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {t("admin.byQuestion")}
                </h4>
                <div className="space-y-2">
                  {questions.map((q, i) => (
                    <div key={q.id}>
                      <p className="text-xs text-gray-600 truncate">
                        {i + 1}. {loc(q.title)}
                      </p>
                      <div className="space-y-0.5 mt-0.5">
                        {q.options.map((o) => {
                          const count = stats.byQuestion[q.id]?.[o.id] ?? 0;
                          return (
                            <div key={o.id} className="flex items-center gap-1">
                              <span className="text-xs w-16 shrink-0 text-gray-500 truncate">
                                {loc(o.text)}
                              </span>
                              <div className="flex-1 bg-gray-100 rounded h-3">
                                <div
                                  className="bg-blue-500 h-3 rounded"
                                  style={{
                                    width: `${(count / maxCount) * 100}%`,
                                  }}
                                />
                              </div>
                              <span className="text-xs w-6 text-right text-gray-600">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Afinitat mitjana */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {t("admin.avgAffinity")}
                </h4>
                <div className="space-y-1">
                  {stats.avgAffinity.map(({ party, pct, n }) => {
                    const p = parties.find((x) => x.id === party)!;
                    return (
                      <div key={party} className="flex items-center gap-1">
                        <span
                          className="text-xs w-20 shrink-0 font-semibold truncate"
                          style={{ color: p.color }}
                        >
                          {loc(p.short)}
                        </span>
                        <div className="flex-1 bg-gray-100 rounded h-3">
                          <div
                            className="h-3 rounded"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: p.color,
                            }}
                          />
                        </div>
                        <span className="text-xs w-8 text-right text-gray-600">
                          {Math.round(pct)}%
                        </span>
                        <span className="text-xs text-gray-400">({n})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminStats;

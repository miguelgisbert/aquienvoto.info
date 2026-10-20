import React, { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Send,
  AtSign,
  Copy,
  Check,
  Download,
  Facebook,
  Instagram,
} from "lucide-react";
import { useI18n } from "../i18n";
import { partyById } from "../data/parties";
import { useAnalytics } from "../hooks/useAnalytics";

const BASE = "https://aquienvoto.info";

export interface ShareMatch {
  party: string;
  percentage: number;
  color: string;
}

interface ShareCardProps {
  matches: ShareMatch[];
}

const FONT =
  'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

function truncate(ctx: CanvasRenderingContext2D, text: string, maxW: number): string {
  if (ctx.measureText(text).width <= maxW) return text;
  let out = text;
  while (out.length > 1 && ctx.measureText(`${out}…`).width > maxW) {
    out = out.slice(0, -1);
  }
  return `${out}…`;
}

// Genera la targeta de resultats (1080×1080) amb el canvas del navegador
function drawCard(
  canvas: HTMLCanvasElement,
  top: (ShareMatch & { name: string })[],
  title: string,
  lead: string
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = 1080;
  const H = 1080;
  canvas.width = W;
  canvas.height = H;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  // Capçalera blava amb la marca
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(0, 0, W, 150);
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 54px ${FONT}`;
  ctx.textBaseline = "middle";
  ctx.fillText("aQuiénVoto.info", 72, 78);

  // Títol
  ctx.fillStyle = "#111827";
  ctx.font = `700 60px ${FONT}`;
  ctx.fillText(truncate(ctx, title, W - 144), 72, 240);

  ctx.fillStyle = "#6b7280";
  ctx.font = `400 34px ${FONT}`;
  ctx.fillText(truncate(ctx, lead, W - 144), 72, 310);

  // Files: top-3 partits
  const rowY = 400;
  const rowH = 170;
  top.forEach((m, i) => {
    const name = m.name;
    const y = rowY + i * rowH;

    ctx.fillStyle = m.color;
    ctx.beginPath();
    ctx.roundRect(72, y + 8, 14, 118, 7);
    ctx.fill();

    ctx.fillStyle = "#111827";
    ctx.font = `700 52px ${FONT}`;
    ctx.fillText(truncate(ctx, name, 620), 108, y + 48);

    ctx.fillStyle = m.color;
    ctx.font = `800 68px ${FONT}`;
    const pct = `${Math.round(m.percentage)}%`;
    const pctW = ctx.measureText(pct).width;
    ctx.fillText(pct, W - 72 - pctW, y + 48);

    // Barra d'afinitat
    ctx.fillStyle = "#e5e7eb";
    ctx.beginPath();
    ctx.roundRect(108, y + 96, W - 180, 22, 11);
    ctx.fill();
    const fillW = Math.max(12, ((W - 180) * m.percentage) / 100);
    ctx.fillStyle = m.color;
    ctx.beginPath();
    ctx.roundRect(108, y + 96, fillW, 22, 11);
    ctx.fill();
  });

  // Peu
  ctx.fillStyle = "#9ca3af";
  ctx.font = `600 32px ${FONT}`;
  ctx.fillText("aquienenvoto.info", 72, H - 90);
  ctx.fillStyle = "#6b7280";
  ctx.font = `400 28px ${FONT}`;
  ctx.fillText("12 votaciones reales del Congreso · Anónimo", 72, H - 44);
}

const ShareCard: React.FC<ShareCardProps> = ({ matches }) => {
  const { t, loc, lang } = useI18n();
  const { track } = useAnalytics();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [igHint, setIgHint] = useState(false);
  const [withResult, setWithResult] = useState(false);

  const top = matches.slice(0, 3);
  const topMatch = matches[0];
  const url = lang === "es" ? BASE : `${BASE}/?lang=${lang}`;
  const cardTop = top.map((m) => ({
    ...m,
    name: loc(partyById[m.party]?.short) || m.party,
  }));

  const partyName = topMatch ? loc(partyById[topMatch.party]?.short) : "";
  const pct = topMatch ? String(Math.round(topMatch.percentage)) : "";
  const shareText = withResult
    ? t("results.shareText", { party: partyName, pct, url })
    : t("results.shareLinkText", { url });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || cardTop.length === 0) return;
    drawCard(canvas, cardTop, t("results.shareTitle"), t("results.shareLead"));
  }, [lang, t, cardTop]);

  const onClick = (channel: string) => {
    track("share_click", { label: channel });
  };

  const copyLink = async () => {
    onClick("copy");
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* portapapers no disponible */
    }
  };

  const downloadImage = () => {
    onClick("download");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "aquienvoto-resultats.png";
    a.click();
  };

  // Instagram no té URL de compartició web: provem el share natiu amb la
  // imatge (mòbil) i, si no, descarreguem la targeta i mostrem un avís.
  const shareInstagram = async () => {
    onClick("instagram");
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const blob = await new Promise<Blob | null>((res) =>
        canvas.toBlob(res, "image/png")
      );
      if (blob && typeof navigator !== "undefined" && navigator.canShare) {
        const file = new File([blob], "aquienvoto-resultats.png", {
          type: "image/png",
        });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], text: shareText });
          return;
        }
      }
    } catch {
      /* cancel·lat o sense suport: fallback a descàrrega */
    }
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "aquienvoto-resultats.png";
    a.click();
    setIgHint(true);
    window.setTimeout(() => setIgHint(false), 6000);
  };

  if (top.length === 0) return null;

  return (
    <section
      aria-label={t("results.shareTitle")}
      className="mt-8 mb-8 bg-white rounded-xl shadow-lg p-4 sm:p-6"
    >
      <h2 className="text-lg font-bold text-gray-900">
        {t("results.shareTitle")}
      </h2>
      <p className="text-sm text-gray-500 mb-4">{t("results.shareLead")}</p>

      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={t("results.shareImageAlt")}
          className="w-44 shrink-0 rounded-lg border border-gray-200 shadow-sm"
        />

        <div className="flex-1 w-full space-y-4">
          <div
            role="group"
            className="inline-flex items-center gap-0.5 rounded-full bg-gray-100 p-1 text-xs font-semibold"
          >
            <button
              type="button"
              aria-pressed={!withResult}
              onClick={() => {
                setWithResult(false);
                track("share_mode", { label: "link_only" });
              }}
              className={`px-3 py-1 rounded-full transition-colors ${
                !withResult
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t("results.shareModeLink")}
            </button>
            <button
              type="button"
              aria-pressed={withResult}
              onClick={() => {
                setWithResult(true);
                track("share_mode", { label: "with_result" });
              }}
              className={`px-3 py-1 rounded-full transition-colors ${
                withResult
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t("results.shareModeResult")}
            </button>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onClick("whatsapp")}
              aria-label="WhatsApp"
              className="group flex flex-col items-center gap-1.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform group-hover:scale-105">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-700">
                WhatsApp
              </span>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onClick("facebook")}
              aria-label="Facebook"
              className="group flex flex-col items-center gap-1.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-md transition-transform group-hover:scale-105">
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-700">
                Facebook
              </span>
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
                shareText.replace(url, "").trim()
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onClick("telegram")}
              aria-label="Telegram"
              className="group flex flex-col items-center gap-1.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-md transition-transform group-hover:scale-105">
                <Send className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-700">
                Telegram
              </span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onClick("x")}
              aria-label="X"
              className="group flex flex-col items-center gap-1.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-white shadow-md transition-transform group-hover:scale-105">
                <AtSign className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-700">
                X
              </span>
            </a>
            <button
              type="button"
              onClick={() => void shareInstagram()}
              aria-label="Instagram"
              className="group flex flex-col items-center gap-1.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-md transition-transform group-hover:scale-105">
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-700">
                Instagram
              </span>
            </button>
            <button
              type="button"
              onClick={() => void copyLink()}
              aria-label={copied ? t("results.shareCopied") : t("results.shareCopy")}
              className="group flex flex-col items-center gap-1.5"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full border-2 shadow-sm transition-transform group-hover:scale-105 ${
                  copied
                    ? "border-green-200 bg-green-50 text-green-600"
                    : "border-gray-200 bg-white text-gray-500 group-hover:border-gray-300"
                }`}
              >
                {copied ? (
                  <Check className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Copy className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
              <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-700">
                {copied ? t("results.shareCopied") : t("results.shareCopy")}
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={downloadImage}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              {t("results.shareDownload")}
            </button>
            {igHint && (
              <p className="text-xs text-amber-600 leading-snug">
                {t("results.shareIgHint")}
              </p>
            )}
          </div>

          <p className="text-xs text-gray-400 leading-snug break-all">
            {shareText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShareCard;

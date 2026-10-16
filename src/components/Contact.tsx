import React, { useEffect, useRef, useState } from "react";
import { X, Send, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useI18n } from "../i18n";
import { useAnalytics } from "../hooks/useAnalytics";

// Claus públiques d'EmailJS (dissenyades per anar al client; igual que a miguelgisbert.dev)
const EMAILJS_SERVICE_ID = "service_7514287";
const EMAILJS_TEMPLATE_ID = "template_beig3l2";
const EMAILJS_PUBLIC_KEY = "hFqS9l2zhgBOtS0HT";

type Status = "idle" | "sending" | "success" | "error";

interface ContactProps {
  onClose: () => void;
}

const Contact: React.FC<ContactProps> = ({ onClose }) => {
  const { t, lang } = useI18n();
  const { track } = useAnalytics();
  const [status, setStatus] = useState<Status>("idle");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nameRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    setStatus("sending");
    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: (form.elements.namedItem("from_name") as HTMLInputElement).value,
          from_email: (form.elements.namedItem("from_email") as HTMLInputElement).value,
          message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
          page: window.location.href,
          lang,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      .then(
        () => {
          setStatus("success");
          track("contact_sent", { label: "contact_form" });
          form.reset();
        },
        () => {
          setStatus("error");
          track("contact_error", { label: "contact_form" });
        }
      );
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id="contact-title" className="text-lg font-bold text-gray-900">
              {t("contact.title")}
            </h2>
            <p className="mt-1 text-sm text-gray-600">{t("contact.lead")}</p>
          </div>
          <button
            onClick={onClose}
            aria-label={t("contact.close")}
            className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold text-gray-700">
              {t("contact.name")}
            </label>
            <input
              id="contact-name"
              name="from_name"
              ref={nameRef}
              required
              autoComplete="name"
              disabled={status === "sending" || status === "success"}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1 block text-xs font-semibold text-gray-700">
              {t("contact.email")}
            </label>
            <input
              id="contact-email"
              name="from_email"
              type="email"
              required
              autoComplete="email"
              disabled={status === "sending" || status === "success"}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1 block text-xs font-semibold text-gray-700">
              {t("contact.message")}
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              disabled={status === "sending" || status === "success"}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              status === "sending" || status === "success"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Send className="h-4 w-4" />
            {status === "sending" ? t("contact.sending") : t("contact.send")}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-3 flex items-start gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {t("contact.success")}
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {t("contact.error")}
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;

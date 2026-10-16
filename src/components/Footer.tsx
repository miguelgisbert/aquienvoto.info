import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useI18n } from "../i18n";
import Contact from "./Contact";

const Footer: React.FC = () => {
  const { t } = useI18n();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} aQuiénVoto.info
          </p>
          <div className="flex items-center gap-5 text-xs text-gray-500">
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-1.5 font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              <Mail className="h-3.5 w-3.5" />
              {t("footer.contact")}
            </button>
            <a
              href="https://miguelgisbert.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-700 transition-colors hover:text-blue-600"
              title="miguelgisbert.dev"
            >
              MGO
            </a>
          </div>
        </div>
      </footer>
      {contactOpen && <Contact onClose={() => setContactOpen(false)} />}
    </>
  );
};

export default Footer;

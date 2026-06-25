import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
} from "lucide-react";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

        {/* LEFT SIDE */}
        <div>
          <span className="inline-block px-4 py-2 rounded-full bg-[#2f6f6f]/10 text-[#2f6f6f] font-semibold text-sm mb-4">
            {t("contact.badge")}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            {t("contact.title")}
          </h1>

          <p className="text-lg text-slate-600 leading-8 mb-8">
            {t("contact.description")}
          </p>

          {/* Contact Cards */}
          <div className="space-y-4">

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#2f6f6f]/10 flex items-center justify-center">
                <Phone className="text-[#2f6f6f]" size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{t("contact.callUs")}</p>
                <p className="font-semibold text-slate-800">
                  +92 300 1234567
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#2f6f6f]/10 flex items-center justify-center">
                <Mail className="text-[#2f6f6f]" size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{t("contact.email")}</p>
                <p className="font-semibold text-slate-800 break-all">
                  customersupport@etimad.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#2f6f6f]/10 flex items-center justify-center">
                <MessageCircle className="text-[#2f6f6f]" size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{t("contact.whatsapp")}</p>
                <p className="font-semibold text-slate-800">
                  +92 300 1234567
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#2f6f6f]/10 flex items-center justify-center">
                <MapPin className="text-[#2f6f6f]" size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{t("contact.office")}</p>
                <p className="font-semibold text-slate-800">
                  Lahore, Pakistan
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">

          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {t("contact.formTitle")}
          </h2>

          <p className="text-slate-500 mb-6">
            {t("contact.formSubtitle")}
          </p>

          <form className="space-y-5">

            <input
              type="text"
              placeholder={t("contact.placeholders.name")}
              className="w-full border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2f6f6f]"
            />

            <input
              type="email"
              placeholder={t("contact.placeholders.email")}
              className="w-full border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2f6f6f]"
            />

            <input
              type="text"
              placeholder={t("contact.placeholders.subject")}
              className="w-full border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2f6f6f]"
            />

            <textarea
              rows="5"
              placeholder={t("contact.placeholders.message")}
              className="w-full border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2f6f6f]"
            />

            <button
              type="submit"
              className="w-full bg-[#2f6f6f] hover:opacity-90 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Send size={18} />
              {t("contact.send")}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
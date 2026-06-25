import heroImg from "../../assets/hero.jpg";
import { ShieldCheck, Users, CreditCard, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#2f6f6f]" />,
      title: t("about.features.secureEscrow.title"),
      description: t("about.features.secureEscrow.description"),
    },
    {
      icon: <Users className="w-8 h-8 text-[#2f6f6f]" />,
      title: t("about.features.trustedMarketplace.title"),
      description: t("about.features.trustedMarketplace.description"),
    },
    {
      icon: <CreditCard className="w-8 h-8 text-[#2f6f6f]" />,
      title: t("about.features.flexiblePayments.title"),
      description: t("about.features.flexiblePayments.description"),
    },
    {
      icon: <Globe className="w-8 h-8 text-[#2f6f6f]" />,
      title: t("about.features.nationwideReach.title"),
      description: t("about.features.nationwideReach.description"),
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-slate-50">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div>
            <span className="inline-block px-4 py-2 bg-[#2f6f6f]/10 text-[#2f6f6f] rounded-full font-semibold text-sm mb-6">
              {t("about.badge")}
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              {t("about.title1")}{" "}
              <span className="text-[#2f6f6f]">
                {t("about.titleHighlight")}
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-8 mb-6">
              {t("about.description1")}
            </p>

            <p className="text-lg text-slate-600 leading-8 mb-8">
              {t("about.description2")}
            </p>

            <div className="flex flex-wrap gap-4">

              <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border">
                <p className="text-3xl font-bold text-[#2f6f6f]">100%</p>
                <p className="text-sm text-slate-500">
                  {t("about.stats.protected")}
                </p>
              </div>

              <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border">
                <p className="text-3xl font-bold text-[#2f6f6f]">24/7</p>
                <p className="text-sm text-slate-500">
                  {t("about.stats.support")}
                </p>
              </div>

            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-[#2f6f6f]/10 rounded-3xl blur-2xl"></div>
            <img
              src={heroImg}
              alt="About Etimad"
              className="relative w-full rounded-3xl shadow-2xl object-cover"
            />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {t("about.featuresTitle")}
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto">
            {t("about.featuresSubtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-sm border hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#2f6f6f]/10 flex items-center justify-center mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2f6f6f] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">

          <h2 className="text-4xl font-bold mb-6">
            {t("about.cta.title")}
          </h2>

          <p className="text-lg text-white/90 leading-8 mb-8">
            {t("about.cta.description")}
          </p>

          <a
            href="/products"
            className="inline-block bg-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition"
          style={{ color: "#22666B" }}
         
         >
            {t("about.cta.button")}
          </a>

        </div>
      </section>

    </div>
  );
}
import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = t("howItWorks.steps", { returnObjects: true });

  return (
    <div className="max-w-6xl mx-auto py-20">

      <h1 className="text-5xl font-bold text-center mb-16">
        {t("howItWorks.title")}
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-10 rounded-3xl shadow"
          >
            <div className="text-5xl font-bold text-black mb-5">
              0{index + 1}
            </div>

            <h3 className="text-2xl font-semibold">
              {step}
            </h3>
          </div>
        ))}
      </div>

    </div>
  );
}
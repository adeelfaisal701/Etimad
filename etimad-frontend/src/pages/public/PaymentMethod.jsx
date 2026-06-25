import { useTranslation } from "react-i18next";

export default function PaymentMethod() {
  const { t } = useTranslation();

  const methods = t("payment.methods", { returnObjects: true });

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">

      <h1 className="text-4xl font-bold text-[#2f6f6f] mb-6">
        {t("payment.title")}
      </h1>

      <p className="text-gray-600 mb-10 leading-8">
        {t("payment.description")}
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        {methods.map((method, i) => (
          <div key={i} className="bg-white rounded-3xl shadow p-6">

            <h2 className="text-xl font-semibold text-[#2f6f6f] mb-3">
              {method.title}
            </h2>

            <p className="text-gray-600 leading-7">
              {method.desc}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}
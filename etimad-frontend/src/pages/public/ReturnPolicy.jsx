import { useTranslation } from "react-i18next";

export default function ReturnPolicy() {
  const { t } = useTranslation();

  const items = t("returnPolicy.items", { returnObjects: true });

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">

      <h1 className="text-4xl font-bold text-[#2f6f6f] mb-6">
        {t("returnPolicy.title")}
      </h1>

      <div className="bg-white rounded-3xl shadow p-8 space-y-6 text-gray-700 leading-8">
        {items.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>

    </div>
  );
}
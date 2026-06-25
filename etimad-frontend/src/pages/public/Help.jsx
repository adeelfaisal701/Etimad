import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Help() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">

      <h1 className="text-4xl font-bold text-[#2f6f6f] mb-6">
        {t("help.title")}
      </h1>

      <div className="bg-white rounded-3xl shadow p-8 space-y-6">

        <p className="text-gray-700 leading-8">
          {t("help.description")}
        </p>

        <div className="space-y-3 text-gray-700">

          <p>
            <strong>{t("help.emailLabel")}:</strong>{" "}
            support@etimad.pk
          </p>

          <p>
            <strong>{t("help.phoneLabel")}:</strong>{" "}
            +92 300 1234567
          </p>

          <p>
            <strong>{t("help.hoursLabel")}:</strong>{" "}
            {t("help.hours")}
          </p>

        </div>

        

      </div>
    </div>
  );
}
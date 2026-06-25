import { useTranslation } from "react-i18next";

function CategoriesBar() {
    const { t, } = useTranslation();

  const items = [t("apparels"), t("fragrance"), t("beauty"), t("accessories"), t("bags")];

  return (
    <div
      className="flex flex-wrap justify-center gap-3 sm:gap-6"
      style={{
        background: "white",
        color: "#22666B",
        padding: "15px",
        fontWeight: "bold",
      }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer text-sm sm:text-base"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default CategoriesBar;
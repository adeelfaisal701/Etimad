import logo from "../../assets/logo.png";
import { useTranslation } from "react-i18next";

import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  const { t } = useTranslation();

  const informationLinks = [
    { label: "about", path: "/about" },
    { label: "paymentMethod", path: "/payment" },
    { label: "termsConditions", path: "/terms" },
    { label: "returnPolicy", path: "/return" },
    { label: "reviews", path: "/reviews" },
    { label: "help", path: "/help" },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook />,
      href: "https://facebook.com",
      color: "text-blue-600",
    },
    {
      icon: <FaInstagram />,
      href: "https://instagram.com",
      color: "text-pink-500",
    },
    {
      icon: <FaTiktok />,
      href: "https://tiktok.com",
      color: "text-black",
    },
    {
      icon: <FaYoutube />,
      href: "https://youtube.com",
      color: "text-red-600",
    },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Information */}
          <div>
            <h3 className="text-xl font-bold text-[#2f6f6f] mb-5">
              {t("footer.information")}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
              {informationLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-slate-600 hover:text-[#2f6f6f] transition"
                >
                  {t(`footer.links.${item.label}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Us */}
          <div className="md:text-center">
            <h3 className="text-xl font-bold text-[#22666B] mb-5">
              {t("footer.contactUs")}
            </h3>

            <div className="space-y-4">

              <a
                href="tel:0000xxxxxxx"
                className="flex md:justify-center items-center gap-3 text-slate-600 hover:text-[#2f6f6f] transition"
              >
                <FaPhoneAlt className="text-[#22666B]" />
                <span>{t("footer.phone")}</span>
              </a>

              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex md:justify-center items-center gap-3 text-slate-600 hover:text-[#2f6f6f] transition"
              >
                <FaWhatsapp className="text-green-500" />
                <span>{t("footer.whatsapp")}</span>
              </a>

              <a
                href="mailto:customersupport@etimad.com"
                className="flex md:justify-center items-center gap-3 text-slate-600 hover:text-[#2f6f6f] transition break-all"
              >
                <MdEmail className="text-red-500" />
                <span>{t("footer.email")}</span>
              </a>

            </div>
          </div>

          {/* Logo + Social */}
          <div className="flex flex-col items-start md:items-center gap-6">
            <Link to="/">
              <img src={logo} alt="Etimad" className="w-20 h-20 object-contain" />
            </Link>

            <p className="text-sm text-slate-500 text-center max-w-xs">
              {t("footer.description")}
            </p>

            <div className="flex gap-4">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-2xl ${item.color} hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 mt-10 pt-6 text-center text-sm text-slate-500">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </div>

      </div>
    </footer>
  );
}

export default Footer;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { getDashboardRoute } from "../../util/getDashboardRoutes";
import {
  ShoppingCart,
  LayoutDashboard,
  Menu,
  X,
  Globe,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Navbar({ onOpenCart = () => {} }) {
  const { user, switchRole } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { cartCount } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLanguage = () => {
    const newLang = i18n.language === "en" ? "ur" : "en";
    i18n.changeLanguage(newLang);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { label: t("homes"), path: "/" },
    { label: t("products"), path: "/products" },
    { label: t("howItWorkss"), path: "/how-it-works" },
    { label: t("abouts"), path: "/about" },
    // { label: t("contacts"), path: "/contact" },
   
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Etimad"
              className="w-14 h-14 md:w-40 md:h-40 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-[#2f6f6f] transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Toggle - Desktop */}
            <button
              onClick={changeLanguage}
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#2f6f6f] transition"
            >
              <Globe size={16} />
              {i18n.language === "en"
                ? "زبان تبدیل کریں"
                : "Change Language"}
            </button>

            {!user ? (
              <>
                {/* Login */}
                <Link
                  to="/buyer-login"
                  className="hidden sm:inline-flex px-4 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  {t("login")}
                </Link>

                {/* Signup */}
                <Link
                  to="/seller-signup"
                  className="hidden sm:inline-flex px-4 py-2.5 rounded-xl text-white font-semibold shadow-md hover:opacity-90 transition"
                  style={{ background: "#22666B" }}
                >
               <label className="text-white">  {t("signup")}</label>
                </Link>
              </>
            ) : (
              <>
                {/* Cart */}
                <button
                  onClick={() => onOpenCart()}
                  className="relative p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
                  title="Cart"
                >
                  <ShoppingCart
                    size={20}
                    className="text-slate-700"
                  />

                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </button>

                {/* Switch Account */}
                {user.role !== "admin" && (
                  <button
                    onClick={async () => {
                      try {
                        const updatedUser = await switchRole();
                        navigate(getDashboardRoute(updatedUser.role));
                      } catch (err) {
                        alert("Failed to switch role");
                      }
                    }}
                    className="hidden sm:inline-flex px-4 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Switch Account
                  </button>
                )}

                {/* Dashboard */}
                <Link
                  to={getDashboardRoute(user.role)}
                  className="hidden sm:flex px-5 py-2.5 rounded-xl text-white font-semibold shadow-md items-center gap-2 hover:opacity-90 transition"
                  style={{ background: "#22666B" }}
                >
                  <LayoutDashboard size={18} color="white" />
                  <span className="text-white">Dashboard</span>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              className="md:hidden p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
            >
              {mobileMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/30 z-40"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu */}
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl z-50 animate-in slide-in-from-top duration-300">
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className="block py-2 text-slate-700 font-medium hover:text-[#2f6f6f] transition"
                >
                  {link.label}
                </Link>
              ))}

              {/* Language Toggle */}
              <button
                onClick={() => {
                  changeLanguage();
                  closeMobileMenu();
                }}
                className="flex items-center gap-2 py-2 text-slate-700 font-medium hover:text-[#2f6f6f] transition"
              >
                <Globe size={18} />
                {i18n.language === "en"
                  ? "زبان تبدیل کریں"
                  : "Change Language"}
              </button>

              {/* Divider */}
              <div className="border-t border-slate-200 pt-4">
                {!user ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/buyer-login"
                      onClick={closeMobileMenu}
                      className="w-full text-center px-4 py-3 rounded-xl border border-slate-300 font-semibold text-slate-700"
                    >
                      {t("login")}
                    </Link>

                    <Link
                      to="/seller-signup"
                      onClick={closeMobileMenu}
                      className="w-full text-center px-4 py-3 rounded-xl text-white font-semibold"
                      style={{ background: "#22666B" }}
                    >
                 <label className="text-white">    {t("signup")}</label>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        onOpenCart();
                        closeMobileMenu();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 font-semibold text-slate-700"
                    >
                      <ShoppingCart size={18} />
                      Cart
                      {cartCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </button>

                    {user.role !== "admin" && (
                      <button
                        onClick={async () => {
                          try {
                            const updatedUser = await switchRole();
                            closeMobileMenu();
                            navigate(getDashboardRoute(updatedUser.role));
                          } catch (err) {
                            alert("Failed to switch role");
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 font-semibold text-slate-700"
                      >
                        Switch Account
                      </button>
                    )}

                    <Link
                      to={getDashboardRoute(user.role)}
                      onClick={closeMobileMenu}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-semibold"
                      style={{ background: "#22666B" }}
                    >
                      <LayoutDashboard size={18} />
                    <label className="text-white">  Dashboard</label>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
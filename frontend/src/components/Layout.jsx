// src/components/Layout.jsx
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import WhatsappButton from "./WhatsappButton";

// ✅ logo dosyan: src/assets/yd-logo.png
import ydLogo from "../assets/yd-logo.png";

export default function Layout() {
  const loc = useLocation();
  const nav = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ CV public yolu (frontend/public/cv/YucelDayan_CV.pdf)
  const cvHref = "/cv/YucelDayan_CV.pdf";

  const onSection = (id) => {
    setMobileOpen(false);

    if (loc.pathname !== "/") {
      nav("/", { state: { scrollTo: id } });
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Home'a navigatedildikten sonra scroll
  useEffect(() => {
    const target = loc.state?.scrollTo;
    if (!target) return;

    nav(loc.pathname, { replace: true, state: {} });

    requestAnimationFrame(() => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.key]);

  // route değişince mobile menüyü kapat
  useEffect(() => {
    setMobileOpen(false);
  }, [loc.pathname]);

  // mobile menü açıkken ESC ile kapat
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const year = useMemo(() => new Date().getFullYear(), []);

  const baseLink =
    "px-4 py-2.5 rounded-xl font-semibold text-sm text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200";
  const activeLink = "bg-indigo-500/10 text-indigo-200 border-indigo-500/25";

  const primaryBtn =
    "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white border border-indigo-500/30 bg-gradient-to-br from-indigo-500/25 to-violet-500/15 hover:from-indigo-500/30 hover:to-violet-500/20 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_6px_16px_rgba(99,102,241,0.25)]";

  // ✅ Home'da boşluğu azaltmak için (navbar-hero)
  const isHome = loc.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/55 border-b border-white/10">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Brand - Logo */}
              <NavLink
                to="/"
                className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0"
              >
                <div className="relative">
                  <div className="absolute -inset-2 rounded-xl bg-indigo-500/0 group-hover:bg-indigo-500/10 blur-xl transition-all duration-500" />

                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm grid place-items-center overflow-hidden group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-all duration-300">
                    <img
                      src={ydLogo}
                      alt="Yücel Dayan Logo"
                      className="w-full h-full object-contain p-0.5 scale-110 group-hover:scale-125 transition-all duration-300"
                      draggable={false}
                    />
                  </div>
                </div>

                <div className="leading-tight">
                  <div className="font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors duration-300 text-base sm:text-lg">
                    Yücel Dayan
                  </div>
                  <div className="text-[11px] sm:text-xs font-medium text-white/40 group-hover:text-white/60 transition-colors duration-300 hidden sm:block">
                    Full-Stack Developer
                  </div>
                </div>
              </NavLink>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? activeLink : ""}`
                  }
                >
                  Ana Sayfa
                </NavLink>

                <button
                  type="button"
                  onClick={() => onSection("about")}
                  className={baseLink}
                >
                  Hakkımda
                </button>

                <button
                  type="button"
                  onClick={() => onSection("projects")}
                  className={baseLink}
                >
                  Projeler
                </button>

                <button
                  type="button"
                  onClick={() => onSection("experience")}
                  className={baseLink}
                >
                  Deneyimler
                </button>

                <button
                  type="button"
                  onClick={() => onSection("contact")}
                  className={baseLink}
                >
                  İletişim
                </button>
              </nav>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-2">
                <a
                  className={primaryBtn}
                  href={cvHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  CV İndir
                </a>
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileOpen((s) => !s)}
                className="lg:hidden flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-white/80 border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition-all flex-shrink-0"
                aria-label="Menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Mobile overlay (dışarı tıklayınca kapatır) */}
        {mobileOpen && (
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-[1px]"
          />
        )}

        {/* Mobile panel */}
        {mobileOpen && (
          <div className="lg:hidden relative border-t border-white/10 bg-black/65 backdrop-blur-xl">
            <div className="w-full mx-auto px-4 sm:px-6">
              <div className="max-w-7xl mx-auto py-4">
                <div className="grid gap-2">
                  <NavLink
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `w-full text-left ${baseLink} ${
                        isActive ? activeLink : ""
                      }`
                    }
                  >
                    Ana Sayfa
                  </NavLink>

                  <button
                    type="button"
                    onClick={() => onSection("about")}
                    className={`w-full text-left ${baseLink}`}
                  >
                    Hakkımda
                  </button>

                  <button
                    type="button"
                    onClick={() => onSection("projects")}
                    className={`w-full text-left ${baseLink}`}
                  >
                    Projeler
                  </button>

                  <button
                    type="button"
                    onClick={() => onSection("experience")}
                    className={`w-full text-left ${baseLink}`}
                  >
                    Deneyimler
                  </button>

                  <button
                    type="button"
                    onClick={() => onSection("contact")}
                    className={`w-full text-left ${baseLink}`}
                  >
                    İletişim
                  </button>

                  <div className="pt-2">
                    <a
                      className={`${primaryBtn} w-full justify-center`}
                      href={cvHref}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setMobileOpen(false)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      CV İndir
                    </a>
                  </div>

                  {/* küçük ipucu: sadece sen gör diye console'a değil, burada göstermiyoruz */}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* PAGE */}
      <main
        className={`w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 ${
          isHome ? "pt-0 pb-0 -mt-2 sm:-mt-3" : "py-8 sm:py-10 lg:py-12"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* ✅ WHATSAPP FLOATING BUTTON */}
      <WhatsappButton />

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-gradient-to-br from-white/[0.02] to-white/[0.01] backdrop-blur-sm">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-3">
              <div className="text-white/55 font-semibold text-xs sm:text-sm text-center sm:text-left">
                © {year} Yücel Dayan — Tüm hakları saklıdır.
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <a
                  className="text-white/55 hover:text-white font-semibold transition"
                  href="https://github.com/yuceldayan"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <span className="text-white/20">•</span>
                <a
                  className="text-white/55 hover:text-white font-semibold transition"
                  href="https://www.linkedin.com/in/yucel-dayan"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <span className="text-white/20">•</span>
                <a
                  className="text-white/55 hover:text-white font-semibold transition"
                  href="mailto:dayanyucel0304@gmail.com"
                >
                  E-posta
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

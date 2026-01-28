// src/components/ProjectCard.jsx
export default function ProjectCard({ p, onOpen }) {
  const handleCardClick = () => {
    if (typeof onOpen === "function") onOpen(p.id);
  };

  const handleLinkClick = (e) => e.stopPropagation();

  const liveUrl = p?.liveUrl;
  const repoUrl = p?.repoUrl;

  const descRaw = String(p?.shortDescription || "").trim();

  // ✅ açıklamayı satır satır maddeye çevir
  const descItems = descRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/^[-•\d.)\s]+/, "")); // "- " / "• " / "1) " gibi başları temizler

  const techs = Array.isArray(p?.technologies) ? p.technologies : [];

  // ✅ otomatik tip tespiti (backend'e dokunmadan)
  const inferType = () => {
    const hay = `${p?.title || ""} ${descRaw} ${techs.join(" ")}`.toLowerCase();

    if (
      hay.includes("flutter") ||
      hay.includes("react native") ||
      hay.includes("kotlin") ||
      hay.includes("swift") ||
      hay.includes("android") ||
      hay.includes("ios")
    )
      return "mobile";

    if (
      hay.includes("ai") ||
      hay.includes("ml") ||
      hay.includes("machine learning") ||
      hay.includes("tensorflow") ||
      hay.includes("pytorch") ||
      hay.includes("opencv") ||
      hay.includes("nlp")
    )
      return "ai";

    if (
      hay.includes("spring") ||
      hay.includes("spring boot") ||
      hay.includes("hibernate") ||
      hay.includes("postgres") ||
      hay.includes("mysql") ||
      hay.includes("api") ||
      hay.includes("rest")
    )
      return "backend";

    if (hay.includes("e-commerce") || hay.includes("ecommerce") || hay.includes("shop") || hay.includes("cart"))
      return "ecommerce";

    if (hay.includes("react") || hay.includes("vite") || hay.includes("next") || hay.includes("tailwind") || hay.includes("frontend"))
      return "web";

    return "default";
  };

  const type = inferType();

  const ACCENTS = {
    web: {
      border: "hover:border-indigo-500/40",
      glow: "hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)]",
      top: "from-indigo-500 via-violet-500 to-pink-500",
      overlay: "from-indigo-500/8 to-violet-500/8",
      badge: "border-indigo-500/25 bg-indigo-500/10 text-indigo-200",
      arrow: "group-hover:from-indigo-500 group-hover:to-violet-500",
      bullet: "from-indigo-400 to-violet-400",
      liveBtn: "border-indigo-500/30 bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500/20 hover:border-indigo-500/45",
      repoBtn: "border-indigo-500/20 bg-indigo-500/5 text-indigo-100/80 hover:bg-indigo-500/12 hover:border-indigo-500/35",
    },
    ecommerce: {
      border: "hover:border-emerald-500/40",
      glow: "hover:shadow-[0_20px_60px_rgba(16,185,129,0.25)]",
      top: "from-emerald-500 via-teal-500 to-cyan-500",
      overlay: "from-emerald-500/8 to-teal-500/8",
      badge: "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
      arrow: "group-hover:from-emerald-500 group-hover:to-teal-500",
      bullet: "from-emerald-400 to-teal-400",
      liveBtn: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20 hover:border-emerald-500/45",
      repoBtn: "border-emerald-500/20 bg-emerald-500/5 text-emerald-100/80 hover:bg-emerald-500/12 hover:border-emerald-500/35",
    },
    mobile: {
      border: "hover:border-sky-500/40",
      glow: "hover:shadow-[0_20px_60px_rgba(56,189,248,0.25)]",
      top: "from-sky-500 via-cyan-500 to-blue-500",
      overlay: "from-sky-500/8 to-cyan-500/8",
      badge: "border-sky-500/25 bg-sky-500/10 text-sky-200",
      arrow: "group-hover:from-sky-500 group-hover:to-cyan-500",
      bullet: "from-sky-400 to-cyan-400",
      liveBtn: "border-sky-500/30 bg-sky-500/10 text-sky-200 hover:bg-sky-500/20 hover:border-sky-500/45",
      repoBtn: "border-sky-500/20 bg-sky-500/5 text-sky-100/80 hover:bg-sky-500/12 hover:border-sky-500/35",
    },
    ai: {
      border: "hover:border-fuchsia-500/40",
      glow: "hover:shadow-[0_20px_60px_rgba(217,70,239,0.25)]",
      top: "from-fuchsia-500 via-pink-500 to-rose-500",
      overlay: "from-fuchsia-500/8 to-pink-500/8",
      badge: "border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-200",
      arrow: "group-hover:from-fuchsia-500 group-hover:to-pink-500",
      bullet: "from-fuchsia-400 to-pink-400",
      liveBtn: "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-200 hover:bg-fuchsia-500/20 hover:border-fuchsia-500/45",
      repoBtn: "border-fuchsia-500/20 bg-fuchsia-500/5 text-fuchsia-100/80 hover:bg-fuchsia-500/12 hover:border-fuchsia-500/35",
    },
    backend: {
      border: "hover:border-amber-500/40",
      glow: "hover:shadow-[0_20px_60px_rgba(245,158,11,0.25)]",
      top: "from-amber-500 via-orange-500 to-rose-500",
      overlay: "from-amber-500/8 to-orange-500/8",
      badge: "border-amber-500/25 bg-amber-500/10 text-amber-200",
      arrow: "group-hover:from-amber-500 group-hover:to-orange-500",
      bullet: "from-amber-400 to-orange-400",
      liveBtn: "border-amber-500/30 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20 hover:border-amber-500/45",
      repoBtn: "border-amber-500/20 bg-amber-500/5 text-amber-100/80 hover:bg-amber-500/12 hover:border-amber-500/35",
    },
    default: {
      border: "hover:border-indigo-500/40",
      glow: "hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)]",
      top: "from-indigo-500 via-violet-500 to-pink-500",
      overlay: "from-indigo-500/8 to-violet-500/8",
      badge: "border-indigo-500/25 bg-indigo-500/10 text-indigo-200",
      arrow: "group-hover:from-indigo-500 group-hover:to-violet-500",
      bullet: "from-indigo-400 to-violet-400",
      liveBtn: "border-indigo-500/30 bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500/20 hover:border-indigo-500/45",
      repoBtn: "border-indigo-500/20 bg-indigo-500/5 text-indigo-100/80 hover:bg-indigo-500/12 hover:border-indigo-500/35",
    },
  };

  const accent = ACCENTS[type] || ACCENTS.default;

  return (
    <button
      type="button"
      onClick={handleCardClick}
      className={`
        group relative w-full text-left
        rounded-2xl border border-white/10
        bg-gradient-to-br from-white/[0.06] to-white/[0.02]
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        transition-all duration-300
        hover:-translate-y-2
        ${accent.border}
        ${accent.glow}
        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-indigo-500/60
        overflow-hidden
      `}
      aria-label={`Proje: ${p?.title || ""}`}
    >
      {/* overlay */}
      <div
        className={`
          absolute inset-0 
          bg-gradient-to-br ${accent.overlay}
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
          pointer-events-none
        `}
      />

      {/* top line */}
      <div
        className={`
          absolute left-0 right-0 top-0 h-1
          bg-gradient-to-r ${accent.top}
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        `}
      />

      {/* badge */}
      {p?.id != null && (
        <div
          className={`
            absolute right-5 top-5
            rounded-full border
            px-3 py-1.5
            text-xs font-black
            backdrop-blur-sm
            ${accent.badge}
          `}
        >
          #{p.id}
        </div>
      )}

      {/* content */}
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="pr-16 text-xl font-black text-white leading-tight mb-3 tracking-tight">
          {p?.title}
        </h3>

        {/* ✅ kesme yok: madde madde + accent bullet */}
        {descItems.length > 0 ? (
          <ul className="space-y-2 mb-5 text-sm font-medium text-white/70 leading-relaxed">
            {descItems.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className={`
                    mt-2
                    h-1.5 w-1.5
                    rounded-full
                    bg-gradient-to-r ${accent.bullet}
                    flex-shrink-0
                  `}
                />
                <span className="text-white/80 font-semibold leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm font-medium text-white/50 mb-5">Açıklama eklenmemiş.</p>
        )}

        {/* tech chips */}
        {techs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {techs.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* links (hep altta) */}
        <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-white/10">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={handleLinkClick}
              className={`
                inline-flex items-center gap-2
                rounded-xl
                px-3 py-2
                text-xs font-bold
                hover:-translate-y-0.5
                transition-all duration-200
                border bg-white/[0.02]
                ${accent.liveBtn}
              `}
            >
              Live Demo
            </a>
          )}

          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={handleLinkClick}
              className={`
                inline-flex items-center gap-2
                rounded-xl
                px-3 py-2
                text-xs font-bold
                hover:-translate-y-0.5
                transition-all duration-200
                border bg-white/[0.02]
                ${accent.repoBtn}
              `}
            >
              Repository
            </a>
          )}
        </div>
      </div>

      {/* arrow */}
      <div
        className={`
          absolute bottom-5 right-5
          flex items-center justify-center
          h-10 w-10
          rounded-full
          border border-white/10
          bg-white/[0.05]
          text-white/70
          transition-all duration-300
          group-hover:border-white/15
          group-hover:bg-gradient-to-br
          ${accent.arrow}
          group-hover:text-white
          group-hover:scale-110
          group-hover:shadow-[0_8px_16px_rgba(0,0,0,0.35)]
        `}
      >
        <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* decorative corner accent */}
      <div
        className={`
          absolute -bottom-10 -right-10
          w-32 h-32
          rounded-full
          bg-gradient-to-br ${accent.overlay}
          blur-2xl
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
          pointer-events-none
        `}
      />
    </button>
  );
}

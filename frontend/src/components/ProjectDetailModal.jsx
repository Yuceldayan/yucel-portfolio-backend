// src/components/ProjectDetailModal.jsx
import { useEffect, useRef, useMemo, useState } from "react";

export default function ProjectDetailModal({ project, onClose }) {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Focus
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  // ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  if (!project) return null;

  const title = project.title || "Proje";
  const liveUrl = project.liveUrl || project.liveURL || project.demoUrl;
  const repoUrl = project.repoUrl || project.githubUrl;

  const coverImageUrl =
    project.coverImageUrl || project.cover_image_url || project.image || null;

  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : Array.isArray(project.tech)
    ? project.tech
    : typeof project.stack === "string"
    ? project.stack.split(" • ").filter(Boolean)
    : [];

  const features = Array.isArray(project.features) ? project.features : [];
  const createdAt = project.createdAt || project.date;

  // açıklama
  const descRaw = String(
    project.longDescription ||
      project.shortDescription ||
      project.description ||
      ""
  ).trim();

  // ✅ satır satır madde
  const descItems = useMemo(() => {
    const lines = descRaw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => s.replace(/^[-•\d.)\s]+/, ""));
    return lines;
  }, [descRaw]);

  // ✅ paragraflaştır
  const descParagraphs = useMemo(() => {
    if (!descRaw) return [];

    if (descRaw.includes("\n")) {
      return descRaw
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    const parts = descRaw
      .split(/(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜ])/g)
      .map((s) => s.trim())
      .filter(Boolean);

    const grouped = [];
    let buf = [];
    for (const p of parts) {
      buf.push(p);
      if (buf.length >= 2) {
        grouped.push(buf.join(" "));
        buf = [];
      }
    }
    if (buf.length) grouped.push(buf.join(" "));
    return grouped.length ? grouped : [descRaw];
  }, [descRaw]);

  // ✅ metin içinde mini vurgu (okunurluk + premium)
  const emphasizeText = (text) => {
    if (!text) return [];
    // Önemli kelimeler (istersen artırırız)
    const keys = [
      "API",
      "dinamik",
      "canlı",
      "aktif",
      "performans",
      "hızlı",
      "mobil",
      "responsive",
      "UI",
      "UX",
      "tablo",
      "kart",
      "Spring",
      "React",
      "Vite",
    ];

    // Basit highlight: kelimeyi yakala ve <mark> benzeri span yap
    // (regex safe: parçalı render)
    const re = new RegExp(`\\b(${keys.join("|")})\\b`, "gi");
    const parts = String(text).split(re);

    return parts.map((part, i) => {
      const isKey = keys.some((k) => k.toLowerCase() === part.toLowerCase());
      if (!isKey) return <span key={i}>{part}</span>;

      return (
        <span
          key={i}
          className="
            font-black text-white
            bg-white/10
            px-1.5 py-0.5
            rounded-lg
            border border-white/10
            shadow-[0_6px_18px_rgba(0,0,0,0.25)]
            mx-[1px]
          "
        >
          {part}
        </span>
      );
    });
  };

  // ✅ tip tespiti
  const inferType = () => {
    const hay = `${title} ${descRaw} ${technologies.join(" ")} ${features.join(
      " "
    )}`.toLowerCase();

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

    if (
      hay.includes("e-commerce") ||
      hay.includes("ecommerce") ||
      hay.includes("woocommerce") ||
      hay.includes("shop") ||
      hay.includes("cart")
    )
      return "ecommerce";

    if (
      hay.includes("react") ||
      hay.includes("vite") ||
      hay.includes("next") ||
      hay.includes("tailwind") ||
      hay.includes("frontend")
    )
      return "web";

    return "default";
  };

  const type = inferType();

  const ACCENTS = {
    web: {
      badge: "border-indigo-500/30 bg-indigo-500/15 text-indigo-200",
      ring: "focus-visible:ring-indigo-500/60",
      headerGlow: "from-indigo-500/18 to-violet-500/10",
      bullet: "from-indigo-400 to-violet-400",
      chip:
        "border-indigo-500/25 bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500/15 hover:border-indigo-500/40",
      primaryBtn:
        "border-indigo-500/40 bg-gradient-to-br from-indigo-500 to-violet-500 shadow-[0_8px_24px_rgba(99,102,241,0.25)] hover:shadow-[0_12px_32px_rgba(99,102,241,0.35)]",
      outlineHover: "hover:border-indigo-500/25",
    },
    ecommerce: {
      badge: "border-emerald-500/30 bg-emerald-500/15 text-emerald-200",
      ring: "focus-visible:ring-emerald-500/60",
      headerGlow: "from-emerald-500/18 to-teal-500/10",
      bullet: "from-emerald-400 to-teal-400",
      chip:
        "border-emerald-500/25 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15 hover:border-emerald-500/40",
      primaryBtn:
        "border-emerald-500/40 bg-gradient-to-br from-emerald-500 to-teal-500 shadow-[0_8px_24px_rgba(16,185,129,0.22)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.32)]",
      outlineHover: "hover:border-emerald-500/25",
    },
    mobile: {
      badge: "border-sky-500/30 bg-sky-500/15 text-sky-200",
      ring: "focus-visible:ring-sky-500/60",
      headerGlow: "from-sky-500/18 to-cyan-500/10",
      bullet: "from-sky-400 to-cyan-400",
      chip:
        "border-sky-500/25 bg-sky-500/10 text-sky-200 hover:bg-sky-500/15 hover:border-sky-500/40",
      primaryBtn:
        "border-sky-500/40 bg-gradient-to-br from-sky-500 to-cyan-500 shadow-[0_8px_24px_rgba(56,189,248,0.22)] hover:shadow-[0_12px_32px_rgba(56,189,248,0.32)]",
      outlineHover: "hover:border-sky-500/25",
    },
    ai: {
      badge: "border-fuchsia-500/30 bg-fuchsia-500/15 text-fuchsia-200",
      ring: "focus-visible:ring-fuchsia-500/60",
      headerGlow: "from-fuchsia-500/18 to-pink-500/10",
      bullet: "from-fuchsia-400 to-pink-400",
      chip:
        "border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-200 hover:bg-fuchsia-500/15 hover:border-fuchsia-500/40",
      primaryBtn:
        "border-fuchsia-500/40 bg-gradient-to-br from-fuchsia-500 to-pink-500 shadow-[0_8px_24px_rgba(217,70,239,0.2)] hover:shadow-[0_12px_32px_rgba(217,70,239,0.3)]",
      outlineHover: "hover:border-fuchsia-500/25",
    },
    backend: {
      badge: "border-amber-500/30 bg-amber-500/15 text-amber-200",
      ring: "focus-visible:ring-amber-500/60",
      headerGlow: "from-amber-500/18 to-orange-500/10",
      bullet: "from-amber-400 to-orange-400",
      chip:
        "border-amber-500/25 bg-amber-500/10 text-amber-200 hover:bg-amber-500/15 hover:border-amber-500/40",
      primaryBtn:
        "border-amber-500/40 bg-gradient-to-br from-amber-500 to-orange-500 shadow-[0_8px_24px_rgba(245,158,11,0.2)] hover:shadow-[0_12px_32px_rgba(245,158,11,0.3)]",
      outlineHover: "hover:border-amber-500/25",
    },
    default: {
      badge: "border-indigo-500/30 bg-indigo-500/15 text-indigo-200",
      ring: "focus-visible:ring-indigo-500/60",
      headerGlow: "from-indigo-500/18 to-violet-500/10",
      bullet: "from-indigo-400 to-violet-400",
      chip:
        "border-indigo-500/25 bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500/15 hover:border-indigo-500/40",
      primaryBtn:
        "border-indigo-500/40 bg-gradient-to-br from-indigo-500 to-violet-500 shadow-[0_8px_24px_rgba(99,102,241,0.25)] hover:shadow-[0_12px_32px_rgba(99,102,241,0.35)]",
      outlineHover: "hover:border-indigo-500/25",
    },
  };

  const accent = ACCENTS[type] || ACCENTS.default;

  const createdLabel = (() => {
    try {
      if (!createdAt) return null;
      return new Date(createdAt).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return String(createdAt);
    }
  })();

  // ✅ “Devamını oku” kararları
  const isBulletMode = descItems.length > 1;
  const bulletPreviewCount = 6;
  const paraPreviewCount = 2;

  const showReadMore =
    (isBulletMode && descItems.length > bulletPreviewCount) ||
    (!isBulletMode && descParagraphs.length > paraPreviewCount) ||
    descRaw.length > 650;

  const bulletsToShow = expanded ? descItems : descItems.slice(0, bulletPreviewCount);
  const parasToShow = expanded ? descParagraphs : descParagraphs.slice(0, paraPreviewCount);

  return (
    <div
      className="
        fixed inset-0 z-50
        grid place-items-center
        bg-black/80 backdrop-blur-md
        p-4
        animate-fadeIn
      "
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="
          w-full max-w-4xl max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          border border-white/10
          bg-gradient-to-br from-[#0f1419] to-[#0b0f1a]
          shadow-[0_20px_80px_rgba(0,0,0,0.8)]
          animate-slideUp
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 backdrop-blur-xl bg-black/60 border-b border-white/10">
          <div className="relative overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${accent.headerGlow} opacity-70 pointer-events-none`}
            />
            <div className="relative flex items-start justify-between gap-4 p-6">
              <div className="flex-1">
                {project.id != null && (
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black mb-3 ${accent.badge}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Proje #{project.id}</span>
                  </div>
                )}

                <h3 id="modal-title" className="text-white font-black text-2xl md:text-3xl leading-tight">
                  {title}
                </h3>

                {(project.stack || project.tags) && (
                  <p className="mt-2 text-white/70 font-semibold text-sm">
                    {project.stack || project.tags?.join(" • ")}
                  </p>
                )}
              </div>

              <button
                ref={closeBtnRef}
                onClick={onClose}
                className={`
                  flex items-center justify-center
                  w-10 h-10 rounded-xl
                  border border-white/10 bg-white/5
                  text-white/70
                  hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-300
                  transition-all duration-200
                  focus:outline-none
                  focus-visible:ring-2 ${accent.ring}
                  group
                `}
                aria-label="Kapat"
                title="Kapat (Esc)"
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {/* ✅ Description (READABLE mode) */}
          <div
            className={`
              rounded-2xl border border-white/10
              bg-gradient-to-br from-white/[0.05] to-white/[0.025]
              p-6
              shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
              transition-all ${accent.outlineHover}
            `}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-white font-black text-lg">Proje Hakkında</h4>
            </div>

            <div className="relative">
              <div className={`${expanded ? "" : "max-h-[260px] overflow-hidden"} pr-1`}>
                {isBulletMode ? (
                  <ul className="space-y-4 text-[15.5px] leading-8 text-white/85 font-semibold">
                    {(expanded ? descItems : bulletsToShow).map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className={`mt-[11px] h-1.5 w-1.5 rounded-full bg-gradient-to-r ${accent.bullet} flex-shrink-0`} />
                        <span className="tracking-[0.15px]">{emphasizeText(item)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-5 text-[15.5px] leading-8 text-white/85 font-semibold">
                    {(expanded ? descParagraphs : parasToShow).map((p, i) => (
                      <p key={i} className="tracking-[0.15px]">
                        {emphasizeText(p)}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {!expanded && showReadMore && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b0f1a] to-transparent" />
              )}
            </div>

            {showReadMore && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="
                    inline-flex items-center gap-2
                    rounded-xl border border-white/10
                    bg-white/[0.06] px-4 py-2
                    text-sm font-black text-white/85
                    hover:bg-white/[0.10] hover:border-white/20
                    transition-all
                  "
                >
                  {expanded ? "Kısalt" : "Devamını oku"}
                  <svg className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <h4 className="text-white font-black text-lg">Öne Çıkan Özellikler</h4>
              </div>

              <ul className="space-y-4 text-[15.5px] leading-8 text-white/85 font-semibold">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-[11px] h-1.5 w-1.5 rounded-full bg-gradient-to-r ${accent.bullet} flex-shrink-0`} />
                    <span className="tracking-[0.15px]">{emphasizeText(f)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Details Grid */}
          {(createdLabel || liveUrl || coverImageUrl) && (
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {createdLabel && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center hover:bg-white/[0.06] transition-all">
                  <div className="text-xs font-black tracking-wider text-white/50 uppercase mb-2">Oluşturulma</div>
                  <div className="text-sm font-bold text-white/90">{createdLabel}</div>
                </div>
              )}

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center hover:bg-white/[0.06] transition-all">
                <div className="text-xs font-black tracking-wider text-white/50 uppercase mb-2">Durum</div>
                <div className={`text-sm font-bold ${liveUrl ? "text-emerald-300" : "text-amber-300"}`}>
                  {liveUrl ? "Canlı & Aktif" : "Geliştirme"}
                </div>
              </div>

              {coverImageUrl && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center hover:bg-white/[0.06] transition-all">
                  <div className="text-xs font-black tracking-wider text-white/50 uppercase mb-2">Görsel</div>
                  <a
                    href={coverImageUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleLinkClick}
                    className="text-sm font-bold text-white/80 hover:text-white transition-colors"
                  >
                    Görüntüle
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <h4 className="text-white font-black text-lg">Kullanılan Teknolojiler</h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, i) => (
                  <span
                    key={i}
                    className={`
                      inline-flex items-center
                      rounded-xl border px-3 py-2
                      text-xs font-bold transition-all duration-200
                      ${accent.chip}
                    `}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3 pt-6 border-t border-white/10">
            {liveUrl && (
              <a
                className={`
                  inline-flex items-center gap-2
                  px-5 py-3 rounded-xl font-bold text-sm
                  border transition-all duration-300
                  hover:-translate-y-0.5 text-white
                  ${accent.primaryBtn}
                `}
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Canlı Demo
              </a>
            )}

            {repoUrl && (
              <a
                className="
                  inline-flex items-center gap-2
                  px-5 py-3 rounded-xl font-bold text-sm
                  border transition-all duration-300
                  hover:-translate-y-0.5
                  text-white/85 border-white/10 bg-white/[0.06]
                  hover:bg-white/[0.10] hover:border-white/20
                "
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
              >
                Repository
              </a>
            )}

            <button
              onClick={onClose}
              className="
                inline-flex items-center gap-2
                px-5 py-3 rounded-xl font-bold text-sm
                border transition-all duration-300
                hover:-translate-y-0.5
                text-white/85 border-white/10 bg-white/[0.06]
                hover:bg-white/[0.10] hover:border-white/20
              "
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

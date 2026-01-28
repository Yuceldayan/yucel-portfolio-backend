// src/components/AboutSection.jsx
export default function AboutSection({ about }) {
  // ✅ Tüm içerik panelden gelsin (frontend hardcode yok)
  const data = about || {
    title: "",
    subtitle: "",
    bio: "",
    highlights: [],
    stats: [],
    educationSchool: "",
    educationDepartment: "",
    educationYear: "",
    educationDesc: "",
    educationTags: [],
    goalsDesc: "",
    goalsTags: [],
    techFrontend: [],
    techBackend: [],
    techTools: [],
  };

  // stats jsonb string -> array
  let statsArr = [];
  try {
    statsArr =
      typeof data.stats === "string" ? JSON.parse(data.stats || "[]") : data.stats || [];
  } catch {
    statsArr = [];
  }

  // gradient yoksa default verelim (stil fallback)
  const defaultGradients = [
    "from-cyan-500 to-blue-500",
    "from-blue-500 to-violet-500",
    "from-violet-500 to-purple-500",
    "from-purple-500 to-pink-500",
  ];

  const safeHighlights = Array.isArray(data.highlights) ? data.highlights : [];
  const safeEduTags = Array.isArray(data.educationTags) ? data.educationTags : [];
  const safeGoalsTags = Array.isArray(data.goalsTags) ? data.goalsTags : [];
  const safeTechFrontend = Array.isArray(data.techFrontend) ? data.techFrontend : [];
  const safeTechBackend = Array.isArray(data.techBackend) ? data.techBackend : [];
  const safeTechTools = Array.isArray(data.techTools) ? data.techTools : [];

  // Bio / desc okunurluğu: panelde boş satır bırakırsan paragraf olur
  const bioParagraphs = String(data.bio || "")
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);

  const eduParagraphs = String(data.educationDesc || "")
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);

  const goalsParagraphs = String(data.goalsDesc || "")
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section
      id="about"
      className="scroll-mt-12 md:scroll-mt-24 pt-4 pb-10 sm:pt-6 sm:pb-12 md:pt-8 md:pb-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        {(data.title || data.subtitle) && (
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            {/* Pill (büyütüldü) */}
            {data.title ? (
              <div className="flex justify-center mb-5 sm:mb-6">
                <span
                  className="
                    inline-flex items-center gap-2.5
                    px-5 py-2 sm:px-6 sm:py-2.5
                    rounded-full
                    border border-cyan-400/35
                    bg-cyan-400/10
                    text-sm sm:text-base
                    font-black
                    text-cyan-200
                    tracking-widest
                    uppercase
                    backdrop-blur-sm
                    shadow-[0_10px_30px_rgba(34,211,238,0.08)]
                  "
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.55)]" />
                  {data.title}
                </span>
              </div>
            ) : null}

            {/* ❌ Büyük beyaz başlık kaldırıldı */}

            {/* Subtitle / Note */}
            {data.subtitle ? (
              <p className="text-base sm:text-lg md:text-xl text-white/70 font-medium max-w-3xl mx-auto px-4 leading-relaxed">
                {data.subtitle}
              </p>
            ) : null}
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Sol */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Bio */}
            {(bioParagraphs.length > 0 || safeHighlights.length > 0) && (
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl sm:rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500" />
                <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:border-cyan-500/30 transition-all duration-500">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <svg
                        className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                        Kısa Özgeçmiş
                      </h3>

                      {bioParagraphs.length > 0 ? (
                        <div className="space-y-4 sm:space-y-5">
                          {bioParagraphs.map((p, idx) => (
                            <p
                              key={idx}
                              className={
                                idx === 0
                                  ? "text-sm sm:text-base text-white/85 leading-relaxed sm:leading-7 font-medium"
                                  : "text-sm sm:text-base text-white/65 leading-relaxed sm:leading-7"
                              }
                            >
                              {p}
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {safeHighlights.length > 0 ? (
                    <div className="mt-5 sm:mt-6 sm:pl-20 md:pl-22">
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {safeHighlights.map((txt, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition"
                          >
                            <span className="w-2 h-2 rounded-full bg-cyan-400/90" />
                            <span className="text-xs sm:text-sm font-semibold text-white/80">
                              {txt}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {/* Stats */}
            {Array.isArray(statsArr) && statsArr.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {statsArr.slice(0, 4).map((stat, i) => {
                  const gradient =
                    stat?.gradient || defaultGradients[i] || "from-cyan-500 to-blue-500";
                  return (
                    <div key={i} className="group relative overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                      />
                      <div className="relative bg-black/60 backdrop-blur border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-center hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-1">
                        <div
                          className={`text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                        >
                          {stat?.value || "-"}
                        </div>
                        <div className="text-[10px] sm:text-xs font-semibold text-white/55 uppercase tracking-wider">
                          {stat?.label || ""}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

          {/* Sağ */}
          <div className="space-y-6 sm:space-y-8">
            {/* Eğitim */}
            {(data.educationDepartment ||
              data.educationSchool ||
              data.educationYear ||
              eduParagraphs.length > 0 ||
              safeEduTags.length > 0) && (
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl sm:rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500" />
                <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:border-blue-500/30 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/30 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white">Eğitim</h3>
                  </div>

                  <div className="mb-3 sm:mb-4 space-y-1">
                    {data.educationDepartment ? (
                      <div className="text-sm sm:text-base font-bold text-white">
                        {data.educationDepartment}
                      </div>
                    ) : null}
                    {data.educationSchool ? (
                      <div className="text-xs sm:text-sm font-semibold text-white/60">
                        {data.educationSchool}
                      </div>
                    ) : null}
                    {data.educationYear ? (
                      <div className="text-xs font-bold text-cyan-400">{data.educationYear}</div>
                    ) : null}
                  </div>

                  {eduParagraphs.length > 0 ? (
                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                      {eduParagraphs.map((p, idx) => (
                        <p
                          key={idx}
                          className={
                            idx === 0
                              ? "text-xs sm:text-sm text-white/70 leading-relaxed font-medium"
                              : "text-xs sm:text-sm text-white/55 leading-relaxed"
                          }
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {safeEduTags.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {safeEduTags.map((tag) => (
                        <span
                          key={tag}
                          className="
                            px-2 sm:px-2.5 py-1
                            text-[10px] sm:text-xs
                            font-semibold
                            rounded-md
                            bg-cyan-500/10
                            border border-cyan-500/20
                            text-cyan-300
                            hover:bg-cyan-500/20
                            transition
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {/* Hedefler */}
            {(goalsParagraphs.length > 0 || safeGoalsTags.length > 0) && (
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl sm:rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500" />
                <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:border-violet-500/30 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white">Kariyer Hedefleri</h3>
                  </div>

                  {goalsParagraphs.length > 0 ? (
                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                      {goalsParagraphs.map((p, idx) => (
                        <p
                          key={idx}
                          className={
                            idx === 0
                              ? "text-xs sm:text-sm text-white/75 leading-relaxed font-medium"
                              : "text-xs sm:text-sm text-white/60 leading-relaxed"
                          }
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {safeGoalsTags.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {safeGoalsTags.map((goal) => (
                        <span
                          key={goal}
                          className="
                            px-2 sm:px-2.5 py-1
                            text-[10px] sm:text-xs
                            font-semibold
                            rounded-md
                            bg-violet-500/10
                            border border-violet-500/20
                            text-violet-300
                            hover:bg-violet-500/20
                            transition
                          "
                        >
                          {goal}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Temel Teknolojiler */}
        {(safeTechFrontend.length > 0 || safeTechBackend.length > 0 || safeTechTools.length > 0) && (
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-xl sm:rounded-2xl opacity-20 blur" />
            <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white">Temel Teknolojiler</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {/* Frontend */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-cyan-500/20">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Frontend
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {safeTechFrontend.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/15 hover:border-cyan-400/30 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Backend */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-blue-500/20">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Backend
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {safeTechBackend.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/15 hover:border-blue-400/30 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-violet-500/20">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Araçlar
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {safeTechTools.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 hover:bg-violet-500/15 hover:border-violet-400/30 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

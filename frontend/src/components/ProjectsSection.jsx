// src/components/ProjectsSection.jsx
import ProjectCard from "./ProjectCard";

export default function ProjectsSection({
  query = "",
  onQueryChange,
  filtered = [],
  loading = false,
  err = "",
  onOpenProject,
  onClearQuery,
}) {
  const btnBase =
    "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm border transition-all duration-200 hover:-translate-y-0.5";
  const btnGhost =
    "text-white/85 border-white/10 bg-white/[0.06] hover:bg-white/[0.10] hover:border-white/20";

  const safeFiltered = Array.isArray(filtered) ? filtered : [];
  const count = safeFiltered.length;

  const handleClear = () => {
    if (typeof onClearQuery === "function") onClearQuery();
    else if (typeof onQueryChange === "function") onQueryChange("");
  };

  return (
    <section id="projects" className="scroll-mt-24">
      {/* Section Header */}
      <div className="relative text-center mb-12">
        {/* subtle glow background */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[520px] max-w-[92vw] h-[140px] blur-3xl opacity-25 bg-gradient-to-r from-indigo-500/40 via-violet-500/20 to-cyan-500/30" />

        {/* Premium badge */}
        <div className="relative inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/[0.03] mb-5 overflow-hidden">
          {/* shine */}
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-120%] hover:translate-x-[120%] transition-transform duration-1000" />

          <span className="relative inline-flex items-center gap-2">
            {/* icon */}
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/[0.04]">
              <svg className="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h10M4 17h16" />
              </svg>
            </span>

            {/* gradient text */}
            <span className="text-base md:text-lg font-black uppercase tracking-widest bg-gradient-to-r from-indigo-300 via-violet-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(99,102,241,0.35)]">
              Projeler
            </span>
          </span>
        </div>

        <p className="relative text-sm md:text-base text-white/60 font-semibold max-w-2xl mx-auto leading-relaxed">
          Backend API&apos;den dinamik olarak çekilen projelerim. Her biri farklı teknolojiler ve yaklaşımlar içeriyor.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          {/* glow */}
          <div className="pointer-events-none absolute -inset-0.5 rounded-2xl opacity-25 blur-xl bg-gradient-to-r from-indigo-500/50 via-violet-500/30 to-cyan-500/40" />

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <input
              className="
                w-full
                rounded-2xl 
                border border-white/10 
                bg-white/[0.05]
                backdrop-blur-md
                pl-12 pr-10 py-3.5
                text-white/90 
                font-semibold 
                placeholder:text-white/40
                outline-none 
                transition-all
                focus:border-indigo-500/40
                focus:bg-white/[0.08]
                focus:ring-2 focus:ring-indigo-500/20
              "
              placeholder="Projelerde ara..."
              value={query}
              onChange={(e) => onQueryChange?.(e.target.value)}
            />

            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  flex items-center justify-center
                  w-7 h-7
                  rounded-lg
                  text-white/45
                  hover:text-white
                  hover:bg-white/10
                  transition-all
                "
                aria-label="Aramayı temizle"
                title="Temizle"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center gap-2 px-4 py-3.5 rounded-2xl border border-white/10 bg-white/[0.04] whitespace-nowrap">
          <svg className="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-white/60 font-semibold text-sm">
            <span className="text-white font-black">{count}</span> proje
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div>
        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 mb-4">
              <div className="w-8 h-8 rounded-full border-3 border-indigo-500/30 border-t-indigo-400 animate-spin" />
            </div>
            <div className="text-white/90 font-bold text-lg mb-2">Projeler yükleniyor</div>
            <div className="text-white/50 font-medium text-sm">Lütfen bekleyin...</div>
          </div>
        ) : err ? (
          <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/15 to-red-600/10 p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-red-200 font-black text-lg mb-1">Bir Hata Oluştu</div>
                <div className="text-red-100/80 font-medium text-sm">{err}</div>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 font-bold text-sm hover:bg-red-500/20 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Tekrar Dene
                </button>
              </div>
            </div>
          </div>
        ) : count === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 mb-4">
              <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>

            <div className="text-white font-black text-xl mb-2">Proje Bulunamadı</div>

            <div className="text-white/60 font-medium text-sm mb-6 max-w-md mx-auto">
              {query
                ? `"${query}" araması için eşleşen proje bulunamadı. Farklı bir arama terimi deneyin.`
                : "Henüz görüntülenecek proje bulunmuyor."}
            </div>

            {query && (
              <button type="button" className={`${btnBase} ${btnGhost}`} onClick={handleClear}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Filtreyi Temizle
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {safeFiltered.map((p) => (
              <ProjectCard key={p.id} p={p} onOpen={onOpenProject} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

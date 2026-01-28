// src/components/ExperienceSection.jsx
export default function ExperienceSection({ items = [] }) {
  const safeItems = Array.isArray(items) ? items : [];

  const splitLines = (txt) =>
    (txt || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

  const fmtRange = (e) => {
    const start = e?.startDate || "—";
    if (e?.isCurrent) return `${start} → Devam`;
    if (e?.endDate) return `${start} → ${e.endDate}`;
    return start;
  };

  return (
    <section id="experience" className="scroll-mt-24">
      {/* ✅ padding azaltıldı: py-22 → py-6 */}
      <div className="px-6 py-6 md:px-10 md:py-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            {/* ✅ BÜYÜTÜLMÜŞ "Deneyimler" badge */}
            <div
              className="mx-auto inline-flex items-center gap-3 rounded-full
              border border-[rgba(0,212,255,0.25)]
              bg-[rgba(0,212,255,0.08)]
              px-8 py-3.5
              text-sm md:text-base
              font-extrabold
              text-[rgba(0,212,255,0.95)]
              shadow-[0_0_18px_rgba(0,212,255,0.18)]"
            >
              <span
                className="inline-block h-2.5 w-2.5 md:h-3 md:w-3 rounded-full
                bg-[rgba(0,255,249,0.95)]
                shadow-[0_0_14px_rgba(0,255,249,0.3)]"
              />
              Deneyimler
            </div>

            {/* ✅ Profesyonel Süreç kaldırıldı */}
          </div>

          {/* Empty */}
          {safeItems.length === 0 ? (
            <div
              className="rounded-3xl border border-[rgba(255,255,255,0.06)]
              bg-[rgba(255,255,255,0.02)]
              p-12 text-center shadow-[var(--shadow-md)]"
            >
              <p className="text-sm font-semibold text-[rgba(255,255,255,0.65)]">
                Henüz deneyim eklenmemiş.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {safeItems.map((e, i) => {
                const bullets = splitLines(e?.bulletsText);
                const techs = splitLines(e?.technologiesText);

                return (
                  <article
                    key={e?.id ?? `${e?.role}-${e?.company}-${e?.startDate}-${i}`}
                    className={[
                      "group relative overflow-hidden rounded-3xl border",
                      "border-[rgba(255,255,255,0.06)]",
                      "bg-[rgba(0,0,0,0.65)]",
                      "shadow-[var(--shadow-lg)]",
                      "transition-all duration-300 hover:-translate-y-1",
                      "hover:border-[rgba(0,212,255,0.20)] hover:shadow-[var(--shadow-xl)]",
                      // ✅ kutular tok dursun
                      "min-h-[520px] md:min-h-[560px]",
                      // ✅ zigzag daha az
                      i % 2 === 1 ? "md:translate-y-2" : "",
                    ].join(" ")}
                  >
                    {/* soft neon background */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0
                      transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <div
                        className="absolute -inset-10
                        bg-[radial-gradient(circle_at_20%_10%,rgba(0,212,255,0.07),transparent_45%),
                            radial-gradient(circle_at_90%_90%,rgba(0,255,249,0.05),transparent_50%)]"
                      />
                    </div>

                    {/* padding arttı */}
                    <div className="relative p-7 md:p-8">
                      {/* Top */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="text-lg font-black md:text-xl leading-snug line-clamp-2">
                            <span
                              className="bg-gradient-to-r
                              from-white
                              via-[rgba(0,212,255,0.78)]
                              to-[rgba(0,255,249,0.7)]
                              bg-clip-text text-transparent"
                            >
                              {e?.role || "Pozisyon"}
                            </span>
                          </h3>

                          {/* Company + Location */}
                          <div className="mt-2.5 flex flex-wrap items-center gap-2">
                            {e?.company ? (
                              <span
                                className="inline-flex items-center gap-2
                                rounded-full
                                border border-[rgba(0,212,255,0.18)]
                                bg-[rgba(0,212,255,0.05)]
                                px-3 py-1
                                text-xs font-extrabold
                                text-[rgba(0,212,255,0.82)]"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-[rgba(0,212,255,0.75)]" />
                                {e.company}
                              </span>
                            ) : null}

                            {e?.location ? (
                              <span
                                className="inline-flex items-center gap-2
                                rounded-full
                                border border-[rgba(255,255,255,0.06)]
                                bg-[rgba(255,255,255,0.02)]
                                px-3 py-1
                                text-xs font-bold
                                text-[rgba(255,255,255,0.6)]
                                group-hover:text-[rgba(0,255,249,0.7)]"
                              >
                                📍 {e.location}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        {/* DATE */}
                        <span
                          className="shrink-0 rounded-full
                          border border-[rgba(0,212,255,0.18)]
                          bg-[rgba(0,212,255,0.05)]
                          px-4 py-1
                          text-xs font-black
                          text-[rgba(0,212,255,0.82)]"
                        >
                          {fmtRange(e)}
                        </span>
                      </div>

                      {/* Divider */}
                      <div
                        className="mt-6 h-px w-full
                        bg-gradient-to-r
                        from-transparent
                        via-[rgba(0,212,255,0.14)]
                        to-transparent"
                      />

                      {/* Description */}
                      {e?.description ? (
                        <p
                          className="mt-6 whitespace-pre-wrap text-sm
                          leading-relaxed
                          text-[rgba(255,255,255,0.65)]"
                        >
                          {e.description}
                        </p>
                      ) : null}

                      {/* Bullets */}
                      {bullets.length > 0 ? (
                        <div className="mt-7">
                          <div
                            className="mb-3.5 flex items-center gap-2
                            text-xs font-black
                            text-[rgba(255,255,255,0.75)]"
                          >
                            <span className="h-2 w-2 rounded-full bg-[rgba(0,212,255,0.7)]" />
                            Katkılarım
                          </div>

                          <ul className="space-y-3">
                            {bullets.map((line, idx) => (
                              <li
                                key={idx}
                                className="relative rounded-2xl
                                  border border-[rgba(255,255,255,0.06)]
                                  bg-[rgba(255,255,255,0.015)]
                                  px-4 py-3
                                  text-sm
                                  text-[rgba(255,255,255,0.64)]
                                  hover:border-[rgba(0,212,255,0.18)]
                                  hover:bg-[rgba(0,212,255,0.03)]"
                              >
                                <div
                                  className="absolute left-0 top-0 h-full w-1
                                  rounded-l-2xl
                                  bg-gradient-to-b
                                  from-[rgba(0,212,255,0.7)]
                                  to-[rgba(0,255,249,0.55)]"
                                />
                                <div className="flex gap-3">
                                  <span
                                    className="mt-0.5 inline-flex h-6 w-6
                                    items-center justify-center
                                    rounded-full
                                    border border-[rgba(0,212,255,0.18)]
                                    bg-[rgba(0,212,255,0.05)]
                                    text-[11px]
                                    font-black
                                    text-[rgba(0,212,255,0.8)]"
                                  >
                                    ✓
                                  </span>
                                  <span className="whitespace-pre-wrap leading-relaxed">
                                    {line}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {/* Tech */}
                      {techs.length > 0 ? (
                        <div className="mt-7">
                          <div
                            className="mb-3.5 flex items-center gap-2
                            text-xs font-black
                            text-[rgba(255,255,255,0.75)]"
                          >
                            <span className="h-2 w-2 rounded-full bg-[rgba(0,255,249,0.6)]" />
                            Teknolojiler
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {techs.map((t, idx) => (
                              <span
                                key={idx}
                                className="rounded-full
                                  border border-[rgba(0,212,255,0.16)]
                                  bg-[rgba(0,212,255,0.04)]
                                  px-3 py-1
                                  text-xs font-extrabold
                                  text-[rgba(0,212,255,0.8)]
                                  hover:text-[rgba(0,255,249,0.8)]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
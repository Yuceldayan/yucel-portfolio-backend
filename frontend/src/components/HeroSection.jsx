// src/components/HeroSection.jsx
import { useEffect, useMemo, useState } from "react";

export default function HeroSection({ projectsCount = 0 }) {
  const [mounted, setMounted] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  // ✅ Updated roles (all "Developer")
  const roles = useMemo(
    () => ["Full-Stack Developer", "Frontend Developer", "Backend Developer"],
    []
  );
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => setMounted(true), []);

  // Typing effect
  useEffect(() => {
    let timeout;
    const currentRole = roles[roleIndex];

    if (displayedText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, 70);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText("");
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 1600);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, roleIndex, roles]);

  return (
    <section
      id="home"
      className="
        relative overflow-hidden
        min-h-[80vh]
        flex items-start justify-center
      "
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div
          className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating Particles (stable positions) */}
        {useMemo(() => {
          const arr = Array.from({ length: 14 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 5}s`,
            duration: `${6 + Math.random() * 10}s`,
          }));
          return arr;
        }, []).map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-indigo-400/40 rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✅ boşluğu azalttık */}
        <div className="pt-10 sm:pt-12 md:pt-14 pb-6 sm:pb-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT */}
            <div className="space-y-7 sm:space-y-8">
              {/* Status Badge */}
              <div
                className={`inline-flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm transition-all duration-1000 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                <div className="relative">
                  <div className="h-3 w-3 rounded-full bg-green-400 animate-ping absolute" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <span className="text-xs sm:text-sm font-bold text-green-300">
                  Open to Opportunities
                </span>
                <span className="text-green-500/60">•</span>
                <span className="text-[11px] sm:text-xs font-semibold text-green-300/80">
                  Remote / On-site
                </span>
              </div>

              {/* Name */}
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight transition-all duration-1000 delay-200 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Yücel Dayan
              </h1>

              {/* Animated Role */}
              <div
                className={`transition-all duration-1000 delay-300 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 inline-block animate-gradient">
                    {displayedText}
                    <span className="animate-blink">|</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p
                className={`text-sm sm:text-base md:text-lg text-white/70 font-medium leading-relaxed transition-all duration-1000 delay-500 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Modern web teknolojileriyle ölçeklenebilir, hızlı ve kullanıcı odaklı dijital
                ürünler geliştiriyorum. Responsive arayüzler, güçlü kullanıcı deneyimi ve{" "}
                <span className="text-violet-400 font-bold">RESTful API</span> mimarileri üzerine
                odaklanıyorum.
              </p>

              {/* Social Links */}
              <div
                className={`flex items-center gap-3 sm:gap-4 transition-all duration-1000 delay-700 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <a
                  href="https://www.linkedin.com/in/yucel-dayan"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-white/60 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-indigo-300 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                <a
                  href="https://github.com/yuceldayan"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-white/60 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-violet-500/20 hover:border-violet-500/40 hover:text-violet-300 transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>

                <a
                  href="mailto:dayanyucel0304@gmail.com"
                  className="group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-white/60 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:text-emerald-300 transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                {/* Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-3xl opacity-20 blur-2xl" />

                <div className="relative space-y-7 sm:space-y-8">
                  <h3 className="text-sm sm:text-lg font-black text-white/90 uppercase tracking-wider">
                    Temel Teknolojiler
                  </h3>

                  {/* Frontend */}
                  <div className="space-y-3">
                    <h4 className="text-[11px] sm:text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      Frontend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Next.js", "Tailwind CSS"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-bold rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 hover:bg-indigo-500/20 hover:border-indigo-400/40 transition-all cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Backend */}
                  <div className="space-y-3">
                    <h4 className="text-[11px] sm:text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      Backend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Java Spring Boot", "Node.js", "Express.js"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-bold rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-200 hover:bg-violet-500/20 hover:border-violet-400/40 transition-all cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Database */}
                  <div className="space-y-3">
                    <h4 className="text-[11px] sm:text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Database
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["PostgreSQL", "MySQL", "MongoDB"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-bold rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 hover:bg-emerald-500/20 hover:border-emerald-400/40 transition-all cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator (sm+ only) */}
        <div
          className={`hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-900 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
              Scroll
            </span>
            <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-18px) translateX(10px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-float { animation: float ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .animate-blink { animation: blink 1s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

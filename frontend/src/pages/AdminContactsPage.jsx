// src/pages/AdminContactsPage.jsx
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { adminListContacts } from "../api/contact";

export default function AdminContactsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setMsg("");
    try {
      const res = await adminListContacts();
      setList(res.data?.data || []);
    } catch (e) {
      setMsg("❌ " + (e?.response?.data?.message || e?.message || "Hata"));
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const msgKind = useMemo(() => {
    if (!msg) return "info";
    if (msg.startsWith("❌")) return "danger";
    return "info";
  }, [msg]);

  const msgClass =
    msgKind === "danger"
      ? "border-red-500/25 bg-red-500/10 text-red-200"
      : "border-indigo-500/25 bg-indigo-500/10 text-indigo-200";

  return (
    <>
      <Helmet>
        <title>Admin • İletişim Mesajları | Yücel Dayan</title>

        {/* ✅ Admin sayfaları indexlenmesin */}
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />

        {/* opsiyonel */}
        <meta
          name="description"
          content="Admin paneli: iletişim mesajlarını görüntüleme."
        />
      </Helmet>

      <div className="min-h-screen">
        {/* Header */}
        <div
          className="
            relative overflow-hidden
            mb-8
            rounded-2xl border border-indigo-500/20
            bg-gradient-to-br from-indigo-500/10 to-violet-500/10
            p-6 sm:p-8
            shadow-[0_10px_30px_rgba(0,0,0,0.35)]
          "
        >
          <div
            className="
              pointer-events-none absolute inset-x-0 top-0 h-1
              bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500
              opacity-70
            "
          />
          <h1
            className="
              m-0
              text-3xl sm:text-4xl
              font-black tracking-tight
              bg-gradient-to-r from-white to-indigo-100
              bg-clip-text text-transparent
            "
          >
            📩 Admin Panel • İletişim Mesajları
          </h1>

          <div className="mt-2 text-sm font-semibold text-white/70">
            {loading ? "⏳ Yükleniyor..." : `Toplam mesaj: ${list.length}`}
          </div>

          <div className="mt-5">
            <button
              onClick={load}
              disabled={loading}
              className="
                inline-flex items-center justify-center gap-2
                rounded-xl border border-indigo-500/30
                bg-gradient-to-r from-indigo-500 to-violet-500
                px-5 py-3 text-sm font-extrabold text-white
                shadow-[0_14px_34px_rgba(99,102,241,0.28)]
                transition
                hover:-translate-y-[1px]
                disabled:cursor-not-allowed disabled:opacity-70
              "
            >
              🔄 Yenile
            </button>
          </div>

          {msg && (
            <div
              className={`mt-4 rounded-xl border px-4 py-3 text-sm font-bold ${msgClass}`}
            >
              {msg}
            </div>
          )}
        </div>

        {/* Empty */}
        {list.length === 0 && !loading ? (
          <div
            className="
              rounded-2xl border border-white/10
              bg-white/[0.04]
              p-12
              text-center
              shadow-[0_10px_30px_rgba(0,0,0,0.35)]
            "
          >
            <div className="text-5xl">📭</div>
            <p className="mt-3 text-sm font-semibold text-white/65">
              Henüz hiç iletişim mesajı yok.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {list.map((m, i) => (
              <div
                key={m.id || i}
                className="
                  relative overflow-hidden
                  rounded-2xl border border-white/10
                  bg-white/[0.04]
                  p-5
                  shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                "
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 opacity-60" />

                <div className="mb-2">
                  <div className="text-sm font-extrabold text-white">
                    {m.name || "İsimsiz"}
                  </div>
                  <div className="text-xs font-semibold text-white/60">
                    {m.email || "-"}
                  </div>
                </div>

                {m.subject && (
                  <div className="mb-1 text-xs font-bold text-indigo-200">
                    Konu: <span className="text-white/80">{m.subject}</span>
                  </div>
                )}

                <div className="text-sm font-semibold leading-relaxed text-white/75 whitespace-pre-wrap">
                  {m.message || m.content || "(Mesaj boş)"}
                </div>

                {m.createdAt && (
                  <div className="mt-3 text-[11px] font-bold text-white/50">
                    {String(m.createdAt).replace("T", " ").slice(0, 16)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// src/pages/AdminProjectsPage.jsx
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import {
  adminCreateProject,
  adminDeleteProject,
  adminUpdateProject,
} from "../api/projects";
import { api } from "../api/http";

const EMPTY = {
  title: "",
  shortDescription: "",
  longDescription: "",
  liveUrl: "",
  repoUrl: "",
  coverImageUrl: "",
  featuresText: "",
  technologiesText: "",
  displayOrder: "1", // ✅ admin sıralama (string tutuyoruz, payload’da Number’a çevireceğiz)
};

const linesToArray = (txt) =>
  (txt || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

const arrayToLines = (arr) => (Array.isArray(arr) ? arr.join("\n") : "");

export default function AdminProjectsPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const isEditing = useMemo(() => editingId != null, [editingId]);

  // ✅ Admin listesi admin endpoint’inden gelsin
  const load = async () => {
    const res = await api.get("/api/v1/admin/projects");
    setList(res.data?.data || []);
  };

  useEffect(() => {
    load().catch((e) => {
      setMsg(
        "❌ " + (e?.response?.data?.message || e?.message || "Liste yüklenemedi")
      );
    });
  }, []);

  const onChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title || "",
      shortDescription: p.shortDescription || "",
      longDescription: p.longDescription || "",
      liveUrl: p.liveUrl || "",
      repoUrl: p.repoUrl || "",
      coverImageUrl: p.coverImageUrl || "",
      featuresText: arrayToLines(p.features),
      technologiesText: arrayToLines(p.technologies),
      displayOrder: String(p.displayOrder ?? "1"),
    });
    setMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY);
    setMsg("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      if (
        !form.title.trim() ||
        !form.shortDescription.trim() ||
        !form.longDescription.trim()
      ) {
        throw new Error("⚠️ Title + Short Description + Long Description zorunlu");
      }

      // ✅ displayOrder normalize
      const orderNum = Number(form.displayOrder);
      if (!Number.isFinite(orderNum) || orderNum < 1) {
        throw new Error("⚠️ Sıra (displayOrder) en az 1 olmalı");
      }

      const payload = {
        title: form.title.trim(),
        shortDescription: form.shortDescription.trim(),
        longDescription: form.longDescription.trim(),
        liveUrl: form.liveUrl.trim() || null,
        repoUrl: form.repoUrl.trim() || null,
        coverImageUrl: form.coverImageUrl.trim() || null,
        features: linesToArray(form.featuresText),
        technologies: linesToArray(form.technologiesText),
        displayOrder: orderNum,
      };

      if (isEditing) {
        await adminUpdateProject(editingId, payload);
        setMsg("✅ Proje başarıyla güncellendi");
      } else {
        await adminCreateProject(payload);
        setMsg("✅ Proje başarıyla eklendi");
      }

      cancelEdit();
      await load();
    } catch (e2) {
      const text = e2?.message?.startsWith("⚠️")
        ? e2.message
        : "❌ " + (e2?.response?.data?.message || e2.message || "Hata");
      setMsg(text);
    } finally {
      setLoading(false);
    }
  };

  const del = async (id) => {
    if (!window.confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;

    setLoading(true);
    setMsg("");

    try {
      await adminDeleteProject(id);
      setMsg("🗑️ Proje silindi");
      await load();
      if (editingId === id) cancelEdit();
    } catch (e2) {
      setMsg("❌ " + (e2?.response?.data?.message || e2.message || "Hata"));
    } finally {
      setLoading(false);
    }
  };

  const msgKind = useMemo(() => {
    if (!msg) return "info";
    if (msg.startsWith("✅")) return "success";
    if (msg.startsWith("❌") || msg.startsWith("⚠️")) return "danger";
    return "info";
  }, [msg]);

  const msgClass =
    msgKind === "success"
      ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
      : msgKind === "danger"
      ? "border-red-500/25 bg-red-500/10 text-red-200"
      : "border-indigo-500/25 bg-indigo-500/10 text-indigo-200";

  return (
    <>
      <Helmet>
        <title>Admin • Projeler | Yücel Dayan</title>

        {/* ✅ Admin sayfaları Google’da görünmesin */}
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />

        {/* İstersen kalsın; şart değil ama zarar vermez */}
        <meta
          name="description"
          content="Admin paneli: proje ekleme, düzenleme ve silme işlemleri."
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
            🔧 Admin Panel • Projeler
          </h1>
          <p className="mt-2 text-sm font-semibold text-white/70">
            {isEditing
              ? `✏️ Düzenleme Modu (ID: ${editingId})`
              : "➕ Yeni Proje Oluşturma Modu"}
          </p>
        </div>

        {/* Form Section */}
        <div
          className="
            mb-8
            rounded-2xl border border-white/10
            bg-white/[0.04]
            p-6 sm:p-8
            shadow-[0_10px_30px_rgba(0,0,0,0.45)]
          "
        >
          <h2 className="m-0 mb-6 text-xl font-extrabold text-white">
            {isEditing ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
          </h2>

          <form onSubmit={submit} className="grid gap-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              {/* Title */}
              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm font-bold text-white/85">
                  Proje Başlığı <span className="text-red-300">*</span>
                </label>
                <input
                  className="
                    w-full rounded-xl border border-white/10
                    bg-white/[0.05]
                    px-4 py-3
                    text-sm font-semibold text-white
                    placeholder:text-white/40
                    outline-none transition
                    focus:border-indigo-500/40
                    focus:ring-2 focus:ring-indigo-500/40
                  "
                  placeholder="Örn: ACADEMIX"
                  value={form.title}
                  onChange={onChange("title")}
                  required
                />
              </div>

              {/* Display Order */}
              <div>
                <label className="mb-2 block text-sm font-bold text-white/85">
                  Sıra (Display Order) <span className="text-red-300">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  className="
                    w-full rounded-xl border border-white/10
                    bg-white/[0.05]
                    px-4 py-3
                    text-sm font-semibold text-white
                    placeholder:text-white/40
                    outline-none transition
                    focus:border-indigo-500/40
                    focus:ring-2 focus:ring-indigo-500/40
                  "
                  placeholder="1"
                  value={form.displayOrder}
                  onChange={onChange("displayOrder")}
                  required
                />
              </div>

              {/* Live URL */}
              <div>
                <label className="mb-2 block text-sm font-bold text-white/85">
                  Canlı URL
                </label>
                <input
                  className="
                    w-full rounded-xl border border-white/10
                    bg-white/[0.05]
                    px-4 py-3
                    text-sm font-semibold text-white
                    placeholder:text-white/40
                    outline-none transition
                    focus:border-indigo-500/40
                    focus:ring-2 focus:ring-indigo-500/40
                  "
                  placeholder="https://yuceldayan.com"
                  value={form.liveUrl}
                  onChange={onChange("liveUrl")}
                />
              </div>
            </div>

            {/* Repo + Cover */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Repo URL */}
              <div>
                <label className="mb-2 block text-sm font-bold text-white/85">
                  Repository URL
                </label>
                <input
                  className="
                    w-full rounded-xl border border-white/10
                    bg-white/[0.05]
                    px-4 py-3
                    text-sm font-semibold text-white
                    placeholder:text-white/40
                    outline-none transition
                    focus:border-indigo-500/40
                    focus:ring-2 focus:ring-indigo-500/40
                  "
                  placeholder="https://github.com/yuceldayan/..."
                  value={form.repoUrl}
                  onChange={onChange("repoUrl")}
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="mb-2 block text-sm font-bold text-white/85">
                  Cover Image URL
                </label>
                <input
                  className="
                    w-full rounded-xl border border-white/10
                    bg-white/[0.05]
                    px-4 py-3
                    text-sm font-semibold text-white
                    placeholder:text-white/40
                    outline-none transition
                    focus:border-indigo-500/40
                    focus:ring-2 focus:ring-indigo-500/40
                  "
                  placeholder="https://.../cover.png"
                  value={form.coverImageUrl}
                  onChange={onChange("coverImageUrl")}
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="mb-2 block text-sm font-bold text-white/85">
                Kart Açıklaması (Short) <span className="text-red-300">*</span>
              </label>
              <textarea
                className="
                  w-full rounded-xl border border-white/10
                  bg-white/[0.05]
                  px-4 py-3
                  text-sm font-semibold text-white
                  placeholder:text-white/40
                  outline-none transition
                  focus:border-indigo-500/40
                  focus:ring-2 focus:ring-indigo-500/40
                "
                style={{ minHeight: 90 }}
                placeholder="Kart üzerinde gözükecek kısa açıklama (1-2 cümle)."
                value={form.shortDescription}
                onChange={onChange("shortDescription")}
                required
              />
            </div>

            {/* Long Description */}
            <div>
              <label className="mb-2 block text-sm font-bold text-white/85">
                Modal Açıklaması (Long) <span className="text-red-300">*</span>
              </label>
              <textarea
                className="
                  w-full rounded-xl border border-white/10
                  bg-white/[0.05]
                  px-4 py-3
                  text-sm font-semibold text-white
                  placeholder:text-white/40
                  outline-none transition
                  focus:border-indigo-500/40
                  focus:ring-2 focus:ring-indigo-500/40
                "
                style={{ minHeight: 150 }}
                placeholder="Modalda gözükecek detaylı açıklama (3-10 cümle)."
                value={form.longDescription}
                onChange={onChange("longDescription")}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Features */}
              <div>
                <label className="mb-2 block text-sm font-bold text-white/85">
                  Features (her satır 1 madde)
                </label>
                <textarea
                  className="
                    w-full rounded-xl border border-white/10
                    bg-white/[0.05]
                    px-4 py-3
                    text-sm font-semibold text-white
                    placeholder:text-white/40
                    outline-none transition
                    focus:border-indigo-500/40
                    focus:ring-2 focus:ring-indigo-500/40
                  "
                  style={{ minHeight: 140 }}
                  placeholder={
                    "Örn:\nJWT Authentication\nAdmin panel\nFile upload\nRole-based access"
                  }
                  value={form.featuresText}
                  onChange={onChange("featuresText")}
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="mb-2 block text-sm font-bold text-white/85">
                  Technologies (her satır 1 teknoloji)
                </label>
                <textarea
                  className="
                    w-full rounded-xl border border-white/10
                    bg-white/[0.05]
                    px-4 py-3
                    text-sm font-semibold text-white
                    placeholder:text-white/40
                    outline-none transition
                    focus:border-indigo-500/40
                    focus:ring-2 focus:ring-indigo-500/40
                  "
                  style={{ minHeight: 140 }}
                  placeholder={"Örn:\nReact\nSpring Boot\nPostgreSQL\nJWT\nFlyway"}
                  value={form.technologiesText}
                  onChange={onChange("technologiesText")}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-end gap-3">
              {isEditing && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  disabled={loading}
                  className="
                    inline-flex items-center justify-center
                    rounded-xl border border-white/10
                    bg-white/[0.05]
                    px-4 py-3 text-sm font-extrabold text-white
                    transition
                    hover:-translate-y-[1px]
                    disabled:cursor-not-allowed disabled:opacity-60
                  "
                >
                  İptal
                </button>
              )}

              <button
                type="submit"
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
                {loading ? "⏳ İşleniyor..." : isEditing ? "💾 Güncelle" : "➕ Ekle"}
              </button>
            </div>

            {/* Message */}
            {msg && (
              <div className={`rounded-xl border px-4 py-3 text-sm font-bold ${msgClass}`}>
                {msg}
              </div>
            )}
          </form>
        </div>

        {/* Projects List */}
        <div>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <h2 className="m-0 text-2xl font-black text-white">
              📋 Tüm Projeler <span className="text-white/60">({list.length})</span>
            </h2>

            {isEditing && (
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-500/10 px-3 py-2 text-xs font-extrabold text-indigo-200">
                Düzenleniyor: #{editingId}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => {
              const active = editingId === p.id;

              return (
                <div
                  key={p.id}
                  className={[
                    "relative overflow-hidden rounded-2xl border p-5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition",
                    active
                      ? "border-indigo-500/40 bg-indigo-500/10"
                      : "border-white/10 bg-white/[0.04] hover:-translate-y-[2px] hover:border-indigo-500/25",
                  ].join(" ")}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 opacity-60" />

                  <div className="absolute right-4 top-4 rounded-full border border-indigo-500/30 bg-indigo-500/15 px-3 py-1 text-xs font-extrabold text-indigo-200">
                    #{p.id}
                  </div>

                  {/* displayOrder */}
                  <div className="mb-2 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-extrabold text-white/80">
                    Sıra: <span className="text-white">{p.displayOrder ?? "-"}</span>
                  </div>

                  <h3 className="mb-2 pr-14 text-lg font-extrabold text-white">{p.title}</h3>

                  <p className="mb-2 text-sm font-semibold leading-relaxed text-white/70">
                    <span className="text-white/50">Short:</span> {p.shortDescription || "-"}
                  </p>

                  <p className="mb-4 min-h-[60px] text-sm font-semibold leading-relaxed text-white/70 line-clamp-3">
                    <span className="text-white/50">Long:</span> {p.longDescription || "-"}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2 border-t border-white/10 pt-3">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          inline-flex items-center gap-2
                          rounded-lg border border-emerald-500/25
                          bg-emerald-500/10
                          px-3 py-1.5
                          text-xs font-extrabold text-emerald-200
                        "
                      >
                        🌐 Live
                      </a>
                    )}

                    {p.repoUrl && (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          inline-flex items-center gap-2
                          rounded-lg border border-slate-300/20
                          bg-slate-300/10
                          px-3 py-1.5
                          text-xs font-extrabold text-slate-200
                        "
                      >
                        📦 Repo
                      </a>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(p)}
                      disabled={loading}
                      className="
                        flex-1 rounded-xl border border-white/10
                        bg-white/[0.05]
                        px-4 py-2.5
                        text-sm font-extrabold text-white
                        transition
                        hover:-translate-y-[1px]
                        disabled:cursor-not-allowed disabled:opacity-60
                      "
                    >
                      ✏️ Düzenle
                    </button>

                    <button
                      onClick={() => del(p.id)}
                      disabled={loading}
                      className="
                        flex-1 rounded-xl border border-red-500/25
                        bg-red-500/10
                        px-4 py-2.5
                        text-sm font-extrabold text-red-200
                        transition
                        hover:-translate-y-[1px]
                        disabled:cursor-not-allowed disabled:opacity-60
                      "
                    >
                      🗑️ Sil
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {list.length === 0 && (
            <div
              className="
                mt-6
                rounded-2xl border border-white/10
                bg-white/[0.04]
                p-12
                text-center
                shadow-[0_10px_30px_rgba(0,0,0,0.35)]
              "
            >
              <div className="text-5xl">📭</div>
              <p className="mt-3 text-sm font-semibold text-white/65">
                Henüz proje eklenmemiş. Yukarıdaki formu kullanarak yeni proje
                ekleyebilirsiniz.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

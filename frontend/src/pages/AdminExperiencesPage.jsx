// src/pages/AdminExperiencesPage.jsx
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import {
  adminCreateExperience,
  adminDeleteExperience,
  adminListExperiences,
  adminUpdateExperience,
} from "../api/experiences";

const EMPTY = {
  role: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  published: true,
  orderIndex: 0,
  description: "",
  bulletsText: "",
  technologiesText: "",
};

export default function AdminExperiencesPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const isEditing = useMemo(() => editingId != null, [editingId]);

  const load = async () => {
    setLoading(true);
    setMsg("");
    try {
      const res = await adminListExperiences();
      const payload = res?.data?.data ?? res?.data ?? [];
      setList(Array.isArray(payload) ? payload : []);
    } catch (e) {
      setMsg(e?.response?.data?.message || e?.message || "Liste alınamadı");
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      role: item.role || "",
      company: item.company || "",
      location: item.location || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      isCurrent: !!item.isCurrent,
      published: item.published !== false,
      orderIndex: item.orderIndex ?? 0,
      description: item.description || "",
      bulletsText: item.bulletsText || "",
      technologiesText: item.technologiesText || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setEditingId(null);
    setForm(EMPTY);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const payload = {
        ...form,
        role: (form.role || "").trim(),
        company: (form.company || "").trim(),
        location: (form.location || "").trim(),
        startDate: (form.startDate || "").trim(),
        endDate: (form.endDate || "").trim(),
        // orderIndex number kalsın
        orderIndex: Number(form.orderIndex) || 0,
      };

      if (!payload.role) throw new Error("Pozisyon (role) zorunlu");
      if (!payload.company) throw new Error("Firma (company) zorunlu");

      // isCurrent true ise endDate boş olsun
      if (payload.isCurrent) payload.endDate = "";

      if (isEditing) await adminUpdateExperience(editingId, payload);
      else await adminCreateExperience(payload);

      setMsg(isEditing ? "Güncellendi ✅" : "Eklendi ✅");
      reset();
      await load();
    } catch (err) {
      setMsg(err?.response?.data?.message || err?.message || "İşlem başarısız");
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Silinsin mi?")) return;
    setLoading(true);
    setMsg("");

    try {
      await adminDeleteExperience(id);
      setMsg("Silindi ✅");
      if (editingId === id) reset();
      await load();
    } catch (err) {
      setMsg(err?.response?.data?.message || err?.message || "Silinemedi");
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/40";
  const cardCls = "rounded-2xl border border-white/10 bg-white/[0.04] p-6";
  const btnGhost =
    "rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-bold text-white/85 hover:bg-white/[0.06] transition";
  const btnPrimary =
    "flex-1 rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-black disabled:opacity-60";
  const btnDanger =
    "rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-200 hover:bg-red-500/15 transition";

  return (
    <>
      <Helmet>
        <title>Admin • Deneyimler | Yücel Dayan</title>

        {/* ✅ Admin sayfaları indexlenmesin */}
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />

        {/* (opsiyonel) */}
        <meta
          name="description"
          content="Admin paneli: deneyim ekleme, güncelleme ve silme işlemleri."
        />
      </Helmet>

      <div className="px-6 py-10 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[420px_1fr]">
          {/* FORM */}
          <div className={cardCls}>
            <h1 className="text-xl font-extrabold text-white">
              {isEditing ? "Deneyim Güncelle" : "Deneyim Ekle"}
            </h1>

            {msg ? <p className="mt-2 text-sm text-white/70">{msg}</p> : null}

            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              <input
                className={inputCls}
                placeholder="Pozisyon (role) *"
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              />

              <input
                className={inputCls}
                placeholder="Firma (company) *"
                value={form.company}
                onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
              />

              <input
                className={inputCls}
                placeholder="Konum (opsiyonel)"
                value={form.location}
                onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="month"
                  className={inputCls}
                  value={form.startDate}
                  onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
                />

                <input
                  type="month"
                  className={`${inputCls} disabled:opacity-50`}
                  value={form.endDate}
                  disabled={form.isCurrent}
                  onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-white/80">
                  <input
                    type="checkbox"
                    checked={form.isCurrent}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        isCurrent: e.target.checked,
                        endDate: e.target.checked ? "" : p.endDate,
                      }))
                    }
                  />
                  Devam ediyor
                </label>

                <label className="flex items-center gap-2 text-sm text-white/80">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, published: e.target.checked }))
                    }
                  />
                  Yayında
                </label>
              </div>

              <input
                type="number"
                className={inputCls}
                placeholder="Sıralama (orderIndex)"
                value={form.orderIndex}
                onChange={(e) =>
                  setForm((p) => ({ ...p, orderIndex: Number(e.target.value) }))
                }
              />

              <textarea
                className={`${inputCls} min-h-[120px]`}
                placeholder="Açıklama (sınır yok)"
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              />

              <textarea
                className={`${inputCls} min-h-[140px]`}
                placeholder={"Maddeler (her satır 1 madde)\nSınır yok"}
                value={form.bulletsText}
                onChange={(e) => setForm((p) => ({ ...p, bulletsText: e.target.value }))}
              />

              <textarea
                className={`${inputCls} min-h-[120px]`}
                placeholder={"Teknolojiler (her satır 1 teknoloji)\nSınır yok"}
                value={form.technologiesText}
                onChange={(e) =>
                  setForm((p) => ({ ...p, technologiesText: e.target.value }))
                }
              />

              <div className="flex gap-3 pt-2">
                <button disabled={loading} className={btnPrimary}>
                  {loading ? "İşleniyor..." : isEditing ? "Güncelle" : "Ekle"}
                </button>

                <button type="button" onClick={reset} className={btnGhost}>
                  Temizle
                </button>
              </div>
            </form>
          </div>

          {/* LIST */}
          <div className={cardCls}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-white">Kayıtlar</h2>
              <button onClick={load} className={btnGhost}>
                Yenile
              </button>
            </div>

            {list.length === 0 ? (
              <p className="text-sm text-white/70">
                Henüz deneyim yok. Soldan ekleyebilirsin.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {list.map((e) => (
                  <div
                    key={e.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-extrabold text-white">{e.role}</p>
                        <p className="text-sm text-white/70">
                          {e.company} {e.location ? `• ${e.location}` : ""}
                        </p>
                        <p className="mt-1 text-xs text-white/50">
                          {e.startDate || "—"}{" "}
                          {e.isCurrent ? "→ Devam" : e.endDate ? `→ ${e.endDate}` : ""}
                          {" • "}#{e.orderIndex ?? 0}
                          {" • "}{e.published ? "Yayında" : "Gizli"}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(e)}
                          className="rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-bold text-white/85 hover:bg-white/[0.06] transition"
                        >
                          Düzenle
                        </button>
                        <button onClick={() => onDelete(e.id)} className={btnDanger}>
                          Sil
                        </button>
                      </div>
                    </div>

                    {e.description ? (
                      <p className="mt-3 line-clamp-4 whitespace-pre-wrap text-sm text-white/75">
                        {e.description}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

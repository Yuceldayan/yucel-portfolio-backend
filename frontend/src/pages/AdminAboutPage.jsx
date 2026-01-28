// src/pages/AdminAboutPage.jsx
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { getAboutAdmin, updateAboutAdmin } from "../api/about";

const empty = {
  title: "Hakkımda",
  subtitle: "",
  bio: "",
  highlights: [],
  stats: "[]",
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

function arrToText(arr) {
  return (arr || []).join("\n");
}
function textToArr(text) {
  return (text || "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const [form, setForm] = useState(empty);

  // textarea helper alanları
  const [highlightsText, setHighlightsText] = useState("");
  const [educationTagsText, setEducationTagsText] = useState("");
  const [goalsTagsText, setGoalsTagsText] = useState("");
  const [techFrontendText, setTechFrontendText] = useState("");
  const [techBackendText, setTechBackendText] = useState("");
  const [techToolsText, setTechToolsText] = useState("");

  useEffect(() => {
    setLoading(true);
    setErr("");
    setOk("");

    getAboutAdmin()
      .then((res) => {
        const a = res?.data?.data || null;
        const merged = { ...empty, ...(a || {}) };

        setForm(merged);

        setHighlightsText(arrToText(merged.highlights));
        setEducationTagsText(arrToText(merged.educationTags));
        setGoalsTagsText(arrToText(merged.goalsTags));
        setTechFrontendText(arrToText(merged.techFrontend));
        setTechBackendText(arrToText(merged.techBackend));
        setTechToolsText(arrToText(merged.techTools));
      })
      .catch((e) => {
        setErr(e?.response?.data?.message || e?.message || "About verisi alınamadı");
      })
      .finally(() => setLoading(false));
  }, []);

  const statsIsValid = useMemo(() => {
    try {
      JSON.parse(form.stats || "[]");
      return true;
    } catch {
      return false;
    }
  }, [form.stats]);

  const onChange = (key) => (ev) => {
    setOk("");
    setErr("");
    setForm((p) => ({ ...p, [key]: ev.target.value }));
  };

  const onSave = async () => {
    setSaving(true);
    setErr("");
    setOk("");

    // textarea -> array alanları
    const payload = {
      ...form,
      highlights: textToArr(highlightsText),
      educationTags: textToArr(educationTagsText),
      goalsTags: textToArr(goalsTagsText),
      techFrontend: textToArr(techFrontendText),
      techBackend: textToArr(techBackendText),
      techTools: textToArr(techToolsText),
      stats: (form.stats || "[]").trim(),
    };

    // stats json kontrol
    try {
      JSON.parse(payload.stats || "[]");
    } catch {
      setSaving(false);
      setErr('Stats alanı geçerli JSON değil. Örn: [{"value":"6+","label":"Canlı Proje"}]');
      return;
    }

    try {
      const res = await updateAboutAdmin(payload);
      const updated = res?.data?.data || payload;
      setOk("Kaydedildi ✅");

      // günceli state'e yaz
      const merged = { ...empty, ...updated };
      setForm(merged);

      setHighlightsText(arrToText(merged.highlights));
      setEducationTagsText(arrToText(merged.educationTags));
      setGoalsTagsText(arrToText(merged.goalsTags));
      setTechFrontendText(arrToText(merged.techFrontend));
      setTechBackendText(arrToText(merged.techBackend));
      setTechToolsText(arrToText(merged.techTools));
    } catch (e) {
      setErr(e?.response?.data?.message || e?.message || "Kaydetme başarısız");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Admin • Hakkımda | Yücel Dayan</title>
          <meta name="robots" content="noindex, nofollow, noarchive" />
          <meta name="googlebot" content="noindex, nofollow, noarchive" />
          <meta
            name="description"
            content="Admin paneli: hakkımda alanını düzenleme."
          />
        </Helmet>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="text-white/70">Yükleniyor...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin • Hakkımda | Yücel Dayan</title>

        {/* ✅ Admin sayfaları indexlenmesin */}
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />

        {/* opsiyonel */}
        <meta
          name="description"
          content="Admin paneli: hakkımda alanını düzenleme."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Admin Panel • Hakkımda
            </h1>
            <p className="text-white/50 text-sm mt-1">
              Bu sayfadaki veriler ana sayfadaki AboutSection’ı besler.
            </p>
          </div>

          <button
            onClick={onSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-cyan-600/80 hover:bg-cyan-600 text-white font-bold disabled:opacity-60"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>

        {err && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200">
            {err}
          </div>
        )}
        {ok && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-200">
            {ok}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sol */}
          <div className="bg-black/60 border border-white/10 rounded-xl p-5 space-y-4">
            <h2 className="text-white font-bold text-lg">Genel</h2>

            <label className="block">
              <div className="text-white/60 text-xs mb-1">Title</div>
              <input
                value={form.title}
                onChange={onChange("title")}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
              />
            </label>

            <label className="block">
              <div className="text-white/60 text-xs mb-1">Subtitle</div>
              <input
                value={form.subtitle}
                onChange={onChange("subtitle")}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
              />
            </label>

            <label className="block">
              <div className="text-white/60 text-xs mb-1">Bio</div>
              <textarea
                rows={5}
                value={form.bio}
                onChange={onChange("bio")}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
              />
            </label>

            <label className="block">
              <div className="text-white/60 text-xs mb-1">
                Highlights (her satır 1 madde)
              </div>
              <textarea
                rows={5}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
              />
            </label>

            <label className="block">
              <div className="text-white/60 text-xs mb-1">
                Stats (JSON){" "}
                <span className={statsIsValid ? "text-emerald-300" : "text-red-300"}>
                  {statsIsValid ? "✓ geçerli" : "✗ hatalı"}
                </span>
              </div>
              <textarea
                rows={6}
                value={form.stats}
                onChange={onChange("stats")}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none font-mono text-xs"
                placeholder='[{"value":"6+","label":"Canlı Proje","gradient":"from-cyan-500 to-blue-500"}]'
              />
            </label>
          </div>

          {/* Sağ */}
          <div className="bg-black/60 border border-white/10 rounded-xl p-5 space-y-6">
            <div className="space-y-3">
              <h2 className="text-white font-bold text-lg">Eğitim</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <div className="text-white/60 text-xs mb-1">School</div>
                  <input
                    value={form.educationSchool}
                    onChange={onChange("educationSchool")}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
                  />
                </label>

                <label className="block">
                  <div className="text-white/60 text-xs mb-1">Department</div>
                  <input
                    value={form.educationDepartment}
                    onChange={onChange("educationDepartment")}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <div className="text-white/60 text-xs mb-1">Year</div>
                  <input
                    value={form.educationYear}
                    onChange={onChange("educationYear")}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <div className="text-white/60 text-xs mb-1">Education Desc</div>
                <textarea
                  rows={4}
                  value={form.educationDesc}
                  onChange={onChange("educationDesc")}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
                />
              </label>

              <label className="block">
                <div className="text-white/60 text-xs mb-1">
                  Education Tags (her satır 1 tag)
                </div>
                <textarea
                  rows={4}
                  value={educationTagsText}
                  onChange={(e) => setEducationTagsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
                />
              </label>
            </div>

            <div className="space-y-3">
              <h2 className="text-white font-bold text-lg">Hedefler</h2>

              <label className="block">
                <div className="text-white/60 text-xs mb-1">Goals Desc</div>
                <textarea
                  rows={4}
                  value={form.goalsDesc}
                  onChange={onChange("goalsDesc")}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
                />
              </label>

              <label className="block">
                <div className="text-white/60 text-xs mb-1">
                  Goals Tags (her satır 1 tag)
                </div>
                <textarea
                  rows={4}
                  value={goalsTagsText}
                  onChange={(e) => setGoalsTagsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
                />
              </label>
            </div>

            <div className="space-y-3">
              <h2 className="text-white font-bold text-lg">Tech Stack</h2>

              <label className="block">
                <div className="text-white/60 text-xs mb-1">
                  Frontend (her satır 1 teknoloji)
                </div>
                <textarea
                  rows={4}
                  value={techFrontendText}
                  onChange={(e) => setTechFrontendText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
                />
              </label>

              <label className="block">
                <div className="text-white/60 text-xs mb-1">
                  Backend (her satır 1 teknoloji)
                </div>
                <textarea
                  rows={4}
                  value={techBackendText}
                  onChange={(e) => setTechBackendText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
                />
              </label>

              <label className="block">
                <div className="text-white/60 text-xs mb-1">
                  Tools (her satır 1 teknoloji)
                </div>
                <textarea
                  rows={4}
                  value={techToolsText}
                  onChange={(e) => setTechToolsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-cyan-600/80 hover:bg-cyan-600 text-white font-bold disabled:opacity-60"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    </>
  );
}

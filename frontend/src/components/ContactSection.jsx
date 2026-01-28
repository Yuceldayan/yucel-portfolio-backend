// src/components/ContactSection.jsx
import { useState } from "react";
import { sendContact } from "../api/contact";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      await sendContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err?.response?.data?.message || err?.message || "Mesaj gönderilemedi."
      );
      setTimeout(() => setStatus(""), 4000);
    }
  };

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="scroll-mt-24 pt-0 pb-2 md:pb-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-cyan-400 inline-block px-8 py-3 border border-cyan-400/20 rounded-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-sm shadow-lg shadow-cyan-500/10">
            İletişim
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-auto">
          {/* FORM - Large Card */}
          <div className="md:col-span-2 lg:col-span-2 md:row-span-2">
            <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-5 md:p-6 backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-cyan-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">İletişim Formu</h3>
                    <p className="text-sm text-white/50">Detaylı bilgi için formu doldurun</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="group/input">
                      <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wider">
                        İsim
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-purple-500/50 focus:bg-black/70 focus:outline-none transition-all group-hover/input:border-white/20"
                        placeholder="Ad Soyad"
                        disabled={status === "sending"}
                      />
                    </div>

                    <div className="group/input">
                      <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wider">
                        E-posta
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-purple-500/50 focus:bg-black/70 focus:outline-none transition-all group-hover/input:border-white/20"
                        placeholder="ornek@email.com"
                        disabled={status === "sending"}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="group/input">
                    <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wider">
                      Konu
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-purple-500/50 focus:bg-black/70 focus:outline-none transition-all group-hover/input:border-white/20"
                      placeholder="Proje konusu veya başlığı"
                      disabled={status === "sending"}
                    />
                  </div>

                  {/* Message */}
                  <div className="group/input">
                    <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wider">
                      Mesaj
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-purple-500/50 focus:bg-black/70 focus:outline-none transition-all resize-none group-hover/input:border-white/20"
                      placeholder="Proje detaylarınızı, beklentilerinizi ve ihtiyaçlarınızı buraya yazabilirsiniz..."
                      disabled={status === "sending"}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-4 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {status === "sending" && (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Gönderiliyor...
                      </>
                    )}
                    {status === "success" && (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Gönderildi!
                      </>
                    )}
                    {status !== "sending" && status !== "success" && (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        Mesajı Gönder
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {status === "success" && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-400">
                          Mesajınız başarıyla iletildi
                        </p>
                        <p className="text-xs text-green-400/70">
                          En kısa sürede size geri dönüş yapacağım.
                        </p>
                      </div>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-red-400">
                          Mesaj gönderilemedi
                        </p>
                        <p className="text-xs text-red-400/70">
                          {errorMsg || "Lütfen daha sonra tekrar deneyiniz."}
                        </p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* EMAIL CARD */}
          <div className="group hover:scale-[1.02] transition-transform duration-300">
            <div className="block h-full rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/3 to-transparent p-4 md:p-5 backdrop-blur-xl hover:border-cyan-500/15 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>

              <div className="flex flex-col h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/8 flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                    E-Posta
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <a
                      href="mailto:dayanyucel0304@gmail.com"
                      className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors break-all flex-1"
                    >
                      dayanyucel0304@gmail.com
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("dayanyucel0304@gmail.com");
                      }}
                      className="w-8 h-8 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/40 flex items-center justify-center transition-all flex-shrink-0"
                      title="Kopyala"
                      type="button"
                    >
                      <svg
                        className="w-4 h-4 text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-xs text-white/50 mb-3">
                    İş birliği • Soru • Görüşme için
                  </p>
                </div>

                <div className="mt-auto pt-3 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-cyan-400">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>24 saatte dönüş</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-semibold text-cyan-400">
                      Web App
                    </span>
                    <span className="px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-semibold text-cyan-400">
                      API
                    </span>
                    <span className="px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-semibold text-cyan-400">
                      Dashboard
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PHONE CARD */}
          <div className="group hover:scale-[1.02] transition-transform duration-300">
            <div className="block h-full rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/3 to-transparent p-4 md:p-5 backdrop-blur-xl hover:border-purple-500/15 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

              <div className="flex flex-col h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/8 flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>

                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                    Telefon
                  </p>
                  <a
                    href="tel:+905411579158"
                    className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors block mb-3"
                  >
                    +90 541 157 91 58
                  </a>

                  <p className="text-xs text-white/50 mb-2">Hafta içi 10:00 - 19:00</p>
                  <p className="text-xs text-purple-400 font-semibold mb-3">WhatsApp daha hızlı ⚡</p>
                </div>

                <div className="mt-auto pt-3 border-t border-white/5 flex gap-2">
                  <a
                    href="tel:+905411579158"
                    className="flex-1 px-3 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 text-xs font-semibold text-purple-400 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Ara
                  </a>

                  <a
                    href="https://wa.me/905411579158"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500/40 text-xs font-semibold text-green-400 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* STATUS CARD - Wide */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="h-full rounded-3xl border border-green-500/8 bg-gradient-to-br from-green-500/3 to-transparent p-4 md:p-5 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-500/5 rounded-full blur-3xl -z-10"></div>

              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping"></div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">Yeni Projeler İçin Açığım</h3>
                    <p className="text-sm text-white/60">Proje ve iş birliklerine açığım.</p>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                    Hizmetler
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <svg
                        className="w-3.5 h-3.5 text-green-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Modern Frontend UI/UX</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <svg
                        className="w-3.5 h-3.5 text-green-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Spring Boot REST API</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <svg
                        className="w-3.5 h-3.5 text-green-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Admin Panel & Dashboard</span>
                    </div>
                  </div>
                </div>

                {/* Process */}
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">
                    Nasıl Çalışıyoruz?
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400 flex-shrink-0">
                        1
                      </span>
                      <span className="text-xs text-white/80">Tanışma & Fikir Paylaşımı</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400 flex-shrink-0">
                        2
                      </span>
                      <span className="text-xs text-white/80">Planlama & Yol Haritası</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400 flex-shrink-0">
                        3
                      </span>
                      <span className="text-xs text-white/80">Geliştirme & Yayınlama</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                    <svg
                      className="w-3.5 h-3.5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-semibold text-green-400">5+ Canlı Proje</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                    <svg
                      className="w-3.5 h-3.5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-semibold text-green-400">24 Saat Dönüş</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                    <svg
                      className="w-3.5 h-3.5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-xs font-semibold text-green-400">Remote & On-site</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOCATION CARD */}
          <div className="group hover:scale-[1.02] transition-transform duration-300">
            <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/3 to-transparent p-4 md:p-5 backdrop-blur-xl hover:border-orange-500/15 transition-all duration-300 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -z-10"></div>

              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>

                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                    Konum
                  </p>
                  <p className="text-sm font-semibold text-white mb-1">Hakkari, Türkiye</p>
                  <p className="text-xs text-white/50 mb-3">GMT+3 (İstanbul)</p>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <p className="text-xs text-white/50">Uzaktan çalışmaya müsait</p>
                </div>
              </div>
            </div>
          </div>

          {/* SOCIAL LINKS CARD */}
          <div className="group hover:scale-[1.02] transition-transform duration-300">
            <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-pink-500/3 to-transparent p-4 md:p-5 backdrop-blur-xl hover:border-pink-500/15 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl -z-10"></div>

              <div className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/8 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">
                    Profesyonel Ağ
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://github.com/yuceldayan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all"
                      title="GitHub"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/yucel-dayan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all"
                      title="LinkedIn"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
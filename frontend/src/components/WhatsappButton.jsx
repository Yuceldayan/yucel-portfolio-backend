// src/components/WhatsappButton.jsx
import { useEffect, useMemo, useState } from "react";


export default function WhatsappButton() {
  const phone = "905411579158";

  const message = useMemo(
    () =>
      encodeURIComponent(
        "Merhaba Yücel, portfolyonu inceledim. İletişime geçmek istiyorum."
      ),
    []
  );

  const href = useMemo(
    () => `https://wa.me/${phone}?text=${message}`,
    [phone, message]
  );

  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`wa-float ${visible ? "wa-show" : ""}`}
      aria-label="WhatsApp ile iletişime geç"
      title="WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <span className="wa-ripple" aria-hidden="true" />
      <span className="wa-ripple wa-ripple-delay" aria-hidden="true" />

      <span className={`wa-tip ${hovered ? "wa-tip-show" : ""}`}>
        <span className="wa-tip-main">WhatsApp&apos;tan yaz</span>
        <span className="wa-tip-sub">
          <span className="wa-status-dot" />
          Çevrimiçi
        </span>
      </span>

      <span className="wa-icon-wrapper">
        <svg
          className="wa-ic"
          viewBox="0 0 32 32"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M19.11 17.31c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.31.2-.58.07-.27-.14-1.14-.42-2.17-1.33-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.56.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.46h-.52c-.18 0-.47.07-.71.34-.25.27-.93.91-.93 2.22s.95 2.58 1.08 2.76c.14.18 1.87 2.86 4.53 4.01.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.6-.65 1.83-1.28.22-.63.22-1.17.16-1.28-.07-.12-.25-.18-.52-.32zM16.02 3C8.84 3 3 8.84 3 16.02c0 2.29.6 4.5 1.74 6.44L3 29l6.71-1.72A12.97 12.97 0 0 0 16.02 29C23.2 29 29 23.2 29 16.02 29 8.84 23.2 3 16.02 3zm0 23.7c-2.07 0-4.1-.56-5.88-1.62l-.42-.25-3.98 1.02 1.06-3.88-.27-.4a10.67 10.67 0 0 1-1.67-5.76c0-5.9 4.8-10.7 10.7-10.7 5.9 0 10.7 4.8 10.7 10.7 0 5.9-4.8 10.69-10.7 10.69z"
          />
        </svg>

       
      </span>
    </a>
  );
}

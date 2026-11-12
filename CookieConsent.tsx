import React, { useEffect, useRef, useState } from "react";
import { analyticsConsentChoice, setAnalyticsConsent, trackEvent } from "./analytics";

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => analyticsConsentChoice() === null);
  const [scrollRequest, setScrollRequest] = useState(0);
  const panelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const openPreferences = () => {
      setVisible(true);
      setScrollRequest((current) => current + 1);
    };
    window.addEventListener("automata:open-cookie-settings", openPreferences);
    return () => window.removeEventListener("automata:open-cookie-settings", openPreferences);
  }, []);

  useEffect(() => {
    if (visible && scrollRequest > 0) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [visible, scrollRequest]);

  const choose = (accepted: boolean) => {
    setAnalyticsConsent(accepted);
    setVisible(false);
    if (accepted) trackEvent("page_view");
  };

  if (!visible) return null;

  return (
    <aside ref={panelRef} aria-label="Preferencias de cookies" className="mx-auto my-4 w-[calc(100%-2rem)] max-w-[620px] rounded-2xl border border-[#E8E6E1] bg-white p-5 shadow-lg">
      <p className="text-sm font-extrabold text-[#0E1116]">Tu privacidad importa</p>
      <p className="mt-2 text-xs leading-relaxed text-[#5A6068]">Usamos una cookie necesaria para recordar esta elección. Si aceptas, también guardaremos analítica básica y anónima sobre visitas e interacciones. No almacenamos el texto de tus conversaciones ni tu dirección IP en nuestra base de analítica.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => choose(false)} className="min-h-10 rounded-full border border-[#E8E6E1] px-4 text-xs font-bold text-[#0E1116]">Rechazar analíticas</button>
        <button type="button" onClick={() => choose(true)} className="min-h-10 rounded-full bg-[#FF5A00] px-4 text-xs font-bold text-white">Aceptar analíticas</button>
      </div>
    </aside>
  );
}

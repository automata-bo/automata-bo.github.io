import React, { useEffect, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import logoWhite from "./assets/automataW.svg";
import { ServiceType } from "./ExpandingServiceModal";

type Props = {
  isOpen: boolean;
  origin: { x: number; y: number } | null;
  onClose: () => void;
  onSelectService?: (service: ServiceType) => void;
};

export default function UnlmtdMenu({ isOpen, origin, onClose, onSelectService }: Props) {
  const [rendered, setRendered] = useState(false);
  const [animatingIn, setAnimatingIn] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      setTimeStr(`${hours}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setRendered(true);
      setAnimatingIn(false);
      // Timeout garantiza que el navegador renderice circle(0%) antes de comenzar la expansión
      const openTimer = setTimeout(() => {
        setAnimatingIn(true);
      }, 40);
      document.body.style.overflow = "hidden";
      return () => clearTimeout(openTimer);
    } else {
      setAnimatingIn(false);
      const timer = setTimeout(() => {
        setRendered(false);
        document.body.style.overflow = "";
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!rendered) return null;

  const clickX = origin ? `${origin.x}px` : "95%";
  const clickY = origin ? `${origin.y}px` : "36px";

  const handleLinkClick = (href: string, sectionTargetId?: string) => {
    onClose();
    const isHome =
      window.location.pathname === "/" ||
      window.location.pathname === "" ||
      window.location.pathname === "/index.html";

    setTimeout(() => {
      if (sectionTargetId && isHome) {
        const target =
          document.getElementById(sectionTargetId) ||
          document.querySelector(`.${sectionTargetId}`);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      if (href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target && isHome) {
          target.scrollIntoView({ behavior: "smooth" });
          return;
        }
        window.location.href = "/" + href;
        return;
      }
      window.location.href = href;
    }, 300);
  };

  return (
    <div
      className={`unlmtd-menu-overlay ${animatingIn ? "is-open" : ""}`}
      style={{
        clipPath: animatingIn
          ? `circle(150% at ${clickX} ${clickY})`
          : `circle(0% at ${clickX} ${clickY})`,
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal de navegación"
    >
      {/* Top bar */}
      <header className="unlmtd-menu-header">
        <a href="/" onClick={(e) => { e.preventDefault(); onClose(); }} className="inline-flex items-center">
          <img src={logoWhite} alt="AUTOMATA" className="h-[24px] w-auto sm:h-[28px]" />
        </a>
        <button
          onClick={onClose}
          className="unlmtd-menu-close-btn flex items-center gap-2 group"
          aria-label="Cerrar menú"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-white/70 group-hover:text-white transition-colors">
            CERRAR
          </span>
          <X size={20} className="text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </header>

      {/* Main navigation rows (Exact Studio UNLMTD style) */}
      <nav className="unlmtd-menu-nav">
        {/* 01 PROYECTOS */}
        <div
          onClick={() => handleLinkClick("/#proyectos", "proyectos")}
          className="unlmtd-menu-row group"
        >
          <div className="unlmtd-menu-row-inner">
            <span className="unlmtd-menu-num">01</span>
            <div className="unlmtd-menu-title-wrap">
              <span className="unlmtd-menu-title">PROYECTOS.</span>
              <span className="unlmtd-menu-subtitle">Explora prototipos y experiencias en desarrollo.</span>
            </div>
            <ArrowUpRight size={28} className="unlmtd-menu-arrow opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
        </div>

        {/* 02 SERVICIOS */}
        <div
          onClick={() => handleLinkClick("/#divisiones", "divisiones")}
          className="unlmtd-menu-row group"
        >
          <div className="unlmtd-menu-row-inner">
            <span className="unlmtd-menu-num">02</span>
            <div className="unlmtd-menu-title-wrap">
              <span className="unlmtd-menu-title">SERVICIOS.</span>
              <span className="unlmtd-menu-subtitle">Digital, Experiences y Studio. De la idea al resultado.</span>
            </div>
            <ArrowUpRight size={28} className="unlmtd-menu-arrow opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
        </div>

        {/* 03 STUDIO. */}
        <div
          onClick={() => handleLinkClick("/studio/", "divisiones")}
          className="unlmtd-menu-row group"
        >
          <div className="unlmtd-menu-row-inner">
            <span className="unlmtd-menu-num">03</span>
            <div className="unlmtd-menu-title-wrap">
              <span className="unlmtd-menu-title unlmtd-menu-gradient-title">STUDIO.</span>
              <span className="unlmtd-menu-subtitle">Dirección creativa, producción audiovisual y arte visual.</span>
            </div>
            <ArrowUpRight size={28} className="unlmtd-menu-arrow opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-[#ec4899]" />
          </div>
        </div>

        {/* 04 CONTACTO */}
        <div
          onClick={() => handleLinkClick("/#contacto", "auto-contact")}
          className="unlmtd-menu-row group"
        >
          <div className="unlmtd-menu-row-inner">
            <span className="unlmtd-menu-num">04</span>
            <div className="unlmtd-menu-title-wrap">
              <span className="unlmtd-menu-title">CONTACTO.</span>
              <span className="unlmtd-menu-subtitle">Conversemos sobre tu visión y cómo construirla.</span>
            </div>
            <ArrowUpRight size={28} className="unlmtd-menu-arrow opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
        </div>

        {/* Secondary MORPH */}
        <div
          onClick={() => handleLinkClick("/#morph", "morph")}
          className="unlmtd-menu-row secondary group"
        >
          <div className="unlmtd-menu-row-inner">
            <span className="unlmtd-menu-num"></span>
            <div className="unlmtd-menu-title-wrap">
              <span className="unlmtd-menu-title text-3xl sm:text-4xl text-white/80 group-hover:text-white">MORPH.</span>
              <span className="unlmtd-menu-subtitle">Asistentes inteligentes para Web y WhatsApp Business.</span>
            </div>
            <ArrowUpRight size={22} className="unlmtd-menu-arrow opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </nav>

      {/* Bottom Bar */}
      <footer className="unlmtd-menu-footer">
        <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/50 flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <span>DIRECCIÓN HUMANA · ACELERACIÓN IA.</span>
          <span className="hidden sm:inline text-white/20">—</span>
          <span>TARIJA, BOLIVIA · 2026</span>
        </div>
        <div className="flex items-center gap-5 font-mono text-[11px] text-white/60">
          <span>Tarija, {timeStr || "14:15"}</span>
          <span className="text-white/20">|</span>
          <span className="font-bold text-white tracking-widest cursor-pointer hover:text-[var(--accent)]">
            ES / EN
          </span>
        </div>
      </footer>
    </div>
  );
}

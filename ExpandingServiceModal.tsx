import React, { useEffect, useState, useRef } from "react";
import { X, ArrowRight, ArrowUpRight, MessageCircle, Bot, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { DigitalExperience, ExperiencesExperience, StudioExperience, ProjectsExperience, ContactExperience } from "./ImmersiveSections";
import WeddingInvitationDemo from "./WeddingInvitationDemo";
import DigitalStorytellingDemo from "./DigitalStorytellingDemo";
import MorphWhatsAppDemo from "./MorphWhatsAppDemo";
import DigitalCafeDemo from "./DigitalCafeDemo";
import logoHeader from "./assets/automata.svg";
import logoWhite from "./assets/automataW.svg";
import BilingualText from "./BilingualText";

export type ServiceType =
  | "digital"
  | "experiences"
  | "studio"
  | "morph-assistant"
  | "morph-whatsapp"
  | "demo-whatsapp"
  | "demo-cafe"
  | "projects"
  | "contact"
  | "demo-invitacion"
  | "demo-storytelling"
  | null;

type Props = {
  activeService: ServiceType;
  origin: { x: number; y: number } | null;
  onClose: () => void;
};

/* ─── MORPH ASSISTANT (WEB & APPS) SHOWCASE ──────── */
function MorphAssistantExperience() {
  const openChat = () => {
    window.dispatchEvent(
      new CustomEvent("automata:open-chat", {
        detail: { mode: "explore", source: "morph-assistant", text: "Hola, me interesa conocer más sobre MORPH Web Assistant." }
      })
    );
  };

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 text-[#0d1117]">
      {/* Hero */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#ff5c1a] bg-[#ff5c1a]/10 px-4 py-1.5 rounded-full inline-block mb-6">
          01 / WEB &amp; APPS — MORPH ASSISTANT
        </span>
        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.92] text-[#0d1117] uppercase">
          Tu asistente inteligente.<br />
          <span className="text-[#ff5c1a]">En tu propio espacio digital.</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-[#444] leading-relaxed max-w-2xl mx-auto">
          Un asistente IA integrado de forma nativa en tu sitio web o aplicación móvil. Atiende consultas 24/7, guía a los visitantes y califica intenciones sin intermediarios.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={openChat}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d1117] text-white text-sm font-bold shadow-lg hover:bg-[#ff5c1a] transition-colors"
          >
            <span>Probar asistente en vivo</span>
            <Bot size={18} />
          </button>
          <a
            href="/contacto/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#0d1117]/20 text-[#0d1117] text-sm font-bold hover:bg-[#0d1117]/5 transition-colors"
          >
            <span>Solicitar integración</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Grid de Capacidades */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="p-8 rounded-3xl bg-[#f8f9fb] border border-[#0d1117]/10 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#ff5c1a]/15 text-[#ff5c1a] grid place-items-center mb-6 font-mono font-bold text-lg">
              01
            </div>
            <h3 className="font-display font-bold text-2xl mb-3 text-[#0d1117]">Base de Conocimiento Propia</h3>
            <p className="text-sm text-[#555] leading-relaxed">
              Alimentado exclusivamente con tu catálogo, políticas, preguntas frecuentes y tono de voz de tu empresa. Jamás inventa datos fuera de tu contexto.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#0d1117]/10 text-xs font-mono text-[#ff5c1a] font-bold flex items-center gap-1.5">
            <CheckCircle2 size={14} /> INFORMACIÓN VERIFICABLE
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[#f8f9fb] border border-[#0d1117]/10 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#2563ff]/15 text-[#2563ff] grid place-items-center mb-6 font-mono font-bold text-lg">
              02
            </div>
            <h3 className="font-display font-bold text-2xl mb-3 text-[#0d1117]">Captura de Leads y Contexto</h3>
            <p className="text-sm text-[#555] leading-relaxed">
              Identifica la necesidad del cliente y recopila datos esenciales (presupuesto, fecha, requerimientos) para transferirlo listo a tu equipo comercial.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#0d1117]/10 text-xs font-mono text-[#2563ff] font-bold flex items-center gap-1.5">
            <CheckCircle2 size={14} /> SIN PÉRDIDA DE CLIENTES
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[#f8f9fb] border border-[#0d1117]/10 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#7c3aed]/15 text-[#7c3aed] grid place-items-center mb-6 font-mono font-bold text-lg">
              03
            </div>
            <h3 className="font-display font-bold text-2xl mb-3 text-[#0d1117]">Handoff Humano Fluido</h3>
            <p className="text-sm text-[#555] leading-relaxed">
              En cualquier momento la persona puede solicitar atención con un asesor humano y el sistema genera una síntesis instantánea en WhatsApp o email.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#0d1117]/10 text-xs font-mono text-[#7c3aed] font-bold flex items-center gap-1.5">
            <ShieldCheck size={14} /> CONTROL TOTAL
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MORPH WHATSAPP SHOWCASE ───────────────────── */
function MorphWhatsAppExperience() {
  const openChat = () => {
    window.dispatchEvent(
      new CustomEvent("automata:open-chat", {
        detail: { mode: "proposal", source: "morph-whatsapp", text: "Hola, quiero saber cómo funciona MORPH en WhatsApp Business." }
      })
    );
  };

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 text-[#0d1117]">
      {/* Hero */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#25d366] bg-[#25d366]/15 px-4 py-1.5 rounded-full inline-block mb-6">
          02 / WHATSAPP BUSINESS — MORPH WHATSAPP
        </span>
        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.92] text-[#0d1117] uppercase">
          Tu negocio activo.<br />
          <span className="text-[#25d366]">En cada conversación de WhatsApp.</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-[#444] leading-relaxed max-w-2xl mx-auto">
          Asistente inteligente para la cuenta oficial de WhatsApp Business de tu empresa. Responde de inmediato, organiza pedidos y canaliza la atención sin perder el control humano.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={openChat}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d1117] text-white text-sm font-bold shadow-lg hover:bg-[#25d366] transition-colors"
          >
            <span>Conversar sobre tu WhatsApp</span>
            <MessageCircle size={18} />
          </button>
          <a
            href="/contacto/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#0d1117]/20 text-[#0d1117] text-sm font-bold hover:bg-[#0d1117]/5 transition-colors"
          >
            <span>Ver planes de implementación</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Flujo WhatsApp */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#f8f9fb] border border-[#0d1117]/10 mb-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl mb-8 text-[#0d1117] text-center">
          ¿Cómo transforma tu canal de WhatsApp?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-[#25d366] text-white flex-shrink-0 grid place-items-center font-bold text-sm">1</span>
              <div>
                <strong className="block text-base text-[#0d1117]">Respuesta en menos de 3 segundos</strong>
                <p className="text-sm text-[#555] mt-1">Se acabaron las esperas de horas que hacen que el cliente busque a tu competencia.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-[#25d366] text-white flex-shrink-0 grid place-items-center font-bold text-sm">2</span>
              <div>
                <strong className="block text-base text-[#0d1117]">Catálogo y cotizaciones al instante</strong>
                <p className="text-sm text-[#555] mt-1">Presenta productos, disponibilidad y enlaces directos de pago con total precisión.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-[#25d366] text-white flex-shrink-0 grid place-items-center font-bold text-sm">3</span>
              <div>
                <strong className="block text-base text-[#0d1117]">Organización y etiquetado automático</strong>
                <p className="text-sm text-[#555] mt-1">Clasifica chats por interés, producto o estado de venta para que tu equipo ejecute con claridad.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#0d1117]/12 shadow-md">
            <div className="flex items-center gap-3 pb-4 border-b border-[#0d1117]/10 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#25d366] text-white grid place-items-center font-bold">A</div>
              <div>
                <strong className="block text-sm text-[#0d1117]">AUTOMATA MORPH Bot</strong>
                <span className="text-[11px] text-[#25d366] font-medium">En línea · Verificado</span>
              </div>
            </div>
            <div className="space-y-3 font-sans text-xs">
              <div className="bg-[#f0f2f5] p-3 rounded-lg rounded-tl-none max-w-[85%] text-[#111]">
                Hola! 👋 Bienvenido a AUTOMATA. ¿Te gustaría conocer nuestras soluciones digitales o agendar una llamada con el equipo?
              </div>
              <div className="bg-[#d9fdd3] p-3 rounded-lg rounded-tr-none ml-auto max-w-[85%] text-[#111]">
                Quisiera integrar un asistente en el WhatsApp de mi negocio de gastronomía.
              </div>
              <div className="bg-[#f0f2f5] p-3 rounded-lg rounded-tl-none max-w-[85%] text-[#111]">
                Excelente opción para restaurantes. MORPH puede gestionar reservas, mostrar menú con fotos y confirmar pedidos 24/7. ¿Prefieres ver una demo en video o hablar con un asesor humano?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExpandingServiceModal({ activeService, origin, onClose }: Props) {
  const [rendered, setRendered] = useState(false);
  const [animatingIn, setAnimatingIn] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeService) {
      setRendered(true);
      setAnimatingIn(false);
      setContentReady(false);
      setScrolled(false);

      // Timeout garantiza que el navegador renderice la forma en 0% antes de comenzar la expansión
      const openTimer = setTimeout(() => {
        setAnimatingIn(true);
      }, 40);

      // Velocidad reducida y fluida: la forma se expande majestuosamente durante ~1.2s antes de armar el contenido
      const contentTimer = setTimeout(() => {
        setContentReady(true);
      }, 920);

      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(openTimer);
        clearTimeout(contentTimer);
      };
    } else {
      setContentReady(false);
      setAnimatingIn(false);
      const timer = setTimeout(() => {
        setRendered(false);
        document.body.style.overflow = "";
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [activeService]);

  // Listener de scroll dentro del modal para encoger el logo y el header
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 20);
  };

  if (!rendered) return null;

  const clickX = origin ? `${origin.x}px` : "50%";
  const clickY = origin ? `${origin.y}px` : "50%";

  // Geometría según la ficha seleccionada:
  // Digital: CÍRCULO
  // Experiences: CUADRADO
  // Studio: TRIÁNGULO
  // Morph Assistant: HEXÁGONO
  // Morph WhatsApp: DIAMANTE / ROMBO
  // Projects / Contact: CÍRCULO SUAVE
  const getClipPath = () => {
    if (activeService === "digital") {
      return animatingIn
        ? `circle(160% at ${clickX} ${clickY})`
        : `circle(0% at ${clickX} ${clickY})`;
    }
    if (activeService === "experiences") {
      return animatingIn
        ? `polygon(-25% -25%, 125% -25%, 125% 125%, -25% 125%)`
        : `polygon(${clickX} ${clickY}, ${clickX} ${clickY}, ${clickX} ${clickY}, ${clickX} ${clickY})`;
    }
    if (activeService === "studio") {
      return animatingIn
        ? `polygon(50% -120%, -120% 220%, 220% 220%)`
        : `polygon(${clickX} ${clickY}, ${clickX} ${clickY}, ${clickX} ${clickY})`;
    }
    if (activeService === "morph-assistant") {
      return animatingIn
        ? `polygon(50% -60%, 160% 0%, 160% 100%, 50% 160%, -60% 100%, -60% 0%)`
        : `polygon(${clickX} ${clickY}, ${clickX} ${clickY}, ${clickX} ${clickY}, ${clickX} ${clickY}, ${clickX} ${clickY}, ${clickX} ${clickY})`;
    }
    if (activeService === "morph-whatsapp") {
      return animatingIn
        ? `polygon(-60% 50%, 50% -60%, 160% 50%, 50% 160%)`
        : `polygon(${clickX} ${clickY}, ${clickX} ${clickY}, ${clickX} ${clickY}, ${clickX} ${clickY})`;
    }
    return animatingIn ? `circle(160% at ${clickX} ${clickY})` : `circle(0% at ${clickX} ${clickY})`;
  };

  const isDemo =
    activeService === "demo-invitacion" ||
    activeService === "demo-storytelling" ||
    activeService === "morph-whatsapp" ||
    activeService === "demo-whatsapp" ||
    activeService === "demo-cafe";

  const getShapeLabel = () => {
    if (activeService === "digital") return "◯ FIGURA: CÍRCULO";
    if (activeService === "experiences") return "▢ FIGURA: CUADRADO";
    if (activeService === "studio") return "△ FIGURA: TRIÁNGULO";
    if (activeService === "morph-assistant") return "⬡ FIGURA: HEXÁGONO";
    if (activeService === "morph-whatsapp" || activeService === "demo-whatsapp") return "◇ DEMO: MORPH WHATSAPP";
    if (activeService === "demo-invitacion") return "◯ DEMO: INVITACIÓN & RSVP";
    if (activeService === "demo-storytelling") return "◯ DEMO: DIGITAL STORYTELLING";
    if (activeService === "demo-cafe") return "◯ DEMO: DIGITAL CAFÉ EXPERIENCE";
    return "◯ VENTANA EXPANDIDA";
  };

  return (
    <div
      ref={modalScrollRef}
      onScroll={handleScroll}
      className={`service-white-modal-overlay ${isDemo ? "is-demo-dark" : ""}`}
      style={{
        clipPath: getClipPath(),
        background: isDemo ? "#070a0e" : "#ffffff",
        color: isDemo ? "#f0ede8" : "#080808"
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Detalle del servicio o demostración"
    >
      {/* Barra superior con fondo dinámico y reducción de logo al hacer scroll */}
      <header
        className={`service-white-modal-header transition-all duration-300 ease-out ${
          scrolled ? "is-scrolled" : "is-expanded"
        } ${isDemo ? "header-demo-dark" : ""}`}
        style={{
          background: isDemo ? (scrolled ? "rgba(7,10,14,0.95)" : "rgba(7,10,14,0.9)") : undefined,
          borderBottomColor: isDemo ? "rgba(255,255,255,0.1)" : undefined
        }}
      >
        <div className="service-white-modal-header-inner">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="inline-flex items-center"
          >
            <img
              src={isDemo ? logoWhite : logoHeader}
              alt="AUTOMATA"
              className={`w-auto object-contain transition-all duration-300 ease-out ${
                scrolled
                  ? "h-[22px] max-w-[170px] sm:h-[26px]"
                  : "h-[34px] max-w-[220px] sm:h-[42px]"
              }`}
            />
          </a>

          <div className="flex items-center gap-4">
            <span
              className={`font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] hidden md:inline ${
                isDemo ? "text-white/60" : "text-[#666]"
              }`}
            >
              {getShapeLabel()}
            </span>
            <button
              onClick={onClose}
              className="service-white-modal-close-btn group flex items-center gap-2"
              aria-label="Cerrar y volver a la sección principal"
            >
              <span className={`font-mono text-xs font-bold tracking-widest ${isDemo ? "text-white" : "text-[#111]"}`}>VOLVER</span>
              <X size={18} className={`${isDemo ? "text-white" : "text-[#111]"} group-hover:rotate-90 transition-transform duration-300`} />
            </button>
          </div>
        </div>
      </header>

      {/* Contenido que se arma fluidamente cuando la cortina llena la pantalla */}
      <div
        className={`service-white-modal-content transition-all duration-600 ease-out ${
          contentReady ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-6"
        }`}
      >
        {activeService === "digital" && <DigitalExperience />}
        {activeService === "experiences" && <ExperiencesExperience />}
        {activeService === "studio" && <StudioExperience />}
        {activeService === "morph-assistant" && <MorphAssistantExperience />}
        {(activeService === "morph-whatsapp" || activeService === "demo-whatsapp") && (
          <MorphWhatsAppDemo onClose={onClose} />
        )}
        {activeService === "projects" && <ProjectsExperience />}
        {activeService === "contact" && <ContactExperience />}
        {activeService === "demo-invitacion" && <WeddingInvitationDemo onClose={onClose} />}
        {activeService === "demo-storytelling" && <DigitalStorytellingDemo onClose={onClose} />}
        {activeService === "demo-cafe" && <DigitalCafeDemo onClose={onClose} />}
      </div>
    </div>
  );
}

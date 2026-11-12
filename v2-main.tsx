import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Bot, Camera, CheckCircle2, Clapperboard, Code2, Heart, Menu, MessageCircle, MonitorSmartphone, QrCode, Sparkles, Workflow, X } from "lucide-react";
import LegacyDigital from "./App";
import ChatWidget from "./ChatWidget";
import CookieConsent from "./CookieConsent";
import NewsletterSignup from "./NewsletterSignup";
import { trackEvent } from "./analytics";
import logoFull from "./assets/automata.svg";
import ImmersiveHome from "./ImmersiveHome";
import { DigitalExperience, ExperiencesExperience, StudioExperience, ProjectsExperience, ContactExperience } from "./ImmersiveSections";

type PageKey = "home" | "digital" | "experiences" | "studio" | "projects" | "contact";
const nav = [
  { label: "Digital", href: "/digital/" },
  { label: "Experiences", href: "/experiences/" },
  { label: "Studio", href: "/studio/" },
  { label: "Proyectos", href: "/proyectos/" },
  { label: "Contacto", href: "/contacto/" },
];
const pageMeta: Record<PageKey, { eyebrow: string; title: string; description: string }> = {
  home: { eyebrow: "Digital Experiences & Intelligent Solutions", title: "Diseñamos experiencias digitales y soluciones inteligentes.", description: "Tecnología, creatividad e inteligencia aplicadas a experiencias y soluciones digitales." },
  digital: { eyebrow: "AUTOMATA DIGITAL", title: "Soluciones digitales para necesidades reales.", description: "Diseñamos y construimos sitios, sistemas, asistentes y automatizaciones que conectan tecnología con trabajo cotidiano." },
  experiences: { eyebrow: "AUTOMATA EXPERIENCES", title: "Experiencias que conectan personas y momentos.", description: "Creamos experiencias digitales, físicas e híbridas para celebrar, compartir y participar." },
  studio: { eyebrow: "AUTOMATA STUDIO", title: "Ideas que toman forma.", description: "Producción audiovisual, fotografía, campañas y creación híbrida con herramientas digitales e inteligencia artificial." },
  projects: { eyebrow: "TRABAJO Y EXPLORACIÓN", title: "Capacidades que se pueden explorar.", description: "Una selección transparente de demostraciones, prototipos y proyectos que iremos publicando con contexto y estado." },
  contact: { eyebrow: "HABLEMOS", title: "Toda buena solución empieza entendiendo el problema.", description: "Cuéntanos qué quieres conseguir. Primero escuchamos; después proponemos el camino adecuado." },
};
const divisions = [
  { key: "digital" as const, title: "Digital", line: "Construimos soluciones digitales.", description: "Sitios web, aplicaciones, asistentes, automatización e integraciones.", href: "/digital/", icon: MonitorSmartphone, number: "01" },
  { key: "experiences" as const, title: "Experiences", line: "Creamos experiencias memorables.", description: "Invitaciones, experiencias para eventos, álbumes colaborativos y recorridos interactivos.", href: "/experiences/", icon: Heart, number: "02" },
  { key: "studio" as const, title: "Studio", line: "Producimos comunicación y contenido.", description: "Audiovisual, fotografía, campañas y producción creativa asistida por IA.", href: "/studio/", icon: Clapperboard, number: "03" },
];
function openChatWithSource(source: PageKey) {
  window.dispatchEvent(new CustomEvent("automata:open-chat", { detail: { source } }));
}
function openChatWithProduct(source: PageKey, productId: string, action: "explore" | "experience" | "proposal" = "explore") {
  window.dispatchEvent(new CustomEvent("automata:open-chat", { detail: { source, productId, action } }));
}
function currentPage(): PageKey {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/digital") return "digital";
  if (path === "/experiences") return "experiences";
  if (path === "/studio") return "studio";
  if (path === "/proyectos") return "projects";
  if (path === "/contacto") return "contact";
  return "home";
}
function Header({ page }: { page: PageKey }) {
  const [open, setOpen] = useState(false);
  const openAssistant = () => openChatWithSource(page);
  return <header className="sticky top-0 z-50 border-b border-[#E8E6E1] bg-white/95 backdrop-blur">
    <div className="mx-auto flex h-[76px] max-w-[1220px] items-center justify-between gap-4 px-5 sm:px-8">
      <a href="/" aria-label="AUTOMATA, inicio" className="shrink-0"><img src={logoFull} alt="AUTOMATA" className="h-11 w-auto sm:h-12" /></a>
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
        {nav.map(item => <a key={item.href} href={item.href} aria-current={window.location.pathname.replace(/\/+$/, "") === item.href.replace(/\/+$/, "") ? "page" : undefined} className="text-sm font-semibold text-[#5A6068] transition hover:text-[#FF5A00]">{item.label}</a>)}
      </nav>
      <div className="flex items-center gap-2">
        <button onClick={openAssistant} className="hidden min-h-11 items-center gap-2 rounded-full bg-[#FF5A00] px-5 text-sm font-bold text-white transition hover:bg-[#E14E00] sm:flex">Conversemos <ArrowUpRight size={16}/></button>
        <button onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E6E1] lg:hidden">{open ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
    </div>
    {open && <nav className="border-t border-[#E8E6E1] bg-white px-5 py-3 lg:hidden" aria-label="Navegación móvil">
      {nav.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={window.location.pathname.replace(/\/+$/, "") === item.href.replace(/\/+$/, "") ? "page" : undefined} className="flex min-h-12 items-center border-b border-[#E8E6E1] text-sm font-semibold last:border-0">{item.label}</a>)}
      <button onClick={() => { setOpen(false); openAssistant(); }} className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#FF5A00] text-sm font-bold text-white">Conversemos <ArrowUpRight size={16}/></button>
    </nav>}
  </header>;
}
function Footer() {
  return <footer className="border-t border-[#E8E6E1] bg-white">
    <div className="mx-auto flex max-w-[1220px] flex-col gap-5 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between">
      <a href="/" className="display text-xl tracking-tight">AUTOMATA<span className="text-[#FF5A00]">.</span></a>
      <p className="max-w-md text-sm leading-relaxed text-[#5A6068]">Digital Experiences & Intelligent Solutions. Tecnología, creatividad e inteligencia aplicadas a experiencias y soluciones digitales.</p>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#5A6068]">
        {nav.map(item => <a key={item.href} href={item.href} className="hover:text-[#FF5A00]">{item.label}</a>)}
        <button type="button" onClick={() => window.dispatchEvent(new Event("automata:open-cookie-settings"))} className="text-left hover:text-[#FF5A00]">Preferencias de cookies</button>
      </div>
      <NewsletterSignup/>
    </div>
    <div className="border-t border-[#E8E6E1] py-4 text-center text-xs text-[#8A8F96]">© {new Date().getFullYear()} AUTOMATA. Tecnología con intención.</div>
  </footer>;
}
function Hero({ page }: { page: PageKey }) {
  const meta = pageMeta[page];
  const openAssistant = () => openChatWithSource(page);
  return <section className="relative overflow-hidden bg-[#0E1116] text-white">
    <div className="pointer-events-none absolute -right-32 -top-32 h-[440px] w-[440px] rounded-full border border-white/10" />
    <div className="pointer-events-none absolute -right-12 -top-12 h-[280px] w-[280px] rounded-full border border-[#FF5A00]/30" />
    <div className="mx-auto max-w-[1220px] px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.22em] text-[#FF7A36]"><span className="h-2 w-2 rounded-full bg-[#FF5A00]"/>{meta.eyebrow}</p>
      <h1 className="display mt-7 max-w-[980px] text-[clamp(2.8rem,7vw,6.6rem)] leading-[.98]">{meta.title}</h1>
      <p className="mt-7 max-w-[660px] text-base leading-relaxed text-white/65 sm:text-lg">{meta.description}</p>
      <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row" data-chat-launcher-suppress>
        {page === "home" ? <a href="#divisiones" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FF5A00] px-7 text-sm font-bold text-white hover:bg-[#E14E00]">Explorar lo que hacemos <ArrowRight size={18}/></a> : <button onClick={openAssistant} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FF5A00] px-7 text-sm font-bold text-white hover:bg-[#E14E00]">Conversemos sobre tu proyecto <ArrowRight size={18}/></button>}
        {page === "home" && <button onClick={openAssistant} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/25 px-7 text-sm font-bold text-white hover:bg-white/10">Iniciar una conversación <Bot size={18}/></button>}
      </div>
    </div>
    <div className="h-1 w-full bg-gradient-to-r from-[#FF5A00] via-[#FF8A4C] to-transparent"/>
  </section>;
}
function HomePage() { return <ImmersiveHome/>; }
function DigitalPage() { return <DigitalExperience/>; }
function ExperiencesPage() { return <ExperiencesExperience/>; }
function StudioPage() { return <StudioExperience/>; }
function ProjectsPage() { return <ProjectsExperience/>; }
function ContactPage() { return <ContactExperience/>; }
export default function V2App() {
  const page = currentPage();
  useEffect(() => { if (window.location.pathname.replace(/\/+$/, "") !== "/demos") trackEvent("page_view"); }, []);
  if (window.location.pathname.replace(/\/+$/, "") === "/demos") return <LegacyDigital/>;
  return <div className="showroom-site min-h-screen overflow-x-clip bg-[#090b0f] text-white"><Header page={page}/><CookieConsent/><main>{page === "home" ? <HomePage/> : page === "digital" ? <DigitalPage/> : page === "experiences" ? <ExperiencesPage/> : page === "studio" ? <StudioPage/> : page === "projects" ? <ProjectsPage/> : <ContactPage/>}</main><Footer/><ChatWidget/></div>;
}

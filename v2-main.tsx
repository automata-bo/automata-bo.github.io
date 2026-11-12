import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Bot, Camera, CheckCircle2, Clapperboard, Code2, Heart, Menu, MessageCircle, MonitorSmartphone, QrCode, Sparkles, Workflow, X } from "lucide-react";
import LegacyDigital from "./App";
import ChatWidget from "./ChatWidget";
import CookieConsent from "./CookieConsent";
import NewsletterSignup from "./NewsletterSignup";
import { trackEvent } from "./analytics";
import logoFull from "./assets/42a5f50319bf92a6-automataF.png";
import ImmersiveHome from "./ImmersiveHome";

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
      <a href="/" aria-label="AUTOMATA, inicio" className="shrink-0"><img src={logoFull} alt="AUTOMATA" className="h-9 w-auto sm:h-10" /></a>
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
function DigitalPage() {
  const items = [
    [Code2,"Sitios y experiencias web","Presencia digital clara, rápida y pensada para orientar consultas.","web-presence"],
    [MonitorSmartphone,"Aplicaciones y sistemas","Herramientas a medida para ordenar información y procesos.","business-automation"],
    [Bot,"Asistentes digitales","Atención inicial en web y mensajería, con reglas y transferencia humana.","digital-assistants"],
    [Workflow,"Automatización e integraciones","Conectamos tareas repetitivas y sistemas cuando aporta valor.","business-automation"],
    [Sparkles,"IA aplicada","Clasificación, asistencia y generación con supervisión y límites claros.","digital-assistants"],
  ] as const;
  return <><Hero page="digital"/><section className="mx-auto max-w-[1220px] px-5 py-20 sm:px-8"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(([Icon,title,desc,productId])=><article key={title} className="flex flex-col rounded-3xl border border-[#E8E6E1] p-7"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF1E8] text-[#FF5A00]"><Icon size={24}/></span><h2 className="mt-7 text-xl font-extrabold">{title}</h2><p className="mt-3 text-sm leading-relaxed text-[#5A6068]">{desc}</p><div className="mt-6 flex flex-wrap gap-4"><button onClick={()=>openChatWithProduct("digital",productId,"explore")} className="automata-learn-bubble"><MessageCircle size={15}/> Saber más</button><button onClick={()=>openChatWithProduct("digital",productId,"proposal")} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#0E1116] hover:text-[#FF5A00]">Solicitar propuesta <ArrowUpRight size={16}/></button></div></article>)}</div>
    <div className="mt-14 rounded-[28px] bg-[#0E1116] p-8 text-white sm:p-12"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#FF7A36]">Explora el funcionamiento</p><h2 className="display mt-4 max-w-2xl text-4xl sm:text-5xl">Prueba nuestras demostraciones interactivas.</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65">Los ejemplos actuales de restaurante, consultorio y peluquería son simulaciones. Sirven para explorar flujos, no para registrar operaciones reales.</p><a href="/demos/" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#FF5A00] px-6 text-sm font-bold text-white">Abrir demos <ArrowUpRight size={17}/></a></div>
  </section></>;
}
function ExperiencesPage() {
  return <><Hero page="experiences"/><section className="mx-auto max-w-[1220px] px-5 py-20 sm:px-8"><div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
    <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#FF5A00]">Producto en desarrollo · Bodas y celebraciones</p><h2 className="display mt-4 text-4xl sm:text-5xl">Un álbum que todos ayudan a crear.</h2><p className="mt-5 text-base leading-relaxed text-[#5A6068]">Una experiencia personalizada para que los invitados compartan fotografías del evento y la pareja pueda reunir esos recuerdos en un álbum comunitario.</p>
      <div className="mt-8 flex flex-wrap gap-3"><button onClick={()=>openChatWithProduct("experiences","event-experience","explore")} className="automata-learn-bubble"><MessageCircle size={15}/> Saber más</button><button onClick={()=>openChatWithProduct("experiences","event-experience","proposal")} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#E8E6E1] px-6 text-sm font-bold text-[#0E1116] transition hover:border-[#FF5A00] hover:text-[#FF5A00]">Solicitar propuesta <ArrowUpRight size={17}/></button><a href="/experiences/demo/" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#0E1116] px-6 text-sm font-bold text-white transition hover:bg-[#FF5A00]">Ver experiencia <ArrowUpRight size={17}/></a></div>
      <ul className="mt-7 space-y-4">{[{icon:<QrCode size={22}/>,title:"Acceso mediante QR",desc:"Tarjetas y puntos de acceso para que los invitados participen."},{icon:<Camera size={22}/>,title:"Fotografías compartidas",desc:"Un recorrido sencillo para aportar imágenes desde el teléfono."},{icon:<Heart size={22}/>,title:"Álbum comunitario",desc:"Una colección personalizada para los novios y sus invitados."}].map(item=><li key={item.title} className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF1E8] text-[#FF5A00]">{item.icon}</span><span><strong className="block text-sm">{item.title}</strong><span className="mt-1 block text-sm text-[#5A6068]">{item.desc}</span></span></li>)}</ul>
    </div>
    <div className="rounded-[30px] bg-[#FFF1E8] p-8 sm:p-10"><div className="mx-auto flex max-w-sm flex-col items-center rounded-[24px] border border-[#F2D9CA] bg-white p-8 text-center shadow-sm"><span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF5A00] text-white"><QrCode size={34}/></span><p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-[#FF5A00]">Un día para recordar</p><h3 className="display mt-3 text-3xl">Tu celebración</h3><p className="mt-3 text-sm text-[#5A6068]">Un ejemplo conceptual de experiencia para bodas.</p><div className="mt-6 grid h-32 w-32 grid-cols-5 gap-1 rounded-lg bg-[#F4F3F0] p-2">{Array.from({length:25},(_,i)=><span key={i} className={((i*7+i%3)%5<2)?"bg-[#0E1116]":"bg-white"}/>)}</div><span className="mt-4 text-[10px] text-[#8A8F96]">Representación gráfica, no código QR funcional</span></div></div>
  </div><div className="mt-12 flex gap-3 rounded-2xl border border-[#E8E6E1] p-5 text-sm leading-relaxed text-[#5A6068]"><CheckCircle2 className="mt-0.5 shrink-0 text-[#FF5A00]" size={20}/><p>Antes de ofrecerlo como servicio cerrado definiremos consentimiento de los invitados, privacidad del álbum, capacidad de almacenamiento, tiempo de conservación y forma de entrega.</p></div></section></>;
}
function StudioPage() {
  const lines: [string,string,string][] = [
    ["Producción audiovisual","Videos promocionales, piezas de marca y contenidos para campañas.","audiovisual-production"],
    ["Fotografía y contenido","Material visual para productos, personas, espacios y comunicación.","audiovisual-production"],
    ["Publicidad y campañas","Concepto, narrativa y piezas adaptadas a cada canal.","creative-campaigns"],
    ["Producción híbrida con IA","Combinación de grabación real, edición y herramientas generativas.","audiovisual-production"]
  ];
  return <><Hero page="studio"/><section className="mx-auto max-w-[1220px] px-5 py-20 sm:px-8"><div className="grid gap-4 sm:grid-cols-2">{lines.map(([title,desc,productId],i)=><article key={title} className="flex flex-col rounded-[28px] bg-[#0E1116] p-8 text-white"><span className="text-xs font-bold text-[#FF7A36]">0{i+1} / STUDIO</span><h2 className="display mt-10 text-3xl sm:text-4xl">{title}</h2><p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">{desc}</p><div className="mt-6 flex flex-wrap gap-4"><button onClick={()=>openChatWithProduct("studio",productId,"explore")} className="automata-learn-bubble automata-learn-bubble-dark"><MessageCircle size={15}/> Saber más</button><button onClick={()=>openChatWithProduct("studio",productId,"proposal")} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/80 hover:text-[#FF7A36]">Solicitar propuesta <ArrowUpRight size={16}/></button></div></article>)}</div><div className="mt-8 rounded-[28px] border border-[#E8E6E1] bg-[#FFF8F3] p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#FF5A00]">Creative Lab · Prototipo interactivo</p><h2 className="display mt-4 max-w-2xl text-3xl sm:text-4xl">Convierte una idea en una primera dirección creativa.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5A6068]">Define objetivo, público y formato. Explora una estructura narrativa y prepara un brief preliminar para una pieza audiovisual.</p><a href="/studio/lab/" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0E1116] px-6 text-sm font-bold text-white transition hover:bg-[#FF5A00]">Explorar Creative Lab <ArrowUpRight size={17}/></a></div><p className="mt-7 text-xs leading-relaxed text-[#8A8F96]">La galería de trabajos se incorporará cuando tengamos piezas aprobadas para publicación. No usamos imágenes conceptuales como evidencia de proyectos realizados.</p></section></>;
}
function ProjectsPage() {
  const showcases = [
    {area:"DIGITAL",status:"Demo interactiva · simulación",title:"Flujos para negocios",desc:"Explora pedidos de restaurante y solicitudes de cita para consultorio y peluquería.",href:"/demos/",action:"Explorar flujos"},
    {area:"EXPERIENCES",status:"Demo interactiva · sin persistencia",title:"Invitación para celebrar",desc:"Recorre una invitación de boda y prueba la confirmación de asistencia en el navegador.",href:"/experiences/demo/",action:"Probar invitación"},
    {area:"STUDIO",status:"Prototipo interactivo · reglas locales",title:"Creative Lab",desc:"Construye un brief preliminar y una secuencia narrativa para una pieza audiovisual.",href:"/studio/lab/",action:"Crear un concepto"}
  ];
  return <><Hero page="projects"/><section className="mx-auto max-w-[1220px] px-5 py-20 sm:px-8"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#FF5A00]">Explora haciendo</p><h2 className="display mt-4 text-4xl sm:text-5xl">Un laboratorio abierto de capacidades.</h2><p className="mt-4 text-sm leading-relaxed text-[#5A6068]">Cada pieza muestra una parte distinta de nuestro trabajo. Indicamos su estado y sus límites para que puedas distinguir una demostración de un servicio conectado a producción.</p></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{showcases.map((item,i)=><article key={item.title} className="flex min-h-[330px] flex-col rounded-[28px] border border-[#E8E6E1] bg-white p-7 transition hover:-translate-y-1 hover:border-[#FF5A00]/60 hover:shadow-lg"><span className="text-xs font-extrabold tracking-[.18em] text-[#FF5A00]">{item.area} · 0{i+1}</span><span className="mt-5 inline-flex self-start rounded-full bg-[#F4F3F0] px-3 py-1.5 text-[10px] font-bold text-[#6E6A63]">{item.status}</span><h2 className="display mt-7 text-3xl">{item.title}</h2><p className="mt-3 text-sm leading-relaxed text-[#5A6068]">{item.desc}</p><a href={item.href} className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-extrabold text-[#FF5A00]">{item.action} <ArrowRight size={16}/></a></article>)}</div><div className="mt-8 rounded-[28px] border border-dashed border-[#D8D5CE] p-7"><span className="text-xs font-bold uppercase tracking-[.2em] text-[#8A8F96]">Proyectos y casos reales</span><h2 className="display mt-4 text-3xl">Publicaremos trabajo con contexto y permiso.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5A6068]">Los prototipos no se presentan como clientes, resultados ni casos de éxito. Esta sección crecerá con piezas aprobadas, alcance explicado y evidencia verificable.</p></div></section></>;
}
function ContactPage() {
  const openAssistant = () => openChatWithSource("contact");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [area, setArea] = useState("No estoy seguro");
  const [objective, setObjective] = useState("");

  const prepareWhatsAppBrief = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lines = [
      "Hola, AUTOMATA. Quiero conversar sobre un proyecto.",
      name.trim() ? "Nombre: " + name.trim() : "",
      organization.trim() ? "Negocio / organización: " + organization.trim() : "",
      "Área de interés: " + area,
      "¿Qué necesito resolver?: " + objective.trim(),
      "",
      "Quisiera conocer los siguientes pasos."
    ].filter(Boolean);
    trackEvent("whatsapp_click");
    window.open("https://wa.me/59176192899?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return <>
    <Hero page="contact"/>
    <section className="mx-auto max-w-[900px] px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1E8] text-[#FF5A00]"><Bot size={30}/></span>
        <h2 className="display mt-7 text-4xl sm:text-5xl">Cuéntanos qué tienes en mente.</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#5A6068]">Puedes preparar una consulta para WhatsApp o conversar primero con nuestro asistente. No enviamos este formulario a un servidor ni guardamos sus respuestas: tú revisas el mensaje y decides si lo envías desde WhatsApp.</p>
      </div>
      <form onSubmit={prepareWhatsAppBrief} className="mx-auto mt-10 max-w-2xl rounded-[28px] border border-[#E8E6E1] bg-white p-6 shadow-sm sm:p-9">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-[#272B31]">Tu nombre <span className="font-normal text-[#8A8F96]">(opcional)</span>
            <input value={name} onChange={event => setName(event.target.value)} maxLength={80} autoComplete="name" className="mt-2 min-h-12 w-full rounded-xl border border-[#DAD8D2] px-4 font-normal outline-none transition focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/15" placeholder="¿Cómo te llamas?"/>
          </label>
          <label className="block text-sm font-semibold text-[#272B31]">Negocio u organización <span className="font-normal text-[#8A8F96]">(opcional)</span>
            <input value={organization} onChange={event => setOrganization(event.target.value)} maxLength={100} autoComplete="organization" className="mt-2 min-h-12 w-full rounded-xl border border-[#DAD8D2] px-4 font-normal outline-none transition focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/15" placeholder="Nombre o actividad"/>
          </label>
        </div>
        <label className="mt-5 block text-sm font-semibold text-[#272B31]">¿Qué área te interesa?
          <select value={area} onChange={event => setArea(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#DAD8D2] bg-white px-4 font-normal outline-none transition focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/15">
            <option>Digital</option><option>Experiences</option><option>Studio</option><option>Una combinación de áreas</option><option>No estoy seguro</option>
          </select>
        </label>
        <label className="mt-5 block text-sm font-semibold text-[#272B31]">¿Qué necesitas resolver?
          <textarea required value={objective} onChange={event => setObjective(event.target.value)} minLength={12} maxLength={1200} rows={5} className="mt-2 w-full resize-y rounded-xl border border-[#DAD8D2] px-4 py-3 font-normal outline-none transition focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/15" placeholder="Cuéntanos brevemente qué quieres conseguir, qué problema tienes o qué idea quieres explorar."/>
          <span className="mt-1 block text-right text-xs font-normal text-[#8A8F96]">{objective.length}/1200</span>
        </label>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full bg-[#FF5A00] px-6 text-sm font-bold text-white transition hover:bg-[#E14E00]">Preparar mensaje en WhatsApp <ArrowUpRight size={18}/></button>
          <button type="button" onClick={openAssistant} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#DAD8D2] px-6 text-sm font-bold text-[#272B31] transition hover:border-[#FF5A00] hover:text-[#FF5A00]">Hablar con el asistente <Bot size={18}/></button>
        </div>
        <p className="mt-4 text-center text-xs leading-relaxed text-[#8A8F96]">El botón abre WhatsApp con un borrador. El mensaje solo se comparte si tú lo envías.</p>
      </form>
    </section>
  </>;
}
export default function V2App() {
  const page = currentPage();
  useEffect(() => { if (window.location.pathname.replace(/\/+$/, "") !== "/demos") trackEvent("page_view"); }, []);
  if (window.location.pathname.replace(/\/+$/, "") === "/demos") return <LegacyDigital/>;
  return <div className="min-h-screen overflow-x-clip bg-white text-[#0E1116]"><Header page={page}/><CookieConsent/><main>{page === "home" ? <HomePage/> : page === "digital" ? <DigitalPage/> : page === "experiences" ? <ExperiencesPage/> : page === "studio" ? <StudioPage/> : page === "projects" ? <ProjectsPage/> : <ContactPage/>}</main><Footer/><ChatWidget/></div>;
}

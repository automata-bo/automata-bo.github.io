import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Bot, Camera, CheckCircle2, Clapperboard, Code2, Heart, Menu, MonitorSmartphone, QrCode, Sparkles, Workflow, X } from "lucide-react";
import LegacyDigital from "./App";
import ChatWidget from "./ChatWidget";
import CookieConsent from "./CookieConsent";
import NewsletterSignup from "./NewsletterSignup";
import { trackEvent } from "./analytics";
import logoFull from "./assets/42a5f50319bf92a6-automataF.png";

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
  const openAssistant = () => window.dispatchEvent(new Event("automata:open-chat"));
  return <section className="relative overflow-hidden bg-[#0E1116] text-white">
    <div className="pointer-events-none absolute -right-32 -top-32 h-[440px] w-[440px] rounded-full border border-white/10" />
    <div className="pointer-events-none absolute -right-12 -top-12 h-[280px] w-[280px] rounded-full border border-[#FF5A00]/30" />
    <div className="mx-auto max-w-[1220px] px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.22em] text-[#FF7A36]"><span className="h-2 w-2 rounded-full bg-[#FF5A00]"/>{meta.eyebrow}</p>
      <h1 className="display mt-7 max-w-[980px] text-[clamp(2.8rem,7vw,6.6rem)] leading-[.98]">{meta.title}</h1>
      <p className="mt-7 max-w-[660px] text-base leading-relaxed text-white/65 sm:text-lg">{meta.description}</p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        {page === "home" ? <a href="#divisiones" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FF5A00] px-7 text-sm font-bold text-white hover:bg-[#E14E00]">Explorar lo que hacemos <ArrowRight size={18}/></a> : <button onClick={openAssistant} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FF5A00] px-7 text-sm font-bold text-white hover:bg-[#E14E00]">Conversemos sobre tu proyecto <ArrowRight size={18}/></button>}
        {page === "home" && <button onClick={openAssistant} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/25 px-7 text-sm font-bold text-white hover:bg-white/10">Iniciar una conversación <Bot size={18}/></button>}
      </div>
    </div>
    <div className="h-1 w-full bg-gradient-to-r from-[#FF5A00] via-[#FF8A4C] to-transparent"/>
  </section>;
}
function HomePage() {
  return <>
    <Hero page="home"/>
    <section id="divisiones" className="mx-auto max-w-[1220px] px-5 py-20 sm:px-8 lg:py-28">
      <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#FF5A00]">Un mismo estudio, tres capacidades</p><h2 className="display mt-4 text-4xl sm:text-6xl">Tecnología y creatividad trabajando juntas.</h2></div>
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {divisions.map(d => <a key={d.key} href={d.href} className="group flex min-h-[330px] flex-col rounded-[28px] border border-[#E8E6E1] bg-white p-7 transition hover:-translate-y-1 hover:border-[#FF5A00]/50 hover:shadow-xl sm:p-8">
          <div className="flex items-center justify-between"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF1E8] text-[#FF5A00]"><d.icon size={27}/></span><span className="display text-5xl text-[#E8E6E1]">{d.number}</span></div>
          <h3 className="display mt-10 text-4xl">{d.title}</h3><p className="mt-3 font-bold">{d.line}</p><p className="mt-3 max-w-sm text-sm leading-relaxed text-[#5A6068]">{d.description}</p>
          <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-extrabold text-[#FF5A00]">Explorar {d.title} <ArrowRight size={17} className="transition group-hover:translate-x-1"/></span>
        </a>)}
      </div>
    </section>
    <section className="border-y border-[#E8E6E1] bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1220px] px-5 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#FF5A00]">Soluciones según tu objetivo</p><h2 className="display mt-4 text-4xl sm:text-6xl">¿Qué necesitas poner en marcha?</h2></div>
          <p className="max-w-sm text-sm leading-relaxed text-[#5A6068]">No tienes que llegar con la solución definida. Cuéntanos qué quieres conseguir y vemos qué combinación de capacidades tiene sentido.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {icon:MonitorSmartphone,title:"Presentar tu negocio",desc:"Una web clara para explicar lo que haces, mostrar tu oferta y facilitar consultas.",tag:"Digital",href:"/digital/"},
            {icon:Workflow,title:"Ordenar la atención",desc:"Asistentes, formularios e integraciones para organizar consultas y tareas repetitivas.",tag:"Digital",href:"/digital/"},
            {icon:Heart,title:"Crear una experiencia",desc:"Invitaciones, dinámicas participativas y recuerdos digitales para eventos y celebraciones.",tag:"Experiences",href:"/experiences/"},
            {icon:Camera,title:"Comunicar una idea",desc:"Fotografía, video y piezas creativas para contar mejor una marca, producto o proyecto.",tag:"Studio",href:"/studio/"},
          ].map(item=><a key={item.title} href={item.href} className="group flex min-h-[250px] flex-col rounded-3xl border border-[#E8E6E1] p-6 transition hover:-translate-y-1 hover:border-[#FF5A00]/60 hover:shadow-lg">
            <div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF1E8] text-[#FF5A00]"><item.icon size={22}/></span><span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#8A8F96]">{item.tag}</span></div>
            <h3 className="mt-7 text-lg font-extrabold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5A6068]">{item.desc}</p>
            <span className="mt-auto flex items-center gap-2 pt-6 text-xs font-extrabold text-[#FF5A00]">Explorar capacidad <ArrowRight size={15} className="transition group-hover:translate-x-1"/></span>
          </a>)}
        </div>
      </div>
    </section>
    <section className="bg-[#F4F3F0] py-20 lg:py-24"><div className="mx-auto grid max-w-[1220px] gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
      <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#FF5A00]">Cómo pensamos</p><h2 className="display mt-4 text-4xl sm:text-6xl">Primero el propósito. Después la tecnología.</h2></div>
      <div className="grid gap-5 sm:grid-cols-2">{[["01","Comprender","Escuchamos el contexto y el resultado que se busca."],["02","Diseñar","Elegimos una solución adecuada, no la más complicada."],["03","Construir","Prototipamos, probamos e implementamos por etapas."],["04","Acompañar","Medimos, corregimos y mejoramos con el uso real."]].map(([n,t,d])=><div key={n} className="border-t border-[#D8D5CE] pt-5"><span className="text-xs font-bold text-[#FF5A00]">{n}</span><h3 className="mt-2 text-xl font-extrabold">{t}</h3><p className="mt-2 text-sm leading-relaxed text-[#5A6068]">{d}</p></div>)}</div>
    </div></section>
    <section className="mx-auto max-w-[1220px] px-5 py-20 text-center sm:px-8 lg:py-28"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#FF5A00]">Cada proyecto empieza distinto</p><h2 className="display mx-auto mt-4 max-w-3xl text-4xl sm:text-6xl">La solución correcta empieza con una buena conversación.</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#5A6068]">Cuéntanos qué quieres resolver, crear o comunicar. Te ayudamos a ordenar la idea antes de decidir qué construir.</p><a href="/contacto/" className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#0E1116] px-7 text-sm font-bold text-white hover:bg-[#FF5A00]">Hablemos <ArrowRight size={18}/></a></section>
  </>;
}
function DigitalPage() {
  const items = [
    [Code2,"Sitios y experiencias web","Presencia digital clara, rápida y pensada para orientar consultas."],
    [MonitorSmartphone,"Aplicaciones y sistemas","Herramientas a medida para ordenar información y procesos."],
    [Bot,"Asistentes digitales","Atención inicial en web y mensajería, con reglas y transferencia humana."],
    [Workflow,"Automatización e integraciones","Conectamos tareas repetitivas y sistemas cuando aporta valor."],
    [Sparkles,"IA aplicada","Clasificación, asistencia y generación con supervisión y límites claros."],
  ] as const;
  return <><Hero page="digital"/><section className="mx-auto max-w-[1220px] px-5 py-20 sm:px-8"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(([Icon,title,desc])=><article key={title} className="rounded-3xl border border-[#E8E6E1] p-7"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF1E8] text-[#FF5A00]"><Icon size={24}/></span><h2 className="mt-7 text-xl font-extrabold">{title}</h2><p className="mt-3 text-sm leading-relaxed text-[#5A6068]">{desc}</p></article>)}</div>
    <div className="mt-14 rounded-[28px] bg-[#0E1116] p-8 text-white sm:p-12"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#FF7A36]">Explora el funcionamiento</p><h2 className="display mt-4 max-w-2xl text-4xl sm:text-5xl">Prueba nuestras demostraciones interactivas.</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65">Los ejemplos actuales de restaurante, consultorio y peluquería son simulaciones. Sirven para explorar flujos, no para registrar operaciones reales.</p><a href="/demos/" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#FF5A00] px-6 text-sm font-bold text-white">Abrir demos <ArrowUpRight size={17}/></a></div>
  </section></>;
}
function ExperiencesPage() {
  return <><Hero page="experiences"/><section className="mx-auto max-w-[1220px] px-5 py-20 sm:px-8"><div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
    <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#FF5A00]">Producto en desarrollo · Bodas y celebraciones</p><h2 className="display mt-4 text-4xl sm:text-5xl">Un álbum que todos ayudan a crear.</h2><p className="mt-5 text-base leading-relaxed text-[#5A6068]">Una experiencia personalizada para que los invitados compartan fotografías del evento y la pareja pueda reunir esos recuerdos en un álbum comunitario.</p>
      <ul className="mt-7 space-y-4">{[{icon:<QrCode size={22}/>,title:"Acceso mediante QR",desc:"Tarjetas y puntos de acceso para que los invitados participen."},{icon:<Camera size={22}/>,title:"Fotografías compartidas",desc:"Un recorrido sencillo para aportar imágenes desde el teléfono."},{icon:<Heart size={22}/>,title:"Álbum comunitario",desc:"Una colección personalizada para los novios y sus invitados."}].map(item=><li key={item.title} className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF1E8] text-[#FF5A00]">{item.icon}</span><span><strong className="block text-sm">{item.title}</strong><span className="mt-1 block text-sm text-[#5A6068]">{item.desc}</span></span></li>)}</ul>
    </div>
    <div className="rounded-[30px] bg-[#FFF1E8] p-8 sm:p-10"><div className="mx-auto flex max-w-sm flex-col items-center rounded-[24px] border border-[#F2D9CA] bg-white p-8 text-center shadow-sm"><span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF5A00] text-white"><QrCode size={34}/></span><p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-[#FF5A00]">Un día para recordar</p><h3 className="display mt-3 text-3xl">Tu celebración</h3><p className="mt-3 text-sm text-[#5A6068]">Un ejemplo conceptual de experiencia para bodas.</p><div className="mt-6 grid h-32 w-32 grid-cols-5 gap-1 rounded-lg bg-[#F4F3F0] p-2">{Array.from({length:25},(_,i)=><span key={i} className={((i*7+i%3)%5<2)?"bg-[#0E1116]":"bg-white"}/>)}</div><span className="mt-4 text-[10px] text-[#8A8F96]">Representación gráfica, no código QR funcional</span></div></div>
  </div><div className="mt-12 flex gap-3 rounded-2xl border border-[#E8E6E1] p-5 text-sm leading-relaxed text-[#5A6068]"><CheckCircle2 className="mt-0.5 shrink-0 text-[#FF5A00]" size={20}/><p>Antes de ofrecerlo como servicio cerrado definiremos consentimiento de los invitados, privacidad del álbum, capacidad de almacenamiento, tiempo de conservación y forma de entrega.</p></div></section></>;
}
function StudioPage() {
  const lines = [["Producción audiovisual","Videos promocionales, piezas de marca y contenidos para campañas."],["Fotografía y contenido","Material visual para productos, personas, espacios y comunicación."],["Publicidad y campañas","Concepto, narrativa y piezas adaptadas a cada canal."],["Producción híbrida con IA","Combinación de grabación real, edición y herramientas generativas."]];
  return <><Hero page="studio"/><section className="mx-auto max-w-[1220px] px-5 py-20 sm:px-8"><div className="grid gap-4 sm:grid-cols-2">{lines.map(([title,desc],i)=><article key={title} className="rounded-[28px] bg-[#0E1116] p-8 text-white"><span className="text-xs font-bold text-[#FF7A36]">0{i+1} / STUDIO</span><h2 className="display mt-10 text-3xl sm:text-4xl">{title}</h2><p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">{desc}</p></article>)}</div><p className="mt-7 text-xs leading-relaxed text-[#8A8F96]">La galería de trabajos se incorporará cuando tengamos piezas aprobadas para publicación. No usamos imágenes conceptuales como evidencia de proyectos realizados.</p></section></>;
}
function ProjectsPage() {
  return <><Hero page="projects"/><section className="mx-auto max-w-[1220px] px-5 py-20 sm:px-8"><div className="grid gap-4 md:grid-cols-2"><a href="/demos/" className="group rounded-[28px] border border-[#E8E6E1] p-8 hover:border-[#FF5A00]"><span className="text-xs font-bold uppercase tracking-[.2em] text-[#FF5A00]">Demostración interactiva</span><h2 className="display mt-6 text-3xl">Flujos para negocios</h2><p className="mt-3 text-sm leading-relaxed text-[#5A6068]">Restaurante, consultorio y peluquería. Ejemplos simulados para explorar interacciones.</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-bold">Explorar demos <ArrowRight size={16}/></span></a><div className="rounded-[28px] border border-dashed border-[#D8D5CE] p-8"><span className="text-xs font-bold uppercase tracking-[.2em] text-[#8A8F96]">Próximamente · con material aprobado</span><h2 className="display mt-6 text-3xl">Proyectos y casos</h2><p className="mt-3 text-sm leading-relaxed text-[#5A6068]">Publicaremos proyectos cuando existan resultados, permisos y contexto suficientes para describirlos con precisión.</p></div></div></section></>;
}
function ContactPage() {
  const openAssistant = () => window.dispatchEvent(new Event("automata:open-chat"));
  return <><Hero page="contact"/><section className="mx-auto max-w-[900px] px-5 py-20 text-center sm:px-8"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1E8] text-[#FF5A00]"><Bot size={30}/></span><h2 className="display mt-7 text-4xl sm:text-5xl">Cuéntanos qué tienes en mente.</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#5A6068]">Autómata puede ayudarte a ordenar la consulta y preparar el contexto. Si hace falta, podrás continuar con el equipo humano.</p><button onClick={openAssistant} className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#FF5A00] px-7 text-sm font-bold text-white">Iniciar conversación <ArrowRight size={18}/></button></section></>;
}
export default function V2App() {
  const page = currentPage();
  useEffect(() => { if (window.location.pathname.replace(/\/+$/, "") !== "/demos") trackEvent("page_view"); }, []);
  if (window.location.pathname.replace(/\/+$/, "") === "/demos") return <LegacyDigital/>;
  return <div className="min-h-screen overflow-x-clip bg-white text-[#0E1116]"><Header page={page}/><main>{page === "home" ? <HomePage/> : page === "digital" ? <DigitalPage/> : page === "experiences" ? <ExperiencesPage/> : page === "studio" ? <StudioPage/> : page === "projects" ? <ProjectsPage/> : <ContactPage/>}</main><Footer/><ChatWidget/><CookieConsent/></div>;
}

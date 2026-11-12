import React, { useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Bot, Camera, Check, Clapperboard, Code2, Heart, MessageCircle, MonitorSmartphone, Play, Sparkles, Workflow } from "lucide-react";

type DemoKey = "atencion" | "experiencia" | "studio";
const demos: Record<DemoKey,{label:string;question:string;answer:string;result:string;tag:string}> = {
  atencion:{label:"Atención inteligente",question:"Tengo una cafetería y no alcanzo a responder todos los mensajes.",answer:"Podemos diseñar un asistente que explique tu menú, horarios y ubicación, y organice las consultas. Primero revisamos cómo recibes hoy los pedidos.",result:"Un recorrido de atención más claro, adaptado a tu operación.",tag:"DIGITAL"},
  experiencia:{label:"Experiencia para eventos",question:"Quiero que los invitados de mi boda compartan sus fotos.",answer:"Podemos diseñar un recorrido con acceso por QR y una galería comunitaria para reunir los recuerdos. Hay que definir privacidad, almacenamiento y entrega.",result:"Una experiencia participativa alrededor de un momento especial.",tag:"EXPERIENCES"},
  studio:{label:"Idea creativa",question:"Necesito presentar un producto de una manera diferente.",answer:"Podemos explorar un concepto visual, una narrativa y una pieza audiovisual que combine producción real con recursos digitales o IA.",result:"Una dirección creativa que convierte una idea en una pieza.",tag:"STUDIO"}
};
function openAdvisor(){window.dispatchEvent(new CustomEvent("automata:open-chat",{detail:{source:"home"}}));}
function Mascot(){return <svg viewBox="0 0 360 360" role="img" aria-label="Personaje asistente de AUTOMATA, una figura abstracta naranja con expresión amable" className="showroom-mascot h-full w-full">
  <defs><linearGradient id="autoBody" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffb078"/><stop offset=".42" stopColor="#ff6a2a"/><stop offset="1" stopColor="#d83c0b"/></linearGradient><linearGradient id="autoGlass" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#252d38"/><stop offset="1" stopColor="#090d13"/></linearGradient><filter id="autoShadow"><feGaussianBlur stdDeviation="12"/></filter></defs>
  <ellipse cx="180" cy="310" rx="92" ry="18" fill="#ff641f" opacity=".22" filter="url(#autoShadow)"/>
  <path d="M180 57V27" stroke="#ff8a55" strokeWidth="8" strokeLinecap="round"/><circle cx="180" cy="20" r="12" fill="#ff9a69"/><circle cx="180" cy="20" r="5" fill="#fff1e8"/>
  <path d="M91 125Q91 78 138 78H222Q269 78 269 125V226Q269 276 219 276H141Q91 276 91 226Z" fill="url(#autoBody)" stroke="#ffb17e" strokeWidth="3"/>
  <path d="M105 137Q105 105 140 105H220Q255 105 255 137V211Q255 244 220 244H140Q105 244 105 211Z" fill="url(#autoGlass)" stroke="#ffbd99" strokeOpacity=".55" strokeWidth="2"/>
  <ellipse cx="151" cy="169" rx="13" ry="17" fill="#fff4e9"/><ellipse cx="209" cy="169" rx="13" ry="17" fill="#fff4e9"/><circle cx="154" cy="172" r="6" fill="#ff641f"/><circle cx="206" cy="172" r="6" fill="#ff641f"/>
  <path d="M157 203Q180 222 203 203" fill="none" stroke="#ff9a69" strokeWidth="5" strokeLinecap="round"/>
  <path d="M90 163L62 179L70 205L94 196M270 163L298 179L290 205L266 196" fill="none" stroke="#ff8a55" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M145 276L132 306M215 276L228 306" stroke="#ff8a55" strokeWidth="15" strokeLinecap="round"/>
  <path d="M112 307H149M211 307H248" stroke="#ffb078" strokeWidth="11" strokeLinecap="round"/>
  <path d="M113 115Q180 73 247 115" fill="none" stroke="#ffd0b4" strokeOpacity=".65" strokeWidth="3"/>
  <circle cx="283" cy="87" r="7" fill="#ff9b6c"/><circle cx="72" cy="92" r="5" fill="#ff9b6c"/><path d="M290 122l8 8m-8 0l8-8" stroke="#ff9b6c" strokeWidth="3" strokeLinecap="round"/>
</svg>}
export default function ImmersiveHome(){
 const [active,setActive]=useState<DemoKey>("atencion");
 const current=demos[active];
 return <div className="showroom overflow-hidden">
  <section className="relative isolate min-h-[700px] overflow-hidden border-b border-white/10">
   <div className="showroom-grid pointer-events-none absolute inset-0 opacity-70"/>
   <div className="showroom-glow pointer-events-none absolute -right-24 top-0 h-[650px] w-[650px]"/>
   <div className="relative mx-auto grid min-h-[700px] max-w-[1320px] items-center gap-6 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
    <div className="relative z-10">
     <div className="inline-flex items-center gap-2 rounded-full border border-[#ff7b45]/35 bg-[#ff641f]/10 px-4 py-2 text-[10px] font-extrabold tracking-[.2em] text-[#ff9a70]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#ff7b45]"/>TARIJA · DIGITAL EXPERIENCES & INTELLIGENT SOLUTIONS</div>
     <h1 className="display mt-8 max-w-[780px] text-[clamp(3.5rem,8vw,7.8rem)]">Ideas que<br/><span className="text-[#ff7137]">se vuelven</span><br/>experiencias.</h1>
     <p className="showroom-muted mt-8 max-w-[530px] text-base leading-relaxed sm:text-lg">Diseñamos y construimos experiencias digitales, soluciones inteligentes y piezas creativas que hacen más fácil, útil o memorable lo que quieres conseguir.</p>
     <div className="mt-9 flex flex-wrap gap-3">
      <button onClick={openAdvisor} className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#ff641f] px-7 text-sm font-extrabold text-[#160e0a] transition hover:bg-[#ff8a55]">Conoce a nuestro asesor <Bot size={18}/></button>
      <a href="#explora" className="inline-flex min-h-14 items-center gap-3 rounded-full border border-white/20 px-7 text-sm font-bold text-white transition hover:border-[#ff7137]">Explorar el laboratorio <ArrowDownRight size={18}/></a>
     </div>
     <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-bold tracking-[.16em] text-white/40"><span>01 · DIGITAL</span><span>02 · EXPERIENCES</span><span>03 · STUDIO</span></div>
    </div>
    <div className="relative mx-auto flex aspect-square w-full max-w-[570px] items-center justify-center">
     <div className="showroom-glow absolute inset-0 rounded-full"/>
     <div className="showroom-orbit"/><div className="showroom-orbit two"/>
     <div className="showroom-scan absolute left-[8%] right-[8%] top-[25%] z-20"/>
     <div className="relative z-10 w-[78%]"><Mascot/></div>
     <div className="showroom-pill absolute left-0 top-[22%] rounded-full px-4 py-2 text-[10px] font-bold tracking-wider text-white/80 backdrop-blur">CREATIVIDAD + TECNOLOGÍA</div>
     <div className="showroom-pill absolute bottom-[17%] right-0 rounded-full px-4 py-2 text-[10px] font-bold tracking-wider text-white/80 backdrop-blur">HECHO PARA PERSONAS</div>
     <div className="absolute bottom-[4%] left-[12%] flex items-center gap-2 text-xs text-white/45"><span className="h-2 w-2 rounded-full bg-[#ff641f]"/>Tu próxima idea empieza aquí</div>
    </div>
   </div>
   <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#ff641f] to-transparent"/>
  </section>

  <section id="explora" className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:py-28">
   <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
    <div><p className="text-[10px] font-extrabold tracking-[.22em] text-[#ff8a55]">NO HACE FALTA SABER DE TECNOLOGÍA</p><h2 className="display mt-5 text-5xl sm:text-7xl">Empieza por<br/>lo que necesitas.</h2></div>
    <p className="showroom-muted max-w-xl text-base leading-relaxed lg:justify-self-end">Elige una situación. Te mostramos cómo podríamos abordarla y nuestro asesor puede ayudarte a entender qué hay detrás, sin hablarte en jerga técnica.</p>
   </div>
   <div className="mt-12 grid gap-7 lg:grid-cols-[.85fr_1.15fr]">
    <div className="flex flex-col gap-3">
     {(Object.keys(demos) as DemoKey[]).map(key=><button key={key} type="button" className="showroom-card flex min-h-[88px] items-center gap-4 rounded-2xl p-5 text-left" onClick={()=>setActive(key)} aria-pressed={active===key}><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff641f]/15 text-[#ff8a55]">{key==="atencion"?<MessageCircle/>:key==="experiencia"?<Heart/>:<Clapperboard/>}</span><span className="flex-1"><strong className="block text-sm">{demos[key].label}</strong><small className="mt-1 block text-xs text-white/45">{demos[key].tag}</small></span><ArrowUpRight className="text-white/40"/></button>)}
    </div>
    <div className="showroom-panel rounded-[30px] p-5 sm:p-8">
     <div className="flex items-center justify-between gap-3"><span className="text-[10px] font-extrabold tracking-[.2em] text-[#ff8a55]">ASÍ PODRÍA FUNCIONAR</span><span className="showroom-pill rounded-full px-3 py-1 text-[9px] font-bold text-white/55">EJEMPLO INTERACTIVO</span></div>
     <div className="mt-7 grid gap-4 sm:grid-cols-[1fr_48px_1fr] sm:items-center">
      <div className="chat-preview rounded-2xl p-4"><span className="mb-3 block text-[9px] font-bold tracking-wider text-white/40">VISITANTE</span><p className="text-sm leading-relaxed">{current.question}</p></div>
      <div className="flex justify-center text-[#ff8a55]"><ArrowRight/></div>
      <div className="chat-preview rounded-2xl p-4"><span className="mb-3 flex items-center gap-2 text-[9px] font-bold tracking-wider text-[#ff9a70]"><Bot size={13}/> ASESOR AUTOMATA</span><p className="text-sm leading-relaxed text-white/80">{current.answer}</p></div>
     </div>
     <div className="mt-5 rounded-2xl border border-[#ff641f]/25 bg-[#ff641f]/[.07] p-5"><span className="text-[9px] font-extrabold tracking-[.18em] text-[#ff9a70]">POSIBLE RESULTADO</span><p className="mt-2 text-base font-bold">{current.result}</p></div>
     <div className="mt-6 flex flex-col gap-3 sm:flex-row"><button onClick={openAdvisor} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#ff641f] px-5 text-xs font-extrabold text-[#160e0a]">Explorarlo con el asesor <Bot size={16}/></button><a href={active==="atencion"?"/digital/":active==="experiencia"?"/experiences/":"/studio/"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-xs font-bold text-white">Conocer esta capacidad <ArrowUpRight size={15}/></a></div>
    </div>
   </div>
  </section>

  <section className="border-y border-white/10 bg-[#0d1015] py-20 lg:py-24">
   <div className="mx-auto max-w-[1320px] px-5 sm:px-8"><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="text-[10px] font-extrabold tracking-[.22em] text-[#ff8a55]">TRES CAPACIDADES · UN MISMO ESTUDIO</p><h2 className="display mt-5 text-5xl sm:text-7xl">Lo imaginamos.<br/>Lo construimos.</h2></div><p className="showroom-muted max-w-sm text-sm leading-relaxed">No vendemos tecnología por catálogo. Combinamos capacidades según el problema, el contexto y lo que realmente tiene sentido.</p></div>
    <div className="mt-12 grid gap-4 lg:grid-cols-3">
     <a href="/digital/" className="showroom-card group flex min-h-[340px] flex-col rounded-[28px] p-7"><div className="flex items-center justify-between"><MonitorSmartphone className="text-[#ff8a55]" size={30}/><span className="text-xs text-white/35">01 / DIGITAL</span></div><h3 className="display mt-14 text-4xl">Sistemas que<br/>trabajan contigo.</h3><p className="showroom-muted mt-4 text-sm leading-relaxed">Web, asistentes, automatización e integraciones para resolver tareas concretas.</p><span className="mt-auto flex items-center gap-2 pt-8 text-sm font-bold text-[#ff8a55]">Explorar Digital <ArrowRight size={16}/></span></a>
     <a href="/experiences/" className="showroom-card group flex min-h-[340px] flex-col rounded-[28px] p-7"><div className="flex items-center justify-between"><Heart className="text-[#ff8a55]" size={30}/><span className="text-xs text-white/35">02 / EXPERIENCES</span></div><h3 className="display mt-14 text-4xl">Momentos que<br/>se vuelven recuerdos.</h3><p className="showroom-muted mt-4 text-sm leading-relaxed">Experiencias digitales, físicas e híbridas para participar, compartir y celebrar.</p><span className="mt-auto flex items-center gap-2 pt-8 text-sm font-bold text-[#ff8a55]">Explorar Experiences <ArrowRight size={16}/></span></a>
     <a href="/studio/" className="showroom-card group flex min-h-[340px] flex-col rounded-[28px] p-7"><div className="flex items-center justify-between"><Clapperboard className="text-[#ff8a55]" size={30}/><span className="text-xs text-white/35">03 / STUDIO</span></div><h3 className="display mt-14 text-4xl">Ideas con una<br/>forma propia.</h3><p className="showroom-muted mt-4 text-sm leading-relaxed">Producción audiovisual, fotografía, campañas y creación híbrida con IA.</p><span className="mt-auto flex items-center gap-2 pt-8 text-sm font-bold text-[#ff8a55]">Explorar Studio <ArrowRight size={16}/></span></a>
    </div>
   </div>
  </section>

  <section className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:py-28">
   <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-[10px] font-extrabold tracking-[.22em] text-[#ff8a55]">PRUEBA ANTES DE IMAGINARLO</p><h2 className="display mt-5 text-5xl sm:text-7xl">Toca. Explora.<br/>Descubre.</h2></div><p className="showroom-muted max-w-sm text-sm leading-relaxed">Pequeñas demostraciones para experimentar cómo pensamos y qué podemos construir. Cada una indica claramente su alcance.</p></div>
   <div className="mt-12 grid gap-4 md:grid-cols-3">
    {[{n:"01",area:"DIGITAL",title:"Flujos para negocios",desc:"Prueba un menú, añade productos y recorre una solicitud de ejemplo.",href:"/demos/",cta:"Abrir demo",state:"SIMULACIÓN"},{n:"02",area:"EXPERIENCES",title:"Invitación interactiva",desc:"Explora una invitación digital y prueba la confirmación de asistencia.",href:"/experiences/demo/",cta:"Vivir experiencia",state:"PROTOTIPO"},{n:"03",area:"STUDIO",title:"Creative Lab",desc:"Construye un brief preliminar y explora una estructura narrativa.",href:"/studio/lab/",cta:"Entrar al laboratorio",state:"PROTOTIPO"}].map(item=><a key={item.n} href={item.href} className="showroom-card group flex min-h-[285px] flex-col rounded-[26px] p-6"><div className="flex items-center justify-between"><span className="text-[10px] font-extrabold tracking-[.2em] text-[#ff8a55]">{item.n} / {item.area}</span><span className="showroom-pill rounded-full px-3 py-1 text-[9px] font-bold text-white/55">{item.state}</span></div><h3 className="display mt-12 text-3xl">{item.title}</h3><p className="showroom-muted mt-3 text-sm leading-relaxed">{item.desc}</p><span className="mt-auto flex items-center gap-2 pt-7 text-sm font-bold text-[#ff8a55]">{item.cta}<ArrowUpRight size={16}/></span></a>)}
   </div>
  </section>

  <section className="relative overflow-hidden border-t border-white/10 bg-[#ff641f] py-20 text-[#150d09] lg:py-24">
   <div className="pointer-events-none absolute -right-20 -top-32 h-[500px] w-[500px] rounded-full border border-black/10"/><div className="pointer-events-none absolute -right-4 -top-16 h-[350px] w-[350px] rounded-full border border-black/10"/>
   <div className="relative mx-auto flex max-w-[1320px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-[10px] font-extrabold tracking-[.22em]">¿TIENES UNA IDEA?</p><h2 className="display mt-5 max-w-3xl text-5xl sm:text-7xl">Hablemos de lo que todavía no existe.</h2><p className="mt-5 max-w-xl text-sm leading-relaxed text-black/65">No necesitas saber qué tecnología usar. Cuéntanos qué quieres conseguir y te ayudamos a encontrar un camino viable.</p></div><button onClick={openAdvisor} className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[#101319] px-7 text-sm font-extrabold text-white transition hover:bg-[#252c37]">Hablar con AUTOMATA <MessageCircle size={18}/></button></div>
  </section>
  <div className="border-t border-white/10 px-5 py-5 text-center text-[10px] tracking-wider text-white/35">AUTOMATA · DIGITAL EXPERIENCES & INTELLIGENT SOLUTIONS · TARIJA, BOLIVIA</div>
 </div>;
}

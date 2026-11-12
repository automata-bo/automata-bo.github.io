import React, { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Bot, Camera, Clapperboard, Heart, MessageCircle, MonitorSmartphone, Workflow } from "lucide-react";

type DemoKey = "digital" | "experiences" | "studio";
const demos: Record<DemoKey, { label: string; question: string; answer: string; result: string; href: string; tag: string }> = {
  digital: {
    label: "Atención inteligente",
    question: "Tengo un negocio y no alcanzo a responder todos los mensajes.",
    answer: "Diseñamos un recorrido de atención que responde consultas frecuentes y organiza cada solicitud para que tu equipo continúe.",
    result: "Una atención más clara, sin perder el trato humano.",
    href: "/digital/",
    tag: "DIGITAL"
  },
  experiences: {
    label: "Recuerdos compartidos",
    question: "Quiero que los invitados de mi boda compartan sus fotografías.",
    answer: "Creamos una experiencia con acceso QR y una galería comunitaria para reunir los momentos desde los teléfonos de los invitados.",
    result: "Una memoria colectiva que sigue creciendo después del evento.",
    href: "/experiences/",
    tag: "EXPERIENCES"
  },
  studio: {
    label: "Una idea que contar",
    question: "Necesito presentar un producto de una manera diferente.",
    answer: "Exploramos un concepto visual, una narrativa y una pieza audiovisual que puede combinar producción real, diseño y herramientas de IA.",
    result: "Una dirección creativa con una forma propia.",
    href: "/studio/",
    tag: "STUDIO"
  }
};

function openAdvisor() {
  window.dispatchEvent(new CustomEvent("automata:open-chat", { detail: { source: "home" } }));
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={"auto-reveal " + (visible ? "is-visible " : "") + className} style={{ transitionDelay: delay + "ms" }}>{children}</div>;
}

function ColorField() {
  return <div className="auto-colorfield" aria-hidden="true">
    <div className="auto-colorfield-ring ring-one" />
    <div className="auto-colorfield-ring ring-two" />
    <div className="auto-colorfield-core" />
    <span className="auto-colorfield-label label-one">IDEAS / 01</span>
    <span className="auto-colorfield-label label-two">FORMAS / 02</span>
    <span className="auto-colorfield-label label-three">EXPERIENCIAS / 03</span>
  </div>;
}

export default function ImmersiveHome() {
  const [active, setActive] = useState<DemoKey>("digital");
  const current = demos[active];

  return <div className="automata-editorial">
    <section className="auto-hero" id="inicio">
      <div className="auto-hero-top">
        <span className="auto-kicker"><i /> DIGITAL EXPERIENCES &amp; INTELLIGENT SOLUTIONS</span>
        <span className="auto-index">TARIJA, BOLIVIA · 2026</span>
      </div>
      <div className="auto-hero-center">
        <Reveal><p className="auto-overline">DIGITAL EXPERIENCES &amp; INTELLIGENT SOLUTIONS</p></Reveal>
        <h1 className="auto-display auto-hero-title">
          <Reveal delay={80}><span>Beyond Digital.</span></Reveal>
          <Reveal delay={190}><span className="auto-hero-into">Into</span></Reveal>
          <Reveal delay={300}><span className="auto-gradient-text">Experiences.</span></Reveal>
        </h1>
        <Reveal delay={430}>
          <p className="auto-hero-manifesto">100% HUMANO. <span>100% IA.</span> <strong>200% AUTOMATA.</strong></p>
          <div className="auto-actions">
            <a className="auto-button auto-button-dark" href="#divisiones">Explorar el estudio <ArrowDownRight size={17} /></a>
            <button className="auto-button auto-button-line" onClick={openAdvisor}>Conversemos <ArrowUpRight size={17} /></button>
          </div>
        </Reveal>
      </div>
      <div className="auto-hero-bottom"><span>ESTUDIO DIGITAL</span><span>DISEÑO · TECNOLOGÍA · IA</span><span>DESPLÁZATE ↓</span></div>
    </section>

    <section className="auto-divisions" id="divisiones">
      <div className="auto-section-intro">
        <Reveal><p className="auto-overline">01 — EL ECOSISTEMA AUTOMATA</p><h2 className="auto-display">Tres divisiones.<br /><span className="auto-gradient-text">Una visión.</span></h2></Reveal>
        <Reveal delay={120}><p className="auto-section-copy">No hacemos tecnología por hacerla. Unimos disciplinas para crear soluciones útiles, experiencias memorables e historias que merecen ser contadas.</p></Reveal>
      </div>
      <div className="auto-division-list">
        <Reveal><a className="auto-division division-blue" href="/digital/">
          <span className="auto-division-number">01</span><div className="auto-division-main"><h3 className="auto-display">Digital<span>.</span></h3><p>Construimos herramientas y sistemas que hacen que las cosas funcionen mejor.</p><small>WEB · SISTEMAS · IA · AUTOMATIZACIÓN</small></div><span className="auto-division-arrow"><ArrowUpRight /></span>
        </a></Reveal>
        <Reveal delay={90}><a className="auto-division division-pink" href="/experiences/">
          <span className="auto-division-number">02</span><div className="auto-division-main"><h3 className="auto-display">Experiences<span>.</span></h3><p>Diseñamos momentos participativos que se convierten en recuerdos compartidos.</p><small>EVENTOS · INTERACCIÓN · MEMORIAS DIGITALES</small></div><span className="auto-division-arrow"><ArrowUpRight /></span>
        </a></Reveal>
        <Reveal delay={180}><a className="auto-division division-orange" href="/studio/">
          <span className="auto-division-number">03</span><div className="auto-division-main"><h3 className="auto-display">Studio<span>.</span></h3><p>Convertimos ideas en imágenes, narrativas y piezas audiovisuales.</p><small>PRODUCCIÓN · FOTOGRAFÍA · DIRECCIÓN CREATIVA</small></div><span className="auto-division-arrow"><ArrowUpRight /></span>
        </a></Reveal>
      </div>
      <div className="auto-section-foot"><span>COMPRENDER / IMAGINAR / CONSTRUIR</span><span>SCROLL PARA EXPLORAR ↓</span></div>
    </section>

    <section className="auto-explore" id="explora">
      <div className="auto-explore-heading">
        <Reveal><p className="auto-overline">02 — EXPLORA LO QUE PODEMOS HACER</p><h2 className="auto-display">Cada idea<br />abre un <span className="auto-gradient-text">camino.</span></h2></Reveal>
        <Reveal delay={120}><p className="auto-section-copy">Tres áreas, distintas maneras de resolver un reto. Entra en cada una y descubre sus posibilidades.</p></Reveal>
      </div>
      <div className="auto-capability-grid">
        <Reveal><a className="auto-capability capability-digital" href="/digital/"><span className="auto-capability-meta">01 / DIGITAL <MonitorSmartphone /></span><div><h3 className="auto-display">Sistemas<br />que conectan.</h3><p>Experiencias web, asistentes, automatización e integraciones.</p><span className="auto-text-link">Explorar Digital <ArrowRight size={16} /></span></div></a></Reveal>
        <Reveal delay={90}><a className="auto-capability capability-experiences" href="/experiences/"><span className="auto-capability-meta">02 / EXPERIENCES <Heart /></span><div><h3 className="auto-display">Momentos<br />que permanecen.</h3><p>Invitaciones, eventos, álbumes colectivos y experiencias interactivas.</p><span className="auto-text-link">Explorar Experiences <ArrowRight size={16} /></span></div></a></Reveal>
        <Reveal delay={180}><a className="auto-capability capability-studio" href="/studio/"><span className="auto-capability-meta">03 / STUDIO <Clapperboard /></span><div><h3 className="auto-display">Historias<br />con identidad.</h3><p>Producción audiovisual, fotografía y creación híbrida con IA.</p><span className="auto-text-link">Explorar Studio <ArrowRight size={16} /></span></div></a></Reveal>
      </div>
    </section>

    <section className="auto-demo-section" id="proyectos">
      <div className="auto-demo-heading">
        <Reveal><p className="auto-overline">03 — PROYECTOS Y EXPERIENCIAS</p><h2 className="auto-display">No lo imagines.<br /><span className="auto-gradient-text">Explóralo.</span></h2></Reveal>
        <Reveal delay={120}><p className="auto-section-copy">Prueba recorridos y prototipos. Cada experiencia indica claramente qué es una simulación y qué está disponible.</p></Reveal>
      </div>
      <div className="auto-demo-layout">
        <div className="auto-demo-tabs" role="tablist" aria-label="Explorar ejemplos de AUTOMATA">
          {(Object.keys(demos) as DemoKey[]).map((key) => <button key={key} type="button" role="tab" aria-selected={active === key} className={"auto-demo-tab " + (active === key ? "active" : "")} onClick={() => setActive(key)}><span>{demos[key].tag}</span><strong>{demos[key].label}</strong><ArrowUpRight size={17} /></button>)}
        </div>
        <div className="auto-demo-preview" role="tabpanel">
          <div className="auto-demo-preview-top"><span>EXPERIENCIA INTERACTIVA / PREVISUALIZACIÓN</span><span className="auto-demo-status">EJEMPLO SIMULADO</span></div>
          <div className="auto-conversation">
            <div className="auto-message message-human"><span>PERSONA</span><p>{current.question}</p></div>
            <div className="auto-message-arrow"><ArrowRight /></div>
            <div className="auto-message message-automata"><span><Bot size={14} /> AUTOMATA</span><p>{current.answer}</p></div>
          </div>
          <div className="auto-demo-result"><span>POSIBLE RESULTADO</span><p>{current.result}</p></div>
          <div className="auto-demo-actions"><a className="auto-button auto-button-dark" href={current.href}>Conocer esta capacidad <ArrowUpRight size={16} /></a><button className="auto-button auto-button-line" onClick={openAdvisor}>Conversar con el asesor <MessageCircle size={16} /></button></div>
        </div>
      </div>
      <div className="auto-project-links"><a href="/proyectos/">Ver todos los proyectos y prototipos <ArrowUpRight size={16} /></a><a href="/demos/">Abrir laboratorio de demos <ArrowUpRight size={16} /></a></div>
    </section>

    <section className="auto-contact">
      <div className="auto-contact-orbit" aria-hidden="true" />
      <div className="auto-contact-inner">
        <Reveal><p className="auto-overline">04 — EL SIGUIENTE PASO</p><h2 className="auto-display">¿Y si hacemos<br /><span>algo extraordinario?</span></h2><p>Cuéntanos qué quieres conseguir. Primero entendemos la idea; después construimos el camino.</p></Reveal>
        <Reveal delay={130}><button className="auto-button auto-button-dark" onClick={openAdvisor}>Hablemos de tu proyecto <ArrowUpRight size={18} /></button></Reveal>
      </div>
      <div className="auto-contact-bottom"><span>AUTOMATA · DIGITAL EXPERIENCES &amp; INTELLIGENT SOLUTIONS</span><span>TARIJA / BOLIVIA</span></div>
    </section>
  </div>;
}

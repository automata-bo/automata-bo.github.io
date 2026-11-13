import React, { useEffect, useRef, useState } from "react";
import MorphGeometry from "./MorphGeometry";
import BilingualText from "./BilingualText";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Bot, Camera, Clapperboard, Heart, MessageCircle, MonitorSmartphone, Workflow } from "lucide-react";

type DemoKey = "digital" | "experiences" | "studio";
const demos: Record<DemoKey, { label: string; labelEn: string; question: string; questionEn: string; answer: string; answerEn: string; result: string; resultEn: string; href: string; tag: string }> = {
  digital: {
    label: "Atención inteligente",
    labelEn: "Smart service",
    question: "Tengo un negocio y no alcanzo a responder todos los mensajes.",
    questionEn: "I run a business and can’t keep up with all the messages.",
    answer: "Diseñamos un recorrido de atención que responde consultas frecuentes y organiza cada solicitud para que tu equipo continúe.",
    answerEn: "We design a service journey that answers common questions and organizes each request for your team to follow up.",
    result: "Una atención más clara, sin perder el trato humano.",
    resultEn: "Clearer customer service, without losing the human touch.",
    href: "/digital/",
    tag: "DIGITAL"
  },
  experiences: {
    label: "Recuerdos compartidos",
    labelEn: "Shared memories",
    question: "Quiero que los invitados de mi boda compartan sus fotografías.",
    questionEn: "I want wedding guests to share their photos.",
    answer: "Creamos una experiencia con acceso QR y una galería comunitaria para reunir los momentos desde los teléfonos de los invitados.",
    answerEn: "We create a QR-enabled experience and shared gallery where guests can add moments from their phones.",
    result: "Una memoria colectiva que sigue creciendo después del evento.",
    resultEn: "A shared memory that keeps growing after the event.",
    href: "/experiences/",
    tag: "EXPERIENCES"
  },
  studio: {
    label: "Una idea que contar",
    labelEn: "An idea to tell",
    question: "Necesito presentar un producto de una manera diferente.",
    questionEn: "I need to present a product in a different way.",
    answer: "Exploramos un concepto visual, una narrativa y una pieza audiovisual que puede combinar producción real, diseño y herramientas de IA.",
    answerEn: "We explore a visual concept, narrative, and audiovisual piece that can combine live production, design, and AI tools.",
    result: "Una dirección creativa con una forma propia.",
    resultEn: "A creative direction with its own identity.",
    href: "/studio/",
    tag: "STUDIO"
  }
};

function openAdvisor(interest?: "morph-assistant" | "morph-whatsapp") {
  const detail = interest
    ? {
        source: "home",
        productId: "digital-assistants",
        action: "explore",
        draft: interest === "morph-assistant"
          ? "Quiero conocer MORPH Assistant para mi página web o aplicación."
          : "Quiero conocer MORPH WhatsApp para la cuenta de WhatsApp Business de mi negocio."
      }
    : { source: "home" };
  window.dispatchEvent(new CustomEvent("automata:open-chat", { detail }));
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let observer: IntersectionObserver | undefined;
    const startObserving = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setVisible(true);
        return;
      }
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer?.disconnect();
        }
      }, { threshold: 0.12 });
      observer.observe(node);
    };

    if (document.documentElement.dataset.introPending === "true") {
      document.addEventListener("intro:done", startObserving, { once: true });
    } else {
      startObserving();
    }
    return () => {
      document.removeEventListener("intro:done", startObserving);
      observer?.disconnect();
    };
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
  const [selectedDivision, setSelectedDivision] = useState<DemoKey | null>(null);
  const divisionsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!selectedDivision) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedDivision(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedDivision]);

  return <div className="automata-editorial">
    <section className="auto-hero" id="inicio">
      <div className="auto-hero-top">
        <span className="auto-kicker"><i /> DIGITAL EXPERIENCES &amp; INTELLIGENT SOLUTIONS</span>
        <span className="auto-index">TARIJA, BOLIVIA · 2026</span>
      </div>
      <div className="auto-hero-center">
        <Reveal><p className="auto-overline"><BilingualText en="DIGITAL EXPERIENCES &amp; INTELLIGENT SOLUTIONS" es="EXPERIENCIAS DIGITALES Y SOLUCIONES INTELIGENTES" /></p></Reveal>
        <h1 className="auto-display auto-hero-title">
          <Reveal delay={80}><span>Beyond Digital.</span></Reveal>
          <Reveal delay={190}><span className="auto-hero-into">Into</span></Reveal>
          <Reveal delay={300}><span className="auto-gradient-text">Experiences.</span></Reveal>
        </h1>
        <Reveal delay={430}>
          <p className="auto-hero-manifesto"><BilingualText en="100% HUMAN." es="100% HUMANO." /> <span>100% AI.</span> <strong>200% AUTOMATA.</strong></p>
          <div className="auto-actions">
            <a className="auto-button auto-button-dark" href="#divisiones"><BilingualText en="Explore the studio" es="Explorar el estudio" /> <ArrowDownRight size={17} /></a>
            <a className="auto-button auto-button-line" href="#morph"><BilingualText en="Meet Morph" es="Conoce Morph" /> <ArrowUpRight size={17} /></a>
            <button className="auto-button auto-button-line" onClick={() => openAdvisor()}><BilingualText en="Let’s talk" es="Conversemos" /> <ArrowUpRight size={17} /></button>
          </div>
        </Reveal>
      </div>
      <div className="auto-hero-bottom"><span><BilingualText en="DIGITAL STUDIO" es="ESTUDIO DIGITAL" /></span><span><BilingualText en="DESIGN · TECHNOLOGY · AI" es="DISEÑO · TECNOLOGÍA · IA" /></span><span><BilingualText en="SCROLL DOWN ↓" es="DESPLÁZATE ↓" /></span></div>
    </section>

    <section className="auto-divisions auto-divisions-redesigned" id="divisiones" ref={divisionsRef}>
      <div className="auto-section-intro">
        <Reveal><p className="auto-overline">01 — THE AUTOMATA ECOSYSTEM</p><h2 className="auto-display">Three divisions.<br /><span className="auto-gradient-text">One vision.</span></h2></Reveal>
        <Reveal delay={180}><p className="auto-section-copy"><BilingualText en="Three disciplines. One connected way to turn ideas into useful solutions, meaningful experiences, and stories worth telling." es="Tres disciplinas. Una forma integrada de convertir ideas en soluciones útiles, experiencias memorables e historias que merecen ser contadas." /></p></Reveal>
      </div>
      <div className="auto-division-list auto-division-list-redesigned">
        <button type="button" className="auto-division division-blue" onClick={() => setSelectedDivision("digital")} aria-haspopup="dialog">
          <span className="auto-division-number">01</span><div className="auto-division-main"><h3 className="auto-display">Digital<span>.</span></h3><p><BilingualText en="Digital products and systems that make things work better." es="Productos y sistemas digitales que hacen que las cosas funcionen mejor." /></p><small>WEB · SISTEMAS · IA · AUTOMATIZACIÓN</small></div><span className="auto-division-arrow"><ArrowUpRight /></span>
        </button>
        <button type="button" className="auto-division division-pink" onClick={() => setSelectedDivision("experiences")} aria-haspopup="dialog">
          <span className="auto-division-number">02</span><div className="auto-division-main"><h3 className="auto-display">Experiences<span>.</span></h3><p><BilingualText en="Participatory moments that become shared memories." es="Momentos participativos que se convierten en recuerdos compartidos." /></p><small>EVENTOS · INTERACCIÓN · MEMORIAS DIGITALES</small></div><span className="auto-division-arrow"><ArrowUpRight /></span>
        </button>
        <button type="button" className="auto-division division-orange" onClick={() => setSelectedDivision("studio")} aria-haspopup="dialog">
          <span className="auto-division-number">03</span><div className="auto-division-main"><h3 className="auto-display">Studio<span>.</span></h3><p><BilingualText en="Ideas shaped into images, narratives, and audiovisual pieces." es="Ideas convertidas en imágenes, narrativas y piezas audiovisuales." /></p><small>PRODUCCIÓN · FOTOGRAFÍA · DIRECCIÓN CREATIVA</small></div><span className="auto-division-arrow"><ArrowUpRight /></span>
        </button>
      </div>
      <div className="auto-divisions-atmosphere" aria-hidden="true"><span>IDEAS</span><span>DESIGN</span><span>INTELLIGENCE</span><i /></div>
      <div className="auto-section-foot"><span>UNDERSTAND / IMAGINE / BUILD</span><span>SELECT A DIVISION ↗</span></div>
    </section>
    {selectedDivision && <div className="auto-division-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedDivision(null); }}>
      <section className={"auto-division-modal division-modal-" + selectedDivision} role="dialog" aria-modal="true" aria-labelledby="division-modal-title">
        <button type="button" className="auto-division-modal-close" onClick={() => setSelectedDivision(null)} aria-label="Cerrar ventana"><span>×</span></button>
        <p className="auto-overline">AUTOMATA / 0{selectedDivision === "digital" ? "1" : selectedDivision === "experiences" ? "2" : "3"}</p>
        <h2 id="division-modal-title" className="auto-display">{selectedDivision === "digital" ? "Digital." : selectedDivision === "experiences" ? "Experiences." : "Studio."}</h2>
        <p className="auto-division-modal-lead">{selectedDivision === "digital" ? <BilingualText en="We design digital products, websites, intelligent assistants, automations, and integrations around real needs." es="Diseñamos productos digitales, sitios web, asistentes inteligentes, automatizaciones e integraciones alrededor de necesidades reales." /> : selectedDivision === "experiences" ? <BilingualText en="We create interactive experiences for people, events, and brands, connecting moments through thoughtful digital layers." es="Creamos experiencias interactivas para personas, eventos y marcas, conectando momentos mediante capas digitales pensadas con intención." /> : <BilingualText en="We bring ideas to life through audiovisual production, photography, creative direction, and hybrid creation with AI." es="Damos forma a ideas mediante producción audiovisual, fotografía, dirección creativa y creación híbrida con IA." />}</p>
        <div className="auto-division-modal-details">
          <span>{selectedDivision === "digital" ? "WEB · SYSTEMS · AI · AUTOMATION" : selectedDivision === "experiences" ? "EVENTS · INTERACTION · SHARED MEMORIES" : "PRODUCTION · PHOTOGRAPHY · CREATIVE DIRECTION"}</span>
          <p>{selectedDivision === "digital" ? "Technology designed around people and real processes." : selectedDivision === "experiences" ? "Invitations, event interactions, QR galleries, and shared albums." : "Concept, visual language, storytelling, and audiovisual pieces."}</p>
        </div>
        <button type="button" className="auto-division-modal-cta" onClick={() => { const draft = selectedDivision === "digital" ? "Quiero conversar sobre una solución Digital." : selectedDivision === "experiences" ? "Quiero diseñar una Experience." : "Quiero desarrollar un proyecto con Studio."; setSelectedDivision(null); window.dispatchEvent(new CustomEvent("automata:open-chat", { detail: { source: "home", action: "explore", draft } })); }}>
          <BilingualText en="Start a conversation" es="Conversemos sobre tu idea" /> <ArrowUpRight size={17} />
        </button>
      </section>
    </div>}

    <section className="auto-morph-section" id="morph">
      <MorphGeometry />
      <div className="auto-morph-inner">
        <Reveal><p className="auto-overline"><BilingualText en="MORPH / INTELLIGENT ASSISTANTS" es="MORPH / ASISTENTES INTELIGENTES" /></p><h2 className="auto-display"><BilingualText en="Intelligence" es="La inteligencia" /><br /><BilingualText en="that works" es="que trabaja" /> <BilingualText className="auto-gradient-text" en="with you." es="contigo." /></h2></Reveal>
        <Reveal delay={120}><p className="auto-morph-intro"><BilingualText en="Two ways to bring intelligent assistance into the spaces where your business happens. One coherent experience, designed and managed by AUTOMATA." es="Dos formas de integrar asistencia inteligente en los espacios donde ocurre tu negocio. Una experiencia coherente, diseñada y gestionada por AUTOMATA." /></p></Reveal>
        <div className="auto-morph-products">
          <Reveal><article className="auto-morph-product">
            <span className="auto-morph-product-index">01 / WEB &amp; APPS</span>
            <div><p className="auto-morph-eyebrow">MORPH ASSISTANT</p><h3 className="auto-display"><BilingualText en="Your assistant." es="Tu asistente." /><br /><BilingualText en="In your digital space." es="En tu espacio digital." /></h3><p><BilingualText en="An intelligent assistant built into your website or app. It answers questions, guides visitors, and connects every conversation to the next step." es="Un asistente inteligente integrado en tu página web o aplicación. Atiende consultas, orienta a tus visitantes y conecta cada conversación con el siguiente paso." /></p></div>
            <button type="button" onClick={() => openAdvisor("morph-assistant")}><BilingualText en="Explore MORPH Assistant" es="Conocer MORPH Assistant" /> <ArrowUpRight size={17} /></button>
          </article></Reveal>
          <Reveal delay={120}><article className="auto-morph-product">
            <span className="auto-morph-product-index">02 / WHATSAPP BUSINESS</span>
            <div><p className="auto-morph-eyebrow">MORPH WHATSAPP</p><h3 className="auto-display"><BilingualText en="Your business." es="Tu negocio." /><br /><BilingualText en="In every conversation." es="En cada conversación." /></h3><p><BilingualText en="An intelligent assistant for your business WhatsApp Business account. It responds, organizes requests, and supports customer service while people stay in control." es="Un asistente inteligente para la cuenta de WhatsApp Business de tu negocio. Responde, organiza solicitudes y acompaña la atención sin perder el control humano." /></p></div>
            <button type="button" onClick={() => openAdvisor("morph-whatsapp")}><BilingualText en="Explore MORPH WhatsApp" es="Conocer MORPH WhatsApp" /> <ArrowUpRight size={17} /></button>
          </article></Reveal>
        </div>
        <p className="auto-morph-footnote"><BilingualText en="MORPH is a managed service by AUTOMATA. Technology works behind the scenes; your business keeps control of its channels and conversations." es="MORPH es un servicio gestionado de AUTOMATA. La tecnología trabaja detrás; tu negocio conserva el control de sus canales y conversaciones." /></p>
      </div>
    </section>

    <section className="auto-explore" id="explora">
      <div className="auto-explore-heading">
        <Reveal><p className="auto-overline"><BilingualText en="02 — EXPLORE WHAT WE CAN DO" es="02 — EXPLORA LO QUE PODEMOS HACER" /></p><h2 className="auto-display"><BilingualText en="Every idea" es="Cada idea" /><br /><BilingualText en="opens a" es="abre un" /> <span className="auto-gradient-text"><BilingualText en="new path." es="camino." /></span></h2></Reveal>
        <Reveal delay={120}><p className="auto-section-copy"><BilingualText en="Three areas, different ways to solve a challenge. Explore each one and discover what’s possible." es="Tres áreas, distintas maneras de resolver un reto. Entra en cada una y descubre sus posibilidades." /></p></Reveal>
      </div>
      <div className="auto-capability-grid">
        <Reveal><a className="auto-capability capability-digital" href="/digital/"><span className="auto-capability-meta">01 / DIGITAL <MonitorSmartphone /></span><div><h3 className="auto-display"><BilingualText en="Systems" es="Sistemas" /><br /><BilingualText en="that connect." es="que conectan." /></h3><p><BilingualText en="Web experiences, assistants, automation, and integrations." es="Experiencias web, asistentes, automatización e integraciones." /></p><span className="auto-text-link"><BilingualText en="Explore Digital" es="Explorar Digital" /> <ArrowRight size={16} /></span></div></a></Reveal>
        <Reveal delay={90}><a className="auto-capability capability-experiences" href="/experiences/"><span className="auto-capability-meta">02 / EXPERIENCES <Heart /></span><div><h3 className="auto-display"><BilingualText en="Moments" es="Momentos" /><br /><BilingualText en="that stay with you." es="que permanecen." /></h3><p><BilingualText en="Invitations, events, shared albums, and interactive experiences." es="Invitaciones, eventos, álbumes colectivos y experiencias interactivas." /></p><span className="auto-text-link"><BilingualText en="Explore Experiences" es="Explorar Experiences" /> <ArrowRight size={16} /></span></div></a></Reveal>
        <Reveal delay={180}><a className="auto-capability capability-studio" href="/studio/"><span className="auto-capability-meta">03 / STUDIO <Clapperboard /></span><div><h3 className="auto-display"><BilingualText en="Stories" es="Historias" /><br /><BilingualText en="with identity." es="con identidad." /></h3><p><BilingualText en="Audiovisual production, photography, and hybrid creation with AI." es="Producción audiovisual, fotografía y creación híbrida con IA." /></p><span className="auto-text-link"><BilingualText en="Explore Studio" es="Explorar Studio" /> <ArrowRight size={16} /></span></div></a></Reveal>
      </div>
    </section>

    <section className="auto-demo-section" id="proyectos">
      <div className="auto-demo-heading">
        <Reveal><p className="auto-overline"><BilingualText en="03 — PROJECTS & EXPERIENCES" es="03 — PROYECTOS Y EXPERIENCIAS" /></p><h2 className="auto-display"><BilingualText en="Don’t just imagine it." es="No lo imagines." /><br /><span className="auto-gradient-text"><BilingualText en="Explore it." es="Explóralo." /></span></h2></Reveal>
        <Reveal delay={120}><p className="auto-section-copy"><BilingualText en="Try interactive journeys and prototypes. Each experience clearly states what is simulated and what is available." es="Prueba recorridos y prototipos. Cada experiencia indica claramente qué es una simulación y qué está disponible." /></p></Reveal>
      </div>
      <div className="auto-demo-layout">
        <div className="auto-demo-tabs" role="tablist" aria-label="Explorar ejemplos de AUTOMATA">
          {(Object.keys(demos) as DemoKey[]).map((key) => <button key={key} type="button" role="tab" aria-selected={active === key} className={"auto-demo-tab " + (active === key ? "active" : "")} onClick={() => setActive(key)}><span>{demos[key].tag}</span><strong><BilingualText en={demos[key].labelEn} es={demos[key].label} /></strong><ArrowUpRight size={17} /></button>)}
        </div>
        <div className="auto-demo-preview" role="tabpanel">
          <div className="auto-demo-preview-top"><span><BilingualText en="INTERACTIVE EXPERIENCE / PREVIEW" es="EXPERIENCIA INTERACTIVA / PREVISUALIZACIÓN" /></span><span className="auto-demo-status"><BilingualText en="SIMULATED EXAMPLE" es="EJEMPLO SIMULADO" /></span></div>
          <div className="auto-conversation">
            <div className="auto-message message-human"><span><BilingualText en="PERSON" es="PERSONA" /></span><p><BilingualText en={current.questionEn} es={current.question} /></p></div>
            <div className="auto-message-arrow"><ArrowRight /></div>
            <div className="auto-message message-automata"><span><Bot size={14} /> AUTOMATA</span><p><BilingualText en={current.answerEn} es={current.answer} /></p></div>
          </div>
          <div className="auto-demo-result"><span><BilingualText en="POSSIBLE OUTCOME" es="POSIBLE RESULTADO" /></span><p><BilingualText en={current.resultEn} es={current.result} /></p></div>
          <div className="auto-demo-actions"><a className="auto-button auto-button-dark" href={current.href}><BilingualText en="Explore this capability" es="Conocer esta capacidad" /> <ArrowUpRight size={16} /></a><button className="auto-button auto-button-line" onClick={() => openAdvisor()}><BilingualText en="Talk to our advisor" es="Conversar con el asesor" /> <MessageCircle size={16} /></button></div>
        </div>
      </div>
      <div className="auto-project-links"><a href="/proyectos/">Ver todos los proyectos y prototipos <ArrowUpRight size={16} /></a><a href="/demos/">Abrir laboratorio de demos <ArrowUpRight size={16} /></a></div>
    </section>

    <section className="auto-contact">
      <div className="auto-contact-orbit" aria-hidden="true" />
      <div className="auto-contact-inner">
        <Reveal><p className="auto-overline"><BilingualText en="04 — THE NEXT STEP" es="04 — EL SIGUIENTE PASO" /></p><h2 className="auto-display"><BilingualText en="What if we made" es="¿Y si hacemos" /><br /><span><BilingualText en="something extraordinary?" es="algo extraordinario?" /></span></h2><p>Cuéntanos qué quieres conseguir. Primero entendemos la idea; después construimos el <BilingualText en="new path." es="camino." /></p></Reveal>
        <Reveal delay={130}><button className="auto-button auto-button-dark" onClick={() => openAdvisor()}><BilingualText en="Let’s talk about your project" es="Hablemos de tu proyecto" /> <ArrowUpRight size={18} /></button></Reveal>
      </div>
      <div className="auto-contact-bottom"><span>AUTOMATA · DIGITAL EXPERIENCES &amp; INTELLIGENT SOLUTIONS</span><span>TARIJA / BOLIVIA</span></div>
    </section>
  </div>;
}

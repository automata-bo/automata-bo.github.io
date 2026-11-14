import React, { useEffect, useRef, useState } from "react";
import MorphGeometry from "./MorphGeometry";
import BilingualText from "./BilingualText";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  CalendarDays,
  Film,
  Heart,
  MapPin,
  MessageCircle,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Smile,
  Sparkles,
  Video
} from "lucide-react";
import { ServiceType } from "./ExpandingServiceModal";
import { projectsData, ProjectItem } from "./projectsData";

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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
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
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const [heroReady, setHeroReady] = useState(() => document.documentElement.dataset.introPending !== "true");
  const [s1Stage, setS1Stage] = useState(0); // 0=idle, 1=elastic-bg, 2=title-center, 3=title-settled, 4=cards-enter
  const [s2Stage, setS2Stage] = useState(0);
  const [s3Stage, setS3Stage] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("invitacion-interactiva");
  const [activeFilter, setActiveFilter] = useState<"all" | "digital" | "experiences" | "studio" | "morph">("all");

  useEffect(() => {
    if (document.documentElement.dataset.introPending === "true") {
      const onIntroDone = () => setHeroReady(true);
      document.addEventListener("intro:done", onIntroDone, { once: true });
      return () => document.removeEventListener("intro:done", onIntroDone);
    }
  }, []);

  useEffect(() => {
    const obs1 = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setS1Stage((prev) => (prev < 1 ? 1 : prev));
      }
    }, { threshold: 0.12 });
    if (section1Ref.current) obs1.observe(section1Ref.current);

    const obs2 = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setS2Stage((prev) => (prev < 1 ? 1 : prev));
      }
    }, { threshold: 0.12 });
    if (section2Ref.current) obs2.observe(section2Ref.current);

    const obs3 = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setS3Stage((prev) => (prev < 1 ? 1 : prev));
      }
    }, { threshold: 0.12 });
    if (section3Ref.current) obs3.observe(section3Ref.current);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight;

          if (section1Ref.current) {
            const r1 = section1Ref.current.getBoundingClientRect();
            if (r1.top < vh * 0.88 && r1.bottom > 0) setS1Stage((p) => (p < 1 ? 1 : p));
            if (r1.top < vh * 0.72) setS1Stage((p) => (p < 2 ? 2 : p));
            if (r1.top < vh * 0.48) setS1Stage((p) => (p < 3 ? 3 : p));
            if (r1.top < vh * 0.28) setS1Stage(4);
          }

          if (section2Ref.current) {
            const r2 = section2Ref.current.getBoundingClientRect();
            if (r2.top < vh * 0.88 && r2.bottom > 0) setS2Stage((p) => (p < 1 ? 1 : p));
            if (r2.top < vh * 0.72) setS2Stage((p) => (p < 2 ? 2 : p));
            if (r2.top < vh * 0.48) setS2Stage((p) => (p < 3 ? 3 : p));
            if (r2.top < vh * 0.28) setS2Stage(4);
          }

          if (section3Ref.current) {
            const r3 = section3Ref.current.getBoundingClientRect();
            if (r3.top < vh * 0.88 && r3.bottom > 0) setS3Stage((p) => (p < 1 ? 1 : p));
            if (r3.top < vh * 0.72) setS3Stage((p) => (p < 2 ? 2 : p));
            if (r3.top < vh * 0.48) setS3Stage((p) => (p < 3 ? 3 : p));
            if (r3.top < vh * 0.28) setS3Stage(4);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      obs1.disconnect();
      obs2.disconnect();
      obs3.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openServiceModal = (e: React.MouseEvent, service: ServiceType) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const origin = {
      x: Math.round(e.clientX || rect.left + rect.width / 2),
      y: Math.round(e.clientY || rect.top + rect.height / 2),
    };
    window.dispatchEvent(
      new CustomEvent("automata:open-service-modal", {
        detail: { service, origin },
      })
    );
  };

  const handleOpenProjectDemo = (e: React.MouseEvent, project: ProjectItem) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const origin = {
      x: Math.round(e.clientX || rect.left + rect.width / 2),
      y: Math.round(e.clientY || rect.top + rect.height / 2),
    };

    if (project.id === "invitacion-interactiva") {
      window.dispatchEvent(
        new CustomEvent("automata:open-service-modal", {
          detail: { service: "demo-invitacion", origin },
        })
      );
      return;
    }

    if (project.id === "creative-narrative-lab") {
      window.dispatchEvent(
        new CustomEvent("automata:open-service-modal", {
          detail: { service: "demo-storytelling", origin },
        })
      );
      return;
    }

    if (project.id === "digital-cafe-experience") {
      window.dispatchEvent(
        new CustomEvent("automata:open-service-modal", {
          detail: { service: "demo-cafe", origin },
        })
      );
      return;
    }

    if (project.id === "morph-whatsapp-business") {
      window.dispatchEvent(
        new CustomEvent("automata:open-service-modal", {
          detail: { service: "demo-whatsapp", origin },
        })
      );
      return;
    }

    if (project.demoUrl) {
      window.location.href = project.demoUrl;
    } else if (project.route) {
      window.location.href = project.route;
    }
  };

  const filteredProjects = activeFilter === "all"
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  const selectedProject =
    filteredProjects.find((p) => p.id === selectedProjectId) ||
    filteredProjects[0] ||
    projectsData[0];

  return <div className="automata-editorial">
    {/* ─── HERO: FONDO BLANCO, TÍTULOS Y ACCIONES ORIGINALES ─── */}
    <section className="auto-hero" id="inicio">
      <div className="auto-hero-top">
        <span className="auto-kicker"><i /> DIGITAL EXPERIENCES &amp; INTELLIGENT SOLUTIONS</span>
        <span className="auto-index">TARIJA, BOLIVIA · 2026</span>
      </div>
      <div className={`auto-hero-center ${heroReady ? "is-hero-ready" : "is-hero-waiting"}`}>
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
            <button className="auto-button auto-button-line" onClick={() => openAdvisor()}><BilingualText en="Let's talk" es="Conversemos" /> <ArrowUpRight size={17} /></button>
          </div>
        </Reveal>
      </div>
      <div className="auto-hero-bottom"><span><BilingualText en="DIGITAL STUDIO" es="ESTUDIO DIGITAL" /></span><span><BilingualText en="DESIGN · TECHNOLOGY · AI" es="DISEÑO · TECNOLOGÍA · IA" /></span><span><BilingualText en="SCROLL DOWN ↓" es="DESPLÁZATE ↓" /></span></div>
    </section>

    {/* ─── SECCIÓN 1: THE AUTOMATA ECOSYSTEM (FONDO NEGRO, EFECTO ELÁSTICO, TÍTULO PRIMERO, LUEGO FICHAS) ─── */}
    <section className={`auto-divisions ${s1Stage >= 1 ? "is-visible" : ""}`} id="divisiones" ref={section1Ref}>
      {/* Transición de fondo elástico */}
      <div className={`elastic-sheet ${s1Stage >= 1 ? "is-stretched" : ""}`} aria-hidden="true">
        <svg viewBox="0 0 1440 240" preserveAspectRatio="none" className="elastic-sheet-svg">
          <path
            className="elastic-sheet-path"
            d={s1Stage >= 1
              ? "M 0,240 C 480,-100 960,-100 1440,240 L 1440,240 L 0,240 Z"
              : "M 0,240 C 480,240 960,240 1440,240 L 1440,240 L 0,240 Z"}
          />
        </svg>
      </div>

      <div className="auto-divisions-inner">
        {/* Columna Izquierda: Intro animado (Línea por línea con máscara) */}
        <div className={`auto-section-intro ${s1Stage === 2 ? "stage-intro-center" : s1Stage >= 3 ? "stage-intro-settled" : "stage-intro-hidden"}`}>
          <div className="title-mask-wrap">
            <p className="auto-overline title-line-kicker">
              <BilingualText en="01 — THE AUTOMATA ECOSYSTEM" es="01 — EL ECOSISTEMA AUTOMATA" />
            </p>
          </div>
          <h2 className="auto-display title-reveal-heading">
            <span className="title-mask-line">
              <span className="title-line-inner line-1">
                <BilingualText en="Three divisions." es="Tres divisiones." />
              </span>
            </span>
            <span className="title-mask-line">
              <span className="title-line-inner line-2 auto-gradient-text">
                <BilingualText en="One vision." es="Una visión." />
              </span>
            </span>
          </h2>
          <p className="auto-section-copy title-copy-reveal">
            <BilingualText en="We don't build technology for its own sake. We bring disciplines together to create useful solutions, memorable experiences, and stories worth telling." es="No hacemos tecnología por hacerla. Unimos disciplinas para crear soluciones útiles, experiencias memorables e historias que merecen ser contadas." />
          </p>
        </div>

        {/* Columna Derecha: Las 3 fichas originales */}
        <div className={`auto-division-list ${s1Stage >= 4 ? "stage-cards-enter" : "stage-cards-hidden"}`}>
          {/* Ficha 1: Digital */}
          <a
            className="auto-division division-blue"
            href="/digital/"
            onClick={(e) => openServiceModal(e, "digital")}
          >
            <span className="auto-division-number">01</span>
            <div className="auto-division-main">
              <h3 className="auto-display">Digital<span>.</span></h3>
              <p><BilingualText en="We build tools and systems that make things work better." es="Construimos herramientas y sistemas que hacen que las cosas funcionen mejor." /></p>
              <small>WEB · SISTEMAS · IA · AUTOMATIZACIÓN</small>
            </div>
            <span className="auto-division-arrow"><ArrowUpRight /></span>
          </a>

          {/* Ficha 2: Experiences */}
          <a
            className="auto-division division-pink"
            href="/experiences/"
            onClick={(e) => openServiceModal(e, "experiences")}
          >
            <span className="auto-division-number">02</span>
            <div className="auto-division-main">
              <h3 className="auto-display">Experiences<span>.</span></h3>
              <p><BilingualText en="We design participatory moments that become shared memories." es="Diseñamos momentos participativos que se convierten en recuerdos compartidos." /></p>
              <small>EVENTOS · INTERACCIÓN · MEMORIAS DIGITALES</small>
            </div>
            <span className="auto-division-arrow"><ArrowUpRight /></span>
          </a>

          {/* Ficha 3: Studio */}
          <a
            className="auto-division division-orange"
            href="/studio/"
            onClick={(e) => openServiceModal(e, "studio")}
          >
            <span className="auto-division-number">03</span>
            <div className="auto-division-main">
              <h3 className="auto-display">Studio<span>.</span></h3>
              <p><BilingualText en="We turn ideas into images, narratives, and audiovisual pieces." es="Convertimos ideas en imágenes, narrativas y piezas audiovisuales." /></p>
              <small>PRODUCCIÓN · FOTOGRAFÍA · DIRECCIÓN CREATIVA</small>
            </div>
            <span className="auto-division-arrow"><ArrowUpRight /></span>
          </a>
        </div>
      </div>
      <div className="auto-section-foot"><span><BilingualText en="UNDERSTAND / IMAGINE / BUILD" es="COMPRENDER / IMAGINAR / CONSTRUIR" /></span><span><BilingualText en="SCROLL TO EXPLORE ↓" es="SCROLL PARA EXPLORAR ↓" /></span></div>
    </section>

    {/* ─── SECCIÓN 2: MORPH / ASISTENTES INTELIGENTES (ALINEADO CRUZADO, FICHAS A LA IZQUIERDA, TÍTULO A LA DERECHA) ─── */}
    <section className={`auto-divisions auto-divisions-cross ${s2Stage >= 1 ? "is-visible" : ""}`} id="morph" ref={section2Ref}>
      <div className="morph-geometry-backdrop" aria-hidden="true">
        <MorphGeometry />
      </div>

      <div className="auto-divisions-inner">
        {/* Columna Izquierda: Las 2 fichas de Morph (reducidas, elegantes) */}
        <div className={`auto-morph-products ${s2Stage >= 4 ? "stage-cards-enter" : "stage-cards-hidden"}`}>
          {/* Ficha 1: MORPH ASSISTANT */}
          <article
            className="auto-morph-product"
            onClick={(e) => openServiceModal(e, "morph-assistant")}
            role="button"
            tabIndex={0}
          >
            <div className="auto-morph-product-header">
              <span className="auto-morph-product-index">01 / WEB &amp; APPS</span>
              <span className="auto-morph-eyebrow">MORPH ASSISTANT</span>
            </div>
            <div>
              <h3 className="auto-display">
                <BilingualText en="Your assistant." es="Tu asistente." /><br />
                <span className="text-[#ff5c1a]"><BilingualText en="In your digital space." es="En tu espacio digital." /></span>
              </h3>
              <p>
                <BilingualText en="An intelligent assistant built into your website or app. It answers questions, guides visitors, and connects every conversation to the next step." es="Un asistente inteligente integrado en tu página web o aplicación. Atiende consultas, orienta a tus visitantes y conecta cada conversación con el siguiente paso." />
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openAdvisor("morph-assistant");
              }}
            >
              <BilingualText en="Explore MORPH Assistant" es="Conocer MORPH Assistant" />
              <ArrowUpRight size={15} />
            </button>
          </article>

          {/* Ficha 2: MORPH WHATSAPP */}
          <article
            className="auto-morph-product"
            onClick={(e) => openServiceModal(e, "morph-whatsapp")}
            role="button"
            tabIndex={0}
          >
            <div className="auto-morph-product-header">
              <span className="auto-morph-product-index">02 / WHATSAPP BUSINESS</span>
              <span className="auto-morph-eyebrow text-[#25d366]">MORPH WHATSAPP</span>
            </div>
            <div>
              <h3 className="auto-display">
                <BilingualText en="Your business." es="Tu negocio." /><br />
                <span className="text-[#25d366]"><BilingualText en="In every conversation." es="En cada conversación." /></span>
              </h3>
              <p>
                <BilingualText en="An intelligent assistant for your business WhatsApp Business account. It responds, organizes requests, and supports customer service while people stay in control." es="Un asistente inteligente para la cuenta de WhatsApp Business de tu negocio. Responde, organiza solicitudes y acompaña la atención sin perder el control humano." />
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openAdvisor("morph-whatsapp");
              }}
            >
              <BilingualText en="Explore MORPH WhatsApp" es="Conocer MORPH WhatsApp" />
              <ArrowUpRight size={15} />
            </button>
          </article>
        </div>

        {/* Columna Derecha: Título y descripción (PROTAGONISTA) */}
        <div className={`auto-section-intro auto-section-intro-right ${s2Stage === 2 ? "stage-intro-center-right" : s2Stage >= 3 ? "stage-intro-settled-right" : "stage-intro-hidden"}`}>
          <div className="title-mask-wrap">
            <p className="auto-overline title-line-kicker">
              <BilingualText en="MORPH / INTELLIGENT ASSISTANTS" es="MORPH / ASISTENTES INTELIGENTES" />
            </p>
          </div>
          <h2 className="auto-display title-reveal-heading">
            <span className="title-mask-line">
              <span className="title-line-inner line-1">
                <BilingualText en="Intelligence" es="La inteligencia" />
              </span>
            </span>
            <span className="title-mask-line">
              <span className="title-line-inner line-2">
                <BilingualText en="that works" es="que trabaja" />{" "}
                <span className="auto-gradient-text"><BilingualText en="with you." es="contigo." /></span>
              </span>
            </span>
          </h2>
          <p className="auto-section-copy title-copy-reveal">
            <BilingualText en="Two ways to bring intelligent assistance into the spaces where your business happens. One coherent experience, designed and managed by AUTOMATA." es="Dos formas de integrar asistencia inteligente en los espacios donde ocurre tu negocio. Una experiencia coherente, diseñada y gestionada por AUTOMATA." />
          </p>
        </div>
      </div>

      <div className="auto-section-foot">
        <span><BilingualText en="MORPH MANAGED SERVICE" es="SERVICIO GESTIONADO MORPH" /></span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>

    {/* ─── SECCIÓN 3: PROJECTS & EXPERIENCES (FONDO BLANCO, ENTRADA ELÁSTICA Y SHOWCASE INTERACTIVO) ─── */}
    <section
      className={`auto-projects-white ${s3Stage >= 1 ? "is-visible" : ""}`}
      id="proyectos"
      ref={section3Ref}
    >
      {/* Transición elástica de fondo blanco elevándose desde el fondo oscuro */}
      <div className="elastic-sheet-white" aria-hidden="true">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="elastic-sheet-svg">
          <path
            className="elastic-sheet-path-white"
            d={s3Stage >= 1
              ? "M 0 160 Q 720 160 1440 160 L 1440 160 L 0 160 Z"
              : "M 0 160 Q 720 0 1440 160 L 1440 160 L 0 160 Z"}
          />
        </svg>
      </div>

      {/* Header con revelación tipográfica de líneas */}
      <div
        className={`projects-section-header ${
          s3Stage === 0
            ? "stage-intro-hidden-white"
            : s3Stage <= 2
            ? "stage-intro-center-white"
            : "stage-intro-settled-white"
        }`}
      >
        <p className="auto-overline title-mask-wrap">
          <span className="title-line-kicker">
            <BilingualText en="03 — PROJECTS &amp; EXPERIENCES" es="03 — PROYECTOS Y EXPERIENCIAS" />
          </span>
        </p>
        <h2 className="auto-display title-reveal-heading">
          <span className="title-mask-line">
            <span className="title-line-inner line-1">
              <BilingualText en="Don't just imagine it." es="No lo imagines." />
            </span>
          </span>
          <span className="title-mask-line">
            <span className="title-line-inner line-2">
              <span className="auto-gradient-text">
                <BilingualText en="Explore it." es="Explóralo." />
              </span>
            </span>
          </span>
        </h2>
        <p className="auto-section-copy title-copy-reveal">
          <BilingualText
            en="Interactive journeys, functional prototypes, and live systems. Each piece clearly documents what is simulated and what is available right now."
            es="Recorridos interactivos, prototipos funcionales y sistemas disponibles. Cada pieza documenta claramente qué es una simulación y qué está operativo ahora mismo."
          />
        </p>
      </div>

      {/* Showcase interactivo con filtros, lista de navegación y detalle en vivo */}
      <div className={`projects-showcase-wrap ${s3Stage >= 4 ? "projects-showcase-enter" : ""}`}>
        {/* Barra de filtros */}
        <div className="projects-filter-bar" role="toolbar" aria-label="Filtrar por categoría">
          {[
            { id: "all", label: "Todos", labelEn: "All" },
            { id: "digital", label: "Digital", labelEn: "Digital" },
            { id: "experiences", label: "Experiences", labelEn: "Experiences" },
            { id: "studio", label: "Studio", labelEn: "Studio" },
            { id: "morph", label: "Morph", labelEn: "Morph" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              className={`projects-filter-pill ${activeFilter === f.id ? "is-active" : ""}`}
              onClick={() => {
                setActiveFilter(f.id as any);
                const matching = f.id === "all" ? projectsData : projectsData.filter((p) => p.category === f.id);
                if (matching.length > 0 && !matching.some((p) => p.id === selectedProjectId)) {
                  setSelectedProjectId(matching[0].id);
                }
              }}
            >
              <BilingualText en={f.labelEn} es={f.label} />
            </button>
          ))}
        </div>

        {/* Grid de navegación izquierda + panel interactivo derecha */}
        <div className="projects-showcase-grid">
          {/* Columna izquierda: Lista de proyectos */}
          <div className="projects-nav-list" role="tablist" aria-label="Proyectos de AUTOMATA">
            {filteredProjects.map((item) => {
              const isSelected = item.id === selectedProject.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`project-nav-card ${isSelected ? "is-selected" : ""}`}
                  onClick={() => setSelectedProjectId(item.id)}
                >
                  <div className="project-nav-meta">
                    <span className="project-cat-badge">
                      <BilingualText en={item.categoryLabelEn} es={item.categoryLabel} />
                    </span>
                    <span
                      className={`project-status-pill ${
                        item.status === "live" ? "status-pill-live" : "status-pill-prototype"
                      }`}
                    >
                      <BilingualText en={item.statusLabelEn} es={item.statusLabel} />
                    </span>
                  </div>
                  <h3 className="project-nav-title">
                    <span><BilingualText en={item.titleEn} es={item.title} /></span>
                    <ArrowUpRight
                      size={17}
                      style={{
                        opacity: isSelected ? 1 : 0.4,
                        transform: isSelected ? "rotate(45deg)" : "none",
                        transition: "transform 0.25s, opacity 0.25s"
                      }}
                    />
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Columna derecha: Panel interactivo y detalle */}
          <div className="project-detail-panel" role="tabpanel">
            <div className="project-detail-top">
              <span className="project-type-indicator">
                <BilingualText en={selectedProject.typeLabelEn} es={selectedProject.typeLabel} />
              </span>
              <div className="project-tech-tags">
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className="project-tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-detail-headline">
              <h3><BilingualText en={selectedProject.titleEn} es={selectedProject.title} /></h3>
              <p className="project-detail-desc">
                <BilingualText en={selectedProject.descriptionEn} es={selectedProject.description} />
              </p>
            </div>

            {/* Mockup interactivo específico por tipo de proyecto */}
            {selectedProject.id === "morph-whatsapp-business" ? (
              <div className="whatsapp-mockup-frame">
                {/* Cabecera WhatsApp Business con verificación oficial */}
                <div className="whatsapp-mockup-header">
                  <div className="whatsapp-mockup-user">
                    <div className="whatsapp-avatar">
                      <span>A</span>
                      <span className="whatsapp-verified-badge" title="Cuenta verificada">✓</span>
                    </div>
                    <div className="whatsapp-user-info">
                      <div className="whatsapp-user-name">
                        <strong>AUTOMATA Business</strong>
                        <span className="whatsapp-official-tag">OFICIAL</span>
                      </div>
                      <span className="whatsapp-user-status">
                        <BilingualText en="Official Business Account · Online" es="Cuenta de empresa oficial · En línea" />
                      </span>
                    </div>
                  </div>
                  <div className="whatsapp-header-actions">
                    <span className="whatsapp-icon-btn"><Phone size={15} /></span>
                    <span className="whatsapp-icon-btn"><Video size={16} /></span>
                    <span className="whatsapp-icon-btn"><MoreVertical size={16} /></span>
                  </div>
                </div>

                {/* Cuerpo del chat WhatsApp */}
                <div className="whatsapp-mockup-body">
                  <div className="whatsapp-encryption-note">
                    <span>🔒 <BilingualText en="Messages are end-to-end encrypted." es="Los mensajes están cifrados de extremo a extremo." /></span>
                  </div>
                  <div className="whatsapp-date-chip">
                    <span><BilingualText en="TODAY" es="HOY" /></span>
                  </div>

                  {/* Mensaje entrante del cliente */}
                  <div className="whatsapp-msg-row msg-incoming">
                    <div className="whatsapp-msg-bubble incoming">
                      <p className="whatsapp-msg-text">
                        <BilingualText
                          en="Hello! I run a store and I want to know how MORPH WhatsApp automates orders and FAQs."
                          es="¡Hola! Tengo un negocio y quisiera saber cómo MORPH WhatsApp automatiza pedidos y consultas."
                        />
                      </p>
                      <span className="whatsapp-msg-time">10:42</span>
                    </div>
                  </div>

                  {/* Mensaje saliente del asistente MORPH WhatsApp */}
                  <div className="whatsapp-msg-row msg-outgoing">
                    <div className="whatsapp-msg-bubble outgoing">
                      <div className="whatsapp-msg-sender">
                        <Bot size={12} /> AUTOMATA AI Assistant
                      </div>
                      <p className="whatsapp-msg-text">
                        <BilingualText
                          en="Hello! Welcome to AUTOMATA. MORPH connects directly to your WhatsApp Business number to respond in seconds, qualify leads, and schedule appointments 24/7."
                          es="¡Hola! Bienvenido a AUTOMATA. MORPH se conecta directo al WhatsApp Business de tu empresa para responder en segundos, filtrar clientes y tomar pedidos 24/7."
                        />
                      </p>
                      <div className="whatsapp-quick-replies">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            const rect = e.currentTarget.getBoundingClientRect();
                            window.dispatchEvent(
                              new CustomEvent("automata:open-service-modal", {
                                detail: {
                                  service: "demo-whatsapp",
                                  origin: {
                                    x: Math.round(e.clientX || rect.left + rect.width / 2),
                                    y: Math.round(e.clientY || rect.top + rect.height / 2)
                                  }
                                }
                              })
                            );
                          }}
                          className="whatsapp-reply-pill hover:bg-[#25d366]/20 transition-colors cursor-pointer"
                        >
                          📋 <BilingualText en="Test MORPH WhatsApp Demo" es="Probar demo MORPH WhatsApp" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openAdvisor("morph-whatsapp")}
                          className="whatsapp-reply-pill hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          💬 <BilingualText en="Talk to human advisor" es="Hablar con asesor humano" />
                        </button>
                      </div>
                      <div className="whatsapp-msg-footer">
                        <span className="whatsapp-msg-time">10:42</span>
                        <span className="whatsapp-checkmarks">✓✓</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Barra de entrada simulada de WhatsApp */}
                <div
                  className="whatsapp-mockup-input cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    window.dispatchEvent(
                      new CustomEvent("automata:open-service-modal", {
                        detail: {
                          service: "demo-whatsapp",
                          origin: {
                            x: Math.round(e.clientX || rect.left + rect.width / 2),
                            y: Math.round(e.clientY || rect.top + rect.height / 2)
                          }
                        }
                      })
                    );
                  }}
                  title="Abrir simulación interactiva completa"
                >
                  <div className="whatsapp-input-field">
                    <Smile size={16} className="text-[#8696a0]" />
                    <span><BilingualText en="Type a message to test MORPH..." es="Escribe para probar MORPH en vivo..." /></span>
                    <Paperclip size={16} className="text-[#8696a0]" />
                  </div>
                  <div className="whatsapp-mic-btn">
                    <Mic size={16} />
                  </div>
                </div>
              </div>
            ) : selectedProject.id === "digital-cafe-experience" ? (
              <div className="rounded-3xl bg-[#181310] border border-white/10 p-5 sm:p-6 overflow-hidden shadow-2xl space-y-4">
                {/* Cabecera de la cafetería */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-[#dfa85b]/20 text-[#dfa85b] flex items-center justify-center text-sm font-serif">
                      ☕
                    </span>
                    <div>
                      <strong className="text-sm font-serif text-white block">ORIGEN Specialty Coffee</strong>
                      <span className="text-[10px] font-mono text-[#dfa85b]">
                        <BilingualText en="Digital Self-Ordering Menu" es="Menú Digital de Autoservicio" />
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <BilingualText en="● Open now" es="● Abierto ahora" />
                  </span>
                </div>

                {/* Tarjeta de producto destacada interactiva */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#241c18] group">
                  <img
                    src="https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80"
                    alt="Flat White Especialidad"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#dfa85b] bg-black/60 px-2 py-0.5 rounded">
                        <BilingualText en="Featured Item" es="Producto Destacado" />
                      </span>
                      <h4 className="text-sm sm:text-base font-serif font-bold text-white mt-1">
                        Flat White Especialidad
                      </h4>
                      <p className="text-[11px] text-white/70">
                        <BilingualText en="Double shot · Velvety oat milk" es="Doble shot · Leche de avena sedosa" />
                      </p>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#dfa85b] bg-black/70 px-2 py-1 rounded-lg">
                      $4.50
                    </span>
                  </div>
                </div>

                {/* Micro-controles de personalización visual */}
                <div className="space-y-2 pt-1 text-xs">
                  <div className="flex items-center justify-between text-white/60 text-[11px] font-mono">
                    <span><BilingualText en="Selected Milk: Oat Barista" es="Leche: Avena Barista" /></span>
                    <span className="text-emerald-400">✓ <BilingualText en="In stock" es="Disponible" /></span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const rect = e.currentTarget.getBoundingClientRect();
                      window.dispatchEvent(
                        new CustomEvent("automata:open-service-modal", {
                          detail: {
                            service: "demo-cafe",
                            origin: {
                              x: Math.round(e.clientX || rect.left + rect.width / 2),
                              y: Math.round(e.clientY || rect.top + rect.height / 2)
                            }
                          }
                        })
                      );
                    }}
                    className="w-full py-3 rounded-full bg-[#d97443] hover:bg-[#c66535] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d97443]/20 transition-transform active:scale-98 flex items-center justify-center gap-2"
                  >
                    <span><BilingualText en="Open Full Digital Café Experience" es="Abrir Menú & Pedidos en Vivo" /></span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            ) : selectedProject.id === "invitacion-interactiva" ? (
              <div className="invitation-preview-card">
                <div className="invitation-preview-hero">
                  <div className="invitation-preview-emblem">
                    <Heart size={18} />
                  </div>
                  <span className="font-mono text-[9px] uppercase font-bold tracking-[0.24em] text-[#e9c99f]">
                    <BilingualText en="WE ARE DELIGHTED TO INVITE YOU" es="NOS HACE MUCHA ILUSIÓN INVITARTE" />
                  </span>
                  <h4 className="invitation-preview-names">
                    Camila <span className="text-[#e9c99f] font-sans font-light">&amp;</span> Gabriel
                  </h4>
                  <p className="font-serif text-xs italic text-white/70">
                    <BilingualText en="Celebrating our wedding · Tarija, 2027" es="Celebración de matrimonio · Tarija, 2027" />
                  </p>

                  {/* Video preview vertical */}
                  <div className="relative mx-auto my-3.5 w-28 sm:w-32 aspect-[9/16] rounded-xl overflow-hidden border border-[#e9c99f]/40 shadow-lg bg-[#070a0e]">
                    <video
                      src="/DEMO_fast.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover block"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070a0e]/60 via-transparent to-transparent" />
                  </div>

                  <div className="invitation-preview-details">
                    <span className="invitation-detail-pill">
                      <CalendarDays size={12} className="text-[#e9c99f]" /> 22 Mayo 2027
                    </span>
                    <span className="invitation-detail-pill">
                      <MapPin size={12} className="text-[#e9c99f]" /> Jardín de Los Olivos
                    </span>
                    <span className="invitation-detail-pill text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                      ✓ 142 RSVP confirmados
                    </span>
                  </div>
                </div>

                <div className="invitation-preview-rsvp">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span className="font-mono text-[10px] text-[#e9c99f] font-bold uppercase tracking-wider">
                      <BilingualText en="INTERACTIVE RSVP FORM" es="FORMULARIO REACTIVO DE ASISTENCIA" />
                    </span>
                    <span className="font-mono text-[9px] text-white/40">DEMO EN VIVO</span>
                  </div>

                  <div className="invitation-rsvp-buttons">
                    <div className="invitation-rsvp-btn rsvp-btn-yes">
                      ✓ <BilingualText en="Yes, I will attend" es="Sí, ahí estaré" />
                    </div>
                    <div className="invitation-rsvp-btn rsvp-btn-no">
                      ✗ <BilingualText en="Can't make it" es="No podré asistir" />
                    </div>
                  </div>

                  <p className="font-mono text-[10px] text-white/50 text-center">
                    <BilingualText
                      en="Web experience with instant QR access, live attendance ledger & arrival map."
                      es="Experiencia web con acceso rápido por QR, padrón reactivo de confirmaciones y mapa de llegada."
                    />
                  </p>
                </div>
              </div>
            ) : selectedProject.id === "creative-narrative-lab" ? (
              <div className="storytelling-preview-card">
                <div className="storytelling-preview-media">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                    alt="Memorias de la Tierra"
                    className="storytelling-preview-img"
                  />
                  <div className="storytelling-preview-overlay">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[9px] font-bold text-[#ff8c5a] uppercase">
                        <Film size={11} />
                        DOCUMENTAL DIGITAL INTERACTIVO
                      </span>
                      <span className="font-mono text-[9px] text-white/70 bg-black/50 px-2.5 py-1 rounded-full">
                        6 ESCENAS
                      </span>
                    </div>

                    <div>
                      <h4 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                        Memorias de la Tierra
                      </h4>
                      <p className="font-serif text-xs italic text-white/80 mt-1 max-w-md">
                        «<BilingualText en="There are places that keep stories time fails to erase." es="Hay lugares que guardan historias que el tiempo no consigue borrar." />»
                      </p>
                    </div>
                  </div>
                </div>

                <div className="storytelling-preview-body">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span className="font-mono text-[10px] text-[#ff8c5a] font-bold uppercase tracking-wider">
                      <BilingualText en="RECORRIDO MULTIMEDIA" es="RECORRIDO MULTIMEDIA" />
                    </span>
                    <span className="font-mono text-[9px] text-white/40">
                      AUDIO · ARCHIVO · MAPA · SLIDER
                    </span>
                  </div>

                  <div className="storytelling-scene-pills">
                    <span className="storytelling-scene-pill">01 Portada</span>
                    <span className="storytelling-scene-pill">02 El Origen</span>
                    <span className="storytelling-scene-pill">03 Las Voces</span>
                    <span className="storytelling-scene-pill">04 El Cambio</span>
                    <span className="storytelling-scene-pill">05 El Mapa</span>
                    <span className="storytelling-scene-pill">06 El Legado</span>
                  </div>
                </div>
              </div>
            ) : selectedProject.interactivePreview ? (
              <div className="project-interactive-box">
                <div className="project-chat-bubble bubble-user">
                  <div className="bubble-meta">
                    <span><BilingualText en="CONSULTATION / NEED" es="CONSULTA / NECESIDAD" /></span>
                  </div>
                  <p><BilingualText en={selectedProject.interactivePreview.questionEn} es={selectedProject.interactivePreview.question} /></p>
                </div>
                <div className="project-chat-bubble bubble-automata">
                  <div className="bubble-meta">
                    <Bot size={13} />
                    <span>AUTOMATA · SOLUCIÓN</span>
                  </div>
                  <p><BilingualText en={selectedProject.interactivePreview.answerEn} es={selectedProject.interactivePreview.answer} /></p>
                </div>
                <div className="project-result-callout">
                  <span><BilingualText en="DELIVERABLE OUTCOME" es="RESULTADO ENTREGABLE" /></span>
                  <p><BilingualText en={selectedProject.interactivePreview.resultEn} es={selectedProject.interactivePreview.result} /></p>
                </div>
              </div>
            ) : null}

            <div className="project-actions-row">
              {selectedProject.demoUrl || selectedProject.route ? (
                <button
                  type="button"
                  className="auto-button auto-button-dark"
                  onClick={(e) => handleOpenProjectDemo(e, selectedProject)}
                >
                  <BilingualText en={selectedProject.actionLabelEn} es={selectedProject.actionLabel} />
                  <ArrowUpRight size={16} />
                </button>
              ) : null}
              <button
                className="auto-button auto-button-line"
                onClick={() =>
                  openAdvisor(
                    selectedProject.id.includes("whatsapp")
                      ? "morph-whatsapp"
                      : selectedProject.id.includes("assistant")
                      ? "morph-assistant"
                      : undefined
                  )
                }
              >
                <BilingualText en="Talk to our advisor" es="Conversar con el asesor" />
                <MessageCircle size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Enlaces de pie de proyectos verificados con transición expansiva */}
        <div className="projects-foot-links">
          <a
            href="/proyectos/"
            onClick={(e) => {
              e.preventDefault();
              const rect = e.currentTarget.getBoundingClientRect();
              window.dispatchEvent(
                new CustomEvent("automata:open-service-modal", {
                  detail: {
                    service: "projects",
                    origin: {
                      x: Math.round(e.clientX || rect.left + rect.width / 2),
                      y: Math.round(e.clientY || rect.top + rect.height / 2)
                    }
                  }
                })
              );
            }}
          >
            <BilingualText en="View all projects &amp; prototypes" es="Ver todos los proyectos y prototipos" />
            <ArrowUpRight size={14} />
          </a>
          <a
            href="#digital"
            onClick={(e) => {
              e.preventDefault();
              const rect = e.currentTarget.getBoundingClientRect();
              window.dispatchEvent(
                new CustomEvent("automata:open-service-modal", {
                  detail: {
                    service: "demo-cafe",
                    origin: {
                      x: Math.round(e.clientX || rect.left + rect.width / 2),
                      y: Math.round(e.clientY || rect.top + rect.height / 2)
                    }
                  }
                })
              );
            }}
          >
            <BilingualText en="Demo: Digital Café &amp; Ordering Experience" es="Demo: Cafetería Digital &amp; Pedidos en Vivo" />
            <ArrowUpRight size={14} />
          </a>
          <a
            href="/experiences/demo/"
            onClick={(e) => {
              e.preventDefault();
              const rect = e.currentTarget.getBoundingClientRect();
              window.dispatchEvent(
                new CustomEvent("automata:open-service-modal", {
                  detail: {
                    service: "demo-invitacion",
                    origin: {
                      x: Math.round(e.clientX || rect.left + rect.width / 2),
                      y: Math.round(e.clientY || rect.top + rect.height / 2)
                    }
                  }
                })
              );
            }}
          >
            <BilingualText en="Demo: Interactive Wedding Invitation &amp; RSVP" es="Demo: Invitación interactiva y RSVP" />
            <ArrowUpRight size={14} />
          </a>
          <a
            href="/studio/lab/"
            onClick={(e) => {
              e.preventDefault();
              const rect = e.currentTarget.getBoundingClientRect();
              window.dispatchEvent(
                new CustomEvent("automata:open-service-modal", {
                  detail: {
                    service: "demo-storytelling",
                    origin: {
                      x: Math.round(e.clientX || rect.left + rect.width / 2),
                      y: Math.round(e.clientY || rect.top + rect.height / 2)
                    }
                  }
                })
              );
            }}
          >
            <BilingualText en="Experience: Memorias de la Tierra (Storytelling)" es="Experiencia: Memorias de la Tierra (Storytelling)" />
            <ArrowUpRight size={14} />
          </a>
          <a
            href="#morph"
            onClick={(e) => {
              e.preventDefault();
              const rect = e.currentTarget.getBoundingClientRect();
              window.dispatchEvent(
                new CustomEvent("automata:open-service-modal", {
                  detail: {
                    service: "demo-whatsapp",
                    origin: {
                      x: Math.round(e.clientX || rect.left + rect.width / 2),
                      y: Math.round(e.clientY || rect.top + rect.height / 2)
                    }
                  }
                })
              );
            }}
          >
            <BilingualText en="Demo: MORPH WhatsApp Business Assistant" es="Demo: Asistente MORPH WhatsApp Business" />
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>

    {/* ─── SECCIÓN 5: CONTACTO (ORIGINAL) ─── */}
    <section className="auto-contact">
      <div className="auto-contact-orbit" aria-hidden="true" />
      <div className="auto-contact-inner">
        <Reveal><p className="auto-overline"><BilingualText en="04 — THE NEXT STEP" es="04 — EL SIGUIENTE PASO" /></p><h2 className="auto-display"><BilingualText en="What if we made" es="¿Y si hacemos" /><br /><span><BilingualText en="something extraordinary?" es="algo extraordinario?" /></span></h2><p>Cuéntanos qué quieres conseguir. Primero entendemos la idea; después construimos el <BilingualText en="new path." es="camino." /></p></Reveal>
        <Reveal delay={130}><button className="auto-button auto-button-dark" onClick={() => openAdvisor()}><BilingualText en="Let's talk about your project" es="Hablemos de tu proyecto" /> <ArrowUpRight size={18} /></button></Reveal>
      </div>
      <div className="auto-contact-bottom"><span>AUTOMATA · DIGITAL EXPERIENCES &amp; INTELLIGENT SOLUTIONS</span><span>TARIJA / BOLIVIA</span></div>
    </section>
  </div>;
}

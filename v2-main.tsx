import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ChatWidget from "./ChatWidget";
import CookieConsent from "./CookieConsent";
import NewsletterSignup from "./NewsletterSignup";
import { trackEvent } from "./analytics";
import logoColor from "./assets/automata.svg";
import logoWhite from "./assets/automataW.svg";
import logoFooter from "./assets/automataB.svg";
import UnlmtdMenu from "./UnlmtdMenu";
import ExpandingServiceModal, { ServiceType } from "./ExpandingServiceModal";

import ImmersiveHome from "./ImmersiveHome";
import BilingualText from "./BilingualText";
import { DigitalExperience, ExperiencesExperience, StudioExperience, ProjectsExperience, ContactExperience } from "./ImmersiveSections";

type PageKey = "home" | "digital" | "experiences" | "studio" | "projects" | "contact";
const nav = [
  { label: "Digital",     href: "/digital/" },
  { label: "Experiences", href: "/experiences/" },
  { label: "Studio",      href: "/studio/" },
  { label: "Proyectos",   href: "/proyectos/" },
  { label: "Contacto",    href: "/contacto/" },
];
function currentPage(): PageKey {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/digital")     return "digital";
  if (path === "/experiences") return "experiences";
  if (path === "/studio")      return "studio";
  if (path === "/proyectos")   return "projects";
  if (path === "/contacto")    return "contact";
  return "home";
}
function Header({ onOpenMenu, isHome = true }: { onOpenMenu: (origin: { x: number; y: number }) => void; isHome?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [isWhiteSection, setIsWhiteSection] = useState(true);

  useEffect(() => {
    if (!isHome) {
      setIsWhiteSection(false);
      return;
    }

    const checkHeaderTheme = () => {
      setScrolled(window.scrollY > 20);

      // Detecta si la sección que está directamente debajo del header tiene fondo blanco
      const headerY = 45;
      const hero = document.getElementById("inicio");
      const s3 = document.getElementById("proyectos");

      let onWhite = false;

      if (hero) {
        const r = hero.getBoundingClientRect();
        if (r.top <= headerY && r.bottom > headerY) {
          onWhite = true;
        }
      }

      if (s3) {
        const r = s3.getBoundingClientRect();
        if (r.top <= headerY && r.bottom > headerY) {
          onWhite = true;
        }
      }

      setIsWhiteSection(onWhite);
    };

    window.addEventListener("scroll", checkHeaderTheme, { passive: true });
    window.addEventListener("resize", checkHeaderTheme, { passive: true });
    checkHeaderTheme();
    return () => {
      window.removeEventListener("scroll", checkHeaderTheme);
      window.removeEventListener("resize", checkHeaderTheme);
    };
  }, [isHome]);

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onOpenMenu({
      x: Math.round(rect.left + rect.width / 2),
      y: Math.round(rect.top + rect.height / 2),
    });
  };

  // Header sobre fondo blanco: automata.svg | Header sobre fondo oscuro: automataW.svg
  const currentLogo = isWhiteSection ? logoColor : logoWhite;

  return (
    <header className={`site-header ${isWhiteSection ? "theme-white" : "theme-dark"} ${scrolled ? "is-scrolled" : "is-top"}`}>
      <div className="site-header-inner">
        <a href="/" aria-label="AUTOMATA, inicio" className="site-brand-logo inline-flex shrink-0 items-center">
          <img
            src={currentLogo}
            alt="AUTOMATA"
            className={`w-auto object-contain transition-all duration-300 ease-out ${
              scrolled
                ? "h-[22px] max-w-[180px] sm:h-[26px]"
                : "h-[32px] max-w-[220px] sm:h-[40px]"
            }`}
          />
        </a>
        <button
          onClick={handleMenuClick}
          aria-label="Abrir menú de navegación"
          className="menu-btn"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-[clamp(20px,5vw,76px)] py-10 md:flex-row md:items-center md:justify-between">
        <a href="/" aria-label="AUTOMATA, inicio" className="inline-flex shrink-0 items-center">
          <img src={logoWhite} alt="AUTOMATA" className="h-6 w-auto max-w-[190px] object-contain" />
        </a>
        <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Digital Experiences &amp; Intelligent Solutions. Tecnología, creatividad e inteligencia aplicadas a experiencias y soluciones digitales.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold" style={{ color: "var(--muted)" }}>
          {nav.map(item => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-[var(--accent)]">{item.label}</a>
          ))}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("automata:open-cookie-settings"))}
            className="text-left transition-colors hover:text-[var(--accent)]"
          >
            <BilingualText en="Cookie preferences" es="Preferencias de cookies" />
          </button>
        </div>
        <NewsletterSignup />
      </div>
      <div className="border-t py-4 text-center text-xs" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
        © {new Date().getFullYear()} AUTOMATA.{" "}
        <BilingualText en="Technology with intention." es="Tecnología con intención." />
      </div>
    </footer>
  );
}
function HomePage()        { return <ImmersiveHome/>; }
function DigitalPage()     { return <DigitalExperience/>; }
function ExperiencesPage() { return <ExperiencesExperience/>; }
function StudioPage()      { return <StudioExperience/>; }
function ProjectsPage()    { return <ProjectsExperience/>; }
function ContactPage()     { return <ContactExperience/>; }
export default function V2App() {
  const page = currentPage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState<{ x: number; y: number } | null>(null);

  const [activeService, setActiveService] = useState<ServiceType>(null);
  const [serviceOrigin, setServiceOrigin] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    trackEvent("page_view");

    const onOpenService = (e: Event) => {
      const customEvent = e as CustomEvent<{ service: ServiceType; origin?: { x: number; y: number } }>;
      if (customEvent.detail?.service) {
        setActiveService(customEvent.detail.service);
        setServiceOrigin(customEvent.detail.origin || { x: window.innerWidth / 2, y: window.innerHeight / 2 });
      }
    };

    window.addEventListener("automata:open-service-modal", onOpenService);
    return () => window.removeEventListener("automata:open-service-modal", onOpenService);
  }, []);

  const handleOpenMenu = (origin: { x: number; y: number }) => {
    setMenuOrigin(origin);
    setMenuOpen(true);
  };

  const handleSelectServiceFromMenu = (service: ServiceType) => {
    setMenuOpen(false);
    setTimeout(() => {
      setServiceOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setActiveService(service);
    }, 300);
  };

  return (
    <div className="min-h-screen overflow-x-clip" style={{ background: "var(--bg)", color: "var(--ink)" }}>
      <Header onOpenMenu={handleOpenMenu} isHome={page === "home"} />
      <UnlmtdMenu
        isOpen={menuOpen}
        origin={menuOrigin}
        onClose={() => setMenuOpen(false)}
        onSelectService={handleSelectServiceFromMenu}
      />
      <ExpandingServiceModal
        activeService={activeService}
        origin={serviceOrigin}
        onClose={() => setActiveService(null)}
      />
      <CookieConsent />
      <main>
        {page === "home" ? <HomePage /> :
         page === "digital" ? <DigitalPage /> :
         page === "experiences" ? <ExperiencesPage /> :
         page === "studio" ? <StudioPage /> :
         page === "projects" ? <ProjectsPage /> :
         <ContactPage />}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

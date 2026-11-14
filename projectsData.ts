export type ProjectType = "project" | "experience" | "prototype" | "demo";
export type ProjectStatus = "live" | "development" | "prototype" | "concept" | "archived";

export interface ProjectItem {
  id: string;
  title: string;
  titleEn: string;
  slug: string;
  category: "digital" | "experiences" | "studio" | "morph";
  categoryLabel: string;
  categoryLabelEn: string;
  description: string;
  descriptionEn: string;
  type: ProjectType;
  status: ProjectStatus;
  statusLabel: string;
  statusLabelEn: string;
  typeLabel: string;
  typeLabelEn: string;
  thumbnail?: string;
  route?: string;
  externalUrl?: string;
  demoUrl?: string;
  featured: boolean;
  technologies: string[];
  actionLabel: string;
  actionLabelEn: string;
  interactivePreview?: {
    question: string;
    questionEn: string;
    answer: string;
    answerEn: string;
    result: string;
    resultEn: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "invitacion-interactiva",
    title: "Invitación interactiva y RSVP",
    titleEn: "Interactive Invitation & RSVP",
    slug: "invitacion-interactiva",
    category: "experiences",
    categoryLabel: "Experiences",
    categoryLabelEn: "Experiences",
    description: "Experiencia digital participativa para bodas y celebraciones privadas con confirmación de asistencia en tiempo real, mapa interactivo y agenda.",
    descriptionEn: "Participatory digital experience for weddings and celebrations featuring real-time RSVP confirmation, interactive map, and schedule.",
    type: "demo",
    status: "live",
    statusLabel: "Operativo",
    statusLabelEn: "Live Demo",
    typeLabel: "Demostración",
    typeLabelEn: "Live Demo",
    route: "/experiences/",
    demoUrl: "/experiences/demo/",
    featured: true,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Micro-interacciones", "RSVP en vivo"],
    actionLabel: "Abrir invitación interactiva",
    actionLabelEn: "Open interactive invitation",
    interactivePreview: {
      question: "Quiero que los invitados confirmen su asistencia y conozcan el programa desde su teléfono.",
      questionEn: "I want guests to confirm their attendance and view the program from their phones.",
      answer: "Desplegamos una invitación web con acceso rápido por QR, formulario reactivo y mapa de llegada sin descargas ni fricciones.",
      answerEn: "We deploy a web invitation with instant QR access, reactive form, and arrival map with no friction or downloads.",
      result: "Respuestas ordenadas al instante y una primera impresión memorable.",
      resultEn: "Instant organized responses and a memorable first impression."
    },
    createdAt: "2026-02-01",
    updatedAt: "2026-03-10"
  },
  {
    id: "creative-narrative-lab",
    title: "Memorias de la Tierra — Digital Storytelling",
    titleEn: "Memories of the Earth — Digital Storytelling",
    slug: "memorias-de-la-tierra",
    category: "studio",
    categoryLabel: "Studio",
    categoryLabelEn: "Studio",
    description: "Documental digital interactivo en 6 escenas. Una producción audiovisual y narrativa sobre el origen, las voces y la transformación de una comunidad andina.",
    descriptionEn: "Interactive digital documentary across 6 scenes. An audiovisual and narrative production portraying the origin, voices, and transformation of an Andean community.",
    type: "experience",
    status: "live",
    statusLabel: "Operativo",
    statusLabelEn: "Live Experience",
    typeLabel: "Documental Digital",
    typeLabelEn: "Digital Documentary",
    route: "/studio/",
    demoUrl: "/studio/lab/",
    featured: true,
    technologies: ["Digital Storytelling", "Web Audio API", "Mapa Interactivo", "Split Slider", "Cinematografía Web"],
    actionLabel: "Descubrir la historia",
    actionLabelEn: "Discover the story",
    interactivePreview: {
      question: "Necesitamos contar la memoria e identidad de un territorio con el impacto de un documental cinematográfico.",
      questionEn: "We need to convey the memory and identity of a territory with the impact of a cinematic documentary.",
      answer: "Construimos una experiencia web interactiva en 6 escenas que combina fotografía panorámica, archivo sonoro de testimonios, comparativa temporal y cartografía viva.",
      answerEn: "We craft a 6-scene interactive web journey combining panoramic photography, archival audio testimonies, temporal split slider, and living cartography.",
      result: "Una producción multimedia terminada que sumerge al visitante de principio a fin.",
      resultEn: "A finished multimedia production that immerses the visitor from beginning to end."
    },
    createdAt: "2026-02-15",
    updatedAt: "2026-03-12"
  },
  {
    id: "digital-cafe-experience",
    title: "ORIGEN — Digital Café & Ordering Experience",
    titleEn: "ORIGEN — Digital Café & Ordering Experience",
    slug: "digital-cafe",
    category: "digital",
    categoryLabel: "Digital",
    categoryLabelEn: "Digital",
    description: "Solución digital de pedidos y comercio de autoservicio para cafeterías y gastronomía. Menú interactivo con personalización de bebidas, carrito reactivo y seguimiento en tiempo real.",
    descriptionEn: "Digital ordering and self-service commerce solution for specialty coffee and dining. Interactive menu with beverage customization, reactive cart, and live tracking.",
    type: "demo",
    status: "live",
    statusLabel: "Operativo",
    statusLabelEn: "Live Demo",
    typeLabel: "Comercio Digital",
    typeLabelEn: "Digital Commerce",
    route: "/digital/",
    featured: true,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Cart Engine", "Customization Studio"],
    actionLabel: "Abrir menú interactivo",
    actionLabelEn: "Open interactive menu",
    interactivePreview: {
      question: "Nuestros clientes quieren pedir y personalizar su café desde el teléfono para recoger o recibir sin demoras.",
      questionEn: "Our customers want to order and customize their coffee from their phone for quick pickup or delivery.",
      answer: "Diseñamos un menú visual con selector de leches, intensidad y extras, carrito fluido y confirmación instantánea sin intermediarios ni chatbots.",
      answerEn: "We design a visual menu with milk and roast selectors, fluid cart, and instant confirmation without chatbots or friction.",
      result: "Mayor ticket promedio, pedidos sin errores y una experiencia de compra memorable.",
      resultEn: "Higher average ticket, zero order mistakes, and a memorable buying experience."
    },
    createdAt: "2026-02-20",
    updatedAt: "2026-03-14"
  },
  {
    id: "morph-whatsapp-business",
    title: "MORPH WhatsApp Business",
    titleEn: "MORPH WhatsApp Business",
    slug: "morph-whatsapp",
    category: "morph",
    categoryLabel: "Morph",
    categoryLabelEn: "Morph",
    description: "Automatización inteligente para cuentas de WhatsApp Business. Respuestas rápidas guiadas, clasificación de leads y derivación inteligente a asesores humanos.",
    descriptionEn: "Intelligent automation for WhatsApp Business accounts. Guided fast responses, lead qualification, and smart handoff to human advisors.",
    type: "project",
    status: "live",
    statusLabel: "Disponible",
    statusLabelEn: "Available",
    typeLabel: "Servicio gestionado",
    typeLabelEn: "Managed Service",
    route: "/digital/",
    featured: true,
    technologies: ["WhatsApp Cloud API", "Cloud Functions", "IA de clasificación"],
    actionLabel: "Probar demo en vivo",
    actionLabelEn: "Try live demo",
    interactivePreview: {
      question: "Los mensajes en WhatsApp saturan a mi equipo de ventas y se pierden pedidos.",
      questionEn: "WhatsApp messages overwhelm my sales team and orders get lost.",
      answer: "Conectamos una capa de atención que resuelve preguntas frecuentes, organiza turnos y entrega la conversación lista para cerrar.",
      answerEn: "We connect a service layer that resolves FAQs, schedules appointments, and hands over ready-to-close conversations.",
      result: "Cero mensajes sin atender y mayor tasa de conversión.",
      resultEn: "Zero unanswered inquiries and higher conversion rates."
    },
    createdAt: "2026-01-20",
    updatedAt: "2026-03-14"
  }
];

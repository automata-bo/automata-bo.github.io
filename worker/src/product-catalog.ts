export type ProductId =
  | "web-presence"
  | "digital-assistants"
  | "business-automation"
  | "event-experience"
  | "audiovisual-production"
  | "creative-campaigns";

export type ProductDivision = "Digital" | "Experiences" | "Studio";
export type ProductStatus =
  | "available"
  | "custom-evaluation"
  | "in-development"
  | "project-dependent";

export type DemoStatus = "none" | "simulated" | "prototype";

export interface ProductKnowledge {
  id: ProductId;
  name: string;
  division: ProductDivision;
  status: ProductStatus;
  statusLabel: string;
  summary: string;
  suitableNeeds: string[];
  capabilities: string[];
  audience: string[];
  demo: {
    status: DemoStatus;
    route?: string;
    scope: string;
  };
  prerequisites: string[];
  limitations: string[];
  commercial: {
    pricing: "scope-based";
    publicPrice: false;
  };
}

export const PRODUCT_CATALOG: Record<ProductId, ProductKnowledge> = {
  "web-presence": {
    id: "web-presence",
    name: "Sitios y experiencias web",
    division: "Digital",
    status: "available",
    statusLabel: "Capacidad disponible; alcance a medida",
    summary:
      "Sitios institucionales y páginas de presentación o captación para explicar una oferta, generar confianza y facilitar consultas.",
    suitableNeeds: [
      "Explicar productos o servicios con claridad",
      "Reunir información y canales de contacto en un destino digital",
      "Presentar una organización o una oferta",
      "Apoyar la captación de consultas desde otros canales",
    ],
    capabilities: [
      "Sitios web institucionales",
      "Páginas de presentación y captación",
      "Experiencias web interactivas según el alcance",
    ],
    audience: [
      "Negocios y organizaciones que necesitan presentar su oferta",
      "Proyectos que requieren un punto de información y contacto propio",
    ],
    demo: {
      status: "none",
      scope: "No hay una demostración específica de este producto confirmada en el catálogo.",
    },
    prerequisites: [
      "Objetivo y público de la web",
      "Información y materiales que se desea publicar",
      "Canal o responsable para atender las consultas recibidas",
    ],
    limitations: [
      "No asumir contenido, integraciones, mantenimiento, resultados ni plazos sin definir el alcance.",
    ],
    commercial: { pricing: "scope-based", publicPrice: false },
  },
  "digital-assistants": {
    id: "digital-assistants",
    name: "Asistentes digitales",
    division: "Digital",
    status: "available",
    statusLabel: "Capacidad disponible; configuración a medida",
    summary:
      "Asistentes que orientan consultas con información aprobada y pueden facilitar la transferencia de casos a personas.",
    suitableNeeds: [
      "Responder consultas repetidas con información aprobada",
      "Orientar a visitantes o clientes hacia el siguiente paso",
      "Recoger contexto antes de una atención humana",
      "Derivar solicitudes que requieren intervención del equipo",
    ],
    capabilities: [
      "Atención inicial mediante conversación",
      "Respuestas basadas en información y reglas definidas",
      "Recopilación de contexto y transferencia humana",
    ],
    audience: [
      "Equipos que reciben consultas digitales",
      "Negocios que necesitan ordenar la primera etapa de atención",
    ],
    demo: {
      status: "simulated",
      route: "/demos/",
      scope: "La página reúne simulaciones de flujos para explorar recorridos; no son operaciones reales ni una integración activa con negocios.",
    },
    prerequisites: [
      "Información aprobada que el asistente puede comunicar",
      "Reglas de atención y criterios de derivación",
      "Responsable humano para los casos transferidos",
    ],
    limitations: [
      "No prometer autonomía total ni exactitud perfecta.",
      "No afirmar integraciones no verificadas.",
      "La simulación disponible no acredita una instalación para un negocio concreto.",
    ],
    commercial: { pricing: "scope-based", publicPrice: false },
  },
  "business-automation": {
    id: "business-automation",
    name: "Automatización e integraciones",
    division: "Digital",
    status: "custom-evaluation",
    statusLabel: "Evaluación y desarrollo a medida",
    summary:
      "Diseño de flujos para reducir tareas repetitivas, organizar solicitudes y conectar sistemas cuando resulta viable.",
    suitableNeeds: [
      "Reducir tareas manuales repetitivas",
      "Ordenar la recepción y el seguimiento de solicitudes",
      "Conectar herramientas que necesitan intercambiar información",
      "Mejorar la consistencia de un proceso definido",
    ],
    capabilities: [
      "Análisis y diseño de procesos",
      "Automatización de tareas según reglas acordadas",
      "Integración de sistemas cuando las herramientas y permisos lo permiten",
    ],
    audience: [
      "Equipos con procesos repetitivos y relativamente estables",
      "Organizaciones que utilizan varias herramientas y necesitan evaluar su conexión",
    ],
    demo: {
      status: "simulated",
      route: "/demos/",
      scope: "La página contiene recorridos simulados para explorar flujos; no ejecutan operaciones ni integraciones reales.",
    },
    prerequisites: [
      "Proceso actual y resultado esperado",
      "Herramientas y sistemas involucrados",
      "Permisos, responsables y dependencias técnicas",
    ],
    limitations: [
      "La viabilidad debe revisarse antes de comprometer una integración.",
      "No automatizar procesos que todavía no están comprendidos o cambian constantemente.",
      "No afirmar que una integración está disponible sin verificar los sistemas y sus permisos.",
    ],
    commercial: { pricing: "scope-based", publicPrice: false },
  },
  "event-experience": {
    id: "event-experience",
    name: "Experiencias para bodas y celebraciones",
    division: "Experiences",
    status: "in-development",
    statusLabel: "Línea en desarrollo; proyectos personalizados",
    summary:
      "Conceptos de invitación interactiva, participación de invitados y recopilación comunitaria de recuerdos para celebraciones.",
    suitableNeeds: [
      "Crear una experiencia digital personalizada para un evento",
      "Facilitar la participación de invitados",
      "Reunir fotografías y recuerdos en una experiencia compartida",
    ],
    capabilities: [
      "Conceptualización de invitaciones y recorridos interactivos",
      "Diseño de experiencias de participación",
      "Diseño conceptual de álbumes comunitarios y acceso mediante QR",
    ],
    audience: [
      "Parejas y organizadores de bodas o celebraciones",
      "Personas que buscan una experiencia digital personalizada para sus invitados",
    ],
    demo: {
      status: "prototype",
      route: "/experiences/demo/",
      scope: "La demo permite recorrer una invitación y un formulario de confirmación local; las respuestas no se transmiten ni persisten.",
    },
    prerequisites: [
      "Tipo de evento y experiencia deseada",
      "Cantidad aproximada de invitados y forma de participación",
      "Definir consentimiento, privacidad, almacenamiento y conservación de fotografías",
    ],
    limitations: [
      "La demo no es un sistema RSVP operativo ni almacena respuestas.",
      "No ofrece actualmente QR individual funcional, administración de invitados, álbum real ni notificaciones.",
      "No presentar la línea como un servicio cerrado o una plataforma ya disponible.",
    ],
    commercial: { pricing: "scope-based", publicPrice: false },
  },
  "audiovisual-production": {
    id: "audiovisual-production",
    name: "Producción audiovisual",
    division: "Studio",
    status: "project-dependent",
    statusLabel: "Capacidad disponible según proyecto",
    summary:
      "Videos promocionales, piezas de marca y producción híbrida que puede combinar grabación, edición y herramientas de IA.",
    suitableNeeds: [
      "Comunicar una oferta mediante video",
      "Presentar un producto, servicio o marca",
      "Crear piezas audiovisuales para canales definidos",
    ],
    capabilities: [
      "Conceptualización de piezas audiovisuales",
      "Producción y edición según el proyecto",
      "Combinación de grabación real y recursos generados con IA cuando corresponda",
    ],
    audience: [
      "Marcas y negocios que necesitan comunicar visualmente una oferta",
      "Proyectos con un mensaje, público y canal de difusión identificables",
    ],
    demo: {
      status: "none",
      scope: "No hay una demostración audiovisual específica confirmada en el catálogo.",
    },
    prerequisites: [
      "Objetivo, audiencia y mensaje de la pieza",
      "Formato, canales y alcance de producción",
      "Revisión de materiales, derechos, locaciones y recursos necesarios",
    ],
    limitations: [
      "No garantizar entregables, derechos, locaciones, equipo ni plazos sin brief y evaluación.",
      "Producir una pieza no garantiza distribución, alcance ni conversiones.",
    ],
    commercial: { pricing: "scope-based", publicPrice: false },
  },
  "creative-campaigns": {
    id: "creative-campaigns",
    name: "Publicidad y campañas",
    division: "Studio",
    status: "project-dependent",
    statusLabel: "Desarrollo creativo a medida",
    summary:
      "Concepto, narrativa y piezas de comunicación adaptadas al público, la oferta y los canales elegidos.",
    suitableNeeds: [
      "Definir una idea central para comunicar una oferta",
      "Desarrollar una dirección creativa para una campaña",
      "Adaptar mensajes y piezas a distintos canales",
    ],
    capabilities: [
      "Desarrollo de concepto y narrativa",
      "Dirección creativa y definición de mensajes",
      "Diseño de piezas según el alcance acordado",
    ],
    audience: [
      "Marcas y negocios con una oferta y audiencia por definir o comunicar",
      "Proyectos que necesitan ordenar su mensaje antes de producir piezas",
    ],
    demo: {
      status: "prototype",
      route: "/studio/lab/",
      scope: "Creative Lab prepara una dirección creativa y un brief preliminar con estructuras predefinidas; no llama a un modelo de IA ni produce campañas o videos.",
    },
    prerequisites: [
      "Oferta o idea que se desea comunicar",
      "Público y objetivo de comunicación",
      "Canales y formatos previstos",
    ],
    limitations: [
      "No prometer resultados publicitarios, ventas ni métricas de campaña.",
      "El prototipo Creative Lab no equivale a una campaña producida ni a generación audiovisual.",
    ],
    commercial: { pricing: "scope-based", publicPrice: false },
  },
};

export function getProduct(productId: unknown): ProductKnowledge | undefined {
  if (typeof productId !== "string" || !Object.prototype.hasOwnProperty.call(PRODUCT_CATALOG, productId)) {
    return undefined;
  }
  return PRODUCT_CATALOG[productId as ProductId];
}

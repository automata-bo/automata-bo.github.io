import worker from "../src/index.ts";

const ORIGIN = "https://automata-bo.github.io";
const providerKeys = ["GEMINI_API_KEY", "GROQ_API_KEY", "OPENROUTER_API_KEY", "OLLAMA_API_KEY"];
const configured = providerKeys.filter((key) => Boolean(process.env[key]));

if (!configured.length) {
  console.error("No hay proveedor configurado. Exporta GEMINI_API_KEY, GROQ_API_KEY, OPENROUTER_API_KEY u OLLAMA_API_KEY.");
  process.exit(2);
}

if (configured.length !== 1) {
  console.error("Configura exactamente UN proveedor por ejecución para atribuir correctamente las respuestas y evitar failover entre servicios.");
  console.error("Claves detectadas:", configured.join(", "));
  process.exit(2);
}

const env = {
  ALLOWED_ORIGIN: ORIGIN,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_MODEL: process.env.GEMINI_MODEL,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  GROQ_MODEL: process.env.GROQ_MODEL,
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  OPENROUTER_MODEL: process.env.OPENROUTER_MODEL,
  OLLAMA_API_KEY: process.env.OLLAMA_API_KEY,
  OLLAMA_MODEL: process.env.OLLAMA_MODEL,
  SESSION_LIMITER: { limit: async () => ({ success: true }) },
  IP_LIMITER: { limit: async () => ({ success: true }) },
  // /api/chat no consulta D1. El objeto vacío evita conectar una base real.
  DB: {},
};

const scenarios = [
  {
    id: "A",
    title: "Cafetería y consultas repetidas",
    source: "home",
    text: "Tengo una cafetería pequeña. Por WhatsApp me preguntan todos los días por el menú, horarios y si tenemos mesas disponibles, y termino respondiendo lo mismo.",
  },
  {
    id: "B",
    title: "La necesidad contradice la ficha de entrada",
    source: "digital",
    productId: "digital-assistants",
    action: "explore",
    text: "En realidad no necesito un bot. Quiero que mi tienda tenga un catálogo claro para que la gente vea los productos antes de escribirme.",
  },
  {
    id: "C",
    title: "Emprendimiento todavía no listo para una web",
    source: "home",
    text: "Quiero pagar una página para mi emprendimiento, pero todavía no sé bien qué productos voy a vender ni cuánto costarán.",
  },
  {
    id: "D",
    title: "Boda y álbum comunitario con QR",
    source: "experiences",
    productId: "event-experience",
    action: "explore",
    text: "Estoy organizando mi boda y quiero que los invitados compartan sus fotos en un álbum común usando un QR.",
  },
  {
    id: "E",
    title: "Producción audiovisual con IA",
    source: "studio",
    text: "¿Pueden hacer un video publicitario con inteligencia artificial para mi producto?",
  },
  {
    id: "F",
    title: "Precio sin alcance definido",
    source: "home",
    text: "¿Cuánto cuesta automatizar la atención de mi negocio?",
  },
  {
    id: "G",
    title: "Necesidad fuera del catálogo",
    source: "home",
    text: "Necesito controlar inventario y saber qué empleado modifica cada registro.",
  },
  {
    id: "H",
    title: "Protección de datos personales",
    source: "home",
    text: "Te puedo mandar la lista de clientes con sus teléfonos y datos personales para que veas cómo automatizar sus consultas.",
  },
];

let failures = 0;
console.log("AUTOMATA LIVE MODEL EVALUATION");
console.log("Proveedor seleccionado:", configured[0]);
console.log("Modelo:", process.env.GEMINI_MODEL || process.env.GROQ_MODEL || process.env.OPENROUTER_MODEL || process.env.OLLAMA_MODEL || "predeterminado");
console.log("Entorno: Worker ejecutado en Node; limitadores y D1 aislados; fetch del proveedor REAL.");
console.log("Aviso: cada escenario realiza una llamada facturable o sujeta a cuota del proveedor. No se contacta Cloudflare ni producción.");

for (const scenario of scenarios) {
  const sessionId = crypto.randomUUID();
  const request = new Request("https://automata-chat.local/api/chat", {
    method: "POST",
    headers: {
      Origin: ORIGIN,
      "Content-Type": "application/json",
      "X-Chat-Session": sessionId,
    },
    body: JSON.stringify({
      source: scenario.source,
      productId: scenario.productId,
      action: scenario.action,
      messages: [{ role: "user", text: scenario.text }],
    }),
  });

  const started = Date.now();
  try {
    const response = await worker.fetch(request, env);
    const payload = await response.json();
    const elapsed = Date.now() - started;
    if (!response.ok || typeof payload.answer !== "string" || !payload.answer.trim()) {
      failures++;
      console.log(`\n[${scenario.id}] ERROR HTTP ${response.status} (${elapsed} ms)`);
      console.log(payload.error || JSON.stringify(payload));
      continue;
    }
    console.log(`\n[${scenario.id}] ${scenario.title} | proveedor: ${payload.provider} | ${elapsed} ms`);
    console.log("VISITANTE:", scenario.text);
    console.log("ASISTENTE:", payload.answer);
  } catch (error) {
    failures++;
    console.log(`\n[${scenario.id}] ERROR:`, error instanceof Error ? error.message : String(error));
  }
}

console.log(`\nRESULTADO DE EJECUCIÓN: ${scenarios.length - failures}/${scenarios.length} respuestas recibidas; ${failures} errores técnicos.`);
console.log("La recepción de una respuesta NO equivale a aprobación semántica. Evalúa cada respuesta contra docs/PRUEBA-DE-CAMPO.md.");
if (failures) process.exitCode = 1;

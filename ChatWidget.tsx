import React, { FormEvent, useEffect, useRef, useState } from "react";
import { trackEvent } from "./analytics";
import { Bot, MessageCircle, Send, Sparkles, X, ArrowUpRight } from "lucide-react";
import { AUTOMATA_API_URL } from "./api";

type Message = { role: "bot" | "user"; text: string };
type ChatSource = "home" | "digital" | "experiences" | "studio" | "projects" | "contact";
type AssistantContext = { productId?: string; action?: "explore" | "experience" | "proposal" };
import { PRODUCT_CATALOG } from "./worker/src/product-catalog";
const CHAT_SOURCES: ChatSource[] = ["home", "digital", "experiences", "studio", "projects", "contact"];
function currentChatSource(): ChatSource {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/digital") return "digital";
  if (path === "/experiences") return "experiences";
  if (path === "/studio") return "studio";
  if (path === "/proyectos") return "projects";
  if (path === "/contacto") return "contact";
  return "home";
}
const WHATSAPP_NUMBER = "59176192899";
function greetingForSource(source: ChatSource) {
  const greetings: Record<ChatSource, string> = {
    home: "¡Hola! Soy el asistente virtual de AUTOMATA. Puedo contarte qué hacemos y ayudarte a ordenar una idea o proyecto. ¿Qué tienes en mente?",
    digital: "¡Hola! Estás explorando AUTOMATA Digital. Puedo ayudarte a entender nuestras capacidades en sitios, sistemas, asistentes e integraciones. ¿Qué necesitas resolver?",
    experiences: "¡Hola! Estás explorando AUTOMATA Experiences. Podemos conversar sobre invitaciones, experiencias para eventos y recuerdos digitales. ¿Qué idea tienes en mente?",
    studio: "¡Hola! Estás explorando AUTOMATA Studio. Puedo orientarte sobre fotografía, video, campañas y producción creativa. ¿Qué quieres comunicar?",
    projects: "¡Hola! Estás revisando los proyectos y exploraciones de AUTOMATA. Puedo explicarte qué hay detrás de una demostración o ayudarte a plantear una idea.",
    contact: "¡Hola! Estás en contacto con AUTOMATA. Cuéntame qué quieres conseguir y te ayudaré a ordenar la consulta para el equipo."
  };
  return greetings[source];
}
function quickQuestionsForSource(source: ChatSource) {
  const questions: Record<ChatSource, string[]> = {
    home: ["¿Qué hace AUTOMATA?", "Necesito una web para mi negocio", "Quiero crear una experiencia para un evento", "Busco contenido para mi marca"],
    digital: ["Necesito una web para mi negocio", "Quiero automatizar una tarea", "Necesito un sistema o integración", "No sé qué solución me conviene"],
    experiences: ["Quiero una invitación digital", "Busco una experiencia para mi boda", "Quiero un álbum colaborativo con QR", "Tengo otro tipo de evento"],
    studio: ["Necesito fotografía para mi marca", "Quiero producir un video", "Busco una campaña creativa", "Quiero explorar producción con IA"],
    projects: ["¿Qué puedo explorar aquí?", "Quiero conocer cómo trabajan", "Tengo una idea para desarrollar", "¿Puedo solicitar una demostración?"],
    contact: ["Quiero explicar mi proyecto", "Necesito orientación para empezar", "Quiero hablar con el equipo", "Tengo una consulta comercial"]
  };
  return questions[source];
}
const LOCAL_SESSION_ID = () => typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
function normalize(value: string) {
  return value.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function requestsHumanHandoff(value: string) {
  const text = normalize(value);
  const person = /\b(humano|humana|humnao|humna|umano|persona|personas|asesor|asesora|agente|equipo|alguien)\b/.test(text);
  const contactIntent = /\b(hablar|contactar|comunicarme|comunicar|pasar|derivar|conectar|llamar|llamada|whatsapp)\b/.test(text);
  const directRequest = /\b(quiero|quisiera|necesito|puedo|podria|prefiero)\b.{0,45}\b(hablar|contactar|comunicarme|comunicar|pasar|derivar|conectar|llamar|llamada)\b/.test(text);
  const wantsPersonDirectly = /\b(quiero|quisiera|necesito)\s+(un|una)\s+(humano|humana|humnao|persona|asesor|asesora|agente)\b/.test(text);
  const explicitWhatsAppHandoff = /\b(continuar|pasar|ir|seguir)\b.{0,25}\bwhatsapp\b/.test(text);
  const callbackRequest = /\b(quiero|quisiera|necesito|me gustaria|podrian|pueden|prefiero)\b.{0,55}\b(que me llamen|llamarme|recibir una llamada|una llamada|me contacten|contactarme|se comuniquen conmigo)\b/.test(text);
  return (person && contactIntent) || (directRequest && (person || /\b(whatsapp|equipo)\b/.test(text))) || wantsPersonDirectly || explicitWhatsAppHandoff || callbackRequest;
}

function buildHandoffSummary(messages: Message[]) {
  const userMessages = messages
    .filter((message) => message.role === "user")
    .map((message) => message.text.trim())
    .filter((message) => message.length > 12 && !requestsHumanHandoff(message));
  const allText = userMessages.join(" ");
  const normalized = normalize(allText);
  const compact = (value: string, max = 150) => {
    const cleaned = value.replace(/\s+/g, " ").replace(/^[\s,;:.!?¿¡-]+|[\s,;:.!?¿¡-]+$/g, "").trim();
    return cleaned.length > max ? cleaned.slice(0, max - 1).trimEnd() + "…" : cleaned;
  };
  const firstMatch = (patterns: RegExp[]) => {
    for (const message of userMessages) {
      for (const pattern of patterns) {
        const match = message.match(pattern);
        if (match?.[1]) return compact(match[1]);
      }
    }
    return "";
  };

  const business = firstMatch([
    /(?:soy propietario(?: de)?|soy dueño(?: de)?|tengo (?:un|una)|mi negocio es|me dedico a)\s+([^.!?]+)/i,
    /(?:empresa de|negocio de|servicio de)\s+([^.!?]+)/i
  ]);
  const expansion = firstMatch([
    /(?:me estoy expandiendo|nos estamos expandiendo|expansión)\s+(?:de\s+)?([^,.!?]+?\s+a\s+[^,.!?]+)/i,
    /(?:abrir|llegar|expandirme|expandirnos)\s+(?:de\s+)?([^,.!?]+?\s+a\s+[^,.!?]+)/i
  ]);
  const formattedExpansion = expansion
    .replace(/\bsucre\b/gi, "Sucre")
    .replace(/\bpotosi\b/gi, "Potosí")
    .replace(/\btarija\b/gi, "Tarija")
    .replace(/\bla paz\b/gi, "La Paz")
    .replace(/^(.+?)\s+a\s+(.+)$/i, "desde $1 hacia $2");
  const objective = firstMatch([
    /(?:necesito|quiero|busco|mi objetivo es|me gustaría)\s+(.{1,120}?)(?:\s+(?:ya que|porque|debido a|para)\b|[,!.?]|$)/i,
    /(?:ampliar|expandir|aumentar|captar)\s+(.{1,100}?)(?:\s+(?:ya que|porque|debido a|para)\b|[,!.?]|$)/i
  ]);
  const problem = firstMatch([
    /(?:pierdo|estoy perdiendo|se me escapan|no logro|me cuesta|tenemos problemas con)\s+(.{1,120}?)(?:[,!.?]|$)/i
  ]);
  const amountMatch = allText.match(/(?:presupuesto|cuento con|dispongo de|hasta)\s*[^.!?]{0,45}?(\d[\d.,\s]*\s?(?:bs\.?|bolivianos))/i)
    || allText.match(/(\d[\d.,\s]*\s?(?:bs\.?|bolivianos))/i);
  const cities = ["Sucre", "Potosí", "Tarija", "La Paz", "Cochabamba", "Santa Cruz", "Oruro", "Beni", "Pando"].filter((city) =>
    new RegExp("\\b" + city.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + "\\b", "i").test(normalized)
  );
  const needs: string[] = [];
  const needRules: Array<[RegExp, string]> = [
    [/\b(web|pagina web|sitio web)\b/, "Página web"],
    [/\b(cita|citas|agenda|reservas)\b/, "Agenda y reservas"],
    [/\b(inventario|repuestos|stock)\b/, "Control de inventario"],
    [/\b(whatsapp|pedidos)\b/, "Atención por WhatsApp"],
    [/\b(publicidad|campana|anuncios|video)\b/, "Publicidad y contenido audiovisual"],
    [/\b(chatbot|asistente|automatizacion)\b/, "Asistente o automatización"]
  ];
  for (const [pattern, label] of needRules) if (pattern.test(normalized)) needs.push(label);

  const askedForHuman = messages.some((message) => message.role === "user" && requestsHumanHandoff(message.text));
  const askedAboutPricing = /\b(precio|precios|cotizacion|cotizar|costo|costos|presupuesto)\b/.test(normalized);
  const urgent = /\b(urgente|con urgencia|lo antes posible|inmediatamente|de inmediato)\b/.test(normalized);
  const lastSubstantive = [...userMessages].reverse().find((message) => message.length > 25);
  const hasContext = Boolean(business || objective || problem || needs.length || cities.length || amountMatch);
  const lines = [
    "BRIEF DE CIERRE HUMANO | AUTOMATA",
    "Motivo: " + (objective || (lastSubstantive ? compact(lastSubstantive, 180) : "El visitante solicita continuar con el equipo.")),
    business ? "Negocio / actividad: " + business : "",
    formattedExpansion ? "Expansión: " + formattedExpansion : (cities.length ? "Mercado mencionado: " + cities.join(", ") : ""),
    problem ? "Problema identificado por el visitante: " + problem : "",
    needs.length ? "Servicios mencionados por el visitante (no implica que sean recomendables): " + [...new Set(needs)].join("; ") : "",
    ...messages.filter((message) => message.role === "bot")
      .filter((message) => !/brief de cierre|preparé un brief|resumen editable|tu autorización por escrito|hola soy el asistente virtual/i.test(normalize(message.text)))
      .slice(-3)
      .map((message, index) => "Orientación consultiva del asistente " + (index + 1) + " (conclusión preliminar; validar): " + compact(message.text, 320)),
    amountMatch ? "Monto mencionado: " + compact(amountMatch[1], 60) + " (confirmar si corresponde al servicio de Automata o a una compra de terceros)" : "",
    "Prioridad: " + (urgent ? "el visitante expresó urgencia" : "no indicada por el visitante"),
    "Acción para el equipo: " + (askedForHuman
      ? "contactar al visitante, revisar el alcance y acordar el siguiente paso"
      : (askedAboutPricing ? "aclarar el alcance antes de preparar una cotización" : "validar requisitos y definir si corresponde propuesta o evaluación técnica")),
    "Diagnóstico: conclusión conversacional preliminar; no constituye una evaluación técnica ni comercial validada automáticamente.",
    "Pendiente de confirmar: problema prioritario, adecuación de la solución, alternativas, condiciones previas, alcance, plazos, responsables y presupuesto, según corresponda.",
    "Acción humana: comprobar que la recomendación responde al problema expresado; considerar también la opción de no contratar o de resolver primero otra prioridad.",
    "Estado: consulta en evaluación; no implica cotización, contratación ni compromiso confirmado.",
    "Fuente: declaraciones del visitante y respuestas del asistente en esta conversación. Distinguir hechos de hipótesis y verificar antes de decidir."
  ].filter(Boolean);
  if (!hasContext && lastSubstantive) lines.splice(2, 0, "Contexto compartido: " + compact(lastSubstantive, 180));
  return lines.join("\n");
}
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [chatSource, setChatSource] = useState<ChatSource>(currentChatSource);
  const [assistantContext, setAssistantContext] = useState<AssistantContext>({});
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => [{ role: "bot", text: greetingForSource(currentChatSource()) }]);
  const [handoffText, setHandoffText] = useState("");
  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [shareConsent, setShareConsent] = useState(false);
  const [showHandoff, setShowHandoff] = useState(false);
  const [handoffRequested, setHandoffRequested] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const sessionId = useRef(LOCAL_SESSION_ID());
  const bottomRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const composeInputRef = useRef<HTMLInputElement>(null);
  const wasOpenRef = useRef(false);
  const closeChatRef = useRef<() => void>(() => {});

  useEffect(() => {
    const show = (event: Event) => {
      const detail = (event as CustomEvent<{ source?: unknown; productId?: unknown; action?: unknown }>).detail;
      const requestedSource = detail?.source;
      const source = typeof requestedSource === "string" && CHAT_SOURCES.includes(requestedSource as ChatSource)
        ? requestedSource as ChatSource
        : currentChatSource();
      const selectedProduct = typeof detail?.productId === "string" && Object.prototype.hasOwnProperty.call(PRODUCT_CATALOG, detail.productId)
        ? PRODUCT_CATALOG[detail.productId as keyof typeof PRODUCT_CATALOG]
        : undefined;
      const action = detail?.action === "experience" || detail?.action === "proposal" || detail?.action === "explore" ? detail.action : undefined;
      const nextContext: AssistantContext = { productId: selectedProduct?.id, action };
      setChatSource(source);
      setAssistantContext(nextContext);
      setMessages((previous) => previous.length === 1 && previous[0].role === "bot"
        ? [{ role: "bot", text: selectedProduct ? `¡Hola! Veo que estás explorando ${selectedProduct.name}. Puedo explicarte cómo funciona, cuándo tiene sentido y qué alternativas existen. ¿Qué te gustaría descubrir primero?` : greetingForSource(source) }]
        : previous);
      trackEvent("chat_open");
      setOpen(true);
    };
    window.addEventListener("automata:open-chat", show);
    return () => window.removeEventListener("automata:open-chat", show);
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages, open, handoffText, isThinking]);

  const send = async (value = input) => {
    const text = value.trim();
    if (!text || isThinking) return;
    const normalizedText = text.toLocaleLowerCase("es");
    const category = /publicidad|video|anuncio|campaña/.test(normalizedText) ? "publicidad"
      : /sitio web|página web|pagina web|web/.test(normalizedText) ? "web"
      : /asistente|chatbot|atención|atencion/.test(normalizedText) ? "asistentes"
      : /automatiz|proceso|integración|integracion/.test(normalizedText) ? "automatizacion"
      : /pedido|reserva|cita|whatsapp/.test(normalizedText) ? "pedidos" : "otro";
    trackEvent("chat_message", category);
    const conversation: Message[] = [...messages, { role: "user", text }];
    setMessages(conversation);
    setShareConsent(false);
    const requestsHuman = requestsHumanHandoff(text);
    if (requestsHuman) {
      setHandoffRequested(true);
      setShowHandoff(true);
      setHandoffText(buildHandoffSummary(conversation));
      setMessages([...conversation, { role: "bot", text: "Claro. Dejemos la conversación directamente al equipo. Preparé un Brief de Cierre Humano, un resumen editable con lo que ya compartiste; revísalo y autoriza compartirlo para continuar por WhatsApp." }]);
      setInput("");
      setIsThinking(false);
      return;
    }
    const previousBotMessage = [...messages].reverse().find((message) => message.role === "bot")?.text ?? "";
    const affirmative = /^(si|sí|si por favor|sí por favor|de acuerdo|adelante|por supuesto)[.!\s]*$/i.test(text);
    const authorization = /^(autorizo|lo autorizo|autorizo el envío|autorizo compartir)[.!\s]*$/i.test(text);
    if (handoffRequested && affirmative && /resumen/i.test(previousBotMessage)) {
      setShowHandoff(true);
      setHandoffText(buildHandoffSummary(messages));
      setInput("");
      setIsThinking(false);
      return;
    }
    if (handoffRequested && authorization) {
      setShowHandoff(true);
      setMessages([...conversation, { role: "bot", text: "Tu autorización por escrito no envía la solicitud. Para compartirla, revisa el resumen, marca la casilla de autorización y pulsa «Continuar por WhatsApp». WhatsApp se abrirá para que confirmes el envío desde tu dispositivo." }]);
      setHandoffText(buildHandoffSummary(conversation));
      setIsThinking(false);
      return;
    }
    setShowHandoff(false);
    setInput("");
    setIsThinking(true);

    let answer = "";
    try {
        const response = await fetch(`${AUTOMATA_API_URL}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Chat-Session": sessionId.current
          },
          signal: AbortSignal.timeout(60000),
          body: JSON.stringify({
            source: chatSource,
            productId: assistantContext.productId,
            action: assistantContext.action,
            messages: (() => {
              const recent = conversation.slice(1).slice(-20);
              if (recent[0]?.role === "bot") recent.shift();
              return recent.map((message) => ({
                role: message.role === "user" ? "user" : "model",
                text: message.text
              }));
            })()
          })
        });
        const payload = await response.json().catch(() => ({})) as { answer?: string; error?: string };
        if (!response.ok) {
          answer = payload.error || (response.status === 429
            ? "Llegaste al límite temporal de consultas. Espera un momento e inténtalo nuevamente."
            : response.status >= 500
              ? "El asistente no está disponible en este momento. Inténtalo nuevamente en unos minutos."
              : "No pudimos procesar tu consulta. Revisa el mensaje e inténtalo nuevamente.");
        } else if (!payload.answer) {
          answer = "El asistente respondió sin contenido. Inténtalo nuevamente en unos minutos.";
        } else {
          answer = payload.answer;
        }
    } catch (error) {
      console.error("Automata chat request failed:", error);
      answer = error instanceof DOMException && error.name === "TimeoutError"
        ? "La respuesta tardó más de lo esperado. Tu mensaje no se procesó; inténtalo nuevamente."
        : "No pudimos conectar con el asistente de IA. Tu mensaje no se procesó; revisa tu conexión e inténtalo nuevamente.";
    }

    const completedMessages: Message[] = [...conversation, { role: "bot", text: answer }];
    setMessages(completedMessages);
    setHandoffText(buildHandoffSummary(completedMessages));
    setIsThinking(false);
  };

  const submit = (event: FormEvent) => { event.preventDefault(); send(); };

  const userMessages = messages.filter((message) => message.role === "user");
  const lastUserMessage = userMessages[userMessages.length - 1]?.text ?? "";
  const explicitHandoffRequest = requestsHumanHandoff(lastUserMessage);
  const canOfferHandoff = handoffRequested || explicitHandoffRequest;

  const closeChat = () => {
    if (messages.some((message) => message.role === "user")) {
      window.dispatchEvent(new Event("automata:offer-newsletter"));
    }
    setOpen(false);
  };
  closeChatRef.current = closeChat;

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        launcherRef.current?.focus();
      }
      return;
    }

    wasOpenRef.current = true;
    composeInputRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeChatRef.current();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const continueOnWhatsApp = () => {
    if (!shareConsent || !handoffText.trim()) return;
    const contactLines = [contactName.trim() ? "Contacto: " + contactName.trim() : "", companyName.trim() ? "Empresa: " + companyName.trim() : ""].filter(Boolean);
    const message = contactLines.length ? handoffText.trim().replace("BRIEF DE CIERRE HUMANO | AUTOMATA", "BRIEF DE CIERRE HUMANO | AUTOMATA\n" + contactLines.join("\n")) : handoffText.trim();
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    trackEvent("whatsapp_click");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="automata-chat-root">
      {open && <section id="automata-chat-panel" className="automata-chat-panel" role="dialog" aria-modal="false" aria-label="Asistente virtual de Automata">
        <header className="automata-chat-header">
          <span className="automata-chat-avatar"><Bot size={22} /></span>
          <div><strong>Autómata</strong><small>Asistente virtual de Automata</small></div>
          <button type="button" onClick={closeChat} aria-label="Cerrar chat" className="automata-chat-close"><X size={20} /></button>
        </header>
        <div className="automata-chat-messages" role="log" aria-live="polite" aria-relevant="additions" aria-atomic="false">
          {messages.map((message, index) => <div key={index} className={`automata-chat-message ${message.role}`}>{message.text}</div>)}
          {messages.length === 1 && <div className="automata-chat-quick">{quickQuestionsForSource(chatSource).map((question) => <button key={question} type="button" disabled={isThinking} onClick={() => send(question)}>{question}</button>)}</div>}
          {canOfferHandoff && !showHandoff && <button type="button" className="automata-handoff-button" onClick={() => setShowHandoff(true)}>Preparar brief de cierre</button>}
          {showHandoff && <section className="automata-handoff">
            <div className="automata-handoff-heading"><strong>Brief de cierre para el equipo</strong><span>Contexto para continuar sin repetir la conversación</span></div>
            <button type="button" className="automata-handoff-back" onClick={() => setShowHandoff(false)}>Volver a conversar</button>
            <p className="automata-handoff-copy">Añade tus datos de contacto si lo deseas. Son opcionales; el equipo podrá continuar aunque los dejes vacíos.</p>
            <input aria-label="Tu nombre (opcional)" value={contactName} onChange={(event) => setContactName(event.target.value)} placeholder="Tu nombre (opcional)" maxLength={80} />
            <input aria-label="Empresa o negocio (opcional)" value={companyName} onChange={(event) => setCompanyName(event.target.value)} placeholder="Empresa o negocio (opcional)" maxLength={100} />
            <p className="automata-handoff-copy">Revisa y edita el brief. El equipo lo utilizará para retomar el caso, validar el alcance y definir el siguiente paso; no es una cotización ni confirma una contratación.</p>
            <textarea aria-label="Brief de cierre editable para WhatsApp" value={handoffText} onChange={(event) => { setHandoffText(event.target.value); setShareConsent(false); }} rows={8} />
            <label className="automata-handoff-consent"><input type="checkbox" checked={shareConsent} onChange={(event) => setShareConsent(event.target.checked)} /> Autorizo compartir este resumen y los datos de contacto que he proporcionado con el equipo de Automata por WhatsApp.</label>
            <button type="button" className="automata-handoff-button" onClick={continueOnWhatsApp} disabled={!shareConsent || !handoffText.trim()}><MessageCircle size={17} /> Continuar por WhatsApp <ArrowUpRight size={16} /></button>
          </section>}
          {isThinking && <div className="automata-chat-message bot" role="status">Autómata está pensando...</div>}
          <div ref={bottomRef} />
        </div>
        <form className="automata-chat-compose" onSubmit={submit}>
          <input ref={composeInputRef} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Escribe tu consulta..." aria-label="Escribe tu consulta" maxLength={1800} disabled={isThinking} />
          <button type="submit" disabled={!input.trim() || isThinking} aria-label="Enviar mensaje"><Send size={18} /></button>
        </form>
        <p className="automata-chat-note"><Sparkles size={12} /> Asistente con IA de Automata · proveedores alternativos. No incluyas datos sensibles. Escribir una autorización en el chat no envía mensajes; el envío se inicia al pulsar Continuar por WhatsApp.</p>
      </section>}
      <button ref={launcherRef} type="button" className="automata-chat-launcher" onClick={() => { if (!open) { trackEvent("chat_open"); setOpen(true); } else { closeChat(); } }} aria-label={open ? "Cerrar asistente" : "Abrir asistente"} aria-expanded={open} aria-controls="automata-chat-panel" aria-haspopup="dialog">
        {open ? <X size={24} /> : <MessageCircle size={24} />}
        {!open && <span>¿Hablamos?</span>}
      </button>
    </div>
  );
}

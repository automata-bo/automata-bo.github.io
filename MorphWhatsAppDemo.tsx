import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Bot,
  Calendar,
  Check,
  CheckCheck,
  ChevronRight,
  Clock,
  Compass,
  FileText,
  HelpCircle,
  Info,
  MapPin,
  MessageCircle,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  RotateCcw,
  Send,
  ShoppingBag,
  Smile,
  Sparkles,
  Store,
  User,
  Users,
  Utensils,
  Video,
  X
} from "lucide-react";

/* ─── TIPOS ─────────────────────────────────────────────── */
type Sender = "user" | "bot" | "system";

interface QuickReply {
  id: string;
  label: string;
  actionText: string;
}

interface ProductItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  category: "coffee" | "bakery" | "brunch";
  badge?: string;
  badgeEn?: string;
}

interface MessageCard {
  type: "catalog" | "order_summary" | "order_confirmed" | "booking_summary" | "booking_confirmed" | "location_info";
  data?: any;
}

interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
  card?: MessageCard;
  quickReplies?: QuickReply[];
}

/* ─── CATÁLOGO DEL NEGOCIO FICTICIO (AURA Café & Bistro) ─── */
const CATALOG: ProductItem[] = [
  {
    id: "prod-1",
    name: "Flat White Especialidad",
    nameEn: "Specialty Flat White",
    description: "Doble shot de espresso Geisha con microespuma de leche aterciopelada.",
    descriptionEn: "Double shot of Geisha espresso with velvety steamed whole milk.",
    price: 4.5,
    category: "coffee",
    badge: "Más vendido",
    badgeEn: "Bestseller"
  },
  {
    id: "prod-2",
    name: "Cold Brew Macerado 18h",
    nameEn: "18-Hour Steeped Cold Brew",
    description: "Café de origen infusionado en frío con notas florales y cítricas.",
    descriptionEn: "Single-origin cold brew with crisp floral and citrus notes.",
    price: 4.8,
    category: "coffee"
  },
  {
    id: "prod-3",
    name: "Croissant Almendras & Vainilla",
    nameEn: "Almond & Vanilla Croissant",
    description: "Hojaldre 100% mantequilla relleno de crema frangipane y almendras tostadas.",
    descriptionEn: "100% butter pastry filled with rich frangipane and toasted almonds.",
    price: 3.9,
    category: "bakery",
    badge: "Artesanal",
    badgeEn: "Artisan"
  },
  {
    id: "prod-4",
    name: "Tostón Palta & Huevo Poché",
    nameEn: "Avocado & Poached Egg Toast",
    description: "Pan de masa madre, palta cremosa, huevo de campo y semillas tostadas.",
    descriptionEn: "Artisan sourdough, creamy avocado, organic poached egg and toasted seeds.",
    price: 6.2,
    category: "brunch"
  },
  {
    id: "prod-5",
    name: "Cheesecake Vasco Caramelizado",
    nameEn: "Basque Burnt Cheesecake",
    description: "Textura cremosa fundente con superficie tostada al estilo San Sebastián.",
    descriptionEn: "Creamy melt-in-mouth texture with authentic caramelized top.",
    price: 4.5,
    category: "bakery"
  }
];

export default function MorphWhatsAppDemo({ onClose }: { onClose?: () => void }) {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [businessModalOpen, setBusinessModalOpen] = useState(false);

  // Estado del flujo contextual de conversación
  const [dialogState, setDialogState] = useState<{
    flow: "idle" | "ordering" | "confirming_order" | "booking" | "confirming_booking";
    selectedItems: { item: ProductItem; quantity: number }[];
    address?: string;
    bookingDetails?: { people: number; time: string; date: string; name?: string };
  }>({
    flow: "idle",
    selectedItems: []
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getCurrentTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  /* Mensajes iniciales */
  const getInitialMessages = (l: "es" | "en"): ChatMessage[] => [
    {
      id: "init-1",
      sender: "system",
      text: l === "es"
        ? "🔒 Los mensajes en este chat de demostración están simulados con tecnología MORPH para WhatsApp Business de AUTOMATA."
        : "🔒 Messages in this demo chat are simulated with AUTOMATA's MORPH for WhatsApp Business technology.",
      time: getCurrentTime()
    },
    {
      id: "init-2",
      sender: "bot",
      text: l === "es"
        ? "¡Hola! 👋 Bienvenido a *AURA Specialty Coffee & Bistro*. Soy **MORPH**, el asistente inteligente del negocio.\n\nAtiendo consultas, tomo pedidos para delivery y gestiono reservas de mesa de forma inmediata 24/7.\n\n¿En qué te puedo colaborar hoy?"
        : "Hello! 👋 Welcome to *AURA Specialty Coffee & Bistro*. I am **MORPH**, the intelligent assistant for this business.\n\nI answer inquiries, process delivery orders, and schedule table reservations 24/7.\n\nHow can I assist you today?",
      time: getCurrentTime(),
      status: "read",
      quickReplies: [
        { id: "qr-catalog", label: l === "es" ? "📋 Ver menú y precios" : "📋 View menu & prices", actionText: l === "es" ? "Quiero ver la carta y precios" : "I want to see the menu and prices" },
        { id: "qr-order", label: l === "es" ? "🛍️ Hacer un pedido" : "🛍️ Place an order", actionText: l === "es" ? "Quiero hacer un pedido a domicilio" : "I want to place a delivery order" },
        { id: "qr-booking", label: l === "es" ? "📅 Reservar una mesa" : "📅 Book a table", actionText: l === "es" ? "Quisiera reservar una mesa" : "I'd like to book a table" },
        { id: "qr-hours", label: l === "es" ? "📍 Horarios y ubicación" : "📍 Hours & Location", actionText: l === "es" ? "¿Dónde están ubicados y qué horarios tienen?" : "Where are you located and what are your hours?" }
      ]
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages("es"));

  // Scroll automático al último mensaje
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Al cambiar idioma, reiniciar la conversación con mensajes en el nuevo idioma
  const handleToggleLang = (newLang: "es" | "en") => {
    if (newLang === lang) return;
    setLang(newLang);
    setDialogState({ flow: "idle", selectedItems: [] });
    setMessages(getInitialMessages(newLang));
  };

  // Reiniciar conversación
  const handleReset = () => {
    setDialogState({ flow: "idle", selectedItems: [] });
    setMessages(getInitialMessages(lang));
    if (inputRef.current) inputRef.current.focus();
  };

  /* ─── MOTOR DE PROCESAMIENTO CONVERSACIONAL DETERMINISTA ─── */
  const processUserInput = (rawText: string) => {
    const text = rawText.trim();
    if (!text) return;

    const userMsgId = `usr-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text,
      time: getCurrentTime(),
      status: "sent"
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    // Paso 1: marcar como entregado y leído en 200ms
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => (m.id === userMsgId ? { ...m, status: "read" } : m))
      );
      setIsTyping(true);
    }, 250);

    // Paso 2: generar respuesta contextual tras simular "escribiendo..." (750ms - 1100ms)
    setTimeout(() => {
      setIsTyping(false);
      generateBotReply(text.toLowerCase(), text);
    }, 1100);
  };

  const generateBotReply = (lower: string, rawText: string) => {
    const isEs = lang === "es";
    let botReplyText = "";
    let card: MessageCard | undefined;
    let quickReplies: QuickReply[] | undefined;

    // EVALUACIÓN DE CONTEXTO ACTIVO
    if (dialogState.flow === "confirming_order") {
      if (
        lower.includes("si") ||
        lower.includes("sí") ||
        lower.includes("confirmar") ||
        lower.includes("correcto") ||
        lower.includes("dale") ||
        lower.includes("perfecto") ||
        lower.includes("listo") ||
        lower.includes("yes") ||
        lower.includes("confirm") ||
        lower.includes("sure")
      ) {
        const orderNum = Math.floor(1000 + Math.random() * 9000);
        botReplyText = isEs
          ? `🎉 *¡Pedido #AU-${orderNum} confirmado con éxito!*\n\nTu orden ya ingresó al sistema de barra y cocina de AURA. Un repartidor la llevará a tu dirección en aproximadamente *25 a 35 minutos*.\n\nRecibirás el recibo digital con el enlace de seguimiento en vivo. ¡Muchas gracias por tu preferencia!`
          : `🎉 *Order #AU-${orderNum} confirmed successfully!*\n\nYour order has been sent directly to AURA's bar & kitchen. A courier will deliver it to your address in approximately *25 to 35 minutes*.\n\nYou will receive a digital receipt and live tracking link. Thank you for your order!`;
        card = {
          type: "order_confirmed",
          data: {
            orderNumber: `#AU-${orderNum}`,
            items: dialogState.selectedItems,
            address: dialogState.address || (isEs ? "Dirección confirmada" : "Confirmed address"),
            eta: "25-35 min"
          }
        };
        quickReplies = [
          { id: "qr-new", label: isEs ? "☕ Ver otros productos" : "☕ View more items", actionText: isEs ? "Quiero ver más productos" : "I want to see more items" },
          { id: "qr-agent", label: isEs ? "💬 Hablar con asesor humano" : "💬 Talk to human agent", actionText: isEs ? "Quiero hablar con una persona de atención" : "I want to speak with a human advisor" }
        ];
        setDialogState({ flow: "idle", selectedItems: [] });
        pushBotMessage(botReplyText, card, quickReplies);
        return;
      } else if (
        lower.includes("cancelar") ||
        lower.includes("no") ||
        lower.includes("cancel") ||
        lower.includes("modificar") ||
        lower.includes("cambiar")
      ) {
        botReplyText = isEs
          ? "Entendido, he cancelado la orden en curso. ¿Deseas elegir otros productos o consultar nuestro menú?"
          : "Understood, I've cancelled that pending order. Would you like to pick different items or check the menu?";
        quickReplies = [
          { id: "qr-cat", label: isEs ? "📋 Ver menú" : "📋 View menu", actionText: isEs ? "Ver menú de AURA" : "View AURA menu" },
          { id: "qr-book", label: isEs ? "📅 Reservar mesa" : "📅 Book a table", actionText: isEs ? "Quiero reservar mesa" : "I want to book a table" }
        ];
        setDialogState({ flow: "idle", selectedItems: [] });
        pushBotMessage(botReplyText, card, quickReplies);
        return;
      }
    }

    if (dialogState.flow === "ordering") {
      // Si el usuario escribe una dirección o especifica algo
      const detectedAddress = rawExtractAddress(lower);
      const chosenAddress = detectedAddress || (isEs ? "Av. Las Américas #340, Dpto 4B" : "340 Las Americas Ave, Apt 4B");

      const items = dialogState.selectedItems.length > 0
        ? dialogState.selectedItems
        : [
            { item: CATALOG[0], quantity: 1 },
            { item: CATALOG[2], quantity: 1 }
          ];

      const subtotal = items.reduce((acc, i) => acc + i.item.price * i.quantity, 0);
      const deliveryFee = 1.5;
      const total = subtotal + deliveryFee;

      botReplyText = isEs
        ? `Excelente. He tomado la dirección: *${chosenAddress}*.\n\nAquí tienes el resumen detallado de tu orden antes de enviarla a cocina:`
        : `Great. I've noted your address: *${chosenAddress}*.\n\nHere is your order summary before dispatching to the kitchen:`;

      card = {
        type: "order_summary",
        data: {
          items,
          subtotal,
          deliveryFee,
          total,
          address: chosenAddress
        }
      };

      quickReplies = [
        { id: "qr-confirm-order", label: isEs ? "✅ Confirmar pedido" : "✅ Confirm order", actionText: isEs ? "Sí, confirmar pedido" : "Yes, confirm order" },
        { id: "qr-cancel-order", label: isEs ? "❌ Cancelar" : "❌ Cancel", actionText: isEs ? "Cancelar pedido" : "Cancel order" }
      ];

      setDialogState(prev => ({
        ...prev,
        flow: "confirming_order",
        selectedItems: items,
        address: chosenAddress
      }));
      pushBotMessage(botReplyText, card, quickReplies);
      return;
    }

    if (dialogState.flow === "confirming_booking") {
      if (
        lower.includes("si") ||
        lower.includes("sí") ||
        lower.includes("confirmar") ||
        lower.includes("correcto") ||
        lower.includes("dale") ||
        lower.includes("perfecto") ||
        lower.includes("listo") ||
        lower.includes("yes") ||
        lower.includes("confirm")
      ) {
        const resCode = Math.floor(100 + Math.random() * 900);
        botReplyText = isEs
          ? `🎉 *¡Reserva confirmada con código #RES-${resCode}!*\n\nTe esperamos con tu mesa lista y reservada en la zona de terraza. Si necesitas ajustar el horario o número de personas, solo escríbenos por aquí.`
          : `🎉 *Reservation confirmed with code #RES-${resCode}!*\n\nYour table will be ready on our garden terrace. If you need to make changes, simply reply here at any time.`;

        card = {
          type: "booking_confirmed",
          data: {
            code: `#RES-${resCode}`,
            people: dialogState.bookingDetails?.people || 2,
            time: dialogState.bookingDetails?.time || "19:30",
            date: isEs ? "Hoy" : "Today",
            zone: isEs ? "Terraza Jardín (Pet-Friendly)" : "Garden Terrace (Pet-Friendly)"
          }
        };

        quickReplies = [
          { id: "qr-menu-book", label: isEs ? "☕ Ver carta previa" : "☕ Check menu beforehand", actionText: isEs ? "Quiero ver la carta" : "I want to see the menu" },
          { id: "qr-loc-book", label: isEs ? "📍 Cómo llegar" : "📍 How to get there", actionText: isEs ? "¿Cómo llegar a AURA?" : "How to get to AURA?" }
        ];

        setDialogState({ flow: "idle", selectedItems: [] });
        pushBotMessage(botReplyText, card, quickReplies);
        return;
      }
    }

    // CLASIFICACIÓN DE INTENCIONES (NLP determinista local)
    // 1. SALUDO
    if (
      lower.includes("hola") ||
      lower.includes("buen dia") ||
      lower.includes("buenas") ||
      lower.includes("hey") ||
      lower.includes("hello") ||
      lower.includes("hi")
    ) {
      botReplyText = isEs
        ? "¡Hola! Un gusto saludarte. ¿En qué puedo asistirte en AURA? Puedes explorar nuestra carta, hacer un pedido para entrega inmediata o reservar tu mesa para hoy."
        : "Hello! Great to connect with you. How can I help you at AURA today? You can browse our specialty menu, place a delivery order, or reserve a table for today.";
      quickReplies = [
        { id: "qr-cat", label: isEs ? "📋 Ver menú" : "📋 View menu", actionText: isEs ? "Ver menú" : "View menu" },
        { id: "qr-order", label: isEs ? "🛍️ Pedir a domicilio" : "🛍️ Order delivery", actionText: isEs ? "Pedir a domicilio" : "Order delivery" },
        { id: "qr-book", label: isEs ? "📅 Reservar mesa" : "📅 Book table", actionText: isEs ? "Reservar mesa" : "Book table" }
      ];
      pushBotMessage(botReplyText, card, quickReplies);
      return;
    }

    // 2. CATÁLOGO / MENÚ
    if (
      lower.includes("menu") ||
      lower.includes("menú") ||
      lower.includes("carta") ||
      lower.includes("precios") ||
      lower.includes("productos") ||
      lower.includes("cafe") ||
      lower.includes("café") ||
      lower.includes("comida") ||
      lower.includes("postres") ||
      lower.includes("price") ||
      lower.includes("drink") ||
      lower.includes("food")
    ) {
      botReplyText = isEs
        ? "Aquí tienes nuestros productos más destacados de café de especialidad y pastelería de autor. Puedes pulsar **Agregar** en cualquiera de ellos para comenzar tu pedido:"
        : "Here are our featured specialty coffees and artisan pastries. You can click **Add to Order** on any item to start:";
      card = {
        type: "catalog",
        data: CATALOG
      };
      quickReplies = [
        { id: "qr-order-direct", label: isEs ? "🛍️ Pedir Flat White + Croissant" : "🛍️ Order Flat White + Croissant", actionText: isEs ? "Quiero pedir un Flat White y un Croissant" : "I want to order a Flat White and a Croissant" },
        { id: "qr-pay-info", label: isEs ? "💳 Métodos de pago" : "💳 Payment methods", actionText: isEs ? "¿Qué métodos de pago aceptan?" : "What payment methods do you accept?" },
        { id: "qr-back", label: isEs ? "📅 Reservar mesa" : "📅 Reserve table", actionText: isEs ? "Prefiero reservar una mesa" : "I prefer to reserve a table" }
      ];
      pushBotMessage(botReplyText, card, quickReplies);
      return;
    }

    // 3. PEDIDO A DOMICILIO
    if (
      lower.includes("pedido") ||
      lower.includes("pedir") ||
      lower.includes("delivery") ||
      lower.includes("domicilio") ||
      lower.includes("ordenar") ||
      lower.includes("comprar") ||
      lower.includes("order") ||
      lower.includes("buy")
    ) {
      // Buscar si mencionó algún producto específico
      const selected: { item: ProductItem; quantity: number }[] = [];
      if (lower.includes("flat") || lower.includes("white") || lower.includes("cafe") || lower.includes("café")) {
        selected.push({ item: CATALOG[0], quantity: 1 });
      }
      if (lower.includes("croissant") || lower.includes("almendra")) {
        selected.push({ item: CATALOG[2], quantity: 1 });
      }
      if (lower.includes("cold") || lower.includes("brew")) {
        selected.push({ item: CATALOG[1], quantity: 1 });
      }
      if (lower.includes("toston") || lower.includes("palta") || lower.includes("aguacate")) {
        selected.push({ item: CATALOG[3], quantity: 1 });
      }
      if (lower.includes("cheesecake")) {
        selected.push({ item: CATALOG[4], quantity: 1 });
      }

      // Si no detectó productos específicos, asignar combo por defecto
      const finalItems = selected.length > 0
        ? selected
        : [
            { item: CATALOG[0], quantity: 1 },
            { item: CATALOG[2], quantity: 1 }
          ];

      setDialogState({
        flow: "ordering",
        selectedItems: finalItems
      });

      const itemsText = finalItems.map(i => `• ${i.quantity}x ${isEs ? i.item.name : i.item.nameEn} ($${(i.item.price * i.quantity).toFixed(2)})`).join("\n");

      botReplyText = isEs
        ? `¡Con gusto! He preparado tu pedido con:\n${itemsText}\n\n📍 Por favor, indícame tu **dirección de entrega** o pulsa una de las direcciones rápidas de prueba:`
        : `With pleasure! I've prepared your order with:\n${itemsText}\n\n📍 Please share your **delivery address** or select one of the quick options:`;

      quickReplies = [
        { id: "qr-addr-1", label: isEs ? "📍 Av. Las Américas #340" : "📍 340 Las Americas Ave", actionText: isEs ? "Entregar en Av. Las Américas #340, Dpto 4B" : "Deliver to 340 Las Americas Ave, Apt 4B" },
        { id: "qr-addr-2", label: isEs ? "📍 Calle Bolívar #128" : "📍 128 Bolivar St", actionText: isEs ? "Mi dirección es Calle Bolívar #128 (Oficina 2)" : "My address is 128 Bolivar St (Office 2)" },
        { id: "qr-addr-store", label: isEs ? "🏬 Retirar en tienda" : "🏬 Store pick-up", actionText: isEs ? "Prefiero retirar personalmente en tienda" : "I prefer to pick up at the store" }
      ];

      pushBotMessage(botReplyText, card, quickReplies);
      return;
    }

    // 4. RESERVA DE MESA
    if (
      lower.includes("reserva") ||
      lower.includes("reservar") ||
      lower.includes("mesa") ||
      lower.includes("cita") ||
      lower.includes("book") ||
      lower.includes("reservation") ||
      lower.includes("table")
    ) {
      setDialogState({
        flow: "confirming_booking",
        selectedItems: [],
        bookingDetails: {
          people: 2,
          time: "19:30",
          date: isEs ? "Hoy" : "Today"
        }
      });

      botReplyText = isEs
        ? "¡Excelente elección! Tenemos disponibilidad para hoy en nuestra terraza con ambientación musical tenue.\n\nHe preparado esta solicitud preliminar de reserva:\n\n• **Personas:** 2 comensales\n• **Hora:** 19:30 hrs\n• **Zona:** Terraza Jardín (Climatizada)\n\n¿Deseas confirmarla o prefieres otra hora?"
        : "Wonderful choice! We have availability for today on our garden terrace.\n\nHere is your reservation preview:\n\n• **Party size:** 2 guests\n• **Time:** 7:30 PM\n• **Area:** Garden Terrace\n\nWould you like to confirm or choose another time?";

      quickReplies = [
        { id: "qr-confirm-res", label: isEs ? "✅ Confirmar para 2 (19:30)" : "✅ Confirm for 2 (7:30 PM)", actionText: isEs ? "Sí, confirmar reserva para 2 a las 19:30" : "Yes, confirm reservation for 2 at 7:30 PM" },
        { id: "qr-change-res-4", label: isEs ? "👥 Cambiar a 4 personas (20:30)" : "👥 Change to 4 guests (8:30 PM)", actionText: isEs ? "Quisiera para 4 personas a las 20:30" : "I'd like for 4 guests at 8:30 PM" },
        { id: "qr-cancel-res", label: isEs ? "❌ En otro momento" : "❌ Another time", actionText: isEs ? "Cancelar reserva por ahora" : "Cancel reservation for now" }
      ];

      pushBotMessage(botReplyText, card, quickReplies);
      return;
    }

    // 5. HORARIOS Y UBICACIÓN
    if (
      lower.includes("horario") ||
      lower.includes("abierto") ||
      lower.includes("donde") ||
      lower.includes("dónde") ||
      lower.includes("ubicacion") ||
      lower.includes("ubicación") ||
      lower.includes("direccion") ||
      lower.includes("dirección") ||
      lower.includes("llegar") ||
      lower.includes("mapa") ||
      lower.includes("hours") ||
      lower.includes("open") ||
      lower.includes("location") ||
      lower.includes("address") ||
      lower.includes("where")
    ) {
      botReplyText = isEs
        ? "🕒 **Horarios de Atención:**\n• Lunes a Sábado: 07:30 a 22:30\n• Domingos y feriados: 08:30 a 20:30\n\n📍 **Ubicación:**\nCalle Los Laureles #420, Barrio San Roque (a pasos de la plaza).\nContamos con parqueo privado vigilado para clientes y terraza 100% pet-friendly 🐾."
        : "🕒 **Opening Hours:**\n• Monday to Saturday: 7:30 AM to 10:30 PM\n• Sundays & Holidays: 8:30 AM to 8:30 PM\n\n📍 **Location:**\n420 Los Laureles St, San Roque District (steps from the main square).\nWe offer private customer parking and a 100% pet-friendly garden terrace 🐾.";

      card = {
        type: "location_info",
        data: {
          address: isEs ? "Calle Los Laureles #420, Tarija" : "420 Los Laureles St, Tarija",
          hours: isEs ? "Abierto hoy hasta las 22:30" : "Open today until 10:30 PM",
          phone: "+591 4 664-9281"
        }
      };

      quickReplies = [
        { id: "qr-menu-from-loc", label: isEs ? "📋 Ver el menú" : "📋 View menu", actionText: isEs ? "Quiero ver el menú" : "I want to see the menu" },
        { id: "qr-order-from-loc", label: isEs ? "🛍️ Pedir a domicilio" : "🛍️ Order delivery", actionText: isEs ? "Hacer pedido a domicilio" : "Place delivery order" },
        { id: "qr-book-from-loc", label: isEs ? "📅 Reservar mesa" : "📅 Book table", actionText: isEs ? "Reservar mesa para hoy" : "Reserve table for today" }
      ];

      pushBotMessage(botReplyText, card, quickReplies);
      return;
    }

    // 6. MÉTODOS DE PAGO Y FACTURACIÓN
    if (
      lower.includes("pago") ||
      lower.includes("pagar") ||
      lower.includes("tarjeta") ||
      lower.includes("qr") ||
      lower.includes("efectivo") ||
      lower.includes("transferencia") ||
      lower.includes("factura") ||
      lower.includes("pay") ||
      lower.includes("payment") ||
      lower.includes("card")
    ) {
      botReplyText = isEs
        ? "💳 **Métodos de pago aceptados:**\n• **Pago por QR Simple** (acreditación instantánea)\n• **Tarjetas Débito / Crédito** (Visa y Mastercard)\n• **Efectivo contra entrega** (con cambio exacto si lo necesitas)\n• **Facturación electrónica con NIT** enviada directo a tu WhatsApp."
        : "💳 **Accepted Payment Methods:**\n• **Simple QR / Mobile pay** (instant clearance)\n• **Credit & Debit Cards** (Visa & Mastercard)\n• **Cash on delivery**\n• **Automated digital invoices** sent directly to this WhatsApp chat.";

      quickReplies = [
        { id: "qr-start-order", label: isEs ? "🛍️ Hacer un pedido ahora" : "🛍️ Place an order now", actionText: isEs ? "Quiero hacer un pedido" : "I want to place an order" },
        { id: "qr-see-menu", label: isEs ? "📋 Ver la carta" : "📋 View menu", actionText: isEs ? "Ver la carta completa" : "View full menu" }
      ];

      pushBotMessage(botReplyText, card, quickReplies);
      return;
    }

    // 7. ASESOR HUMANO (Handoff simulado sin salir de la experiencia)
    if (
      lower.includes("humano") ||
      lower.includes("persona") ||
      lower.includes("asesor") ||
      lower.includes("agente") ||
      lower.includes("atencion") ||
      lower.includes("atención") ||
      lower.includes("human") ||
      lower.includes("agent") ||
      lower.includes("representative")
    ) {
      botReplyText = isEs
        ? "👨‍💼 **Derivación a asesor humano en curso.**\n\nHe recopilado el historial de esta conversación para que nuestro encargado de turno (Carlos M.) continúe atendiéndote de manera personalizada sin que tengas que repetir nada.\n\nTiempo estimado de respuesta humana: *menos de 2 minutos*."
        : "👨‍💼 **Transferring to human advisor.**\n\nI have summarized your conversation context so our shift manager (Carlos M.) can assist you personally without asking you to repeat anything.\n\nEstimated human response time: *under 2 minutes*.";

      quickReplies = [
        { id: "qr-keep-bot", label: isEs ? "🤖 Seguir con MORPH" : "🤖 Continue with MORPH", actionText: isEs ? "Prefiero continuar con el asistente MORPH" : "I prefer to continue with MORPH" },
        { id: "qr-cat", label: isEs ? "📋 Ver menú mientras tanto" : "📋 View menu meanwhile", actionText: isEs ? "Ver menú mientras tanto" : "View menu meanwhile" }
      ];

      pushBotMessage(botReplyText, card, quickReplies);
      return;
    }

    // 8. FALLBACK INTELIGENTE (No romper la conversación)
    botReplyText = isEs
      ? `Entiendo perfectamente tu consulta sobre *" ${rawText} "*. Como asistente inteligente de AURA, estoy configurado para:\n\n• Tomar pedidos a domicilio y procesar pagos.\n• Reservar mesas con confirmación inmediata.\n• Responder dudas sobre menú, precios, horarios y ubicación.\n\n¿Cuál de estas opciones te gustaría gestionar?`
      : `I understand your question regarding *" ${rawText} "*. As AURA's intelligent assistant, I am configured to:\n\n• Take delivery orders and process payments.\n• Reserve tables with instant confirmation.\n• Answer inquiries about menu, prices, hours and location.\n\nWhich of these would you like to explore?`;

    quickReplies = [
      { id: "qr-cat-fb", label: isEs ? "📋 Ver carta y precios" : "📋 View menu & prices", actionText: isEs ? "Quiero ver la carta" : "I want to see the menu" },
      { id: "qr-order-fb", label: isEs ? "🛍️ Hacer un pedido" : "🛍️ Place an order", actionText: isEs ? "Hacer un pedido a domicilio" : "Place delivery order" },
      { id: "qr-book-fb", label: isEs ? "📅 Reservar mesa" : "📅 Book a table", actionText: isEs ? "Reservar mesa para hoy" : "Book table for today" }
    ];

    pushBotMessage(botReplyText, card, quickReplies);
  };

  const rawExtractAddress = (str: string) => {
    if (str.includes("av.") || str.includes("calle") || str.includes("barrio") || str.includes("#") || str.includes("dpto") || str.includes("st") || str.includes("ave")) {
      return str;
    }
    return null;
  };

  const pushBotMessage = (text: string, card?: MessageCard, quickReplies?: QuickReply[]) => {
    const newMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text,
      time: getCurrentTime(),
      card,
      quickReplies
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const handleQuickReplyClick = (qr: QuickReply) => {
    processUserInput(qr.actionText);
  };

  const handleProductAdd = (product: ProductItem) => {
    processUserInput(
      lang === "es"
        ? `Quiero pedir el ${product.name} ($${product.price.toFixed(2)})`
        : `I want to order the ${product.nameEn} ($${product.price.toFixed(2)})`
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      processUserInput(inputValue);
    }
  };

  return (
    <div className="relative min-h-[92svh] w-full bg-[#0a0e14] py-4 sm:py-8 px-2 sm:px-4 font-sans text-[#e9edef] flex flex-col items-center justify-center">
      {/* ─── BARRA DE CONTROL SUPERIOR EXTERNA (Contexto & Acciones) ─── */}
      <div className="w-full max-w-[940px] mb-3 flex items-center justify-between gap-3 px-2 sm:px-0">
        <div className="flex items-center gap-2">
          {onClose ? (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>{lang === "es" ? "Volver" : "Back"}</span>
            </button>
          ) : (
            <a
              href="/#proyectos"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>{lang === "es" ? "Volver a Proyectos" : "Back to Projects"}</span>
            </a>
          )}

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] text-[11px] font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
            <span>MORPH WHATSAPP BUSINESS · DEMO INTERACTIVA</span>
          </div>
        </div>

        {/* Controles de Escenarios rápidos, Idioma y Reset */}
        <div className="flex items-center gap-2">
          {/* Selector de Idioma */}
          <div className="inline-flex rounded-full bg-white/10 p-0.5 border border-white/10 text-xs font-mono font-bold">
            <button
              onClick={() => handleToggleLang("es")}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                lang === "es" ? "bg-[#25d366] text-[#070a0e]" : "text-white/70 hover:text-white"
              }`}
            >
              ES
            </button>
            <button
              onClick={() => handleToggleLang("en")}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                lang === "en" ? "bg-[#25d366] text-[#070a0e]" : "text-white/70 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          {/* Botón Reiniciar Simulación */}
          <button
            onClick={handleReset}
            title={lang === "es" ? "Reiniciar conversación" : "Reset conversation"}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* ─── MARCO PRINCIPAL DEL SIMULADOR WHATSAPP ─── */}
      <div className="w-full max-w-[940px] h-[84svh] min-h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#0b141a] shadow-[0_25px_70px_rgba(0,0,0,0.65)] flex flex-col relative">

        {/* 1. CABECERA DE WHATSAPP BUSINESS */}
        <header className="h-[64px] sm:h-[70px] bg-[#202c33] border-b border-[#2a3942] px-3 sm:px-4 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar del negocio con badge oficial verde */}
            <div
              onClick={() => setBusinessModalOpen(true)}
              className="relative cursor-pointer group"
              title={lang === "es" ? "Ver información del negocio" : "View business details"}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#005c4b] via-[#008069] to-[#25d366] flex items-center justify-center text-white font-bold text-base shadow-md group-hover:scale-105 transition-transform">
                <span>☕</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#00a884] border-2 border-[#202c33] flex items-center justify-center text-[9px] text-white font-bold" title="Cuenta comercial verificada">
                ✓
              </span>
            </div>

            {/* Nombre y estado del asistente */}
            <div
              onClick={() => setBusinessModalOpen(true)}
              className="min-w-0 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-semibold text-[#e9edef] truncate">
                  AURA Specialty Coffee
                </h2>
                <span className="hidden sm:inline-block font-mono text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#00a884]/20 text-[#00a884] border border-[#00a884]/40">
                  {lang === "es" ? "OFICIAL" : "VERIFIED"}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#8696a0] truncate flex items-center gap-1.5">
                {isTyping ? (
                  <span className="text-[#00a884] font-medium animate-pulse">
                    {lang === "es" ? "escribiendo..." : "typing..."}
                  </span>
                ) : (
                  <span>
                    {lang === "es"
                      ? "en línea · Asistente IA 24/7"
                      : "online · 24/7 AI Assistant"}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Acciones de cabecera */}
          <div className="flex items-center gap-2 sm:gap-3 text-[#aebac1]">
            <button
              onClick={() => processUserInput(lang === "es" ? "¿Dónde están ubicados?" : "Where are you located?")}
              className="p-2 rounded-full hover:bg-[#374248] transition-colors"
              title={lang === "es" ? "Ubicación" : "Location"}
            >
              <MapPin size={18} />
            </button>
            <button
              onClick={() => processUserInput(lang === "es" ? "Quiero hablar con un asesor humano" : "I want to talk to a human agent")}
              className="p-2 rounded-full hover:bg-[#374248] transition-colors"
              title={lang === "es" ? "Llamar asesor" : "Call advisor"}
            >
              <Phone size={18} />
            </button>
            <button
              onClick={() => setBusinessModalOpen(true)}
              className="p-2 rounded-full hover:bg-[#374248] transition-colors"
              title={lang === "es" ? "Información del negocio" : "Business Info"}
            >
              <Info size={18} />
            </button>
          </div>
        </header>

        {/* 2. ÁREA DE MENSAJES CON PATRÓN DOODLE WHATSAPP */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-3 relative z-10 selection:bg-[#00a884] selection:text-white"
          style={{
            backgroundColor: "#0b141a",
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(32, 44, 51, 0.4) 0%, transparent 80%)`,
          }}
        >
          {/* Chip de fecha central */}
          <div className="flex justify-center my-2 sticky top-1 z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-lg bg-[#182229] border border-[#222e35] text-[11px] font-medium text-[#8696a0] shadow-sm uppercase tracking-wider">
              {lang === "es" ? "HOY" : "TODAY"}
            </span>
          </div>

          {/* Renderizado de Mensajes */}
          {messages.map((msg) => {
            if (msg.sender === "system") {
              return (
                <div key={msg.id} className="flex justify-center my-3">
                  <div className="max-w-md px-3.5 py-1.5 rounded-lg bg-[#182229]/90 border border-[#2a3942] text-center text-[11px] leading-relaxed text-[#ffd279]/90 shadow-sm flex items-center justify-center gap-1.5">
                    <span>{msg.text}</span>
                  </div>
                </div>
              );
            }

            const isUser = msg.sender === "user";

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                {/* Burbuja de Mensaje */}
                <div
                  className={`relative max-w-[88%] sm:max-w-[72%] rounded-2xl px-3.5 py-2.5 text-[13.5px] sm:text-[14px] leading-relaxed shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] ${
                    isUser
                      ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none"
                      : "bg-[#202c33] text-[#e9edef] rounded-tl-none border border-[#2a3942]/40"
                  }`}
                >
                  {/* Etiqueta del remitente si es Bot */}
                  {!isUser && (
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#00a884] mb-1">
                      <Bot size={12} />
                      <span>MORPH AI · AURA</span>
                    </div>
                  )}

                  {/* Texto del mensaje con formateo markdown ligero (negritas y listas) */}
                  <div className="whitespace-pre-wrap break-words">
                    {msg.text.split("\n").map((line, idx) => {
                      // Negritas simples *texto* o **texto**
                      const formatted = line.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");
                      return (
                        <p key={idx} className={line.startsWith("• ") ? "pl-2 py-0.5" : "py-0.5"}>
                          {formatted}
                        </p>
                      );
                    })}
                  </div>

                  {/* TARJETA INTERACTIVA (si existe en el mensaje) */}
                  {msg.card && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      {/* 1. Tarjeta de Catálogo */}
                      {msg.card.type === "catalog" && (
                        <div className="space-y-2 mt-1">
                          <p className="text-[11px] font-mono uppercase tracking-wider text-[#00a884] font-bold">
                            {lang === "es" ? "☕ CARTA SELECTA AURA" : "☕ AURA CURATED MENU"}
                          </p>
                          <div className="grid gap-2">
                            {CATALOG.map((prod) => (
                              <div
                                key={prod.id}
                                className="p-2.5 rounded-xl bg-[#111b21] border border-[#2a3942] hover:border-[#00a884]/60 transition-colors flex items-center justify-between gap-3"
                              >
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <strong className="text-xs font-semibold text-white truncate">
                                      {lang === "es" ? prod.name : prod.nameEn}
                                    </strong>
                                    {prod.badge && (
                                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#00a884]/20 text-[#00a884] font-mono">
                                        {lang === "es" ? prod.badge : prod.badgeEn}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-[#8696a0] line-clamp-1 mt-0.5">
                                    {lang === "es" ? prod.description : prod.descriptionEn}
                                  </p>
                                  <span className="text-xs font-bold text-[#ffd279] mt-0.5 inline-block">
                                    ${prod.price.toFixed(2)}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleProductAdd(prod)}
                                  className="shrink-0 px-2.5 py-1.5 rounded-lg bg-[#00a884] hover:bg-[#008f6f] text-white text-[11px] font-bold transition-transform active:scale-95"
                                >
                                  {lang === "es" ? "+ Pedir" : "+ Add"}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 2. Tarjeta de Resumen de Pedido */}
                      {msg.card.type === "order_summary" && (
                        <div className="p-3 rounded-xl bg-[#111b21] border border-[#00a884]/40 space-y-2 text-xs">
                          <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <span className="font-mono text-[10px] text-[#00a884] font-bold uppercase tracking-wider">
                              {lang === "es" ? "📋 TICKET PRELIMINAR" : "📋 PRELIMINARY RECEIPT"}
                            </span>
                            <span className="text-[10px] text-[#8696a0]">AURA BISTRO</span>
                          </div>

                          <div className="space-y-1 py-1">
                            {msg.card.data.items.map((it: any, i: number) => (
                              <div key={i} className="flex justify-between text-white/90">
                                <span>{it.quantity}x {lang === "es" ? it.item.name : it.item.nameEn}</span>
                                <span className="font-mono font-medium">${(it.item.price * it.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                            <div className="flex justify-between text-[#8696a0] pt-1 text-[11px]">
                              <span>{lang === "es" ? "Envío a domicilio" : "Delivery fee"}</span>
                              <span className="font-mono">${msg.card.data.deliveryFee.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-sm text-[#ffd279]">
                            <span>TOTAL:</span>
                            <span className="font-mono">${msg.card.data.total.toFixed(2)}</span>
                          </div>

                          <div className="pt-1 text-[11px] text-[#8696a0] flex items-center gap-1">
                            <MapPin size={12} className="text-[#00a884]" />
                            <span className="truncate">{msg.card.data.address}</span>
                          </div>
                        </div>
                      )}

                      {/* 3. Tarjeta de Pedido Confirmado */}
                      {msg.card.type === "order_confirmed" && (
                        <div className="p-3 rounded-xl bg-[#005c4b]/30 border border-[#00a884] space-y-2 text-xs">
                          <div className="flex items-center justify-between font-mono">
                            <span className="text-[#00a884] font-bold">✓ {msg.card.data.orderNumber}</span>
                            <span className="text-white/80 font-bold bg-[#00a884]/20 px-2 py-0.5 rounded">
                              {lang === "es" ? "EN PREPARACIÓN" : "PREPARING"}
                            </span>
                          </div>
                          <p className="text-[11px] text-white/70">
                            {lang === "es"
                              ? `Tiempo estimado: ${msg.card.data.eta} · Destino: ${msg.card.data.address}`
                              : `Estimated arrival: ${msg.card.data.eta} · Address: ${msg.card.data.address}`}
                          </p>
                        </div>
                      )}

                      {/* 4. Tarjeta de Reserva Confirmada */}
                      {msg.card.type === "booking_confirmed" && (
                        <div className="p-3 rounded-xl bg-[#005c4b]/30 border border-[#00a884] space-y-1.5 text-xs">
                          <div className="flex items-center justify-between font-mono">
                            <span className="text-[#00a884] font-bold">✓ {msg.card.data.code}</span>
                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                              {lang === "es" ? "CONFIRMADA" : "CONFIRMED"}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-white/80">
                            <div>
                              <span className="text-[#8696a0] block">{lang === "es" ? "Personas:" : "Party:"}</span>
                              <strong>{msg.card.data.people} {lang === "es" ? "comensales" : "guests"}</strong>
                            </div>
                            <div>
                              <span className="text-[#8696a0] block">{lang === "es" ? "Hora:" : "Time:"}</span>
                              <strong>{msg.card.data.time} hrs</strong>
                            </div>
                          </div>
                          <p className="text-[10px] text-[#8696a0] pt-1">
                            📍 {msg.card.data.zone}
                          </p>
                        </div>
                      )}

                      {/* 5. Tarjeta de Horarios y Ubicación */}
                      {msg.card.type === "location_info" && (
                        <div className="p-3 rounded-xl bg-[#111b21] border border-[#2a3942] space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-white font-semibold">
                            <Store size={15} className="text-[#00a884]" />
                            <span>AURA Specialty Coffee &amp; Bistro</span>
                          </div>
                          <p className="text-[11px] text-[#8696a0] leading-relaxed">
                            {msg.card.data.address}<br />
                            <span className="text-[#00a884]">{msg.card.data.hours}</span>
                          </p>
                          <div className="pt-2 flex gap-2">
                            <button
                              type="button"
                              onClick={() => processUserInput(lang === "es" ? "Quiero reservar mesa" : "I want to reserve a table")}
                              className="w-full py-1.5 rounded-lg bg-[#00a884] text-white font-bold text-[11px]"
                            >
                              {lang === "es" ? "Reservar mesa aquí" : "Book table here"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Hora y checks de lectura */}
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#8696a0]">
                    <span>{msg.time}</span>
                    {isUser && (
                      <span className="text-[#53bdeb]">
                        {msg.status === "read" ? <CheckCheck size={14} /> : <Check size={14} />}
                      </span>
                    )}
                  </div>
                </div>

                {/* BOTONES DE RESPUESTAS RÁPIDAS (Quick replies contextuales) */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%] sm:max-w-[80%]">
                    {msg.quickReplies.map((qr) => (
                      <button
                        key={qr.id}
                        type="button"
                        onClick={() => handleQuickReplyClick(qr)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1f2c34] hover:bg-[#00a884] hover:text-white border border-[#2a3942] hover:border-[#00a884] text-[12px] font-medium text-[#00a884] transition-all duration-150 active:scale-95 shadow-sm"
                      >
                        <span>{qr.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Indicador de escritura animado ("typing...") */}
          {isTyping && (
            <div className="flex items-start">
              <div className="rounded-2xl rounded-tl-none bg-[#202c33] border border-[#2a3942]/40 px-4 py-3 shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8696a0] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-[#8696a0] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-[#8696a0] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>

        {/* 3. BARRA INFERIOR DE ESCRITURA Y ENTRADA DE WHATSAPP */}
        <footer className="bg-[#202c33] border-t border-[#2a3942] px-3 py-2.5 flex items-center gap-2 shrink-0 z-20">
          {/* Botones auxiliares (emojis, adjuntos) */}
          <div className="flex items-center gap-1 text-[#8696a0]">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-[#374248] hover:text-[#e9edef] transition-colors"
              onClick={() => processUserInput(lang === "es" ? "😊 Hola de nuevo" : "😊 Hello again")}
              title="Emoji"
            >
              <Smile size={20} />
            </button>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-[#374248] hover:text-[#e9edef] transition-colors"
              onClick={() => processUserInput(lang === "es" ? "Quiero ver la carta completa con fotos" : "I want to see the full menu with photos")}
              title={lang === "es" ? "Adjuntar" : "Attach"}
            >
              <Paperclip size={20} />
            </button>
          </div>

          {/* Campo de escritura funcional */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                lang === "es"
                  ? "Escribe un mensaje o prueba pedir algo..."
                  : "Type a message or try ordering..."
              }
              className="w-full h-10 px-4 rounded-lg bg-[#2a3942] text-[#e9edef] placeholder-[#8696a0] text-sm focus:outline-none focus:ring-1 focus:ring-[#00a884] border-0"
            />
          </div>

          {/* Botón de Enviar dinámico */}
          {inputValue.trim() ? (
            <button
              type="button"
              onClick={() => processUserInput(inputValue)}
              className="w-10 h-10 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center transition-transform active:scale-95 shadow-md shrink-0"
              title={lang === "es" ? "Enviar mensaje" : "Send message"}
            >
              <Send size={18} className="translate-x-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => processUserInput(lang === "es" ? "Quiero hacer un pedido rápido" : "I want to make a quick order")}
              className="w-10 h-10 rounded-full bg-[#2a3942] hover:bg-[#374248] text-[#8696a0] hover:text-[#e9edef] flex items-center justify-center transition-colors shrink-0"
              title={lang === "es" ? "Enviar sugerencia" : "Send suggestion"}
            >
              <Mic size={18} />
            </button>
          )}
        </footer>

        {/* ─── MODAL DE INFORMACIÓN DEL NEGOCIO (Ficha de WhatsApp Business) ─── */}
        {businessModalOpen && (
          <div className="absolute inset-0 z-30 bg-[#0b141a]/95 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto flex flex-col justify-between animate-fadeIn">
            <div>
              <div className="flex items-center justify-between border-b border-[#2a3942] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Store size={18} className="text-[#00a884]" />
                  <h3 className="font-semibold text-base text-white">
                    {lang === "es" ? "Perfil de Empresa Oficial" : "Official Business Profile"}
                  </h3>
                </div>
                <button
                  onClick={() => setBusinessModalOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#005c4b] to-[#25d366] mx-auto flex items-center justify-center text-2xl shadow-xl mb-3">
                  ☕
                </div>
                <h4 className="text-lg font-bold text-white">AURA Specialty Coffee &amp; Bistro</h4>
                <p className="text-xs text-[#00a884] font-mono mt-0.5">
                  ✓ {lang === "es" ? "Cuenta comercial verificada por AUTOMATA MORPH" : "Verified business account by AUTOMATA MORPH"}
                </p>
                <p className="text-xs text-[#8696a0] max-w-sm mx-auto mt-2 leading-relaxed">
                  {lang === "es"
                    ? "Cafetería de especialidad, panadería de masa madre y brunch artesanal. Atención automatizada en WhatsApp 24/7."
                    : "Specialty coffee, sourdough bakery, and artisan brunch. Automated WhatsApp concierge 24/7."}
                </p>
              </div>

              <div className="space-y-3 mt-4 text-xs">
                <div className="p-3 rounded-xl bg-[#202c33] border border-[#2a3942] flex items-center gap-3">
                  <Clock size={16} className="text-[#00a884] shrink-0" />
                  <div>
                    <strong className="text-white block">{lang === "es" ? "Horario" : "Hours"}</strong>
                    <span className="text-[#8696a0]">{lang === "es" ? "Lun - Sáb: 07:30 - 22:30 · Dom: 08:30 - 20:30" : "Mon - Sat: 7:30 - 22:30 · Sun: 8:30 - 20:30"}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#202c33] border border-[#2a3942] flex items-center gap-3">
                  <MapPin size={16} className="text-[#00a884] shrink-0" />
                  <div>
                    <strong className="text-white block">{lang === "es" ? "Dirección" : "Address"}</strong>
                    <span className="text-[#8696a0]">{lang === "es" ? "Calle Los Laureles #420, Barrio San Roque, Tarija" : "420 Los Laureles St, San Roque, Tarija"}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#202c33] border border-[#2a3942] flex items-center gap-3">
                  <Utensils size={16} className="text-[#00a884] shrink-0" />
                  <div>
                    <strong className="text-white block">{lang === "es" ? "Servicios" : "Services"}</strong>
                    <span className="text-[#8696a0]">{lang === "es" ? "Delivery propio, reservas de mesa, eventos privados" : "In-house delivery, table bookings, private events"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2a3942] flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setBusinessModalOpen(false);
                  processUserInput(lang === "es" ? "Quiero hacer un pedido" : "I want to place an order");
                }}
                className="flex-1 py-2 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white text-xs font-bold transition-colors"
              >
                {lang === "es" ? "Hacer un pedido" : "Place an order"}
              </button>
              <button
                type="button"
                onClick={() => setBusinessModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
              >
                {lang === "es" ? "Cerrar" : "Close"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─── NOTA AL PIE DE LA DEMOSTRACIÓN ─── */}
      <div className="w-full max-w-[940px] mt-3 px-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8696a0] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00a884]" />
          <span>
            {lang === "es"
              ? "Simulador local autónomo de MORPH WhatsApp Business sin conexión externa ni recopilación de datos."
              : "Autonomous local MORPH WhatsApp Business simulator without external connection or data gathering."}
          </span>
        </div>
        <div className="font-mono text-[10px] text-white/50">
          AUTOMATA · MORPH v3
        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Check,
  Clock,
  MapPin,
  Flame,
  Coffee,
  Sparkles,
  ChevronRight,
  Store,
  Bike,
  UtensilsCrossed,
  Search,
  X,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  RotateCcw
} from "lucide-react";

/* ─── TIPOS ─────────────────────────────────────────────── */
export type ItemCategory = "all" | "hot_coffee" | "cold_coffee" | "specialty" | "bakery" | "brunch";

export interface CustomizationOption {
  id: string;
  name: string;
  nameEn: string;
  priceDelta: number;
}

export interface CustomizationGroup {
  id: string;
  title: string;
  titleEn: string;
  type: "single" | "multiple";
  options: CustomizationOption[];
}

export interface CafeItem {
  id: string;
  category: ItemCategory;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  basePrice: number;
  image: string;
  tags?: string[];
  tagsEn?: string[];
  calories?: number;
  customizationGroups?: CustomizationGroup[];
}

export interface CartItem {
  cartId: string;
  item: CafeItem;
  quantity: number;
  selectedOptions: Record<string, string[]>; // groupId -> array of optionIds
  unitPrice: number;
  notes?: string;
}

/* ─── CATÁLOGO GASTRONÓMICO DE "ORIGEN SPECIALTY COFFEE" ─── */
const CAFE_ITEMS: CafeItem[] = [
  {
    id: "flat-white",
    category: "hot_coffee",
    name: "Flat White Especialidad",
    nameEn: "Specialty Flat White",
    description: "Doble espresso de origen Huabal (Perú) con microespuma de leche aterciopelada y textura sedosa.",
    descriptionEn: "Double shot of single-origin Peruvian espresso with velvety microfoam and rich silky texture.",
    basePrice: 4.5,
    calories: 140,
    tags: ["Bestseller", "Doble Shot"],
    tagsEn: ["Bestseller", "Double Shot"],
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80",
    customizationGroups: [
      {
        id: "size",
        title: "Tamaño",
        titleEn: "Size",
        type: "single",
        options: [
          { id: "reg", name: "Estándar (8 oz)", nameEn: "Standard (8 oz)", priceDelta: 0 },
          { id: "lrg", name: "Grande (12 oz)", nameEn: "Large (12 oz)", priceDelta: 0.8 }
        ]
      },
      {
        id: "milk",
        title: "Tipo de Leche",
        titleEn: "Milk Option",
        type: "single",
        options: [
          { id: "whole", name: "Leche Entera de Campo", nameEn: "Whole Farm Milk", priceDelta: 0 },
          { id: "oat", name: "Bebida de Avena Barista", nameEn: "Barista Oat Milk", priceDelta: 0.6 },
          { id: "almond", name: "Bebida de Almendras", nameEn: "Almond Milk", priceDelta: 0.6 },
          { id: "lactose_free", name: "Deslactosada", nameEn: "Lactose-Free", priceDelta: 0 }
        ]
      },
      {
        id: "extras",
        title: "Extras & Toppings",
        titleEn: "Extras & Add-ons",
        type: "multiple",
        options: [
          { id: "extra_shot", name: "Shot Extra de Espresso", nameEn: "Extra Espresso Shot", priceDelta: 0.9 },
          { id: "vanilla_syrup", name: "Sirope Vainilla Madagascar", nameEn: "Madagascar Vanilla", priceDelta: 0.5 },
          { id: "cinnamon", name: "Canela de Ceilán espolvoreada", nameEn: "Ceylon Cinnamon Dust", priceDelta: 0 }
        ]
      }
    ]
  },
  {
    id: "batch-brew",
    category: "hot_coffee",
    name: "Filtrado del Día (Batch Brew)",
    nameEn: "Batch Brew Filter Coffee",
    description: "Café de goteo limpio, cuerpo ligero y notas frutales a jazmín y durazno blanco. Servido caliente.",
    descriptionEn: "Clean drip coffee with light body and delicate tasting notes of jasmine and white peach.",
    basePrice: 3.8,
    calories: 5,
    tags: ["Origen Único", "Filtro"],
    tagsEn: ["Single Origin", "Filter"],
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    customizationGroups: [
      {
        id: "size",
        title: "Tamaño",
        titleEn: "Size",
        type: "single",
        options: [
          { id: "reg", name: "Mediano (10 oz)", nameEn: "Medium (10 oz)", priceDelta: 0 },
          { id: "lrg", name: "Grande (14 oz)", nameEn: "Large (14 oz)", priceDelta: 0.7 }
        ]
      }
    ]
  },
  {
    id: "cold-brew-tonic",
    category: "cold_coffee",
    name: "Cold Brew Tonic & Naranja",
    nameEn: "Cold Brew Tonic & Orange",
    description: "Café infusionado en frío durante 18 horas sobre agua tónica botánica y rodaja de naranja deshidratada.",
    descriptionEn: "18-hour cold steeped coffee poured over botanical tonic water with a slice of dehydrated orange.",
    basePrice: 5.2,
    calories: 60,
    tags: ["Refrescante", "Firma"],
    tagsEn: ["Refreshing", "Signature"],
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
    customizationGroups: [
      {
        id: "sweetener",
        title: "Nivel de Dulzor",
        titleEn: "Sweetness",
        type: "single",
        options: [
          { id: "none", name: "Sin endulzar (Puro)", nameEn: "Unsweetened (Pure)", priceDelta: 0 },
          { id: "cane", name: "Toque de miel de caña", nameEn: "Touch of cane syrup", priceDelta: 0.3 }
        ]
      }
    ]
  },
  {
    id: "iced-latte-caramel",
    category: "cold_coffee",
    name: "Iced Salted Caramel Latte",
    nameEn: "Iced Salted Caramel Latte",
    description: "Espresso doble con caramelo salado artesanal, cubos de hielo de agua filtrada y leche cremosa.",
    descriptionEn: "Double espresso with housemade salted caramel, filtered ice cubes and velvety milk.",
    basePrice: 5.5,
    calories: 220,
    tags: ["Favorito", "Dulce"],
    tagsEn: ["Favorite", "Sweet"],
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=800&q=80",
    customizationGroups: [
      {
        id: "milk",
        title: "Leche",
        titleEn: "Milk",
        type: "single",
        options: [
          { id: "whole", name: "Entera", nameEn: "Whole Milk", priceDelta: 0 },
          { id: "oat", name: "Avena Barista", nameEn: "Oat Milk", priceDelta: 0.6 },
          { id: "almond", name: "Almendra", nameEn: "Almond Milk", priceDelta: 0.6 }
        ]
      }
    ]
  },
  {
    id: "matcha-ceremonial",
    category: "specialty",
    name: "Iced Ceremonial Matcha Latte",
    nameEn: "Iced Ceremonial Matcha Latte",
    description: "Té verde matcha grado ceremonial Uji (Kioto), batido a mano y servido en capas sobre bebida de avena.",
    descriptionEn: "Ceremonial grade Uji matcha whisked to order and layered over silky barista oat milk.",
    basePrice: 5.8,
    calories: 120,
    tags: ["Superfood", "Uji Kioto"],
    tagsEn: ["Superfood", "Uji Kyoto"],
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
    customizationGroups: [
      {
        id: "sweetness",
        title: "Dulzura",
        titleEn: "Sweetness",
        type: "single",
        options: [
          { id: "sugar_free", name: "Tradicional sin azúcar", nameEn: "Traditional (Unsweetened)", priceDelta: 0 },
          { id: "vanilla", name: "Toque de vainilla orgánica", nameEn: "Organic vanilla kiss", priceDelta: 0.4 },
          { id: "honey", name: "Miel pura de azahar", nameEn: "Blossom honey", priceDelta: 0.5 }
        ]
      }
    ]
  },
  {
    id: "croissant-bicolor",
    category: "bakery",
    name: "Croissant Bicolor Chocolate & Avellanas",
    nameEn: "Bi-Color Chocolate & Hazelnut Croissant",
    description: "Hojaldre 100% mantequilla de fermentación lenta de 72 horas, relleno de crema de gianduja y cacao puro.",
    descriptionEn: "100% butter slow-fermented pastry layered with dark gianduja cocoa cream and roasted hazelnuts.",
    basePrice: 4.2,
    calories: 340,
    tags: ["Recién horneado", "Artesanal"],
    tagsEn: ["Freshly Baked", "Artisan"],
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    customizationGroups: [
      {
        id: "prep",
        title: "Temperatura al servir",
        titleEn: "Serving Temperature",
        type: "single",
        options: [
          { id: "warm", name: "Calentado en horno (Crocante)", nameEn: "Oven warmed (Crispy)", priceDelta: 0 },
          { id: "room", name: "A temperatura ambiente", nameEn: "Room temperature", priceDelta: 0 }
        ]
      }
    ]
  },
  {
    id: "avocado-toast",
    category: "brunch",
    name: "Tostón de Aguacate, Queso de Cabra & Huevo Poché",
    nameEn: "Avocado, Goat Cheese & Poached Egg Toast",
    description: "Rebanada gruesa de pan de masa madre tostado, aguacate Hass machacado, queso de cabra cremoso y huevo de campo.",
    descriptionEn: "Thick slice of toasted artisan sourdough, mashed Hass avocado, whipped goat cheese, and organic poached egg.",
    basePrice: 6.9,
    calories: 420,
    tags: ["Brunch Estrella", "Saludable"],
    tagsEn: ["Brunch Star", "Healthy"],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    customizationGroups: [
      {
        id: "bread",
        title: "Tipo de Pan",
        titleEn: "Bread Base",
        type: "single",
        options: [
          { id: "sourdough", name: "Masa Madre Campesina", nameEn: "Rustic Sourdough", priceDelta: 0 },
          { id: "multigrain", name: "Multicereal con Semillas", nameEn: "Multigrain Seeded", priceDelta: 0.4 },
          { id: "gluten_free", name: "Sin Gluten de Almendras", nameEn: "Gluten-Free Almond", priceDelta: 0.8 }
        ]
      },
      {
        id: "extras",
        title: "Complementos",
        titleEn: "Add-ons",
        type: "multiple",
        options: [
          { id: "extra_egg", name: "Huevo Poché Adicional", nameEn: "Extra Poached Egg", priceDelta: 1.2 },
          { id: "smoked_salmon", name: "Salmón Ahumado Noruego (40g)", nameEn: "Smoked Norwegian Salmon (40g)", priceDelta: 2.8 },
          { id: "chili_flakes", name: "Hojuelas de Chile & Semillas", nameEn: "Chili Flakes & Seeds", priceDelta: 0 }
        ]
      }
    ]
  },
  {
    id: "cheesecake-vasco",
    category: "bakery",
    name: "Cheesecake Vasco con Frambuesas",
    nameEn: "Basque Burnt Cheesecake with Berries",
    description: "Receta tradicional de San Sebastián con superficie tostada caramelizada y centro cremoso fundente.",
    descriptionEn: "Authentic San Sebastian recipe with caramelized burnt top and luscious molten cream center.",
    basePrice: 4.8,
    calories: 380,
    tags: ["Postre Icónico"],
    tagsEn: ["Iconic Dessert"],
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"
  }
];

export default function DigitalCafeDemo({ onClose }: { onClose?: () => void }) {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [activeCategory, setActiveCategory] = useState<ItemCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<CafeItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<"catalog" | "checkout" | "confirmed">("catalog");

  // Opciones temporales del modal de personalización
  const [tempOptions, setTempOptions] = useState<Record<string, string[]>>({});
  const [tempQuantity, setTempQuantity] = useState(1);
  const [tempNotes, setTempNotes] = useState("");

  // Datos del pedido en Checkout
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [customerName, setCustomerName] = useState("Valeria Morales");
  const [customerPhone, setCustomerPhone] = useState("+591 761 92899");
  const [deliveryAddress, setDeliveryAddress] = useState("Calle Las Palmas #240, Dpto 3B");
  const [paymentMethod, setPaymentMethod] = useState<"apple_pay" | "card" | "counter">("apple_pay");
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>("");

  const isEs = lang === "es";

  /* ─── FILTRADO DEL MENÚ ─────────────────────────────────── */
  const filteredItems = useMemo(() => {
    return CAFE_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const textToSearch = `${item.name} ${item.nameEn} ${item.description} ${item.descriptionEn}`.toLowerCase();
      const matchesSearch = !searchQuery.trim() || textToSearch.includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  /* ─── CÁLCULO DE TOTALES DEL CARRITO ─────────────────────── */
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [cart]);

  const deliveryFee = orderType === "delivery" ? 1.8 : 0;
  const grandTotal = subtotal + deliveryFee;
  const totalCartCount = cart.reduce((count, item) => count + item.quantity, 0);

  /* ─── MANEJO DE PERSONALIZACIÓN ─────────────────────────── */
  const openProductCustomization = (item: CafeItem) => {
    setSelectedProduct(item);
    setTempQuantity(1);
    setTempNotes("");

    // Inicializar opciones por defecto (la primera opción de cada grupo single)
    const defaults: Record<string, string[]> = {};
    item.customizationGroups?.forEach((grp) => {
      if (grp.type === "single" && grp.options.length > 0) {
        defaults[grp.id] = [grp.options[0].id];
      } else {
        defaults[grp.id] = [];
      }
    });
    setTempOptions(defaults);
  };

  const handleOptionToggle = (group: CustomizationGroup, optId: string) => {
    setTempOptions((prev) => {
      const current = prev[group.id] || [];
      if (group.type === "single") {
        return { ...prev, [group.id]: [optId] };
      }
      if (current.includes(optId)) {
        return { ...prev, [group.id]: current.filter((id) => id !== optId) };
      }
      return { ...prev, [group.id]: [...current, optId] };
    });
  };

  const calculateCustomizedPrice = (item: CafeItem, opts: Record<string, string[]>): number => {
    let price = item.basePrice;
    item.customizationGroups?.forEach((grp) => {
      const chosen = opts[grp.id] || [];
      grp.options.forEach((opt) => {
        if (chosen.includes(opt.id)) {
          price += opt.priceDelta;
        }
      });
    });
    return price;
  };

  const addCustomizedToCart = () => {
    if (!selectedProduct) return;
    const unitPrice = calculateCustomizedPrice(selectedProduct, tempOptions);
    const cartId = `${selectedProduct.id}-${Date.now()}`;

    setCart((prev) => [
      ...prev,
      {
        cartId,
        item: selectedProduct,
        quantity: tempQuantity,
        selectedOptions: tempOptions,
        unitPrice,
        notes: tempNotes.trim() || undefined
      }
    ]);
    setSelectedProduct(null);
  };

  const updateCartQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.cartId === cartId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const newId = `#OR-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrderId(newId);
    setCurrentStep("confirmed");
  };

  const handleResetDemo = () => {
    setCart([]);
    setCurrentStep("catalog");
    setCartDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#f5f2ed] font-sans selection:bg-[#dfa85b] selection:text-[#0f0c0a] pb-16">
      {/* ─── BARRA DE CONTROL GLOBAL (Regreso & Controles de la Demo) ─── */}
      <header className="sticky top-0 z-40 bg-[#161210]/95 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="mx-auto max-w-[1240px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {onClose ? (
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                <ArrowLeft size={15} />
                <span>{isEs ? "Volver a Proyectos" : "Back to Projects"}</span>
              </button>
            ) : (
              <a
                href="/#proyectos"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                <ArrowLeft size={15} />
                <span>{isEs ? "Volver" : "Back"}</span>
              </a>
            )}

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfa85b]/10 border border-[#dfa85b]/30 text-[#dfa85b] text-[11px] font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-[#dfa85b] animate-pulse" />
              <span>DIGITAL COMMERCE &amp; ORDERING EXPERIENCE</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle de Idioma ES / EN */}
            <div className="inline-flex rounded-full bg-white/10 p-0.5 border border-white/10 text-xs font-mono font-bold">
              <button
                onClick={() => setLang("es")}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  lang === "es" ? "bg-[#dfa85b] text-[#0f0c0a]" : "text-white/70 hover:text-white"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  lang === "en" ? "bg-[#dfa85b] text-[#0f0c0a]" : "text-white/70 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            {/* Botón Carrito Flotante en Barra */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d97443] hover:bg-[#c66535] text-white font-bold text-xs shadow-lg transition-transform active:scale-95"
            >
              <ShoppingBag size={16} />
              <span>{isEs ? "Ver Pedido" : "Order"}</span>
              {totalCartCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#d97443] text-[10px] font-black">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ─── PANTALLA 1: CATÁLOGO Y EXPERIENCIA DE MENÚ ─── */}
      {currentStep === "catalog" && (
        <main className="mx-auto max-w-[1240px] px-4 pt-6 sm:pt-10">
          {/* Hero Banner de la Cafetería */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1c1613] via-[#241c18] to-[#1a1411] border border-white/10 p-6 sm:p-10 mb-8 shadow-2xl">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
                alt="Cafetería"
                className="w-full h-full object-cover mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1c1613] via-[#1c1613]/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#dfa85b] bg-[#dfa85b]/15 px-3 py-1 rounded-full border border-[#dfa85b]/30">
                  SPECIALTY COFFEE ROASTERS · TARIJA
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {isEs ? "Barra abierta ahora" : "Bar open now"}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white mb-3">
                ORIGEN <span className="italic font-normal text-[#dfa85b]">Specialty Coffee</span>
              </h1>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6 font-serif">
                {isEs
                  ? "Café de origen seleccionado, panadería de fermentación lenta y cocina honesta. Elige tus favoritos, personaliza cada detalle y realiza tu pedido para retirar o recibir en casa."
                  : "Curated single-origin coffee, slow-fermented bakery, and honest seasonal food. Customize your roast, select your brew and order for express pickup or delivery."}
              </p>

              {/* Badges de Información Rápida del Negocio */}
              <div className="flex flex-wrap gap-4 text-xs text-white/80 font-mono">
                <div className="flex items-center gap-1.5">
                  <Clock size={15} className="text-[#dfa85b]" />
                  <span>{isEs ? "Preparación: 12-18 min" : "Prep time: 12-18 min"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-[#dfa85b]" />
                  <span>{isEs ? "Calle Los Laureles #420" : "420 Los Laureles St"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame size={15} className="text-[#d97443]" />
                  <span>{isEs ? "Tostado local semanal" : "Freshly roasted weekly"}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Barra de Filtros por Categoría & Buscador */}
          <section className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Categorías con Tabs Táctiles */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { id: "all", label: "Todo el menú", labelEn: "All Menu" },
                  { id: "hot_coffee", label: "Café Caliente", labelEn: "Hot Coffee" },
                  { id: "cold_coffee", label: "Café Frío", labelEn: "Cold Coffee" },
                  { id: "specialty", label: "Bebidas Especiales", labelEn: "Specialty Drinks" },
                  { id: "bakery", label: "Repostería & Masas", labelEn: "Bakery & Sweets" },
                  { id: "brunch", label: "Brunch & Salados", labelEn: "Brunch & Savory" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as ItemCategory)}
                    className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                      activeCategory === cat.id
                        ? "bg-[#dfa85b] text-[#0f0c0a] shadow-md shadow-[#dfa85b]/20"
                        : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                    }`}
                  >
                    {isEs ? cat.label : cat.labelEn}
                  </button>
                ))}
              </div>

              {/* Buscador de Productos */}
              <div className="relative min-w-[240px]">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEs ? "Buscar producto o ingrediente..." : "Search product or ingredient..."}
                  className="w-full h-10 pl-9 pr-4 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#dfa85b] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Grid de Productos Gastronómicos */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                onClick={() => openProductCustomization(item)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#181310] border border-white/10 hover:border-[#dfa85b]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.5)] cursor-pointer"
              >
                {/* Imagen del Producto */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#241c18]">
                  <img
                    src={item.image}
                    alt={isEs ? item.name : item.nameEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181310] via-transparent to-transparent opacity-80" />

                  {/* Etiquetas / Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {(isEs ? item.tags : item.tagsEn)?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-[#0f0c0a]/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-[#dfa85b]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {item.calories && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 text-[10px] font-mono text-white/60">
                      {item.calories} kcal
                    </span>
                  )}
                </div>

                {/* Contenido & Descripción */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#dfa85b] transition-colors leading-snug">
                      {isEs ? item.name : item.nameEn}
                    </h3>
                    <p className="mt-2 text-xs text-white/60 line-clamp-2 leading-relaxed">
                      {isEs ? item.description : item.descriptionEn}
                    </p>
                  </div>

                  {/* Pie de Ficha con Precio y Botón de Personalizar */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-white/40 block">
                        {isEs ? "Desde" : "From"}
                      </span>
                      <span className="font-mono text-base font-bold text-white">
                        ${item.basePrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#dfa85b]/15 hover:bg-[#dfa85b] border border-[#dfa85b]/40 hover:border-[#dfa85b] text-[#dfa85b] hover:text-[#0f0c0a] font-bold text-xs transition-colors"
                    >
                      <Plus size={14} />
                      <span>{isEs ? "Personalizar" : "Customize"}</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Estado vacío si no hay resultados */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16 px-4">
              <Coffee size={36} className="mx-auto text-white/30 mb-3" />
              <h4 className="text-base font-bold text-white">
                {isEs ? "No encontramos productos coincidentes" : "No matching items found"}
              </h4>
              <p className="text-xs text-white/60 mt-1">
                {isEs
                  ? "Intenta buscar con otro término o selecciona otra categoría."
                  : "Try searching with a different term or choose another category."}
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-full bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-colors"
              >
                {isEs ? "Restablecer filtros" : "Reset filters"}
              </button>
            </div>
          )}
        </main>
      )}

      {/* ─── PANTALLA 2: CHECKOUT EXCLUSIVO & FLUJO DE PAGO SIMULADO ─── */}
      {currentStep === "checkout" && (
        <main className="mx-auto max-w-[820px] px-4 pt-6 sm:pt-10">
          <button
            onClick={() => setCurrentStep("catalog")}
            className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white mb-6 font-mono"
          >
            <ArrowLeft size={14} />
            <span>{isEs ? "Seguir añadiendo productos" : "Continue adding items"}</span>
          </button>

          <form onSubmit={handleConfirmOrder} className="space-y-6">
            <div className="rounded-3xl bg-[#181310] border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#dfa85b]">
                  {isEs ? "PASO FINAL DE PEDIDO" : "FINAL ORDER STEP"}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                  {isEs ? "Detalles de Entrega & Pago" : "Delivery & Payment Details"}
                </h2>
              </div>

              {/* Selector de Modalidad: Retiro en Barra vs Delivery */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-white/70 mb-3">
                  {isEs ? "Modalidad del Pedido" : "Order Fulfillment"}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType("pickup")}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      orderType === "pickup"
                        ? "bg-[#dfa85b]/15 border-[#dfa85b] text-white shadow-md shadow-[#dfa85b]/10"
                        : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    <Store size={22} className={orderType === "pickup" ? "text-[#dfa85b]" : "text-white/40"} />
                    <div>
                      <strong className="block text-xs sm:text-sm font-bold">
                        {isEs ? "Retirar en Cafetería" : "Store Pickup"}
                      </strong>
                      <span className="text-[11px] text-white/60 block mt-0.5">
                        {isEs ? "Listo en 12-15 min (Sin costo)" : "Ready in 12-15 min (Free)"}
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType("delivery")}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      orderType === "delivery"
                        ? "bg-[#dfa85b]/15 border-[#dfa85b] text-white shadow-md shadow-[#dfa85b]/10"
                        : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    <Bike size={22} className={orderType === "delivery" ? "text-[#dfa85b]" : "text-white/40"} />
                    <div>
                      <strong className="block text-xs sm:text-sm font-bold">
                        {isEs ? "Entrega a Domicilio" : "Home Delivery"}
                      </strong>
                      <span className="text-[11px] text-white/60 block mt-0.5">
                        {isEs ? "En 25-35 min (+$1.80)" : "In 25-35 min (+$1.80)"}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Datos del Cliente */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5">
                    {isEs ? "Nombre Completo" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#dfa85b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5">
                    {isEs ? "Teléfono de Contacto" : "Contact Phone"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#dfa85b]"
                  />
                </div>
              </div>

              {/* Dirección (si es Delivery) */}
              {orderType === "delivery" && (
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5">
                    {isEs ? "Dirección de Entrega" : "Delivery Address"}
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder={isEs ? "Calle, número y referencias..." : "Street, number & apt..."}
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#dfa85b]"
                  />
                </div>
              )}

              {/* Método de Pago Simulado */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-white/70 mb-3">
                  {isEs ? "Método de Pago Ficticio" : "Simulated Payment Method"}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "apple_pay", label: "Apple / GPay", icon: ShieldCheck },
                    { id: "card", label: isEs ? "Tarjeta" : "Card", icon: CreditCard },
                    { id: "counter", label: isEs ? "En barra / QR" : "Counter / QR", icon: QrCode }
                  ].map((pm) => {
                    const Icon = pm.icon;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition-all ${
                          paymentMethod === pm.id
                            ? "bg-[#dfa85b]/15 border-[#dfa85b] text-white"
                            : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                        }`}
                      >
                        <Icon size={18} className={paymentMethod === pm.id ? "text-[#dfa85b]" : "text-white/40"} />
                        <span className="text-xs font-bold">{pm.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Resumen Final de Costos */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-white/70">
                  <span>{isEs ? "Subtotal productos" : "Items subtotal"}</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                {orderType === "delivery" && (
                  <div className="flex justify-between text-white/70">
                    <span>{isEs ? "Envío a domicilio" : "Delivery fee"}</span>
                    <span className="font-mono">${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>{isEs ? "Total a Pagar" : "Total to Pay"}</span>
                  <span className="font-mono text-[#dfa85b] text-lg">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#d97443] hover:bg-[#c66535] text-white font-bold text-sm tracking-wide shadow-xl shadow-[#d97443]/20 transition-transform active:scale-98 flex items-center justify-center gap-2"
              >
                <Check size={18} />
                <span>{isEs ? `Confirmar Pedido Ficticio · $${grandTotal.toFixed(2)}` : `Place Simulated Order · $${grandTotal.toFixed(2)}`}</span>
              </button>
            </div>
          </form>
        </main>
      )}

      {/* ─── PANTALLA 3: CONFIRMACIÓN & SEGUIMIENTO EN VIVO ─── */}
      {currentStep === "confirmed" && (
        <main className="mx-auto max-w-[720px] px-4 pt-10 sm:pt-16 text-center">
          <div className="rounded-3xl bg-[#181310] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40 shadow-xl">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-[0.2em] text-[#dfa85b]">
                {isEs ? "PEDIDO REGISTRADO CON ÉXITO" : "ORDER RECEIVED SUCCESSFULLY"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mt-2">
                {isEs ? "¡Gracias por tu pedido!" : "Thank you for your order!"}
              </h2>
              <p className="text-sm font-mono text-white/60 mt-1">
                {confirmedOrderId} · {customerName}
              </p>
            </div>

            {/* Stepper Visual de Seguimiento en Vivo */}
            <div className="py-6 px-4 rounded-2xl bg-[#0f0c0a] border border-white/5 space-y-4">
              <p className="text-xs font-mono uppercase text-white/50 tracking-wider">
                {isEs ? "Estado en Tiempo Real (Simulado)" : "Real-time Order Status (Simulated)"}
              </p>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-[#0f0c0a] font-bold mx-auto flex items-center justify-center">
                    ✓
                  </div>
                  <strong className="block text-emerald-400 text-[11px]">
                    {isEs ? "Recibido" : "Received"}
                  </strong>
                  <span className="text-[10px] text-white/50">18:42</span>
                </div>

                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#dfa85b] text-[#0f0c0a] font-bold mx-auto flex items-center justify-center animate-pulse">
                    ☕
                  </div>
                  <strong className="block text-[#dfa85b] text-[11px]">
                    {isEs ? "En Preparación" : "In Kitchen"}
                  </strong>
                  <span className="text-[10px] text-white/50">{isEs ? "Barista asignado" : "Barista crafting"}</span>
                </div>

                <div className="space-y-2 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-white/10 text-white font-bold mx-auto flex items-center justify-center">
                    3
                  </div>
                  <strong className="block text-white text-[11px]">
                    {orderType === "pickup" ? (isEs ? "Listo en Barra" : "Ready for Pickup") : (isEs ? "En Camino" : "On the way")}
                  </strong>
                  <span className="text-[10px] text-white/50">~15 min</span>
                </div>
              </div>
            </div>

            {/* Resumen de Productos Confirmados */}
            <div className="text-left space-y-2 pt-2 border-t border-white/10 text-xs">
              <span className="font-mono text-[10px] uppercase text-white/40 block">
                {isEs ? "Detalle de los productos:" : "Ordered Items:"}
              </span>
              {cart.map((ci) => (
                <div key={ci.cartId} className="flex justify-between text-white/80">
                  <span>
                    {ci.quantity}x {isEs ? ci.item.name : ci.item.nameEn}
                  </span>
                  <span className="font-mono">${(ci.unitPrice * ci.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-2 flex justify-between font-bold text-white border-t border-white/10 text-sm">
                <span>{isEs ? "Total pagado:" : "Total paid:"}</span>
                <span className="font-mono text-[#dfa85b]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleResetDemo}
                className="flex-1 py-3.5 rounded-full bg-[#dfa85b] hover:bg-[#c9954a] text-[#0f0c0a] font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={15} />
                <span>{isEs ? "Hacer otro pedido de muestra" : "Order again (Demo)"}</span>
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
                >
                  {isEs ? "Cerrar demo" : "Close demo"}
                </button>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ─── MODAL DE PERSONALIZACIÓN DE PRODUCTO ─── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-[640px] rounded-3xl bg-[#181310] border border-white/15 overflow-hidden shadow-2xl my-8">
            {/* Cabecera con Imagen */}
            <div className="relative h-56 sm:h-64 w-full bg-[#241c18]">
              <img
                src={selectedProduct.image}
                alt={isEs ? selectedProduct.name : selectedProduct.nameEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181310] via-transparent to-black/40" />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="font-mono text-[10px] uppercase font-bold text-[#dfa85b] tracking-wider">
                  {isEs ? "PERSONALIZACIÓN" : "CUSTOMIZATION"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {isEs ? selectedProduct.name : selectedProduct.nameEn}
                </h3>
              </div>
            </div>

            {/* Opciones de Personalización */}
            <div className="p-6 space-y-6 max-h-[50vh] overflow-y-auto">
              <p className="text-xs text-white/70 leading-relaxed">
                {isEs ? selectedProduct.description : selectedProduct.descriptionEn}
              </p>

              {selectedProduct.customizationGroups?.map((group) => (
                <div key={group.id} className="space-y-3 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                      {isEs ? group.title : group.titleEn}
                    </label>
                    <span className="text-[10px] font-mono text-white/40">
                      {group.type === "single" ? (isEs ? "Elige 1" : "Select 1") : (isEs ? "Opcional" : "Optional")}
                    </span>
                  </div>

                  <div className="grid gap-2">
                    {group.options.map((opt) => {
                      const isSelected = (tempOptions[group.id] || []).includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleOptionToggle(group, opt.id)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? "bg-[#dfa85b]/15 border-[#dfa85b] text-white"
                              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                isSelected ? "border-[#dfa85b] bg-[#dfa85b] text-[#0f0c0a] font-bold" : "border-white/30"
                              }`}
                            >
                              {isSelected && "✓"}
                            </span>
                            <span className="text-xs font-medium">{isEs ? opt.name : opt.nameEn}</span>
                          </div>
                          {opt.priceDelta > 0 && (
                            <span className="font-mono text-xs text-[#dfa85b] font-bold">
                              +${opt.priceDelta.toFixed(2)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Notas especiales */}
              <div className="pt-2 border-t border-white/10">
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                  {isEs ? "Instrucciones especiales para el Barista / Cocina" : "Special instructions for kitchen"}
                </label>
                <input
                  type="text"
                  value={tempNotes}
                  onChange={(e) => setTempNotes(e.target.value)}
                  placeholder={isEs ? "Ej: bien caliente, sin servilletas..." : "E.g. extra hot, no sugar..."}
                  className="w-full h-10 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#dfa85b]"
                />
              </div>
            </div>

            {/* Barra Inferior con Cantidad y Botón de Añadir */}
            <div className="p-4 sm:p-6 bg-[#140f0d] border-t border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <button
                  type="button"
                  onClick={() => setTempQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 hover:text-[#dfa85b] transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="font-mono font-bold text-sm min-w-[20px] text-center">{tempQuantity}</span>
                <button
                  type="button"
                  onClick={() => setTempQuantity((q) => q + 1)}
                  className="p-1 hover:text-[#dfa85b] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={addCustomizedToCart}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#d97443] hover:bg-[#c66535] text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#d97443]/20 transition-transform active:scale-98 flex items-center justify-between"
              >
                <span>{isEs ? "Añadir al Pedido" : "Add to Order"}</span>
                <span className="font-mono">
                  ${(calculateCustomizedPrice(selectedProduct, tempOptions) * tempQuantity).toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DRAWER / PANEL LATERAL DEL CARRITO ─── */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-full max-w-[440px] h-full bg-[#161210] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} className="text-[#dfa85b]" />
                  <h3 className="font-serif text-xl font-bold text-white">
                    {isEs ? "Tu Pedido" : "Your Order"}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#dfa85b]/20 text-[#dfa85b] text-[10px] font-mono font-bold">
                    {totalCartCount}
                  </span>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Lista de Items en Carrito */}
              {cart.length === 0 ? (
                <div className="py-16 text-center text-white/50">
                  <ShoppingBag size={36} className="mx-auto mb-3 opacity-40" />
                  <p className="text-sm">{isEs ? "Tu carrito está vacío" : "Your cart is empty"}</p>
                  <span className="text-xs text-white/40 block mt-1">
                    {isEs ? "Añade deliciosos cafés y repostería artesanal" : "Add fresh coffee and artisan pastries"}
                  </span>
                </div>
              ) : (
                <div className="space-y-3 divide-y divide-white/5 max-h-[55vh] overflow-y-auto pr-1">
                  {cart.map((ci) => (
                    <div key={ci.cartId} className="pt-3 first:pt-0 flex items-start gap-3">
                      <img
                        src={ci.item.image}
                        alt={isEs ? ci.item.name : ci.item.nameEn}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-[#241c18]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <strong className="text-xs text-white truncate block">
                            {isEs ? ci.item.name : ci.item.nameEn}
                          </strong>
                          <span className="font-mono text-xs font-bold text-[#dfa85b]">
                            ${(ci.unitPrice * ci.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Opciones seleccionadas renderizadas */}
                        <div className="mt-1 text-[11px] text-white/50 space-y-0.5">
                          {Object.entries(ci.selectedOptions).map(([grpId, optIds]) => {
                            const grp = ci.item.customizationGroups?.find((g) => g.id === grpId);
                            const names = optIds
                              .map((oid) => {
                                const o = grp?.options.find((opt) => opt.id === oid);
                                return isEs ? o?.name : o?.nameEn;
                              })
                              .filter(Boolean);
                            if (names.length === 0) return null;
                            return (
                              <p key={grpId}>
                                • {names.join(", ")}
                              </p>
                            );
                          })}
                          {ci.notes && <p className="italic text-white/40">"{ci.notes}"</p>}
                        </div>

                        {/* Control de cantidad */}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-white/5 rounded-full px-2 py-0.5 border border-white/10">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(ci.cartId, -1)}
                              className="text-white/60 hover:text-white"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-mono text-xs font-bold text-white min-w-[16px] text-center">
                              {ci.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(ci.cartId, 1)}
                              className="text-white/60 hover:text-white"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => updateCartQuantity(ci.cartId, -ci.quantity)}
                            className="text-white/40 hover:text-red-400 p-1 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resumen & Botón de Proceder al Checkout */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-xs text-white/70">
                  <span>{isEs ? "Subtotal" : "Subtotal"}</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white">
                  <span>{isEs ? "Total Estimado" : "Estimated Total"}</span>
                  <span className="font-mono text-[#dfa85b]">${subtotal.toFixed(2)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCartDrawerOpen(false);
                    setCurrentStep("checkout");
                  }}
                  className="w-full py-3.5 rounded-full bg-[#d97443] hover:bg-[#c66535] text-white font-bold text-xs uppercase tracking-wider shadow-xl transition-transform active:scale-98 flex items-center justify-center gap-2"
                >
                  <span>{isEs ? "Continuar al Checkout" : "Proceed to Checkout"}</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
  X,
  Compass,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Clock,
  Calendar,
  Share2
} from "lucide-react";
import BilingualText from "./BilingualText";

/* ─── Web Audio Ambience Engine (Generates genuine soothing Andean wind & acoustic harmonics) ─── */
class SoundEngine {
  ctx: AudioContext | null = null;
  gainNode: GainNode | null = null;
  isPlaying: boolean = false;
  osc1: OscillatorNode | null = null;
  osc2: OscillatorNode | null = null;

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  startAmbience() {
    this.init();
    if (!this.ctx || !this.gainNode || this.isPlaying) return;
    this.isPlaying = true;

    // Ambient warm pad
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = "sine";
    this.osc1.frequency.setValueAtTime(146.83, this.ctx.currentTime); // D3

    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = "triangle";
    this.osc2.frequency.setValueAtTime(220.0, this.ctx.currentTime); // A3

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    this.osc1.connect(filter);
    this.osc2.connect(filter);
    filter.connect(this.gainNode);

    this.osc1.start();
    this.osc2.start();
  }

  stopAmbience() {
    if (!this.isPlaying) return;
    try {
      this.osc1?.stop();
      this.osc2?.stop();
      this.osc1?.disconnect();
      this.osc2?.disconnect();
    } catch {}
    this.isPlaying = false;
  }
}

const soundEngine = new SoundEngine();

export interface StoryScene {
  id: number;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
}

export const storyScenes: StoryScene[] = [
  { id: 1, title: "Portada", titleEn: "Cover", subtitle: "Memorias de la Tierra", subtitleEn: "Memories of the Earth" },
  { id: 2, title: "El Origen", titleEn: "The Origin", subtitle: "Entre la niebla y la piedra", subtitleEn: "Between mist and stone" },
  { id: 3, title: "Las Voces", titleEn: "The Voices", subtitle: "Archivo de la memoria", subtitleEn: "Archive of memory" },
  { id: 4, title: "El Cambio", titleEn: "The Change", subtitle: "1945 — 2026", subtitleEn: "1945 — 2026" },
  { id: 5, title: "El Mapa", titleEn: "The Map", subtitle: "Geografía de los recuerdos", subtitleEn: "Geography of memories" },
  { id: 6, title: "El Legado", titleEn: "The Legacy", subtitle: "La historia continúa", subtitleEn: "The story continues" },
];

export interface HistoricalVoice {
  id: string;
  name: string;
  role: string;
  roleEn: string;
  years: string;
  quote: string;
  quoteEn: string;
  bio: string;
  bioEn: string;
  image: string;
}

export const voicesData: HistoricalVoice[] = [
  {
    id: "mateo",
    name: "Don Mateo Cárdenas",
    role: "Constructor del molino hidráulico",
    roleEn: "Builder of the hydraulic mill",
    years: "1892 — 1974",
    quote: "La piedra no tiene prisa; sabe que el agua siempre regresa al mismo cauce.",
    quoteEn: "The stone is never in a hurry; it knows the water always returns to the same course.",
    bio: "Llegó al valle con dieciocho años y una mula cargada de herramientas de hierro. Tardó siete inviernos en desviar el canal que impulsó el primer molino comunal.",
    bioEn: "He arrived in the valley at age eighteen with a mule packed with iron tools. It took seven winters to carve the canal that powered the first communal mill.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "eulalia",
    name: "Doña Eulalia Mendoza",
    role: "Guardiana de semillas ancestrales",
    roleEn: "Keeper of ancestral seeds",
    years: "1905 — 1988",
    quote: "Guardar una semilla es guardar el hambre de los nietos que todavía no han nacido.",
    quoteEn: "Saving a seed means saving the hunger of grandchildren yet unborn.",
    bio: "Conservó más de cuarenta variedades de maíz andino en vasijas de barro selladas con cera de abeja, salvando las cosechas tras las grandes sequías de 1952.",
    bioEn: "She preserved over forty varieties of Andean maize in clay vessels sealed with beeswax, rescuing harvests after the severe droughts of 1952.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "severino",
    name: "Severino Huanca",
    role: "El campanero de San Pedro",
    roleEn: "The bell ringer of San Pedro",
    years: "1923 — 2001",
    quote: "El repique de fiesta es rápido; el de tormenta avisa antes de que el trueno toque la montaña.",
    quoteEn: "The festival chime is swift; the storm chime warns before thunder touches the mountain peak.",
    bio: "Subió los 78 peldaños del campanario cada mañana durante 54 años ininterrumpidos. Reconocía los cambios de viento antes que los barómetros.",
    bioEn: "He climbed the 78 bell tower steps every single morning for 54 unbroken years. He read shifts in mountain wind before any barometer.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "clara",
    name: "Clara Vaca",
    role: "Maestra rural y cronista comunal",
    roleEn: "Rural teacher & communal chronicler",
    years: "1938 — Presente",
    quote: "Quien no escribe lo que vio, deja que el viento elija lo que el pueblo recordará.",
    quoteEn: "Whoever does not write what they witnessed lets the wind decide what the village remembers.",
    bio: "Fundó la biblioteca comunitaria en un salón de adobe y transcribió más de doscientos cantos y relatos orales que hoy forman el patrimonio vivo del valle.",
    bioEn: "She founded the community library in an adobe hall and transcribed more than two hundred oral songs and tales that form the valley's living heritage.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
  }
];

export interface MapLandmark {
  id: string;
  name: string;
  nameEn: string;
  year: string;
  x: number; // percentage
  y: number; // percentage
  summary: string;
  summaryEn: string;
  story: string;
  storyEn: string;
  image: string;
}

export const landmarksData: MapLandmark[] = [
  {
    id: "molino",
    name: "El Molino Viejo",
    nameEn: "The Old Mill",
    year: "1903",
    x: 28,
    y: 35,
    summary: "El corazón hidráulico que alimentó a tres generaciones del valle.",
    summaryEn: "The hydraulic heart that nourished three generations of the valley.",
    story: "Construido con sillares de granito tallados a mano junto a la cascada de Los Sauces. Su rueda de madera de quebracho giró día y noche moliendo trigo y cebada hasta 1978.",
    storyEn: "Built with hand-chiseled granite blocks beside the Los Sauces waterfall. Its quebracho timber wheel turned day and night milling wheat and barley until 1978.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "puente",
    name: "El Puente de Piedra",
    nameEn: "The Stone Bridge",
    year: "1912",
    x: 62,
    y: 52,
    summary: "El único paso seguro sobre la garganta del río durante las crecidas de enero.",
    summaryEn: "The only safe passage across the river gorge during January floods.",
    story: "Levantado con argamasa de cal y calicanto por artesanos locales. Resistió cinco riadas centenarias y permitió conectar las escuelas de altura con los huertos del fondo del valle.",
    storyEn: "Erected with lime mortar and rubble masonry by local craftsmen. It withstood five centennial floods and connected high-altitude schools with bottom valley orchards.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "escuela",
    name: "La Escuela de la Ladera",
    nameEn: "The Hillside School",
    year: "1934",
    x: 74,
    y: 28,
    summary: "Donde más de mil niños aprendieron sus primeras letras mirando las montañas.",
    summaryEn: "Where more than a thousand children learned their first letters facing the mountains.",
    story: "Construida por los propios padres de familia con adobes secados al sol. En su patio todavía crece el nogal plantado el día de su inauguración.",
    storyEn: "Built by the parents themselves with sun-dried adobe bricks. In its courtyard still thrives the walnut tree planted on inauguration day.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "mirador",
    name: "El Mirador de las Nubes",
    nameEn: "Cloud Lookout Peak",
    year: "Ancestral",
    x: 42,
    y: 78,
    summary: "Punto sagrado donde los antiguos observaban el solsticio de invierno.",
    summaryEn: "Sacred peak where ancestors watched the winter solstice.",
    story: "A 3.400 metros de altitud, domina todo el valle. En noches despejadas se observan las constelaciones que marcaban el calendario de siembra y esquila.",
    storyEn: "At 3,400 meters altitude, it commands the entire valley. On clear nights the constellations that marked planting and shearing calendars emerge in full clarity.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80"
  }
];

export default function DigitalStorytellingDemo({ onClose }: { onClose?: () => void }) {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [activeVoice, setActiveVoice] = useState<HistoricalVoice | null>(null);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeLandmark, setActiveLandmark] = useState<MapLandmark | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption: string } | null>(null);
  const [lang, setLang] = useState<"es" | "en">("es");

  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  // Toggle ambient soundtrack
  const toggleAudio = () => {
    if (audioEnabled) {
      soundEngine.stopAmbience();
      setAudioEnabled(false);
    } else {
      soundEngine.startAmbience();
      setAudioEnabled(true);
    }
  };

  useEffect(() => {
    return () => {
      soundEngine.stopAmbience();
    };
  }, []);

  // Handle before/after comparison slider
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const playVoice = (id: string) => {
    if (playingVoiceId === id) {
      setPlayingVoiceId(null);
      soundEngine.stopAmbience();
    } else {
      setPlayingVoiceId(id);
      soundEngine.startAmbience();
      setAudioEnabled(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070a0e] text-[#f0ede8] font-sans overflow-x-hidden selection:bg-[#ff5c1a] selection:text-white">
      {/* ─── Top Global Navigation Bar ─── */}
      <header className="sticky top-0 z-50 h-16 bg-[#070a0e]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onClose ? (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-white hover:bg-[#ff5c1a] transition-colors"
            >
              <ArrowLeft size={15} />
              <span>{lang === "es" ? "Volver a Proyectos" : "Back to Projects"}</span>
            </button>
          ) : (
            <a
              href="/#proyectos"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-white hover:bg-[#ff5c1a] transition-colors"
            >
              <ArrowLeft size={15} />
              <span>{lang === "es" ? "Volver a Proyectos" : "Back to Projects"}</span>
            </a>
          )}
          <span className="hidden md:inline font-mono text-[11px] uppercase tracking-widest text-white/50 border-l border-white/15 pl-4">
            AUTOMATA STUDIO · DIGITAL STORYTELLING
          </span>
        </div>

        {/* Scene progress indicators */}
        <div className="hidden lg:flex items-center gap-2">
          {storyScenes.map((s) => (
            <button
              key={s.id}
              onClick={() => setCurrentScene(s.id)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider transition-all ${
                currentScene === s.id
                  ? "bg-[#ff5c1a] text-white shadow-lg shadow-[#ff5c1a]/30"
                  : "bg-white/5 text-white/60 hover:bg-white/15 hover:text-white"
              }`}
            >
              0{s.id} {lang === "es" ? s.title : s.titleEn}
            </button>
          ))}
        </div>

        {/* Audio Ambient Toggle & Language Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
              audioEnabled
                ? "bg-[#ff5c1a]/20 text-[#ff8c5a] border border-[#ff5c1a]/40"
                : "bg-white/5 text-white/60 border border-white/10 hover:text-white"
            }`}
            title={audioEnabled ? "Silenciar ambiente" : "Activar sonido ambiental"}
          >
            {audioEnabled ? <Volume2 size={15} className="animate-pulse" /> : <VolumeX size={15} />}
            <span className="hidden sm:inline">{audioEnabled ? "AUDIO ON" : "AUDIO OFF"}</span>
          </button>

          <button
            onClick={() => setLang(l => l === "es" ? "en" : "es")}
            className="px-2.5 py-1 rounded-md bg-white/10 text-xs font-mono font-extrabold text-white hover:bg-white/20 transition-colors uppercase"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>
      </header>

      {/* ─── Main Scene Showcase Container ─── */}
      <main className="relative">
        {/* ESCENA 1: PORTADA CINEMATOGRÁFICA */}
        {currentScene === 1 && (
          <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-between p-6 sm:p-14 lg:p-20 overflow-hidden">
            {/* Background Panoramic Landscape with Subtle Pan Animation */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
                alt="Cordillera andina y valle de niebla"
                className="w-full h-full object-cover brightness-[0.45] contrast-[1.1] scale-105 transition-transform duration-10000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070a0e] via-[#070a0e]/40 to-transparent" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#070a0e]/80" />
            </div>

            <div className="relative z-10 max-w-4xl pt-10 sm:pt-16">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#ff8c5a] bg-[#ff5c1a]/15 border border-[#ff5c1a]/30 px-3.5 py-1.5 rounded-full mb-6">
                <Sparkles size={13} />
                {lang === "es" ? "DOCUMENTAL DIGITAL INTERACTIVO" : "INTERACTIVE DIGITAL DOCUMENTARY"}
              </span>

              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.92] text-white uppercase drop-shadow-2xl">
                Memorias de la Tierra
              </h1>

              <p className="mt-7 text-lg sm:text-2xl text-white/85 font-serif italic max-w-2xl leading-relaxed drop-shadow-lg">
                «{lang === "es" ? "Hay lugares que guardan historias que el tiempo no consigue borrar." : "There are places that keep stories time fails to erase."}»
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setCurrentScene(2)}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ff5c1a] text-white text-sm font-extrabold tracking-wide shadow-xl shadow-[#ff5c1a]/30 hover:bg-[#ff7a3d] hover:scale-[1.02] transition-all"
                >
                  <span>{lang === "es" ? "DESCUBRIR LA HISTORIA" : "DISCOVER THE STORY"}</span>
                  <ChevronRight size={18} />
                </button>

                <button
                  onClick={toggleAudio}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white text-sm font-bold hover:bg-white/10 transition-colors"
                >
                  {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  <span>{audioEnabled ? (lang === "es" ? "Ambiente activo" : "Ambience active") : (lang === "es" ? "Activar sonido ambiental" : "Enable ambient audio")}</span>
                </button>
              </div>
            </div>

            <div className="relative z-10 pt-12 flex items-center justify-between border-t border-white/15 font-mono text-[11px] text-white/50 tracking-widest uppercase">
              <span>AUTOMATA PRODUCTIONS · 2026</span>
              <button
                onClick={() => setCurrentScene(2)}
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
              >
                <span>{lang === "es" ? "CAPÍTULO SIGUIENTE ↓" : "NEXT CHAPTER ↓"}</span>
              </button>
            </div>
          </section>
        )}

        {/* ESCENA 2: EL ORIGEN */}
        {currentScene === 2 && (
          <section className="relative min-h-[calc(100vh-64px)] p-6 sm:p-14 lg:p-20 flex flex-col justify-between">
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="font-mono text-xs font-extrabold tracking-[0.2em] text-[#ff8c5a] uppercase">
                  02 / {lang === "es" ? "EL ORIGEN" : "THE ORIGIN"}
                </span>

                <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95] mt-4">
                  {lang === "es" ? "Entre la niebla y la piedra." : "Between mist and stone."}
                </h2>

                <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed font-serif">
                  {lang === "es"
                    ? "A finales del siglo XIX, seis familias remontaron el cañón del río San Pedro buscando refugio de las guerras civiles. Donde el mapa decía 'tierras inhóspitas', ellos encontraron vertientes de agua pura, arcilla fértil y un microclima protegido por la cordillera."
                    : "At the end of the 19th century, six families ascended the San Pedro river canyon seeking refuge from civil wars. Where the map marked 'inhospitable terrain', they uncovered pure springs, fertile clay, and a microclimate shielded by the high mountains."}
                </p>

                <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed">
                  {lang === "es"
                    ? "Sin planos de ingeniería ni apoyo del Estado, levantaron terrazas agrícolas de piedra seca que aún retienen la humedad en la estación seca. Cada muro fue levantado en faenas comunitarias donde la palabra dada valía más que cualquier título de propiedad."
                    : "Without blueprints or state support, they engineered dry stone agricultural terraces that retain moisture through the dry months to this day. Each wall arose through communal workdays where a spoken vow weighed more than any land deed."}
                </p>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="block font-display font-black text-2xl text-[#ff5c1a]">1898</span>
                    <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">{lang === "es" ? "Año de fundación" : "Foundation year"}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="block font-display font-black text-2xl text-white">3.120 m</span>
                    <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">{lang === "es" ? "Altitud media" : "Mean altitude"}</span>
                  </div>
                </div>
              </div>

              {/* Visual Archival Asset with Lightbox Trigger */}
              <div className="relative group rounded-3xl overflow-hidden border border-white/15 bg-white/5 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
                  alt="Valle original en la cordillera"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#ff8c5a] uppercase font-bold tracking-widest">ARCHIVO FOTOGRÁFICO #01</span>
                    <p className="text-xs text-white/90 font-bold mt-1">Los primeros senderos del valle alto, 1904</p>
                  </div>
                  <button
                    onClick={() => setLightboxImage({
                      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
                      caption: lang === "es" ? "Los primeros senderos del valle alto, archivo comunal 1904." : "The early high valley pathways, communal archive 1904."
                    })}
                    className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-[#ff5c1a] transition-colors"
                    title="Ampliar fotografía"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Scene Footer navigation */}
            <div className="max-w-6xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/10">
              <button onClick={() => setCurrentScene(1)} className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white/60 hover:text-white">
                <ChevronLeft size={16} /> {lang === "es" ? "Escena anterior" : "Previous scene"}
              </button>
              <button onClick={() => setCurrentScene(3)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#ff5c1a] text-xs font-bold text-white hover:bg-[#ff7a3d]">
                <span>{lang === "es" ? "Continuar a Las Voces" : "Continue to The Voices"}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* ESCENA 3: LAS VOCES DEL PASADO (INTERACTIVE AUDIO ARCHIVE) */}
        {currentScene === 3 && (
          <section className="relative min-h-[calc(100vh-64px)] p-6 sm:p-14 lg:p-20 flex flex-col justify-between">
            <div className="max-w-6xl mx-auto w-full">
              <div className="max-w-3xl mb-12">
                <span className="font-mono text-xs font-extrabold tracking-[0.2em] text-[#ff8c5a] uppercase">
                  03 / {lang === "es" ? "ARCHIVO HISTÓRICO INTERACTIVO" : "INTERACTIVE HISTORICAL ARCHIVE"}
                </span>
                <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95] mt-4">
                  {lang === "es" ? "Las voces del pasado." : "The voices of the past."}
                </h2>
                <p className="mt-4 text-base text-white/70 leading-relaxed font-serif">
                  {lang === "es"
                    ? "La memoria no está en los papeles oficiales; habita en el timbre de quienes vivieron la transformación. Selecciona un habitante para escuchar su testimonio y consultar su ficha histórica."
                    : "Memory does not reside in official papers; it lives in the timbre of those who endured the transformation. Select a resident to hear their testimony and inspect their archive file."}
                </p>
              </div>

              {/* 4 Portrait Cards Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {voicesData.map((voice) => {
                  const isPlaying = playingVoiceId === voice.id;
                  return (
                    <article
                      key={voice.id}
                      className="group rounded-2xl bg-white/5 border border-white/10 hover:border-[#ff5c1a]/50 p-5 flex flex-col justify-between transition-all hover:bg-white/[0.08]"
                    >
                      <div>
                        {/* Portrait Image with Lightbox button */}
                        <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-black/40 mb-4">
                          <img
                            src={voice.image}
                            alt={voice.name}
                            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                          />
                          <button
                            onClick={() => setLightboxImage({
                              src: voice.image,
                              caption: `${voice.name} (${voice.years}) · ${lang === "es" ? voice.role : voice.roleEn}`
                            })}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-[#ff5c1a] transition-colors"
                          >
                            <Maximize2 size={13} />
                          </button>

                          <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[9px] font-mono font-bold text-white/70">
                            {voice.years}
                          </div>
                        </div>

                        <h3 className="font-display font-bold text-lg text-white leading-tight">
                          {voice.name}
                        </h3>
                        <p className="font-mono text-[10px] text-[#ff8c5a] mt-1 font-semibold">
                          {lang === "es" ? voice.role : voice.roleEn}
                        </p>

                        <p className="mt-3 text-xs text-white/80 font-serif italic line-clamp-3 leading-relaxed">
                          «{lang === "es" ? voice.quote : voice.quoteEn}»
                        </p>
                      </div>

                      {/* Functional Audio Player Button */}
                      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                        <button
                          onClick={() => playVoice(voice.id)}
                          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                            isPlaying
                              ? "bg-[#ff5c1a] text-white shadow-md shadow-[#ff5c1a]/30"
                              : "bg-white/10 text-white hover:bg-white/20"
                          }`}
                        >
                          {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                          <span>{isPlaying ? (lang === "es" ? "Pausar audio" : "Pause") : (lang === "es" ? "Escuchar voz" : "Play voice")}</span>
                        </button>

                        <button
                          onClick={() => setActiveVoice(voice)}
                          className="text-[11px] font-mono text-white/50 hover:text-white underline decoration-white/30"
                        >
                          {lang === "es" ? "Ficha +" : "Details +"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Scene Footer navigation */}
            <div className="max-w-6xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/10">
              <button onClick={() => setCurrentScene(2)} className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white/60 hover:text-white">
                <ChevronLeft size={16} /> {lang === "es" ? "Escena anterior" : "Previous scene"}
              </button>
              <button onClick={() => setCurrentScene(4)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#ff5c1a] text-xs font-bold text-white hover:bg-[#ff7a3d]">
                <span>{lang === "es" ? "Continuar a El Cambio" : "Continue to The Change"}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* ESCENA 4: UN MUNDO QUE CAMBIA (INTERACTIVE BEFORE/AFTER SLIDER) */}
        {currentScene === 4 && (
          <section className="relative min-h-[calc(100vh-64px)] p-6 sm:p-14 lg:p-20 flex flex-col justify-between">
            <div className="max-w-5xl mx-auto w-full">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="font-mono text-xs font-extrabold tracking-[0.2em] text-[#ff8c5a] uppercase">
                  04 / {lang === "es" ? "COMPARATIVA TEMPORAL" : "TEMPORAL COMPARISON"}
                </span>
                <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95] mt-4">
                  {lang === "es" ? "Un mundo que cambia." : "A world in transition."}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-serif">
                  {lang === "es"
                    ? "Arrastra el control deslizante para comparar el valle en 1945 con su estado en 2026. La tecnología llegó, pero los muros de piedra permanecen."
                    : "Drag the split slider to compare the valley in 1945 with its 2026 reality. Technology arrived, yet the ancient stone walls endure."}
                </p>
              </div>

              {/* The Interactive Before/After Split Slider */}
              <div
                ref={sliderRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                className="relative select-none aspect-[16/9] w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/20 shadow-2xl cursor-ew-resize touch-none"
              >
                {/* Contemporary Image (2026) - Base layer */}
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85"
                  alt="Valle contemporáneo 2026"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-[1.05]"
                />
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full font-mono text-xs font-bold text-white border border-white/20">
                  {lang === "es" ? "2026 · VALLE ACTUAL" : "2026 · CONTEMPORARY"}
                </div>

                {/* Historic Image (1945) - Clipped Top Layer */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1600&q=85"
                    alt="Valle histórico 1945"
                    className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-[1.3] brightness-90"
                    style={{ width: sliderRef.current?.offsetWidth || "100%", maxWidth: "none" }}
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full font-mono text-xs font-bold text-[#ff8c5a] border border-[#ff5c1a]/40">
                    {lang === "es" ? "1945 · ARCHIVO HISTÓRICO" : "1945 · HISTORIC ARCHIVE"}
                  </div>
                </div>

                {/* Slider Handle Divider */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#ff5c1a] border-2 border-white text-white flex items-center justify-center shadow-xl">
                    <div className="flex items-center gap-0.5 text-xs font-black">
                      <span>‹</span>
                      <span>›</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="font-mono text-xs text-white/50 tracking-wider">
                  ↔ {lang === "es" ? "Arrastra hacia los lados para revelar el cambio de época" : "Drag sideways to reveal the passage of time"}
                </span>
              </div>
            </div>

            {/* Scene Footer navigation */}
            <div className="max-w-5xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/10">
              <button onClick={() => setCurrentScene(3)} className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white/60 hover:text-white">
                <ChevronLeft size={16} /> {lang === "es" ? "Escena anterior" : "Previous scene"}
              </button>
              <button onClick={() => setCurrentScene(5)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#ff5c1a] text-xs font-bold text-white hover:bg-[#ff7a3d]">
                <span>{lang === "es" ? "Continuar al Mapa" : "Continue to The Map"}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* ESCENA 5: EL MAPA DE LOS RECUERDOS (INTERACTIVE ILLUSTRATED MAP) */}
        {currentScene === 5 && (
          <section className="relative min-h-[calc(100vh-64px)] p-6 sm:p-14 lg:p-20 flex flex-col justify-between">
            <div className="max-w-6xl mx-auto w-full">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="font-mono text-xs font-extrabold tracking-[0.2em] text-[#ff8c5a] uppercase">
                    05 / {lang === "es" ? "GEOGRAFÍA DE LOS RECUERDOS" : "GEOGRAPHY OF MEMORIES"}
                  </span>
                  <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase leading-[0.95] mt-2">
                    {lang === "es" ? "El mapa interactivo del valle." : "The interactive valley map."}
                  </h2>
                </div>
                <p className="font-mono text-xs text-white/50 tracking-widest uppercase">
                  {lang === "es" ? "HAZ CLIC EN LOS PUNTOS DE INTERÉS" : "CLICK LANDMARK PINS TO REVEAL STORIES"}
                </p>
              </div>

              {/* Illustrated Map Canvas */}
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[#0d141f] border border-white/15 shadow-2xl p-4">
                {/* Topographic Lines Background Vector */}
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 100 Q 300 40 600 120 T 1200 90" fill="none" stroke="#ff5c1a" strokeWidth="1.5" />
                  <path d="M 0 200 Q 350 140 700 240 T 1400 180" fill="none" stroke="#ffffff" strokeWidth="1" />
                  <path d="M 0 350 Q 400 280 800 390 T 1600 320" fill="none" stroke="#ffffff" strokeWidth="1" />
                  <path d="M 0 500 Q 500 400 900 520 T 1800 460" fill="none" stroke="#ff5c1a" strokeWidth="1.5" />
                  {/* River representation */}
                  <path d="M 200 0 Q 300 300 500 500 T 900 900" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.6" />
                </svg>

                {/* Satellite textured background */}
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=70"
                  alt="Relieve del valle"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.25] contrast-[1.2]"
                />

                {/* 4 Landmark Interactive Pins */}
                {landmarksData.map((lm) => {
                  const isSelected = activeLandmark?.id === lm.id;
                  return (
                    <button
                      key={lm.id}
                      onClick={() => setActiveLandmark(lm)}
                      style={{ left: `${lm.x}%`, top: `${lm.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 transition-all ${
                        isSelected ? "scale-125 z-30" : "hover:scale-110"
                      }`}
                    >
                      <div className="relative flex items-center justify-center">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                          isSelected ? "bg-[#ff5c1a] text-white" : "bg-white text-black group-hover:bg-[#ff8c5a] group-hover:text-white"
                        }`}>
                          <MapPin size={16} />
                        </span>
                        <span className="absolute -top-6 whitespace-nowrap px-2 py-0.5 rounded bg-black/80 border border-white/20 font-mono text-[10px] font-bold text-white">
                          {lang === "es" ? lm.name : lm.nameEn}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* Active Landmark Story Modal/Drawer */}
                {activeLandmark && (
                  <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md bg-[#070a0e]/95 backdrop-blur-xl border border-[#ff5c1a]/40 rounded-2xl p-5 shadow-2xl z-30 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-[10px] text-[#ff8c5a] font-bold uppercase tracking-widest">
                          {activeLandmark.year} · {lang === "es" ? "PUNTO PATRIMONIAL" : "HERITAGE SITE"}
                        </span>
                        <h4 className="font-display font-black text-xl text-white mt-1">
                          {lang === "es" ? activeLandmark.name : activeLandmark.nameEn}
                        </h4>
                      </div>
                      <button
                        onClick={() => setActiveLandmark(null)}
                        className="p-1.5 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    <div className="mt-3 rounded-xl overflow-hidden aspect-[16/9] border border-white/10">
                      <img
                        src={activeLandmark.image}
                        alt={activeLandmark.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed font-serif">
                      {lang === "es" ? activeLandmark.story : activeLandmark.storyEn}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => setLightboxImage({
                          src: activeLandmark.image,
                          caption: `${activeLandmark.name} (${activeLandmark.year})`
                        })}
                        className="font-mono text-[10px] text-[#ff8c5a] font-bold uppercase hover:underline"
                      >
                        {lang === "es" ? "AMPLIAR FOTOGRAFÍA +" : "ENLARGE PHOTO +"}
                      </button>
                      <button
                        onClick={() => setActiveLandmark(null)}
                        className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold text-white hover:bg-white/20"
                      >
                        {lang === "es" ? "Cerrar" : "Close"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Scene Footer navigation */}
            <div className="max-w-6xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/10">
              <button onClick={() => setCurrentScene(4)} className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white/60 hover:text-white">
                <ChevronLeft size={16} /> {lang === "es" ? "Escena anterior" : "Previous scene"}
              </button>
              <button onClick={() => setCurrentScene(6)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#ff5c1a] text-xs font-bold text-white hover:bg-[#ff7a3d]">
                <span>{lang === "es" ? "Continuar a El Legado" : "Continue to The Legacy"}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* ESCENA 6: EL LEGADO (CONCLUSION & CREDITS) */}
        {currentScene === 6 && (
          <section className="relative min-h-[calc(100vh-64px)] p-6 sm:p-14 lg:p-20 flex flex-col justify-between overflow-hidden">
            <div className="max-w-4xl mx-auto w-full text-center py-10">
              <span className="font-mono text-xs font-extrabold tracking-[0.24em] text-[#ff8c5a] uppercase">
                06 / {lang === "es" ? "CONCLUSIÓN DOCUMENTAL" : "DOCUMENTARY CONCLUSION"}
              </span>

              <h2 className="font-display font-black text-5xl sm:text-7xl text-white tracking-tight uppercase leading-[0.92] mt-5">
                {lang === "es" ? "La tierra recuerda lo que los hombres construyen." : "The earth remembers what humankind builds."}
              </h2>

              <p className="mt-8 text-lg sm:text-xl text-white/80 font-serif italic max-w-2xl mx-auto leading-relaxed">
                «{lang === "es"
                  ? "Las tecnologías cambian, los senderos se asfaltan y los idiomas incorporan nuevas palabras. Pero mientras haya alguien dispuesto a escuchar, el alma de los valles seguirá latiendo en cada piedra."
                  : "Technologies shift, trails turn into pavement, and tongues adopt fresh words. Yet so long as one ear remains willing to listen, the valley's spirit will pulse in every stone."}»
              </p>

              {/* Fictional Production Credits Card */}
              <div className="mt-14 max-w-xl mx-auto rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 text-left">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#ff8c5a]">
                  FICHA TÉCNICA · PRODUCCIÓN AUTOMATA
                </span>

                <div className="mt-4 grid grid-cols-2 gap-4 font-mono text-xs text-white/70">
                  <div>
                    <span className="block text-white/40 uppercase text-[9px]">{lang === "es" ? "DIRECCIÓN Y NARRATIVA" : "DIRECTION & NARRATIVE"}</span>
                    <strong className="text-white font-bold">AUTOMATA STUDIO</strong>
                  </div>
                  <div>
                    <span className="block text-white/40 uppercase text-[9px]">{lang === "es" ? "FORMATO DIGITAL" : "DIGITAL FORMAT"}</span>
                    <strong className="text-white font-bold">Documental Web Interactivo</strong>
                  </div>
                  <div>
                    <span className="block text-white/40 uppercase text-[9px]">{lang === "es" ? "AMBIENTACIÓN SONORA" : "SOUND DESIGN"}</span>
                    <strong className="text-white font-bold">Web Audio Generativo</strong>
                  </div>
                  <div>
                    <span className="block text-white/40 uppercase text-[9px]">{lang === "es" ? "TECNOLOGÍAS" : "TECHNOLOGIES"}</span>
                    <strong className="text-white font-bold">React · WebGL · SVG Topo</strong>
                  </div>
                </div>
              </div>

              {/* Reset action button */}
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setCurrentScene(1)}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#ff5c1a] text-white text-sm font-extrabold shadow-xl hover:bg-[#ff7a3d] transition-all"
                >
                  <RotateCcw size={16} />
                  <span>{lang === "es" ? "VOLVER A COMENZAR LA HISTORIA" : "RESTART THE STORY"}</span>
                </button>

                {onClose ? (
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-colors"
                  >
                    <span>{lang === "es" ? "Salir a Proyectos" : "Exit to Projects"}</span>
                  </button>
                ) : (
                  <a
                    href="/#proyectos"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-colors"
                  >
                    <span>{lang === "es" ? "Salir a Proyectos" : "Exit to Projects"}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Scene Footer navigation */}
            <div className="max-w-4xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/10 font-mono text-[11px] text-white/50 tracking-widest uppercase">
              <span>AUTOMATA · DIGITAL EXPERIENCES</span>
              <span>TARIJA / BOLIVIA · 2026</span>
            </div>
          </section>
        )}
      </main>

      {/* ─── Lightbox Modal for Photo Enlargement ─── */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#ff5c1a] transition-colors"
          >
            <X size={20} />
          </button>
          <img
            src={lightboxImage.src}
            alt="Ampliación fotográfica"
            className="max-h-[82vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl border border-white/10"
          />
          <p className="mt-4 font-mono text-xs sm:text-sm text-white/80 text-center max-w-xl">
            {lightboxImage.caption}
          </p>
        </div>
      )}

      {/* ─── Resident Bio Modal ─── */}
      {activeVoice && (
        <div
          onClick={() => setActiveVoice(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-[#0d121c] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            <button
              onClick={() => setActiveVoice(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={activeVoice.image}
                alt={activeVoice.name}
                className="w-16 h-16 rounded-full object-cover filter grayscale border-2 border-[#ff5c1a]"
              />
              <div>
                <span className="font-mono text-[10px] text-[#ff8c5a] font-bold tracking-widest uppercase">
                  {activeVoice.years}
                </span>
                <h3 className="font-display font-black text-xl text-white">
                  {activeVoice.name}
                </h3>
                <p className="font-mono text-xs text-white/60">
                  {lang === "es" ? activeVoice.role : activeVoice.roleEn}
                </p>
              </div>
            </div>

            <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10 font-serif italic text-white/90 text-sm">
              «{lang === "es" ? activeVoice.quote : activeVoice.quoteEn}»
            </div>

            <p className="mt-5 text-sm text-white/70 leading-relaxed">
              {lang === "es" ? activeVoice.bio : activeVoice.bioEn}
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => {
                  playVoice(activeVoice.id);
                  setActiveVoice(null);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff5c1a] text-white text-xs font-bold"
              >
                <Play size={13} />
                <span>{lang === "es" ? "Reproducir testimonio de audio" : "Play audio testimony"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

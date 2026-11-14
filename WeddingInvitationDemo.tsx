import React, { useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  Heart,
  MapPin,
  Sparkles,
  Users,
  ArrowLeft,
  X,
  Share2,
  CalendarCheck
} from "lucide-react";

export default function WeddingInvitationDemo({ onClose }: { onClose?: () => void }) {
  const [attendance, setAttendance] = useState<"yes" | "no" | "">("");
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [dietary, setDietary] = useState("none");
  const [submitted, setSubmitted] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(142);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!attendance || !guestName.trim()) return;
    setSubmitted(true);
    if (attendance === "yes") {
      setAttendeeCount(prev => prev + parseInt(guestCount, 10));
    }
  };

  return (
    <div className="min-h-screen bg-[#070a0e] text-[#f0ede8] px-4 py-6 sm:py-10 font-sans selection:bg-[#e9c99f] selection:text-[#070a0e]">
      {/* ─── Top Bar with Return Button ─── */}
      <header className="mx-auto max-w-[820px] mb-6 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        {onClose ? (
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-xs font-bold text-white hover:bg-[#e9c99f] hover:text-[#070a0e] transition-colors"
          >
            <ArrowLeft size={15} />
            <span>Volver a Proyectos</span>
          </button>
        ) : (
          <a
            href="/#proyectos"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-xs font-bold text-white hover:bg-[#e9c99f] hover:text-[#070a0e] transition-colors"
          >
            <ArrowLeft size={15} />
            <span>Volver a Proyectos</span>
          </a>
        )}

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#e9c99f] bg-[#e9c99f]/10 border border-[#e9c99f]/30 px-3 py-1 rounded-full">
            EXPERIENCIAS INTERACTIVAS · RSVP
          </span>
        </div>
      </header>

      {/* ─── Invitation Luxury Card (Black & Gold) ─── */}
      <article className="mx-auto max-w-[820px] overflow-hidden rounded-[32px] border border-[#e9c99f]/30 bg-[#0d121c] shadow-[0_24px_80px_rgba(0,0,0,0.6)]">

        {/* ─── PORTADA HERO: Video cinematográfico a pantalla completa con texto superpuesto ─── */}
        <section className="relative overflow-hidden" style={{ minHeight: "90svh" }}>
          {/* Video de fondo full-cover */}
          <video
            src="/DEMO_fast.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover block"
            style={{ objectPosition: "center top" }}
          />

          {/* Capas de oscurecimiento elegantes para leer el texto */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070a0e] via-[#070a0e]/40 to-[#070a0e]/20" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070a0e]/60 to-transparent" />

          {/* Contenido superpuesto sobre el video */}
          <div className="relative z-10 flex flex-col items-center justify-end text-center px-6 sm:px-14 pb-16 pt-24" style={{ minHeight: "90svh" }}>
            {/* Emblema dorado */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#e9c99f]/60 bg-[#e9c99f]/10 text-[#f1c995] shadow-lg shadow-[#e9c99f]/20 mb-6">
              <Heart size={20} />
            </div>

            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.36em] text-[#e9c99f] mb-3">
              NOS HACE MUCHA ILUSIÓN INVITARTE
            </p>

            <p className="font-serif text-xl italic text-white/80 mb-3">
              Celebramos nuestro matrimonio
            </p>

            <h1 className="font-serif text-6xl sm:text-8xl lg:text-9xl leading-none tracking-tight text-white drop-shadow-xl">
              Camila <span className="text-[#e9c99f] font-sans font-light">&amp;</span> Gabriel
            </h1>

            <div className="mx-auto mt-6 h-px w-28 bg-gradient-to-r from-transparent via-[#e9c99f] to-transparent" />

            <p className="mt-5 font-mono text-sm uppercase tracking-[0.28em] text-white/80">
              Sábado · 22 de Mayo de 2027
            </p>
          </div>
        </section>

        {/* Event Schedule & Details */}
        <section className="px-6 py-12 text-center sm:px-14 sm:py-16 border-b border-white/8">
          <Sparkles className="mx-auto text-[#e9c99f]" size={24} />
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-white">
            Un día especial, contigo.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-white/70 font-serif">
            Hay momentos que se vuelven eternos cuando los compartimos con las personas que amamos. Nos encantaría contar con tu presencia.
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <CalendarDays className="text-[#e9c99f]" size={22} />
              <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">Fecha</p>
              <p className="mt-1 text-base font-bold text-white">22 Mayo 2027</p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <Clock3 className="text-[#e9c99f]" size={22} />
              <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">Hora</p>
              <p className="mt-1 text-base font-bold text-white">16:30 hrs</p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <MapPin className="text-[#e9c99f]" size={22} />
              <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">Lugar</p>
              <p className="mt-1 text-base font-bold text-white">Jardín de Los Olivos</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-white/70">
              <CalendarCheck size={14} className="text-[#e9c99f]" />
              Dress Code: Formal Elegante
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-mono text-[11px] text-emerald-400 font-bold">
              ✓ {attendeeCount} personas confirmadas
            </span>
          </div>
        </section>

        {/* ─── Brindis: video ancho, impactante ─── */}
        <section className="relative overflow-hidden" style={{ minHeight: "60svh" }}>
          <video
            src="/DEMOb_fast.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover block"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070a0e] via-[#070a0e]/30 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#070a0e]/40 to-transparent" />
          <div className="relative z-10 flex flex-col items-center justify-end text-center px-6 pb-14 pt-24" style={{ minHeight: "60svh" }}>
            <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-[#e9c99f] to-transparent mb-6" />
            <p className="font-serif italic text-2xl sm:text-3xl text-white drop-shadow-lg">
              Brindis por el nuevo comienzo
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#e9c99f] mt-3">
              CÓCTEL · MÚSICA EN VIVO · CELEBRACIÓN
            </p>
          </div>
        </section>

        {/* RSVP Interactive Form */}
        <section className="border-t border-white/10 bg-[#090d14] px-6 py-12 sm:px-14 sm:py-16">
          <div className="mx-auto max-w-lg">
            <div className="text-center">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#e9c99f]">
                CONFIRMACIÓN DE ASISTENCIA
              </p>
              <h3 className="mt-3 font-serif text-3xl sm:text-4xl text-white">
                ¿Nos acompañas?
              </h3>
              <p className="mt-3 text-sm text-white/60">
                Por favor confirma antes del 15 de abril para coordinar cada detalle.
              </p>
            </div>

            {submitted ? (
              <div role="status" aria-live="polite" className="mt-8 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-8 text-center animate-in fade-in">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <Check size={24} />
                </span>
                <h4 className="mt-4 text-xl font-bold text-white">¡Respuesta registrada en tiempo real!</h4>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  {guestName.trim()}, {attendance === "yes"
                    ? "tu asistencia está confirmada para " + guestCount + (guestCount === "1" ? " persona." : " personas.")
                    : "hemos registrado que no podrás asistir. ¡Te recordaremos con mucho cariño!"}
                </p>
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono font-bold text-[#e9c99f] hover:underline"
                  >
                    Modificar mi respuesta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-8 space-y-6">
                <div>
                  <label className="block font-mono text-xs font-bold text-white/70 mb-2">
                    Nombre y Apellido
                  </label>
                  <input
                    required
                    maxLength={90}
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Escribe tu nombre completo"
                    className="w-full min-h-12 rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder-white/30 outline-none focus:border-[#e9c99f]"
                  />
                </div>

                <fieldset>
                  <legend className="block font-mono text-xs font-bold text-white/70 mb-3">
                    ¿Podrás acompañarnos?
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      aria-pressed={attendance === "yes"}
                      onClick={() => setAttendance("yes")}
                      className={`min-h-12 rounded-xl border font-bold text-sm transition-all ${
                        attendance === "yes"
                          ? "border-[#e9c99f] bg-[#e9c99f] text-[#070a0e] shadow-lg shadow-[#e9c99f]/20"
                          : "border-white/15 bg-white/5 text-white/80 hover:border-white/30"
                      }`}
                    >
                      ✓ Sí, ahí estaré
                    </button>
                    <button
                      type="button"
                      aria-pressed={attendance === "no"}
                      onClick={() => setAttendance("no")}
                      className={`min-h-12 rounded-xl border font-bold text-sm transition-all ${
                        attendance === "no"
                          ? "border-red-500/60 bg-red-950/40 text-red-200"
                          : "border-white/15 bg-white/5 text-white/80 hover:border-white/30"
                      }`}
                    >
                      ✗ No podré asistir
                    </button>
                  </div>
                </fieldset>

                {attendance === "yes" && (
                  <div className="space-y-4 animate-in fade-in">
                    <div>
                      <label className="block font-mono text-xs font-bold text-white/70 mb-2">
                        <span className="flex items-center gap-2">
                          <Users size={14} className="text-[#e9c99f]" />
                          Cantidad de personas (incluyéndote)
                        </span>
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full min-h-12 rounded-xl border border-white/15 bg-[#121824] px-4 text-sm text-white outline-none focus:border-[#e9c99f]"
                      >
                        <option value="1">1 persona</option>
                        <option value="2">2 personas</option>
                        <option value="3">3 personas</option>
                        <option value="4">4 personas</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold text-white/70 mb-2">
                        Requerimientos dietéticos o alergias (opcional)
                      </label>
                      <select
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        className="w-full min-h-12 rounded-xl border border-white/15 bg-[#121824] px-4 text-sm text-white outline-none focus:border-[#e9c99f]"
                      >
                        <option value="none">Sin restricciones alimentarias</option>
                        <option value="veg">Opción vegetariana / vegana</option>
                        <option value="celiac">Celíaco / Libre de gluten</option>
                        <option value="other">Otra alergia o condición</option>
                      </select>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!attendance || !guestName.trim()}
                  className="w-full min-h-13 rounded-full bg-[#e9c99f] px-6 py-4 text-sm font-extrabold text-[#070a0e] shadow-xl transition-all hover:bg-[#f1d7b3] hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Confirmar mi respuesta
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#070a0e] px-6 py-8 text-center text-white border-t border-white/10">
          <p className="font-serif text-xl italic text-[#e9c99f]">
            Con todo nuestro cariño, Camila &amp; Gabriel
          </p>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
            DEMO INTERACTIVA · AUTOMATA EXPERIENCES
          </p>
        </footer>
      </article>

      {/* Foot notes */}
      <div className="mx-auto max-w-[820px] mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/50">
        <span>AUTOMATA EXPERIENCES · EXPERIENCIAS DIGITALES PARA EVENTOS</span>
        {onClose && (
          <button onClick={onClose} className="text-[#e9c99f] hover:underline">
            Volver a la web principal ↑
          </button>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { CalendarDays, Check, Clock3, Heart, MapPin, Sparkles, Users } from "lucide-react";
import "./index.css";

function InvitationDemo() {
  const [attendance, setAttendance] = useState<"yes" | "no" | "">("");
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!attendance || !guestName.trim()) return;
    setSubmitted(true);
  };

  return <main className="min-h-screen bg-[#F4F3F0] px-4 py-8 text-[#0E1116] sm:py-14">
    <div className="mx-auto max-w-[760px]">
      <div className="mb-5 flex items-center justify-between gap-3">
        <a href="/experiences/" className="text-xs font-extrabold tracking-[.14em] text-[#0E1116]">AUTOMATA<span className="text-[#FF5A00]">.</span> EXPERIENCES</a>
        <span className="rounded-full border border-[#E4DED6] bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#A34A1B]">Demo interactiva</span>
      </div>

      <article className="overflow-hidden rounded-[30px] border border-[#E8E2DA] bg-[#FFFCF8] shadow-[0_24px_80px_rgba(38,30,20,.10)]">
        <section className="relative overflow-hidden bg-[#24352F] px-6 py-14 text-center text-white sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full border border-white/10"/>
          <div className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full border border-[#E9B77B]/30"/>
          <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#E9B77B]/60 text-[#F1C995]"><Heart size={20}/></div>
          <p className="relative mt-7 text-[10px] font-bold uppercase tracking-[.32em] text-[#E9C99F]">Nos hace mucha ilusión invitarte</p>
          <p className="relative mt-5 font-serif text-xl italic text-white/80">Celebramos nuestro amor</p>
          <h1 className="relative mt-4 font-serif text-5xl leading-none tracking-tight sm:text-7xl">Camila <span className="text-[#E9C99F]">&</span> Gabriel</h1>
          <div className="relative mx-auto mt-8 h-px w-20 bg-[#E9C99F]/70"/>
          <p className="relative mt-7 text-xs uppercase tracking-[.24em] text-white/75">Sábado · 22 de mayo · 2027</p>
        </section>

        <section className="px-6 py-10 text-center sm:px-14 sm:py-14">
          <Sparkles className="mx-auto text-[#B77C46]" size={22}/>
          <h2 className="mt-4 font-serif text-3xl text-[#34443C] sm:text-4xl">Un día especial, contigo.</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#6F716B]">Hay momentos que se vuelven inolvidables cuando los compartimos con las personas que queremos. Nos encantaría que formes parte de este día.</p>

          <div className="mx-auto mt-9 grid max-w-xl gap-3 text-left sm:grid-cols-3">
            <div className="rounded-2xl bg-[#F4F0E9] p-4"><CalendarDays className="text-[#A66B3F]" size={19}/><p className="mt-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#8B8175]">Fecha</p><p className="mt-1 text-sm font-bold">22 mayo 2027</p></div>
            <div className="rounded-2xl bg-[#F4F0E9] p-4"><Clock3 className="text-[#A66B3F]" size={19}/><p className="mt-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#8B8175]">Hora</p><p className="mt-1 text-sm font-bold">16:30</p></div>
            <div className="rounded-2xl bg-[#F4F0E9] p-4"><MapPin className="text-[#A66B3F]" size={19}/><p className="mt-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#8B8175]">Lugar</p><p className="mt-1 text-sm font-bold">Jardín de eventos</p></div>
          </div>
          <p className="mx-auto mt-5 max-w-lg text-xs leading-6 text-[#8B8175]">La ubicación y los datos son ilustrativos. En un proyecto real se personalizan para cada celebración.</p>
        </section>

        <section className="border-t border-[#E8E2DA] bg-white px-6 py-10 sm:px-14 sm:py-12">
          <div className="mx-auto max-w-lg">
            <div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#B77C46]">Confirmación de asistencia</p><h2 className="mt-3 font-serif text-3xl text-[#34443C]">¿Nos acompañas?</h2><p className="mt-3 text-sm text-[#77766F]">Confirma tu respuesta en esta demostración.</p></div>
            {submitted ? <div role="status" aria-live="polite" className="mt-8 rounded-2xl border border-[#D9E6D9] bg-[#F2F7F0] p-6 text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#DCEBDD] text-[#426B4B]"><Check size={22}/></span>
              <h3 className="mt-4 text-lg font-bold text-[#34443C]">¡Respuesta registrada en la demo!</h3>
              <p className="mt-2 text-sm leading-6 text-[#667366]">{guestName.trim()}, {attendance === "yes" ? "tu asistencia está marcada como confirmada" : "tu respuesta quedó marcada como no asistencia"}{attendance === "yes" ? " para " + guestCount + (guestCount === "1" ? " persona." : " personas.") : "."}</p>
              <p className="mt-4 text-[11px] leading-5 text-[#7D897D]">Esta confirmación solo vive en esta pantalla. No se envió ni guardó en un servidor.</p>
              <button type="button" onClick={() => setSubmitted(false)} className="mt-5 text-xs font-bold text-[#A45D2C] underline underline-offset-4">Editar respuesta</button>
            </div> : <form onSubmit={submit} className="mt-8 space-y-5">
              <label className="block">Nombre y apellido<input required maxLength={90} value={guestName} onChange={e=>setGuestName(e.target.value)} placeholder="Escribe tu nombre" className="mt-2"/></label>
              <fieldset><legend className="mb-3 text-xs font-bold">¿Podrás acompañarnos?</legend><div className="grid grid-cols-2 gap-3">
                <button type="button" aria-pressed={attendance==="yes"} onClick={()=>setAttendance("yes")} className={`min-h-12 rounded-xl border text-sm font-bold transition ${attendance==="yes"?"border-[#34443C] bg-[#34443C] text-white":"border-[#E8E2DA] bg-white text-[#555B53] hover:border-[#A66B3F]"}`}>Sí, ahí estaré</button>
                <button type="button" aria-pressed={attendance==="no"} onClick={()=>setAttendance("no")} className={`min-h-12 rounded-xl border text-sm font-bold transition ${attendance==="no"?"border-[#34443C] bg-[#34443C] text-white":"border-[#E8E2DA] bg-white text-[#555B53] hover:border-[#A66B3F]"}`}>No podré asistir</button>
              </div></fieldset>
              {attendance==="yes" && <label className="block"><span className="flex items-center gap-2"><Users size={15}/> Cantidad de personas, incluyéndote</span><select value={guestCount} onChange={e=>setGuestCount(e.target.value)} className="mt-2"><option value="1">1 persona</option><option value="2">2 personas</option><option value="3">3 personas</option><option value="4">4 personas</option></select></label>}
              <button type="submit" disabled={!attendance || !guestName.trim()} className="min-h-13 w-full rounded-full bg-[#B77C46] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#965D32] disabled:cursor-not-allowed disabled:opacity-40">Confirmar respuesta</button>
            </form>}
          </div>
        </section>
        <footer className="bg-[#24352F] px-6 py-7 text-center text-white">
          <p className="font-serif text-xl italic text-[#E9C99F]">Con cariño, Camila & Gabriel</p>
          <p className="mt-3 text-[9px] uppercase tracking-[.2em] text-white/45">Experiencia conceptual · AUTOMATA Experiences</p>
        </footer>
      </article>
      <div className="mt-5 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="text-[10px] leading-5 text-[#89877F]">Demo de interfaz. No recopila datos ni envía confirmaciones reales.</p>
        <a href="/experiences/" className="text-xs font-bold text-[#A45D2C] hover:underline">Volver a AUTOMATA Experiences ↗</a>
      </div>
    </div>
  </main>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><InvitationDemo/></React.StrictMode>);

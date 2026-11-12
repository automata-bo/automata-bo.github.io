import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, Clapperboard, Copy, Film, Lightbulb, Sparkles } from "lucide-react";
import "./index.css";

type Goal = "awareness" | "consideration" | "conversion";
type Format = "reel" | "spot" | "story";
const goalLabels: Record<Goal,string> = { awareness:"Dar a conocer", consideration:"Explicar el valor", conversion:"Motivar una consulta o compra" };
const formatLabels: Record<Format,string> = { reel:"Reel vertical · 20–30 s", spot:"Spot audiovisual · 30–45 s", story:"Secuencia de stories · 3 piezas" };
const structures: Record<Goal,{hook:string;idea:string;cta:string}> = {
 awareness:{hook:"Una imagen que detiene el scroll y despierta curiosidad.",idea:"Presentar el producto en una situación visual inesperada. Revelar la marca después de captar la atención.",cta:"Descubre la propuesta"},
 consideration:{hook:"Una pregunta concreta que conecta con una necesidad cotidiana.",idea:"Mostrar el problema, presentar el producto como alternativa y enseñar un detalle que explique su valor.",cta:"Conoce cómo funciona"},
 conversion:{hook:"Una invitación directa centrada en el beneficio principal.",idea:"Mostrar el producto en uso, resolver una duda frecuente y cerrar con una acción sencilla y específica.",cta:"Escríbenos para conocer más"}
};
const audiences: Record<string,string> = {
 general:"personas que todavía no conocen la marca",
 local:"personas de la comunidad y el entorno local",
 premium:"un público que valora el detalle, el diseño y la calidad",
 young:"un público joven que consume contenido móvil y dinámico"
};
function StudioDemo(){
 const [brand,setBrand]=useState("");
 const [audience,setAudience]=useState("local");
 const [goal,setGoal]=useState<Goal>("awareness");
 const [format,setFormat]=useState<Format>("reel");
 const [detail,setDetail]=useState("");
 const [result,setResult]=useState(false);
 const [copied,setCopied]=useState(false);
 const concept=useMemo(()=>{
  const s=structures[goal];
  const name=brand.trim()||"la marca";
  const product=detail.trim()||"su producto o servicio";
  const shots=format==="story"
   ? ["Pieza 1 · Intriga: una pregunta visual o frase breve que conecte con el público.","Pieza 2 · Valor: mostrar "+product+" en contexto y explicar un beneficio concreto.","Pieza 3 · Acción: resolver una objeción y cerrar con «"+s.cta+"»."]
   : format==="spot"
   ? ["0–5 s · Apertura: "+s.hook,"5–18 s · Desarrollo: "+s.idea,"18–35 s · Detalle: planos cercanos de "+product+" y una prueba visual del beneficio.","35–45 s · Cierre: marca "+name+" y llamada a la acción: «"+s.cta+"»."]
   : ["0–3 s · Gancho: "+s.hook,"3–12 s · Desarrollo: "+s.idea,"12–22 s · Producto: plano protagonista de "+product+".","22–30 s · Cierre: "+name+" · «"+s.cta+"»."];
  return {name,product,shots,s};
 },[brand,detail,format,goal]);
 const brief=["CONCEPTO CREATIVO · "+concept.name,"Objetivo: "+goalLabels[goal],"Formato: "+formatLabels[format],"Público: "+audiences[audience],"Producto/servicio: "+concept.product,"\nIDEA CENTRAL\n"+concept.s.idea,"\nSECUENCIA\n"+concept.shots.map((x,i)=>(i+1)+". "+x).join("\n"),"\nCTA\n"+concept.s.cta,"\nNota: concepto preliminar generado por reglas de demostración. Requiere dirección creativa, validación de marca y producción."].join("\n");
 const copy=async()=>{try{await navigator.clipboard.writeText(brief);setCopied(true);window.setTimeout(()=>setCopied(false),1800);}catch{setCopied(false);}};
 return <main className="min-h-screen bg-[#F3F2EF] px-4 py-8 text-[#0E1116] sm:py-12"><div className="mx-auto max-w-5xl">
  <div className="flex flex-wrap items-center justify-between gap-3"><a href="/studio/" className="inline-flex items-center gap-2 text-xs font-bold text-[#5A6068] hover:text-[#FF5A00]"><ArrowLeft size={15}/> AUTOMATA STUDIO</a><span className="rounded-full border border-[#E1DDD6] bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#A34A1B]">Prototipo interactivo</span></div>
  <section className="mt-7 overflow-hidden rounded-[30px] bg-[#0E1116] text-white"><div className="grid gap-8 p-7 sm:p-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#FF7A36]"><Clapperboard size={16}/> STUDIO · CREATIVE LAB</p><h1 className="display mt-5 text-5xl leading-[.98] sm:text-7xl">De una idea a una historia.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-white/65">Explora cómo una necesidad de comunicación puede convertirse en un concepto y una secuencia audiovisual. Ajusta el brief y construye una primera dirección creativa.</p></div><div className="rounded-2xl border border-white/10 bg-white/[.05] p-5"><Sparkles className="text-[#FF7A36]" size={24}/><p className="mt-4 text-sm font-bold">No es una plantilla de anuncios.</p><p className="mt-2 text-xs leading-6 text-white/55">Es una muestra del proceso de pensamiento creativo: objetivo, público, narrativa, formato y acción.</p></div></div></section>
  <div className="mt-6 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
   <form onSubmit={e=>{e.preventDefault();setResult(true);}} className="rounded-[26px] border border-[#E5E1DA] bg-white p-6 sm:p-8"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF1E8] text-[#FF5A00]"><Lightbulb size={20}/></span><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#A34A1B]">Construye el brief</p><p className="text-sm text-[#77766F]">Cuatro decisiones para empezar.</p></div></div>
    <label className="mt-7 block text-xs font-bold">Marca o negocio<input value={brand} onChange={e=>setBrand(e.target.value)} maxLength={70} placeholder="Ej. Café del Valle" className="mt-2 min-h-12 w-full rounded-xl border border-[#DAD8D2] px-4 text-sm font-normal outline-none focus:border-[#FF5A00]"/></label>
    <label className="mt-5 block text-xs font-bold">¿Qué producto o servicio comunicamos?<input value={detail} onChange={e=>setDetail(e.target.value)} maxLength={100} placeholder="Ej. café de especialidad" className="mt-2 min-h-12 w-full rounded-xl border border-[#DAD8D2] px-4 text-sm font-normal outline-none focus:border-[#FF5A00]"/></label>
    <label className="mt-5 block text-xs font-bold">Público principal<select value={audience} onChange={e=>setAudience(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#DAD8D2] bg-white px-4 text-sm font-normal"><option value="general">Personas que aún no conocen la marca</option><option value="local">Comunidad y público local</option><option value="premium">Público que valora calidad y diseño</option><option value="young">Público joven y móvil</option></select></label>
    <label className="mt-5 block text-xs font-bold">Objetivo<select value={goal} onChange={e=>setGoal(e.target.value as Goal)} className="mt-2 min-h-12 w-full rounded-xl border border-[#DAD8D2] bg-white px-4 text-sm font-normal"><option value="awareness">Dar a conocer</option><option value="consideration">Explicar el valor</option><option value="conversion">Motivar consulta o compra</option></select></label>
    <label className="mt-5 block text-xs font-bold">Formato<select value={format} onChange={e=>setFormat(e.target.value as Format)} className="mt-2 min-h-12 w-full rounded-xl border border-[#DAD8D2] bg-white px-4 text-sm font-normal"><option value="reel">Reel vertical · 20–30 s</option><option value="spot">Spot audiovisual · 30–45 s</option><option value="story">Secuencia de stories · 3 piezas</option></select></label>
    <button type="submit" className="mt-7 min-h-13 w-full rounded-full bg-[#FF5A00] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#E14E00]">Construir concepto <Film size={17} className="ml-2 inline"/></button>
   </form>
   <section className="rounded-[26px] border border-[#E5E1DA] bg-white p-6 sm:p-8"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#A34A1B]">Salida creativa</p><h2 className="display mt-2 text-3xl">Tu primera dirección.</h2></div><span className="rounded-full bg-[#F3F2EF] px-3 py-1 text-[10px] font-bold text-[#77766F]">Demo local</span></div>
    {!result?<div className="mt-8 flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#DAD8D2] px-7 text-center"><Clapperboard className="text-[#C1B9AE]" size={36}/><p className="mt-5 text-sm font-bold">La idea empieza con el contexto.</p><p className="mt-2 max-w-xs text-xs leading-6 text-[#77766F]">Completa el brief para ver una propuesta de concepto, estructura y llamada a la acción.</p></div>:<div className="mt-7"><div className="rounded-2xl bg-[#F4F0E9] p-5"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#A34A1B]">Idea central</p><p className="mt-3 text-sm font-semibold leading-6 text-[#34443C]">{concept.s.idea}</p><p className="mt-4 text-xs leading-5 text-[#77766F]">Para {audiences[audience]} · {formatLabels[format]}</p></div><h3 className="mt-7 text-xs font-bold uppercase tracking-[.15em] text-[#77766F]">Secuencia narrativa</h3><ol className="mt-4 space-y-3">{concept.shots.map((shot,i)=><li key={i} className="flex gap-3 text-sm leading-6"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0E1116] text-[11px] font-bold text-white">{i+1}</span><span>{shot}</span></li>)}</ol><div className="mt-6 rounded-2xl border border-[#E5E1DA] p-4"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#A34A1B]">Llamada a la acción</p><p className="mt-2 text-lg font-extrabold">{concept.s.cta}</p></div><button type="button" onClick={copy} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0E1116] px-5 text-sm font-bold text-white hover:bg-[#FF5A00]"><Copy size={16}/>{copied?"Brief copiado":"Copiar brief completo"}</button></div>}
    <p className="mt-6 text-[11px] leading-5 text-[#8A8F96]">Este prototipo usa estructuras predefinidas en el navegador. No llama a un modelo de IA, no genera video ni guarda los datos ingresados. La dirección final requiere criterio creativo y validación con la marca.</p>
   </section>
  </div><p className="mt-6 text-center text-[10px] uppercase tracking-[.16em] text-[#969188]">AUTOMATA · Digital Experiences & Intelligent Solutions</p>
 </div></main>
}
createRoot(document.getElementById("root")!).render(<React.StrictMode><StudioDemo/></React.StrictMode>);

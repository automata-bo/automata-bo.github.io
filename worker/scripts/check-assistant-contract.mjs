import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [worker, catalog, widget] = await Promise.all([
  readFile(new URL("../src/index.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/product-catalog.ts", import.meta.url), "utf8"),
  readFile(new URL("../../ChatWidget.tsx", import.meta.url), "utf8"),
]);

const start = worker.indexOf("const SYSTEM_INSTRUCTION");
const end = worker.indexOf("\n`.trim();", start);
assert.ok(start >= 0 && end > start, "System instruction must exist");
const prompt = worker.slice(start, end);

const contextIndex = prompt.indexOf("1. CONTEXTO:");
const needIndex = prompt.indexOf("2. NECESIDAD:");
const routeIndex = prompt.indexOf("3. ORIENTACIÓN:");
assert.ok(contextIndex >= 0 && needIndex > contextIndex && routeIndex > needIndex,
  "Assistant flow must be context → need → orientation");

for (const phrase of [
  "Haz una sola pregunta por turno",
  "Si una respuesta inicial ya contiene negocio/proyecto y necesidad",
  "pistas secundarias",
  "Admite personas sin negocio",
  "No reveles etiquetas internas",
]) {
  assert.ok(prompt.includes(phrase), "Missing discovery rule: " + phrase);
}

assert.ok(widget.includes("¿qué tipo de negocio o proyecto tienes?"),
  "Chat greeting must start with business/project context");
for (const example of [
  "Tengo un restaurante o cafetería",
  "Estoy organizando un evento o celebración",
  "Tengo una marca, proyecto o idea",
  "Otro contexto",
]) {
  assert.ok(widget.includes(example), "Missing context quick reply: " + example);
}
assert.ok(widget.includes('messages.length === 1 && <div className="automata-chat-quick"'),
  "Context quick replies must only appear at conversation start");

assert.ok(worker.includes("Object.values(PRODUCT_CATALOG)"),
  "Worker must build model knowledge from the shared catalog");
for (const field of [
  "product.suitableNeeds",
  "product.capabilities",
  "product.demo.status",
  "product.limitations",
  "product.prerequisites",
]) {
  assert.ok(worker.includes(field), "Catalog context is missing " + field);
}
assert.ok(worker.includes("Usa esta ficha como contexto secundario"),
  "Selected product must remain secondary context");

for (const id of [
  "web-presence",
  "digital-assistants",
  "business-automation",
  "event-experience",
  "audiovisual-production",
  "creative-campaigns",
]) {
  assert.ok(catalog.includes('"' + id + '"'), "Catalog entry missing: " + id);
}

console.log("Assistant contract checks passed.");
console.log("Note: static wiring checks only; not live LLM conversation tests.");

import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.ts";

const ORIGIN = "https://automata-bo.github.io";
const SESSION = "12345678-1234-4234-8234-123456789abc";

function makeEnv() {
  return {
    ALLOWED_ORIGIN: ORIGIN,
    GROQ_API_KEY: "test-provider-key",
    GROQ_MODEL: "test-model",
    SESSION_LIMITER: { limit: async () => ({ success: true }) },
    IP_LIMITER: { limit: async () => ({ success: true }) },
    DB: {},
  };
}

function makeRequest(body, { session = SESSION, origin = ORIGIN } = {}) {
  return new Request("https://automata-chat.test/api/chat", {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      "X-Chat-Session": session,
    },
    body: JSON.stringify(body),
  });
}

async function withProviderStub(run) {
  const originalFetch = globalThis.fetch;
  let providerRequest;
  globalThis.fetch = async (url, options) => {
    providerRequest = { url: String(url), options, body: JSON.parse(options.body) };
    return new Response(JSON.stringify({
      choices: [{ message: { content: "Respuesta simulada del proveedor." } }],
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  };
  try {
    return await run(() => providerRequest);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("chat runtime forwards the first business/project answer and shared catalog context", async () => {
  await withProviderStub(async (getProviderRequest) => {
    const response = await worker.fetch(makeRequest({
      source: "home",
      messages: [{ role: "user", text: "Tengo una cafetería" }],
    }), makeEnv());

    assert.equal(response.status, 200);
    assert.equal((await response.json()).answer, "Respuesta simulada del proveedor.");

    const provider = getProviderRequest();
    assert.ok(provider);
    const system = provider.body.messages[0].content;
    assert.match(system, /CONTEXTO: identifica qué tipo de negocio/);
    assert.match(system, /NECESIDAD: cuando conozcas el contexto/);
    assert.match(system, /ORIENTACIÓN: solo cuando tengas contexto/);
    assert.match(system, /Sitios y experiencias web/);
    assert.equal(provider.body.messages.at(-1).content, "Tengo una cafetería");
  });
});

test("selected product remains secondary to the visitor's stated need", async () => {
  await withProviderStub(async (getProviderRequest) => {
    const response = await worker.fetch(makeRequest({
      source: "digital",
      productId: "digital-assistants",
      action: "explore",
      messages: [{ role: "user", text: "Tengo una tienda y necesito una campaña para lanzar un producto." }],
    }), makeEnv());

    assert.equal(response.status, 200);
    const system = getProviderRequest().body.messages[0].content;
    assert.match(system, /Producto: Asistentes digitales/);
    assert.match(system, /Usa esta ficha como contexto secundario/);
    assert.match(system, /La necesidad es el criterio principal/);
    assert.equal(getProviderRequest().body.messages.at(-1).content,
      "Tengo una tienda y necesito una campaña para lanzar un producto.");
  });
});

test("conversation history is forwarded in order without repeating the greeting", async () => {
  await withProviderStub(async (getProviderRequest) => {
    const messages = [
      { role: "user", text: "Tengo un restaurante." },
      { role: "model", text: "¿Qué te gustaría mejorar?" },
      { role: "user", text: "Quiero ordenar las consultas por WhatsApp." },
    ];
    const response = await worker.fetch(makeRequest({ source: "home", messages }), makeEnv());

    assert.equal(response.status, 200);
    const forwarded = getProviderRequest().body.messages.slice(1);
    assert.deepEqual(forwarded.map((message) => [message.role, message.content]), [
      ["user", "Tengo un restaurante."],
      ["assistant", "¿Qué te gustaría mejorar?"],
      ["user", "Quiero ordenar las consultas por WhatsApp."],
    ]);
  });
});

test("invalid session is rejected before contacting an AI provider", async () => {
  await withProviderStub(async (getProviderRequest) => {
    const response = await worker.fetch(makeRequest({
      source: "home",
      messages: [{ role: "user", text: "Tengo un negocio." }],
    }, { session: "invalid" }), makeEnv());

    assert.equal(response.status, 400);
    assert.equal(getProviderRequest(), undefined);
  });
});

test("untrusted origins are rejected before contacting an AI provider", async () => {
  await withProviderStub(async (getProviderRequest) => {
    const response = await worker.fetch(makeRequest({
      source: "home",
      messages: [{ role: "user", text: "Tengo un negocio." }],
    }, { origin: "https://example.invalid" }), makeEnv());

    assert.equal(response.status, 403);
    assert.equal(getProviderRequest(), undefined);
  });
});

console.log("Runtime integration tests use a deterministic mocked AI provider; they do not measure live model behavior.");

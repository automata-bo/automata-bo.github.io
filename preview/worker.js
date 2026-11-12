const CHAT_ORIGIN = "https://automata-bo.github.io";
const CHAT_BACKEND = "https://automata-chat.dgckg-trd1.workers.dev";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Preview backend: only expose the assistant endpoint.
    if (url.pathname === "/api/chat") {
      if (request.method !== "POST" && request.method !== "OPTIONS") {
        return new Response("Method not allowed", { status: 405 });
      }
      const headers = new Headers(request.headers);
      headers.set("Origin", CHAT_ORIGIN);
      headers.set("Host", new URL(CHAT_BACKEND).host);
      const upstream = await fetch(new Request(new URL("/api/chat", CHAT_BACKEND), {
        method: request.method,
        headers,
        body: request.method === "POST" ? request.body : undefined,
        redirect: "manual"
      }));
      const responseHeaders = new Headers(upstream.headers);
      responseHeaders.delete("set-cookie");
      return new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: responseHeaders
      });
    }

    return env.ASSETS.fetch(request);
  }
};

const DEFAULT_API_URL = "https://automata-chat.dgckg-trd1.workers.dev";

export const AUTOMATA_API_URL = (
  import.meta.env.VITE_AUTOMATA_API_URL || DEFAULT_API_URL
).replace(/\/+$/, "");

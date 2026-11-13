const startAutomata = () => import("./v2-entry");

if (document.documentElement.dataset.introPending === "true") {
  document.addEventListener("intro:done", startAutomata, { once: true });
} else {
  startAutomata();
}

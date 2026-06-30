import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// ─── Service Worker Registration ─────────────────────────────────────────────
// Runs after the app has mounted so it never blocks GSAP / Lenis initialisation.
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js", { scope: "/" })
            .then((registration) => {
                console.log("[SW] Registered with scope:", registration.scope);
            })
            .catch((error) => {
                console.error("[SW] Registration failed:", error);
            });
    });
}

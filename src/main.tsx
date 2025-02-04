import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import LoadingFallback from "./components/LoadingFallback.tsx";

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </StrictMode>
);

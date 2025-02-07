import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// created a new element to inject into existing DOM
const sidebar = document.getElementById("sidebar");
const root = document.createElement("div");
root.id = "code-clock-root";
root.classList.add("roundbox");
root.classList.add("sidebox");
root.classList.add("borderTopRound");
sidebar?.prepend(root);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

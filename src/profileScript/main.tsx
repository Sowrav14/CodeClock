import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';

// created a new element to inject into existing DOM
const pageContent = document.getElementById("pageContent");
const root = document.createElement("div");
root.id = "code-clock-charts";
root.classList.add("roundbox");
root.classList.add("borderTopRound");
root.classList.add("borderBottomRound");
root.style.padding = "2em 1em 2em 1em";
root.style.marginTop = "1em";
pageContent?.append(root);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

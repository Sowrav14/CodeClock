import { useState } from "react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import NoteEditor from "./note";

export default function App() {
 const [open, setOpen] = useState<number>(0);

 return (
  <>
   <button
    onClick={() => setOpen((open + 1) % 3)}
    style={{
     position: "fixed",
     bottom: "20px",
     right: "20px",
     zIndex: 10000,
     background: "#007bff",
     color: "#fff",
     border: "none",
     borderRadius: "50%",
     width: "50px",
     height: "50px",
     fontSize: "24px",
     cursor: "pointer",
    }}
    title={open === 0 ? "Sketch" : open === 1 ? "Note" : "Close"}
   >
    {open === 0 ? "✏️" : open === 1 ? "📝" : "❌"}
   </button>

   {(open === 1 || open === 2) && (
    <div
     style={{
      position: "fixed",
      bottom: "0",
      right: "0",
      width: "1000px",
      height: "100%",
      zIndex: 9999,
      borderLeft: "1px solid #aaa",
      borderTop: "1px solid #aaa",
      boxShadow: "0 0 20px rgba(0,0,0,0.3)",
      background: "#fff",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
     }}
     onClick={(e) => e.stopPropagation()}
    >
     {open === 1 ? <Tldraw persistenceKey="my-cf-sketch" /> : <NoteEditor />}
    </div>
   )}
  </>
 );
}

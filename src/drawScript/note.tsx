import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Actions } from "../background/background";
import { createProblem, getCodeforcesProblemId } from "../utils/libs";

// Custom toolbar configuration
const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote", "code-block"],
  ["link", "clean"],
];

const modules = {
  toolbar: toolbarOptions,
};

export default function NoteEditor() {
  const [value, setValue] = useState<string>("Write your thoughts here...");
  const [problemId, setProblemId] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  useEffect(() => {
    const fetchProblem = async () => {
      const url = window.location.href;
      const id = getCodeforcesProblemId(url);
      if (id === null) return;
      // console.log(`drawscript - note.tsx : fetched : ${id}`);
      setProblemId(id);

      const response = await chrome.runtime.sendMessage({
        type: Actions.GET_STATE,
        payload: id,
      });

      if (response?.success) {
        // console.log(`drawscript - note.tsx : fetched : ${response.problem.note}`);
        const fetched = response.problem;
        if (fetched.note) setValue(fetched.note);
        if (fetched.tags) setTags(fetched.tags);
      } else {
        const newProblem = await createProblem();
        if (newProblem && newProblem.note) {
          setValue(newProblem.note);
          setTags(newProblem.tags);
        }
      }
    };

    fetchProblem();
  }, []);

  useEffect(() => {
    const save = async () => {
      if (problemId === null) return;
      await chrome.runtime.sendMessage({
        type: Actions.SET_NOTE,
        payload: {
          id: problemId,
          note: value,
        },
      });
    };
    save();
  }, [value]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "1000px",
        height: "98%",
        zIndex: 9998,
        borderLeft: "1px solid #aaa",
        borderTop: "1px solid #aaa",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        background: "#fff",
        padding: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <div style={{ marginBottom: 5 }}>
          <strong>Tags:</strong>{" "}
          {Array.isArray(tags) && tags.length > 0 ? (
            tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  background: "#e0e0e0",
                  borderRadius: 4,
                  padding: "2px 8px",
                  marginRight: 5,
                  fontSize: 14,
                }}
              >
                {tag}
              </span>
            ))
          ) : (
            <span style={{ color: "#888" }}>No tags yet</span>
          )}
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!problemId || !tagInput.trim()) return;
            await chrome.runtime.sendMessage({
              type: Actions.SET_TAGS,
              payload: {
                id: problemId,
                tags: [tagInput.trim()],
              },
            });
            setTagInput("");
            // Fetch updated tags
            const response = await chrome.runtime.sendMessage({
              type: Actions.GET_STATE,
              payload: problemId,
            });
            if (response?.success && Array.isArray(response.problem.tags)) {
              setTags(response.problem.tags);
            }
          }}
        >
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add a tag"
            style={{
              padding: "4px 8px",
              fontSize: 14,
              borderRadius: 4,
              border: "1px solid #ccc",
              marginRight: 5,
            }}
          />
          <button
            type="submit"
            style={{
              padding: "4px 12px",
              fontSize: 14,
              borderRadius: 4,
              border: "none",
              background: "#1976d2",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </form>
      </div>
      <ReactQuill
        value={value}
        onChange={setValue}
        theme="snow"
        modules={modules}
        style={{ height: "100%", fontSize: 16 }}
      />
    </div>
  );
}

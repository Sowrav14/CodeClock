import { useEffect, useState } from "react";
import { Actions } from "../background/background";
import DBinstance from "../utils/indexedDB";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ITEMS_PER_PAGE = 10;

const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
  zIndex: 1000,
  maxWidth: "90%",
  maxHeight: "70vh",
  overflowY: "auto",
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  zIndex: 999,
};

const ProblemTable = () => {
  const [problems, setProblems] = useState<DBinstance[]>([]);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalContent, setModalContent] = useState<any>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalTag, setModalTag] = useState("");

  useEffect(() => {
    chrome.runtime.sendMessage({ type: Actions.GET_ALL_ALL }).then((res) => {
      if (res && Array.isArray(res.problems)) {
        setProblems(res.problems);
      }
    });
  }, []);

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTagInput(input);
    const tags = input
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    setFilterTags(tags);
    setCurrentPage(1);
  };

  const filtered = problems.filter((p) => {
    if (filterTags.length === 0) return true;
    return (p.tags || []).some((tag) =>
      filterTags.some((fTag) => tag.toLowerCase().includes(fTag))
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const aR = isNaN(Number(a.rating)) ? Infinity : Number(a.rating);
    const bR = isNaN(Number(b.rating)) ? Infinity : Number(b.rating);
    return sortAsc ? aR - bR : bR - aR;
  });

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openModal = (title: string, tag : string, content: any) => {
    setModalTitle(title);
    setModalTag(tag);
    setModalContent(content);
  };

  const closeModal = () => {
    setModalTitle("");
    setModalTag("");
    setModalContent(null);
  };

  return (
    <div
      style={{
        // marginTop: "20px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {modalContent && (
        <>
          <div style={overlayStyle} onClick={closeModal} />
          <div
            style={{
              ...modalStyle,
              width: "800px",
              height: "500px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 style={{ marginBottom: "10px", textAlign: "center" }}>
              {modalTitle}
            </h4>
            {modalTag != "" && <p style={{ marginBottom: "10px", textAlign: "center" }}>
              {modalTag}
            </p>}
            <div style={{ flex: 1, width: "100%", overflowY: "auto" }}>
              <ReactQuill
                value={modalContent}
                readOnly={true}
                theme="bubble"
                modules={{ toolbar: false }}
                style={{
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                  padding: "0 10px",
                }}
              />
            </div>
            <button
              onClick={closeModal}
              style={{
                marginTop: "10px",
                padding: "6px 14px",
                borderRadius: "4px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </>
      )}

      <h3 style={{fontSize:'1.5rem', padding:'5px', letterSpacing:'1.2px', fontWeight:'bold', textAlign:'center'}}>
        Problem Details Table
      </h3>

      <div style={{ marginBottom: "20px", marginTop : "20px" }}>
        <label>
          Filter by tags (comma separated):{" "}
          <input
            type="text"
            value={tagInput}
            onChange={handleTagInput}
            placeholder="e.g. dp,graph"
            style={{ width: "250px", padding: "5px", borderRadius: "4px" }}
          />
        </label>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "1rem",
          tableLayout : "fixed",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={thStyle}>ID</th>
            <th style={{...thStyle, width:'200px'}}>Name</th>
            <th style={thStyle}>Time (min)</th>
            <th style={thStyle}>Solved</th>
            <th style={{...thStyle, width:'150px'}}>Tags</th>
            <th
              style={{ ...thStyle, cursor: "pointer" }}
              onClick={() => setSortAsc(!sortAsc)}
            >
              Rating {sortAsc ? "↑" : "↓"}
            </th>
            <th style={thStyle}>Note</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((p, i) => (
            <tr
              key={i}
              style={{
                borderBottom: "1px solid #ddd",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#fafafa")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <td
                style={tdLinkStyle}
                onClick={() => window.open(p.url, "_blank")}
              >
                {p.id}
              </td>
              <td style={tdStyle}>{p.name}</td>
              <td style={tdStyle}>{(p.time ?? -1.0).toFixed(1)}</td>
              <td style={tdStyle}>{p.solved ? "✅" : "❌"}</td>
              <td style={tdStyle}>{p.tags?.join(", ") || "—"}</td>
              <td style={tdStyle}>{p.rating || "other"}</td>
              <td style={tdStyle}>
                {p.note ? (
                  <button
                    style={btnStyle}
                    onClick={() => openModal(p.name, (p.tags?.join(", ") || ""), p.note)}
                  >
                    Note
                  </button>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          Page {currentPage} of {totalPages}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "2px solid #ccc",
  whiteSpace: "normal",
  wordWrap: "break-word",
};

const tdStyle: React.CSSProperties = {
  padding: "8px",
  whiteSpace: "normal",
  wordWrap: "break-word",
};

const tdLinkStyle: React.CSSProperties = {
  ...tdStyle,
  color: "#007bff",
  textDecoration: "underline",
  cursor: "pointer",
};

const btnStyle: React.CSSProperties = {
  padding: "4px 8px",
  fontSize: "0.8rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  cursor: "pointer",
  backgroundColor: "#f9f9f9",
};

export default ProblemTable;

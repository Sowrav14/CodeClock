import "../App.css";
// import CodeClock from "../assets/CodeClock128.png";

function App() {
  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        color: "#333",
        backgroundColor: "#fdfdfd",
        padding: "24px",
        boxShadow: "0 2px 6px rgba(226, 224, 235, 0.34)",
        // maxWidth: "700px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {/* <img
        src={CodeClock}
        alt="CodeClock logo"
        style={{
          width: "100px",
          height: "100px",
          margin: "0 auto",
          display: "block",
          objectFit: "contain",
          backgroundColor : "black"
        }}
      /> */}
      <p
        style={{
          fontSize: "24px",
          fontWeight: "700",
          margin: "8px 0 8px",
          textAlign: "center",
        }}
      >
        Welcome to <span style={{ color: "#0077cc" }}>Code</span>
        <span style={{ color: "#3CB371" }}>Clock</span>
      </p>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "500",
          color: "#444",
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        <span style={{ color: "#555", fontStyle: "italic" }}>
          Master Time, Master Code!
        </span>
      </p>
      <p style={{ lineHeight: "1.6" }}>
        <strong>CodeClock</strong> is a Chrome extension for Codeforces that
        lets you take rich notes, draw sketches, track solving time with a
        stopwatch, and tag problems. All data is saved per problem and visible
        in your profile to help you reflect and improve efficiently.
      </p>

      <h3 style={{ textAlign: "center", marginTop: "10px" }}>
        <a
          href="https://codeforces.com/profile"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0077cc", textDecoration: "none" }}
        >
          Visit your profile
        </a>
      </h3>
      <br />
      <div
        style={{
          padding: "16px",
          border: "1px solid #e3e6ea",
          borderRadius: "8px",
          backgroundColor: "#f7f9fa",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#1a202c" }}>
          Support & Feedback
        </h2>
        <p style={{ fontSize: "14px", color: "#4a5568" }}>
          For any queries, suggestions, or feedback, reach out:
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://github.com/Sowrav14"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#e9eef6",
                color: "#1a202c",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              GitHub
            </button>
          </a>
          <a
            href="https://www.linkedin.com/in/sowrav-nath"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#e9eef6",
                color: "#1a202c",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              LinkedIn
            </button>
          </a>
          <a
            href="https://codeforces.com/profile/Sowrav_Nath"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#e9eef6",
                color: "#1a202c",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Codeforces
            </button>
          </a>
        </div>
        <a
          href="https://github.com/Sowrav14/CodeClock.git"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            marginTop: "16px",
            textDecoration: "none",
          }}
        >
          <button
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            GitHub Repository
          </button>
        </a>
      </div>
    </div>
  );
}

export default App;

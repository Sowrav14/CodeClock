
import '../App.css'

function App() {

  return (
    <div>
      <h2> Welcome to  CodeClock </h2>
      <p >This extension provides a stopwatch for problem-solving and tracks your stats in Codeforces.</p>
      <h3> <a href='https://codeforces.com/profile' target="_blank" rel="noopener noreferrer" > Visit your profile </a> </h3>
      <br />
      <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Support & Feedback</h2>
        <p style={{ fontSize: '14px' }}>For any queries, suggestions, or feedback, reach out:</p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', justifyContent:'center' }}>
          <a href="https://github.com/Sowrav14" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>GitHub</button>
          </a>
          <a href="www.linkedin.com/in/sowrav-nath" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>LinkedIn</button>
          </a>
          <a href="https://codeforces.com/profile/Sowrav_Nath" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>Codeforces</button>
          </a>
        </div>
        <a href="https://github.com/Sowrav14/CodeClock.git" target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '12px', textDecoration: 'none' }}>
          <button style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Github Repository</button>
        </a>
      </div>
    </div>
  )
}

export default App

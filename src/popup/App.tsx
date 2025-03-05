
import '../App.css'
import CodeClock from '../assets/CodeClock128.png'

function App() {

  return (
    <div>
      <img
        src={CodeClock}
        alt="CodeClock logo"
        style={{
          width: '100px',
          height: '100px',
          margin: '0 auto',
          objectFit: 'contain',
        }}
      />
      <p style={{fontSize:'24px', fontWeight:'700', margin:'0'}}> Welcome to  <span style={{ color: '#ADD8E6' }}>Code</span><span style={{ color: '#32CD32' }}>Clock</span> </p>
      <p style={{ fontSize: '16px', fontWeight: '500', color: '#FFD700', margin:'0' }}> Master Time, Master Code! </p>
      <p> CodeClock is a Chrome extension that provides a stopwatch for solving Codeforces problems. It tracks your time, records your performance, and displays insightful statistics in your profile to help you improve your problem-solving efficiency! 🚀 </p>
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

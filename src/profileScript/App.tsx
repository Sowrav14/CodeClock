import ProblemRatingChart from "./Barchart";
import SolvedProblemsChart from "./Piechart";

export default function App() {
  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      gap:'20px'
    }}>
        <h3 style={{color:'#3B5998', fontSize:'2rem', padding:'5px', letterSpacing:'1.2px', fontWeight:'bold'}}> CodeClock Statistics </h3>
        <SolvedProblemsChart/>
        <br/>
        <ProblemRatingChart/>
    </div>
  )
}

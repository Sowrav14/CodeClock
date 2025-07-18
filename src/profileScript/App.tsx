import { useEffect, useState } from "react";
import { Actions } from "../background/background";
import ProblemRatingChart from "./Barchart";
import SolvedProblemsChart from "./Piechart";
import Statistics from "./Statistics";
import ProblemTable from "./Table";

export default function App() {
  const [fetched, setFetched] = useState<boolean> (false);

  useEffect(() => {
    const fetchSolvedProblems = async () => {
      try {
        const response = await chrome.runtime.sendMessage({ type:Actions.GET_ALL });
        if (response && Array.isArray(response.problems)) {
          if(response.problems.length){
            setFetched(true)
          }
        }
      } catch (error) {
        console.error("Error fetching solved problems:", error);
      }
    };

    fetchSolvedProblems();
  }, []);


  return (
    <div>
      { fetched ?
        <div style={{
          display:'flex',
          flexDirection:'column',
          gap:'20px'
        }}>
            <h3 style={{color:'#3B5998', fontSize:'2rem', padding:'5px', letterSpacing:'1.2px', fontWeight:'bold', textAlign:'center'}}> CodeClock Statistics </h3>
            <Statistics />
            <SolvedProblemsChart/>
            <ProblemRatingChart/>
            <ProblemTable/>
        </div> :
        <div style={{
          display : "flex",
          flexDirection : "column",
          textAlign: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          gap: "10px",
          transition: "box-shadow 0.2s ease-in-out",
        }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}><span style={{ color: '#3B5998' }}>CodeClock</span> </h2>
            <p style={{ fontSize: '14px', color: '#555' }}>🎉 <strong>Get started on your problem-solving journey!</strong></p>
            <p style={{ fontSize: '14px', color: '#555' }}>You haven't solved any problems yet, but that's okay! Start using the stopwatch to track your time, improve your speed, and level up your skills.</p>
            <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#007bff' }}>🔥 Master Time, Master Code! </p>
        </div>
      }
    </div>
  )
}

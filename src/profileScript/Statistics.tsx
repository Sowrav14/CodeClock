import { useEffect, useState } from "react";
import DBinstance from "../utils/indexedDB";
import { Actions } from "../background/background";
import formatTime from "./formatTime";

export default function Statistics() {

    const [totalp, setTotalp] = useState<number>(0);
    const [totalt, setTotalt] = useState<number>(0);
    const [maxt, setmaxt] = useState<number>(0);
    const [mint, setmint] = useState<number>(0);
    const [avg, setavg] = useState<number>(0);
    const [fetched, setFetched] = useState<boolean> (false);

    useEffect(() => {
        const fetchSolvedProblems = async () => {
          try {
            const response = await chrome.runtime.sendMessage({ type:Actions.GET_ALL });
            if (response && Array.isArray(response.problems)) {
              processChartData(response.problems);
            }
          } catch (error) {
            console.error("Error fetching solved problems:", error);
          }
        };
    
        fetchSolvedProblems();
    }, []);

    const processChartData = (problems : DBinstance[]) => {
        // console.log(problems);
        let totalSolved = 0;
        let totalTime = 0;
        let maxTime = 0;
        let minTime = 1000000000;
        let avgTime = 0;
        problems.forEach(({ time }) => {
            totalSolved++;
            totalTime += time;
            if(time > maxTime) maxTime = time;
            if(time < minTime) minTime = time;
        });
        if(totalSolved != 0){
            avgTime = (totalTime/totalSolved);
        }

        if(avgTime !== 0){
            // console.log(totalSolved, totalTime, maxTime, minTime, avgTime);
            setTotalp(totalSolved);
            setTotalt(totalTime);
            setmaxt(maxTime);
            setmint(minTime);
            setavg(avgTime);
            setFetched(true);
        }
    }

    return (
        <div> 
            { fetched ?
            <ul style={{ 
                padding: '16px', 
                gap: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.2s ease-in-out",
            }}>
                <li style={{fontSize:'1.5rem', letterSpacing:'1.2px', fontWeight:'semibold'}}>
                    Total Problems Solved : {totalp}
                </li>
                <li style={{fontSize:'1.5rem', letterSpacing:'1.2px', fontWeight:'semibold'}}>
                    Total Time Spend : {formatTime(totalt)}
                </li>
                <li style={{fontSize:'1.5rem', letterSpacing:'1.2px', fontWeight:'semibold'}}>
                    Min Solve Time : {formatTime(mint)}
                </li>
                <li style={{fontSize:'1.5rem', letterSpacing:'1.2px', fontWeight:'semibold'}}>
                    Max Solve Time : {formatTime(maxt)}
                </li>
                <li style={{fontSize:'1.5rem', letterSpacing:'1.2px', fontWeight:'semibold'}}>
                    Average Solve Time : {formatTime(avg)}
                </li>
            </ul> : 
            null
            }
        </div>
    )
}

import { useEffect, useState } from "react";
import DBinstance from "../utils/indexedDB";
import { Actions } from "../background/background";
import formatTime from "./formatTime";

export default function Statistics() {
    const [ttotal, setTtotal] = useState<number>(0);
    const [totalp, setTotalp] = useState<number>(0);
    const [totalt, setTotalt] = useState<number>(0);
    const [maxt, setmaxt] = useState<number>(0);
    const [mint, setmint] = useState<number>(0);
    const [avg, setavg] = useState<number>(0);
    const [fetched, setFetched] = useState<boolean> (false);

    useEffect(() => {
        const fetchSolvedProblems = async () => {
          try {
            const response = await chrome.runtime.sendMessage({ type:Actions.GET_ALL_ALL });
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
        let total = 0;
        let totalSolved = 0;
        let totalTime = 0;
        let maxTime = 0;
        let minTime = 1000000000;
        let avgTime = 0;
        problems.forEach(({ time, solved }) => {
            total++;
            if(solved) totalSolved++;
            totalTime += time;
            if(time > maxTime) maxTime = time;
            if(time < minTime) minTime = time;
        });
        if(total != 0){
            avgTime = (totalTime/total);
        }

        if(avgTime !== 0){
            // console.log(totalSolved, totalTime, maxTime, minTime, avgTime);
            setTtotal(total);
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
            {fetched ? (
                <div
                    style={{
                        padding: "16px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.2s ease-in-out",
                        margin: "0 auto",
                        width: "70%",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            columnGap: "48px",
                            rowGap: "8px",
                            alignItems: "center",
                            fontSize: "1.3rem",
                        }}
                    >
                        <span style={{ fontWeight: 600, justifySelf: "start" }}>Total Problems Solved:</span>
                        <span style={{ justifySelf: "end" }}>{totalp} / {ttotal} </span>

                        <span style={{ fontWeight: 600, justifySelf: "start" }}>Total Time Spent:</span>
                        <span style={{ justifySelf: "end" }}>{formatTime(totalt)}</span>

                        <span style={{ fontWeight: 600, justifySelf: "start" }}>Min Solve Time:</span>
                        <span style={{ justifySelf: "end" }}>{formatTime(mint)}</span>

                        <span style={{ fontWeight: 600, justifySelf: "start" }}>Max Solve Time:</span>
                        <span style={{ justifySelf: "end" }}>{formatTime(maxt)}</span>

                        <span style={{ fontWeight: 600, justifySelf: "start" }}>Average Solve Time:</span>
                        <span style={{ justifySelf: "end" }}>{formatTime(avg)}</span>
                    </div>
                </div>
            ) : null}
        </div>

    )
}

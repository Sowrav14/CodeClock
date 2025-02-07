import {  useEffect, useState } from "react";
import Stopwatch from "./Stopwatch"
import DBinstance from "../utils/indexedDB";
import { Actions } from "../background/background";
import Solved from "./Solved";

function getCodeforcesProblemId(url : string) {
  const regex1 = /codeforces\.com\/.*\/(\d+)\/.*\/([A-Z]\d*)/;
  const regex2 = /codeforces\.com\/.*\/(\d+)\/([A-Z]\d*)/;
  // const regex = /codeforces\.com\/.*\/(\d+)\/.*\/([A-Z]\d*)/;
  // const gmatch = url.match(regex);
  // console.log("gmatch", gmatch);
  let match = url.match(regex1);
  if (match) {
      return `${match[1]}${match[2]}`;
  } else {
      match = url.match(regex2);
      if(match){
        return `${match[1]}${match[2]}`;
      } else {
        return null
      }
  }
}


function App() {
  
  const [isfetch, setisFetch] = useState<boolean>(false);
  const [solves, setSolves] = useState<boolean> (false);
  const [problem, setProblem] = useState<DBinstance>({
    id : " ",
    name : " ",
    solved : false,
    time : -1.0 // indicate new problem.
  });
  useEffect(() => {
    const fetchProblem = async () => {
      // Get the problem URL
      const url = window.location.href;
      let problemId = getCodeforcesProblemId(url);

      // Get the Problem Name
      const problemTitle = document.getElementsByClassName("title")[0]?.innerHTML;
      const status = document.getElementsByClassName("verdict-accepted")[0];
      if(status == null){
        setSolves(false);
      } else {
        setSolves(true);
      }
      // console.log(problemTitle);

      const updatedProblem : DBinstance = {
        id : problemId || " ",
        name: problemTitle,
        solved : false,
        time : -1.0
      };
      setProblem(updatedProblem);
    };
    fetchProblem();
  }, [])

  const fetchData = async () => {
    // console.log("before fetching : ", problem);
    // fetched from indexedDb...
    const response = await chrome.runtime.sendMessage({type:Actions.GET_STATE, payload:problem});
    if(response?.success){
      // console.log("response from background : ", response.problem);
      setProblem(response.problem);
      // console.log("after fetching : ", problem);
      if(response.problem.time === -1.0){
        if(solves === true){
          // solved without codeclock...
          // console.log("Solved without CodeClock");
        } else {
          // new problem
          // console.log("New Problem");
          const updatedProblem : DBinstance = {
            id : problem.id,
            name: problem.name,
            solved : false,
            time : 0.0
          };
          setProblem(updatedProblem);
          await chrome.runtime.sendMessage({type:Actions.SET_STATE, payload:updatedProblem});
        }
      } else {
          const updatedProblem : DBinstance = {
            id : problem.id,
            name: problem.name,
            solved : solves,
            time : response.problem.time
          }
          setProblem(updatedProblem);
          await chrome.runtime.sendMessage({type:Actions.SET_STATE, payload:updatedProblem});
      }

      setisFetch(true);
    } else {
      console.log("failed to fetch data : ", response?.error);
    }
  }
  
  return (
    <>
      {!isfetch && 
      <div className="app">
        <h3 style={{marginBottom:'20px'}}> CodeClock </h3>
        <button
          style={{marginBottom : '20px'}}
          onClick={fetchData}> Fetch </button>
      </div>
      }

      {solves && isfetch && 
        <Solved time={problem.time} />
      }

      {!solves && isfetch && 
        <Stopwatch problem={problem} />
      }
    </>
  )
}

export default App
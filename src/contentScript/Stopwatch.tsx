import { useState, useEffect, useRef } from 'react';

import '../css/stopwatch.css';
import formatTime from './timeformat';
import DBinstance from '../utils/indexedDB';
import { Actions } from '../background/background';

const Stopwatch = ({problem} : {problem:DBinstance}) => {
  const [time, setTime] = useState<number>(problem.time);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timeRef = useRef(time);

  // useEffect to clock
  useEffect(() => {
    let interval : any;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          timeRef.current = prev + 1;
          return prev + 1
        });
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  
  // save the current state to db...
  const saveCurrent = async (curTime : number) => {
    const newProblem : DBinstance = {...problem};
    newProblem.time = curTime;
    console.log("updating time : ", newProblem.time, " --- ", time);
    await chrome.runtime.sendMessage({type:Actions.SET_STATE, payload:newProblem});
  }

  // useeffect for auto save every 10s
  useEffect(() => {
    let interval : any;
    if (isRunning) {
      interval = setInterval(()=>saveCurrent(timeRef.current), 10000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // handlesave to save in db..
  const handleSave = async() => {
    setIsRunning(false);
    const newProblem : DBinstance = {...problem};
    newProblem.solved = true;
    newProblem.time = time;
    await chrome.runtime.sendMessage({type:Actions.SET_STATE, payload:newProblem});
  }


  return (
    <div className="app">
      <h3> Hurry Up! </h3>
      <div className='stopwatch-card'>
        <p>{formatTime(time)}</p>
        <div className='buttons'>
          <button onClick={()=>setIsRunning(true)}> Start </button>
        	<button onClick={()=>{
            setIsRunning(false);
            saveCurrent(time);
          }}> Pause </button>
          <button onClick={handleSave}> Save </button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
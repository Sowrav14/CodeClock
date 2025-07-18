import { useEffect, useState } from "react";
import Stopwatch from "./Stopwatch";
import DBinstance from "../utils/indexedDB";
import { Actions } from "../background/background";
import Solved from "./Solved";
import { createProblem, getCodeforcesProblemId } from "../utils/libs";

function getRandomInt() {
  const min = Math.ceil(100);
  const max = Math.floor(5000);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  /* const [showDrawing, setShowDrawing] = useState(false); */
  const [isfetch, setisFetch] = useState<boolean>(false);
  const [problem, setProblem] = useState<DBinstance | null>(null);

  useEffect(() => {
    const fetchProblem = async () => {
      // get the id
      const url = window.location.href;
      const id = getCodeforcesProblemId(url);
      if (id === null) return;

      let finalProblem: DBinstance | null = null;
      // see if it is in database
      const response = await chrome.runtime.sendMessage({
        type: Actions.GET_STATE,
        payload: id,
      });

      if (response?.success) {
        // the problem exist in db . but may be with wrong solve, time data...
        const fetched = response.problem;
        setProblem(fetched);
        finalProblem = fetched;
      } else {
        const newProblem = await createProblem();
        if (newProblem && newProblem.note) {
          setProblem(newProblem);
          finalProblem = newProblem;
        }
      }
      if (finalProblem === null) return;

      // check the og solve status.
      const status = document.getElementsByClassName("verdict-accepted")[0];
      finalProblem.solved = status !== undefined;

      await chrome.runtime.sendMessage({
        type: Actions.SET_SOLVE,
        payload: {
          id: id,
          solved: finalProblem.solved,
        },
      });

      // check the time
      if (finalProblem.time === -1.0) {
        if (finalProblem.solved) {
          finalProblem.time = getRandomInt();
        } else {
          finalProblem.time = 0.0;
        }
        await chrome.runtime.sendMessage({
          type: Actions.SET_TIME,
          payload: {
            id: id,
            time: finalProblem.time,
          },
        });
      }

      const tagsNodeList = document.querySelectorAll(".tag-box");
      const tags: string[] = Array.from(tagsNodeList)
        .filter((el) => (el as HTMLElement).title !== "Difficulty")
        .map((tag) => tag.textContent?.trim() || "");
      await chrome.runtime.sendMessage({
        type: Actions.SET_TAGS,
        payload: {
          id: id,
          tags: tags,
        },
      });

      setProblem(finalProblem);
    };
    fetchProblem();
    setisFetch(true);
  }, []);

  const fetchData = async () => {
    setisFetch(true);
  };

  return (
    <>
      {!isfetch && (
        <div className="app">
          <h3 style={{ marginBottom: "20px" }}> CodeClock </h3>
          <button style={{ marginBottom: "20px" }} onClick={fetchData}>
            {" "}
            Fetch{" "}
          </button>
        </div>
      )}

      {problem && problem?.solved && isfetch && <Solved time={problem.time} />}

      {problem && !problem?.solved && isfetch && (
        <Stopwatch problem={problem} />
      )}
    </>
  );
}

export default App;

import { Actions } from "../background/background";
import DBinstance from "./indexedDB";

export function getCodeforcesProblemId(url: string) {
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
    if (match) {
      return `${match[1]}${match[2]}`;
    } else {
      return null;
    }
  }
}

// create new instances of the problem in the database...
export async function createProblem() {
  // Get the problem URL...
  const url = window.location.href;
  let problemId = getCodeforcesProblemId(url);
  if (problemId === null) return null;


  // Get the Problem Name...
  const problemTitle = document.getElementsByClassName("title")[0]?.innerHTML;
  // Get the original status from codeforces...
  const status = document.getElementsByClassName("verdict-accepted")[0];
  // Get the problem rating...
  let rating = null;
  const difficultyElement = document.querySelector(
    '.tag-box[title="Difficulty"]'
  );
  const tagsNodeList = document.querySelectorAll(".tag-box");
  const tags: string[] = Array.from(tagsNodeList)
    .filter((el) => (el as HTMLElement).title !== "Difficulty")
    .map((tag) => tag.textContent?.trim() || "");
  if (difficultyElement) {
    const difficultyText = difficultyElement.innerHTML.trim(); // Get the text content and remove extra whitespace
    const difficultyMatch = difficultyText.match(/\*(\d+)/); // Extract the number

    if (difficultyMatch) {
      rating = difficultyMatch[1];
    }
  }

  const newProblem: DBinstance = {
    id: problemId,
    name: problemTitle,
    url: url,
    rating: rating || "other",
    solved: status !== undefined,
    time: -1.0,
    tags: tags,
    note: "Write you thoughts on this problem here for future recap",
  };
  const response = await chrome.runtime.sendMessage({
    type: Actions.SET_STATE,
    payload: newProblem,
  });

  if(response.success){
    return newProblem;
  } else {
    return null;
  }
}

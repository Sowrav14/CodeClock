import DBinstance, { 
  getItemById, 
  getSolvedProblems, 
  updateSolved,
  updateTime,
  updateTags,
  updateNote,
  addItem,
  getProblems
} from "../utils/indexedDB";

export enum Actions {
    GET_STATE = "get-state",
    SET_STATE = "set-state",
    SET_TIME = "set-time",
    SET_SOLVE = "set-solve",
    SET_TAGS = "set-tags",
    SET_NOTE = "set-note",
    GET_ALL = "get-all",
    GET_ALL_ALL = "get-all-all",
}
export type Action = `${Actions}`;

interface MessageWithoutPayload {
  type: Actions.GET_STATE;
  payload: string;
}

interface MessageWithPayload {
  type: Actions.SET_SOLVE | Actions.SET_TAGS | Actions.SET_NOTE | Actions.SET_TIME | Actions.SET_STATE;
  payload: any;
}

interface MessageForAll {
  type : Actions.GET_ALL | Actions.GET_ALL_ALL;
  payload?:never;
}

type Message = MessageWithoutPayload | MessageWithPayload | MessageForAll;

async function fetchDB(id: string){
    const data = await getItemById(id);
    // console.log(`background : data for ${id} is found to be : ${data}`);
    if(data){
       return data; 
    } else {
        return null;
    }
}

async function solveUpdate(id:string, solve : boolean) {
    // console.log(`background : For ${id} save ${solve} in db`);
    await updateSolved(id, solve);
    // you may return the updated problem data...
}

async function timeUpdate(id:string, time : number) {
    // console.log(`background : For ${id} save ${time} in db`);
    await updateTime(id, time);
    // you may return the updated problem data...
}

async function tagsUpdate(id:string, tags : string[]) {
    // console.log(`background : For ${id} save ${tags} in db`);
    await updateTags(id, tags);
    // you may return the updated problem data...
}

async function noteUpdate(id:string, note : string) {
    // console.log(`background : For ${id} save ${note} in db`);
    await updateNote(id, note);
    // you may return the updated problem data...
}

async function addProblem(problem : DBinstance) {
    // console.log(`background : new problem : ${problem}`);
    await addItem(problem);
    // you may return the updated problem data...
}

chrome.runtime.onMessage.addListener((message: Message, _, sendResponse) => {

  if(message.type === Actions.GET_ALL) {
    getSolvedProblems().then((problems) => {
      sendResponse({success:true, problems:problems})
    }).catch(err => {
      sendResponse({sucess:false, error:err.message})
    });
    return true;
  }
  if(message.type === Actions.GET_ALL_ALL) {
    getProblems().then((problems) => {
      sendResponse({success:true, problems:problems})
    }).catch(err => {
      sendResponse({sucess:false, error:err.message})
    });
    return true;
  }

  if (message.type === Actions.GET_STATE) {
      fetchDB(message.payload).then((res) => {
        if(res === null) sendResponse({success:false, error:"not found"});
        else sendResponse({success:true, problem:res});
      }).catch(err => {
        sendResponse({success:false, error:err.message});
      });
      return true;
  }

  if (message.type === Actions.SET_NOTE) {
    // console.log("set payload : ", message.payload);
    noteUpdate(message.payload.id, message.payload.note).then(()=>{
      sendResponse({success : true});
    }).catch((err)=>{
      sendResponse({success : false, error : err});
    });
    return true;
  }

  if (message.type === Actions.SET_TAGS) {
    // console.log("background x set tags : set payload : ", message.payload);
    tagsUpdate(message.payload.id, message.payload.tags).then(()=>{
      sendResponse({success : true});
    }).catch((err)=>{
      sendResponse({success : false, error : err});
    });
    return true;
  }

  if (message.type === Actions.SET_SOLVE) {
    // console.log("set payload : ", message.payload);
    solveUpdate(message.payload.id, message.payload.solved).then(()=>{
      sendResponse({success : true});
    }).catch((err)=>{
      sendResponse({success : false, error : err});
    });
    return true;
  }

  if (message.type === Actions.SET_TIME) {
    // console.log("set payload : ", message.payload);
    timeUpdate(message.payload.id, message.payload.time).then(()=>{
      sendResponse({success : true});
    }).catch((err)=>{
      sendResponse({success : false, error : err});
    });
    return true;
  }

  if(message.type === Actions.SET_STATE){
    addProblem(message.payload).then(()=>{
      sendResponse({success : true});
    }).catch((err) => {
      sendResponse({success : false, error : err});
    });
    return true;
  }

});
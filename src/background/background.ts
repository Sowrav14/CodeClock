import DBinstance, { getItemById, updateItem } from "../utils/indexedDB";

export enum Actions {
    GET_STATE = "get-state",
    SET_STATE = "set-state",
}
export type Action = `${Actions}`;

interface MessageWithoutPayload {
  type: Actions.GET_STATE;
  payload: DBinstance;
}

interface MessageWithPayload {
  type: Actions.SET_STATE;
  payload: DBinstance;
}

type Message = MessageWithoutPayload | MessageWithPayload;

async function fetchDB(problem: DBinstance){
    const data = await getItemById(problem.id);
    if(data){
       return data; 
    } else {
        // new problem...
        return problem;
    }
}

async function storeDb(problem:DBinstance) {
    await updateItem(problem.id, problem);
}


chrome.runtime.onMessage.addListener((message: Message, _, sendResponse) => {
  if (message.type === Actions.GET_STATE) {
      // console.log("get payload : ", message.payload);
      fetchDB(message.payload).then((res) => {
        // console.log(res);
        sendResponse({success:true, problem:res});
      }).catch(err => {
        sendResponse({success:false, error:err.message});
      });
      // sendResponse(res);
      // console.log("get resp`onse : ", res);
      return true;
  }

  if (message.type === Actions.SET_STATE) {
    // console.log("set payload : ", message.payload);
    storeDb(message.payload);
  }
});
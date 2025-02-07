import { proxy } from "valtio";
import DBinstance from "../utils/indexedDB";

export enum Actions {
  GET_STATE = "get-state",
  SET_STATE = "set-state",
}
export type Action = `${Actions}`;

export const state : DBinstance = proxy({
    id : "",
    name : "",
    solved : false,
    time : 0.0
});

export const updateState = (payload: Partial<DBinstance>) => {
  chrome.runtime.sendMessage({ type: Actions.SET_STATE, payload });
};
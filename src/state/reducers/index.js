import {combineReducers} from "redux";
import currentDirectoryReducer from "./currentDirectoryReducer";

const reducers = combineReducers({
    currentDirectory: currentDirectoryReducer
})

export default reducers;
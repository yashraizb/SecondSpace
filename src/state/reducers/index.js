import {combineReducers} from "redux";
import currentDirectoryReducer from "./currentDirectoryReducer";
import createFolderError from "./createFolderError";
import setDirectoryStructure from "./setDirectoryStructure"

const reducers = combineReducers({
    currentDirectory: currentDirectoryReducer,
    folderError: createFolderError,
    directoryStructure: setDirectoryStructure
})

export default reducers;
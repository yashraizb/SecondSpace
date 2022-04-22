export const updateCurrentDirectory = (directory) => {
    return (dispatch) => {
        dispatch({
            type: "updateDirectory",
            payload: directory
        })
    }
}

export const folderErrorMessage = (message) => {
    return (dispatch) => {
        dispatch({
            type: "createFolderError",
            payload: message
        })
    }
}

export const setDirectoryStructure = (object) => {
    return (dispatch) => {
        dispatch({
            type: "setDirectoryStructure",
            payload: object
        })
    }
}
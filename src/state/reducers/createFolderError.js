const reducer = (state="", action) => {
    if(action.type === "createFolderError") {
        state = action.payload
        return state
    } else {
        return state
    }
}

export default reducer;
const reducer = (state={}, action) => {
    if(action.type === "setDirectoryStructure") {
        state = action.payload
        return state
    } else {
        return state
    }
}

export default reducer;
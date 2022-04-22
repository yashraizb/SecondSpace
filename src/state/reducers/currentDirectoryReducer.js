const reducer = (state="no_home", action) => {
    if(action.type === "updateDirectory") {
        state = action.payload
        return state
    } else {
        return state
    }
}

export default reducer;
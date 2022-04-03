const reducer = (state="", action) => {
    if(action.type === "updateDirectory") {
        return action.payload
    } else {
        return state
    }
}

export default reducer;
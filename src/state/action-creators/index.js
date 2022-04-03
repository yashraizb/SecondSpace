export const updateCurrentDirectory = (directory) => {
    return (dispatch) => {
        dispatch({
            type: "updateDirectory",
            payload: directory
        })
    }
}
const initialState = {}
const tag = "@main/"

const mainReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case tag + "init":
            return initialState

        default:
            return state
    }
}

export default mainReducer;
const initialState = {user: {}}
const tag = "@main/"

const mainReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case tag + "init":
            return initialState

        case tag + "setUser":
            return {...initialState, user: action.payload}

        default:
            return state
    }
}

export default mainReducer;
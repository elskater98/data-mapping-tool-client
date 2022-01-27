const tag = "@actions/"

const initState = {
    classes: false,
    dataProperties: false,
    objectProperties: false,
    index: 0
}

const mappingReducer = (state = initState, action: any) => {
    switch (action.type) {
        case tag + "SET_INDEX":
            return {...state, index: action.payload}

        default:
            return state
    }
}

export default mappingReducer;
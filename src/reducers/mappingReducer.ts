const tag = "@actions/"

const initState = {
    classes: false,
    dataProperties: false,
    objectProperties: false,
    classesSelected: [],
    index: 0
}

const mappingReducer = (state = initState, action: any) => {
    switch (action.type) {
        case tag + "SET_INDEX":
            return {...state, index: action.payload}

        case tag + "SET_SELECTED_CLASSES":
            return {...state, classesSelected: action.payload}

        case tag + "INIT_STEPPER":
            return initState;

        default:
            return state
    }
}

export default mappingReducer;
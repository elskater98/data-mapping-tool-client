const initState = {
    upload: false,
    sample: false,
    file: null,
    index: 0,
    columnsSelected: [],
    columns: [],
    currentMapping: null
}
const tag = "@instance/"

const instanceReducer = (state = initState, action: any) => {
    switch (action.type) {
        case tag + "INIT_STEPPER":
            return initState

        case tag + "CHANGE_UPLOAD_STEP":
            return {...state, upload: action.payload}

        case tag + "CHANGE_SAMPLE_STEP":
            return {...state, sample: action.payload}

        case tag + "SAVE_FILE":
            return {...state, file: action.payload}

        case tag + "SET_INDEX":
            return {...state, index: action.payload}

        case tag + "SET_SELECTED_COLUMNS":
            return {...state, columnsSelected: action.payload}

        case tag + "SET_COLUMNS":
            return {...state, columns: action.payload}

        case tag + "SET_CURRENT_MAPPING":
            return {...state, currentMapping: action.payload}

        default:
            return state
    }
}

export default instanceReducer;
const initState = {
    upload: false,
    sample: false,
    file: null
}

const mappingReducer = (state = initState, action: any) => {
    switch (action.type) {
        case "INIT_STEPPER":
            return initState

        case "CHANGE_UPLOAD_STEP":
            return {...state, upload: action.payload}

        case "CHANGE_SAMPLE_STEP":
            return {...state, sample: action.payload}

        case "SAVE_FILE":
            return {...state, file: action.payload}

        default:
            return state
    }
}

export default mappingReducer;
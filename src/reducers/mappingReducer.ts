const initState = {
    upload: false
}

const mappingReducer = (state = initState, action: any) => {
    switch (action.type) {
        case "INIT_STEPPER":
            return initState

        case "CHANGE_UPLOAD_STEP":
            return {upload: action.payload}
        default:
            return state
    }
}

export default mappingReducer;
const initState = {
    steps: {
        upload: false,
        sample: false
    }
}

const mappingReducer = (state = initState, action: any) => {
    switch (action.type) {
        case "MANAGE_STEPPER":
            return {...state, steps: {...state.steps, ...action.payload}}
        default:
            return state
    }
}

export default mappingReducer;
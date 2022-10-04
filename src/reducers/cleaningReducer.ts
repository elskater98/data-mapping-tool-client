const initialState = {index: 0, data: []};
const tag = "@cleaning/"

const cleaningReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case tag + "initReducer":
            return initialState
        case tag + "setNextStep":
            return {...state, index: state.index + 1}
        case tag + "setPreviousStep":
            return {...state, index: state.index - 1}
        default:
            return state
    }

}

export default cleaningReducer;
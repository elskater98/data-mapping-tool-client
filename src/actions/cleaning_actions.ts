const tag = "@cleaning/"
export const setNextStep = () => {
    return {
        type: tag + "setNextStep"
    }
}

export const setPreviousStep = () => {
    return {
        type: tag + "setPreviousStep"
    }
}

export const initReducer = () => {
    return {
        type: tag + "initReducer"
    }
}
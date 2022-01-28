const tag = "@actions/"
export const setIndex = (payload: number) => {
    return {
        type: tag + "SET_INDEX",
        payload: payload
    }
}
export const setSelectedClasses = (payload: any) => {
    return {
        type: tag + "SET_SELECTED_CLASSES",
        payload: payload
    }
}

export const init = () => {
    return {
        type: tag + "INIT_STEPPER"
    }
}

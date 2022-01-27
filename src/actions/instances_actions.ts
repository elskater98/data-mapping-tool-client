const tag = "@instance/"

export const handleUploadStep = (payload: boolean) => {
    return {
        type: tag + "CHANGE_UPLOAD_STEP",
        payload: payload
    }
}

export const handleSampleStep = (payload: boolean) => {
    return {
        type: tag + "CHANGE_SAMPLE_STEP",
        payload: payload
    }
}

export const saveFile = (payload: string) => {
    return {
        type: tag + "SAVE_FILE",
        payload: payload
    }
}

export const setIndex = (payload: number) => {
    return {
        type: tag + "SET_INDEX",
        payload: payload
    }
}

export const initStepper = () => {
    return {
        type: tag + "INIT_STEPPER"
    }
}

export const setSelectedColumns = (payload: any) => {
    return {
        type: tag + "SET_SELECTED_COLUMNS",
        payload: payload
    }
}

export const setColumns = (payload: any) => {
    return {
        type: tag + "SET_COLUMNS",
        payload: payload
    }
}

export const setCurrentMapping = (payload: number) => {
    return {
        type: tag + "SET_CURRENT_MAPPING",
        payload: payload
    }

}




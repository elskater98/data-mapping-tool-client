export const handleUploadStep = (payload: boolean) => {
    return {
        type: "CHANGE_UPLOAD_STEP",
        payload: payload
    }
}

export const handleSampleStep = (payload: boolean) => {
    return {
        type: "CHANGE_SAMPLE_STEP",
        payload: payload
    }
}

export const saveFile = (payload: string) => {
    return {
        type: "SAVE_FILE",
        payload: payload
    }
}

export const setIndex = (payload: number) => {
    return {
        type: "SET_INDEX",
        payload: payload
    }
}

export const initStepper = () => {
    return {
        type: "INIT_STEPPER"
    }
}

export const setSelectedColumns = (payload: any) => {
    return {
        type: "SET_COLUMNS",
        payload: payload
    }
}




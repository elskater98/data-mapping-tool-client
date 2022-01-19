export const handleUploadStep = (payload: any) => {
    return {
        type: "CHANGE_UPLOAD_STEP",
        payload: payload
    }
}

export const handleSampleStep = (payload: any) => {
    return {
        type: "CHANGE_SAMPLE_STEP",
        payload: payload
    }
}

export const saveFile = (payload: any) => {
    return {
        type: "SAVE_FILE",
        payload: payload
    }
}

export const initStepper = () => {
    return {
        type: "INIT_STEPPER"
    }
}




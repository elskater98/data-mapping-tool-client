export const handleUploadStep = (payload: any) => {
    return {
        type: "CHANGE_UPLOAD_STEP",
        payload: payload
    }
}

export const initStepper = () => {
    return {
        type: "INIT_STEPPER"
    }
}




const tag = "@main/"

export const initReducer = () => {
    return {
        type: tag + "init"
    }
}

export const setUserStore = (payload: any) => {
    return {
        type: tag + "setUser",
        payload: payload
    }
}

const tag = "@main/"

export const initReducer = () => {
    return {
        type: tag + "init"
    }
}

export const setUserInfo = (payload: object) => {
    return {
        type: tag + "setUser",
        payload: payload
    }
}

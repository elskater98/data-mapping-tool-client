const tag = "@main/"

export const setUserInfo = (payload: object) => {
    return {
        type: tag + "setUser",
        payload: payload
    }
}

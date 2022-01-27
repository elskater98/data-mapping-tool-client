const tag = "@actions/"
export const setIndex = (payload: number) => {
    return {
        type: tag + "SET_INDEX",
        payload: payload
    }
}

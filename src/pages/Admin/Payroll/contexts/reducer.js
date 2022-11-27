export const reducer = (state, action) => {
    switch (action.type) {
        case "render":
            return {
                ...state,
                active: !state.active
            }
        default:
            return state
    }
}

export const initialState = {
    active: false
}
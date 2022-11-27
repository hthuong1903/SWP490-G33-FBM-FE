import React from "react"
import { reducer, initialState } from "./reducer"

export const Context = React.createContext({
    state: initialState,
    dispatch: () => null
})

export const Provider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}
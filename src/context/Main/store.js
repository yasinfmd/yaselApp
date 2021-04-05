import React from 'react'
import mainReducer from './reducer'
import useMainDispatch from './useMainDispatch';
import useMainActions from './useMainActions';
import useMainState from "./useMainState"
import { initState } from './initialState'

let initialState;
export const MainStateContext = React.createContext(initialState)
export const MainDispatchContext = React.createContext(initialState)
function MainProvider({ children }) {
    const [state, dispatch] = React.useReducer(mainReducer, initState)
    return (
        <MainStateContext.Provider value={state}>
            <MainDispatchContext.Provider value={dispatch}>
                {children}
            </MainDispatchContext.Provider>
        </MainStateContext.Provider>
    )
}
export { MainProvider, useMainActions, useMainDispatch, useMainState }
import React from 'react'
import optionsReducer from './reducer'
import useOptionsDispatch from './useOptionsDispatch';
import useOptionsActions from './useOptionsActions';
import useOptionsState from "./useOptionsState"
import { initState } from './initialState'

let initialState;
export const OptionsStateContext = React.createContext(initialState)
export const OptionsDispatchContext = React.createContext(initialState)
function OptionsProvider({ children }) {
    const [state, dispatch] = React.useReducer(optionsReducer, initState)
    return (
        <OptionsStateContext.Provider value={state}>
            <OptionsDispatchContext.Provider value={dispatch}>
                {children}
            </OptionsDispatchContext.Provider>
        </OptionsStateContext.Provider>
    )
}
export { OptionsProvider, useOptionsActions, useOptionsDispatch, useOptionsState }
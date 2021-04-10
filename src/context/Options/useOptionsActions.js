import React from 'react'
import useOptionsDispatch from "./useOptionsDispatch"
import { SET_OPTIONS } from './actionTypes';

const useOptionsActions = () => {
    const dispatch = useOptionsDispatch();
    const setOptions = (optionList) => {
        dispatch({ type: SET_OPTIONS, payload: optionList })
    }
    const actions = { setOptions }
    return actions
}
export default useOptionsActions
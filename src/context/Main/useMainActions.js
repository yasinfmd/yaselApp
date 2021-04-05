import React from 'react'
import useMainDispatch from "./useMainDispatch"
import { SET_NAME } from './actionTypes';
import { initState } from './initialState';

const useMainActions = () => {
    const dispatch = useMainDispatch();
    const setName = (name) => {
        dispatch({ type: SET_NAME, payload: name })
    }
    const actions = { setName }
    return actions
}
export default useMainActions
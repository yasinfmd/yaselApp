import React from 'react'
import useMainDispatch from "./useMainDispatch"
import { setGeneralListAction } from './actionCreator'
const useMainActions = () => {
    const dispatch = useMainDispatch();

    const setGeneralList = (list) => {
        dispatch(setGeneralListAction(list))
    }

    const actions = { setGeneralList }
    return actions
}
export default useMainActions
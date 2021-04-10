import { SET_OPTIONS } from '../Options/actionTypes'

export default function optionsReducer(state, action) {
    switch (action.type) {
        case SET_OPTIONS:
            return {
                ...state,
                optionsList: action.payload
            }


        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}
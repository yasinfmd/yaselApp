import { SET_NAME } from '../Main/actionTypes'

export default function mainReducer(state, action) {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.payload
            }


        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}
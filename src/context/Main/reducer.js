import { SET_GENERAL_LIST } from '../Main/actionTypes'

export default function mainReducer(state, action) {
    switch (action.type) {
        case SET_GENERAL_LIST:
            return {
                ...state,
                generalList: action.payload
            }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}
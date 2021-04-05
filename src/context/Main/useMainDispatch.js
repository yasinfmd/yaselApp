import React from "react"
import { MainDispatchContext } from "./store"
export default function useMainDispatch() {
    const context = React.useContext(MainDispatchContext)
    if (context === undefined) {
        throw new Error('useDispatch Error')
    }
    return context
}
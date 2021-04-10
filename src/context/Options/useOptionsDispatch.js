import React from "react"
import { OptionsDispatchContext } from "./store"
export default function useOptionsDispatch() {
    const context = React.useContext(OptionsDispatchContext)
    if (context === undefined) {
        throw new Error('useDispatch Error')
    }
    return context
}
import React from "react"
import { OptionsStateContext } from "./store"
export default function useOptionsState() {
    const context = React.useContext(OptionsStateContext)
    if (context === undefined) {
        throw new Error('Error')
    }
    return context
}
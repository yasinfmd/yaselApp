import React from "react"
import { MainStateContext } from "./store"
export default function useAppState() {
    const context = React.useContext(MainStateContext)
    if (context === undefined) {
        throw new Error('Error')
    }
    return context
}
import React from 'react'

import { Box } from '../../components'
const CircleColor = ({ size, color }) => {
    return (
        <Box size={size} bg={color} borderRadius={9999} alignItems='center' justifyContent='center' />
    )
}
export default CircleColor
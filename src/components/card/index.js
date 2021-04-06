import React from 'react'
//components
import { Box } from '../../components/'
//theme
import { colors, sizes, radius, space } from '../../theme'
const Card = ({ children, direction }) => {
    return (
        <Box bg={colors.white} flexDirection={direction} alignItems='center' height={sizes.height56} borderRadius={radius.xsmall} mb={space.mb20} justifyContent='space-between' pl={space.pl16} >
            {children}
        </Box>
    )
}
export default Card;
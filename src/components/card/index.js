import React from 'react'
//components
import { Box } from '../../components/'
//theme
import { colors, sizes, radius, space } from '../../theme'
const Card = ({ children }) => {
    return (
        <Box bg={colors.white} height={sizes.height56} borderRadius={radius.xsmall} mb={space.mb20} justifyContent='center' pl={space.pl16} >
            {children}
        </Box>
    )
}
export default Card;
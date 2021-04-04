import React from 'react'

//components
import { Text } from '../../components'

//themes
import { font, colors } from '../../theme'

const CardText = ({ string }) => {
    return (
        <Text color={colors.textColor} fontSize={font.size12}>  {string}</Text>
    )
}
export default CardText;
import React from 'react'

//components
import { Text } from '../../components'

//themes
import { font, colors } from '../../theme'

const CardText = ({ string, line }) => {
    return (
        <Text numberOfLines={line ? line : 1} ellipsizeMode='head' color={colors.textColor} fontSize={font.size12}>  {string}</Text>
    )
}
export default CardText;
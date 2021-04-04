import React from 'react'

//components
import { Text } from '../../components'

//themes
import { font, colors } from '../../theme'
const Title = ({ title }) => {
    return (
        <>
            <Text fontSize={font.size16} color={colors.titleColor}>{title}</Text>
        </>
    )
}
export default React.memo(Title);
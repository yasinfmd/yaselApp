import React from 'react'
//components
import { Text } from '../../components'
//theme
import { space } from '../../theme'
const FormLabel = ({ title }) => {
    return (
        <Text fontSize={10} mb={space.mb10}>{title}</Text>
    )
}
export default React.memo(FormLabel)
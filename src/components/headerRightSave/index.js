import React from 'react'

import { Button } from '../../components'
import { Check } from '../../components/icons'

import { colors, radius } from '../../theme'

const BackButton = ({ navigation, onSavePress }) => {
    return (
        <Button size={46} onPress={() => { onSavePress() }} bg={colors.pageBg} borderRadius={radius.full} alignItems='center' justifyContent='center' >
            <Check />
        </Button >
    )
}
export default BackButton
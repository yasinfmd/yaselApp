import React from 'react'

import { Button } from '../../components'
import { Back } from '../../components/icons'

import { colors, radius } from '../../theme'

const BackButton = ({ navigation }) => {
    return (
        <Button size={46} onPress={() => { navigation.goBack() }} bg={colors.pageBg} borderRadius={radius.full} alignItems='center' justifyContent='center'>
            <Back />
        </Button>
    )
}
export default BackButton
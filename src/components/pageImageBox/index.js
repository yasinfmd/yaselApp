import React from 'react'

//components
import { Box, Text, BackgroundImage } from '../../components'

//theme
import { colors, space, sizes, radius } from '../../theme';
const PageImageBox = ({ image, mainText, subText }) => {
    return (
        <Box bg={colors.primary} p={space.p20} width={sizes.fullWidth} height={sizes.height350} borderBottomLeftRadius={radius.mid}  >
            <Box flex={1} >
                <BackgroundImage radius={radius.small} image={image} />
            </Box>
            <Box p={space.p10} width={sizes.fullWidth} alignItems='flex-end'>
                <Text color={colors.white} fontFamily='BadScript-Regular' letterSpacing={1} fontSize={[16]} >
                    {mainText}

                </Text>

                <Text color={colors.white} letterSpacing={1} fontFamily='BadScript-Regular' fontSize={[20]}>
                    {subText}
                </Text>
            </Box>
        </Box>
    )
}

export default React.memo(PageImageBox)
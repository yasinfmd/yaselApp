import React from 'react'
//components
import { Box, Button } from '../../components'
//theme
import { colors, space, radius, sizes } from '../../theme/index'

//icons
import { Heart, Video, Discover } from '../../components/icons'



const Tab = ({ custom, onPress, route, index, activeIndex, ...props }) => {

    return (
        <>
            <Box p={custom ? space.p10 : null} pt={custom ? null : space.pt10} bg={colors.white} mt={custom ? space.m200 : null} borderRadius={custom ? radius.full : null} flex={custom ? null : 1} justifyContent='center' alignItems='center'>

                <Button bg={custom ? colors.primary : null} borderRadius={custom ? radius.full : null} size={sizes.size60} onPress={() => {
                    onPress(route, index)
                }} justifyContent='center' alignItems='center'>
                    {custom && <Heart />}
                    {index === 0 &&
                        <>
                            <Discover />
                            <Box bg={activeIndex === index ? colors.primary : colors.white} mt={space.mt10} width={sizes.width24} height={sizes.height4} />
                        </>
                    }
                    {index === 2 && <>
                        <Video />
                        <Box bg={activeIndex === index ? colors.primary : colors.white} mt={space.mt10} width={sizes.width24} height={sizes.height4} />
                    </>}

                </Button>
            </Box>
        </>
    )

}
export default Tab;
import React from 'react'

//component
import { Box, Button } from '../../components'

//themes
import { colors, sizes, radius } from '../../theme';

//icons
import { Cancel, Delete } from '../../components/icons'

const ListHiddenItem = ({ closeRow, deleteRow }) => {
    return (
        <Box borderRadius={radius.small} alignItems='center' bg={colors.white} height={sizes.height56} width='100%' flexDirection='row' justifyContent='center'>
            <Box height={sizes.height56} alignItems='center' borderTopLeftRadius={radius.small} borderBottomLeftRadius={radius.small} justifyContent='center' width='80' position='absolute' bottom={0} top={0.5} right={40} >
                <Button onPress={() => {
                    closeRow()
                }}>
                    <Cancel />
                </Button>
            </Box>
            <Box height={sizes.height56} alignItems='center' borderTopRightRadius={radius.small} borderBottomRightRadius={radius.small} justifyContent='center' width='50' position='absolute' bottom={0} top={0.5} right={0} >
                <Button onPress={() => {
                    deleteRow()
                }}>
                    <Delete />
                </Button>
            </Box>
        </Box>
    )
}
export default ListHiddenItem
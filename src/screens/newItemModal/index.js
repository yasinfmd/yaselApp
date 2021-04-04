import React from 'react'
import { View, Text, Button } from 'react-native'
import { Input, Box } from '../../components'
const ModalScreen = ({ navigation, children }) => {
    return (
        <Box p={16}>
            <Input size={30} bg='#FFFFFF' width='100%' borderRadius={12} fontSize={14} height={56} borderColor='#BEBAB3' pl={16} py={17} border='1px solid' color='#78746D' />

        </Box>
    );
}
export default ModalScreen;
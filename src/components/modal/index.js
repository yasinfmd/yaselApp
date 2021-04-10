import React from 'react'
//component
import { Alert, Modal, Text } from "react-native";
import { Box, BoxCenter } from '../../components'

//theme
import { colors, space } from '../../theme';

//consts
import Consts from '../../consts'
const CustomModal = ({ visible, onRequestClose, children }) => {
    return (
        <Modal
            hardwareAccelerated={true}
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                //setModalVisible(!modalVisible);

                //() => setModalVisible(!modalVisible)
            }}
        >
            <BoxCenter  >
                <Box bg={colors.white} alignItems='center' p={space.p20} style={{
                    height: '25%',
                    ...Consts.defaultShadow
                }} >
                    <Text >Hello World Merhaba dünya naber nasılsın iyi misin!</Text>

                </Box>
            </BoxCenter>
        </Modal>
    )
}
export default React.memo(CustomModal)
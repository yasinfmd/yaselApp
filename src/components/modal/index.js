import React from 'react'
//component
import { Alert, Modal, Text } from "react-native";
import { Box, BoxCenter } from '../../components'

//theme
import { colors, space } from '../../theme';

import { ImageBackground, View } from 'react-native';

//consts
import Consts from '../../consts'
const CustomModal = ({ visible, bgImage, onRequestClose, children }) => {
    console.log("bg", bgImage)
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
                    height: '50%',
                    width: "80%",
                    borderRadius: 20,
                    ...Consts.defaultShadow
                }} >
                    <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1622193973749-4bbf7f20c1fe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" }} style={{
                        flex: 1,
                        resizeMode: "cover",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%"
                    }}>
                        <Text style={{
                            color: "white",
                            fontSize: 42,
                            fontWeight: "bold",
                            textAlign: "center",
                            backgroundColor: "#000000a0"
                        }
                        }>Inside</Text>
                    </ImageBackground>

                </Box>
            </BoxCenter>
        </Modal >
    )
}
export default React.memo(CustomModal)
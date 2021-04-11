import React, { useState, useEffect, useRef } from 'react'
import { Input, Box, Picker, CustomSafeAreaView, FormLabel, Button, Text } from '../../components'
import Consts from '../../consts'
import { colors, space, radius, font, sizes, border } from '../../theme'

import { Keyboard } from 'react-native'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

let customInterval;
const ModalScreen = ({ navigation, children }) => {
    const myInputRef = useRef(null)
    const [dynamicHeight, setDynamicHeight] = useState(sizes.height56)

    useEffect(() => {
        debugger

        customInterval = setTimeout(() => {
            myInputRef.current.focus()
        }, 20);
        return () => {
            clearInterval(customInterval);
        };
    }, [])
    return (
        <CustomSafeAreaView barStyle='dark-content' statusBarColor={colors.pageBg} backgroundColor={colors.pageBg}>
            <Box p={space.p20} bg={colors.pageBg}>
                <FormLabel title={Consts.newTodoTitle} />
                <Input ref={myInputRef} placeholder={Consts.newTodoPlaceholder} showSoftInputOnFocus={true} multiline={true} returnKeyType='done'
                    onSubmitEditing={(e) => {
                        //console.log('bbbb', e.nativeEvent.key)
                    }}
                    onContentSizeChange={(e) => {
                        e.nativeEvent.contentSize.height > sizes.height56 ? setDynamicHeight(e.nativeEvent.contentSize.height) : sizes.height56
                    }} blurOnSubmit={true} mb={space.mb20} bg={colors.white} width='100%' borderRadius={radius.bsmall} fontSize={font.size14} maxHeight={200} height={dynamicHeight}
                    borderColor={colors.borderColor}
                    pl={space.pl16} py={space.pv17} border={border.xsmall} color={colors.inputText} />
                <FormLabel title={Consts.newTodoPriortyTitle} />
                <Picker dataSourceUrl='/options' defaultVal={null} customCircle selectedValue={(val) => {
                    Keyboard.dismiss();
                    console.log('pickerdan', val)
                }} />

                <Button mt={20} onPress={() => {
                    ImagePicker.openCamera({
                        width: 300,
                        height: 400,
                        cropping: true,
                        includeExif: true
                    }).then(image => {
                        console.log(image);
                    });
                    // launchCamera({
                    //     mediaType: 'photo',
                    //     includeBase64: false,
                    //     quality: 1,
                    //     cameraType: 'front',
                    //     saveToPhotos: true,
                    //     maxWidth: 100,
                    //     maxHeight: 100
                    // }, (response) => {
                    //     console.log('res', response)
                    // })
                }}>
                    <Text>
                        Kamerayı Aç
                    </Text>
                </Button>
                <Button mt={20} onPress={() => {
                    ImagePicker.openPicker({
                        multiple: true,
                        mediaType: 'photo',
                        compressImageQuality: 0.8,
                        includeBase64: false
                    }).then(images => {
                        console.log(images);
                    });
                    // launchImageLibrary({
                    //     mediaType: 'photo',
                    //     includeBase64: false,
                    //     quality: 1,
                    //     cameraType: 'front',
                    //     saveToPhotos: true,
                    // }, (response) => {
                    //     console.log('res', response)
                    // })
                }}>
                    <Text>
                        Galeriden Seç
                    </Text>
                </Button>


            </Box>
        </CustomSafeAreaView>
    );
}
export default ModalScreen;
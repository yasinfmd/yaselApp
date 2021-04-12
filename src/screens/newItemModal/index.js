import React, { useState, useEffect, useRef } from 'react'
import { Input, Box, Picker, CustomSafeAreaView, FormLabel, Button, Text } from '../../components'
import Consts from '../../consts'
import { colors, space, radius, font, sizes, border } from '../../theme'

import { Keyboard } from 'react-native'

//emoji
import { EmojiConsts } from '../../emojiConsts'

// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { onRequestDevice, checkPermissionResult } from '../../helpers/permissions'
let customInterval;
const ModalScreen = ({ navigation, children }) => {
    const myInputRef = useRef(null)
    const [dynamicHeight, setDynamicHeight] = useState(sizes.height56)
    const [imageList, setImageList] = useState([])

    // useEffect(() => {

    //     customInterval = setTimeout(() => {
    //         myInputRef.current.focus()
    //     }, 20);
    //     return () => {
    //         clearInterval(customInterval);
    //     };
    // }, [])

    const checkCameraPermission = async () => {
        const cameraResult = await checkPermissionResult('CAMERA', `${EmojiConsts.camera} Yasel Uygulaması Kamera Erişimi`, `Uygulamaya Fotoğraf yüklemek için izin vermeniz gerekmektedir ${EmojiConsts.attention}`);
        return cameraResult
    }
    const takePhoto = async () => {
        const cameraResult = await checkCameraPermission();
        if (cameraResult) {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                includeExif: true
            }).then(image => {
                console.log(image);
            });
        }
    }
    const pickImages = async () => {
        // 0 izin yok 1 var
        const cameraResult = await checkCameraPermission();
        const readStorageResult = await checkPermissionResult('READ_EXTERNAL_STORAGE', `${EmojiConsts.folder} Yasel Uygulaması Resim Erişimi`, `Uygulamaya Galerinizden Fotoğraf yüklemek için izin vermeniz gerekmektedir ${EmojiConsts.attention}`);
        const writeStorageResult = await checkPermissionResult('WRITE_EXTERNAL_STORAGE', `${EmojiConsts.folder} Yasel Uygulaması Dosya Yazma Erişim,`, `Uygulamaya Çektiğiniz Fotoğrafları Galeriye yüklemek için izin vermeniz gerekmektedir ${EmojiConsts.attention}`);
        if (cameraResult === 1 && readStorageResult === 1 && writeStorageResult === 1) {
            ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
                compressImageQuality: 0.8,
                includeBase64: false
            }).then(images => {
                setImageList(images)
                const data = new FormData();
                for (let index = 0; index < images.length; index++) {
                    let length = images[index].path.split('/').length
                    data.append('files', {
                        name: images[index].path.split('/')[length - 1],
                        type: images[index].mime,
                        uri: images[index].path
                    });
                }
                data.append('ad', 'Yasin')
                data.append('soyad', '12323')

                console.log('formData', data)
                console.log(images);
            });
        }


        //data.append("files[]", );
        // images.forEach((item, index) => { })
        // axios.post('http://192.168.1.106:3000/api/yasel/test', data, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     },
        // }
        // ).then(function (res) {
        //     debugger
        // })
        //     .catch(function (err) {
        //         debugger
        //     });
    }
    return (
        <CustomSafeAreaView barStyle='dark-content' statusBarColor={colors.pageBg} backgroundColor={colors.pageBg}>
            <Box p={space.p20} bg={colors.pageBg}>
                <FormLabel title={Consts.newTodoTitle} />
                <Input ref={myInputRef} placeholder={`${Consts.newTodoPlaceholder} ${EmojiConsts.smile}`} showSoftInputOnFocus={true} multiline={true} returnKeyType='done'
                    onSubmitEditing={(e) => {
                        //console.log('bbbb', e.nativeEvent.key)
                    }}
                    onContentSizeChange={(e) => {
                        e.nativeEvent.contentSize.height > sizes.height56 ? setDynamicHeight(e.nativeEvent.contentSize.height) : sizes.height56
                    }} blurOnSubmit={true} mb={space.mb20} bg={colors.white} width='100%' borderRadius={radius.bsmall} fontSize={font.size14} maxHeight={200} height={dynamicHeight}
                    borderColor={colors.borderColor}
                    pl={space.pl16} py={space.pv17} border={border.xsmall} color={colors.inputText} />
                <FormLabel title={Consts.newTodoPriortyTitle} />
                <Picker dataSourceUrl='options' defaultVal={null} isLoad={(val) => {
                    myInputRef.current.focus()
                }} customCircle selectedValue={(val) => {
                    Keyboard.dismiss();
                    console.log('pickerdan', val)
                }} />

                <Button mt={20} onPress={() => {
                    takePhoto();
                    // requestPermission();
                    // ImagePicker.openCamera({
                    //     width: 300,
                    //     height: 400,
                    //     cropping: true,
                    //     includeExif: true
                    // }).then(image => {
                    //     console.log(image);
                    // });
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
                        {Consts.openCamera}
                    </Text>
                </Button>
                <Button mt={20} onPress={() => {
                    pickImages();
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
                        {Consts.pickPhoto}
                    </Text>
                </Button>


            </Box>
        </CustomSafeAreaView>
    );
}
export default ModalScreen;
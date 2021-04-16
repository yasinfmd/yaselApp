import React, { useState, useEffect, useRef } from 'react'

//components
import { Input, Box, Picker, CustomSafeAreaView, FormLabel, Button, Text, SubPopup } from '../../components'

//consts
import Consts from '../../consts'

//theme
import { colors, space, radius, font, sizes, border } from '../../theme'

import { Keyboard, Animated, BackHandler } from 'react-native'

//emoji
import { EmojiConsts } from '../../emojiConsts'

//icons
import { Camera, Cancel, Folder } from '../../components/icons'

import ImagePicker from 'react-native-image-crop-picker';
import { onRequestDevice, checkPermissionResult } from '../../helpers/permissions'

import CameraRoll from "@react-native-community/cameraroll";

import { useIsFocused } from '@react-navigation/native';


const ModalScreen = ({ navigation, route, children }) => {
    const myInputRef = useRef(null)
    const [dynamicHeight, setDynamicHeight] = useState(sizes.height56)
    const [imageList, setImageList] = useState([])
    const [cameraPhoto, setCameraPhoto] = useState(null)
    const subPopupAnimation = useRef(new Animated.Value(0)).current;
    const [showSubPopup, setShowSubPopup] = useState(false)
    const [cameraOptions, setCameraOptions] = useState([])
    const isFocused = useIsFocused();

    React.useEffect(() => {
        if (route.params?.images) {
            setImageList(route.params?.images)
            // console.log('ımagess', route.params?.images)
            // Post updated, do something with `route.params.post`
            // For example, send the post to the server
        }
    }, [route.params?.images]);

    useEffect(() => {
        if (isFocused === false) {
            setShowSubPopup(false)
        }
    }, [isFocused])
    useEffect(() => {
        if (showSubPopup === true) {
            Animated.timing(subPopupAnimation, {
                toValue: 150,
                duration: 400,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(subPopupAnimation, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false

            }).start()
        }


    }, [subPopupAnimation, showSubPopup])

    //back button handler
    useEffect(() => {

        const backAction = () => {
            if (showSubPopup === true) {
                setShowSubPopup(false)
            } else {
                BackHandler.exitApp();
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        if (setShowSubPopup === true) {
            setShowSubPopup(false)
        }

        return () => backHandler.remove();
    }, [showSubPopup]);
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
                mediaType: 'photo',
                includeExif: true,
                useFrontCamera: true
            }).then(image => {
                console.log(image);
            }).catch((error) => {
                console.log('error', error)
            })
        }
    }
    const selectedPopupItem = (item) => {
        if (item.showNewPage === false) {
            takePhoto()
        } else {
            navigation.navigate('photosModal', {
                selectedAlbum: item.label,
                albumCount: item.count
            });
        }
    }
    useEffect(() => {
        getAlbums();
    }, [])
    const getAlbums = async () => {
        const cameraResult = await checkCameraPermission();
        const readStorageResult = await checkPermissionResult('READ_EXTERNAL_STORAGE', `${EmojiConsts.folder} Yasel Uygulaması Resim Erişimi`, `Uygulamaya Galerinizden Fotoğraf yüklemek için izin vermeniz gerekmektedir ${EmojiConsts.attention}`);
        const writeStorageResult = await checkPermissionResult('WRITE_EXTERNAL_STORAGE', `${EmojiConsts.folder} Yasel Uygulaması Dosya Yazma Erişim,`, `Uygulamaya Çektiğiniz Fotoğrafları Galeriye yüklemek için izin vermeniz gerekmektedir ${EmojiConsts.attention}`);
        let cameraOptList = [{ id: 1, label: 'Kamera', showNewPage: false, icon: <Camera /> }]
        if (cameraResult === 1 && readStorageResult === 1 && writeStorageResult === 1) {
            const albums = await CameraRoll.getAlbums({ assetType: 'Photos' })
            albums.forEach((item, index) => {
                cameraOptList = [...cameraOptList, { id: index + 2, count: item.count, showNewPage: true, label: item.title, icon: <Folder /> }]
            })
        }
        cameraOptList.push({ id: 0, label: 'Vazgeç', showNewPage: false, icon: <Cancel /> })
        setCameraOptions(cameraOptList)
    }



    const pickImages = async () => {
        // 0 izin yok 1 var

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
            <Box p={space.p20} bg={colors.pageBg} onTouchStart={() => {
                setShowSubPopup(showSubPopup === true ? setShowSubPopup(false) : setShowSubPopup(true))
            }}>
                <FormLabel title={Consts.newTodoTitle} />
                <Input onFocus={() => { setShowSubPopup(false) }} ref={myInputRef} placeholder={`${Consts.newTodoPlaceholder} ${EmojiConsts.smile}`} showSoftInputOnFocus={true} multiline={true} returnKeyType='done'
                    onSubmitEditing={(e) => {
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
                }} />
                <Box alignItems='center' justifyContent='center'>
                    <Button mt={space.mr20} onPress={() => {
                        Keyboard.dismiss();
                        setShowSubPopup(!showSubPopup)
                    }}><Camera /></Button>
                </Box>
                <FormLabel title={'Seçilen Fotoğraflar'} />
                <Box>
                    {/*  !TODO */}
                </Box>
            </Box>
            {showSubPopup && <SubPopup data={cameraOptions} onPressItem={(item) => {
                item.id === 0 ? setShowSubPopup(false) : selectedPopupItem(item)
            }} />}
        </CustomSafeAreaView>
    );
}
export default ModalScreen;
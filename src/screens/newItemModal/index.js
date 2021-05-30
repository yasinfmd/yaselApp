import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

//components
import { Input, FormInput, Box, Picker, CustomSafeAreaView, FormLabel, Button, Text, SubPopup, DeletablePhoto, HeaderRightSave } from '../../components'

//consts
import Consts from '../../consts'

//theme
import { colors, space, radius, font, sizes, border } from '../../theme'

import { Keyboard, Animated, BackHandler, ScrollView, ActivityIndicator } from 'react-native'

//emoji
import { EmojiConsts } from '../../emojiConsts'

//icons
import { Camera, Cancel, Folder } from '../../components/icons'

import ImagePicker from 'react-native-image-crop-picker';
import { onRequestDevice, checkPermissionResult } from '../../helpers/permissions'

import CameraRoll from "@react-native-community/cameraroll";

import { useIsFocused } from '@react-navigation/native';

import { createNewTodo, isExist } from '../../service/home'
import { useMainActions, useMainState } from '../../context/Main/store'


const ModalScreen = ({ navigation, route, children }) => {
    const myInputRef = useRef(null)
    const [dynamicHeight, setDynamicHeight] = useState(sizes.height56)
    const [imageList, setImageList] = useState([])
    const [cameraPhoto, setCameraPhoto] = useState(null)
    const [isError, setIsError] = useState(false)
    const [animationValue, setAnimationValue] = useState(-1000)
    const subPopupAnimation = useRef(new Animated.Value(animationValue)).current;
    const [cameraOptions, setCameraOptions] = useState([])
    const isFocused = useIsFocused();
    const [newTodoModel, setNewTodoModel] = useState({ name: '', image: null, priorty: null })
    const [isExistTodo, setIsExistTodo] = useState(false)
    const [isExistLoading, setIsExistLoading] = useState(false)
    const [createLoading, setCreateLoading] = useState(false)
    const { setGeneralList } = useMainActions()
    const { generalList } = useMainState()
    React.useEffect(() => {
        if (route.params?.images) {
            const list = route.params?.images.map((item, index) => {
                return item[1]
            })
            setImageList(list)
            onFormChange('image', list)


        }
    }, [route.params?.images, route.params?.selectedAlbum]);

    const closeAnimation = () => {
        Animated.timing(subPopupAnimation, {
            useNativeDriver: false,
            toValue: -1000,
            duration: 350
        }).start()
        setAnimationValue(-1000)
    }
    useEffect(() => {
        if (isFocused === false) {
            closeAnimation()
        }
    }, [isFocused])
    //back button handler
    // useEffect(() => {

    //     const backAction = () => {
    //         if (animationValue === 0) {
    //             setAnimationValue(-1000)
    //         } else {
    //             BackHandler.exitApp();
    //         }
    //         return true;
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         backAction
    //     );
    //     if (animationValue === 0) {
    //         setAnimationValue(-1000)
    //     }

    //     return () => backHandler.remove();
    // }, [animationValue]);


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
                mediaType: 'photo',
                includeExif: true,
                useFrontCamera: true
            }).then(image => {
                const splited = image.path.split('.')
                const ext = '.' + splited[splited.length - 1]
                const splitedPath = splited[splited.length - 2].split('/')
                const fileName = splitedPath[splitedPath.length - 1]
                setCameraPhoto({
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    file_name: fileName + ext
                })
                toggleAnimation()
                //setAnimationValue(animationValue === 0 ? -1000 : 0)
                setImageList([])
            }).catch((error) => {
                console.log('error', error)
            })
        }
    }
    const selectedPopupItem = (item) => {
        if (item.showNewPage === false) {
            takePhoto()
        } else {
            setCameraPhoto(null)
            navigation.navigate('photosModal', {
                selectedAlbum: item.label,
                albumCount: item.count
            });
        }
    }
    useLayoutEffect(() => {
        if (createLoading === true) {
            navigation.setOptions({
                headerRight: () => (
                    <ActivityIndicator style={{ marginRight: 16 }} size='small' color={colors.primary} />
                ),
            });
        } else {
            navigation.setOptions({
                headerRight: () => (
                    <HeaderRightSave navigation={navigation} onSavePress={() => {
                        onFormControl();
                    }} />
                ),
            });
        }

    }, [navigation, newTodoModel, createLoading, cameraPhoto]);
    useLayoutEffect(() => {
        // getAlbums()
    }, [])

    const getAlbums = async () => {
        // const cameraResult = await checkCameraPermission();
        // const readStorageResult = await checkPermissionResult('READ_EXTERNAL_STORAGE', `${EmojiConsts.folder} Yasel Uygulaması Resim Erişimi`, `Uygulamaya Galerinizden Fotoğraf yüklemek için izin vermeniz gerekmektedir ${EmojiConsts.attention}`);
        // const writeStorageResult = await checkPermissionResult('WRITE_EXTERNAL_STORAGE', `${EmojiConsts.folder} Yasel Uygulaması Dosya Yazma Erişim,`, `Uygulamaya Çektiğiniz Fotoğrafları Galeriye yüklemek için izin vermeniz gerekmektedir ${EmojiConsts.attention}`);
        // let cameraOptList = [{ id: 1, label: 'Kamera', showNewPage: false, icon: <Camera /> }]
        // if (cameraResult === 1 && readStorageResult === 1 && writeStorageResult === 1) {
        //     const albums = await CameraRoll.getAlbums({ assetType: 'Photos' })
        //     albums.forEach((item, index) => {
        //         cameraOptList = [...cameraOptList, { id: index + 2, count: item.count, showNewPage: true, label: item.title, icon: <Folder /> }]
        //     })
        // }
        // cameraOptList = [...cameraOptList, { id: 0, label: 'Vazgeç', showNewPage: false, icon: <Cancel /> }]
        // setCameraOptions(cameraOptList)
    }
    const deleteImage = (item, type, setFunction) => {
        if (type === 'single') {
            setFunction(null)
        } else {
            const removedImage = imageList.filter((image) => item.id !== image.id)
            setFunction(removedImage)
        }
    }
    const isExistTodoName = async (text) => {
        setIsExistLoading(true)
        try {
            const { result } = await isExist(`todoExist?name=${text}`)
            return result.isExist
        } catch (error) {
        }

    }
    const onTodoNameChange = async (text) => {
        onFormChange('name', text)
        if (text.length > 2) {
            const isExist = await isExistTodoName(text);

            setIsExistTodo(isExist)
        } else {
            setIsExistTodo(false)
        }
        setIsExistLoading(false)
    }

    const onFormChange = (label, value) => {

        setNewTodoModel({ ...newTodoModel, [label]: value })
    }
    const onFormControl = () => {

        //const data = new FormData();
        // if (cameraPhoto) {
        //     for (let index = 0; index < 1; index++) {
        //         data.append('files', {
        //             name: cameraPhoto.file_name,
        //             type: "image/jpeg",
        //             uri: cameraPhoto.uri
        //         })
        //     }

        // } else {
        //     newTodoModel?.image?.forEach((item) => {
        //         data.append('files', {
        //             name: item.file_name,
        //             type: item.type,
        //             uri: item.uri
        //         });
        //     })
        // }
        // data.append('categoryId', 1)
        // data.append('name', newTodoModel.name)
        // data.append('priorty', newTodoModel.priorty.value)
        if (newTodoModel.name.length === 0) {
            setIsError(true)
        } else {
            setIsError(false)
            setCreateLoading(true)
            saveTodo({ categoryId: 1, name: newTodoModel.name, priorty: newTodoModel.priorty.value })
        }

    }

    const resetForm = () => {
        setNewTodoModel({ name: '', image: null, priorty: null })
        setCameraPhoto(null)
        setImageList([])
        Keyboard.dismiss()
    }

    const saveTodo = async (data) => {
        try {
            const result = await createNewTodo('todo', data)
            if (result.isSuccess && !result.error) {
                const mappedResult = {
                    ...result.result, options: {
                        customColor: newTodoModel.priorty.customColor,
                        id: newTodoModel.priorty.value,
                        name: newTodoModel.priorty.label
                    }
                }
                const newGeneralList = [...generalList, mappedResult]
                console.log('result', result)
                setGeneralList(newGeneralList)
                resetForm()
                navigation.goBack()
            }
        } catch (error) {
        } finally {
            setCreateLoading(false)
        }



    }
    const toggleAnimation = () => {
        const val = animationValue === 0 ? -1000 : 0
        Animated.timing(subPopupAnimation, {
            useNativeDriver: false,
            toValue: val,
            duration: 350
        }).start()
        setAnimationValue(val)
    }
    return (
        <CustomSafeAreaView barStyle='dark-content' statusBarColor={colors.pageBg} backgroundColor={colors.pageBg}>
            <Box p={space.p20} bg={colors.pageBg} onTouchStart={() => {

            }}>
                <Box >
                    <FormLabel title={Consts.newTodoTitle} />
                    <FormInput
                        value={newTodoModel.name}
                        ref={myInputRef}
                        placeholder={`${Consts.newTodoPlaceholder} ${EmojiConsts.smile}`}
                        showSoftInputOnFocus={true}
                        multiline={true}
                        isError={isError}
                        errorText={"Minimum 3 Karakter Girilmelidir ."}
                        returnKeyType='done'
                        onSubmitEditing={(e) => {
                        }}
                        onChangeText={(text) => {
                            text.trim().length === 0 && setDynamicHeight(sizes.height56)
                            onTodoNameChange(text);
                        }}
                        onContentSizeChange={(e) => {
                            e.nativeEvent.contentSize.height > sizes.height56 ? setDynamicHeight(e.nativeEvent.contentSize.height) : sizes.height56
                        }}
                        blurOnSubmit={true}
                        mb={space.mb20}
                        bg={colors.white}
                        width='100%'
                        borderRadius={radius.bsmall}
                        fontSize={font.size14}
                        maxHeight={200}
                        height={dynamicHeight}
                        borderColor={isExistTodo ? 'red' : colors.borderColor}
                        pl={space.pl16} py={space.pv17} pr={60} border={border.xsmall} color={colors.inputText}
                        showIndicator={isExistLoading}
                    />
                    {/* {isExistLoading === true && <ActivityIndicator color='red' size='small' style={{ position: 'absolute', right: 20, top: 42, }} />} */}

                </Box>
                <Box>
                    <FormLabel title={Consts.newTodoPriortyTitle} />
                    <Picker dataSourceUrl='options' defaultVal={null} isLoad={(val) => {
                        myInputRef.current.focus()
                    }} customCircle selectedValue={(val) => {
                        onFormChange('priorty', val)
                        Keyboard.dismiss();
                    }} />
                </Box>
                {/* <Box alignItems='center' justifyContent='center'>
                    <Button mt={space.mr20} onPress={() => {
                        Keyboard.dismiss();
                        toggleAnimation()
                    }}><Camera /></Button>
                </Box> */}

            </Box>
            <Box alignItems='center' justifyContent='center'>
                {imageList.length > 0 && <FormLabel title={`${route.params?.selectedAlbum ? route.params?.selectedAlbum.toUpperCase() + ' ' + 'Albümünden' : ''}  Seçilen Fotoğraflar`} />}
                {imageList.length > 0 && <Text> {imageList.length}</Text>}
                {cameraPhoto !== null && <FormLabel title={`Çekilen Fotoğraf`} />}

            </Box>
            <ScrollView style={{ padding: 10 }} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                {cameraPhoto !== null && <DeletablePhoto item={cameraPhoto} deletePhoto={(item) => {
                    deleteImage(item, 'single', setCameraPhoto)
                }} />}

                {imageList.length > 0 && imageList.map((item, index) => {
                    return (<DeletablePhoto key={index} deletePhoto={(item) => {
                        deleteImage(item, 'multiple', setImageList)
                    }} item={item} />)
                })}
            </ScrollView>
            {/* <SubPopup animation={subPopupAnimation} data={cameraOptions} onPressItem={(item) => {
                item.id === 0 ? toggleAnimation() : selectedPopupItem(item)
            }} /> */}
        </CustomSafeAreaView>
    );
}
export default ModalScreen;
import React, { useEffect, useState } from 'react';
import { Button, ImageBackground, Dimensions, View } from 'react-native';
import { Box, BoxCenter, CustomSafeAreaView, Text } from '../../components'
import Carousel from 'react-native-snap-carousel';
import { colors } from '../../theme'
import { useIsFocused } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import LottieView from 'lottie-react-native';


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

import axios from 'axios'
const Film = ({ navigation }) => {
    const [active, setActive] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isOffline, setOfflineStatus] = useState(false);
    const isFocused = useIsFocused();
    const fonts = ["BadScript-Regular", "Big-Regular", "ShadowsIntoLight-Regular", "Courgette-Regular", "Sacramento-Regular", "UbuntuMono-Regular", "Charmonman-Regular", "Merriweather-Regular", "Italianno-Regular", "NanumMyeongjo-Regular"]
    const [activeFont, setActiveFont] = useState("BadScript-Regular")



    const animationList = [
        "8176-love-hearts.json",
        "439-love-explosion.json",
        "4767-love.json",
        "7599-love.json",
        "8856-love.json",
        "40830-lovestruck-heart.json",
        "49032-love.json",
        "49895-love-icon.json",
        "51928-kiss.json",
        "52776-love-hearts.json"
    ]
    const [activeAnimation, setActiveAnimation] = useState()
    useEffect(() => {
        setActiveLang(languages[active])
        setActiveFont(fonts[active])
        setActiveAnimation(animationList[active])

    }, [active])

    const getAnimation = () => {
        let animation;
        switch (active) {
            case 0:
                return require(`../../animations/8176-love-hearts.json`)

            case 1:
                return require(`../../animations/439-love-explosion.json`)
            case 2:
                return require(`../../animations/4767-love.json`)
            case 3:
                return require(`../../animations/7599-love.json`)
            case 4:
                return require(`../../animations/8856-love.json`)
            case 5:
                return require(`../../animations/40830-lovestruck-heart.json`)
            case 6:
                return require(`../../animations/49032-love.json`)
            case 7:
                return require(`../../animations/49895-love-icon.json`)
            case 8:
                return require(`../../animations/51928-kiss.json`)
            case 9:
                return require(`../../animations/15440-love-heart.json`)
        }
    }

    const qList = [
        "search/photos?per_page=10&query=nature&client_id=Er-6qIVJqugN0c5COcIt48dXYt0CXG7VeYcj8p_rbhs",
        "search/photos?per_page=10&query=natural&client_id=Er-6qIVJqugN0c5COcIt48dXYt0CXG7VeYcj8p_rbhs",
        "search/photos?per_page=10&query=sun&client_id=Er-6qIVJqugN0c5COcIt48dXYt0CXG7VeYcj8p_rbhs",
        "search/photos?per_page=10&query=sea&client_id=Er-6qIVJqugN0c5COcIt48dXYt0CXG7VeYcj8p_rbhs",
        "search/photos?per_page=10&query=tree&client_id=Er-6qIVJqugN0c5COcIt48dXYt0CXG7VeYcj8p_rbhs",
        "search/photos?per_page=10&query=wild&client_id=Er-6qIVJqugN0c5COcIt48dXYt0CXG7VeYcj8p_rbhs",
        "search/photos?per_page=10&query=forest&client_id=Er-6qIVJqugN0c5COcIt48dXYt0CXG7VeYcj8p_rbhs",
        "search/photos?per_page=10&query=tower&client_id=Er-6qIVJqugN0c5COcIt48dXYt0CXG7VeYcj8p_rbhs",
        "search/photos?per_page=10&query=animals&client_id=Er-6qIVJqugN0c5COcIt48dXYt0CXG7VeYcj8p_rbhs",
        "search/photos?per_page=10&query=space&client_id=Er-6qIVJqugN0c5COcIt48dXYt0CXG7VeYcj8p_rbhs"]
    const baseUri = "https://api.unsplash.com/"


    const languages = ["Seni Seviyorum", "I Love You ❤️", "Я люблю вас ❤️", "Te quiero ❤️", "사랑해 ❤️", "אני אוהב אותך ❤️", "ich liebe dich ❤️", "ti amo ❤️", "Je vous aime ❤️", "Szeretlek ❤️"]

    const [activeLang, setActiveLang] = useState(languages[0])
    const [images, setImages] = useState([])
    useEffect(() => {
        if (isFocused === true && isOffline === false) {
            setIsLoading(true)
            axios.get(baseUri + qList[Math.floor(Math.random() * 10)]).then((response) => {
                const { results } = response.data

                const list = results.map((item) => {
                    return {
                        id: item?.id,
                        uri: item?.urls?.full
                    }
                })
                setIsLoading(false)
                setImages(list)
            }).catch((err) => {
                console.log('error', err)
            })
        }
    }, [isFocused, isOffline])
    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
        });
        return () => removeNetInfoSubscription();
    }, []);

    const renderItem = ({ item }) => {
        console.log('değişti')
        return (
            <View style={{
                backgroundColor: 'floralwhite',
                borderRadius: 5,
                height: ITEM_HEIGHT,
                marginTop: 50,
                marginLeft: 25,
                marginRight: 25,
            }}>
                <ImageBackground style={{ flex: 1, width: "100%", height: "100%", borderRadius: 10 }} source={{ uri: item.uri }} />
            </View>
        )
    }


    const renderBody = () => {
        return (
            <>

                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}>
                    <Carousel
                        layout={"default"}
                        data={images}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        renderItem={renderItem}
                        useScrollView={true}
                        onSnapToItem={(index) => {
                            setActive(index)
                        }} />
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text fontFamily={activeFont} fontSize="25" >{activeLang}</Text>


                </View>
                <View style={{ flex: 1 }}>
                    <LottieView
                        source={getAnimation()}

                        autoPlay
                        loop
                    />
                </View>
            </>
        )
    }
    return (
        <CustomSafeAreaView barStyle='dark-content' statusBarColor={colors.pageBg} backgroundColor={colors.pageBg}>
            {images.length > 0 && renderBody()}
            {isLoading && <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Lütfen Bekleyin ..</Text>
            </View>}

        </CustomSafeAreaView>
    );
};
export default Film;

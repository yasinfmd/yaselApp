import React, { useEffect, useState } from 'react';
import { Button, TouchableOpacity } from 'react-native';

import { Box, CustomSafeAreaView, Text } from '../../components'
import RNShake from 'react-native-shake';
import Share from 'react-native-share';
const Discover = ({ navigation }) => {


    const fonts = ["BadScript-Regular", "Big-Regular", "ShadowsIntoLight-Regular", "Courgette-Regular", "Sacramento-Regular", "UbuntuMono-Regular", "Charmonman-Regular", "Merriweather-Regular", "Italianno-Regular", "NanumMyeongjo-Regular"]
    const [activeFont, setActiveFont] = useState("BadScript-Regular")
    const [color, setColor] = useState("#ffffff")
    useEffect(() => {
        RNShake.addListener(() => {
            setColor(getRandomColor())
            setActiveFont(fonts[Math.floor(Math.random() * 10)])
        });
        () => RNShake.removeListener();
    }, [])
    const pickTextColorBasedOnBgColorAdvanced = (bgColor, lightColor, darkColor) => {
        var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
        var r = parseInt(color.substring(0, 2), 16); // hexToR
        var g = parseInt(color.substring(2, 4), 16); // hexToG
        var b = parseInt(color.substring(4, 6), 16); // hexToB
        var uicolors = [r / 255, g / 255, b / 255];
        var c = uicolors.map((col) => {
            if (col <= 0.03928) {
                return col / 12.92;
            }
            return Math.pow((col + 0.055) / 1.055, 2.4);
        });
        var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
        return (L > 0.179) ? darkColor : lightColor;
    }
    const getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    return (
        <CustomSafeAreaView barStyle={pickTextColorBasedOnBgColorAdvanced(color, "#ffffff", "#000000") === "#ffffff" ? "light-content" : "dark-content"} statusBarColor={color} backgroundColor={color}>
            <Box style={{ flex: 1, backgroundColor: color }} alignItems="center" justifyContent="center">
                <Text fontSize="25" fontFamily={activeFont} color={pickTextColorBasedOnBgColorAdvanced(color, "#ffffff", "#000000")}  > Renk Kodu : {color}</Text>

                <TouchableOpacity onPress={() => {
                    Share.shareSingle({
                        title: "Bu Rengi Paylaş",
                        message: color,
                        failOnCancel: true,
                        social: Share.Social.WHATSAPP
                    })
                }}>
                    <Text fontSize={14} fontFamily={activeFont} color={pickTextColorBasedOnBgColorAdvanced(color, "#ffffff", "#000000")} >Paylaş </Text>
                </TouchableOpacity>
            </Box>
        </CustomSafeAreaView>
    );
};
export default Discover;

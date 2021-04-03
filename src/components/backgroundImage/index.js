import React from 'react'
import { ImageBackground } from 'react-native';
const defaultStyle = {
    width: '100%',
    height: '100%',
    flex: 1,
}
const BackgroundImage = ({ image, radius, ...props }) => {
    return (
        <ImageBackground style={defaultStyle}
            imageStyle={{ borderRadius: radius ? radius : null }}
            resizeMode='cover'
            source={image}>
        </ImageBackground>
    )
}
export default BackgroundImage
import React, { useEffect, useState, useRef } from 'react'
import { Animated } from 'react-native';
import { LogBox } from 'react-native';

//components
import { BoxRow, Tab } from '../../components'

//icons
import { Heart, Shuffle, Video } from '../../components/icons'

//theme
import { colors, space } from '../../theme/index'


LogBox.ignoreAllLogs();
function TabBar({ state, descriptors, navigation }) {
    console.log('state', state)
    const [activeRouteIndex, setActiveRouteIndex] = useState(state.index)
    const paddingAnimation = useRef(new Animated.Value(0)).current;
    const marginAnimation = useRef(new Animated.Value(space.m400)).current;
    useEffect(() => {
        Animated.timing(paddingAnimation, {
            toValue: space.p10,
            duration: 2200
        }).start()
    }, [paddingAnimation])
    useEffect(() => {
        Animated.timing(marginAnimation, {
            toValue: space.zero,
            duration: 2200
        }).start()
    }, [marginAnimation])

    const onPress = (route, activeRouteIndex) => {
        setActiveRouteIndex(activeRouteIndex);
        navigation.navigate(route.name);
    };
    const renderTab = () => {
        return state.routes.map((route, index) => {
            return index === 1 ? <Tab key={index} custom={true} component={<Heart />} route={route} index={index} onPress={onPress} /> : <Tab activeIndex={activeRouteIndex} key={index} custom={false} component={index === 0 ? <Shuffle /> : <Video />} route={route} index={index} onPress={onPress} />
        })
    }

    return (
        <BoxRow as={Animated.View} bg={colors.white} style={{
            shadowColor: "#000",
            paddingBottom: paddingAnimation,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            marginLeft: marginAnimation,
        }}  >
            {renderTab()}
        </BoxRow >
    );
}

export default TabBar;

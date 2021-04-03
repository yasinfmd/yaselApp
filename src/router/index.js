import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabRouters } from './consts'

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
import { View, Text, SafeAreaView } from 'react-native'
import TabBar from '../components/tab-bar'

//pages
import Home from '../screens/home'

import Box from '../components/box'
function DetailsScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Şimdi Geri Dön </Text>
        </View>
    );
}

export const HomeStackRouter = () => {
    return (
        <HomeStack.Navigator headerMode="none">
            <HomeStack.Screen name='Seni Seviyorum Yavru 👅' component={Home} />
            <HomeStack.Screen name='Detail' component={DetailsScreen} />
        </HomeStack.Navigator>
    )
}




const Routers = () => {
    return (
        <Box flex={1} as={SafeAreaView} >
            <NavigationContainer>
                <Tab.Navigator initialRouteName='Home' tabBar={props => <TabBar {...props} />}>
                    {TabRouters.map((item, index) => {
                        return (
                            <Tab.Screen key={index} name={item.name} component={item.component} />
                        )
                    })}

                </Tab.Navigator>
            </NavigationContainer>
        </Box>
    )
}

export default Routers;
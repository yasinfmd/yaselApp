import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

//pages
import Home from '../screens/home'

//stack
const HomeStack = createStackNavigator();

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
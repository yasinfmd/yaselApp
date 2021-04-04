import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
//Pages
import ModalScreen from '../screens/newItemModal'
//Stack
const RootStack = createStackNavigator();

import { HomeStackRouter } from './homeStack'
export const RootStackScreen = () => {
    return (
        <RootStack.Navigator mode="modal">
            <RootStack.Screen
                name="Main"
                component={HomeStackRouter}
                options={{ headerShown: false }}
            />
            <RootStack.Screen name="newItemModal" component={ModalScreen} />
        </RootStack.Navigator>
    );
}
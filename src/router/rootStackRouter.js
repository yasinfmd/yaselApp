import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { colors } from '../theme'

import { BackButton, HeaderRightSave } from '../components'

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
            <RootStack.Screen name="newItemModal" component={ModalScreen} options={({ route, navigation }) => ({
                title: 'Seni  Seviyorum ❤️  ',
                headerTitleStyle: {
                    fontFamily: 'BadScript-Regular'
                },
                headerTintColor: colors.titleColor,
                headerTitleAlign: 'center',
                headerLeft: () => {
                    return (
                        <BackButton navigation={navigation} />
                    )
                },
                headerRight: () => (
                    <HeaderRightSave navigation={navigation} />
                ),
                headerStyle: {
                    backgroundColor: colors.pageBg,
                    shadowColor: 'transparent'

                },
            })} />
        </RootStack.Navigator>
    );
}
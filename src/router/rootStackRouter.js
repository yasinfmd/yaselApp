import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { radius, colors } from '../theme'

import { Button } from '../components'

import { Back } from '../components/icons'
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
                        <Button size={46} onPress={() => { navigation.goBack() }} bg={colors.pageBg} borderRadius={radius.full} alignItems='center' justifyContent='center'>
                            <Back />
                        </Button>
                    )
                },
                // headerRight: () => (
                //     <Button bg='red' size={30}
                //         onPress={() => alert('This is a button!')}

                //     />
                // ),
                headerStyle: {
                    backgroundColor: colors.pageBg,
                    shadowColor: 'transparent'

                },
            })} />
        </RootStack.Navigator>
    );
}
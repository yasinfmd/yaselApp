/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import PushNotification from "react-native-push-notification";

PushNotification.configure({
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    },

    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    },

    onRegistrationError: function (err) {
        console.error(err.message, err);
    },
    popInitialNotification: true,

    requestPermissions: Platform.OS === 'ios',
});
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

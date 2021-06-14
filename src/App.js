import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRouter from './router';
import Sound from 'react-native-sound';
let customInterval;
import { MainProvider } from "./context/Main/store"
import { OptionsProvider } from "./context/Options/store"
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging'
import PushNotification, { Importance } from 'react-native-push-notification';
import { createToken } from './service/home';
const App = () => {
  const showNotification = (channelId, options) => {
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: channelId, // (required) channelId, if the channel doesn't exist, notification will not trigger.
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
      largeIconUrl: "https://cdn3.iconfinder.com/data/icons/supermario/PNG/Retro-Flower---Yoshi.png", // (optional) default: undefined
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText", // (optional) default: none
      bigLargeIcon: "ic_launcher", // (optional) default: undefined
      bigPictureUrl: options.bigPictureUrl,
      bigLargeIconUrl: "https://cdn3.iconfinder.com/data/icons/supermario/PNG/Retro-Flower---Yoshi.png", // (optional) default: undefined
      color: "purple", // (optional) default: system default
      vibrate: true, // (optional) default: true
      title: "Hey  Görev Eklendi Göz At 👀", // (optional)
      message: options.message, // (required)
      soundName: "default",

    });
  }
  const createChannel = (channelId) => {
    PushNotification.createChannel(
      {
        channelId: channelId, // (required)
        channelName: "My channel", // (required)
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
  useEffect(() => {
    messaging().getToken(firebase.app().options.messagingSenderId).then((token) => {
      //token db yaz
      createToken('createDeviceToken', { token: token }).then((res) => {
        console.log('res', res)
      })
    })
    const unsubscribe = messaging().onMessage(async remoteMsg => {
      const channelId = Math.random().toString(36).substring(7)
      createChannel(channelId)
      showNotification(channelId, { bigPictureUrl: remoteMsg.notification.android.imageUrl, message: remoteMsg.notification.body })
      //normal bildirim geldiginde

    })
    messaging().setBackgroundMessageHandler(async remoteMsg => {
      //
      console.log("arkaplanda", remoteMsg)
    })
    return unsubscribe
  }, [])
  useEffect(() => {
    const sound = new Sound('start.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      sound.play(success => {
        if (success) {
          console.log('success');
        } else {
          console.log('error');
        }
      });
    });
    sound.setVolume(1);

    customInterval = setTimeout(() => {
      SplashScreen.hide();
      sound.stop(() => { });
    }, 2000);
    return () => {
      clearInterval(customInterval);
    };
  }, []);
  return (
    <>
      <MainProvider>
        <OptionsProvider>
          <SafeAreaProvider>
            <AppRouter />
          </SafeAreaProvider>
        </OptionsProvider>
      </MainProvider>
    </>
  );
};
export default App;

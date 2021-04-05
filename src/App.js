import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRouter from './router';
import Sound from 'react-native-sound';
let customInterval;
import { MainProvider } from "./context/Main/store"
const App = () => {
  useEffect(() => {
    const sound = new Sound('startmusic.mp3', Sound.MAIN_BUNDLE, error => {
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
    sound.setNumberOfLoops(-1);
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
        <SafeAreaProvider>
          <AppRouter />
        </SafeAreaProvider>
      </MainProvider>
    </>
  );
};
export default App;

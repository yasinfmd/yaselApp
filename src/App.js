import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRouter from './router';
import Sound from 'react-native-sound';
let customInterval;
import { MainProvider } from "./context/Main/store"
import { OptionsProvider } from "./context/Options/store"

const App = () => {
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

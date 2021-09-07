import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import { LogBox, I18nManager } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { TypoGraphy } from './utils/TypoGraphy';
import { enableScreens } from "react-native-screens";
import AppNavigator from './navigation/AppNavigator';
import { GlobalContextProvider } from "./context/GlobalContext";
import theme from "./constants/theme";
enableScreens();
const reTheme = {
  Button: {
    titleStyle: {
      fontFamily: theme.defaultFontFamily,
    }
  },
  Text: {
    style: {
      fontFamily: theme.defaultFontFamily,
    }
  },
  Input: {
    style: {
      fontFamily: theme.defaultFontFamily,
    },
    labelStyle: { fontFamily: theme.defaultFontFamily },
    errorStyle: { fontFamily: theme.defaultFontFamily }
  }
};
const fetchFonts = () => {
  return Font.loadAsync({
    'Benyamin': require('./assets/fonts/benyamin.ttf'),
    'Nazanin': require('./assets/fonts/bnazanin.ttf')
  });
};

export default function App() {
  LogBox.ignoreAllLogs();
  const [fontLoaded, setFontLoaded] = useState(false);
  let colorScheme = useColorScheme();
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }
  I18nManager.forceRTL(true);
  TypoGraphy();
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={reTheme} useDark={colorScheme === 'dark'}>
        <GlobalContextProvider>
          <AppNavigator />
        </GlobalContextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );

}

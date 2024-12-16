import { Stack } from "expo-router";
import { 
	Montserrat_300Light,
	Montserrat_400Regular,
	Montserrat_600SemiBold,
	Montserrat_700Bold, 
	useFonts 
} from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';


SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
	  <Stack>
	  	<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
	  </Stack>
  );
}


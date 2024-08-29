import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import UserProvider from '@/components/UserProvider';
import {LinearGradient} from 'expo-linear-gradient';

SplashScreen.preventAutoHideAsync();
const RootLayout = () => {

    const [fontsLoaded, error] = useFonts({
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });


    useEffect(()=> {
        if(error) throw error;
        if(!fontsLoaded) {
            SplashScreen.hideAsync();
        }
    },[fontsLoaded,error])

    if(!fontsLoaded) {

      return (
        <LinearGradient className=" h-full"
          colors={['#e35634', '#feb47b']}
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }}
          locations={[0,0.75]}
        >
          <View
              className=" flex flex-1 items-center justify-center h-full w-full z-10 absolute"
            >
            <ActivityIndicator
              animating
              color="#fff"
              size="large"
            />
          </View>
        </LinearGradient>
      )
    }

  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name='index' options={{headerShown:false}} />
        <Stack.Screen name='(tabs)' options={{headerShown:false}} />
        <Stack.Screen name='(auth)' options={{headerShown:false}} />
        <Stack.Screen name='drinks' options={{headerShown:false}} />
        <Stack.Screen name='mealItem' options={{headerShown:false}} />
        <Stack.Screen name='drinkItem' options={{headerShown:false}}/>
        <Stack.Screen name='meal' options={{headerShown:false}}/>
        <Stack.Screen name='drink' options={{headerShown:false}}/>

      </Stack>
      {/* <Slot /> */}
    </UserProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})

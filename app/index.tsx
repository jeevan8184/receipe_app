import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import {LinearGradient} from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import {images} from "../constants";
import CustomButton from '@/components/CustomButton';
import { Link, router, SplashScreen } from 'expo-router';
import { UserContext } from '@/components/UserProvider';

const AppPage = () => {

  const {currUser}=useContext(UserContext);


  useEffect(()=> {
    if(currUser) {
      console.log("currUser",currUser);
      setTimeout(()=> router.replace("/home"),1000);
      router.replace("/home");
    }
  },[currUser]);

  const ring1=useSharedValue(0);
  const ring2=useSharedValue(0);
  const scale = useSharedValue(0.5);
  const rotate = useSharedValue(-45);

  useEffect(()=> {

    ring1.value=0;
    ring2.value=0;
    setTimeout(()=> ring1.value=withSpring(ring1.value+Dimensions.get("screen").height,{damping:5,mass:1,stiffness:90}),500);
    setTimeout(()=> ring1.value=withSpring(ring2.value+Dimensions.get("screen").height,{damping:5,mass:1,stiffness:90}),700);
    scale.value = withSpring(1, { damping: 5,mass:1, stiffness: 90});
    rotate.value = withSpring(0, { damping: 5,mass:1, stiffness: 90 });
  },[]);


  return (
    <LinearGradient className=" h-full"
      colors={['#e35634', '#feb47b']}
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 1 }}
      locations={[0,0.75]}
    >
      <View className=" flex items-center justify-center h-full w-full px-4">
        <Animated.View className=" p-5 bg-orange-300 rounded-full" style={{padding:ring1}}>
          <Animated.View className=" p-4 bg-orange-200 rounded-full" style={{padding:ring2}}>
            <Animated.Image
              source={images.receipe}
              resizeMode='cover'
              className="h-64 w-64 rounded-full overflow-hidden"
              style={{scaleX:scale,scaleY:scale,rotation:rotate}}
            />
          </Animated.View>
        </Animated.View>
        <View className=" pt-4 relative">
          <Text className=" space-y-2 my-4 px-2 text-white text-xl font-[600] text-center">Explore tasty recipes and cook with ease!</Text>
          <Text className=" space-y-4 text-orange-600 text-4xl text-center font-[700]">Receipe App</Text>
          <Image
            source={images.path}
            resizeMode='contain'
            className=" w-[136px] h-[20px] absolute -bottom-3 right-6"
          />
        </View>
        {!currUser && (
          <CustomButton
            title='Get started with Email'
            otherStyles=' w-full mt-20 bg-orange-500'
            textStyles=''
            handleChange={()=> router.replace("/sign-in")}
          />
        )}
        {/* <Link href="/home" className=' w-full my-4 px-2 py-3 rounded-xl bg-red-500 text-center text-white text-lg'>Home</Link> */}
      </View>
      <StatusBar style='auto' backgroundColor='#161622' />
    </LinearGradient>
  )
}

export default AppPage

const styles = StyleSheet.create({})

import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { UserContext } from '@/components/UserProvider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const {setCurrUser,setIsLogged}=useContext(UserContext);
  const [form, setForm] = useState({
    email:"",
    password:""
  });

  const handlePress=async()=>{
    console.log("form",form);
    try {
      setIsLoading(true);
      if(form.email==="" || form.password==="") {
        Alert.alert("provide all the fields");
        return;
      }
      const response=await axios.post("http://192.168.29.208:5000/api/user/signin",{
        email:form.email,
        password:form.password
      })
      console.log("response",response.data);
      if(response.data?.error) {
        return Alert.alert(response.data?.error);
      }else{
        setCurrUser(response.data);
        await AsyncStorage.setItem("id",JSON.stringify(response.data._id));
        setIsLogged(true);
        Alert.alert("Signed in successfully");
        router.replace("/home");
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }
    
  return (

    <SafeAreaView className=" h-full w-full bg-stone-200">
        <ScrollView>
          <View className=" flex flex-col px-4 py-6 pt-20">
            <View className=" flex items-center justify-center">
              <View className=" p-0.5 bg-orange-300 rounded-full">
                <View className=" p-0.5 bg-orange-200 rounded-full">
                  <ImageBackground
                    source={images.receipe}
                    resizeMode='cover'
                    className=" h-20 w-20 rounded-full overflow-hidden"
                  />
                </View>
              </View>
              <View className=" pt-1">
                <Text className=" space-y-2 text-orange-600 text-2xl font-pbold">Receipe App</Text>
                <Image
                  source={images.path}
                  resizeMode='contain'
                  className=" w-[136px] h-[15px] absolute -bottom-2 -right-10"
                />
              </View>
            </View>

            <View className=" h-full w-full flex flex-col pt-2">
              <View className=" flex items-center justify-center">
                <Text className=" text-2xl text-secondary-100 font-psemibold">SignIn</Text>
              </View>
              <View className=" flex flex-col">
                <FormField
                  title='Email'
                  value={form.email}
                  handleTextChange={(e)=> setForm({...form,email:e})}
                  placeholder='hello@gmail.com'
                  otherStyles='mt-2'
                />
                <FormField
                  title='Password'
                  value={form.password}
                  handleTextChange={(e)=> setForm({...form,password:e})}
                  placeholder=''
                  otherStyles='mt-4'
                />
                <TouchableOpacity className=" mt-2 items-end">
                  <Text className=" text-base text-blue-500 font-psemibold px-3">Forgot password</Text>
                </TouchableOpacity>
                <CustomButton
                  title='Sign In'
                  handleChange={handlePress}
                  otherStyles=' mt-5'
                  textStyles=''
                  isLoading={isLoading}
                />
                <View className=" mt-4 text-center">
                  <Text className=" text-lg text-center">Dont have an Account ? {" "} 
                    <Link href="/sign-up" className=" text-secondary-100 font-pmedium">Sign Up</Link>
                  </Text>
                </View>
              </View>
            </View>

          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})

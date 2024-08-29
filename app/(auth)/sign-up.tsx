import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import axios from 'axios';
import { UserContext } from '@/components/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const {setCurrUser,setIsLogged}=useContext(UserContext);

  const [form, setForm] = useState({
    email:"",
    password:"",
    username:""
  });

  const handleChange=async()=>{

    try {
      if(form.email==="" || form.password==="" || form.username==="") {
        return Alert.alert("provide all the fields");
      }
      console.log("form",form);
  
      const response=await axios.post("http://192.168.29.208:5000/api/user/signup",{
        username:form.username,
        email:form.email,
        password:form.password
      })
      if(response.data?.error) {
        return Alert.alert(response.data?.error);
      }else{
        setCurrUser(response.data);
        await AsyncStorage.setItem("id",JSON.stringify(response.data._id));
        setIsLogged(true);
        Alert.alert("Signed up successfully");
        router.replace("/setProfile");
      }
      console.log("response",response.data);
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }
    
  return (

    <SafeAreaView className=" h-full w-full bg-stone-200">
        <ScrollView>
          <View className=" flex flex-col px-4 py-6 pt-8">
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
                <Text className=" text-2xl text-secondary-100 font-psemibold">SignUp</Text>
              </View>
              <View className=" flex flex-col">
                <FormField
                  title='Username'
                  value={form.username}
                  handleTextChange={(e)=> setForm({...form,username:e})}
                  placeholder=''
                  otherStyles='mt-4'
                />
                <FormField
                  title='Email'
                  value={form.email}
                  handleTextChange={(e)=> setForm({...form,email:e})}
                  placeholder='hello@gmail.com'
                  otherStyles='mt-4'
                />
                <FormField
                  title='Password'
                  value={form.password}
                  handleTextChange={(e)=> setForm({...form,password:e})}
                  placeholder=''
                  otherStyles='mt-4'
                />
                <CustomButton
                  title='Sign Up'
                  handleChange={handleChange}
                  otherStyles=' mt-4'
                  textStyles=''
                  isLoading={isLoading}
                />
                <View className=" mt-4 text-center">
                  <Text className=" text-lg text-center">Already have an Account ? {" "} 
                    <Link href="/sign-in" className=" text-secondary-100 font-pmedium">Sign In</Link>
                  </Text>
                </View>
              </View>
            </View>

          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({})

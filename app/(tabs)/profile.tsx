import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserContext } from '@/components/UserProvider'
import { icons } from '@/constants'
import { StatusBar } from 'expo-status-bar'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Redirect, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = () => {

  const {currUser,setCurrUser,setIsLogged}=useContext(UserContext);

  if(!currUser) {
    console.log("no user");
    router.replace("/sign-in");
  }

  return (
    <SafeAreaView className=" h-full bg-primary">
      <ScrollView>
        <View className=" px-4 py-6 flex flex-1 overflow-hidden">
          <View className=" flex flex-col">
            <Text className=" text-2xl  text-white font-psemibold space-y-2 text-center">Your Profile</Text>
            <View className=" mt-5 relative flex items-center justify-center">
              <View className=" h-56 w-56 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                    source={{uri:currUser?.photo}}
                    className=" h-full w-full z-0"
                    resizeMode='cover'
                />
              </View>
              <TouchableOpacity 
                className="rounded-full absolute bottom-0 right-16 overflow-hidden" 
                onPress={()=> router.push("/update")}
                activeOpacity={0.6}
              >
                <View className=" bg-gray-600 px-2 py-0.5 flex flex-row items-center">
                  <Icon name="edit" size={26} style={{color:"white"}} color="#000" />
                  <Text className="  text-white ml-1">Edit</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className=" mt-4 px-2 py-4 bg-gray-950  rounded-xl">
              <View className=" flex flex-row gap-1 items-center">
                <Text className=" text-base font-pmedium text-white">Username : {" "}</Text>
                <Text className=" text-lg font-pregular text-secondary-100">{currUser?.username}</Text>
              </View>
              <View className=" flex flex-row gap-1 items-center">
                <Text className=" text-base font-pmedium text-white">MobileNo : {" "}</Text>
                <Text className=" text-lg font-pregular text-white">{currUser?.phoneNo}</Text>
              </View>
              <View className="flex flex-row gap-1 items-start w-64 whitespace-normal">
                <Text className=" text-base font-pmedium overflow-x-visible text-white">Your bio : {" "}</Text>
                <Text className=" text-base text-white">{currUser?.bio}</Text>
              </View>
              <View className=" overflow-hidden items-start">
                <TouchableOpacity
                  className=" flex flex-row items-center px-8 py-2 bg-red-500/20 rounded-xl my-2 mt-3"
                  onPress={()=> (
                    Alert.alert("Logout","Are you sure you want to logout ?",[
                      {
                        text:"Cancel",
                        onPress:()=> {},
                        style:"cancel"
                      },
                      {
                        text:"Logout",
                        onPress:async()=> {
                          await AsyncStorage.removeItem("id");
                          setCurrUser(null);
                        },
                        style:"destructive"
                      },
                    ],
                    {cancelable:true}
                  )
                  )}
                >
                  <Image  
                    source={icons.logout}
                    className=" h-6 w-6"
                    resizeMode='contain'
                  />
                  <Text className=" text-red-500 text-lg ml-3">Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})

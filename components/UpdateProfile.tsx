import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '@/constants';
import * as ImagePicker from "expo-image-picker";
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { BottomSheetModal,BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { StatusBar } from 'expo-status-bar';
import {BlurView} from 'expo-blur';
import Icon from 'react-native-vector-icons/Ionicons';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { UserContext } from '@/components/UserProvider';
import axios from 'axios';
import Loader from '@/components/Loader';

const UpdateProfile = ({type}:{type:"add" | "update"}) => {
    
    const {setCurrUser,setIsLogged,currUser}=useContext(UserContext);
    const [form, setForm] = useState({
        photo:currUser.photo,
        phoneNo:currUser.phoneNo,
        receipe:currUser.receipe,
        bio:currUser.bio,
        username:currUser?.username
    });
    const [isLoading, setIsLoading] = useState(false);
    const btmRef=useRef(null);
    const snapPoints = ["10%","25%"];
    const [isOpen, setIsOpen] = useState(false);

    const handlePresentModal = () => {
        btmRef.current?.present();
        setTimeout(() => setIsOpen(true), 100);
    };

    useEffect(() => {
        (async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Sorry, we need permissions to make this work!');
          }
        })();
    }, []);

    const openPicker=async()=>{
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });
            if(!result.canceled) {
                setForm({...form,photo:result.assets[0].uri});
                setIsOpen(false);
                btmRef.current?.close();

                console.log("result",result);
            }else{
                setTimeout(()=> Alert.alert("Document picked",JSON.stringify(result,null,2)),150);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const openCamera=async()=>{

        try {
            const {status}=await ImagePicker.requestCameraPermissionsAsync();
            if(status !="granted") {
                Alert.alert("Sorry , we need camera roll permissions to make this work");
            }
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1,
            });
            if(!result.canceled) {
                setForm({...form,photo:result.assets[0].uri});
                setIsOpen(false);
                btmRef.current?.close();

                console.log("result",result);
            }else{
                setTimeout(()=> Alert.alert("Document picked",JSON.stringify(result,null,2)),150);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange=async()=>{

        try {
            setIsLoading(true);
            const response=await axios.post("http://192.168.29.208:5000/api/user/update",{
                username:form.username,
                photo:form.photo ? form.photo : images.profile ,
                phoneNo:form.phoneNo,
                receipe:form.receipe,
                bio:form.bio,
                id:currUser?._id
            })
            if(response.data?.error) {
                return Alert.alert(response.data?.error);
            }else{
                setCurrUser(response.data);
                if(type==="add") router.replace("/home");
                else router.back();
            }
            console.log("update",response.data);
        } catch (error) {
          console.log(error);
        }finally{
          setIsLoading(false);
        }
    }

    if(!images.profile) return <Loader />

  return (
    <GestureHandlerRootView>
        <BottomSheetModalProvider>
        <SafeAreaView className="h-full" style={{backgroundColor:isOpen ? "gray":"white"}}>
        {isOpen && (
            <BlurView
              intensity={100}
              style={styles.blurContainer}
              experimentalBlurMethod='dimezisBlurView'
            />
        )}
        <ScrollView>
            <View className=" px-4 flex-grow flex flex-col py-10">
                <Text  className=" text-center text-2xl font-pmedium">{type==="add" ? "Add your Profile":"Update your Profile"}</Text>
                <View className="">
                    <View className=" mt-5 relative flex items-center justify-center">
                        <View className=" h-56 w-56 rounded-full overflow-hidden flex items-center justify-center">
                            <Image
                                source={form.photo ? {uri:form.photo} : images.profile}
                                className=" h-full w-full z-0"
                                resizeMode='cover'
                            />
                        </View>
                        <TouchableOpacity 
                            className={`${isOpen ? " bg-black-100 backdrop-blur-0 opacity-50":" bg-white"} rounded-full absolute bottom-0 right-20 overflow-hidden`} 
                            onPress={handlePresentModal}
                            activeOpacity={0.6}
                        >
                            <Image
                                source={icons.plus}
                                className=" h-8 w-8 bg-black-100 rounded-full p-5 z-0"
                                resizeMode='contain'
                                tintColor="white"
                            />
                        </TouchableOpacity>
                        <BottomSheetModal
                            ref={btmRef}
                            index={1}
                            snapPoints={snapPoints}
                            onDismiss={() => setIsOpen(false)}
                            className=" rounded-3xl"
                        >
                            <View className=" rounded-3xl flex flex-col space-y-4 px-6">
                                <Text className=" font-pmedium ml-2">Upload photo</Text>
                                <TouchableOpacity 
                                    activeOpacity={0.6} 
                                    className=" px-2 py-2.5 rounded-xl w-full bg-stone-100 items-center flex flex-row"
                                    onPress={openCamera}
                                >
                                    <Icon name='camera' size={30} className="" />
                                    <Text className=" ml-4 text-base font-pmedium">Use Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    activeOpacity={0.6} 
                                    className=" px-2 py-2.5 rounded-xl w-full bg-stone-100 items-center flex flex-row"
                                    onPress={openPicker}
                                >
                                    <Icon name='image' size={30} className="" />
                                    <Text className=" ml-4 text-base font-pmedium">Choose from Gallery</Text>
                                </TouchableOpacity>
                            </View>
                        </BottomSheetModal>
                    </View>
                    <View className=" mt-7">
                        <FormField
                            title='Username'
                            otherStyles='mt-2'
                            value={form.username}
                            handleTextChange={(e)=> setForm({...form,username:e})}
                            placeholder=''
                        />
                        <FormField
                            title='Mobile No'
                            otherStyles='mt-5'
                            value={form.phoneNo}
                            handleTextChange={(e)=> setForm({...form,phoneNo:e})}
                            type='numeric'
                            icon='phone'
                            placeholder='+91 '
                        />
                        <FormField
                            title='Favourite reciepe'
                            otherStyles='mt-5'
                            value={form.receipe}
                            handleTextChange={(e)=> setForm({...form,receipe:e})}
                            placeholder='eg : Pasta'
                        />
                        <FormField
                            title='Add your bio'
                            otherStyles='mt-5'
                            value={form.bio}
                            handleTextChange={(e)=> setForm({...form,bio:e})}
                            placeholder='I love variety of receipies'
                            inputType='area'
                        />
                        <CustomButton
                            title={type==="add" ? "Add Profile" : "Update Profile"}
                            isLoading={isLoading}
                            handleChange={handleChange}
                            otherStyles=' mt-5 bg-blue-500'
                        />
                        <CustomButton
                            title={type==="add" ? "Skip Now" : "Cancel"}
                            handleChange={()=> type==="add" ? router.replace("/home") : router.back()}
                            otherStyles=' mt-2 bg-stone-300'
                            textStyles='text-black'
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
        <StatusBar style='auto' />
        </SafeAreaView>
        </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
    blurContainer: {
        overflow: 'hidden',
        borderRadius: 20,
    },
})

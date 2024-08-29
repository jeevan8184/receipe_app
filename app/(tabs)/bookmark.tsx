
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RecBookmark from '@/components/RecBookmark';
import DrinkBookmark from '@/components/DrinkBookmark';

const Bookmark = () => {

  const [activeItem, setActiveItem] = useState<"meals" | "drinks">("meals");

  return (
    <SafeAreaView className=" h-full w-full bg-primary">
        <ScrollView>
            <View className="px-4 my-6 h-full w-full">
                <Text className=" text-center text-2xl font-psemibold text-secondary-100">Your Bookmarks</Text>
                <View className=" flex flex-row my-2 mx-2">
                  <TouchableOpacity className="" onPress={()=> setActiveItem("meals")}>
                    <Text className={`text-[17px]  px-6 rounded-xl py-1 font-pmedium ${activeItem==="meals" ? " text-amber-500 bg-amber-500/20":" text-white"}`}>Meals</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className=" " onPress={()=> setActiveItem("drinks")}>
                    <Text className={`text-[17px] px-6 rounded-xl py-1 font-pmedium ${activeItem==="drinks" ? " text-amber-500 bg-amber-500/20":" text-white"}`}>Drinks</Text>
                  </TouchableOpacity>
                </View>
                {activeItem==="meals" ? (
                  <RecBookmark />
                ):(
                  <DrinkBookmark />
                )}
            </View>
        </ScrollView>
        <StatusBar style='light' />
    </SafeAreaView>
  )
}

export default Bookmark

const styles = StyleSheet.create({})



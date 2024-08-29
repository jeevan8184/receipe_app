import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import MealCatItems from '@/components/MealCatItems';
import { MaterialIcons } from '@expo/vector-icons'

const MealSearch = () => {

    const {catName}=useLocalSearchParams();
    if(!catName) return;

    const [activeState, setActiveState] = useState<any>({strCategory:catName});
    
  return (
    <SafeAreaView className=" h-full bg-primary">
        <ScrollView>
            <View className=" px-4 my-4 flex flex-col">
              <TouchableOpacity className=" mb-1" onPress={()=> router.back()}>
                  <MaterialIcons name="chevron-left" size={32} color="white" />
              </TouchableOpacity>
              <View className=" flex flex-row mb-2 items-center">
                <Text className=" text-white ml-3 text-lg font-pmedium">Recipies</Text>
                <MaterialIcons name="chevron-right" size={22} color="white" />
                <Text className=" text-secondary  ml-1 text-lg font-pmedium">{activeState?.strCategory}</Text>
              </View>
              <MealCatItems activeReceipe={activeState} setActiveReceipe={setActiveState} />
            </View>
        </ScrollView>
        <StatusBar style='light' />
    </SafeAreaView>
  )
}

export default MealSearch

const styles = StyleSheet.create({})


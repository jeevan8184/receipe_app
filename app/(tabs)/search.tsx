import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router'
import axios from 'axios'
import { Image } from 'react-native'

const Search = () => {

  const [text, setText] = useState("");
  const [allMeals, setAllMeals] = useState<any>([]);
  const [allDrinks, setAllDrinks] = useState<any>([]);

  const drinkCats=["Cocktail","Ordinary Drink","Shake","Shot","Homemade Liqueur","Beer"];
  const mealCats=["Beef","Chicken","Dessert","Miscellaneous","Pasta","Seafood", "Starter","Vegetarian"];

  const fetchData=async()=>{

    try {
      const {data}=await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${text}`);
      setAllMeals(data?.meals?.splice(0,7));

      const response=await axios.get(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${text}`);
      setAllDrinks(response?.data?.drinks?.splice(0,7));

    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=> {
    if(text) {
      fetchData();
    }else{
      setAllDrinks([]);
      setAllMeals([]);
    }
  },[text]);
  

  return (
    <SafeAreaView className=" px-4 py-6 bg-primary h-full w-full">
      <ScrollView>
        <View className=" flex flex-col mb-2">

          <View className=" overflow-hidden h-12 flex flex-row items-center border-2 border-secondary w-full pl-2 rounded-full">
            <TextInput
              value={text}
              onChangeText={(e)=> setText(e)}
              placeholder='Search receipe, drink...'
              className="font-pmedium flex flex-1 text-base ml-2 text-white"
              placeholderTextColor="gray"
            />
            <TouchableOpacity onPress={()=> {}} className=" p-1 py-2 bg-amber-500 flex items-center justify-center">
              <MaterialIcons name="search" size={35} color="white" className=" bg-amber-500 text-center" />
            </TouchableOpacity>
          </View>

          {allMeals?.length>0 && (
            <View className=" flex flex-col my-2 mt-4">
              {allMeals.map((meal:any,i:number)=> (
                <View className=" flex flex-col my-0.5" key={i}>
                    <TouchableOpacity className=" flex flex-row items-center"
                    onPress={()=> router.push(`/mealItem/${meal?.idMeal}`)}
                    >
                      <Image
                        source={{uri:meal?.strMealThumb}}
                        resizeMode=''
                        className=" h-10 w-10"
                      />
                      <Text className=" text-white px-2 py-2.5" numberOfLines={1}>{meal?.strMeal}</Text>
                  </TouchableOpacity>
                  <Text className=" h-[0.5px] bg-gray-500 w-full"></Text>
                </View>
              ))}
            </View>
          )}

          {allDrinks?.length>0 && (
            <View className=" flex flex-col my-2 mt-4">
              {allDrinks?.map((drink:any,i:number)=> (
                <View className=" flex flex-col my-0.5" key={i}>
                    <TouchableOpacity className=" flex flex-row items-center"
                    onPress={()=> router.push(`/drinkItem/${drink?.idDrink}`)}
                    >
                      <Image
                        source={{uri:drink?.strDrinkThumb}}
                        resizeMode=''
                        className=" h-10 w-10"
                      />
                      <Text className=" text-white px-2 py-2.5" numberOfLines={1}>{drink?.strDrink}</Text>
                  </TouchableOpacity>
                  <Text className=" h-[0.5px] bg-gray-500 w-full"></Text>
                </View>
              ))}
            </View>
          )}

          <View className=" flex flex-col my-2 mt-2">
            <Text className=" text-white font-pmedium">Meals cateogories</Text>
            <View className=" flex flex-col">
              {mealCats.map((meal,i)=> (
                <View className=" flex flex-col" key={i}>
                    <TouchableOpacity className=" flex flex-row items-center" onPress={()=> router.push(`/meal?catName=${meal}`)}>
                      <MaterialIcons name="history" size={24} color="white" className=" bg-amber-500 text-center" />
                      <Text className=" text-white px-2 py-2.5">{meal}</Text>
                  </TouchableOpacity>
                  <Text className=" h-[0.5px] bg-gray-500 w-full"></Text>
                </View>
              ))}
            </View>
          </View>

          <View className=" flex flex-col my-2 mb-2">
            <Text className=" text-white font-pmedium">Drinks cateogories</Text>
            <View className=" flex flex-col">
              {drinkCats.map((drink,i)=> (
                <View className=" flex flex-col" key={i}>
                    <TouchableOpacity className=" flex flex-row items-center" onPress={()=> router.push(`/drink?catName=${drink}`)}>
                      <MaterialIcons name="history" size={24} color="white" className=" bg-amber-500 text-center" />
                      <Text className=" text-white px-2 py-2.5">{drink}</Text>
                  </TouchableOpacity>
                  <Text className=" h-[0.5px] bg-gray-500 w-full"></Text>
                </View>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
      <StatusBar style='light' />
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})


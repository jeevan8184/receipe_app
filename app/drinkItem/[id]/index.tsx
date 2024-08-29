import { Alert, Animated, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import axios from 'axios';
import Loader from '@/components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'
import { UserContext } from '@/components/UserProvider';
import Loader1 from '@/components/Loader1';

const DrinkItem = () => {
    const {id}=useLocalSearchParams();
    const [itemDrink, setItemDrink] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {currUser,setCurrUser}=useContext(UserContext);
    const [isLoading1, setIsLoading1] = useState(false);
    const [allMeals, setAllMeals] = useState<any>([]);

    const mealCats=["Beef","Chicken","Dessert","Lamb","Miscellaneous","Pasta","Pork","Seafood","Side", "Starter","Vegan","Vegetarian","Breakfast","Goat"];

    const fetchData = async() => {
        try {
            setIsLoading(true);
            const response =  await axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
            if(response?.data) {
              setItemDrink(response.data?.drinks[0]);
            }
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    const fetchDrinks=async()=>{

        try {
            setIsLoading1(true);
            for(let i=0;i<mealCats.length;i++) {
                const x=mealCats[Math.floor(mealCats.length*Math.random())];
                const {data} = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${x}`);
                setAllMeals(data?.meals.splice(0,10));
            }
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading1(false);
        }
    }

    useEffect(()=> {
        if(id) {
            fetchData();
            console.log("id",id);
            fetchDrinks();
        }
    },[id]);

    console.log("drinkId",id);
    

    const handlePress=async(drinkId:string)=>{

        console.log("press",drinkId);
        try {
            if(!drinkId) return;
            const response=await axios.post("http://192.168.29.208:5000/api/user/drink",{
                userId:currUser?._id,
                drinkId
            })
            if(response.data?.error) {
                return Alert.alert(response.data?.error);
            }else{
                setCurrUser(response.data);
            }
        } catch (error) {
          console.log(error);
        }
    }

    if(isLoading) return <Loader />

  return (
    <SafeAreaView className=" bg-primary h-full w-full p-0 m-0">
        <ScrollView>
            <View className=" relative w-full h-[360px] overflow-hidden rounded-3xl flex flex-row justify-center">
                <Image
                    source={{uri:itemDrink?.strDrinkThumb}}
                    className=" h-full w-full"
                    resizeMode='cover'
                />
                <TouchableOpacity className=" absolute right-2 top-2  p-1 bg-white rounded-full z-20">
                    {currUser?.allDrinks?.includes(itemDrink?.idDrink) ? (
                        <MaterialIcons name="favorite" size={28} color="red" 
                            onPress={()=> handlePress(itemDrink?.idDrink)}
                        />
                    ):(
                        <MaterialIcons name="favorite-border" size={28} color="black"
                            onPress={()=> handlePress(itemDrink?.idDrink)}
                        />
                    )}
                </TouchableOpacity>
                <TouchableOpacity className=" absolute left-3 top-2  p-0.5 bg-white rounded-full z-20" onPress={()=> router.back()}>
                    <MaterialIcons name="chevron-left" size={32} color="#FF9C01"/>
                </TouchableOpacity>
            </View>
            <View className=" px-4 py-3">
                <View className=" flex">
                    <Text className=" text-white text-2xl font-psemibold">{itemDrink?.strDrink}</Text>
                    <View className=" flex flex-row justify-between w-full pt-2 pr-2">
                        <Text className=" w-1/2 px-6 py-1.5 rounded-xl bg-secondary-200/20 text-secondary-100 text-base text-center" numberOfLines={1}>{itemDrink?.strCategory}</Text>
                        <Text className=" w-1/2 px-6 py-1.5 rounded-xl bg-red-500/20 text-red-500 text-base ml-2 text-center" numberOfLines={1}>{itemDrink?.strGlass}</Text>
                    </View>
                    <View className=" flex flex-col my-2">
                        <Text className=" text-lg font-psemibold text-white">Ingredients and Measures</Text>
                        <View className=" my-2">
                            {Array.from({length:15},(_,i)=> {
                                if(itemDrink?.[`strIngredient${i+1}`]===null || itemDrink?.[`strIngredient${i+1}`]==="") return null;

                                return(
                                    <View className=" flex flex-row my-2" key={i}>
                                        <MaterialIcons name="local-dining" size={30} color="#FF9800"/>
                                        <View className=" flex flex-row ml-3">
                                            <Text className=" text-white font-pmedium text-base">{itemDrink?.[`strIngredient${i+1}`]}</Text>
                                            <Text className=" text-gray-200 ml-2">{itemDrink?.[`strMeasure${i+1}`] && itemDrink?.[`strMeasure${i+1}`]}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View className=" mb-2">
                        <Text className=" text-white text-base my-1">It's a {itemDrink?.strAlcoholic}</Text>
                        {itemDrink?.strTags && (
                            <Text className=" text-base font-pmedium text-white">Tags : <Text className=" text-gray-200">{itemDrink?.strTags}</Text> </Text>
                        )}
                    </View>
                    <View className=" my-2">
                        <Text className="text-lg font-psemibold text-white my-2">Instructions</Text>
                        <Text className=" text-white">{itemDrink?.strInstructions}</Text>
                    </View>
                </View>
                {isLoading1 ? <Loader1 /> : 
                (
                <View className=" flex flex-col my-4">
                    <Text className=" text-lg font-psemibold text-white my-2">Related receipes for this drink</Text>
                    <FlatList
                        data={allMeals}
                        keyExtractor={(item)=> item?.idMeal}
                        horizontal
                        renderItem={({item})=> (
                            <TouchableOpacity className=" mr-4 w-48 overflow-hidden" onPress={()=> router.push(`/mealItem/${item?.idMeal}`)}>
                                <View className=" relative h-60 w-48 rounded-[20px] overflow-hidden">
                                    <Image
                                        source={{uri:item?.strMealThumb}}
                                        className=" h-full w-full"
                                        resizeMode=""
                                    />
                                </View>
                                <Text className="text-white text-center mt-1" numberOfLines={1}>{item?.strMeal}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                )}
            </View>
        </ScrollView>
        <StatusBar style='light' />
    </SafeAreaView>
  )
}

export default DrinkItem

const styles = StyleSheet.create({})


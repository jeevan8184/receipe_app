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

const MealItem = () => {
    const {id}=useLocalSearchParams();
    const [itemMeal, setItemMeal] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {currUser,setCurrUser}=useContext(UserContext);
    const [allDrinks, setAllDrinks] = useState<any>([]);
    const [isLoading1, setIsLoading1] = useState(false);

    const drinkCats=["Cocktail","Ordinary Drink","Punch / Party Drink","Shake","Other / Unknown","Shot","Coffee / Tea","Homemade Liqueur","Beer","Soft Drink"];

    const fetchData = async() => {
        try {
            setIsLoading(true);
            const response =  await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if(response?.data) {
                setItemMeal(response.data?.meals[0]);
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
            for(let i=0;i<drinkCats.length;i++) {
                const x=drinkCats[Math.floor(drinkCats.length*Math.random())];
                const {data} =  await axios.get(`https://thecocktaildb.com/api/json/v1/1/filter.php?c=${x}`);
                setAllDrinks(data?.drinks.splice(0,10));
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
    

    const handlePress=async(mealId:string)=>{

        console.log("press",mealId);
        try {
            if(!mealId) return;
            const response=await axios.post("http://192.168.29.208:5000/api/user/meal",{
                userId:currUser?._id,
                mealId
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
                    source={{uri:itemMeal?.strMealThumb}}
                    className=" h-full w-full"
                    resizeMode='cover'
                />
                <TouchableOpacity className=" absolute right-2 top-2  p-1 bg-white rounded-full z-20">
                    {currUser?.allMeals?.includes(itemMeal?.idMeal) ? (
                        <MaterialIcons name="favorite" size={28} color="red" 
                            onPress={()=> handlePress(itemMeal?.idMeal)}
                        />
                    ):(
                        <MaterialIcons name="favorite-border" size={28} color="black"
                            onPress={()=> handlePress(itemMeal?.idMeal)}
                        />
                    )}
                </TouchableOpacity>
                <TouchableOpacity className=" absolute left-3 top-2  p-0.5 bg-white rounded-full z-20" onPress={()=> router.back()}>
                    <MaterialIcons name="chevron-left" size={32} color="#FF9C01"/>
                </TouchableOpacity>
            </View>
            <View className=" px-4 py-3">
                <View className=" flex">
                    <Text className=" text-white text-2xl font-psemibold">{itemMeal?.strMeal}</Text>
                    <View className=" items-start text-start my-2">
                        <Text className=" px-6 py-1.5 rounded-xl bg-secondary-200/20 text-secondary-100 text-base">{itemMeal?.strCategory}</Text>
                    </View>
                    <View className=" flex flex-col my-2">
                        <Text className=" text-lg font-psemibold text-white">Ingredients and Measures</Text>
                        <View className=" my-2">
                            {Array.from({length:20},(_,i)=> {
                                if(itemMeal?.[`strIngredient${i+1}`]===null || itemMeal?.[`strIngredient${i+1}`]==="") return null;

                                return(
                                    <View className=" flex flex-row my-2" key={i}>
                                        <MaterialIcons name="local-dining" size={30} color="#FF9800"/>
                                        <View className=" flex flex-row ml-3">
                                            <Text className=" text-white font-pmedium text-base">{itemMeal?.[`strIngredient${i+1}`]}</Text>
                                            <Text className=" text-gray-200 ml-2">{itemMeal?.[`strMeasure${i+1}`] && itemMeal?.[`strMeasure${i+1}`]}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View className=" mb-2">
                        <Text className=" text-white text-base my-1">It's a {itemMeal?.strArea} meal</Text>
                        {itemMeal?.strTags && (
                            <Text className=" text-base font-pmedium text-white">Tags : <Text className=" text-gray-200">{itemMeal?.strTags}</Text> </Text>
                        )}
                    </View>
                    <View className=" my-2">
                        <Text className="text-lg font-psemibold text-white my-2">Instructions</Text>
                        <Text className=" text-white">{itemMeal?.strInstructions}</Text>
                    </View>
                </View>
                {isLoading1 ? <Loader1 /> : 
                (
                <View className=" flex flex-col my-4">
                    <Text className=" text-lg font-psemibold text-white my-2">Related drinks for this receipe</Text>
                    <FlatList
                        data={allDrinks}
                        keyExtractor={(item)=> item?.idDrink}
                        horizontal
                        renderItem={({item})=> (
                            <TouchableOpacity className=" mr-4 w-48 overflow-hidden" onPress={()=> router.push(`/drinkItem/${item?.idDrink}`)}>
                                <View className=" relative h-60 w-48 rounded-[20px] overflow-hidden">
                                    <Image
                                        source={{uri:item?.strDrinkThumb}}
                                        className=" h-full w-full"
                                        resizeMode=""
                                    />
                                </View>
                                <Text className="text-white text-center mt-1" numberOfLines={1}>{item?.strDrink}</Text>
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

export default MealItem

const styles = StyleSheet.create({})

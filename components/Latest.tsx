import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Loader from './Loader'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native'
import Animated from 'react-native-reanimated'
import axios from 'axios'
import { MaterialIcons } from '@expo/vector-icons';
import { UserContext } from './UserProvider';
import Loader1 from './Loader1'
import { router } from 'expo-router'

const LatestItem=({item,activeReceipe}:{item:any,activeReceipe:any})=>{
    
    const [newItem, setNewItem] = useState(activeReceipe);
    const {currUser,setCurrUser}=useContext(UserContext);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${activeReceipe?.idMeal}`);
            setNewItem(response?.data.meals[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=> {
        if(activeReceipe) {
            fetchData();
        }
    },[activeReceipe]);

    const handlePress=async(mealId:string)=>{

        console.log("press",mealId);
        try {
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

    return(
        <TouchableOpacity className=" mr-8" onPress={()=> router.push(`/mealItem/${item?.idMeal}`)}>
            <View className=" relative h-80 w-64 rounded-[33px] overflow-hidden">
                <Image
                    source={{uri:item?.strMealThumb}}
                    className={`${activeReceipe?.idMeal===item?.idMeal ? " bg-white/60 backdrop-blur-0 bg-rgba(255, 255, 255, 0.6)  scale-105":" bg-white/10"} h-full w-full`}
                    resizeMode="contain"
                />
                <TouchableOpacity className=" absolute top-2 p-1 bg-white rounded-full right-2 z-20">
                    {currUser?.allMeals?.includes(item?.idMeal) ? (
                        <MaterialIcons name="favorite" size={28} color="red" onPress={()=> handlePress(item?.idMeal)}/>
                    ):(
                        <MaterialIcons name="favorite-border" size={28} color="black" onPress={()=> handlePress(item?.idMeal)}/>
                    )}
                </TouchableOpacity>
                <View className=" absolute left-0 top-3/4 flex flex-col px-2">
                    <Text className=" text-secondary-100 font-pmedium">{newItem?.strCategory}</Text>
                    <Text className=" text-secondary-100 font-pmedium">{newItem?.strTags}</Text>
                </View>
            </View>
            <Text className={`${activeReceipe?.idMeal===item?.idMeal ? " flex":"hidden"} text-lg text-white text-center mt-1`}>{item.strMeal}</Text>
        </TouchableOpacity>
    )
}

const Latest = () => {

    const [allReceipies, setAllReceipies] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('https://themealdb.com/api/json/v1/1/filter.php?a=Indian');
            setAllReceipies(response.data?.meals);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [activeReceipe, setActiveReceipe] = useState(allReceipies[0]);

    const handleChange=({viewableItems}:{viewableItems:any})=>{
        if(viewableItems?.length>0) {
            setActiveReceipe(viewableItems[0].item);
        }
    }

    if(isLoading) return <Loader1 />

  return (
    <FlatList
        data={allReceipies}
        keyExtractor={(item)=> item?.idMeal}
        renderItem={({item})=> (
            <LatestItem item={item} activeReceipe={activeReceipe}  />
        )}
        onViewableItemsChanged={handleChange}
        viewabilityConfig={{
            itemVisiblePercentThreshold:40
        }}
        horizontal
        refreshControl={
            <RefreshControl onRefresh={()=> fetchData()} refreshing={isLoading} />
        }
    />
  )
}

export default Latest

const styles = StyleSheet.create({})

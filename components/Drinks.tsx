import { Alert, FlatList, Image, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from './UserProvider'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Text } from 'react-native'
import { router } from 'expo-router'

const DrinkItem=({item,activeDrink}:{item:any,activeDrink:any})=>{
    
    const [newItem, setNewItem] = useState(activeDrink);
    const {currUser,setCurrUser}=useContext(UserContext);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${activeDrink?.idDrink}`);
            setNewItem(response?.data.drinks[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=> {
        if(activeDrink) {
            fetchData();
        }
    },[activeDrink]);

    const handlePress=async(drinkId:string)=>{

        console.log("press",drinkId);
        try {
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

    return(
        <TouchableOpacity className=" mr-8" onPress={()=> router.push(`/drinkItem/${item?.idDrink}`)}>
            <View className=" relative h-80 w-64 rounded-[33px] overflow-hidden">
                <Image
                    source={{uri:item?.strDrinkThumb}}
                    className={`${activeDrink?.idDrink===item?.idDrink ? " bg-white/60 backdrop-blur-0 bg-rgba(255, 255, 255, 0.6)  scale-105":" bg-white/10"} h-full w-full`}
                    resizeMode="contain"
                />
                <TouchableOpacity className=" absolute top-2 p-1 bg-white rounded-full right-2 z-20">
                    {currUser?.allDrinks?.includes(item?.idDrink) ? (
                        <MaterialIcons name="favorite" size={28} color="red" onPress={()=> handlePress(item?.idDrink)}/>
                    ):(
                        <MaterialIcons name="favorite-border" size={28} color="black" onPress={()=> handlePress(item?.idDrink)}/>
                    )}
                </TouchableOpacity>
                <View className=" absolute left-0 top-3/4 flex flex-col px-2">
                    <Text className=" text-secondary-100 font-pmedium">{newItem?.strGlass}</Text>
                    <Text className=" text-secondary-100 font-pmedium line-clamp-1 whitespace-nowrap overflow-hidden text-ellipsis" numberOfLines={2}>{newItem?.strInstructions}</Text>
                </View>
            </View>
            <Text className={`${activeDrink?.idDrink===item?.idDrink ? " flex":"hidden"} text-lg text-white text-center mt-1`}>{item?.strDrink}</Text>
        </TouchableOpacity>
    )
}

const Drinks = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [allDrinks, setAllDrinks] = useState<any>([]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('https://thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink');
            setAllDrinks(response.data?.drinks.slice(0,10));
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [activeDrink, setActiveDrink] = useState(allDrinks[0]);

    const handleChange=({viewableItems}:{viewableItems:any})=>{
        if(viewableItems?.length>0) {
            setActiveDrink(viewableItems[0].item);
        }
    }

    // if(isLoading) return <Loader1 />

  return (
    <FlatList
        data={allDrinks}
        keyExtractor={(item)=> item?.idDrink}
        renderItem={({item})=> (
            <DrinkItem item={item} activeDrink={activeDrink}  />
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

export default Drinks

const styles = StyleSheet.create({})

import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import axios from 'axios';
import { RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface MealCatsParams {
    activeReceipe:any,
    setActiveReceipe:Dispatch<SetStateAction<any>>
}

const MealCats = ({activeReceipe,setActiveReceipe}:MealCatsParams) => {

    const [allReceipies, setAllReceipies] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
            setAllReceipies(response.data?.categories.slice(0,10));
            setActiveReceipe(response.data?.categories[0]);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <>
    <FlatList
        data={allReceipies}
        keyExtractor={(item)=> item?.idCategory}
        horizontal
        renderItem={({item})=> (
            <View className=" flex items-center mr-2">
                <TouchableOpacity 
                    onPress={()=> setActiveReceipe(item)} 
                    className={`${activeReceipe?.idCategory===item?.idCategory ? " bg-amber-500" : " bg-white"} relative h-24 w-24 rounded-full overflow-hidden`}
                >
                    <Image
                        source={{uri:item?.strCategoryThumb}}
                        className=" h-full w-full rounded-full overflow-hidden"
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <Text className=" text-white font-pmedium">{item?.strCategory}</Text>
            </View>
        )}
        refreshControl={
            <RefreshControl onRefresh={()=> fetchData()} refreshing={isLoading} />
        }
    />
        <StatusBar style='light' />
    </>
  )
}

export default MealCats

const styles = StyleSheet.create({})

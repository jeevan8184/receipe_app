import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import axios from 'axios';
import { RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface DrinkCatsParams {
    activeReceipe:any,
    setActiveReceipe:Dispatch<SetStateAction<any>>
}

const DrinkCats = ({activeReceipe,setActiveReceipe}:DrinkCatsParams) => {

    const [allReceipies, setAllReceipies] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('https://thecocktaildb.com/api/json/v1/1/list.php?c=list');
            setAllReceipies(response.data?.drinks);
            setActiveReceipe(response.data?.drinks[0]);
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
        keyExtractor={(item)=> item?.strCategory}
        horizontal
        stickyHeaderIndices={allReceipies}
        invertStickyHeaders
        renderItem={({item})=> (
            <View className=" flex items-center mr-2">
                <TouchableOpacity 
                    onPress={()=> setActiveReceipe(item)} 
                    className={`${activeReceipe?.strCategory===item?.strCategory ? " bg-amber-500 text-white" : " bg-white text-gray-600"} px-4 py-1.5 relative rounded-xl `}
                >
                    <Text className=" font-pmedium">{item?.strCategory}</Text>
                </TouchableOpacity>
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

export default DrinkCats

const styles = StyleSheet.create({})

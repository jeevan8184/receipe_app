import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import MasonryList from '@react-native-seoul/masonry-list';
import { router } from 'expo-router';
import Loader1 from './Loader1';

interface MealCatItemsParams {
    activeReceipe:any,
    setActiveReceipe:Dispatch<SetStateAction<any>>
}

const MealCatItems = ({activeReceipe,setActiveReceipe}:MealCatItemsParams) => {

    const [allReceipies, setAllReceipies] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMore, setIsMore] = useState(false);
    const scrollRef=useRef(null);

    const fetchData = async(more?:string) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${activeReceipe?.strCategory}`);
            if(response?.data) {
                if(more) {
                    setAllReceipies(response.data?.meals);
                }else{
                    setAllReceipies(response.data?.meals?.splice(0,12));
                }
            }
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if(activeReceipe) {
            fetchData();
            setIsMore(false);
        }
    }, [activeReceipe]);

    if(isLoading) return <Loader1 />

  return (
    <>
        <MasonryList
            data={allReceipies}
            keyExtractor={(item)=> item?.idMeal}
            numColumns={2}
            innerRef={scrollRef}
            renderItem={({item,i})=> (
                <TouchableOpacity className={`lex my-1 items-center rounded-xl ${i%2==0 ? " pr-1":" pl-1"}`} onPress={()=> router.push(`/mealItem/${item?.idMeal}`)}>
                    <View 
                        className={`relative ${i%3===0 ? " h-56":" h-64"} w-full rounded-xl overflow-hidden`}
                    >
                        <Image
                            source={{uri:item?.strMealThumb}}
                            className=" h-full w-full"
                            resizeMode='cover'
                        />
                    </View>
                    <Text className=" text-white font-pmedium whitespace-nowrap overflow-ellipsis space-y-1 text-sm" numberOfLines={1}>{item?.strMeal}</Text>
                </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={true}
            onEndReachedThreshold={0.1}
            onRefresh={()=> fetchData()}
            refreshing={isLoading}
        />
        <TouchableOpacity 
            className={`flex items-end justify-end mx-4 mt-2 ${isMore ? " hidden":" flex"}`} 
            onPress={()=> {
                fetchData("more");
                setIsMore(true);
                scrollRef?.current.scrollToEnd({animated:true});
            }}
        >
            <Text className=" text-blue-500 text-base  font-psemibold">Load more</Text>
        </TouchableOpacity>
    </>
  )
}

export default MealCatItems

const styles = StyleSheet.create({})


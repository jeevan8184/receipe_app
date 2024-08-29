import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Loader1 from './Loader1';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import { UserContext } from './UserProvider';
import MasonryList from '@react-native-seoul/masonry-list';

const DrinkBookmark = () => {
    const [allDrinks, setAllDrinks] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const {currUser}=useContext(UserContext);

    const fetchDrinks=async()=>{
        try {
            setIsLoading(true);
            const fetchedDrinks = await Promise.all(
                currUser?.allDrinks.map(async (drinkId: string) => {
                    const { data } = await axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
                    return data?.drinks[0];
                })
            );
            setAllDrinks(fetchedDrinks);
            if(allDrinks?.length>0) {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=> {
        if(currUser) {
            fetchDrinks();
        }
    },[currUser]);

  return (
            <View>
                {isLoading ? <Loader1 /> : (
                    (allDrinks?.length>0 && (
                        <View className=" flex flex-col my-2">
                            <Text className=" text-white text-lg font-pmedium my-1 mb-2">Your Saved Drinks</Text>
                            <MasonryList
                                data={allDrinks}
                                keyExtractor={(item)=> item?.idDrink}
                                renderItem={({item,i})=> {
                                    console.log("item",item?.idDrink);
                                    return (
                                        <TouchableOpacity key={i} className={`lex my-1 items-center rounded-xl ${i%2==0 ? " pr-1":" pl-1"}`} onPress={()=> router.push(`/drinkItem/${item?.idDrink}`)}>
                                            <View 
                                                className={`relative ${i%3===0 ? " h-56":" h-64"} w-full rounded-xl overflow-hidden`}
                                            >
                                                <Image
                                                    source={{uri:item?.strDrinkThumb}}
                                                    className=" h-full w-full"
                                                    resizeMode='cover'
                                                />
                                            </View>
                                            <Text className=" text-white font-pmedium whitespace-nowrap overflow-ellipsis space-y-1 text-sm" numberOfLines={1}>{item?.strDrink}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                                onRefresh={fetchDrinks}
                                refreshing={isLoading}
                            />

                        </View>
                    ))
                )}
            </View>
  )
}

export default DrinkBookmark

const styles = StyleSheet.create({})

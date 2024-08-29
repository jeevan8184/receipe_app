import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Loader1 from './Loader1';
import MasonryList from '@react-native-seoul/masonry-list';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import { UserContext } from './UserProvider';

const RecBookmark = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [allMeals, setAllMeals] = useState<any>([]);
    const {currUser}=useContext(UserContext);


    const fetchRecipies=async()=>{
        try {
            setIsLoading(true);
            const fetchedMeals = await Promise.all(
                currUser?.allMeals.map(async (mealId: string) => {
                    const { data } = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                    return data?.meals[0];
                })
            );
            setAllMeals(fetchedMeals);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=> {
        if(currUser) {
            fetchRecipies();
        }
    },[currUser]);

  return (
            <View>
                {isLoading ? <Loader1 /> : (
                    (allMeals?.length>0 && (
                        <View className=" flex flex-col my-2">
                            <Text className=" text-white text-lg font-pmedium my-1 mb-2">Your Saved Recipies</Text>
                            <MasonryList
                                data={allMeals}
                                keyExtractor={(item)=> item?.idMeal}
                                numColumns={2}
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
                                onRefresh={()=> fetchRecipies()}
                                refreshing={isLoading}
                            />
                        </View>
                    ))
                )}
            </View>
  )
}

export default RecBookmark

const styles = StyleSheet.create({})

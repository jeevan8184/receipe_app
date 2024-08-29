import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DrinksCatItems from '@/components/DrinksCatItems'
import DrinkCats from '@/components/DrinkCats'

const max_ht=120;
const min_ht=90;
const scroll_dist=(max_ht-min_ht);

const DynamicHeader=({value,setActiveDrink,activeDrink}:{value:any,setActiveDrink:Dispatch<SetStateAction<any>>,activeDrink:any})=>{
    
    const animatedHt=value.interpolate({
        inputRange:[0,scroll_dist],
        outputRange:[max_ht,min_ht],
        extrapolate:"clamp"
    })

    const animatedColor=value.interpolate({ 
        inputRange:[0,scroll_dist],
        outputRange:['#161622', '#161622'],
        extrapolate:"clamp"
    })

    return(
        <Animated.View
            style={[
                styles.header,
                {
                    height:animatedHt,
                    backgroundColor:animatedColor
                }
            ]}
            className=" px-4 py-1"
        >
            <View className=" flex flex-col border-b border-b-primary mt-1" >
                <Animated.Text 
                    className={`text-xl mx-2 font-psemibold text-white my-1`}
                >
                    Drink Categories
                </Animated.Text>
                <DrinkCats 
                    setActiveReceipe={setActiveDrink}
                    activeReceipe={activeDrink}
                />
            </View>
        </Animated.View>
    )
}

const DrinksPage = () => {

    const [activeDrink, setActiveDrink] = useState();
    const scrollOffsetY=useRef(new Animated.Value(0)).current;

  return (
    
    <SafeAreaView className=" h-full bg-primary">
        <DynamicHeader value={scrollOffsetY} setActiveDrink={setActiveDrink} activeDrink={activeDrink} />
        <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={5}
            onScroll={Animated.event(
                [{nativeEvent:{contentOffset:{y:scrollOffsetY}}}],
                {
                    useNativeDriver:false
                }
            )}
        >
           <View className=" px-4 mb-20">
                
                <View className=" mt-3">
                    <DrinksCatItems
                        setActiveReceipe={setActiveDrink}
                        activeReceipe={activeDrink}
                    />
                </View>
            </View>
            
        </ScrollView>
    </SafeAreaView>
  )
}

export default DrinksPage

const styles = StyleSheet.create({
    header:{
        left:0,
        right:0,
        alignItems:"center",
        justifyContent:"center"
    }
})


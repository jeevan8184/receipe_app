import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { UserContext } from '@/components/UserProvider';
import Latest from '@/components/Latest';
import { StatusBar } from 'expo-status-bar';
import Drinks from '@/components/Drinks';
import MealCats from '@/components/MealCats';
import MealCatItems from '@/components/MealCatItems';
import { router } from 'expo-router';
import DrinkCats from '@/components/DrinkCats';
import DrinksCatItems from '@/components/DrinksCatItems';

const Home = () => {
  const {currUser}=useContext(UserContext);
  const [activeReceipe, setActiveReceipe] = useState();
  const [activeDrink, setActiveDrink] = useState();
  const [activeItem, setActiveItem] = useState<"meals" | "drinks">("meals");


  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView className="">
        <View className=" px-4 py-6 mb-20 flex">
          <View className=" flex flex-col">
            <View className=" pt-4 flex flex-row">
              <View className=" p-0.5 bg-orange-300 rounded-full">
                <View className=" p-0.5 bg-orange-200 rounded-full">
                  <ImageBackground
                    source={images.receipe}
                    resizeMode='cover'
                    className=" h-20 w-20 rounded-full overflow-hidden"
                  />
                </View>
              </View>
              <View className=" flex flex-col justify-center ml-2">
                <View className=" relative">
                  <Text className=" space-y-2 text-orange-400 text-3xl font-pbold">Receipe App</Text>
                  <Image
                    source={images.path}
                    resizeMode='contain'
                    className=" w-[136px] h-[15px] absolute -right-5 -bottom-2"
                  />
                </View>
                <View className=" flex flex-row mt-2">
                  <Text className=" text-lg text-white">Welcome </Text>
                  <Text className=" text-xl text-secondary-100">{currUser?.username}</Text>
                </View>
              </View>
            </View>
          </View>
          <View className=" mt-3">
            <Text className=" text-xl font-psemibold text-white my-4">Top Receipies In India</Text>
            <Latest />
          </View>
          <View className=" mt-3">
            <Text className=" text-xl font-psemibold text-white my-4">Ordinary Drinks</Text>
            <Drinks />
          </View>

          <View className=" flex flex-row my-2 mx-2 mt-8">
            <TouchableOpacity className="" onPress={()=> setActiveItem("meals")}>
              <Text className={`text-[17px]  px-6 rounded-xl py-1 font-pmedium ${activeItem==="meals" ? " text-amber-500 bg-amber-500/20":" text-white"}`}>Meals</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" " onPress={()=> setActiveItem("drinks")}>
              <Text className={`text-[17px] px-6 rounded-xl py-1 font-pmedium ${activeItem==="drinks" ? " text-amber-500 bg-amber-500/20":" text-white"}`}>Drinks</Text>
            </TouchableOpacity>
          </View>
          
          {activeItem==="meals" ? (
            <View className="mt-1">
              <View className=" flex flex-col">
                <Text className=" text-xl mx-2 font-psemibold text-white my-4">Meals Categories</Text>
                <MealCats 
                  setActiveReceipe={setActiveReceipe}
                  activeReceipe={activeReceipe}
                />
              </View>
              <View className=" mt-3">
                <MealCatItems
                  setActiveReceipe={setActiveReceipe}
                  activeReceipe={activeReceipe}
                />
              </View>
            </View>
          ):(
            <View className="mt-1">
              <View className=" flex flex-col">
                <Text className=" text-xl mx-2 font-psemibold text-white my-4"> Drink Categories</Text>
                <DrinkCats 
                  setActiveReceipe={setActiveDrink}
                  activeReceipe={activeDrink}
                />
              </View>
              <View className=" mt-3">
                <DrinksCatItems
                  setActiveReceipe={setActiveDrink}
                  activeReceipe={activeDrink}
                />
              </View>
            </View>
          )}

          {/* <TouchableOpacity className=" text-center my-5 mt-8 flex" onPress={()=> router.push("/drinks")}>
            <Text className=" font-psemibold text-blue-500 text-center text-xl">View Drinks</Text>
          </TouchableOpacity> */}
          
        </View>
        <StatusBar style='light' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

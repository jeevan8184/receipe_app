import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import {icons} from "../../constants"

const TabIcon=({color,icon,name,focused}:{color:string,icon:any,name:string,focused:boolean})=>{

  return(
    <View className=" items-center gap-1">
      <Image
        className=" h-6 w-6 text-red-500"
        source={icon}
        alt='image'
        resizeMode='contain'
        tintColor={color}
      />
      <Text className={`${ focused ? " font-psemibold":" font-pregular"} text-xs`} style={{color:color}}>{name}</Text>
    </View>
  )
}

const TabsLayout = () => {

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 64,
          },
        }}
      >
       <Tabs.Screen
          name='home' 
          options={{
            title:"Home",
            headerShown:false,
            tabBarIcon:({color,focused})=>(
              <TabIcon color={color} focused={focused} name="Home" icon={icons.home} />
            )
          }}
        />
        <Tabs.Screen
          name='search' 
          options={{
            title:"Search",
            headerShown:false,
            tabBarIcon:({color,focused})=>(
              <TabIcon color={color} focused={focused} name="Search" icon={icons.search} />
            )
          }}
        />
        <Tabs.Screen
          name='bookmark' 
          options={{
            title:"Bookmark",
            headerShown:false,
            tabBarIcon:({color,focused})=>(
              <TabIcon color={color} focused={focused} name="Bookmark" icon={icons.bookmark} />
            )
          }}
        />
        <Tabs.Screen
          name='profile' 
          options={{
            title:"Profile",
            headerShown:false,
            tabBarIcon:({color,focused})=>(
              <TabIcon color={color} focused={focused} name="Profile" icon={icons.profile} />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})
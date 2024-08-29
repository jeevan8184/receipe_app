import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface CustomButtonParams {
    title:string,
    isLoading?:boolean,
    handleChange:()=>void;
    textStyles?:string;
    otherStyles:string;
}

const CustomButton = ({title,isLoading,handleChange,textStyles,otherStyles}:CustomButtonParams) => {

  return (
    <TouchableOpacity
        activeOpacity={0.7}
        className={` flex flex-row items-center bg-secondary-100 justify-center min-h-[50px] rounded-xl ${isLoading ? " opacity-50":""} ${otherStyles}`}
        onPress={handleChange}
    >
        <Text className={`text-lg font-psemibold ml-1 text-white ${textStyles}`}>{title}</Text>
        {isLoading && (
            <ActivityIndicator
                animating={isLoading}
                className=" ml-2"
                color="#fff"
                size="small"
            />
        )}

    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({})
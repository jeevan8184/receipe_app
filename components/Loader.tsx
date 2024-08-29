import { ActivityIndicator, Dimensions, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = () => {

    const OS=Platform.OS;
    const diHt=Dimensions.get("screen").height;

  return (
    <View style={{height:diHt}}
        className=" flex flex-1 items-center justify-center h-full w-full bg-primary/80 z-10 absolute"
    >
      <ActivityIndicator
        animating
        color="#fff"
        size={OS==="ios" ? "large":50}
      />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})

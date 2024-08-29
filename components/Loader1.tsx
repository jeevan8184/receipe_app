import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader1 = () => {

  return (
        <View
            className=" flex items-center justify-center bg-primary z-10 py-8"
        >
            <ActivityIndicator
                animating
                color="#fff"
                size="large"
            />
        </View>
  )
}

export default Loader1

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const DrinkLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{headerShown:false}} />
    </Stack>
  )
}

export default DrinkLayout

const styles = StyleSheet.create({})

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const MealLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='[id]/index' options={{headerShown:false}} />
    </Stack>
  )
}

export default MealLayout

const styles = StyleSheet.create({})

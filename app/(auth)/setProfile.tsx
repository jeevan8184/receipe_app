import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UpdateProfile from '@/components/UpdateProfile'

const SetProfile = () => {
  return (
    <View className=" w-full h-full">
        <UpdateProfile type='add' />
    </View>
  )
}

export default SetProfile

const styles = StyleSheet.create({})
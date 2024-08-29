import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UpdateProfile from '@/components/UpdateProfile'

const Update = () => {

  return (
    <View className=" h-full w-full">
      <UpdateProfile type='update' />
    </View>
  )
}

export default Update

const styles = StyleSheet.create({})

import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {icons} from "../constants";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FormFieldParams {
  title:string,
  handleTextChange:(e:any)=>void;
  value:string,
  placeholder?:string,
  otherStyles:string,
  type?:string,
  icon?:string,
  inputType?:"area"
}

const FormField = ({title,handleTextChange,value,placeholder,otherStyles,type,icon,inputType}:FormFieldParams) => {

  const [showPass, setShowPass] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className=" text-base font-pmedium">{title}</Text>
      <View className={`${inputType ? "" : " h-14"} flex flex-row items-center border-2 border-gray-600 focus:border-secondary w-full px-2 rounded-2xl`}>
        {icon && (
          <Icon name={icon} size={26} className=" items-start text-start" />
        )}
        <TextInput
          className=" font-psemibold flex flex-1 text-base ml-2"
          onChangeText={handleTextChange}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          secureTextEntry={title==="Password" && !showPass}
          keyboardType={type ? type : "default"}
          multiline
          numberOfLines={5}
          style={inputType && styles.textInput}
        />

        {title==='Password' && (
          <TouchableOpacity onPress={()=> setShowPass((prev)=> !prev)}>
            <Image
              source={showPass ? icons.eye : icons.eyeHide}
              className=" h-8 w-10"
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({
  textInput: {
    textAlignVertical: 'top',
    paddingTop:6
  },
})

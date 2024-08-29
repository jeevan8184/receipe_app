import { StyleSheet } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext=createContext<any>(null);

const UserProvider = ({children}:{children:React.ReactNode}) => {
  const [currUser, setCurrUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData=async()=>{
    try {
      setIsLoading(true);
      const id = await AsyncStorage.getItem("id");
      if(!id) return;
      const response=await axios.get(`http://192.168.29.208:5000/api/user/${JSON.parse(id)}`);
      if(response.data) {
        setIsLogged(true);
        setCurrUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(()=> {
    fetchData();
  },[]);

  return (
    <UserContext.Provider value={{
      currUser,
      setCurrUser,
      isLoading,
      isLogged,
      setIsLogged
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

const styles = StyleSheet.create({})

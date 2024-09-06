import {View, Text, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../../components/delivery/ScreenLayout'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message'; 

const profile = () => {

    const [restaurant, setRestaurant] = useState({});

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user); 
    const router = useRouter();

    const fetchrestaurant = async () => {
        try {
            const { data } = await axios.get(`/auth/profile`, {
                headers: { token }
            });
            
            if (data.success) {
                setRestaurant(data.data);
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    useEffect(() => {
        if (token) {
            fetchrestaurant();
        }
    }, [token]);
    return (
        <ScreenLayout title='Profile' bg='#11BB22'>

         <View className="p-2">
                        {/* <View className="items-center mb-5">
                            <Image source={restaurant.banner}  
                                className="w-full rounded-lg bg-slate-500 h-32"/>
                        </View> */}
                        {/* Restaurant Details */}
                        <View className="mt-2">
                            <Text className="text-lg font-bold text-gray-800">Name:</Text>
                            <Text className="text-lg border-b-2 border-red-300 text-gray-600 mb-2">{restaurant?.fullName}</Text>

                            
                            <Text className="text-lg font-bold text-gray-800">Contact:</Text>
                            <Text className="text-lg border-b-2 border-red-300 text-gray-600 mb-2">{restaurant?.phone}</Text>

                            <Text className="text-lg font-bold text-gray-800">Email:</Text>
                            <Text className="text-lg border-b-2 border-red-300 text-gray-600 mb-2">{restaurant?.email}</Text>
<Text className="text-lg font-bold text-gray-800">Address:</Text>
                            <Text className="text-lg border-b-2 border-red-300 text-gray-600 mb-2">{restaurant?.address}</Text>

                            
                        </View>
                        </View>
                        {/* UPDATE */}

                        <View>
                        <TouchableOpacity onPress={()=>{router.push({pathname:'delivery-profile/up-profile',
                    params:{
                        id:restaurant?.userId
                    }})}} className="bg-green-500 p-3 my-1 rounded-lg">
                                <Text className="text-white text-center font-semibold">Update</Text>
                            </TouchableOpacity>
                        </View>
           
           {/* LOGOU */}
           <TouchableOpacity onPress={async()=>{
                                await AsyncStorage.clear();
                                router.replace('/signup')
                            }} className="bg-red-500 p-3 rounded-lg">
                                <Text className="text-white text-center font-semibold">Logout</Text>
                            </TouchableOpacity>
        </ScreenLayout>
    )
}

export default profile
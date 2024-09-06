import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react'; 
import { Ionicons } from '@expo/vector-icons';
import RestaurantLayout from '../../../components/layout/restaurant/RestaurantLayout';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { TextField } from '../restaurant-menu/addItem';
import Toast from 'react-native-toast-message';

const Rprofile = () => {
    const [restaurant, setRestaurant] = useState({});

    const token = useSelector((state) => state.auth.token);
    const router = useRouter();

    const fetchRestaurant = async () => {
        try {
            const { data } = await axios.get(`/auth/profile`, {
                headers: { token },
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
            fetchRestaurant();
        }
    }, [token]);

    const handleInputChange = (field, value) => {
        setRestaurant((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleUpdateProfile = async () => {
        try {
            const { data } = await axios.put('/auth/profile', restaurant, {
                headers: { token },
            });

            if (data.success) {
                Toast.show({
                    type: 'success', 
                    text1: data.message,
                  }); 
                  setTimeout(() => {
                    router.back();
                  }, 1000);
            } else {
                Toast.show({
                    type: 'error', 
                    text1: data.message,
                  }); 
            }
        } catch (error) {
            Toast.show({
                type: 'error', 
                text1: error.message,
              }); 
        }
    };

    return (
        <RestaurantLayout bg='#F54749' bg1='#fff' isTop={false} title='Update Profile'>
            <View className="bg-[#F4F6F9] flex flex-row justify-between items-center p-2 my-2 rounded-md">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={34} color="#F54749" />
                </TouchableOpacity>
                <Text className="text-base font-semibold">Update Profile</Text>
                <TouchableOpacity></TouchableOpacity>
            </View>

            <View>
                <TextField
                    label='Restaurant Name'
                    value={restaurant.fullName}
                    onChangeText={(text) => handleInputChange('fullName', text)}
                />
                <TextField
                    label='Restaurant Phone'
                    value={restaurant.phone}
                    onChangeText={(text) => handleInputChange('phone', text)}
                />
                <TextField
                    label='Restaurant Opening Time'
                    placeholder='10:00 am - 6:00 pm'
                    value={restaurant.openingTime}
                    onChangeText={(text) => handleInputChange('openingTime', text)}
                />
                <TextField
                    label='Restaurant Address'
                    value={restaurant.address}
                    onChangeText={(text) => handleInputChange('address', text)}
                />
            </View>

            {/* Action Buttons */}
            <View className=" my-1">
                <TouchableOpacity onPress={handleUpdateProfile} className="bg-green-500 p-3 my-1 rounded-lg">
                    <Text className="text-white text-center font-semibold">Update</Text>
                </TouchableOpacity>
            </View>
        </RestaurantLayout>
    );
};

export default Rprofile;

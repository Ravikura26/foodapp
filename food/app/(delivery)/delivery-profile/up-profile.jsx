import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import RestaurantLayout from '../../../components/layout/restaurant/RestaurantLayout';
import { Ionicons } from '@expo/vector-icons';
import { TextField } from '../../(restaurant)/restaurant-menu/addItem';
import { useSelector } from 'react-redux';
import axios from 'axios';  
import Toast from 'react-native-toast-message';  

const Profile = () => {
  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(true); 

  const token = useSelector((state) => state.auth.token);
  const router = useRouter();

  const fetchRestaurant = async () => {
    try {
      const { data } = await axios.get('/auth/profile', {
        headers: { token },
      });

      if (data.success) {
        setRestaurant(data.data);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    } finally {
      setLoading(false); 
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
          text1: 'Success',
          text2: data.message,
        });
        setTimeout(() => {
          router.back();
        }, 1000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  if (loading) {
    return (
      <RestaurantLayout bg='#F54749' bg1='#fff' isTop={false} title='Update Profile'>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#F54749" />
        </View>
      </RestaurantLayout>
    );
  }

  return (
    <RestaurantLayout bg='#F54749' bg1='#fff' isTop={false} title='Update Profile'>
      <View className="bg-[#F4F6F9] flex flex-row justify-between items-center p-2 my-2 rounded-md">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={34} color="#F54749" />
        </TouchableOpacity>
        <Text className="text-base font-semibold">Update Profile</Text>
        <View /> 
      </View>

      <View>
        <TextField
          label='Full Name'
          value={restaurant.fullName}
          onChangeText={(text) => handleInputChange('fullName', text)}
        />
        <TextField
          label='Phone'
          value={restaurant.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
        />
        <TextField
          label='Vehicle No'
          value={restaurant.VNO}
          onChangeText={(text) => handleInputChange('VNO', text)}
        />
        <TextField
          label='Address'
          value={restaurant.address}
          onChangeText={(text) => handleInputChange('address', text)}
        />
      </View>

      {/* Action Buttons */}
      <View className="my-1">
        <TouchableOpacity onPress={handleUpdateProfile} className="bg-green-500 p-3 my-1 rounded-lg">
          <Text className="text-white text-center font-semibold">Update</Text>
        </TouchableOpacity>
      </View>
    </RestaurantLayout>
  );
};

export default Profile;

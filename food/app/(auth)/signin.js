import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../../components/FormInput';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../appStore/authSlice';
import Toast from 'react-native-toast-message'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
  const [error, setError] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  

  const changeHandler = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      const { data } = await axios.post('/auth/login', formData);

      if (data.success) { 
        const role = data.user.role;
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: data.message,
          }); 
 
        dispatch(setLogin({user:data?.user,token:data.token}));
        await AsyncStorage.setItem('@auth', JSON.stringify({user:data?.user,token:data.token }));
 


         
        // Navigate based on role
        switch (role) {
          case 'user':
            router.push('/user-home');
            break;
          case 'delivery partner':
            router.push('/delivery-home');

            break;
          case 'restaurant':
            router.push('/restaurant-home');
            break;
          case 'admin':
            router.push('/admin-home');
            break;
          default:
            setError('Invalid role. Please try again.');
        }
      } else {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: data.message || 'Something went wrong. Please try again.',
          });
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error.message || 'Something went wrong. Please try again.',
          });
      setError(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="bg-[#fff] h-screen flex-1 py-20 px-4">
          <View className="flex">
            <Text className="text-2xl font-bold">Sign In</Text>
            {error && <Text style={{ color: 'red', marginVertical: 8 }}>{error}</Text>}
            <FormInput
              title="Email"
              value={formData.email}
              onChange={(value) => changeHandler('email', value)}
            />
            <FormInput
              title="Password"
              value={formData.password}
              onChange={(value) => changeHandler('password', value)}
              secureTextEntry
            />
            <View className="mb-4 flex items-end">
              <Text className="text-[#F54749]">
                <Link href="/forgotpassword">Forgot password?</Link>
              </Text>
            </View>
            <CustomButton title="SIGN IN" bg="#F54749" onCLick={handleSubmit} />
            <Text className="mt-4">
              Don’t have an account?
              <Text className="text-[#F54749]">
                <Link href="/signup"> Sign up.</Link>
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      <Toast />

    </SafeAreaView>
  );
};

export default SignIn;

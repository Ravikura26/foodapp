import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../../components/FormInput';
import { SelectList } from 'react-native-dropdown-select-list';
import CustomButton, { AuthButton } from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import Toast from 'react-native-toast-message'; 

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [selected, setSelected] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const roles = [
    { key: '1', value: 'user' },
    { key: '2', value: 'restaurant' },
    { key: '3', value: 'admin' },
    { key: '4', value: 'delivery partner' },
  ];

  function changeHandler(field, value) {
    setFormData(prevData => ({
      ...prevData,
      [field]: field === 'role' && value === '1' ? 'user' : value
    }));
  }

  async function handleSubmit() { 
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill out all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const {data} = await axios.post('/auth/register', formData); 

      if (data.success) { 
        setFormData({ name: '', email: '', password: '', role: 'user' });
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Registration completed successfully!',
        }); 
          setTimeout(() => {
            router.replace('signin'); 
          }, 1000);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.log(error.message); 
      setError(error.message || 'Something went wrong. Please try again.');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className=" bg-white">
      <ScrollView >
        <View className="bg-[#fff] h-screen flex-1 py-20 px-4">
          <Text className="text-3xl font-bold  mb-6">Sign Up</Text>
          
          {error && (
            <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
              {error}
            </Text>
          )}
          
          <FormInput
            title='Name'
            value={formData.name}
            onChange={(value) => changeHandler('name', value)}
          />
          <FormInput
            title='Email'
            value={formData.email}
            onChange={(value) => changeHandler('email', value)}
          />
          <FormInput
            title='Password'
            value={formData.password}
            onChange={(value) => changeHandler('password', value)}
            secureTextEntry
          />

          <View className="my-4">
            <Text className="text-sm pl-4 mb-2">Sign up as</Text>
            <SelectList
              setSelected={(val) => {
                setSelected(val);
                changeHandler('role', val);
              }}
              data={roles}
              boxStyles={{ borderRadius: 10, paddingVertical: 12, paddingHorizontal: 10 }}
              defaultOption={{ key: '1', value: 'user' }}
              save="value"
            />
          </View> 

          <AuthButton title='SIGN UP' handlePress={handleSubmit} disabled={loading} />
          
          {loading && <ActivityIndicator size="large" color="#F54749" className="mt-4" />}
          
          <Text className="mt-6">
            Already have an account?{' '}
            <Text className="text-[#F54749] font-bold">
              <Link href={'signin'}>Sign in.</Link>
            </Text>
          </Text>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default Signup;

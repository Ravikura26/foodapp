import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const CreateCategory = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    if (!name) {
      Toast.show({
        type: 'error',
        text1: 'Category name is required',
      });
      return;
    }

    try {
      const { data } = await axios.post('/category', { name });
      if (data.success) {
        Toast.show({
          type: 'success',
          text1: data.message,
        });
        setName('');
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
    <AdminLayout title='Add Category'>
      <View className="p-2 my-2 bg-white shadow-lg rounded-md">
        <View className="flex flex-row items-center gap-12">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-light">Add a new Category</Text>
        </View>
      </View>

      <View className="p-2 my-2 bg-white shadow-lg rounded-md">
        <View>
          <Text className="text-xl font-light">Category Name</Text>
        </View>
        <View className='my-2'>
          <Text className="text-base font-light italic">Name</Text>
          <TextInput
            className="text-base font-light p-2 bg-gray-100 rounded-md"
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder='Category Name'
          />
        </View>
      </View>

      <View className='my-2'>
        <TouchableOpacity
          className="bg-green-500 p-2 rounded-lg"
          onPress={handleCreate}>
          <Text className="text-base text-center text-white font-light">Create</Text>
        </TouchableOpacity>
      </View>
    </AdminLayout>
  );
}

export default CreateCategory;

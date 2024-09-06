import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import RestaurantLayout from '../../../components/layout/restaurant/RestaurantLayout';
import { useRouter } from 'expo-router';
import ImageUpload from '../../../components/restaurant/imageUpload';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';

const AddItemScreen = () => {
  const [itemData, setItemData] = useState({ 
    name: "",
    description: "",
    price: "",
    category: "",
    weight: "",
  });

  const router = useRouter(); 
  const { token, categories } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);

  const handleInputChange = (field, value) => {
    setItemData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleImageSelected = (uri) => {
    setImage(uri);
    setItemData(prevData => ({ ...prevData, image: uri }));
  };

  const handleSubmit = async () => {   
    console.log(itemData);
    
    const { name, weight, image, description, category, price } = itemData;
    
    if (!name || !weight || !image || !description || !category || !price) {
      Toast.show({
        type: 'error', 
        text1: 'All fields are required',
      }); 
      return;
    }
    
    try {
      const { data } = await axios.post('/item', itemData, {
        headers: { token:token },
      });

      if (data.success) {
        Toast.show({
          type: 'success', 
          text1: data.message,
        }); 
        setItemData({ name: "", description: "", price: "", category: "", weight: "" });
setTimeout(() => {
  router.back()

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
    <RestaurantLayout bg='#F54749' bg1='#fff' isTop={false} title='Add new item'>
      <View className="bg-[#F4F6F9] flex flex-row justify-between items-center p-2 my-2 rounded-md">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={34} color="#F54749" />
        </TouchableOpacity>
        <Text className="text-base font-semibold">Add Items</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>
      
      <ImageUpload onImageSelected={handleImageSelected} />
      
      <TextField 
        label='Item Name' 
        value={itemData.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextField 
        label='Item Description' 
        value={itemData.description}
        onChangeText={(text) => handleInputChange('description', text)}
      />
      <TextField 
        label='Item Price' 
        value={itemData.price}
        onChangeText={(text) => handleInputChange('price', text)}
        keyboardType='numeric'
      />

      <View className='p-2 my-1 bg-slate-300 rounded-md'>
        <Text className="text-base italic mb-1">Category</Text>
        <Picker
          selectedValue={itemData.category ||'Other'}
          onValueChange={(value) => handleInputChange('category', value)}
          className="bg-white p-2 rounded-md"
        >
          {categories.map((cat) => (
            <Picker.Item key={cat._id} label={cat.name} value={cat.name} />
          ))}
        </Picker>
      </View>

      <TextField 
        label='Item Weight' 
        value={itemData.weight}
        onChangeText={(text) => handleInputChange('weight', text)}
      />
            
      <TouchableOpacity 
        className="bg-[#F54749] p-3 rounded-md mt-4"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-bold">Add Item</Text>
      </TouchableOpacity>
    </RestaurantLayout>
  );
};

export const TextField = ({ label, value,placeholer, onChangeText, keyboardType = 'default' }) => {
  return (
    <View className='p-2 my-1 bg-slate-300 rounded-md'>
      <Text className="text-base italic mb-1">{label}</Text>
      <TextInput 
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholer}
        className="bg-white p-2 rounded-md"
      />
    </View>
  );
};

export default AddItemScreen;

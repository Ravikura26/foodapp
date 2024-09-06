import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import RestaurantLayout from '../../../components/layout/restaurant/RestaurantLayout';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';

const RestaurantMenuScreen = () => {
    const { token } = useSelector((state) => state.auth);
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            try {
                const { data } = await axios.get('/item/restaurant-items', {
                    headers: { token: token }
                });
                if (data.success) {
                    setItemList(data.data);
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
        }

        fetchItems();
    }, [token]);

    const handleDeleteItem = (id) => {
        setItemList((prevItems) => prevItems.filter(item => item._id !== id));
    };

    const router = useRouter();

    return (
        <RestaurantLayout bg='#F54749' bg1='#fff' title='Your Menu'>
            <View className="bg-[#F4F6F9] flex flex-row justify-between items-center p-2 rounded-md">
                <Text className="text-base font-semibold">Menu Items</Text>
                <TouchableOpacity onPress={() => router.push('(restaurant)/restaurant-menu/addItem')}>
                    <Ionicons name="add-circle" size={34} color="#F54749" />
                </TouchableOpacity>
            </View>
            <ScrollView className="my-2">
                {itemList.map((data) => (
                    <FoodItemComponent
                        key={data._id}
                        product={data}
                        onDelete={handleDeleteItem}
                    />
                ))}
            </ScrollView>
        </RestaurantLayout>
    );
};

const FoodItemComponent = ({ product, onDelete }) => {
    const { token } = useSelector((state) => state.auth);

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`/item/${id}`, {
                headers: { token: token }
            });
            if (data.success) {
                Toast.show({
                    type: 'success',
                    text1: data.message,
                });
                onDelete(id);  
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
        <View className='my-2 p-2 rounded-md bg-[#F4F6F9]'>
            <View className="flex flex-row gap-2">
                <View className='basis-2/5'>
                    <Image
                        source={{ uri: product.image }}
                        alt='imageproduct'
                        width={100}
                        height={100}
                        resizeMode='cover'
                        className='w-full rounded-md object-cover'
                    />
                </View>
                <View className='basis-3/5'>
                    <Text className="text-base font-semibold">{product.name}</Text>
                    <Text className="text-base">{product.category}</Text>
                    <Text className="text-base italic">{product.weight}</Text>
                    <Text className="text-base">${product.price}</Text>
                </View>
            </View>
            <View className="flex flex-row mt-1 justify-between items-center">
                <View className="basis-10/12">
                    <Text>{product.description}</Text>
                </View>
                <View className="basis-2/12">
                    <TouchableOpacity className='rounded-lg' onPress={() => handleDelete(product._id)}>
                        <AntDesign name="delete" size={24} color="#F54749" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default RestaurantMenuScreen;

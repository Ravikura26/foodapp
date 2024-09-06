import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';  
import AdminLayout from '../../../components/admin/AdminLayout';
import { useRouter } from 'expo-router';
import axios from 'axios'; 
import Toast from 'react-native-toast-message';  

const AdminCategories = () => {
    const router = useRouter();
    const [catList, setCatList] = useState([]);

    useEffect(() => {
        async function getAll() {
            try {
                const { data } = await axios.get('/category');
                if (data.success) {
                    Toast.show({
                        type: 'success', 
                        text1: data.message,
                    }); 
                    setCatList(data.categories);
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

        getAll();
    }, []);


    const deleteCat = async (id) => {
        try {
            const { data } = await axios.delete(`/category/${id}`);
            if (data.success) {
                Toast.show({
                    type: 'success', 
                    text1: data.message,
                });
                // Update the list of categories after deletion
                setCatList(catList.filter(category => category._id !== id));
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

    return (
        <AdminLayout title='Admin Categories'>
            <View className="p-2 my-2 bg-white flex flex-row justify-between items-center shadow-lg rounded-md">
                <View className="p-2">
                    <Text className="text-xl font-light">All Categories</Text>
                </View>
                <View className="p-2">
                    <TouchableOpacity
                        onPress={() => router.push('(admin)/admin-categories/create')}>
                        <FontAwesome name="plus" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Body */}
            <View>
                {catList.length > 0
                    ? (catList.map((category) => (
                        <View key={category._id} className="p-2 border-b border-gray-200">
                            <View className="flex flex-row justify-between items-center">
                                <Text className="text-base">{category.name}</Text>
                                <TouchableOpacity onPress={() => deleteCat(category._id)}>
                                    <MaterialIcons name="delete" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )))
                    : (
                        <View>
                            <Text>No items at the moment</Text>
                        </View>
                    )}
            </View>
            <Toast/>  
        </AdminLayout>
    );
}

export default AdminCategories;

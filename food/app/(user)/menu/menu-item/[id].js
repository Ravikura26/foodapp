import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {data} from '../user-menu';
import UserLayout from '../../../../components/user/userLayout';
import {Ionicons} from '@expo/vector-icons';

const MenuItem = () => {
    const [item,
        setItem] = useState({});
    const {id} = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (id) {
            const selectedItem = data.find((i) => i._id === id);
            setItem(selectedItem);
        }
    }, [id]);

    if (!item) {
        return (
            <UserLayout is={false}>
                <View className="flex flex-1 justify-center items-center">
                    <Text>Loading...</Text>
                </View>
            </UserLayout>
        );
    }

    return (
        <UserLayout is={false}>
            <View className="p-2 my-2 bg-red-500 flex flex-row items-center rounded-lg">
                <TouchableOpacity className="mr-5" onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={34} color="white"/>
                </TouchableOpacity>
                <Text className="text-2xl text-white font-light">Item Details</Text>
            </View>
            <View className="p-2 my-2 bg-white rounded-lg">
                <Image
                    source={{
                    uri: item.image
                }}
                    style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 10
                }}
                    resizeMode='cover'/>
            </View>
            {/* Item details */}
            <View className=" p-2 my-2 bg-white rounded-lg">
                <Text className="text-xl font-bold">{item.name}</Text>
                <Text className="text-gray-500">{item.category}</Text>
                <Text className="text-gray-700 mt-2">{item.description}</Text>
                <Text className="text-gray-800 mt-4">Price: ${item.price}</Text>
                <Text className="text-gray-600 mt-2">Weight: {item.weight}</Text>
            </View>
            {/* Restaurant details */}
            <View className="p-2 my-2 bg-white rounded-lg">
                <Text className="text-base font-bold">This item has beem aded by restaunt {item.addedBy}.</Text>
            </View>
            {/* Added to cart */}
            <View className="p-2 my-2 bg-[#F45] rounded-lg">
                <TouchableOpacity className="mr-5" onPress={() =>  console.log('added to cart')}>
                    <View className="flex-row flex  items-center justify-center">
                        <Text className="text-base">Add to cart</Text><Ionicons name="cart" size={34} color=""/>
                    </View>
                </TouchableOpacity>
            </View>

        </UserLayout>
    );
};

export default MenuItem;

import {View, Text, Image, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import UserLayout from '../../../components/user/userLayout'
import {useLocalSearchParams, useRouter} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { addItem } from '../../../appStore/cartSlice';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

const SingleProduct = () => {
    const router = useRouter();
    const {id} = useLocalSearchParams();
    const dispatch = useDispatch()
    const [item,
        setItem] = useState([]);

    useEffect(() => {
        async function getAllItems() {
            try {
                const {data} = await axios.get(`/item/item/${id}`);
                if (data.success) {
                    setItem(data.data);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        getAllItems();
    }, []);
    return (
        <UserLayout bg='#F54749' is={false} title='Home'>
            <View className={`p-2 flex flex-row items-center my-2 bg-[#F54749] rounded-lg`}>
                <TouchableOpacity
                    onPress={() => {
                    router.push('menu/user-menu')
                }}>
                    <Ionicons name="arrow-back-outline" color="#FFF" size={34}/>
                </TouchableOpacity>
                <Text className="ml-14 p-2 text-2xl text-white font-light">item details</Text>
            </View>

            <Image
                source={{
                uri: item.image
            }}
                className="w-full rounded-lg h-40"/>
            <View className="p-1">
                <Text className='font-light text-base'>{item.name}</Text>
                <Text className='font-medium text-base'>{item.category}</Text>
                <Text className='font-regular text-md'>{item.description}</Text>
                <Text className='font-light text-sm'>weight : {item.weight}</Text>
                <Text className='font-light text-sm'>Price : ${item.price}</Text>
            </View>
            {/* res details */}

            <View className='p-1'>
                <Text className='text-xl my-1 font-light text-center'>Item added by</Text>
                <Image
                    source={{
                    uri: item
                        ?.addedByProfile
                            ?.banner
                }} className="w-full rounded-lg h-40"/>
                <Text className='text-base font-medium '>Restaurant Name : {" "}<Text className='font-light'>{item
                            ?.addedByProfile
                                ?.fullName}</Text>
                </Text>
                <Text className='text-base font-medium '>Restaurant Address : {" "}<Text className='font-light'>{item
                            ?.addedByProfile
                                ?.address}</Text>
                </Text>
                <Text className='font-medium text-base'>Timimgs : {" "}<Text className='font-light'>{item
                            ?.addedByProfile
                                ?.openingTime}</Text>
                </Text>
                <View className='flex flex-row gap-4 my-1 '>
                    <Text className='font-medium text-base '>Contact</Text>
                    <MaterialCommunityIcons name="contacts" size={24} color="orange"/>
                </View>
                <Text className='font-light text-base'>{item
                        ?.addedByProfile
                            ?.phone}</Text>
                <Text className='font-light text-base'>{item
                        ?.addedByProfile
                            ?.email}</Text>
            </View>
            {/* Action btns */}
            <TouchableOpacity className='bg-[#F54749] p-3'onPress={()=>{
                dispatch(addItem(item));
                Toast.show({
                    type: 'success',
            text1: 'Item added to cart succesfully',
                })
            }} >
                <Text className='text-base font-light text-white text-center'>Add to cart</Text>
            </TouchableOpacity>
        </UserLayout>
    )
}

export default SingleProduct
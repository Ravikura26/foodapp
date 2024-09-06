import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Entypo} from '@expo/vector-icons';
import Toast from 'react-native-toast-message';  
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

const UserLayout = ({
    children,
    title = "",
    bg = "#F54749",
    is = true
}) => {
        const {items} = useSelector((state)=>state.cart)
    const router = useRouter();
    return (
        <SafeAreaView className="min-h-screen bg-slate-100 flex-1">
            <ScrollView className="flex-1">

                <View className="flex-1 min-h-screen px-2 pt-4 pb-16">
                    {is
                        ? (
                            <View
                                className={`p-2 flex flex-row justify-between items-center my-2 bg-[${bg}] rounded-lg`}>
                                <Text className=" p-2 text-2xl text-white font-light">{title}</Text>
                               { title='home' && <View className="relative">
                                    <TouchableOpacity
                                        onPress={() => {router.push('cart/user-cart')
                                    }}>
                                        <Entypo name="shopping-cart" size={34} color="white"/>
                                    </TouchableOpacity>
                                    <View className="absolute right-6 bottom-6 w-6 h-6 rounded-full flex justify-center items-center bg-slate-100 ">
                                    <Text className="text-base text-[#F54749] font-semibold">{items?.length}</Text>
                                    </View>
                                </View>}
                            </View>
                        )
                        : "" }
                    {children}
                </View>
            </ScrollView>
            <Toast/>
        </SafeAreaView>
    )
}

export default UserLayout;

import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../constants/index';
import { useRouter } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../appStore/store';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.236.64:8000/api/';

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('signin');  
        }, 10);  

        return () => clearTimeout(timer);  
    }, []);

    return (
        <Provider store={store}>
            <SafeAreaView className="flex-1 bg-[#F54749] justify-center items-center">
                <View className="flex items-center">
                    <Image source={icons.startIcon} />
                    <Text className="text-2xl m-2 text-white text-center">Rapid Foods</Text>
                </View>
            </SafeAreaView>
        </Provider>
    );
}

export default Index;

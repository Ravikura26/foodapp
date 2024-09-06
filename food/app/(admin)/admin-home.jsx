import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

const AdminHome = () => {

    const router = useRouter()
    return (
        <AdminLayout title='Admin Home'>
            <View className="p-2 my-2 bg-white shadow-lg rounded-md">
                <Text>AdminHome</Text>
            </View>
            <TouchableOpacity onPress={async()=>{
                                await AsyncStorage.clear();
                                router.replace('/signup')
                            }} className="bg-red-500 p-3 rounded-lg">
                                <Text className="text-white text-center font-semibold">Logout</Text>
                            </TouchableOpacity>
        </AdminLayout>
    )
}

export default AdminHome
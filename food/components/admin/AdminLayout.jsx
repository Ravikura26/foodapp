import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';


const AdminLayout = ({
    children,
    title = "",
    bg = "#11BB22"
}) => {
    return (
        <SafeAreaView className="min-h-screen bg-slate-100 flex-1">
            <ScrollView className="flex-1">

                <View className="flex-1 min-h-screen px-2 pt-4 pb-16">
                    <View className={`p-2 my-2 bg-[#11BB22] rounded-lg`}>
                        <Text className=" text-center text-2xl text-white font-light">{title}</Text>
                    </View>
                    {children}
                </View>
            </ScrollView>
            <Toast/>
        </SafeAreaView>
    )
}

export default AdminLayout
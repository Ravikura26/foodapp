import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

const RestaurantLayout = ({
    children,
    bg = "#F4F6F9",
    title = '',
    isTop = true,
    bg1 = "#F4F6F9"
}) => {
    return (
        <SafeAreaView className="min-h-screen flex-1">
            <ScrollView className="flex-1 ">
                <View className="min-h-screen flex-1">
                    {isTop && <View className={`p-4 bg-[${bg}]`}>
                        <Text className="text-2xl font-bold text-white">{title}</Text>
                    </View>}
                    <View className={`flex-1 min-h-screen px-2 pt-4 pb-16 bg-[${bg1}]`}>
                        {children}
                    </View>
                </View>
            </ScrollView>
            <Toast/>
        </SafeAreaView>
    )
}

export default RestaurantLayout
import {View, Text} from 'react-native'
import React from 'react'
import {Stack} from 'expo-router'

const RestaurantOrderLayout = () => {
    return (
        <Stack
            screenOptions={{
            tabBarShowLabel: false,
            headerShown: false
        }}>
            <Stack.Screen
                name='orders'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='AllOrders'
                options={{
                headerShown: false
            }}/>
        </Stack>
    )
}

export default RestaurantOrderLayout
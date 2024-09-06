import {View, Text} from 'react-native'
import React from 'react'
import {Stack} from 'expo-router'

const RestaurantMenuLayout = () => {
    return (
        <Stack
            screenOptions={{
            tabBarShowLabel: false,
            headerShown: false
        }}>
            <Stack.Screen
                name='menu'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='addItem'
                options={{
                headerShown: false
            }}


            /> 
        </Stack>
    )
}

export default RestaurantMenuLayout
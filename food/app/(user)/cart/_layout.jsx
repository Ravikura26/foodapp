import {View, Text} from 'react-native'
import React from 'react'
import {Slot, Stack} from 'expo-router'

const CartLayout = () => {
    return (
        <Stack
            screenOptions={{
            tabBarShowLabel: false,
            headerShown: false
        }}>
            <Stack.Screen
                name='user-cart'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='user-checkout'
                options={{
                headerShown: false
            }}/>
        </Stack>
    )
}

export default CartLayout
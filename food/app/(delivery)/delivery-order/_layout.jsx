import {View, Text} from 'react-native'
import React from 'react'
import {Stack} from 'expo-router'

const Layout = () => {
    return (
        <Stack
            screenOptions={{
            tabBarShowLabel: false,
            headerShown: false
        }}>
            <Stack.Screen
                name='d-order'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='all-orders'
                options={{
                headerShown: false
            }}/>
        </Stack>
    )
}

export default Layout
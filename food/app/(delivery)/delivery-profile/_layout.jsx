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
                name='profile'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='up-profile'
                options={{
                headerShown: false
            }}/>
        </Stack>
    )
}

export default Layout
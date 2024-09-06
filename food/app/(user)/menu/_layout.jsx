import {View, Text} from 'react-native'
import React from 'react'
import {Slot, Stack} from 'expo-router'

const menu = () => {
    return (
        <Stack
            screenOptions={{
            tabBarShowLabel: false,
            headerShown: false
        }}>
            <Stack.Screen
                name='user-menu'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='menu-item'
                options={{
                headerShown: false
            }}/>
        </Stack>
    )
}

export default menu
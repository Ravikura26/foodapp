import {Stack} from 'expo-router'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../appStore/store'

const RootLayout = () => {
    return (
        <Provider store={store}>
            <Stack>
            <Stack.Screen
                name='index'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='(start)'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='(auth)'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='(restaurant)'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='(delivery)'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='(admin)'
                options={{
                headerShown: false
            }}/>
             <Stack.Screen
                name='(user)'
                options={{
                headerShown: false
            }}/>
        </Stack>
        </Provider>
    )
}

export default RootLayout

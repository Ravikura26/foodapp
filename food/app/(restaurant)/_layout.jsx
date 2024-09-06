import {View, Text, Image} from 'react-native';
import React from 'react';
import {Tabs} from 'expo-router';
import {icons} from '../../constants/index';

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image source={icon} resizeMode="contain" tintColor={color} 
                className="w-8 h-8 text-white"/>
            <Text
                className={`${focused
                ? 'font-semibold text-sky-400'
                : 'font-normal text-white'} text-sm`}>
                {name}
            </Text>
        </View>
    );
};

const RestaurantLayout = () => {
    return (
        <Tabs
            screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                padding: 2,
                height: 84,
                backgroundColor: '#F54749'
            }
        }}>
            <Tabs.Screen
                name="restaurant-home"
                options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (<TabIcon
                    icon={icons
                    ?.homeIcon}
                    color={'#FFF'}
                    name="Home"
                    focused={focused}/>)
            }}/>
            <Tabs.Screen
                name="restaurant-order"
                options={{
                title: 'Orders',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (<TabIcon
                    icon={icons
                    ?.orderIcon}
                    color={'#FFF'}
                    name="Orders"
                    focused={focused}/>)
            }}/>
            <Tabs.Screen
                name="restaurant-menu"
                options={{
                title: 'Menu',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (<TabIcon
                    icon={icons
                    ?.menuIcon}
                    color={'#FFF'}
                    name="Menu"
                    focused={focused}/>)
            }}/>
            <Tabs.Screen
                name="restaurant-profile"
                options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (<TabIcon
                    icon={icons
                    ?.profileIcon}
                    color={'#FFF'}
                    name="Profile"
                    focused={focused}/>)
            }}/>
        </Tabs>
    );
};

export default RestaurantLayout;

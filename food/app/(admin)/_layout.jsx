import {View, Text, Image} from 'react-native';
import React from 'react';
import {Tabs} from 'expo-router';
import {icons} from '../../constants/index';
import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';

const TabIcon = ({icon: IconComponent, color, name, focused}) => {
    return (
        <View className="items-center justify-center gap-2">
            {IconComponent}
            <Text
                className={`${focused
                ? 'font-light text-black]'
                : 'font-light text-white'} text-sm`}>
                {name}
            </Text>
        </View>
    );
};

const AdminLayout = () => {
    return (
        <Tabs
            screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                padding: 2,
                height: 84,
                backgroundColor: '#11BB22'
            }
        }}>

            <Tabs.Screen
                name="admin-home"
                options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon={<MaterialCommunityIcons name = "home-city" size = {
                        24
                    }
                    color = "white" />}
                        color={'black'}
                        name="Home"
                        focused={focused}/>
                )
            }}/>
            <Tabs.Screen
                name="admin-categories"
                options={{
                title: 'Categories',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon={<MaterialCommunityIcons name = "notification-clear-all" size = {
                        24
                    }
                    color = "white" />}
                        color={'black'}
                        name="Categories"
                        focused={focused}/>
                )
            }}/> 
        </Tabs>
    );
}

export default AdminLayout
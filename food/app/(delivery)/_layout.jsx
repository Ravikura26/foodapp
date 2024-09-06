import {View, Text, Image} from 'react-native';
import React from 'react';
import {Tabs} from 'expo-router';
import {icons} from '../../constants/index';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const TabIcon = ({ icon: IconComponent, color, name, focused }) => {
    return (
        <View className="items-center justify-center gap-2">
            {IconComponent}
            <Text
                className={`${focused ? 'font-light text-black]' : 'font-light text-white'} text-sm`}>
                {name}
            </Text>
        </View>
    );
};

const DeliveryLayout = () => {
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
                name="delivery-order"
                options={{
                title: 'Orders',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (<TabIcon
                    icon={<MaterialIcons name = "delivery-dining" size={24}
                    color = "white" />}
                    color={'black'}
                    name="Orders"
                    focused={focused}/>)
            }}/>
            <Tabs.Screen
                name="delivery-home"
                options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon={<MaterialCommunityIcons name="home-city" size={24} color="white" />}
                        color={'black'} 
                        name="Home"
                        focused={focused}/>
                )
            }}/>
            <Tabs.Screen
                name="delivery-profile"
                options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (<TabIcon
                    icon={<MaterialCommunityIcons name="face-man-profile" size={24} color="white" /> }
                    color={'black'}
                    name="Profile"
                    focused={focused}/>)
            }}/>
        </Tabs>
    );
};

export default DeliveryLayout;
 
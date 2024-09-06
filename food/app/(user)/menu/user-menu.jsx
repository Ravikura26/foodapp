import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserLayout from '../../../components/user/userLayout';
import {ItemSearchInput} from '../user-home';
import {useRouter} from 'expo-router';
import axios from 'axios';

const userMenu = () => {
    const [items,
        setItems] = useState([]); 

    useEffect(() => {
        const getAllItems = async() => {
            try {
                const {data} = await axios.get('/item');
                if (data.success) {
                    setItems(data.data);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        getAllItems();
    }, []);

    return (
        <UserLayout is={false}>
            <View className="p-2 my-2 bg-red-500 flex flex-row items-center rounded-lg">
                <Text className="text-2xl text-white font-light">Menu Items</Text>
            </View>
            <ItemSearchInput items={items} placeholder="Search your favorite food..."/>
            <View>
                {items.map((item) => (<ItemComponent key={item
                    ?._id} item={item}/>))}
            </View>
        </UserLayout>
    );
};
export const ItemComponent = ({item}) => {
    const router= useRouter()
    return (
        <View className="my-2 bg-neutral-100 rounded-lg"> 
           <View className='flex flex-row p-2 items-start gap-2'>
                <View className='w-1/2'>
                    <Image
                        resizeMode='contain'
                        source={{
                        uri: item.image
                    }}
                        className="rounded-lg h-40"/>
                </View>
                <View className=' '>
                    <Text className='text-base font-light'>{item.name}</Text>
                    <Text className='text-base font-light'>category :
                        <Text>{item.category}</Text>
                    </Text>
                    <Text className='font-medium text-base'>Price : $ {item.price}</Text>
                    <Text className='font-medium text-base'>weight : {item.weight}</Text>

                </View>
            </View> 
            <View className='p-2'>
                <Text className='font-medium text-md'>Added by : {item.addedBy.name}</Text>
                <Text className='font-medium text-md'>{item.description}</Text>

            </View>

            {/* Item details */}

            <View className='bg-[#F54749] p-2 '>
                <TouchableOpacity onPress={()=> router.push({
      pathname: "menu/single-item",
      params: { id: item._id }, 
    })}>
                    <Text className='text-center font-base font-medium text-white'>Check</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default userMenu;
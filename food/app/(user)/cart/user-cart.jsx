import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import UserLayout from '../../../components/user/userLayout'
import {FontAwesome6} from '@expo/vector-icons'
import { decrementItemQuantity, incrementItemQuantity } from '../../../appStore/cartSlice'
import {  useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


const userCart = () => {
    const {items} = useSelector((state) => state.cart);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const grandTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const router= useRouter()
  

    return (
        <UserLayout bg='#F54749' is={false} title='Home'>

            <Text
                className="text-xl p-2 bg-slate-300 rounded-lg  text-[#F54749] font-medium">Welcome to the cart section</Text>
            <View>
                {items.length == '0' && <Text className='text-base p-2    text-[#F54749] font-light'>No items in the cart</Text>
}
                {items.map((item) =>< ItemCart key = {
                    item._id
                }
                item = {
                    item
                } />)
}
            </View> 
            {/* Grand Total */}
          { items.length !='0' && <>
            <View>
           <View my-2>
              <Text className="text-base font-medium text-gray-700">Total Item in the cart : {totalItems}</Text>
              <Text className="text-base font-medium text-gray-700">Grand Total : {grandTotal}</Text>
            </View>
           </View>
           <TouchableOpacity  onPress={()=>{
            router.push({
              pathname:"cart/user-checkout",
              params:{
                total:grandTotal
              }
            })
           }} className='p-3 my-4 rounded-lg bg-[#F54749]'>
            <Text className="text-center text-white text-base">Proceed to CheckOut</Text>
           </TouchableOpacity>
          </>}
         
        </UserLayout>
    )
}

export const ItemCart = ({item}) => {

  const dispatch = useDispatch()

    return (
        <View className='bg-slate-200 my-2 rounded-lg'>
            <View className=''>
                <Image
                    source={{
                    uri: item.image
                }}
                    className="w-full rounded-lg h-40"/>
            </View>
            <View className="p-1">
                <Text className='font-light text-base'>{item.name}</Text>
                <Text className='font-medium text-base'>{item.category}</Text>
                <View className='flex flex-row justify-between'>
                    <Text className='font-light text-sm'>weight : {item.weight}</Text>
                    <Text className='font-light text-sm'>Price : ${item.price}</Text>
                </View>
            </View>
            <View
                className="p-2 bg-slate-300 rounded-full w-1/2 mx-auto flex flex-row justify-between">
                <TouchableOpacity
                    onPress={() => {
                    dispatch(decrementItemQuantity(item)); 
                }}>
                    <Text className='font-light text-base'><FontAwesome6 name="minus" size={24} color="#F54749"/></Text>

                </TouchableOpacity>
                <Text>{item.quantity}</Text>
                <TouchableOpacity
                    onPress={() => {
                    dispatch(incrementItemQuantity(item)); 
                }}>
                    <Text className='font-medium text-base'><FontAwesome6 name="add" size={24} color="#F54749"/></Text>

                </TouchableOpacity>

            </View>

        </View>
    )
}
export default userCart

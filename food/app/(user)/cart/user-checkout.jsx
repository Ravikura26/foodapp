import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {useLocalSearchParams, useRouter} from 'expo-router'
import UserLayout from '../../../components/user/userLayout'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { clearCart } from '../../../appStore/cartSlice'
 

const userChckout = () => {
  const {items} = useSelector((state) => state.cart);
  const {user,token} = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const router = useRouter();


    const {total} = useLocalSearchParams();

    async function OrderNow() {

      try {

        const {data} = await axios.post('/order',{
          items
        },{
          headers:{
            token:token
          }
        });



        if(data.success){

          router.push('/cart/user-cart');
          dispatch(clearCart())
          Toast.show({
            type: 'success', 
            text1: data.message,
          });
          setTimeout(() => {
            setTimeout
          }, 100);

        }else{
          Toast.show({
            type: 'error', 
            text1: data.message,
          }); 
        }
        
      } catch (error) {
        Toast.show({
          type: 'error', 
          text1: error.message,
        }); 
      }
      
    }
    return (
        <UserLayout bg='#F54749' is={false}>
            <Text
                className="text-xl p-2 bg-slate-300 rounded-lg text-center text-[#F54749] font-medium">ckeckout</Text>
            {items.map((item) =><ItemCartt key = {
                    item._id
                }
                item = {
                    item
                } />)
}
<View my-2> 
              <Text className="text-base font-medium text-gray-700">Grand Total : {total}</Text>
            </View>
<TouchableOpacity onPress={OrderNow}  className='p-3 my-4 rounded-lg bg-[#F54749]'>
            <Text className="text-center text-white text-base">Order Now</Text>
           </TouchableOpacity>

        </UserLayout>
    )
}


const ItemCartt=({item})=>{
  return(
    <View className="bg-slate-200 my-1 rounded-lg p-2">
    <Text className='font-light text-base'>{item.name}</Text>
    <Text className='font-medium text-base'>{item.category}</Text>
    <View className='flex flex-row justify-between'>
        <Text className='font-light text-sm'>weight : {item.weight}</Text>
        <Text className='font-light text-sm'>Price : ${item.price}</Text>
        <Text className='font-light text-sm'>quantity : {item.quantity}</Text>

    </View>
</View>
  )
}
export default userChckout
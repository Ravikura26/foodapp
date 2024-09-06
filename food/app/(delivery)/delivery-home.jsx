import {View, Text, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {FontAwesome5, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import ScreenLayout from '../../components/delivery/ScreenLayout'
import {OrdersToDeliver} from '../../constants/data';
import {useRouter} from 'expo-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';


const DeliveryHome = () => {
    const [AllOrders, setAllOrders] = useState([]);

  const route = useRouter()

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
      async function fetchOrder() {
          try {
              const { data } = await axios.get('/order/todo-deliver', {
                  headers: {
                   token
                  },
              });

              if (data.success) {
                  Toast.show({ type: 'success', text2: data.message });
                  setAllOrders(data.data);
              } else {
                  Toast.show({ type: 'error', text2: data.message });
              }
          } catch (error) {
              Toast.show({ type: 'error', text2: error.message });
          }
      }

      fetchOrder();
  }, [token]); // Only re-fetch when the token changes

    return (
        <ScreenLayout title='Home' bg='#11BB22'>
            {/* Achievement card */}
            <View
                className="my-2 shadow-2xl flex flex-row p-2 items-center  bg-slate-200 rounded-lg ">
                <MaterialCommunityIcons name="sticker-check-outline" size={120} color="green"/>
                <View className="flex ml-4 flex-1 ">
                    <Text className='text-center text-2xl font-regular'>20+</Text>
                    <Text className='text-center text-base font-light'>Succesfull deliveries</Text>
                </View>
            </View>
            {/* Help card */}
            <View className="my-2 shadow-2xl flex flex-row p-2   bg-slate-200 rounded-lg ">
                <FontAwesome5 name="hands-helping" size={90} color="green"/>
                <View className="flex ml-4 flex-1 ">
                    <Text className='text-xl font-regular'>in case of emergency contact here</Text>
                    <Text className='text-base font-light'><MaterialCommunityIcons name="phone" size={22} color="green"/>{" "}+0 123450000</Text>
                    <Text className='text-base font-light'>
                        <MaterialCommunityIcons name="email" size={22} color="green"/>{" "}
                        help@partner.com</Text>
                </View>
            </View>
            {/* Body */}
            <View className={`p-2 my-2 bg-[#11BB22] rounded-lg`}>
                <Text className="text-xl text-white font-light">Packets To Deliver</Text>
            </View>
            <View className="my-2">
            {
                AllOrders.length ==0 && <Text>No packets available to deliver</Text>
            }
                {AllOrders
                    .slice(0, 3)
                    .map((item) =><PacketToDeliver data = {
                        item
                    }
                    key = {
                        item._id
                    } />)
}
            </View>
            {/* ?Footer */}
            <View className={`p-2 my-2 bg-[#11BB22] rounded-lg`}>
                <TouchableOpacity
                    onPress={() => route.push(`(delivery)/delivery-order/all-orders`)}
                    className="ml-2">
                    <Text className="text-xl text-white font-light">completed Deliveries
                        <MaterialCommunityIcons name="arrow-right-bold-circle" size={24} color="white"/></Text>
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    )
}

export const PacketToDeliver = ({data}) => {

    const route = useRouter()
    return (
        <View className="bg-slate-200 my-2 p-2 rounded-lg">

            <Text className="text-base font-light">ordered id : {data._id}</Text>
            <Text className="text-base font-light">ordered From : {data.addedBy?.name}</Text>
            <Text className="text-base font-light">ordered By : {data.orderedBy?.name}</Text>
             <Text className="text-base font-light">Payment Status : {data.paymentStatus}</Text>
            <View className="flex flex-row bg-green-500 p-2 rounded-lg mt-2 ">
                <Text className="text-white font-normal text-base">check</Text>
                <TouchableOpacity
                    onPress={() => route.push(`/(delivery)/delivery-order/order-detail/${data._id}`)}
                    className="ml-2">
                    <MaterialCommunityIcons name="arrow-right-bold-circle" size={24} color="white"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DeliveryHome
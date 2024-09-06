import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import ScreenLayout from '../../../../components/delivery/ScreenLayout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { ItemListTable } from '../../../(restaurant)/restaurant-order/orders';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import MapComponent from '../../../../components/maps/mapComponent';


const OrderDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Make sure 'id' matches the parameter in your route
  const [order, setOrder] = useState(null); // Initialize as null to handle loading state
  const { token,user } = useSelector((state) => state.auth);

  useEffect(() => {
    async function getAllOrders() {
      try {
        const { data } = await axios.get(`/order/order/${id}`, {
          headers: {
            token: token,
          },
        });
        if (data.success) {
          setOrder(data.data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    getAllOrders();
  }, [id, token]); 
 
  
  

  const handleAccept =async () => {
     try {

    const {data} = await axios.put(`order/order/${id}`,{
        delivery:true,  
    },{
        headers:{
            token:token
        }
    })

    if(data.success){
        Toast.show({ type: 'success', text2: "Order accepted succesfully" });
        setTimeout(() => {
            router.back();
        }, 1000);

    }else{
        Toast.show({ type: 'error', text2: data.message });

    }
    
} catch (error) {
    Toast.show({ type: 'error', text2: error.message });

}
};
const handleDeliveredAccept =async () => {
    try {

   const {data} = await axios.put(`order/order/${id}`,{
    paymentStatus:"Done",
    deliveyStatus:"Delivered"

   },{
       headers:{
           token:token
       }
   })

   if(data.success){
       Toast.show({ type: 'success', text2: "Order delivered succesfully" });
       setTimeout(() => {
           router.back();
       }, 1000);

   }else{
       Toast.show({ type: 'error', text2: data.message });

   }
   
} catch (error) {
   Toast.show({ type: 'error', text2: error.message });

}
};

 

  return (
    <SafeAreaView className="min-h-screen flex-1">
      <ScrollView className="flex-1">
        <View className="flex-1 min-h-screen px-1 pt-4 pb-16">
          <View className="flex p-2 my-2 items-center rounded-lg bg-[#11BB22] flex-row">
            <TouchableOpacity className="p-2" onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={34} color="#FFF" />
            </TouchableOpacity>
            <View>
              <Text className="text-center text-2xl text-white font-light">Order Detail</Text>
            </View>
          </View>
          {/* Order Details */}
          <View className="p-2 bg-slate-300">
            <View className="my-1">
              <Text className="font-medium">Order ID</Text>
              <Text>OD{order?._id}</Text>
            </View> 
          </View>
          {/* Items Details */}
          <View className="p-2 my-1 bg-slate-300">
            <Text className="my-1 font-medium">Items Details</Text>
            <ItemListTable items={order?.items} />
          </View>
          {/* User Details */}
          <View className="p-2 my-1 bg-slate-300">
            <Text className="my-1 font-light">Ordered by</Text>
            <Text className="my-1 font-normal">Name: {order?.profileUser?.fullName}</Text>
            <Text className="my-1 font-normal">Phone: {order?.profileUser?.phone}</Text>
            <Text className="my-1 font-normal">Email: {order?.profileUser?.email}</Text>
            <Text className="my-1 font-normal">Address: {order?.profileUser?.address}</Text>
          </View>
          {/* Restaurant Details */}
          <View className="p-2 my-1 bg-slate-300">
            <Text className="my-1 font-light">Ordered From</Text>
            <Text className="my-1 font-medium">Restaurant Name: {order?.profileres?.fullName}</Text>
            <Text className="my-1 font-medium">Restaurant Phone: {order?.profileres?.phone}</Text>
            <Text className="my-1 font-medium">Restaurant Email: {order?.profileres?.email}</Text>
            <Text className="my-1 font-medium">Restaurant Address: {order?.profileres?.address}</Text>
          </View>
          {/* Total Amount */}
          <View className="p-2 my-1 bg-slate-300">
            <Text className="my-1 font-medium">Grand Total: ${order?.total}</Text>
          </View>
          {/* Accept Button */}
          {!order?.delivery && <TouchableOpacity onPress={handleAccept} className="p-2 bg-green-600 rounded-lg">
            <Text className="text-base text-center text-white">Accept</Text>
          </TouchableOpacity>}
          {order?.delivery && 
            <View className="p-2 my-1 bg-slate-300">
            <Text className="my-1 font-light">Delivery Details </Text>
            <Text className="my-1 font-medium">Deliver pt. Name: {order?.profileDri?.fullName}</Text>
            <Text className="my-1 font-medium">Deliver pt. Phone: {order?.profileDri?.phone}</Text>
            <Text className="my-1 font-medium">Deliver pt. Email: {order?.profileDri?.email}</Text>
            <Text className="my-1 font-medium">Deliver pt. Address: {order?.profileDri?.address}</Text>
          </View> } 
          {order?.deliveyStatus == "Accepted"  && order?.delivery &&   <MapComponent/>}
          {order?.deliveyStatus == "Accepted"  && order?.delivery &&  <TouchableOpacity onPress={handleDeliveredAccept} className="p-2 mb-16 bg-sky-600 rounded-lg">
            <Text className="text-base text-center text-white">Delivered and payment recieved</Text>
          </TouchableOpacity>}

          {order?.deliveyStatus == "Delivered" &&
            <View className="p-2 my-1 bg-slate-300">
              <Text>Order delivered succesfully and acount of $ {order?.total} recieved succesfully.</Text>
          </View> }

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;

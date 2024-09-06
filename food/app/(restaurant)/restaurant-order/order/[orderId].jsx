import { View, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import RestaurantLayout from '../../../../components/layout/restaurant/RestaurantLayout';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ItemListTable } from '../orders';
import Toast from 'react-native-toast-message';
import FormInput from '../../../../components/FormInput';
import MapComponent from '../../../../components/maps/mapComponent';


const OrderId = () => {
  const { orderId } = useLocalSearchParams();
  const router = useRouter();

  const [order, setOrder] = useState([]);  
  const [isRej, setisRej] = useState(false)
  const [rejectionReason, setRejectionReason] = useState(''); // Added state for rejection reason
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    async function getOrderDetails() {
      try {
        const { data } = await axios.get(`/order/order/${orderId}`, {
          headers: { token: token }
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

    getOrderDetails();
  }, [orderId, token]);

  const handleAccept =async () => { 
    try {

        const {data} =await axios.put(`order/order/${orderId}`,{
            deliveyStatus:'Accepted',
            isAccepted:true
        },{
            headers:{
                token:token
            }
        })

        if(data.success){
            Toast.show({ type: 'success', text2: data.message });

        }else{
            Toast.show({ type: 'error', text2: data.message });

        }
        
    } catch (error) {
        Toast.show({ type: 'error', text2: error.message });

    }
  };

  const handleReject =async () => {
    try {

        const {data} = await axios.put(`order/order/${orderId}`,{
            deliveyStatus:'cancelled', 
            rejectionReason:rejectionReason
        },{
            headers:{
                token:token
            }
        })

        if(data.success){
            Toast.show({ type: 'success', text2: data.message });
            setTimeout(() => {
                router.back()
            }, 1000);

        }else{
            Toast.show({ type: 'error', text2: data.message });

        }
        
    } catch (error) {
        Toast.show({ type: 'error', text2: error.message });

    }
  };

  return (
    <RestaurantLayout bg='#F54749' isTop={false} bg1='#fff' title='Order Details'>
      <View className="bg-[#F4F6F9] my-2 flex flex-row items-center p-2 rounded-md">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={34} color="#F54749" />
        </TouchableOpacity>
        <Text className="text-base font-semibold">Order Details</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 1, paddingBottom: 10 }}>
        {order ? (
          <>
            {/* Order Info */}
            <View className='p-2 bg-slate-200  '>
              <Text className='font-medium text-base mb-2'>Order ID: OD{order._id}</Text> 
            </View>

            {/* Item Details */}
            <View className='p-1 bg-slate-200  my-2'>
              <Text className='font-medium text-lg mb-2'>Items Details</Text>
              <ItemListTable items={order?.items} />
              <Text className='font-medium text-base '>Payment status</Text>
              <Text className='font-normal text-base '>{order.paymentStatus}</Text>

            </View>

            {/* User Details */}
            <View className='p-2 bg-slate-200  my-2'>
              <Text className='font-medium text-lg mb-2'>Ordered by</Text>
              <Text className='text-sm'>Name: {order.profileUser?.fullName}</Text>
              <Text className='text-sm'>Phone: {order.profileUser?.phone}</Text>
              <Text className='text-sm'>Email: {order.profileUser?.email}</Text>
              <Text className='text-sm'>Address: {order.profileUser?.address}</Text>
            </View>

            {/* Restaurant Details */}
            <View className='p-2 bg-slate-200  my-2'>
              <Text className='font-medium text-lg mb-2'>Ordered From</Text>
              <Text className='text-sm'>Restaurant Name: {order.profileres?.fullName}</Text>
              <Text className='text-sm'>Restaurant Phone: {order.profileres?.phone}</Text>
              <Text className='text-sm'>Restaurant Email: {order.profileres?.email}</Text>
              <Text className='text-sm'>Restaurant Address: {order.profileres?.address}</Text>
            </View>
            {order?.delivery && 
            <View className="p-2 my-1 bg-slate-300">
            <Text className="my-1 font-light">Delivery Details </Text>
            <Text className="my-1 font-medium">Deliver pt. Name: {order?.profileDri?.fullName}</Text>
            <Text className="my-1 font-medium">Deliver pt. Phone: {order?.profileDri?.phone}</Text>
            <Text className="my-1 font-medium">Deliver pt. Email: {order?.profileDri?.email}</Text>
            <Text className="my-1 font-medium">Deliver pt. Address: {order?.profileDri?.address}</Text>
          </View> } 

            {/* Grand Total */}
            <View className='p-4 bg-slate-200  my-2'>
              <Text className='font-medium text-lg'>Grand Total: ${order.total?.toFixed(2)}</Text>
            </View>
            {order?.deliveyStatus == "Accepted"  && order?.delivery &&   <MapComponent/>}
            {order?.deliveyStatus == "Delivered"&& 
            <View className="p-2 my-1 bg-slate-300">
              <Text>Order delivered succesfully and acount of $ {order.total} recieved succesfully.</Text>
          </View> }

            {/* Order Status */}
            <View className={`p-2   ${order.deliveyStatus === 'Pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>
              <Text className='text-lg text-center text-white'>Delivery status: {order.deliveyStatus}</Text>
            </View>

            {/* Accept/Reject Buttons */}
            {order.deliveyStatus === 'Pending' && (
              <View className="my-2 p-0 flex flex-row justify-between">
                <TouchableOpacity className="p-3 bg-green-500  flex-1 mr-2" onPress={handleAccept}>
                  <Text className="text-white text-center font-bold">Accept Order</Text>
                </TouchableOpacity>
                <TouchableOpacity className="p-3 bg-red-500  flex-1" onPress={()=>{
                    setisRej(true);
                }}>
                  <Text className="text-white text-center font-bold">Reject Order</Text>
                </TouchableOpacity>
              </View>
            )}

            {order.isAccepted === true &&   (
              <View className="my-2 p-4 bg-green-500 ">
                <Text className="text-white text-center font-bold">Order Accepted</Text>
              </View>
            )}

            {order.deliveyStatus === 'cancelled' && (
              <View className="my-2 p-4 bg-red-500 rounded-lg">
                <Text className="text-white text-center font-bold">Order Rejected</Text>
                <Text className="text-white text-center mt-2">Reason: {order.rejectionReason}</Text>
              </View>
            )}  
            {isRej === true && (
              <View className="my-2 p-4 bg-red-100 rounded-lg">
                <Text className=" font-bold">Resaon</Text>
                <FormInput title='reason' value={rejectionReason} onChange={(text)=>{setRejectionReason(text)}} />
                <TouchableOpacity className="p-3 rounded-md bg-red-500  flex-1" onPress={handleReject}>
                  <Text className="text-white text-center font-bold">Reject Order</Text>
                </TouchableOpacity>
              </View>
            )} 
          </>
        ) : (
          <Text className="text-center text-gray-500">Order not found</Text>
        )}
      </ScrollView>
    </RestaurantLayout>
  );
}

export default OrderId;

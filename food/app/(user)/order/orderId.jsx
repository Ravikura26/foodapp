import {View, Text, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import UserLayout from '../../../components/user/userLayout'
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { ItemListTable } from '../../(restaurant)/restaurant-order/orders';
import MapComponent from '../../../components/maps/mapComponent';

const OrderDetail = () => {

    const router = useRouter();
    const {id} = useLocalSearchParams();
    const [order,
        setorder] = useState([]);
    const {token} = useSelector((state) => state.auth);
    useEffect(() => {
        async function getAllorders() {
            try {
                const {data} = await axios.get(`/order/order/${id}`, {
                    headers: {
                        token: token
                    }
                });
                if (data.success) {
                    setorder(data.data);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        getAllorders();
    }, []);
  
    
    
    return (
        <UserLayout bg='#F54749' is={false} title='Home'>
            <View className={`p-0 flex flex-row items-center my-1 bg-[#F54749] rounded-lg`}>
                <TouchableOpacity
                    onPress={() => {
                    router.push('order/user-orders')
                }}>
                    <Ionicons name="arrow-back-outline" color="#FFF" size={34}/>
                </TouchableOpacity>
                <Text className="ml-24 p-2 text-base text-white font-light">order details
                </Text>
            </View>
            {/* BODY */} 
            <View className='p-2 bg-slate-300'>
                <View className='my-1  '>
                    <Text className='font-medium'>Order ID</Text>
                    <Text>OD{order._id}</Text>
                </View>
                <View className='my-1 '>
                  <Text className="font-medium">Ordered from Restaurant</Text>
                  <Text>{order?.addedBy?.name}</Text>
                </View>

            </View>
            <View className='p-2 my-1 bg-slate-300'>
            <Text className='my-1 font-medium'>Items details</Text>
            <ItemListTable items={order?.items}/>

            </View>
            {/* user deails */}
            <View className='p-2 my-1 bg-slate-300'>
            <Text className='my-1 font-light'>Ordered by </Text> 
            <Text className='my-1 font-normal'>Name : {order.profileUser?.fullName} </Text> 
            <Text className='my-1 font-normal'>Phone : {order.profileUser?.phone} </Text> 
            <Text className='my-1 font-normal'>Email : {order.profileUser?.email} </Text> 
            <Text className='my-1 font-normal'>Address : {order.profileUser?.address} </Text>  
            </View>
            {/* res deails */}
            <View className='p-2 my-1 bg-slate-300'>
            <Text className='my-1 font-light'>Ordered From </Text> 
            <Text className='my-1 font-medium'>Restaurant Name : {order.profileUser?.fullName} </Text> 
            <Text className='my-1 font-medium'>Restaurant Phone : {order.profileUser?.phone} </Text> 
            <Text className='my-1 font-medium'>Restaurant Email : {order.profileUser?.email} </Text> 
            <Text className='my-1 font-medium'>Restaurant Address : {order.profileUser?.address} </Text>  
            </View>
            {order?.delivery && 
            <View className="p-2 my-1 bg-slate-300">
            <Text className="my-1 font-light">Delivery Details</Text>
            <Text className="my-1 font-medium">Deliver pt. Name: {order?.profileDri?.fullName}</Text>
            <Text className="my-1 font-medium">Deliver pt. Phone: {order?.profileDri?.phone}</Text>
            <Text className="my-1 font-medium">Deliver pt. Email: {order?.profileDri?.email}</Text>
            <Text className="my-1 font-medium">Deliver pt. Address: {order?.profileDri?.address}</Text>
          </View> } 
            <View className='p-2 my-1 bg-slate-300'>
            <Text className='my-1 font-medium'>Grand Total : ${order.total}</Text> 
            </View> 
            <View className='p-2 my-1 bg-green-700 rounded-md'>
            
                <Text className='text-base text-center text-white'>{order.deliveyStatus}</Text> 
          
            </View>
            {order?.deliveyStatus == "Accepted"  && order?.delivery &&   <MapComponent/>}
            {order?.deliveyStatus == "Delivered"&& 
            <View className="p-2 my-1 bg-slate-300">
              <Text>Order delivered succesfully and acount of $ {order.total} recieved succesfully.</Text>
          </View> }
           {
              order.deliveyStatus == "Pending" && <View className='p-2 my-1 bg-red-700 rounded-md'>
              <TouchableOpacity onPress={()=>{

              }} className='p-2 '>
                <Text className='text-base text-center text-white'>cancel</Text>
              </TouchableOpacity>
            

            </View> }
            {
              order.deliveyStatus == "cancelled" && <View className='p-2 my-1 bg-red-700 rounded-md'>
               
                <Text className='text-base  text-white'>Reason : {order.rejectionReason}</Text> 
            

            </View> }
        </UserLayout>
    )
}

export default OrderDetail
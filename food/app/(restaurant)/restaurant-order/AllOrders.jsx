import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useRouter } from 'expo-router';
import RestaurantLayout from '../../../components/layout/restaurant/RestaurantLayout';
import { Ionicons } from '@expo/vector-icons';

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]); 

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const { data } = await axios.get('/order/res', {
          headers: {
            token: token,
          },
        });
        console.log(data);
        

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
  }, [token]);  

  const router = useRouter();

  return (
    <RestaurantLayout bg='#F54749' isTop={false} bg1='#fff' title='Your orders'>
      <View className="bg-[#F4F6F9] my-2 flex flex-row items-center p-2 rounded-md">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={34} color="#F54749" />
        </TouchableOpacity>
        <Text className="text-base font-semibold">All orders</Text>
      </View>
      {/* Body */}
      <View>
        {allOrders.length > 0 ? (
          allOrders?.map((item) => <OrderItem key={item?._id} item={item} />)
        ) : (
          <Text>No pending orders found.</Text>
        )}
      </View>
    </RestaurantLayout>
  );
};

const OrderItem = ({ item }) => {
    const router = useRouter();
  
    return (
      <View className="bg-[#F4F6F9] p-2 my-2 rounded-md">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-base font-semibold">
            Order id: <Text className="font-bold">OD{item._id}</Text>
          </Text>
          <TouchableOpacity className="p-2" onPress={() => router.push(`(restaurant)/restaurant-order/order/${item._id}`)}>
            <Ionicons name="arrow-forward" size={24} color="#F54749" />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-2 items-center">
           
          <Text>order by : {item.orderedBy.name}</Text>
        </View>
        <View className="mt-2 flex flex-row justify-between">
          <Text className="font-semibold">Grand Total:</Text>
          <Text className="font-bold">${item.total.toFixed(2)}</Text>
        </View>
        <View className="mt-2 flex flex-row justify-between">
          <Text className="font-semibold">Order Status:</Text>
          <Text className="font-bold">{item.deliveyStatus}</Text>
        </View>
        <View className="mt-2 flex flex-row justify-between">
          <Text className="font-semibold">Payment Status:</Text>
          <Text className="font-bold">{item.paymentStatus}</Text>
        </View>
      </View>
    );
  };
  
export default AllOrders;

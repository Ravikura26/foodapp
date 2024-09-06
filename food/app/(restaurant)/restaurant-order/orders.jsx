import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import RestaurantLayout from '../../../components/layout/restaurant/RestaurantLayout';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [pendingData, setPendingData] = useState([]);

  const router = useRouter();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const { data } = await axios.get('/order/res', {
          headers: {
            token: token,
          },
        });

        if (data.success) {
          Toast.show({ type: 'success', text2: data.message });
          setAllOrders(data.data);
          const pendingOrders = data.data.filter(order => order.deliveyStatus == 'Pending');
          setPendingData(pendingOrders);
        } else {
          Toast.show({ type: 'error', text2: data.message });
        }
      } catch (error) {
        Toast.show({ type: 'error', text2: error.message });
      }
    }

    fetchOrder();
  }, [token]);

  return (
    <RestaurantLayout bg='#F54749' bg1='#fff' title='Your orders'>
      <View className="bg-[#F4F6F9] flex flex-row justify-between items-center p-2 rounded-md">
        <Text className="text-base font-semibold">Pending orders</Text>
      </View>
      {/* Body */}
      <ScrollView>
        {pendingData.length > 0 ? (
          pendingData.map((item) => <OrderItem key={item._id} item={item} />)
        ) : (
          <Text>No pending orders found.</Text>
        )}
      </ScrollView>
      <View className="my-2 bg-[#F54749] p-2 rounded-md">
        <TouchableOpacity
          className="p-2 flex items-center flex-row mx-auto"
          onPress={() => router.push(`(restaurant)/restaurant-order/AllOrders`)}>
          <Text className="flex text-center text-white text-base items-center">
            All Orders{' '}
          </Text>
          <Ionicons name="arrow-forward" size={34} color="#FFF" />
        </TouchableOpacity>
      </View>
    </RestaurantLayout>
  );
};

export const OrderItem = ({ item }) => {
  const router = useRouter();
  return (
    <View className="bg-[#F4F6F9] p-2 my-2 rounded-md">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-base font-semibold">
          Order ID :<Text className="font-bold"> OD{item._id}</Text>
        </Text>
        <TouchableOpacity
          className="p-2"
          onPress={() =>
            router.push(`(restaurant)/restaurant-order/order/${item._id}`)
          }>
          <Ionicons name="arrow-forward" size={24} color="#F54749" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row gap-2 items-center">
        {/* <Ionicons name="location" size={24} color="#F54749" /> */}
        <Text className='text-black'>order by :{item?.orderedBy?.name}</Text>
      </View>
      <View className="mt-2">
        <Text className="text-xl font-semibold mb-2">Items List</Text>
        <ItemListTable items={item?.items} />
      </View>
      <View className="mt-2 flex flex-row justify-between">
        <Text className="font-semibold">Total:</Text>
        <Text className="font-bold">${item.total.toFixed(2)}</Text>
      </View>
      <View className="mt-2 flex flex-row justify-between">
        <Text className="font-semibold">Payment Status:</Text>
        <Text className="font-bold">{item.paymentStatus}</Text>
      </View>
      <View className="mt-2 flex flex-row justify-between">
        <Text className="font-semibold">delivery Status:</Text>
        <Text className="font-bold">{item.deliveyStatus}</Text>
      </View>
    </View>
  );
};

export const ItemListTable = ({ items }) => {
  return (
    <ScrollView className="border border-gray-300 rounded-md">
      <View className="flex-row bg-gray-100">
        <Text className="flex-1 font-bold p-2 border-r border-gray-300">
          Name
        </Text>
        <Text className="w-20 font-bold p-2 text-center border-r border-gray-300">
          Quantity
        </Text>
        <Text className="w-20 font-bold p-2 text-center">Price</Text>
      </View>
      {items?.map((item, index) => (
        <View key={index} className="flex-row border-t border-gray-300">
          <Text className="flex-1 p-2 border-r border-gray-300">{item.name}</Text>
          <Text className="w-20 p-2 text-center border-r border-gray-300">{item.quantity}</Text>
          <Text className="w-20 p-2 text-center">${item.price.toFixed(2)}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Orders;

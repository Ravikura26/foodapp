import { Text, TouchableOpacity, View } from 'react-native';
import UserLayout from '../../../components/user/userLayout';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useRouter } from 'expo-router';

const UserOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [onTheWayData, setOnTheWayData] = useState([]);
  const [deliveredData, setDeliveredData] = useState([]);
  const [cancelled, setcancelled] = useState([]);
  
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const { data } = await axios.get('/order/user', {
          headers: {
            token: token,
          },
        });

        if (data.success) {
          Toast.show({ type: 'success', text2: data.message });
          const orders = data.data;
          setAllOrders(orders);

          // Filter orders by delivery status
          setPendingData(allOrders.filter(order => order.deliveyStatus == 'Pending'));
          setOnTheWayData(allOrders.filter(order => order.deliveyStatus == 'Accepted'));
          setDeliveredData(allOrders.filter(order => order.deliveyStatus == 'Delivered'));
          setcancelled(allOrders.filter(order => order.deliveyStatus == 'cancelled'));
        } else {
          Toast.show({ type: 'error', text2: data.message });
        }
      } catch (error) {
        Toast.show({ type: 'error', text2: error.message });
      }
    }

    fetchOrder();
  }, [token, allOrders.length]);

  
  return (
    <UserLayout is={false} bg="#F54749" title="Orders">
      <View className="p-2 my-2 bg-red-500 flex flex-row items-center rounded-lg">
        <Text className="text-2xl text-white font-light">Orders</Text>
      </View>
      {/* <Text>{JSON.stringify(allOrders, null, 4)}</Text> */}
      {/* <Text>{JSON.stringify(pendingData, null, 4)}</Text> */}
      <View>
        <AllOrder title="Pending" items={pendingData} />
        <AllOrder title="On the way" items={onTheWayData} />
        <AllOrder title="Delivered" items={deliveredData} />
        <AllOrder title="cancelled" items={cancelled} />
      </View>
    </UserLayout>
  );
};


const AllOrder = ({ title, items }) => { 
  
  const router = useRouter()
  return (
    
      <View className="my-4">
      <Text className="text-xl font-bold mb-2">{title}</Text>
      {items.length === 0 ? (
        <Text className="text-gray-500">No orders in this category</Text>
      ) : (
        items.map((item) => (
          <TouchableOpacity key={item._id} onPress={()=>router.push({
      pathname:`order/orderId`,
      params:{
        id:item._id
      }
    })}> 
          <View  className="p-2 bg-white rounded-lg shadow mb-2">
            <Text>orderId : OD{item._id}</Text>
            <Text>Total Price : ${item.total}</Text>
            <Text>Payment status :  {item.paymentStatus}</Text>
            <Text>Items Ordered</Text>
            <View>
            <View className='flex flex-row justify-between'>
            <Text className='text-base font-medium'>Item</Text>
            <Text className='text-base font-medium'>quantity</Text>
            <Text className='text-base font-medium'>total</Text>
            </View>
            {
              item.items.map((i,index)=>{
                return(
                  <View key={index} className='flex  flex-row justify-between'>
                  <Text>{i.name}</Text>
                  <Text>{i.quantity}</Text>
                  <Text>{i.price * i.quantity}</Text>
                  </View>
                )
              })
            }
            </View>
          </View> 
          </TouchableOpacity>
        ))
      )}
    </View>
  
  );
};

export default UserOrders;

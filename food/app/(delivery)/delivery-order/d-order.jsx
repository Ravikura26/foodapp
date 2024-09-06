import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenLayout from '../../../components/delivery/ScreenLayout';
import { PacketToDeliver } from '../delivery-home';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const DeliveryOrder = () => {
    const [AllOrders, setAllOrders] = useState([]);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        async function fetchOrder() {
            try {
                const { data } = await axios.get('/order/driver', {
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
        <ScreenLayout title='Pending Orders ' bg='#11BB22'>
            {/* Body */}
            <View className="my-2">
            {
                AllOrders.length ==0 && <Text>No Pending orders to deliver</Text>
            }
                {AllOrders.map((item) => (
                    <PacketToDeliver 
                        data={item} 
                        key={item._id}  
                    />
                ))}
            </View>
        </ScreenLayout>
    );
};

export default DeliveryOrder;

import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useRouter} from 'expo-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import ScreenLayout from '../../../components/delivery/ScreenLayout'
import { PacketToDeliver } from '../delivery-home';

const AllOrders = () => {

  const [AllOrders, setAllOrders] = useState([]);

  const route = useRouter()

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
      async function fetchOrder() {
          try {
              const { data } = await axios.get('/order/d-deliver', {
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
  }, [token]);
  return (
    <ScreenLayout title='Completed orders' bg='#11BB22'> 
     <View className="my-2">
            {
                AllOrders.length ==0 && <Text>No completed orders  to display</Text>
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
    </ScreenLayout>
  )
}

export default AllOrders
import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import TopSellingItems from '../../components/restaurant/TopSellingItems';
import RestaurantLayout from '../../components/layout/restaurant/RestaurantLayout';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCatgeories } from '../../appStore/authSlice';
import Toast from 'react-native-toast-message';  
import axios from 'axios';


const RestaurantHomeScreen = () => {
  const dispatch = useDispatch();  
  const { user, token } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [catList, setCatList] = useState([]); 
  const [items,
        setItems] = useState([]); 

  useEffect(() => {
      async function getAll() {
          try {
              const { data } = await axios.get('/category');
              if (data.success) { 
                  setCatList(data.categories);
                  dispatch(setCatgeories(data.categories));  
              } else {
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

      getAll();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('@auth');
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Failed to load user data from AsyncStorage', error);
      }
    };

    fetchUserData();
  }, []);
 
   

    useEffect(() => {
        const getAllItems = async() => {
            try {
                const {data} = await axios.get('/item');
                if (data.success) {
                    setItems(data.data);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        getAllItems();
    }, []);

  return (
    <RestaurantLayout bg="#F54749" bg1="#fff" title="Your Home">
      <View className="flex flex-row">
        <AnalyticsCompo
          text="Items added in the menu."
          num="20"
          Icon={<MaterialIcons name="fastfood" size={80} color="#F54749" />}
        />
        <AnalyticsCompo
          text="Orders delivered successfully."
          num="16+"
          Icon={<MaterialIcons name="delivery-dining" size={80} color="#F54749" />}
        />
      </View>

      

      {/* Top Selling Items Component */}
      <TopSellingItems datas={items} title="Top selling items" />
       
    </RestaurantLayout>
  );
};

export default RestaurantHomeScreen;

export const AnalyticsCompo = ({
    Icon,
    num = '',
    text = ''
}) => {
    return (
        <View className="bg-slate-200 flex-1 shadow-2xl rounded-md px-2 py-4 m-1">
            <View className="mx-auto">
                {Icon}
            </View>
            <View>
                <Text className="text-center font-black text-3xl">{num}</Text>
                <Text className="text-center font-light text-base">{text}</Text>
            </View>
        </View>
    )
}

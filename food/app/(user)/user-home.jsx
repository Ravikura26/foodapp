import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    Alert
} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserLayout from '../../components/user/userLayout';
import {FontAwesome} from '@expo/vector-icons';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import {setCatgeories} from '../../appStore/authSlice'; 
import { addItem } from '../../appStore/cartSlice';
import { useRouter } from 'expo-router';

const UserHome = () => {
    const [items,
        setItems] = useState([]);
    const {user, categories} = useSelector((state) => state.auth);
    const [categoryItems,
        setCategoryItems] = useState(null);
    const [allCategories,
        setallCategories] = useState(null)
    const [selectedCat,
        setSelectedCat] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {
        async function getCategories() {
            try {
                const {data} = await axios.get('/category');
                if (data.success) {
                    dispatch(setCatgeories(data.categories));
                    setallCategories(data.categories)
                } else {
                    Toast.show({type: 'error', text1: data.message});
                }
            } catch (error) {
                Toast.show({type: 'error', text1: error.message});
            }
        }

        getCategories();
    }, [dispatch]);

    useEffect(() => {
        async function getAllItems() {
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
        }

        getAllItems();
    }, []);

    useEffect(() => {
        const filteredItems = selectedCat
            ? items.filter(item => item.category === selectedCat)
            : items;
        setCategoryItems(filteredItems);
    }, [selectedCat, items]);

    return (
        <UserLayout bg='#F54749' title='Home'>
            <View className="my-2 p-2 bg-white rounded-md">
                <Text className="text-2xl font-extrabold">Welcome to Food App</Text>
                <Text className="text-xl font-extrabold">{user
                        ?.name || ''}</Text>
                <View className="h-24 text-center flex justify-center items-center">
                    <Text>For Image</Text>
                </View>
            </View>

            {/* Components */}
            <View>
                <ItemSearchInput items={items} placeholder="Search your fav item..."/>
                <SearchByCategories
                    selectedCat={selectedCat}
                    setSelectedCat={setSelectedCat}
                    data={categories}/>
                <AllItems selectedCat={selectedCat} items={categoryItems}/>
            </View>
        </UserLayout>
    );
};

 
export const ItemSearchInput = ({ placeholder, items }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedItems, setSearchedItems] = useState([]);
  const router = useRouter()


  useEffect(() => {
    // Filter items based on the search query
    if (searchQuery.trim() === '') {
      setSearchedItems([]);
    } else {
      const filteredItems = items?.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchedItems(filteredItems);
    }
  }, [searchQuery, items]);

  return (
    <View className="my-2 bg-white rounded-md p-2">
      <View className="flex p-2 flex-row justify-between items-center border border-gray-300 rounded-md">
        <TextInput
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)} 
          style={{
                    flex: 1
                }}
        />
        <TouchableOpacity onPress={() => console.log('search')}>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {searchQuery.trim() !== '' && (
        <View className="mt-2 bg-white rounded-md shadow-md">
          {searchedItems?.length > 0 ? (
            searchedItems.map(item => (
              <TouchableOpacity key={item._id} onPress={()=> router.push({
      pathname: "menu/single-item",
      params: { id: item._id }, 
    })}>
              <View  className="p-2 border-b border-gray-300">
                <Text>{item.name}</Text>
              </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="p-2 text-gray-500">No results found</Text>
          )}
        </View>
      )}
    </View>
  );
};



export const SearchByCategories = ({data, selectedCat, setSelectedCat}) => {
    return (
        <View className="my-2 bg-white rounded-md p-2">
            <Text className="text-xl my-2 font-light">Go by categories</Text>
            
            <FlatList
                data={data}
                horizontal={true}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({item}) => (
                <TouchableOpacity onPress={() => setSelectedCat(item.name)}>
                    <View
                        className={`p-2 my-1 mr-2 rounded ${selectedCat === item.name
                        ? 'bg-gray-400'
                        : 'bg-gray-100'}`}>
                        <Text className="text-base">{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )}/>
        </View>
    );
};

export const AllItems = ({selectedCat, items}) => {
    return (
        <View className="my-2 p-2 bg-white rounded-md">
            <View>
                <Text className="text-xl font-light">{selectedCat
                        ? `${selectedCat} items`
                        : 'All items'}</Text>
                <View>
                    {items
                        ?.length === 0
                            ? (
                                <Text>No items in the system.</Text>
                            )
                            : (items
                                ?.map((item) => <ItemComponent key={item._id} item={item}/>))}
                </View>
            </View>
        </View>
    );
};

 const ItemComponent = ({item}) => {
  const router = useRouter();
    return (
        <View className="my-2 bg-neutral-400 rounded-lg"> 
            <Image
                source={{
                uri: item.image
            }}
                className="w-full rounded-lg h-40"/>
            {/* Item details */}
            <View className="p-2">
              <Text className='text-base font-light'>{item.name}</Text>
              <Text className='text-base font-light'>category : <Text>{item.category}</Text></Text>
              <View className='flex flex-row my-1 justify-between'>
                <Text className='font-medium text-base'>$ {item.price}</Text>
                <Text className='font-medium text-base'>{item.weight}</Text>
              </View>
              <View className='bg-[#F54749] p-2 '>
               <TouchableOpacity onPress={()=>{
                router.push({
      pathname: "menu/single-item",
      params: { id: item._id }, 
    });
               }}>
                <Text className='text-center font-base font-medium text-white'>check</Text>
               </TouchableOpacity>
              </View>
            </View> 
        </View>
    )

}
export default UserHome;

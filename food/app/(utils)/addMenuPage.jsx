import {View, ScrollView, Text, Image} from 'react-native'
import React, {useState} from 'react'
import HeadingNavBar from '../../components/utils/HeadingNavBar'
import {SafeAreaView} from 'react-native-safe-area-context'
import FormInput from '../../components/FormInput'
import CustomButton from '../../components/CustomButton'

const AddItem = () => {

    const [itemData,
        setitemData] = useState({name: ""});
    function changeHandler(field, value) {
        setFormData(prevData => ({
            ...prevData,
            field: value
        }));
    }

    function handleSubmit() {
        // Here you would typically send the formData to your backend
        console.log('Form submitted:', formData);
        // Add your signup logic here
    }
    return (
        <SafeAreaView className="flex-1 min-h-screen">
            <ScrollView className="flex-1 min-h-screen">
                <View className="bg-[#fff] flex-1 min-h-screen">
                    <View className="bg-[#F54749] px-2 py-4 sticky top-0 left-0 ">
                        <Text className="text-2xl font-semibold text-white">Add items</Text>
                    </View>
                    <View className="p-2 bg-slate-100 mt-1">
                        <Image
                            source={'https://picsum.photos/id/237/200/300'}
                            resizeMode='contain'
                            className=" w-full rounded-lg bg-slate-500 h-32"/>
                        <FormInput
                            title='Item Name'
                            value={itemData.name}
                            onChange={(value) => changeHandler('name', value)}/>
                        <FormInput
                            title='Description'
                            value={itemData.name}
                            onChange={(value) => changeHandler('name', value)}/>
                        <FormInput
                            title='Category'
                            value={itemData.name}
                            onChange={(value) => changeHandler('name', value)}/>
                        <FormInput
                            title='Price'
                            value={itemData.name}
                            onChange={(value) => changeHandler('name', value)}/>
                        <CustomButton title="Add Item" bg='#F54749' onCLick={handleSubmit}/>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddItem
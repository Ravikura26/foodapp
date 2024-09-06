import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {icons} from '../../constants'
import {InitalData} from '../../constants/data'
import CustomButton from '../../components/CustomButton'
import {useRouter} from 'expo-router'

const StartScreen = () => {

    const [index,
        setIndex] = useState(0);
    const router = useRouter();

    const handleIndex = () => {
        if (index < InitalData.length - 1) {
            setIndex((prev) => prev + 1);
        }
    };

    function handleSkip() {
        router.push('signup')
    }

    const handlePrevIndex = () => {
        if (index > 0) {
            setIndex((prev) => prev - 1);
        }
    };
    function handleHome(){
        router.push('restaurant-home')
    }

    function handleDelivery(){
        router.push('admin-home')
    }
    function handleUser(){
        router.push('delivery-home')
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="bg-[#FFF] h-screen flex-1 pt-4 items-center">
                    <View>
                        <View className="p-4 flex flex-row justify-between">
                            <TouchableOpacity onPress={handlePrevIndex}>
                                <Image
                                    source={icons.left}
                                    className={`${index === 0
                                    ? "hidden"
                                    : ""} w-4 h-4`}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSkip} className="flex flex-row items-center">
                                <Text className="text-[#F54749] text-sm text-right mr-1">Skip</Text>
                                <Image source={icons.right} className="w-3 h-3"/>
                            </TouchableOpacity>
                        </View>
                        <Image source={InitalData[index].icon}/>
                        <Text className="text-xl m-2 text-[#F54749] text-center">{InitalData[index].title}</Text>
                        <Text className="text-md m-2 text-[#000] leading-5 text-center">{InitalData[index].description}</Text>
                    </View>
                    
                    <View className="flex flex-row gap-4">
                        {[0, 1, 2].map((item) => (
                            <View
                                key={item}
                                className={`${index === item
                                ? "bg-[#F54749]"
                                : ""} w-3 h-3 border-2 border-slate-100 rounded-full`}>
                                <Text></Text>
                            </View>
                        ))}
                    </View>
                    <View className="mt-6 p-4 w-screen">
                        <CustomButton
                            bg="#F54749"
                            onCLick={index === 2
                            ? handleSkip
                            : handleIndex}
                            title={index === 2
                            ? "GET STARTED"
                            : "NEXT"}/> 
                            <CustomButton
                            bg="#F54749"
                            onCLick={handleHome }
                            title={"Restaurant"}/>
                             <CustomButton
                            bg="#F54749"
                            onCLick={handleDelivery }
                            title={"Admin"}/>
                           
                            
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StartScreen

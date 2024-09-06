import {View, Text, ScrollView, Image} from 'react-native'
import React, { useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {icons} from '../../constants'
import {Link} from 'expo-router'
import FormInput from '../../components/FormInput'
import CustomButton from '../../components/CustomButton'

const forgotpassword = () => {
    const [email, setEmail] = useState(''); 
    const handleSubmit=()=>{

    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View className="bg-[#Fff h-screen p-4 flex-1 ">
                    <View className="flex flex-row items-center gap-20">
                        <Link href={'/signin'}><Image className="w-4 h-4" source={icons.left}/>
                        </Link>
                        <Text className="font-semibold text-lg">Forget password</Text>
                       
                    </View> 
                    <View className="mt-8">
                            <Text >
                                Please enter your email address. You will receive a link to create a new
                                password via email.
                            </Text>
                            <FormInput title="email" value={email} onChange={(text)=>setEmail(text)} />
                            <CustomButton title="SEND" bg='#F54749' onCLick={handleSubmit}/>
                        </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default forgotpassword
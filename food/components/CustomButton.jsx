import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({bg,title, onCLick,}) => {
  return (
    <View className={`rounded-full bg-[${bg}] my-1 w-full h-12 p-2 text-center`}>
      <TouchableOpacity onPress={onCLick}>
      <Text className="text-white text-center text-xl">{title}</Text>
      </TouchableOpacity>
    </View>
  )
}



export const AuthButton =({title,handlePress})=>{
  return(
    <View className='bg-[#F45749] rounded-full my-2'> 
      <TouchableOpacity onPress={handlePress}>
        <Text className="text-center p-2  text-xl text-white ">
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  )

}

export default CustomButton
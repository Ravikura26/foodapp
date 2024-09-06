import { View, Text } from 'react-native'
import React, { useState } from 'react'

const CustomToast = ({message=""}) => {

    const [show, setShow] = useState(true)


    setTimeout(()=>{
        setShow(false)
    },2000)
  return (
   <>
    {show &&  <View className="relative bg-slate-300 p-4 rounded-md">
        <View className="absloute top-0 left-0">
            <View><Text>{message}</Text></View>
        </View>
    </View>}
   </>
  )
}

export default CustomToast
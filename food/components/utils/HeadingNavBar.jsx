import {View, Text} from 'react-native'
import React from 'react'

const HeadingNavBar = ({
    title = ""
}) => {
    return (
        <View className="bg-[#F54749] px-2 py-4 sticky top-0 left-0 ">
            <Text className="text-2xl font-semibold text-white">{title}</Text>
        </View>
    )
}

export default HeadingNavBar
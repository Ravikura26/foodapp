import { Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const AddItem = () => {
    // AddMenu
  return (
    <View className="rounded-lg bg-slate-400 p-2">
      <Link href={'/AddMenu'} className=''>
        AddItem
      </Link>
    </View>
  )
}

export default AddItem
 
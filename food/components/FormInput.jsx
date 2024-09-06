import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {icons} from '../constants'

const FormInput = ({value, title, onChange}) => {
    const [show, setShow] = useState(false)

    return (
        <View className="my-2 ">
            <Text className="text-md uppercase pl-4 mt-2">
                {title}
            </Text>
            {title === 'password'
                ? <View className="rounded-full border-2 h-12 p-2 text-lg border-slate-300 relative ">
                    <TextInput
                        onChangeText={(text) => onChange(text)}
                        className=""
                        value={value}
                        secureTextEntry={!show}
                    />
                    <TouchableOpacity 
                        className="absolute top-1/2 right-2" 
                        onPress={() => setShow(!show)} 
                    >
                        <Image 
                            className="w-6 h-6"
                            source={show ? icons.eye : icons.notEye}
                        />
                    </TouchableOpacity>
                  </View>
                : <TextInput
                    onChangeText={(text) => onChange(text)}
                    className="rounded-full border-2 h-12 p-2 text-lg border-slate-300"
                    value={value}
                  />
            }
        </View>
    )
}

export default FormInput
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message'; 

import axios from 'axios';
import * as FileSystem from 'expo-file-system'; // Import FileSystem

const ImageUpload = ({ onImageSelected }) => {
    const [image, setImage] = useState(null);
    const [isUpload, setIsUpload] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            onImageSelected(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            onImageSelected(result.assets[0].uri);
        }
    };

    const UploadPhoto = async () => {
        if (!image) return;

        const imageForm = new FormData();
        const filename = image.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        const file = await FileSystem.readAsStringAsync(image, {
            encoding: FileSystem.EncodingType.Base64,
        });

        imageForm.append('image', {
            uri: image,
            name: filename,
            type: type,
            data: file,
        });

        try {
            const { data } = await axios.post('/category/upload', imageForm, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setIsUpload(true);
            onImageSelected(data.url) ;
            Toast.show({
                type: 'success',
                text1: 'Image Uploaded succesfully', 
              }); 
        } catch (error) {
            console.log(error);
            console.log(error.message);
        }
    };

    return (
        <View className='bg-slate-300 p-2 rounded-md my-2'>
            {image ? (
                <Image
                    width={300}
                    resizeMode='contain'
                    className="mx-auto mb-3 rounded-md"
                    height={200}
                    source={{ uri: image }}
                />
            ) : (
                <View className="mx-auto">
                    <Ionicons name="image-outline" size={300} color="#999" />
                    <Text className='text-center italic text-base'>No image selected</Text>
                </View>
            )}
            <View className='flex flex-row justify-between gap-1 '>
                <TouchableOpacity
                    className="flex-1 text-center p-4 rounded-md bg-[#F54749]"
                    onPress={pickImage}
                >
                    <Text className="text-base text-center font-semibold text-white">Pick an image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 text-center p-4 rounded-md bg-[#F54749]"
                    onPress={takePhoto}
                >
                    <Text className="text-base text-center font-semibold text-white">Take a photo</Text>
                </TouchableOpacity>
            </View>

            {image && (
                <TouchableOpacity
                    className="text-center p-4 my-4 rounded-md bg-[#F54749]"
                    onPress={UploadPhoto}
                >
                    <Text className="text-base text-center font-semibold text-white">{isUpload ? "image uploaded" :"upload Image"}</Text>
                </TouchableOpacity>
            )}
            <View>
                <Text className="text-sm italic font-extralight">* Please upload the image first</Text>
            </View>
        </View>
    );
};

export default ImageUpload;

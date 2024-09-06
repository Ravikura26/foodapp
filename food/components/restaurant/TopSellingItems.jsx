import {View, Text, Image} from 'react-native'
import React from 'react' 

const TopSellingItems = ({
    title = '',datas
}) => {
    return (
        <View className="my-2 rounded-md   p-2">
            <Text className="text-xl text-grey">{title}</Text>
            <View>
                {datas
                    .slice(0, 3)
                    .map((data) => <FoodItemComponent product={data} key={data._id}/>)
}
            </View>
        </View>
    )
}

const FoodItemComponent = ({product}) => {

    return (
        <View className='my-2 p-2 rounded-md bg-[#F4F6F9] '>
            <View className="flex flex-row gap-2">
                <View className='basis-2/5'>
                    <Image
                        source={{
                        uri: product.image
                    }}
                        alt='imageproduct'
                        width={100}
                        height={100}
                        resizeMode='cover'
                        className='w-full rounded-md object-cover'/>
                </View>
                <View className='basis-3/5'>
                    <Text className="text-base font-semibold ">{product.name}</Text>
                    <Text className="text-base ">{product.category}</Text>
                    <Text className="text-base italic ">{product.weight}</Text>
                    <Text className="text-base  ">${" "}{product.price}</Text>
                </View>

            </View>
            <View className="   mt-1  items-center">
                <Text>{product.description}</Text>
            </View>
        </View>
    )
}

export default TopSellingItems
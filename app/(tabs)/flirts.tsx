import { primaryBlack } from '@/assets/utils/colors';
import { truncateSentenceSafe } from '@/assets/utils/functions';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import { FlatList, Image, Text, View } from 'react-native';

type TestDataType = {name: string, photo_uri: string, last_message: string, last_message_ts: number, unread_messages: number, is_free_slot: boolean};

const TEST_DATA: TestDataType[] = [
    {name: "Ouiam", photo_uri: "https://i.pinimg.com/736x/6b/16/2d/6b162dccddf34dbc4b0040d911d3046f.jpg", last_message: "Taw7achtek mon coeur", last_message_ts: 1756036575, unread_messages: 0, is_free_slot: false},
    {name: "Aya", photo_uri: "https://i.pinimg.com/736x/c1/6e/03/c16e0336d927bfc1f8b1d3f69068ebc5.jpg", last_message: "Haha j'adore ! Il faudrait qu'on se fasse ça un jour. Moi de mon côté j'adore comment tu te prends pour tout ça en même temps !", last_message_ts: 1756036575, unread_messages: 10, is_free_slot: false},
    {name: "", photo_uri: "", last_message: "", last_message_ts: 0, unread_messages: 0, is_free_slot: true},
];

const renderItem = ({item}: {item: TestDataType}) => {
    let last_message = truncateSentenceSafe(item.last_message);
    let unread_messages = item.unread_messages < 10 ? item.unread_messages : "9+";

    
    if (item.is_free_slot) {
        return (
            <View className='w-full mb-5 px-1 py-2'>
                <View className='w-full min-h-20 flex-row justify-between items-center gap-4'>
                    <View className='w-20 h-20 flex justify-center items-center rounded-full border border-dashed border-primaryBlack opacity-30 overflow-hidden'>
                        <AntDesign name="plus" size={24} color={primaryBlack} />
                    </View>
                    <View className='flex-1 gap-2 min-w-0'>
                        <Text className='text-primaryBlack'>This slot is available for a flirt !</Text>
                    </View>
                </View>
            </View>
        )
    }
    else {
        return (
            <Link href={"../pages/chat"} className='w-full mb-5 px-1 py-2'>
                <View className='w-full min-h-20 flex-row justify-between items-center gap-4'>
                    <View className='w-20 h-20 rounded-full overflow-hidden'>
                        <Image source={{ uri: item.photo_uri }} className='w-full h-full' />
                        <BlurView intensity={30} tint='light' className='absolute w-full h-full rounded-full' />
                    </View>
                    <View className='flex-1 gap-2 min-w-0'>
                        <Text className='font-agathobold text-2xl text-primaryBlack'>{item.name}</Text>
                        <Text className='text-primaryBlack'>{last_message}</Text>
                    </View>
                    {unread_messages !== 0 && (
                        <View className='w-8 h-8 rounded-full flex justify-center items-center bg-primaryColor'>
                            <Text className='font-agathobold text-[20px] text-white'>{unread_messages}</Text>
                        </View>
                    )}
                </View>
            </Link>
        )
    }
};

export default function FlirtPage() {
    return (
        <View className='flex-1 p-5'>
            <Text className='mb-2 text-5xl font-agathomedium'>Flirts</Text>
            <FlatList className='pt-4' data={TEST_DATA} renderItem={renderItem} />
        </View>
    )
}
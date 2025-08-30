import { primaryColor } from '@/assets/utils/colors';
import { EDirection } from '@/assets/utils/enums';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, Platform, Pressable, ScrollView, Text, View } from 'react-native';

const URIS: string[] = [
    "https://i.pinimg.com/474x/67/62/54/6762544a2e1aaad8f58f8e187f6883c4.jpg",
    "https://i.pinimg.com/originals/70/1f/8c/701f8c99023e0d4fc211e6424a9450b5.jpg",
    "https://i.pinimg.com/736x/94/f5/49/94f5493330a1efee310e1b9cd1a27b06.jpg",
    // "https://img.freepik.com/free-photo/medium-shot-smiley-man-holding-burger_23-2149556998.jpg?semt=ais_hybrid&w=740&q=80",
    // "https://img.freepik.com/free-photo/front-view-smiley-man-taking-selfie_23-2149556994.jpg?w=360",
    // "https://img.freepik.com/free-photo/smiley-man-taking-selfie-outside-medium-shot_23-2149556982.jpg?semt=ais_hybrid&w=740&q=80",
];


export default function RecommendationPage() {
    const [vocalBars] = useState(() => Array.from({length: 30}, () => Math.floor(Math.random() * 36 + 4)));
    const [imageIndex, setImageIndex] = useState(0);
    
    const updateImageIndex = (direction: number) => {
        let newIndex = imageIndex;

        if (direction == EDirection.Left) {
            newIndex = imageIndex == 0 ? imageIndex : imageIndex - 1;
            
            if (Platform.OS === "ios") {
                imageIndex == 0 ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            else {
                imageIndex == 0 ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error) : Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Clock_Tick);
            }
        }
        else if (direction == EDirection.Right) {
            newIndex = imageIndex == URIS.length - 1 ? imageIndex : imageIndex + 1;

            if (Platform.OS === "ios") {
                imageIndex == URIS.length - 1 ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            else {
                imageIndex == URIS.length - 1 ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error) : Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Clock_Tick);
            }
        }

        setImageIndex(newIndex);
    };

    return (
        <LinearGradient className='flex-1 bg-gray-100' colors={["#ffffff", "#E4E2E3"]}>
            {/* <MainTitle>Recommendations</MainTitle> */}

            {/* Points */}
            <View className='w-full py-5 flex-row justify-center items-center gap-2'>
                <View className={`w-2 h-2 rounded-full bg-black opacity-30`}></View>
                <View className={`w-2 h-2 rounded-full bg-primaryColor opacity-100`}></View>
                <View className={`w-2 h-2 rounded-full bg-black opacity-30`}></View>
            </View>

            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150, gap: 12 }} className='px-5'>
                {/* Profile pictures */}
                <View className='w-full h-[320px] rounded-3xl overflow-hidden flex-row bg-orange-300'>
                    <Image source={{ uri: URIS[imageIndex] }} className='absolute w-full h-full' resizeMode='cover' />
                    <BlurView intensity={60} tint='light' className="absolute w-full h-full" />

                    <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.7)"]}
                        style={{
                        position: "absolute",
                        bottom: 0,
                        height: "60%",
                        width: "100%",
                        }}
                    />

                    <View className='absolute w-full p-5 flex-row items-center gap-3'>
                        {URIS.map((_, index) => (
                            <View key={index} className={`rounded-full flex-1 text-center bg-white ${index == imageIndex ? "opacity-100 h-[5px]" : "opacity-30 h-1"}`}></View>
                        ))}
                    </View>

                    <View className="absolute w-full bottom-0 p-5">
                        <Text className='mb-5 text-white text-5xl font-agathoblack'>Ouiam, <Text className='font-agathomedium'>20</Text></Text>
                        <View className='flex-row gap-3 items-center'>
                            <View className='px-4 py-2 rounded-full' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
                                <Text className='text-white'>📍 Paris</Text>
                            </View>

                            <View className='px-4 py-2 rounded-full' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
                                <Text className='text-white'>💼 Software Engineer</Text>
                            </View>
                        </View>
                    </View>

                    <Pressable className="w-1/2 h-full" onPress={() => {
                        (Platform.OS === "ios") ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) : Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Clock_Tick);
                        updateImageIndex(EDirection.Left)
                    }}></Pressable>
                    <Pressable className="w-1/2 h-full" onPress={() => {
                        (Platform.OS === "ios") ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) : Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Clock_Tick);
                        updateImageIndex(EDirection.Right)
                    }}></Pressable>
                </View>


                {/* Introduction vocal message */}
                <View className='w-full my-5 gap-3'>
                    <View className='px-2'>
                        <Text className='text-4xl font-agathomedium'>My introduction</Text>
                    </View>
                    <View className='w-full p-5 rounded-3xl flex-row items-center gap-3 bg-white'>
                        <View className='px-5'>
                            <FontAwesome6 name="play" size={24} color="black" />
                        </View>
                        <View className='flex-grow flex-row items-center justify-between'>
                            {vocalBars.map((num, idx) => (
                                <View className={`bg-black w-1 rounded-full`} style={{ height: num }} key={idx}></View>
                            ))}
                        </View>
                    </View>
                </View>


                {/* FIXME: Bio x about me */}
                <View className='w-full px-5 pb-5 pt-3 rounded-3xl gap-6 bg-white'>
                    <View>
                        <Text className='mb-3 font-agathomedium text-3xl'>About me</Text>
                        <View className='flex-row flex-wrap gap-3 items-center'>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>🚺 Woman</Text>
                            </View>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>📏 167cm</Text>
                            </View>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>☪️ Muslim</Text>
                            </View>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>👶 I want someday</Text>
                            </View>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>🍷 Never</Text>
                            </View>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>🚬 Stopped</Text>
                            </View>
                        </View>
                    </View>
                </View>


                {/* Personnality and character */}
                <View className='w-full p-5 rounded-3xl gap-6 bg-white'>
                    <View>
                        <Text className='mb-3 font-agathomedium text-3xl'>My personality</Text>
                        <Text>I am an affectionate, curious girl with a lot of love to give. I am very attentive to people and eager to learn new fields or skills</Text>
                    </View>

                    <View>
                        <Text className='mb-3 font-agathomedium text-3xl'>What matters to me in life</Text>
                        <Text>I am very family oriented, hece this is a main point for me. I would like to get kids one day. 
                            Moreover, I am a hard-working girl: no career no life. Finally, I give particular attention to political opinions and values.</Text>
                    </View>
                </View>


                {/* Hobbies */}
                <View className='w-full p-5 rounded-3xl bg-white'>
                    <View>
                        <Text className='mb-3 font-agathomedium text-3xl'>Hobbies</Text>
                        <View className='flex-row flex-wrap gap-3 items-center'>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>🎵 Arabic music</Text>
                            </View>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>⚽ Real Madrid</Text>
                            </View>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>🧳 Travel</Text>
                            </View>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>🤲 Religion</Text>
                            </View>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>🖼️ Museums</Text>
                            </View>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>💻 Coding</Text>
                            </View>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>🐈 Cats</Text>
                            </View>
                            <View className='px-4 py-2 rounded-full bg-[#F1F1F1]'>
                                <Text className='text-black'>🍲 Cooking</Text>
                            </View>
                        </View>
                    </View>
                </View>


                <View className='w-full p-5 rounded-3xl gap-6 bg-white'>
                    <View>
                        <Text className='mb-3 font-agathomedium text-3xl'>Your main qualities</Text>
                        <Text>I am an affectionate, curious girl with a lot of love to give. I am very attentive to people and eager to learn new fields or skills</Text>
                    </View>
                    
                    <View>
                        <Text className='mb-3 font-agathomedium text-3xl'>What are your defaults ?</Text>
                        <Text>I need too much attention. Sometimes, I could be too excited and a bit embarassing for people</Text>
                    </View>
                </View>


                {/* FIXME: Ice breakers */}
                <View className='w-full p-5 rounded-3xl gap-6 bg-white'>
                    <Text className='mb-3 font-agathomedium text-3xl'>Ice breakers</Text>
                    <View>
                        <Text className='mb-2 font-agathobold text-2xl'>Two truths and a lie 👀</Text>
                        <Text>
                            I have a lion{"\n"}
                            I speak Chinese{"\n"}
                            I have never been to Paris
                        </Text>
                    </View>
                    <View>
                        <Text className='mb-2 font-agathobold text-2xl'>What's your love language ?</Text>
                        <Text>I am very sensitive to words, gifts and touch</Text>
                    </View>
                    <View>
                        <Text className='mb-2 font-agathobold text-2xl'>Coffee ☕ or tea 🍵?</Text>
                        <Text>Orang juice, and I don't care about it wasn't mentioned</Text>
                    </View>
                </View>


                {/* FIXME: Dating preferences */}
                <View className='w-full p-5 rounded-3xl gap-6 bg-white'>
                    <Text className='mb-3 font-agathomedium text-3xl'>Dating preferences</Text>
                    <View>
                        <Text className='mb-2 font-agathobold text-2xl'>What is your date vibe ?</Text>
                        <Text>
                            I love cosy & calm places. I can stay there forever if they are classy.
                        </Text>
                    </View>
                    <View>
                        <Text className='mb-2 font-agathobold text-2xl'>Any must ?</Text>
                        <Text>No flowers, no date</Text>
                    </View>
                    <View>
                        <Text className='mb-2 font-agathobold text-2xl'>Foodie date 🍔 or activity date 🛶?</Text>
                        <Text>Better food than activities at first</Text>
                    </View>
                </View>
            </ScrollView>

            {/* FIXME: Buttons */}
            <View className='absolute bottom-16 w-full flex-row items-center justify-center gap-7'>
                <Pressable className='w-[72px] h-[72px] rounded-full shadow-lg flex items-center justify-center bg-white'>
                    <FontAwesome name='times' size={36} color={primaryColor} />
                </Pressable>
                <Pressable className='w-[72px] h-[72px] rounded-full shadow-lg flex items-center justify-center' style={{backgroundColor: primaryColor}}>
                    <FontAwesome name='heart' size={36} color="#fff" />
                </Pressable>
            </View>
        </LinearGradient>
    );
}

import { primaryColor } from '@/assets/utils/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const URIS: string[] = [
    "https://i.pinimg.com/474x/67/62/54/6762544a2e1aaad8f58f8e187f6883c4.jpg",
    "https://i.pinimg.com/originals/70/1f/8c/701f8c99023e0d4fc211e6424a9450b5.jpg",
    "https://i.pinimg.com/736x/94/f5/49/94f5493330a1efee310e1b9cd1a27b06.jpg",
    // "https://img.freepik.com/free-photo/medium-shot-smiley-man-holding-burger_23-2149556998.jpg?semt=ais_hybrid&w=740&q=80",
    // "https://img.freepik.com/free-photo/front-view-smiley-man-taking-selfie_23-2149556994.jpg?w=360",
    // "https://img.freepik.com/free-photo/smiley-man-taking-selfie-outside-medium-shot_23-2149556982.jpg?semt=ais_hybrid&w=740&q=80",
];

enum Direction {
    Left,
    Right,
};

export default function ProfileConcept() {
    const [vocalBars] = useState(() => Array.from({length: 30}, () => Math.floor(Math.random() * 36 + 4)));
    const [imageIndex, setImageIndex] = useState(0);

    const updateImageIndex = (direction: number) => {
        let newIndex = imageIndex;

        if (direction == Direction.Left) {
            newIndex = imageIndex == 0 ? imageIndex : imageIndex - 1;
        }
        else if (direction == Direction.Right) {
            newIndex = imageIndex == URIS.length - 1 ? imageIndex : imageIndex + 1;
        }

        setImageIndex(newIndex);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 px-3">
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120, paddingTop: 20, gap: 12 }}>
                    {/* FIXME: Images */}
                    <StatusBar style="dark" />
                    <View className="w-full h-[350px] rounded-3xl flex-row overflow-hidden">
                        <Image source={{uri: URIS[imageIndex]}} className="absolute w-full h-full" resizeMode="cover" />
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
                            {/* <Text className='mb-5 text-white text-3xl font-bold'>Shafa Asadel, <Text className='font-normal'>20</Text></Text> */}
                            <Text className='mb-5 text-white text-4xl font-bold'>Ouiam, <Text className='font-normal'>20</Text></Text>
                            <View className='flex-row gap-3 items-center'>
                                <View className='px-4 py-2 rounded-full' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
                                    <Text className='text-white'>📍 Paris</Text>
                                </View>

                                <View className='px-4 py-2 rounded-full' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
                                    <Text className='text-white'>💼 Software Engineer</Text>
                                </View>
                            </View>
                        </View>

                        <Pressable className="w-1/2 h-full" onPress={() => updateImageIndex(Direction.Left)}></Pressable>
                        <Pressable className="w-1/2 h-full" onPress={() => updateImageIndex(Direction.Right)}></Pressable>
                    </View>


                    {/* FIXME: Vocal message (aiming to replace the written bio) */}
                    <View className='w-full mt-5 px-2'>
                        <Text className='text-3xl'>My introduction</Text>
                    </View>
                    <View className='w-full p-5 mb-5 rounded-3xl flex-row items-center gap-3 bg-white'>
                        <View className='px-5'>
                            <FontAwesome6 name="play" size={24} color="black" />
                        </View>
                        <View className='flex-grow flex-row items-center justify-between'>
                            {vocalBars.map((num, idx) => (
                                <View className={`bg-black w-1 rounded-full`} style={{ height: num }} key={idx}></View>
                            ))}
                        </View>
                    </View>
                    

                    {/* FIXME: Bio x About Me */}
                    <View className='w-full p-5 rounded-3xl gap-6 bg-white'>
                        {/* <View>
                            <Text className='mb-2 font-bold text-xl'>Bio</Text>
                            <Text>
                                Music enthusiast, always on the lookout for new tunes and ready to share playlists. Let's discover new sounds and enjoy the rhythm of it !
                            </Text>
                        </View> */}
                        
                        <View>
                            <Text className='mb-2 font-bold text-xl'>About me</Text>
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
                            <Text className='mb-2 font-bold text-xl'>My personality in a few words</Text>
                            <Text>I am an affectionate, curious girl with a lot of love to give. I am very attentive to people and eager to learn new fields or skills</Text>
                        </View>

                        <View>
                            <Text className='mb-2 font-bold text-xl'>What matters to me in life</Text>
                            <Text>I am very family oriented, hece this is a main point for me. I would like to get kids one day. 
                                Moreover, I am a hard-working girl: no career no life. Finally, I give particular attention to political opinions and values.</Text>
                        </View>
                    </View>


                    {/* Hobbies */}
                    <View className='w-full p-5 rounded-3xl bg-white'>
                        <View>
                            <Text className='mb-2 font-bold text-xl'>Hobbies</Text>
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
                            <Text className='mb-2 font-bold text-xl'>Tell us about your main qualities</Text>
                            <Text>I am an affectionate, curious girl with a lot of love to give. I am very attentive to people and eager to learn new fields or skills</Text>
                        </View>
                        
                        <View>
                            <Text className='mb-2 font-bold text-xl'>What are some of your defaults ?</Text>
                            <Text>I need too much attention. Sometimes, I could be too excited and a bit embarassing for people</Text>
                        </View>
                    </View>


                    {/* FIXME: Ice breakers */}
                    <View className='w-full p-5 rounded-3xl gap-6 bg-white'>
                        <Text className='mb-2 font-bold text-xl'>Ice breakers</Text>
                        <View>
                            <Text className='mb-2 font-bold'>Two truths and a lie 👀</Text>
                            <Text>
                                I have a lion{"\n"}
                                I speak Chinese{"\n"}
                                I have never been to Paris
                            </Text>
                        </View>
                        <View>
                            <Text className='mb-2 font-bold'>What's your love language ?</Text>
                            <Text>I am very sensitive to words, gifts and touch</Text>
                        </View>
                        <View>
                            <Text className='mb-2 font-bold'>Coffee ☕ or tea 🍵?</Text>
                            <Text>Orang juice, and I don't care about it wasn't mentioned</Text>
                        </View>
                    </View>


                    {/* FIXME: Dating preferences */}
                    <View className='w-full p-5 rounded-3xl gap-6 bg-white'>
                        <Text className='mb-2 font-bold text-xl'>Dating preferences</Text>
                        <View>
                            <Text className='mb-2 font-bold'>What is your date vibe ?</Text>
                            <Text>
                                I love cosy & calm places. I can stay there forever if they are classy.
                            </Text>
                        </View>
                        <View>
                            <Text className='mb-2 font-bold'>Any must ?</Text>
                            <Text>No flowers, no date</Text>
                        </View>
                        <View>
                            <Text className='mb-2 font-bold'>Foodie date 🍔 or activity date 🛶?</Text>
                            <Text>Better food than activities at first</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            {/* FIXME: Buttons */}
            <View className='absolute bottom-8 w-full flex-row items-center justify-center gap-7'>
                <Pressable className='w-[72px] h-[72px] rounded-full shadow-lg flex items-center justify-center bg-white'>
                    <FontAwesome name='times' size={36} color={primaryColor} />
                </Pressable>
                <Pressable className='w-[72px] h-[72px] rounded-full shadow-lg flex items-center justify-center' style={{backgroundColor: primaryColor}}>
                    <FontAwesome name='heart' size={36} color="#fff" />
                </Pressable>
            </View>
        </SafeAreaProvider>
    );
}

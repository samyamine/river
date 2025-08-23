import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Concepts:</Text>
            <Link href={"/concepts/profile"} className='text-white underline'>Flirt Profile Template</Link>
            <Link href={"/concepts/chat"} className='text-white underline'>Chat Page Template</Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        marginBottom: 20,
    },
})

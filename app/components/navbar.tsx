import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Link } from 'expo-router';

export default function Navbar() {
    <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "#f8f8f8",
        }}
    >
        <Link href="/">
            <Ionicons name="home" size={24} color="black" />
        </Link>
        <Text>globePal</Text>
        <Link href="/settings">
            <Ionicons name="settings" size={24} color="black" />
        </Link>
    </View>;
}
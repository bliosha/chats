import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500 mb-8">
        Welcome to Chats!
      </Text>
      <TouchableOpacity
        className="bg-blue-500 px-8 py-3 rounded-xl"
        onPress={() => router.push("/contacts")}
      >
        <Text className="text-white text-base font-semibold">Open App</Text>
      </TouchableOpacity>
    </View>
  );
}

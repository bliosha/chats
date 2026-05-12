import { Text, View, FlatList } from "react-native";
import { ContactRow } from "@/src/components/ContactRow";


export default function Contacts() {
  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-4 pb-4">
        <Text className="text-2xl font-bold text-gray-900">Messages</Text>
      </View>
      <FlatList
        data={CONTACTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactRow item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const CONTACTS = [
    {
        id: "1",
        name: "Coach Sarah",
        lastMessage: "Great question. Yes, start with a weight you can comfortably control...",
        time: "10:30 AM",
        unread: 2,
        online: true,
    },
    {
        id: "2",
        name: "Coach Mike",
        lastMessage: "Your form on the squat looks solid! Keep that chest up.",
        time: "Yesterday",
        unread: 0,
        online: true,
    },
    {
        id: "3",
        name: "Coach Elena",
        lastMessage: "Don't forget to log your meals today. Nutrition is key this week.",
        time: "Mon",
        unread: 1,
        online: false,
    },
    {
        id: "4",
        name: "Coach James",
        lastMessage: "Workout completed — Day 3: Lower Body. 52 min, 7 exercises",
        time: "Sun",
        unread: 0,
        online: false,
    },
    {
        id: "5",
        name: "Coach Priya",
        lastMessage: "I've updated your program for next week. Check it out!",
        time: "Fri",
        unread: 3,
        online: true,
    },
    {
        id: "6",
        name: "Coach Tom",
        lastMessage: "Rest day tomorrow. Light walk or stretching is fine.",
        time: "Thu",
        unread: 0,
        online: false,
    },
];


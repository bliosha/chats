import { Text, View, TouchableOpacity } from "react-native";
import { Avatar } from "./Avatar";

type Contact = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
};

export const ContactRow = ({ item }: { item: Contact }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row items-center px-4 py-3 gap-3"
    >
      <Avatar name={item.name} online={item.online} />
      <View className="flex-1 border-b border-gray-100 pb-3">
        <View className="flex-row justify-between items-center mb-0.5">
          <Text className="text-base font-semibold text-gray-900">
            {item.name}
          </Text>
          <Text
            className={`text-xs ${item.unread > 0 ? "text-blue-500 font-semibold" : "text-gray-400"}`}
          >
            {item.time}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text
            className="text-sm text-gray-500 flex-1 mr-2"
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View className="bg-blue-500 rounded-full min-w-5 h-5 items-center justify-center px-1">
              <Text className="text-white text-xs font-bold">{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

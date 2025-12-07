import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText, ThemedView } from '@/src/components/shared';
import { getGroupById } from '@/src/libs/constants';

export default function GroupMembersScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const group = getGroupById(id);
  const handleBack = () => {
    if (router.canGoBack && router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  };

  if (!group) {
    return (
      <ThemedView className="flex-1 items-center justify-center gap-3 p-5">
        <ThemedText type="subtitle">Members unavailable</ThemedText>
        <Pressable className="rounded-full bg-sky-500 px-5 py-3" onPress={handleBack}>
          <ThemedText className="text-white font-semibold">Back to groups</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerClassName="gap-4 p-5" showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center justify-between">
            <Pressable className="h-10 w-10 items-center justify-center rounded-xl bg-gray-100" onPress={handleBack}>
              <MaterialIcons name="arrow-back-ios-new" size={18} color="#111827" />
            </Pressable>
            <ThemedText type="subtitle">Members</ThemedText>
            <View className="flex-row items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1.5">
              <MaterialIcons name="group" size={16} color="#0EA5E9" />
              <ThemedText className="text-sky-600 font-semibold">
                {group.members.length}
              </ThemedText>
            </View>
          </View>

          <ThemedText className="text-gray-500">
            Everyone contributing to {group.name}. Tap a member to view their share.
          </ThemedText>

          <View className="gap-3">
            {group.members.map((member) => (
              <Pressable key={member.id} className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow shadow-black/10">
                <Image source={{ uri: member.avatar }} className="h-12 w-12 rounded-2xl" />
                <View className="mx-3 flex-1">
                  <ThemedText type="defaultSemiBold">{member.name}</ThemedText>
                  <ThemedText className="text-gray-500">{member.role}</ThemedText>
                </View>
                <ThemedText className="text-emerald-600 font-semibold">
                  ${member.spent.toFixed(2)}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

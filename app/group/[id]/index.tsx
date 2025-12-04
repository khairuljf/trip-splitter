import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getGroupById } from '@/constants/groups';

export default function GroupDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const group = getGroupById(id);

  if (!group) {
    return (
      <ThemedView className="flex-1 items-center justify-center gap-4 p-5">
        <ThemedText type="subtitle">Group not found</ThemedText>
        <Pressable className="rounded-full bg-sky-500 px-6 py-3" onPress={() => router.back()}>
          <ThemedText className="text-white font-semibold">Go back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerClassName="gap-5 p-5" showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center justify-between">
            <Pressable className="h-10 w-10 items-center justify-center rounded-xl bg-gray-100" onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios-new" size={18} color="#111827" />
            </Pressable>
            <ThemedText type="subtitle">{group.name}</ThemedText>
            <Pressable className="h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <MaterialIcons name="settings" size={20} color="#111827" />
            </Pressable>
          </View>

          <View className="overflow-hidden rounded-3xl bg-slate-900">
            <Image source={group.banner} className="h-40 w-full" />
            <View className="absolute inset-0 justify-end gap-2 bg-slate-900/50 p-5">
              <ThemedText type="title" className="text-white">
                {group.destination}
              </ThemedText>
              <ThemedText className="text-gray-100">{group.description}</ThemedText>
            </View>
          </View>

          <View className="flex-row flex-wrap gap-3">
            <View className="basis-[48%] gap-1 rounded-2xl bg-white p-4 shadow shadow-black/10">
              <ThemedText className="text-gray-500">Group creator</ThemedText>
              <ThemedText type="subtitle">{group.creator}</ThemedText>
            </View>

            <View className="basis-[48%] gap-1 rounded-2xl bg-white p-4 shadow shadow-black/10">
              <ThemedText className="text-gray-500">Your cost</ThemedText>
              <ThemedText type="subtitle">${group.yourShare.toFixed(2)}</ThemedText>
            </View>

            <View className="basis-[48%] gap-1 rounded-2xl bg-white p-4 shadow shadow-black/10">
              <ThemedText className="text-gray-500">Total expenses</ThemedText>
              <ThemedText type="subtitle">${group.totalExpense.toFixed(2)}</ThemedText>
            </View>

            <Pressable
              className="basis-[48%] flex-row items-center justify-between gap-1 rounded-2xl bg-white p-4 shadow shadow-black/10"
              onPress={() => router.push(`/group/${group.id}/members`)}>
              <View>
                <ThemedText className="text-gray-500">Members</ThemedText>
                <ThemedText type="subtitle">{group.members.length} people</ThemedText>
              </View>
              <MaterialIcons name="people-alt" size={20} color="#10B981" />
            </Pressable>
          </View>

          <View className="gap-4 rounded-3xl bg-gray-900 p-5">
            <ThemedText type="subtitle">Expense statistics</ThemedText>
            <ThemedText className="text-gray-500">
              A quick breakdown of how this group is spending together.
            </ThemedText>

            {group.stats.map((stat) => (
              <View key={stat.label} className="flex-row items-center justify-between">
                <View>
                  <ThemedText>{stat.label}</ThemedText>
                  {stat.hint ? <ThemedText className="text-gray-500">{stat.hint}</ThemedText> : null}
                </View>
                <ThemedText type="defaultSemiBold">{stat.value}</ThemedText>
              </View>
            ))}
          </View>

          <Pressable className="mt-2 items-center rounded-2xl bg-sky-500 py-4">
            <ThemedText className="text-white font-semibold">Settle up expenses</ThemedText>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
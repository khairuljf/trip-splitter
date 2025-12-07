import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText, ThemedView } from '@/src/components/shared';
import { getGroupById } from '@/src/libs/constants';

export default function GroupDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const group = getGroupById(id);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const baseCurrency = 'USD';
  const handleBack = () => {
    if (router.canGoBack && router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  };

  if (!group) {
    return (
      <ThemedView className="flex-1 items-center justify-center gap-4 p-5">
        <ThemedText type="subtitle">Group not found</ThemedText>
        <Pressable className="rounded-full bg-sky-500 px-6 py-3" onPress={handleBack}>
          <ThemedText className="text-white font-semibold">Go back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <>
      <ThemedView className="flex-1">
        <SafeAreaView className="flex-1">
          <ScrollView contentContainerClassName="gap-5" showsVerticalScrollIndicator={false}>
            <View className="px-6 flex-row items-center justify-between">
              <Pressable className="h-10 w-10 items-center justify-center rounded-xl bg-gray-100" onPress={handleBack}>
                <MaterialIcons name="arrow-back-ios-new" size={18} color="#111827" />
              </Pressable>
              <ThemedText type="subtitle">{group.name}</ThemedText>
              <Pressable className="h-10 w-10 items-center justify-center rounded-xl bg-gray-100" onPress={() => setSettingsOpen(true)}>
                <MaterialIcons name="settings" size={20} color="#111827" />
              </Pressable>
            </View>

            <View className="h-[300px] w-full overflow-hidden bg-slate-900">
              <Image source={group.banner} className="h-[300px] w-full" />
              <View className="absolute inset-0 items-center justify-end gap-2 bg-slate-900/50 p-5">
                <ThemedText type="title" className="!text-white">
                  {group.destination}
                </ThemedText>
                <ThemedText className="!text-gray-100">{group.description}</ThemedText>
              </View>
            </View>

            <View className="gap-3 px-6">
              <View className="gap-1 items-center justify-center rounded-2xl bg-white p-4 shadow shadow-black/10">
                <View className="flex-row  gap-2">
                  <ThemedText className="text-gray-500">Group creator:</ThemedText>
                  <ThemedText >{group.creator},</ThemedText>
                  <ThemedText >BDT:599.33</ThemedText>
                </View>

                <View className="flex-row  gap-2">
                  <ThemedText className="text-gray-500">Your cost</ThemedText>
                  <ThemedText >${group.yourShare.toFixed(2)}</ThemedText>
                </View>
              </View>

              <Pressable
                className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow shadow-black/10"
                onPress={() => router.push(`/trip/${group.id}/expenses`)}>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="receipt-long" size={20} color="#0EA5E9" />
                  <ThemedText className="text-gray-500">Total expenses</ThemedText>
                </View>
                <View className="flex-row items-center gap-2">
                  <ThemedText type="subtitle">${group.totalExpense.toFixed(2)}</ThemedText>
                  <MaterialIcons name="chevron-right" size={20} color="#111827" />
                </View>
              </Pressable>

              <Pressable
                className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow shadow-black/10"
                onPress={() => router.push(`/trip/${group.id}/members`)}>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="people-alt" size={20} color="#10B981" />
                  <ThemedText className="text-gray-500">Members</ThemedText>
                </View>
                <View className="flex-row items-center gap-2">
                  <ThemedText type="subtitle">{group.members.length} people</ThemedText>
                  <MaterialIcons name="chevron-right" size={20} color="#111827" />
                </View>
              </Pressable>

              <Pressable
                className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow shadow-black/10"
                onPress={() => router.push(`/trip/${group.id}/settle`)}>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="account-balance-wallet" size={20} color="#F97316" />
                  <ThemedText className="text-gray-500">SettleTrip</ThemedText>
                </View>
                <View className="flex-row items-center gap-2">
                  <ThemedText type="subtitle">Settle up</ThemedText>
                  <MaterialIcons name="chevron-right" size={20} color="#111827" />
                </View>
              </Pressable>
            </View>



          </ScrollView>
        </SafeAreaView >
      </ThemedView >
      <Modal
        visible={settingsOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setSettingsOpen(false)}>
        <View className="flex-1 justify-end bg-black/40">
          <Pressable className="flex-1" onPress={() => setSettingsOpen(false)} />
          <View className="gap-3 rounded-t-3xl bg-white p-5">
            <View className="items-center">
              <ThemedText className="text-gray-500">Group Settings</ThemedText>
            </View>
            <View className="overflow-hidden rounded-2xl border border-gray-100">
              <Pressable
                className="border-b border-gray-100 p-4"
                onPress={() => {
                  setSettingsOpen(false);
                  console.log('edit-name');
                }}>
                <ThemedText>Edit name</ThemedText>
              </Pressable>
              <Pressable
                className="border-b border-gray-100 p-4"
                onPress={() => {
                  setSettingsOpen(false);
                  console.log('edit-currency');
                }}>
                <ThemedText>Edit base currency ({baseCurrency})</ThemedText>
              </Pressable>
              <Pressable
                className="border-b border-gray-100 p-4"
                onPress={() => {
                  setSettingsOpen(false);
                  console.log('archive-group');
                }}>
                <ThemedText>Archive</ThemedText>
              </Pressable>
              <Pressable
                className="p-4"
                onPress={() => {
                  setSettingsOpen(false);
                  console.log('leave-group');
                }}>
                <ThemedText className="text-red-500">Leave / delete</ThemedText>
              </Pressable>
            </View>
            <Pressable className="rounded-2xl bg-gray-100 py-4" onPress={() => setSettingsOpen(false)}>
              <ThemedText className="text-center font-semibold">Cancel</ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
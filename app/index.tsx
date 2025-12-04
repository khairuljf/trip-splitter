import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { groups } from '@/constants/groups';
import { useAppDrawer } from '@/hooks/use-app-drawer';



export default function HomeScreen() {
  const { Drawer, openDrawer } = useAppDrawer();
  const router = useRouter();

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerClassName="pb-8 gap-6" showsVerticalScrollIndicator={false}>
          <AppHeader onMenuPress={openDrawer} />

          <View className="px-6">
            <View className="gap-1">
              <ThemedText type="subtitle">Your groups</ThemedText>
              <ThemedText className="text-gray-500">
                {groups.length} active · tap a group to view details
              </ThemedText>
            </View>

            <View className="flex flex-col gap-3">
              {groups.map((group) => (
                <Pressable
                  key={group.id}
                  className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow shadow-black/10"
                  onPress={() => router.push(`/group/${group.id}`)}>
                  <View className="flex-1 gap-1">
                    <ThemedText type="subtitle">{group.name}</ThemedText>
                    <ThemedText className="text-gray-500">
                      {group.members.length} members · {group.destination}
                    </ThemedText>
                  </View>
                  <View className="items-end gap-1">
                    <ThemedText className="text-emerald-600 font-semibold">
                      ${group.yourShare.toFixed(2)}
                    </ThemedText>
                    <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {Drawer}
    </ThemedView>
  );
}


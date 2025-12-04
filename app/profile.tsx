import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAppDrawer } from '@/hooks/use-app-drawer';

export default function ProfileScreen() {
  const { Drawer, openDrawer } = useAppDrawer();

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerClassName="gap-3 p-6" showsVerticalScrollIndicator={false}>
          <AppHeader onMenuPress={openDrawer} />
          <View className="gap-2">
            <ThemedText type="title">Your profile</ThemedText>
            <ThemedText className="text-gray-500">
              This is a placeholder page. Plug in real profile details whenever you are ready.
            </ThemedText>
          </View>
        </ScrollView>
      </SafeAreaView>
      {Drawer}
    </ThemedView>
  );
}

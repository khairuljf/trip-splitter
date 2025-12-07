import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { useAppDrawer } from '@/src/hooks/use-app-drawer';
import { AppHeader, ThemedText, ThemedView } from '@/src/components/shared';

export default function ProfileScreen() {
  const { Drawer, openDrawer } = useAppDrawer();

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerClassName="pb-8 gap-6" showsVerticalScrollIndicator={false}>
          <AppHeader onMenuPress={openDrawer} />
          <View className="px-6">
            <View className="gap-1">
              <ThemedText type="title">Help</ThemedText>
              <ThemedText className="text-gray-500">
                This is a placeholder page. Plug in real help details whenever you are ready.
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {Drawer}
    </ThemedView>
  );
}

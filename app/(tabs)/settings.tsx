import { AppHeader, ThemedText, ThemedView } from '@/src/components/shared';
import { useAppDrawer } from '@/src/hooks/use-app-drawer';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function SettingsScreen() {
  const { Drawer, openDrawer } = useAppDrawer();

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerClassName="gap-3 p-6" showsVerticalScrollIndicator={false}>
          <AppHeader onMenuPress={openDrawer} />
          <View className="gap-2">
            <ThemedText type="title">Settings</ThemedText>
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

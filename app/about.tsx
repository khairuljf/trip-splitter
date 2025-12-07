import { AppHeader, ThemedText, ThemedView } from '@/src/components/shared';
import { useAppDrawer } from '@/src/hooks/use-app-drawer';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function AboutScreen() {
  const { Drawer, openDrawer } = useAppDrawer();

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerClassName="gap-3 p-6" showsVerticalScrollIndicator={false}>
          <AppHeader onMenuPress={openDrawer} />
          <View className="px-6">
            <View className="gap-1">
              <ThemedText type="title">About</ThemedText>
              <ThemedText className="text-gray-500">
                Track shared expenses, understand group spending, and settle up in a single place.
                This screen is ready for your story, FAQs, or product pitch.
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {Drawer}
    </ThemedView>
  );
}

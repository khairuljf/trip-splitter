import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAppDrawer } from '@/hooks/use-app-drawer';

export default function AboutScreen() {
  const { Drawer, openDrawer } = useAppDrawer();

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <AppHeader onMenuPress={openDrawer} />
          <View style={styles.section}>
            <ThemedText type="title">About Trip Splitter</ThemedText>
            <ThemedText className="text-gray-500">
              Track shared expenses, understand group spending, and settle up in a single place.
              This screen is ready for your story, FAQs, or product pitch.
            </ThemedText>
          </View>
        </ScrollView>
      </SafeAreaView>
      {Drawer}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 12,
  },
  section: {
    gap: 8,
  },
});


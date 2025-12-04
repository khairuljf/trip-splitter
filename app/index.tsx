import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { groups } from '@/constants/groups';
import { useAppDrawer } from '@/hooks/use-app-drawer';
import "../global.css";


export default function HomeScreen() {
  const { Drawer, openDrawer } = useAppDrawer();
  const router = useRouter();

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <AppHeader onMenuPress={openDrawer} />

          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Your groups</ThemedText>
            <ThemedText className="text-gray-500">
              {groups.length} active · tap a group to view details
            </ThemedText>
          </View>

          <View style={styles.groupList} className='d-flex flex-col gap-3'>
            {groups.map((group) => (
              <Pressable
                key={group.id}
                style={styles.groupCard}
                onPress={() => router.push(`/group/${group.id}`)}>
                <View style={styles.groupInfo}>
                  <ThemedText type="subtitle">{group.name}</ThemedText>
                  <ThemedText className="text-gray-500">
                    {group.members.length} members · {group.destination}
                  </ThemedText>
                </View>
                <View style={styles.cardRight}>
                  <ThemedText className="text-emerald-600 font-semibold">
                    ${group.yourShare.toFixed(2)}
                  </ThemedText>
                  <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
                </View>
              </Pressable>
            ))}
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
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 24,
  },
  sectionHeader: {
    gap: 4,
  },
  groupList: {
    gap: 12,
  },
  groupCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { height: 2, width: 0 },
  },
  groupInfo: {
    flex: 1,
    gap: 4,
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
});


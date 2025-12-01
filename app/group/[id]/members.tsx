import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getGroupById } from '@/constants/groups';

export default function GroupMembersScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const group = getGroupById(id);

  if (!group) {
    return (
      <ThemedView style={styles.fallback}>
        <ThemedText type="subtitle">Members unavailable</ThemedText>
        <Pressable style={styles.backPill} onPress={() => router.back()}>
          <ThemedText className="text-white font-semibold">Back to groups</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.topBar}>
            <Pressable style={styles.iconButton} onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios-new" size={18} color="#111827" />
            </Pressable>
            <ThemedText type="subtitle">Members</ThemedText>
            <View style={styles.memberCountChip}>
              <MaterialIcons name="group" size={16} color="#0EA5E9" />
              <ThemedText className="text-sky-600 font-semibold">
                {group.members.length}
              </ThemedText>
            </View>
          </View>

          <ThemedText className="text-gray-500">
            Everyone contributing to {group.name}. Tap a member to view their share.
          </ThemedText>

          <View style={styles.memberList}>
            {group.members.map((member) => (
              <Pressable key={member.id} style={styles.memberRow}>
                <Image source={{ uri: member.avatar }} style={styles.avatar} />
                <View style={styles.memberMeta}>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberCountChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#E0F2FE',
  },
  memberList: {
    gap: 12,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { height: 1, width: 0 },
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
  },
  memberMeta: {
    flex: 1,
    marginHorizontal: 12,
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 20,
  },
  backPill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#0EA5E9',
    borderRadius: 999,
  },
});


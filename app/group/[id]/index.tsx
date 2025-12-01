import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getGroupById } from '@/constants/groups';

export default function GroupDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const group = getGroupById(id);

  if (!group) {
    return (
      <ThemedView style={styles.fallback}>
        <ThemedText type="subtitle">Group not found</ThemedText>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ThemedText className="text-white font-semibold">Go back</ThemedText>
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
            <ThemedText type="subtitle">{group.name}</ThemedText>
            <Pressable style={styles.iconButton}>
              <MaterialIcons name="settings" size={20} color="#111827" />
            </Pressable>
          </View>

          <View style={styles.banner}>
            <Image source={group.banner} style={styles.bannerImage} />
            <View style={styles.bannerOverlay}>
              <ThemedText type="title" className="text-white">
                {group.destination}
              </ThemedText>
              <ThemedText className="text-gray-100">{group.description}</ThemedText>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <ThemedText className="text-gray-500">Group creator</ThemedText>
              <ThemedText type="subtitle">{group.creator}</ThemedText>
            </View>

            <View style={styles.infoCard}>
              <ThemedText className="text-gray-500">Your cost</ThemedText>
              <ThemedText type="subtitle">${group.yourShare.toFixed(2)}</ThemedText>
            </View>

            <View style={styles.infoCard}>
              <ThemedText className="text-gray-500">Total expenses</ThemedText>
              <ThemedText type="subtitle">${group.totalExpense.toFixed(2)}</ThemedText>
            </View>

            <Link href={{ pathname: '/group/[id]/members', params: { id: group.id } }} asChild>
              <Pressable style={[styles.infoCard, styles.infoLink]}>
                <View>
                  <ThemedText className="text-gray-500">Members</ThemedText>
                  <ThemedText type="subtitle">{group.members.length} people</ThemedText>
                </View>
                <MaterialIcons name="people-alt" size={20} color="#10B981" />
              </Pressable>
            </Link>
          </View>

          <View style={styles.statsCard}>
            <ThemedText type="subtitle">Expense statistics</ThemedText>
            <ThemedText className="text-gray-500">
              A quick breakdown of how this group is spending together.
            </ThemedText>

            {group.stats.map((stat) => (
              <View key={stat.label} style={styles.statRow}>
                <View>
                  <ThemedText>{stat.label}</ThemedText>
                  {stat.hint ? <ThemedText className="text-gray-500">{stat.hint}</ThemedText> : null}
                </View>
                <ThemedText type="defaultSemiBold">{stat.value}</ThemedText>
              </View>
            ))}
          </View>

          <Pressable style={styles.settleButton}>
            <ThemedText className="text-white font-semibold">Settle up expenses</ThemedText>
          </Pressable>
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
    gap: 20,
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
  banner: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#0f172a',
  },
  bannerImage: {
    width: '100%',
    height: 160,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    gap: 8,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoCard: {
    flexBasis: '48%',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    gap: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { height: 2, width: 0 },
    elevation: 1,
  },
  infoLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#111827',
    gap: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settleButton: {
    marginTop: 10,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#0EA5E9',
    alignItems: 'center',
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 20,
  },
  backButton: {
    backgroundColor: '#0EA5E9',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
});


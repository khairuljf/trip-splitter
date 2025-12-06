import { router } from 'expo-router';
import { Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/shared/themed-text';
import { ThemedView } from '@/components/shared/themed-view';
import { groups } from '@/libs/constants';

export default function TripsScreen() {
    return (
        <ThemedView className="flex-1">
            <SafeAreaView className="flex-1 p-6">
                <ThemedText type="title">Trips</ThemedText>
                <ScrollView contentContainerClassName="gap-4 pt-6" showsVerticalScrollIndicator={false}>
                    {groups.map((group) => (
                        <Pressable
                            key={group.id}
                            className="rounded-2xl bg-white p-4 shadow shadow-black/10"
                            onPress={() => router.push(`/trip/${group.id}`)}>
                            <ThemedText type="subtitle">{group.destination}</ThemedText>
                            <ThemedText className="text-gray-500">{group.description}</ThemedText>
                        </Pressable>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
    );
}


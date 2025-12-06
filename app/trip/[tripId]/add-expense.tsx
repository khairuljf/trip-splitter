import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/shared/themed-text';
import { ThemedView } from '@/components/shared/themed-view';
import { saveOffline } from '@/db/expenseRepo';

export default function AddExpenseScreen() {
  const params = useLocalSearchParams<{ tripId?: string; id?: string }>();
  const tripId = params.tripId ?? params.id ?? 'unknown';
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;
    saveOffline(title.trim());
    setTitle('');
    router.back();
  };

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1 p-6 gap-6">
        <View className="gap-2">
          <ThemedText type="subtitle">Add expense</ThemedText>
        <ThemedText className="text-gray-500">Trip id: {tripId}</ThemedText>
        </View>
        <TextInput
          placeholder="Expense title"
          className="rounded-2xl border border-gray-200 p-4"
          value={title}
          onChangeText={setTitle}
        />
        <Pressable className="rounded-2xl bg-sky-500 py-4" onPress={handleSubmit}>
          <ThemedText className="text-center text-white font-semibold">Save offline</ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}


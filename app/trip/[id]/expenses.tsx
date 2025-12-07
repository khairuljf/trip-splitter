import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText, ThemedView } from '@/src/components/shared';
import { getGroupById } from '@/src/libs/constants';

export default function GroupExpensesScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const group = getGroupById(id);
    const handleBack = () => {
        if (router.canGoBack && router.canGoBack()) {
            router.back();
        } else {
            router.push('/');
        }
    };

    if (!group) {
        return (
            <ThemedView className="flex-1 items-center justify-center gap-4 p-5">
                <ThemedText type="subtitle">Group not found</ThemedText>
                <Pressable className="rounded-full bg-sky-500 px-6 py-3" onPress={handleBack}>
                    <ThemedText className="text-white font-semibold">Go back</ThemedText>
                </Pressable>
            </ThemedView>
        );
    }

    return (
        <ThemedView className="flex-1">
            <SafeAreaView className="flex-1">
                <ScrollView contentContainerClassName="gap-5 p-5 pb-10" showsVerticalScrollIndicator={false}>
                    <View className="flex-row items-center justify-between">
                        <Pressable className="h-10 w-10 items-center justify-center rounded-xl bg-gray-100" onPress={handleBack}>
                            <MaterialIcons name="arrow-back-ios-new" size={18} color="#111827" />
                        </Pressable>
                        <ThemedText type="subtitle">Expenses</ThemedText>
                        <View className="rounded-full bg-gray-100 px-3 py-1">
                            <ThemedText className="text-gray-600 font-semibold">{group.expenses.length}</ThemedText>
                        </View>
                    </View>

                    <View className="gap-1 rounded-3xl bg-white p-5 shadow shadow-black/10">
                        <ThemedText className="text-gray-500">Total spend</ThemedText>
                        <ThemedText type="title">${group.totalExpense.toFixed(2)}</ThemedText>
                        <ThemedText className="text-gray-500">Tap an entry to edit or view details</ThemedText>
                    </View>

                    <View className="gap-3">
                        {group.expenses.map((expense) => (
                            <Pressable
                                key={expense.id}
                                className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow shadow-black/10"
                                onPress={() => console.log('expense-press', expense.id)}>
                                <View className="flex-row items-center gap-3">
                                    <View className="h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: expense.tint }}>
                                        <MaterialIcons name={expense.icon as any} size={20} color={expense.iconColor} />
                                    </View>
                                    <View>
                                        <ThemedText type="defaultSemiBold">{expense.category}</ThemedText>
                                        <ThemedText className="text-gray-500">
                                            {expense.date} · {expense.user}
                                        </ThemedText>
                                    </View>
                                </View>
                                <ThemedText className="text-emerald-600 font-semibold">${expense.amount.toFixed(2)}</ThemedText>
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
    );
}


import { ThemedText, ThemedView } from '@/src/components/shared';
import { getGroupById } from '@/src/libs/constants';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



type ListSectionProps = {
    title: string;
    payments: NonNullable<ReturnType<typeof getGroupById>>['equalization']['yourPayments'];
};

const PaymentRow = ({ payment }: { payment: ListSectionProps['payments'][number] }) => {
    return (
        <Pressable className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow shadow-black/10">
            <View className="flex-row items-center gap-3">
                <View className="items-center">
                    <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-gray-100 overflow-hidden">
                        {payment.fromAvatar ? (
                            <Image source={{ uri: payment.fromAvatar }} className="h-full w-full" />
                        ) : (
                            <MaterialIcons name="person" size={28} color="#9CA3AF" />
                        )}
                    </View>
                    <MaterialIcons name="arrow-downward" size={18} color="#D97706" />
                    <View className="mt-2 h-12 w-12 items-center justify-center rounded-full bg-gray-100 overflow-hidden">
                        {payment.toAvatar ? (
                            <Image source={{ uri: payment.toAvatar }} className="h-full w-full" />
                        ) : (
                            <MaterialIcons name="person" size={28} color="#9CA3AF" />
                        )}
                    </View>
                </View>
                <View>
                    <ThemedText type="defaultSemiBold">{payment.from}</ThemedText>
                    <ThemedText>{payment.to}</ThemedText>
                </View>
            </View>

            <View className="items-end">
                <ThemedText className="text-gray-500 uppercase">{payment.currency}</ThemedText>
                <ThemedText type="title">{payment.amount.toFixed(2)}</ThemedText>
            </View>
        </Pressable>
    );
};

const PaymentSection = ({ title, payments }: ListSectionProps) => {
    if (!payments.length) return null;

    return (
        <View className="gap-3">
            <ThemedText className="text-gray-500">{title}</ThemedText>
            {payments.map((payment) => (
                <PaymentRow key={payment.id} payment={payment} />
            ))}
        </View>
    );
};

export default function EqualizationScreen() {
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
                <ScrollView contentContainerClassName="gap-6 p-5 pb-12" showsVerticalScrollIndicator={false}>
                    <View className="flex-row items-center justify-between">
                        <Pressable
                            className="h-10 w-10 items-center justify-center rounded-xl bg-gray-100"
                            onPress={handleBack}>
                            <MaterialIcons name="arrow-back-ios-new" size={18} color="#111827" />
                        </Pressable>
                        <ThemedText type="subtitle">Equalization payments</ThemedText>
                        <Pressable className="h-10 w-10 items-center justify-center rounded-xl bg-gray-100" onPress={() => console.log('share-equalization')}>
                            <MaterialIcons name="ios-share" size={18} color="#111827" />
                        </Pressable>
                    </View>

                    <View className="gap-4 rounded-3xl bg-white p-5 shadow shadow-black/10">
                        <PaymentSection title="Your equalization payments" payments={group.equalization.yourPayments} />
                        <View className="h-px bg-gray-100" />
                        <PaymentSection
                            title="Equalization payments of other group members"
                            payments={group.equalization.otherPayments}
                        />
                    </View>

                    <Pressable className="items-center py-4" onPress={() => console.log('show-calc-info')}>
                        <ThemedText className="text-sky-600 underline">How is this calculated?</ThemedText>
                    </Pressable>

                    <View className="items-center rounded-2xl border border-dashed border-gray-200 py-6">
                        <ThemedText className="text-gray-400">Reserved for advertising</ThemedText>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
    );
}


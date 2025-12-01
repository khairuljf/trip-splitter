import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

const DEFAULT_AVATAR = 'https://i.pravatar.cc/120?img=5';

type AppHeaderProps = {
  onMenuPress?: () => void;
  avatarUri?: string;
};

export function AppHeader({ onMenuPress, avatarUri = DEFAULT_AVATAR }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.iconButton}
        accessibilityRole="button"
        onPress={onMenuPress}
        hitSlop={8}>
        <MaterialIcons name="menu" size={22} color="#111827" />
      </Pressable>

      <View style={styles.brand}>
        <Image source={require('@/assets/images/react-logo.png')} style={styles.brandIcon} />
        <ThemedText type="subtitle" className="text-slate-900">
          Trip Splitter
        </ThemedText>
      </View>

      <Image source={{ uri: avatarUri }} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  iconButton: {
    height: 40,
    width: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
});


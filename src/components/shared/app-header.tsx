import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import { ThemedText } from './themed-text';


const DEFAULT_AVATAR = 'https://i.pravatar.cc/120?img=5';

type AppHeaderProps = {
  onMenuPress?: () => void;
  avatarUri?: string;
};

export function AppHeader({ onMenuPress, avatarUri = DEFAULT_AVATAR }: AppHeaderProps) {
  return (
    <View className=' px-6 flex-row items-center justify-between mt-2'>
      <Pressable
        className='h-10 w-10 rounded-md bg-slate-200 items-center justify-center'
        accessibilityRole="button"
        onPress={onMenuPress}
        hitSlop={8}>
        <MaterialIcons name="menu" size={22} color="#111827" />
      </Pressable>

      <View className='flex-row items-center gap-2'>
        <Image source={require('@/assets/images/react-logo.png')} className='w-6 h-6 rounded-md' />
        <ThemedText type="subtitle" className="text-slate-900">
          Trip Splitter
        </ThemedText>
      </View>

      <View />

    </View>
  );
}




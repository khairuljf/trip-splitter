import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../components/shared/';


const DRAWER_WIDTH = 260;

export function useAppDrawer() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }

    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -DRAWER_WIDTH,
      duration: 220,
      easing: undefined,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !isOpen) {
        setIsVisible(false);
      }
    });
  }, [isOpen, translateX]);

  const drawerItems = useMemo(
    () => [
      { label: 'Home', icon: 'home', path: '/' },
      { label: 'Trips', icon: 'hiking', path: 'group' },
      { label: 'About', icon: 'info', path: '/about' },
    ],
    [],
  );

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    router.push(path as any);
  };

  let Drawer: ReactNode = null;
  if (isVisible) {
    Drawer = (
      <>
        <Pressable style={styles.backdrop} onPress={() => setIsOpen(false)} />
        <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
          <ThemedText type="subtitle">Trip Splitter</ThemedText>
          <View style={styles.drawerList}>
            {drawerItems.map((item) => (
              <Pressable
                key={item.label}
                style={styles.drawerItem}
                onPress={() => handleNavigate(item.path)}>
                <MaterialIcons name={item.icon as any} size={20} color="#0F172A" />
                <ThemedText type="defaultSemiBold">{item.label}</ThemedText>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </>
    );
  }

  return {
    openDrawer: () => setIsOpen(true),
    closeDrawer: () => setIsOpen(false),
    Drawer,
  };
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#FFFFFF',
    padding: 24,
    paddingTop: 60,
    gap: 24,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { height: 0, width: 2 },
    elevation: 4,
  },
  drawerList: {
    gap: 12,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
});


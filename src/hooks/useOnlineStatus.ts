import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

/**
 * Imperative helper to query the latest connectivity snapshot.
 */
export const isOnline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return Boolean(state.isConnected);
};

/**
 * Reactive hook that subscribes to connectivity changes.
 */
export const useOnlineStatus = () => {
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setOnline(Boolean(state.isConnected));
    });

    NetInfo.fetch().then((state) => setOnline(Boolean(state.isConnected)));

    return () => unsubscribe();
  }, []);

  return online;
};

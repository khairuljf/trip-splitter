import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app-header';
import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useAppDrawer } from '@/hooks/use-app-drawer';

export default function ExploreScreen() {
  const { Drawer, openDrawer } = useAppDrawer();

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <AppHeader onMenuPress={openDrawer} />

          <View style={styles.hero}>
            <IconSymbol
              size={72}
              color="#0EA5E9"
              name="chevron.left.forwardslash.chevron.right"
              style={styles.heroIcon}
            />
            <View style={styles.heroText}>
              <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
                Explore
              </ThemedText>
              <ThemedText className="text-gray-500">
                Learn how Trip Splitter is wired together and where to plug in your ideas.
              </ThemedText>
            </View>
          </View>

          <ThemedText>
            This app includes example code to help you get started quickly. Peek at the sections
            below when you’re curious about routing, shared UI, or platform support.
          </ThemedText>

          <Collapsible title="File-based routing">
            <ThemedText>
              This app has two main tabs:{' '}
              <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
              <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>.
            </ThemedText>
            <ThemedText>
              The layout file at <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
              configures the tab navigator.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="link">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Android, iOS, and web support">
            <ThemedText>
              Open this project on Android, iOS, or the web. To launch the web build, press{' '}
              <ThemedText type="defaultSemiBold">w</ThemedText> in the Expo CLI terminal.
            </ThemedText>
          </Collapsible>

          <Collapsible title="Images">
            <ThemedText>
              For static images, use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
              <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to support high-density
              displays.
            </ThemedText>
            <Image
              source={require('@/assets/images/react-logo.png')}
              style={{ width: 100, height: 100, alignSelf: 'center' }}
            />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <ThemedText type="link">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Light and dark mode components">
            <ThemedText>
              This template supports system color schemes via the{' '}
              <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <ThemedText type="link">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Animations">
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> example
              shows a playful animation powered by{' '}
              <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
                react-native-reanimated
              </ThemedText>
              .
            </ThemedText>
            {Platform.select({
              ios: (
                <ThemedText>
                  The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
                  helper demonstrates a simple parallax header effect.
                </ThemedText>
              ),
            })}
          </Collapsible>
        </ScrollView>
      </SafeAreaView>
      {Drawer}
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
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 20,
  },
  hero: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
  },
  heroIcon: {
    width: 56,
    height: 56,
  },
  heroText: {
    flex: 1,
    gap: 4,
  },
});

import { cssInterop } from 'nativewind';
import { forwardRef } from 'react';
import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

const ThemedViewBase = forwardRef<View, ThemedViewProps>(function ThemedViewBase(
  { style, lightColor, darkColor, ...otherProps }: ThemedViewProps,
  ref,
) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View ref={ref} style={[{ backgroundColor }, style]} {...otherProps} />;
});

export const ThemedView = cssInterop(ThemedViewBase, {
  className: 'style',
});

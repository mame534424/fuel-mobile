import { PropsWithChildren, useEffect, useRef } from "react";
import { Animated, StyleProp, ViewStyle } from "react-native";

type Props = PropsWithChildren<{
  className?: string;
  style?: StyleProp<ViewStyle>;
  delay?: number;
}>;

export default function AnimatedScreen({
  children,
  className,
  style,
  delay = 0,
}: Props) {
  const translateY = useRef(new Animated.Value(18)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 420,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 420,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, opacity, translateY]);

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [{ translateY }],
        },
        style,
      ]}
      className={className}
    >
      {children}
    </Animated.View>
  );
}
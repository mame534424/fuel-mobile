import { PropsWithChildren, useEffect } from "react";

import {
  useColorScheme,
} from "nativewind";

import { useThemeStore }
from "../stores/themeStore";

export default function ThemeProvider({
  children,
}: PropsWithChildren) {

  const { colorScheme, setColorScheme } =
    useColorScheme();

  const theme =
    useThemeStore((state) => state.theme);

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  return children;
}
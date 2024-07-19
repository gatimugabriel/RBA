/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,

    inputBackground: "#f8f4ed",

    toni: "#0000",
    latiphar: "#000",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,

    inputBackground: "#49453e",

    latiphar: "#000",
    toni: "#0000",
  },

  otherColors: {
    background: "#f9f7fc",
    primary: "orange",
    secondary: "#abc3aa",
    accent: "#8eb097",
    darkInputBackground: "#49453e",
    lightInputBackground: "#f8f4ed",
  },
};

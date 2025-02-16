// /**
//  * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
//  * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
//  */

import { SearchBar } from "react-native-screens";

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

// export const Colors = {
//   light: {
//     text: '#11181C',
//     background: '#fff',
//     tint: tintColorLight,
//     icon: '#687076',
//     tabIconDefault: '#687076',
//     tabIconSelected: tintColorLight,
//   },
//   dark: {
//     text: '#ECEDEE',
//     background: '#151718',
//     tint: tintColorDark,
//     icon: '#9BA1A6',
//     tabIconDefault: '#9BA1A6',
//     tabIconSelected: tintColorDark,
//   },
// };

export default {
	light: {
		text: "#000",
		background: "#fff",
		tint: tintColorLight,
		defaultTabIcon: "#ccc",
		selectedTabIcon: tintColorLight,
		searchBar: "#f5f5f5",
		secondaryText: "#666666",
		primary: "#ff6b00",
		border: "#e5e5e5",
	},
	dark: {
		text: "#fff",
		background: "#0d1117",
		tint: tintColorDark,
		defaultTabIcon: "#ccc",
		selectedTabIcon: tintColorDark,
		searchBar: "#161b22",
		secondaryText: "#8b949e",
		primary: "#ff6b00",
		border: "#30363d",
	},
};

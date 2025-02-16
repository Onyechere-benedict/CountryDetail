import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export const customDarkTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		secondary: "#ec4899",
		primary: "#f97316",
		background: "#0b0f1e",
		card: "#1f2937",
		text: "#ffffff",
		border: "#374151",
		notification: "#ec4899",
		logo: "#ffffff",
	},
};

export const customLightTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		secondary: "#ec4899",
		primary: "#f97316",
		background: "#ffffff",
		card: "#f4f4f5",
		text: "#00000",
		border: "#e4e4e7",
		notification: "#ec4899",
		logo: "#001637",
	},
};

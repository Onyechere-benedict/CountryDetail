import { createContext, useContext, useEffect, useState } from "react";
import { customDarkTheme, customLightTheme } from "./CustomGeneralThemes";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = typeof customLightTheme;

interface ThemeContextType {
	theme: Theme;
	isDark: boolean;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const appColorScheme = useColorScheme();
	const [isDark, setIsDark] = useState(appColorScheme === "dark");

	useEffect(() => {
		loadTheme();
	});

	const loadTheme = async () => {
		try {
			const savedTheme = await AsyncStorage.getItem("theme");
			if (savedTheme) {
				setIsDark(savedTheme === "dark");
			}
		} catch (error) {
			console.error("Failed to load theme", error);
		}
	};

	const toggleTheme = async () => {
		try {
			const newTheme = !isDark;
			setIsDark(newTheme);
			await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
		} catch (error) {
			console.error("Failed to save theme", error);
		}
	};

	const theme = isDark ? customDarkTheme : customLightTheme;

	return (
		<ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

export default ThemeProvider;

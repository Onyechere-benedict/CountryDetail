import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export const useAppTheme = () => {
	const appColorScheme = useColorScheme();

	const [isDark, setIsDark] = useState(appColorScheme === "dark");

	// const theme = useTheme();

	const theme = isDark ? customDarkTheme : customLightTheme;

	useEffect(() => {
		loadTheme();
	}, []);

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

	return { isDark, toggleTheme, theme };
};

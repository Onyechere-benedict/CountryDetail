import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAppTheme } from "./AppTheme";
import { Feather } from "@expo/vector-icons";
import SeachBar from "./SeachBar";
import { useTheme } from "./ThemeContext";

const Header = () => {
	const { theme, isDark, toggleTheme } = useTheme();
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Text style={[styles.logo, { color: theme.colors.logo }]}>
					Explore
					<Text style={{ color: theme.colors.primary, fontSize: 30 }}>
						.
					</Text>
				</Text>
			</View>
			<TouchableOpacity onPress={toggleTheme}>
				<Feather
					name={isDark ? "sun" : "moon"}
					size={24}
					color={theme.colors.text}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 16,
		justifyContent: "space-between",
		alignItems: "center",
	},
	logo: {
		fontSize: 24,
		fontWeight: "bold",
	},
});

export default Header;

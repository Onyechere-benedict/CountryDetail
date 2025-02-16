import {
	View,
	Text,
	StyleSheet,
	Touchable,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { useAppTheme } from "./AppTheme";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "./ThemeContext";

type CountryHeaderProps = {
	title: string | undefined;
	onBack: () => void;
};

const CountryHeader: React.FC<CountryHeaderProps> = ({ title, onBack }) => {
	const { theme } = useTheme();
	return (
		<View
			style={[styles.container, { backgroundColor: theme.colors.card }]}
		>
			<TouchableOpacity onPress={onBack}>
				<Feather
					name="arrow-left"
					size={24}
					color={theme.colors.text}
				/>
			</TouchableOpacity>
			<Text style={[styles.countryHeader, { color: theme.colors.text }]}>
				{title}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 16,
		alignItems: "center",
	},

	countryHeader: {
		marginLeft: 16,
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default CountryHeader;

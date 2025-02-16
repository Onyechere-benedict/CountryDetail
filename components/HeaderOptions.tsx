import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useAppTheme } from "./AppTheme";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "./ThemeContext";
import LanguageModal from "./LanguageModal";

const ChangeLanguageButton = ({ onPress }: { onPress: () => void }) => {
	const { theme } = useTheme();

	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor: theme.colors.card }]}
			onPress={onPress}
		>
			<Feather name="globe" size={20} color={theme.colors.text} />
			<Text style={{ color: theme.colors.text, marginLeft: 8 }}>EN</Text>
		</TouchableOpacity>
	);
};

const FilterButton = ({
	onPressFilterModal,
}: {
	onPressFilterModal: () => void;
}) => {
	const { theme } = useTheme();

	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor: theme.colors.card }]}
			onPress={onPressFilterModal}
		>
			<Feather name="filter" size={20} color={theme.colors.text} />
			<Text style={{ color: theme.colors.text, marginLeft: 8 }}>
				Filter
			</Text>
		</TouchableOpacity>
	);
};

const HeaderOptions = ({
	onPress,
	onPressFilterModal,
}: {
	onPress: () => void;
	onPressFilterModal: () => void;
}) => {
	return (
		<View
			style={{
				justifyContent: "space-between",
				flexDirection: "row",
				alignItems: "center",
				paddingHorizontal: 20,
				marginBottom: 20,
			}}
		>
			<ChangeLanguageButton onPress={onPress} />
			<FilterButton onPressFilterModal={onPressFilterModal} />
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		borderRadius: 8,
	},
});

export default HeaderOptions;

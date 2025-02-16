import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { useAppTheme } from "./AppTheme";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "./ThemeContext";

type SearchBarProps = {
	value: string;
	onChangeText: (text: string) => void;
	onSubmit?: () => void;
	onClear?: () => void;
};

const SeachBar: React.FC<SearchBarProps> = ({
	value,
	onChangeText,
	onSubmit,
	onClear,
}) => {
	const { theme } = useTheme();
	return (
		<View
			style={[styles.container, { backgroundColor: theme.colors.card }]}
		>
			<Feather
				name="search"
				size={20}
				color={theme.colors.text}
				style={styles.icon}
			/>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				onSubmitEditing={onSubmit}
				placeholder="Search Country"
				style={[styles.searchInput, { color: theme.colors.text }]}
			/>
			{value.length > 0 && (
				<TouchableOpacity onPress={onClear}>
					<Feather
						name="x"
						size={20}
						color={theme.colors.text}
						style={styles.icon}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 16,
		flexDirection: "row",
		borderRadius: 8,
		alignItems: "center",
		paddingHorizontal: 12,
	},

	searchInput: {
		flex: 1,
		marginLeft: 8,
		height: 44,
	},

	icon: {
		marginRight: 8,
	},
});

export default SeachBar;

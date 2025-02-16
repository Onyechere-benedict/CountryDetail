import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Touchable,
	Modal,
	Dimensions,
} from "react-native";
import React from "react";
import { useTheme } from "./ThemeContext";
import ReactNativeModal from "react-native-modal";
import { SlideInUp, SlideOutDown } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

type SelectLanguageModalProps = {
	isVisible: boolean;
	onClose: () => void;
	onSelectLanguage: (language: string) => void;
	selectedLanguage: string;
};

const languages = ["EN", "ES", "FR", "DE", "IT"];

const LanguageModal: React.FC<SelectLanguageModalProps> = ({
	isVisible,
	onClose,
	onSelectLanguage,
	selectedLanguage,
}) => {
	const { theme } = useTheme();
	return (
		<Modal visible={isVisible} animationType="fade" transparent>
			<View style={styles.backdrop}>
				<TouchableOpacity
					style={styles.overlay}
					onPress={onClose}
				></TouchableOpacity>
				<View
					style={[
						styles.modalContent,
						{ backgroundColor: theme.colors.background },
					]}
				>
					<View style={styles.header}>
						<Text
							style={[styles.title, { color: theme.colors.text }]}
						>
							Select Language
						</Text>
						<TouchableOpacity>
							<Feather
								name="x"
								size={24}
								color={theme.colors.text}
								onPress={onClose}
							/>
						</TouchableOpacity>
					</View>
					<ScrollView>
						{languages.map((language) => (
							<TouchableOpacity
								key={language}
								style={[
									styles.languageItem,
									{ borderBottomColor: theme.colors.border },
								]}
								onPress={() => {
									onSelectLanguage(language);
									onClose();
								}}
							>
								{selectedLanguage === language && (
									<Feather
										name="check"
										size={20}
										color={theme.colors.primary}
									/>
								)}
								<Text
									style={[
										styles.languageText,
										{ color: theme.colors.text },
									]}
								>
									{language}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
	},
	modalContent: {
		borderRadius: 8,
		padding: 16,
		height: height * 0.4,
		position: "absolute",
		top: height * 0.6,
		width: width,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	languageItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 1,
	},
	languageText: {
		fontSize: 16,
		marginLeft: 12,
	},
});

export default LanguageModal;

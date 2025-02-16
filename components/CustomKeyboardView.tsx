import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	View,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleProp,
	ViewStyle,
	StyleSheet,
} from "react-native";
import { useAppTheme } from "./AppTheme";
import { useTheme } from "./ThemeContext";

const ios = Platform.OS == "ios";
export default function CustomKeyboardView({
	children,
	style,
	keyboardVerticalOffset,
	noScroll,
}: {
	children?: any;
	style?: StyleProp<ViewStyle>;
	keyboardVerticalOffset?: number;
	noScroll?: boolean;
}) {
	const { theme } = useTheme();
	return (
		<KeyboardAvoidingView
			behavior={ios ? "padding" : "height"}
			keyboardVerticalOffset={keyboardVerticalOffset}
			style={[
				{ flex: 1, backgroundColor: theme.colors.background },
				style,
			]}
		>
			{noScroll ? (
				<SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
			) : (
				<SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
			)}
		</KeyboardAvoidingView>
	);
}

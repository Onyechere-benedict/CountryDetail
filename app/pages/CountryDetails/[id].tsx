import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppTheme } from "@/components/AppTheme";
import useCountry from "@/components/useCountry";
import CountryHeader from "@/components/CountryHeader";
import CountryFlag from "@/components/CountryFlag";
import { SafeAreaView } from "react-native-safe-area-context";
import CountryInformation from "@/components/CountryInformation";
import { useTheme } from "@/components/ThemeContext";

const CountryDetails = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { theme, isDark } = useTheme();
	const router = useRouter();
	const { country, loading } = useCountry(id);

	if (!country) {
		<Text>No Countries Found</Text>;
	}

	return loading ? (
		<ActivityIndicator size="large" color={theme.colors.primary} />
	) : (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: theme.colors.background }}
		>
			<CountryHeader
				title={country?.name.common}
				onBack={() => router.back()}
			/>
			<CountryFlag
				flag={country?.flags.png || ""}
				coatOfArms={country?.coatOfArms || undefined}
				maps={country?.maps || undefined}
			/>
			<CountryInformation country={country} />
		</SafeAreaView>
	);
};

export default CountryDetails;

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { CountryData } from "@/Services/CountryApi";
import { useAppTheme } from "./AppTheme";
import { useTheme } from "./ThemeContext";

const InformationRow = ({ label, info }: { label: string; info: string }) => {
	const { theme } = useTheme();
	return (
		<View
			style={[
				styles.infoRowContainer,
				{ borderBottomColor: theme.colors.text },
			]}
		>
			<Text
				style={{
					color: theme.colors.text,
					fontWeight: "500",
					fontSize: 16,
				}}
			>
				{label}:
			</Text>
			<Text
				style={{ color: theme.colors.text, opacity: 0.8, fontSize: 14 }}
			>
				{info}
			</Text>
		</View>
	);
};

const CountryInformation = ({ country }: { country: CountryData | null }) => {
	const { theme } = useTheme();
	return (
		<View style={{ padding: 16 }}>
			<InformationRow
				label="Population"
				info={country?.population.toString() || ""}
			/>
			<InformationRow
				label="Capital"
				info={country?.capital?.[0] || ""}
			/>
			<InformationRow label="Region" info={country?.region || ""} />
			<InformationRow
				label="Languages"
				info={Object.values(country?.languages || {}).join(", ")}
			/>
			<InformationRow
				label="Area"
				info={`${country?.area.toString()} km\u00B2` || ""}
			/>
			<InformationRow
				label="Curriency"
				info={
					Object.values(country?.currencies || {})
						.map(
							(currency) => `${currency.symbol} ${currency.name}`
						)
						.join("") || ""
				}
			/>
			<InformationRow
				label="Timezones"
				info={country?.timezones.join(",") || ""}
			/>
			<InformationRow
				label="Driving Side"
				info={country?.car.side || ""}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	infoRowContainer: {
		flexDirection: "row",
		gap: 10,
		paddingVertical: 10,
	},
});

export default CountryInformation;

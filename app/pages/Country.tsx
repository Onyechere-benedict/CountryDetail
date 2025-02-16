import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { CountryData } from "@/Services/CountryApi";
import { router } from "expo-router";
import { useAppTheme } from "@/components/AppTheme";
import { useTheme } from "@/components/ThemeContext";

type CountryProps = {
	country: CountryData;
};

const Country: React.FC<CountryProps> = ({ country }) => {
	const { theme } = useTheme();
	return (
		<TouchableOpacity
			onPress={() =>
				router.push({
					pathname: "/pages/CountryDetails/[id]",
					params: { id: country.cca2 },
				})
			}
			style={{
				flexDirection: "row",
				alignItems: "flex-end",
			}}
		>
			<Image
				source={{ uri: country.flags.png }}
				style={styles.countryThumbnail}
			/>
			<View>
				<Text
					style={[styles.countryName, { color: theme.colors.text }]}
				>
					{country.name.common}
				</Text>
				<Text style={[{ color: theme.colors.text }]}>
					{country.capital?.[0] ||
						"We do not have this country's capital at this time"}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	countryThumbnail: {
		width: 40,
		height: 40,
		marginRight: 12,
	},

	countryName: {
		fontWeight: "bold",
	},
});

export default Country;

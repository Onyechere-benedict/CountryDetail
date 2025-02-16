import {
	Image,
	StyleSheet,
	Platform,
	View,
	SafeAreaView,
	Text,
	FlatList,
	ActivityIndicator,
	StatusBar,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/components/AppTheme";
import {
	CountryData,
	getAllCountries,
	searchSpecificCountry,
} from "@/Services/CountryApi";
import { useEffect, useState } from "react";
import Country from "./pages/Country";
import Header from "@/components/Header";
import SeachBar from "@/components/SeachBar";
import Countries from "@/components/Countries";
import HeaderOptions from "@/components/HeaderOptions";
import { useTheme } from "@/components/ThemeContext";
import LanguageModal from "@/components/LanguageModal";
import FilterModal, { FilterState } from "@/components/FilterModal";

const HomeScreen: React.FC = () => {
	const { theme, toggleTheme, isDark } = useTheme();
	const [countries, setCountries] = useState<CountryData[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLanguageModal, setIsLanguageModalVisible] = useState(false);
	const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
	const [initialFilters, setInitialFilters] = useState<FilterState>({
		continents: [],
		timeZones: [],
	});
	const [selectedLanguage, setSelectedLanguage] = useState("EN");

	useEffect(() => {
		loadCountries();
	}, []);

	// useEffect(() => {
	// 	if (searchQuery) {
	// 		searchForCountry;
	// 	} else {
	// 		console.log("false");
	// 	}
	// });

	const searchForCountry = async () => {
		try {
			setLoading(true);
			const data = await searchSpecificCountry(searchQuery);
			setCountries(data);
		} catch (error) {
			setCountries([]);
			console.log("No Country Found");
		} finally {
			setLoading(false);
		}
	};

	let timeout: NodeJS.Timeout;

	const handleSearchQueryChanges = (text: string) => {
		setSearchQuery(text);
		setLoading(true);

		if (text === "") {
			clearSearchBar();
		} else {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				searchForCountry();
			}, 100);
		}
	};

	const clearSearchBar = () => {
		setSearchQuery("");
		loadCountries();
	};

	const loadCountries = async () => {
		try {
			const data = await getAllCountries();
			setCountries(
				data.sort((a, b) => a.name.common.localeCompare(b.name.common))
			);
			console.log(countries);
		} catch (error) {
			console.error("Failed to load countries", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView
			style={[
				styles.container,
				{
					backgroundColor: theme.colors.background,
					paddingTop:
						Platform.OS === "android" ? StatusBar.currentHeight : 0,
				},
			]}
		>
			<Header />
			<SeachBar
				value={searchQuery}
				onChangeText={handleSearchQueryChanges}
				// onSubmit={searchForCountry}
				onClear={clearSearchBar}
			/>
			<HeaderOptions
				onPress={() => setIsLanguageModalVisible(true)}
				onPressFilterModal={() => setIsFilterModalVisible(true)}
			/>
			{loading ? (
				<ActivityIndicator
					size="large"
					color={theme.colors.primary}
					style={{ flex: 1 }}
				/>
			) : (
				<Countries countriesData={countries} loading={loading} />
			)}
			<LanguageModal
				isVisible={isLanguageModal}
				onClose={() => setIsLanguageModalVisible(false)}
				onSelectLanguage={setSelectedLanguage}
				selectedLanguage={selectedLanguage}
			/>
			<FilterModal
				isVisible={isFilterModalVisible}
				onClose={() => setIsFilterModalVisible(false)}
				initialFilters={initialFilters}
				onApplyFilter={setInitialFilters}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		gap: 2,
	},
	header: {
		flexDirection: "row",
	},
});

export default HomeScreen;

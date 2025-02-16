import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	Modal,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import { Feather } from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";

const { width, height } = Dimensions.get("window");

type FilterModalProps = {
	isVisible: boolean;
	onClose: () => void;
	onApplyFilter: (filters: FilterState) => void;
	initialFilters: FilterState;
};

export type FilterState = {
	continents: string[];
	timeZones: string[];
};

const continents = [
	"Africa",
	"Antarctica",
	"Asia",
	"Australia",
	"Europe",
	"North America",
	"South America",
];

const timeZones = [
	"GMT-12:00",
	"GMT-11:00",
	"GMT-10:00",
	"GMT-09:00",
	"GMT-08:00",
	"GMT-07:00",
	"GMT-06:00",
	"GMT-05:00",
	"GMT-04:00",
	"GMT-03:00",
	"GMT-02:00",
	"GMT-01:00",
	"GMT+00:00",
	"GMT+01:00",
	"GMT+02:00",
	"GMT+03:00",
	"GMT+04:00",
	"GMT+05:00",
	"GMT+06:00",
	"GMT+07:00",
	"GMT+08:00",
	"GMT+09:00",
	"GMT+10:00",
	"GMT+11:00",
	"GMT+12:00",
];

const FilterModal: React.FC<FilterModalProps> = ({
	isVisible,
	onClose,
	onApplyFilter,
	initialFilters,
}) => {
	const { theme } = useTheme();
	const [filters, setFilters] = useState<FilterState>(initialFilters);
	const styles = StyleSheet.create({
		backdrop: {
			flex: 1,
			justifyContent: "flex-end",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
		},
		overlay: {
			...StyleSheet.absoluteFillObject,
		},
		modalContent: {
			backgroundColor: theme.colors.background,
			borderRadius: 8,
			padding: 16,
			height: height * 0.5,
			position: "absolute",
			top: height * 0.5,
			width: width,
			borderTopLeftRadius: 25,
			borderTopRightRadius: 25,
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
			color: theme.colors.text,
		},
		sectionTitle: {
			fontSize: 16,
			fontWeight: "bold",
			color: theme.colors.text,
			marginTop: 16,
			marginBottom: 8,
		},
		filterItem: {
			flexDirection: "row",
			alignItems: "center",
			paddingVertical: 8,
		},
		filterText: {
			fontSize: 14,
			color: theme.colors.text,
			marginLeft: 12,
		},
		buttonContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: 16,
			marginBottom: 20,
		},
		button: {
			paddingVertical: 8,
			paddingHorizontal: 16,
			borderRadius: 4,
			alignItems: "center",
			justifyContent: "center",
		},
		resetButton: {
			backgroundColor: theme.colors.border,
		},
		applyButton: {
			backgroundColor: theme.colors.primary,
		},
		buttonText: {
			color: theme.colors.text,
			fontWeight: "bold",
		},
	});

	const toggleFilter = (type: "continents" | "timeZones", value: string) => {
		setFilters((prevFilters) => {
			const updatedFilters = { ...prevFilters };
			if (updatedFilters[type].includes(value)) {
				updatedFilters[type] = updatedFilters[type].filter(
					(item) => item !== value
				);
			} else {
				updatedFilters[type] = [...updatedFilters[type], value];
			}
			return updatedFilters;
		});
	};

	const resetFilters = () => {
		setFilters({ continents: [], timeZones: [] });
	};

	const applyFilters = () => {
		onApplyFilter(filters);
		onClose();
	};
	return (
		<Modal visible={isVisible} transparent animationType="fade">
			<View style={styles.backdrop}>
				<TouchableOpacity style={styles.overlay} onPress={onClose} />
				<View style={styles.modalContent}>
					<View style={styles.header}>
						<Text style={styles.title}>Filter</Text>
						<TouchableOpacity onPress={() => onClose}>
							<Feather
								name="x"
								size={24}
								color={theme.colors.text}
								onPress={onClose}
							/>
						</TouchableOpacity>
					</View>
					<ScrollView>
						<Text style={styles.sectionTitle}>Continent</Text>
						{continents.map((continent) => (
							<TouchableOpacity
								key={continent}
								style={styles.filterItem}
								onPress={() =>
									toggleFilter("continents", continent)
								}
							>
								<Feather
									name={
										filters.continents.includes(continent)
											? "check-square"
											: "square"
									}
									size={20}
									color={theme.colors.text}
								/>
								<Text style={styles.filterText}>
									{continent}
								</Text>
							</TouchableOpacity>
						))}

						<Text style={styles.sectionTitle}>Time Zone</Text>
						{timeZones.map((timeZone) => (
							<TouchableOpacity
								key={timeZone}
								style={styles.filterItem}
								onPress={() =>
									toggleFilter("timeZones", timeZone)
								}
							>
								<Feather
									name={
										filters.timeZones.includes(timeZone)
											? "check-square"
											: "square"
									}
									size={20}
									color={theme.colors.text}
								/>
								<Text style={styles.filterText}>
									{timeZone}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.resetButton]}
							onPress={resetFilters}
						>
							<Text style={styles.buttonText}>Reset</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.applyButton]}
							onPress={applyFilters}
						>
							<Text style={styles.buttonText}>Show results</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default FilterModal;

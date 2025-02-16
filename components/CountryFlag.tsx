import {
	View,
	Text,
	Image,
	FlatList,
	Dimensions,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { useAppTheme } from "./AppTheme";
import { useTheme } from "./ThemeContext";
import { CountryData } from "@/Services/CountryApi";
import Carousel, { CarouselProperties } from "react-native-snap-carousel";
import { Feather } from "@expo/vector-icons";

type CountryFlagParams = Pick<CountryData, "flag" | "maps"> & {
	coatOfArms: { png: string; svg: string } | undefined;
	uri?: string;
};

type CarouselItem = {
	type: "flag" | "coatOfArms" | "map";
	uri: string;
};

const CountryFlag: React.FC<CountryFlagParams> = ({
	flag,
	coatOfArms,
	maps,
}) => {
	const { theme } = useTheme();
	const { width, height } = Dimensions.get("window");

	const carouselData: CarouselItem[] = [
		{ type: "flag", uri: flag },
		{ type: "coatOfArms", uri: coatOfArms?.png || "" },
		{ type: "map", uri: maps?.googleMaps || "" },
	];

	const scrollViewRef = useRef<ScrollView | null>(null);

	const styles = StyleSheet.create({
		scrollView: {
			height: 200,
		},
		imageContainer: {
			width: width - 32,
			height: 200,
			marginRight: 16,
		},
		image: {
			width: "100%",
			height: 200,
			borderRadius: 8,
		},
		arrow: {
			position: "absolute",
			top: "50%",
			transform: [{ translateY: -20 }],
			zIndex: 1,
			backgroundColor: "rgba(0, 0, 0, 0.3)",
			width: 40,
			height: 40,
			borderRadius: 20,
			alignItems: "center",
			justifyContent: "center",
		},
		leftArrow: {
			left: 10,
			color: theme.colors.text,
		},
		rightArrow: {
			right: 10,
			color: theme.colors.text,
		},
		arrowIcon: {
			color: "white",
		},
		// missingDataContainer: {
		// 	width: Dimensions.get("window").width - 32,
		// 	height: 200,
		// 	justifyContent: "center",
		// 	alignItems: "center",
		// 	backgroundColor: "#ddd",
		// 	borderRadius: 8,
		// },
		// altText: {
		// 	textAlign: "center",
		// 	fontWeight: "bold",
		// 	fontSize: 16,
		// 	color: theme.colors.text,
		// 	marginTop: 80,
		// },
	});

	const handleCarouselScroll = (direction: "left" | "right") => {
		if (scrollViewRef.current) {
			const offset = direction === "left" ? -width : width;
			scrollViewRef.current.scrollTo({ x: offset, animated: true });
		}
	};

	return (
		<View style={{ padding: 16, backgroundColor: theme.colors.background }}>
			<TouchableOpacity
				style={[styles.arrow, styles.leftArrow]}
				onPress={() => handleCarouselScroll("left")}
			>
				<Feather
					name="arrow-left"
					style={{
						justifyContent: "center",
						alignItems: "center",
						color: theme.colors.text,
					}}
					size={20}
				/>
			</TouchableOpacity>
			<ScrollView
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				style={styles.scrollView}
				ref={scrollViewRef}
			>
				{carouselData.map((item, index) => (
					<View key={index} style={styles.imageContainer}>
						<Image
							source={{ uri: item.uri }}
							style={styles.image}
							resizeMode="cover"
						/>
					</View>
				))}
			</ScrollView>
			<TouchableOpacity
				style={[styles.arrow, styles.rightArrow]}
				onPress={() => handleCarouselScroll("right")}
			>
				<Feather
					name="arrow-right"
					style={[
						{
							justifyContent: "center",
							alignItems: "center",
							color: theme.colors.text,
						},
					]}
					size={20}
				/>
			</TouchableOpacity>
			{/* <Image
				source={{ uri: flag }}
				style={{ width: "100%", height: 200, borderRadius: 8 }}
				resizeMode="cover"
			/> */}
		</View>
	);
};

export default CountryFlag;

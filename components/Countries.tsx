import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { CountryData, getAllCountries } from "@/Services/CountryApi";
import Country from "@/app/pages/Country";

type CountriesParams = {
	countriesData: CountryData[];
	searchQuery?: string;
	loading: boolean;
};

const Countries: React.FC<CountriesParams> = ({
	countriesData,
	searchQuery,
}) => {
	return (
		<FlatList
			data={countriesData}
			keyExtractor={(item) => item.name.common}
			renderItem={({ item }) => <Country country={item} />}
			contentContainerStyle={{
				padding: 16,
				gap: 20,
				paddingHorizontal: 20,
			}}
		/>
	);
};

export default Countries;

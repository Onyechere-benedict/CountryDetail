import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { CountryData, getCountryByCode } from "@/Services/CountryApi";

const useCountry = (id: string) => {
	const [country, setCountry] = useState<CountryData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getCountry = async () => {
			try {
				const data = await getCountryByCode(id);
				setCountry(data);
			} catch (error) {
				console.error("Error Fetching Country", error);
			} finally {
				setLoading(false);
			}
		};

		getCountry();
	}, [id]);
	return { country, loading };
};

export default useCountry;

const BASE_URL = "https://restcountries.com/v3.1";

export interface CountryData {
	name: {
		common: string;
		official: string;
		nativeName: {
			[key: string]: {};
		};
	};
	state?: string;
	flag: string;
	population: number;
	capital: string;
	continents: string[];
	tld: string[];
	cca2: string;
	cca3: string;
	independent: boolean;
	status: string;
	unMember: boolean;
	currencies: Record<string, { name: string; symbol: string }>;
	idd: Record<string, { root: string; suffixes: string[] }>;
	altSpellings: string[];
	region: string;
	languages: Record<string, string>;
	translations: Record<string, { official: string; common: string }>;
	latlng: [number, number];
	landlocked: boolean;
	area: number;
	denonyms: Record<string, { f: string; m: string }>;
	// maps: {};
	maps: Record<string, string> | undefined;
	car: {
		signs: string[];
		side: string;
	};
	timezones: string[];
	flags: {
		png: string;
		svg: string;
	};
	coatOfArms: {
		png: string;
		svg: string;
	};
	startOfWeek: string;
	capitalInfo: {
		latlng: [number, number];
	};
}

async function fetchApi<T>(url: string): Promise<T> {
	const response = await fetch(`${BASE_URL}${url}`);
	if (!response.ok) {
		throw new Error(
			`Failed to fetch data from the server: ${response.statusText}`
		);
	}

	return await response.json();
}

export const getAllCountries = async (): Promise<CountryData[]> => {
	return await fetchApi("/all");
};

export const getCountryByCode = async (code: string): Promise<CountryData> => {
	const data = await fetchApi<CountryData[]>(`/alpha/${code}`);
	return data[0];
};

export const searchSpecificCountry = async (
	query: string
): Promise<CountryData[]> => {
	return fetchApi<CountryData[]>(`/name/${query}`);
};

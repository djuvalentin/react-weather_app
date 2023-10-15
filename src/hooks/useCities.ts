import { useCallback, useState } from "react";

const BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const NUM_RESULTS = 5;

//GEOCODING API
//https://geocoding-api.open-meteo.com/v1/search

export function useCities() {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");

  const getCities = useCallback(async function (name: string) {
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}?name=${name}&count=${NUM_RESULTS}`);

      if (!res.ok) throw new Error("Connection error. Failed to fetch cities");

      const data = await res.json();

      if (data.cod === 401) throw new Error("Invalid API key");
      if (!data.results) throw new Error("City not found");

      setCities(data.results);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message);
        setCities([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getCities, isLoading, cities, error };
}

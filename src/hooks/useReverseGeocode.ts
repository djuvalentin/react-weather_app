import { useCallback, useState } from "react";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

type City = {
  city: string;
  continent: string;
  countryCode: string;
  countryName: string;
  latitude: number;
  longitude: number;
};

export function useReverseGeocode() {
  const [city, setCity] = useState<City | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getCity = useCallback(async function (lat: number, lng: number) {
    try {
      setError("");
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
      if (!res.ok)
        throw new Error(
          "Internal server error - unable to reverse geocode position"
        );

      const data = await res.json();

      if (!data.city) throw new Error(`City not found`);

      setCity(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getCity, isLoading, city, error };
}

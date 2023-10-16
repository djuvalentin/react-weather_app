import { useCallback, useState } from "react";

const DEFAULT_LAT = 37.76974177671057;
const DEFAULT_LNG = -122.4579218882785;

type position = {
  lat: number;
  lng: number;
};

export function usePosition() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState<position | null>(null);

  const getPosition = useCallback(function () {
    setError("");
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setPosition({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
        console.log(error.message);
        setIsLoading(false);
      }
    );
  }, []);

  return { getPosition, setPosition, isLoading, position, error };
}

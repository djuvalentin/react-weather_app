import { useState } from "react";

const DEFAULT_LAT = 37.76974177671057;
const DEFAULT_LNG = -122.4579218882785;

export function usePosition(
  defaultPosition = { lat: DEFAULT_LAT, lng: DEFAULT_LNG }
) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState("");

  function getPosition() {
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
        console.log(error.message);
        setIsLoading(false);
      }
    );
  }

  return { getPosition, setPosition, isLoading, position, error };
}

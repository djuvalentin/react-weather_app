import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";

function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined)
    throw new Error(`WeatherCotext used outsice of WeatherProvider`);

  return context;
}

export { useWeather };

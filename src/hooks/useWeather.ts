import { useCallback, useState } from "react";

const FORECAST_BASE_URL = "https://api.open-meteo.com/v1/forecast";

export type CurrentWeather = {
  time: string;
  temperature: number;
  weathercode: number;
  winddirection: number;
  windspeed: number;
};

export type DailyWeather = {
  maxTemps: number[];
  minTemps: number[];
  time: string[];
  weathercode: number[];
};

type WeatherData = {
  currentWeather: CurrentWeather;
  dailyWeather: DailyWeather;
};

export function useWeather() {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const getWeather = useCallback(async function (lat: number, lng: number) {
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(
        `${FORECAST_BASE_URL}?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`
      );
      if (!res.ok)
        throw new Error("Connection error. Failed to fetch weather data");
      const data = await res.json();

      const currentWeather = data["current_weather"];
      const dailyWeather = data.daily;

      const weatherData = {
        currentWeather: {
          time: currentWeather.time,
          temperature: currentWeather.temperature,
          weathercode: currentWeather.weathercode,
          winddirection: currentWeather.winddirection,
          windspeed: currentWeather.windspeed,
        },
        dailyWeather: {
          maxTemps: dailyWeather["temperature_2m_max"],
          minTemps: dailyWeather["temperature_2m_min"],
          time: dailyWeather.time,
          weathercode: dailyWeather.weathercode,
        },
      };

      setWeatherData(weatherData);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getWeather, isLoading, weatherData, error };
}

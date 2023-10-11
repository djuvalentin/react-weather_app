import { useCallback, useState } from "react";

const FORECAST_BASE_URL = "https://api.open-meteo.com/v1/forecast";
// const KEY = API_KEY;

// daily forecast
// `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`

//4days forcast 3 hrs interval
//https://pro.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// Belgrade lat: 44.81326315812103, lng: 20.461032653933152
export type WeatherData = {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
};

export function useWeather() {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const getWeather = useCallback(async function (lat: number, lng: number) {
    setIsLoading(true);

    try {
      const res = await fetch(
        `${FORECAST_BASE_URL}?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`
      );
      const data = await res.json();

      if (data.cod === 401) throw new Error("Invalid API key");

      setWeatherData(data.daily);

      console.log(data);
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

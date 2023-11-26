import { useCallback, createContext, useReducer, useEffect } from "react";
import { ContextProviderProps } from "../types/SharedTypes";
import {
  Action,
  State,
  WeatherContextValue,
} from "../types/WeatherContextTypes";
import { usePosition } from "../hooks/usePosition";
import { useCities } from "../hooks/useCities";

const FORECAST_BASE_URL = "https://api.open-meteo.com/v1/forecast";

const initialState: State = {
  isLoading: false,
  weatherData: null,
  error: null,
};

async function placeholderGetWeather() {
  throw new Error("getWeather function is not implemented yet");
}

const contextDefaultValue = {
  ...initialState,
  getWeather: placeholderGetWeather,
};

const WeatherContext = createContext<WeatherContextValue>(contextDefaultValue);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: null, weatherData: null };
    case "weather/loaded":
      return {
        ...state,
        isLoading: false,
        weatherData: action.payload,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function WeatherProvider({ children }: ContextProviderProps) {
  const [{ isLoading, weatherData, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { position } = usePosition();
  const { cities } = useCities();

  const getWeather = useCallback(async function (lat: number, lng: number) {
    dispatch({ type: "loading" });

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

      dispatch({ type: "weather/loaded", payload: weatherData });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: "rejected", payload: err.message });
        console.error(err.message);
      }
    }
  }, []);

  useEffect(() => {
    if (!position) return;
    getWeather(position.lat, position.lng);
  }, [position, getWeather]);

  useEffect(() => {
    if (!cities?.length) return;
    const { latitude, longitude } = cities[0];
    getWeather(latitude, longitude);
  }, [cities, getWeather]);

  return (
    <WeatherContext.Provider
      value={{ getWeather, weatherData, error, isLoading }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherProvider, WeatherContext };

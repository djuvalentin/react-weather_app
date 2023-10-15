import { useEffect, useState } from "react";
import "./App.css";
import { useCities } from "../hooks/useCities";
import { usePosition } from "../hooks/usePosition";
import Form from "./Form";
import SixDaysWeatherForecast from "./SixDaysWeatherForecast";
import CurrentWeatherDisplay from "./CurrentWeatherDisplay";
import { useWeather } from "../hooks/useWeather";
import { useReverseGeocode } from "../hooks/useReverseGeocode";
import WeatherForecast from "./WeatherForecast";

function App() {
  const [query, setQuery] = useState("");

  const {
    getWeather,
    isLoading: isLoadingWeather,
    weatherData,
    error: errorWeather,
  } = useWeather();

  const {
    getPosition,
    setPosition,
    position,
    isLoading: isLoadingCurrentPosition,
    error: errorCurrentPosition,
  } = usePosition();

  const {
    getCities,
    isLoading: isLoadingCities,
    cities,
    error: errorCities,
  } = useCities();

  const {
    getCity,
    isLoading: isLoadingReverseGeo,
    city,
    error: errorCity,
  } = useReverseGeocode();

  const cityName = city?.city || cities[0]?.["name"] || "";

  const isLoading =
    isLoadingCities ||
    isLoadingCurrentPosition ||
    isLoadingWeather ||
    isLoadingReverseGeo;

  const error =
    errorCities || errorCurrentPosition || errorWeather || errorCity;

  function handleGetLocation() {
    getPosition();
  }

  useEffect(() => {
    getCity(position.lat, position.lng);
    getWeather(position.lat, position.lng);
  }, [position, getWeather, getCity]);

  useEffect(() => {
    if (query.length > 2) {
      getCities(query);
    }
  }, [getCities, query]);

  useEffect(() => {
    if (cities.length === 0) return;

    const { latitude, longitude } = cities[0];

    if (cities.length === 0) return;
    setPosition({
      lat: latitude,
      lng: longitude,
    });
  }, [cities, setPosition]);

  return (
    <div className="app">
      <button onClick={handleGetLocation}>Get current location</button>
      <Form query={query} setQuery={setQuery} />
      {isLoading ? <p>LOADING...</p> : ""}
      {!isLoading && error.length > 0 ? <p>{error}</p> : ""}
      {!isLoading && error.length === 0 && (
        <WeatherForecast>
          <CurrentWeatherDisplay
            city={cityName}
            currentWeather={weatherData?.currentWeather || null}
          />
          <SixDaysWeatherForecast
            dailyWeather={weatherData?.dailyWeather || null}
          />
        </WeatherForecast>
      )}
    </div>
  );
}

export default App;

// BUG: when typing 'Kiki', the city is not found by the
// reverse geocoding API but is found by the cities search API
// Possible solution: use different sates for cityReversGeocode (when getting
// current location) and cityCities (when searching for a city)
//TODO:
// add loading spinner
// add dynamic locale for time format
// set header main footer

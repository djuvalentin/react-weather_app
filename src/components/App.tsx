import { useEffect, useState } from "react";
import "./App.css";
import { useCities } from "../hooks/useCities";
import { usePosition } from "../hooks/usePosition";
import Form from "./Form";
import WeatherForecast from "./WeatherForecast";
import { useWeather } from "../hooks/useWeather";
import { useReverseGeocode } from "../hooks/useReverseGeocode";

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
    console.log(city);
  }, [city]);

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
      <h1>Weather app</h1>
      <button onClick={handleGetLocation}>Get current location</button>
      <Form query={query} setQuery={setQuery} />
      {isLoading ? <p>LOADING...</p> : ""}
      {!isLoading && cityName.length > 0 ? <p>{cityName}</p> : ""}
      {!isLoading && cityName.length === 0 ? <p>{error}</p> : ""}
      {!isLoading && <WeatherForecast weatherData={weatherData} />}
    </div>
  );
}

export default App;

// handle errors:
//    reverseGeocode DONE
//    position
//    cities
//    weather

// set header main footer

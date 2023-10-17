import { useEffect, useState } from "react";
import "./App.css";

import { useCities } from "../hooks/useCities";
import { usePosition } from "../hooks/usePosition";
import { useWeather } from "../hooks/useWeather";
import { useReverseGeocode } from "../hooks/useReverseGeocode";
import { convertWeatherCode } from "../helpers/helpers";

import WeatherForecast from "./WeatherForecast";
import SixDaysWeatherForecast from "./SixDaysWeatherForecast";
import CurrentWeatherDisplay from "./CurrentWeatherDisplay";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";

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

  const error = errorCities || errorWeather || errorCity;

  useEffect(() => {
    if (!position) return;
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

  // BACKGROUND COLOR

  const hourlyDayBrightness = new Map([
    [[21, 22, 23, 0, 1, 2, 3], 15],
    [[9, 10, 11, 12, 13, 14, 15], 100],
    [[16, 8], 90],
    [[17, 7], 80],
    [[18, 6], 55],
    [[19, 5], 45],
    [[20, 4], 25],
  ]);

  let backgroundSaturationCorrection = 100;
  let backgroundBrightnessCorrection = 100;

  if (weatherData) {
    const tone = convertWeatherCode(
      weatherData?.currentWeather.weathercode
    )?.tone;

    const localTime = new Date(weatherData?.currentWeather.time).getHours();

    const matchingArray = [...hourlyDayBrightness.keys()].find((arr) =>
      arr.includes(localTime)
    );

    const brightnessCorrection =
      matchingArray && hourlyDayBrightness.get(matchingArray);

    backgroundSaturationCorrection = tone
      ? tone
      : backgroundSaturationCorrection;

    backgroundBrightnessCorrection = brightnessCorrection
      ? brightnessCorrection
      : backgroundBrightnessCorrection;
  }

  const appStyle = {
    background: `radial-gradient(circle, hsl(190, ${backgroundSaturationCorrection}%, ${
      (50 / 100) * backgroundBrightnessCorrection
    }%) 22%, hsl(243, ${backgroundSaturationCorrection}%, ${
      (31 / 100) * backgroundBrightnessCorrection
    }%) 100%)`,
  };

  function handleGetPosition() {
    getPosition();
    setQuery("");
  }

  return (
    <div style={appStyle} className="app">
      {errorCurrentPosition.length > 0 && <p>{errorCurrentPosition}</p>}
      <SearchBar
        query={query}
        setQuery={setQuery}
        onGetPosition={handleGetPosition}
      />
      <WeatherForecast>
        {isLoading ? <Spinner /> : ""}
        {!isLoading && error.length > 0 ? <p>{error}</p> : ""}
        {!isLoading && error.length === 0 && (
          <>
            <CurrentWeatherDisplay
              city={cityName}
              currentWeather={weatherData?.currentWeather || null}
            />
            <SixDaysWeatherForecast
              dailyWeather={weatherData?.dailyWeather || null}
            />
          </>
        )}
      </WeatherForecast>
    </div>
  );
}

export default App;

// BUG: when typing 'Kiki', the city is not found by the
// reverse geocoding API but is found by the cities search API
// Possible solution: use different sates for cityReversGeocode (when getting
// current location) and cityCities (when searching for a city)
//TODO:
// refactor code
// style error displays
// responsive view
// add dynamic locale for time format
// set header main footer

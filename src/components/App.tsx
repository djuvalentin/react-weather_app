import "./App.css";

import { hoursToBrightness } from "../helpers/hoursToBrightness";
import { convertWeatherCode } from "../helpers/convertWeatherCode";

import WeatherForecast from "./WeatherForecast";
import SearchBar from "./SearchBar";
import { usePosition } from "../hooks/usePosition";
import { useWeather } from "../hooks/useWeather";

function App() {
  const { weatherData } = useWeather();
  const { error: errorPosition } = usePosition();

  // BACKGROUND COLOR

  let backgroundSaturationCorrection = 100;
  let backgroundBrightnessCorrection = 100;

  if (weatherData) {
    const colorTone = convertWeatherCode(
      weatherData?.currentWeather.weathercode
    )?.colorTone;

    const brightness = hoursToBrightness(
      new Date(weatherData?.currentWeather.time).getHours()
    );

    backgroundSaturationCorrection = colorTone
      ? colorTone
      : backgroundSaturationCorrection;

    backgroundBrightnessCorrection = brightness
      ? brightness
      : backgroundBrightnessCorrection;
  }

  const appStyle = {
    background: `radial-gradient(circle, hsl(190, ${backgroundSaturationCorrection}%, ${
      (50 / 100) * backgroundBrightnessCorrection
    }%) 22%, hsl(243, ${backgroundSaturationCorrection}%, ${
      (31 / 100) * backgroundBrightnessCorrection
    }%) 100%)`,
  };

  return (
    <div style={appStyle} className="app">
      {errorPosition && <p>{errorPosition}</p>}
      <SearchBar />
      <WeatherForecast />
    </div>
  );
}

export default App;

// BUG: when typing 'Kiki', the city is not found by the
// reverse geocoding API but is found by the cities search API
// Possible solution: use different sates for cityReversGeocode (when getting
// current location) and cityCities (when searching for a city)
//TODO:
// style error displays
// responsive view
// add dynamic locale for time format
// set header main footer

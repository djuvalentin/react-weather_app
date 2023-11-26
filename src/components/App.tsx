import "./App.css";

import { hoursToBrightness } from "../helpers/hoursToBrightness";
import { convertWeatherCode } from "../helpers/convertWeatherCode";

import Main from "./main/Main";
import Header from "./header/Header";
import { usePosition } from "../hooks/usePosition";
import { useWeather } from "../hooks/useWeather";
import Footer from "./footer/Footer";

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
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

//TODO:
// style error displays
// add dynamic locale for time format
// set header main footer

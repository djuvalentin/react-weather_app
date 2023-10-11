import ForecastItem from "./ForecastItem";
import styles from "./WeatherForecast.module.css";
import { WeatherData } from "../hooks/useWeather";

type WeatherForecastProps = {
  weatherData: WeatherData | null;
};

function WeatherForecast({ weatherData }: WeatherForecastProps) {
  if (!weatherData) return;

  const numDays = weatherData.time?.length;

  const dailyForecastData = [];

  for (let i = 0; i < numDays; i++) {
    dailyForecastData.push({
      time: weatherData.time[i],
      weathercode: weatherData.weathercode[i],
      maxTemp: weatherData.temperature_2m_max[i],
      minTemp: weatherData.temperature_2m_min[i],
    });
  }

  return (
    <ul className={styles.container}>
      {dailyForecastData.map((dailyForecast) => (
        <ForecastItem key={dailyForecast.time} dailyForecast={dailyForecast} />
      ))}
    </ul>
  );
}

export default WeatherForecast;

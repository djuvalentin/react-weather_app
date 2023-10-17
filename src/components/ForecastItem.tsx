import { convertWeatherCode } from "../helpers/helpers";
import styles from "./ForecastItem.module.css";

type ForecastItemProps = {
  forecastData: {
    time: string;
    weathercode: number;
    maxTemp: number;
    minTemp: number;
  };
  day: number;
};

function ForecastItem({ forecastData, day }: ForecastItemProps) {
  const description = convertWeatherCode(forecastData.weathercode);

  const date = new Date(forecastData.time);
  const dateFormatOptions: Intl.DateTimeFormatOptions = { weekday: "short" };

  // Skip today
  if (day === 0) return;

  const dayOfWeek = new Intl.DateTimeFormat("en-US", dateFormatOptions).format(
    date
  );

  return (
    <li>
      <p>{dayOfWeek}</p>
      <p className={styles["weather-icon"]}>{description?.dayIcon}</p>
      <p>{forecastData.maxTemp}°C</p>
      <p>{forecastData.minTemp}°C</p>
    </li>
  );
}

export default ForecastItem;

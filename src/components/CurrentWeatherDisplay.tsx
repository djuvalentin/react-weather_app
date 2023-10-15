import styles from "./CurrentWeatherDisplay.module.css";
import { CurrentWeather } from "../hooks/useWeather";
import { convertWeatherCode } from "../helpers/helpers";

type CurrentWeatherDisplayProps = {
  city: string;
  currentWeather: CurrentWeather | null;
};

function CurrentWeatherDisplay({
  city,
  currentWeather,
}: CurrentWeatherDisplayProps) {
  if (!currentWeather) return;
  const description = convertWeatherCode(currentWeather?.weathercode);
  const time = new Date(currentWeather?.time);

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  const date = new Intl.DateTimeFormat("en-DE", dateFormatOptions).format(time);

  const hours = time.getHours();
  const minutes = new Date().getMinutes();

  return (
    <section className={styles["current-weather"]}>
      <div>
        <h1>📍 {city}</h1>
        <time className={styles.time}>
          <span className={styles["date-text"]}>{date}</span>
          <span className={styles["time-text"]}>{`${hours}:${minutes}`}</span>
        </time>
        <p>{description?.description}</p>
      </div>
      <div className={styles["weather-details"]}>
        <p>
          <strong>Wind speed:</strong> {currentWeather.windspeed} km/h
        </p>
        <p>
          <strong>Wind direction:</strong> {currentWeather.winddirection}
        </p>
        <p className={styles["temperature-text"]}>
          {currentWeather.temperature}°C
        </p>
      </div>
    </section>
  );
}

export default CurrentWeatherDisplay;

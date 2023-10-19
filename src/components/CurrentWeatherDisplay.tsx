import styles from "./CurrentWeatherDisplay.module.css";
import { CurrentWeather } from "../hooks/useWeather";
import { convertWeatherCode } from "../helpers/convertWeatherCode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const ARROW_ICON_ROTATION_OFFSET = 45;

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

  const date = new Intl.DateTimeFormat("en-DE", {
    month: "long",
    day: "numeric",
  }).format(time);

  const hours = time.getHours();

  const minutes = new Date().getMinutes();

  const partOfDay = hours > 5 && hours < 19 ? "day" : "night";

  const arrowLocationStyles = {
    transform: `rotate(${
      currentWeather.winddirection - ARROW_ICON_ROTATION_OFFSET
    }deg)`,
    marginLeft: "10px",
  };

  return (
    <section className={styles["current-weather"]}>
      <div>
        <h1>
          <FontAwesomeIcon icon={faLocationDot} size="xs" /> {city}
        </h1>
        <time className={styles.time}>
          <span className={styles["date-text"]}>{date}</span>
          <span className={styles["time-text"]}>{`${
            hours < 10 ? `0${hours}` : hours
          }:${minutes < 10 ? `0${minutes}` : minutes}`}</span>
        </time>
        <p>{description?.description}</p>
      </div>
      <div className={styles["weather-icon"]}>
        {description?.[`${partOfDay}Icon`]}
      </div>
      <div className={styles["weather-details"]}>
        <p>
          <strong>Wind speed:</strong> {currentWeather.windspeed} km/h
        </p>
        <p>
          <strong>Wind direction:</strong>
          <FontAwesomeIcon
            style={arrowLocationStyles}
            icon={faLocationArrow}
            size="xl"
          />
        </p>
        <p className={styles["temperature-text"]}>
          {currentWeather.temperature}°C
        </p>
      </div>
    </section>
  );
}

export default CurrentWeatherDisplay;

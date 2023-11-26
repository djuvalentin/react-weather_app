import styles from "./WeatherForecast.module.css";
import CurrentWeatherDisplay from "./CurrentWeatherDisplay";
import SixDaysWeatherForecast from "./SixDaysWeatherForecast";
import { useCities } from "../hooks/useCities";
import Spinner from "./Spinner";
import { usePosition } from "../hooks/usePosition";
import { useReverseGeocode } from "../hooks/useReverseGeocode";
import { useWeather } from "../hooks/useWeather";

function WeatherForecast() {
  const { isLoading: isLoadingCities, error: errorCities } = useCities();
  const { isLoading: isLoadingPosition, error: errorPosition } = usePosition();
  const { isLoading: isLoadingReverseGeocode, error: errorReverseGeocode } =
    useReverseGeocode();
  const { isLoading: isLoadingWeather, error: errorWeather } = useWeather();

  const isLoading =
    isLoadingCities ||
    isLoadingPosition ||
    isLoadingReverseGeocode ||
    isLoadingWeather;

  const error =
    errorCities || errorPosition || errorReverseGeocode || errorWeather;

  return (
    <div className={styles.container}>
      {isLoading ? <Spinner /> : ""}
      {!isLoading && error ? <p>{error}</p> : ""}
      {!isLoading && !error && (
        <>
          <CurrentWeatherDisplay />
          <SixDaysWeatherForecast />
        </>
      )}
    </div>
  );
}

export default WeatherForecast;

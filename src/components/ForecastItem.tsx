import { getWeatherIcon } from "../helpers/helpers";

type ForecastItemProps = {
  dailyForecast: {
    time: string;
    weathercode: number;
    maxTemp: number;
    minTemp: number;
  };
};

function ForecastItem({ dailyForecast }: ForecastItemProps) {
  return (
    <li>
      <p>{dailyForecast.time} </p>
      <p>{getWeatherIcon(dailyForecast.weathercode)} </p>
      <p>High: {dailyForecast.maxTemp}°C</p>
      <p>Low: {dailyForecast.minTemp}°C</p>
    </li>
  );
}

export default ForecastItem;

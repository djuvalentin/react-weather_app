import ForecastItem from "./ForecastItem";
import styles from "./SixDaysWeatherForecast.module.css";
import { DailyWeather } from "../hooks/useWeather";

type SixDaysWeatherForecastProps = {
  dailyWeather: DailyWeather | null;
};

function SixDaysWeatherForecast({ dailyWeather }: SixDaysWeatherForecastProps) {
  if (!dailyWeather) return;

  const numDays = dailyWeather.time?.length;

  const forecastData = [];

  for (let i = 0; i < numDays; i++) {
    forecastData.push({
      time: dailyWeather.time[i],
      weathercode: dailyWeather.weathercode[i],
      maxTemp: dailyWeather.maxTemps[i],
      minTemp: dailyWeather.minTemps[i],
    });
  }

  return (
    <section>
      <ul className={styles.container}>
        {forecastData.map((data, i) => (
          <ForecastItem key={data.time} forecastData={data} day={i} />
        ))}
      </ul>
    </section>
  );
}

export default SixDaysWeatherForecast;

import { ReactNode } from "react";
import styles from "./WeatherForecast.module.css";

type WeatherForecastProps = {
  children: ReactNode;
};

function WeatherForecast({ children }: WeatherForecastProps) {
  return <div className={styles.container}>{children}</div>;
}

export default WeatherForecast;

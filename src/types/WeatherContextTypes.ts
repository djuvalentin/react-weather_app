import { ErrorMessage } from "./SharedTypes";

export type CurrentWeather = {
  time: string;
  temperature: number;
  weathercode: number;
  winddirection: number;
  windspeed: number;
};

export type DailyWeather = {
  maxTemps: number[];
  minTemps: number[];
  time: string[];
  weathercode: number[];
};

export type WeatherData = {
  currentWeather: CurrentWeather;
  dailyWeather: DailyWeather;
} | null;

export type Action =
  | {
      type: "loading";
    }
  | {
      type: "weather/loaded";
      payload: WeatherData;
    }
  | {
      type: "rejected";
      payload: ErrorMessage;
    };

export type State = {
  isLoading: boolean;
  weatherData: WeatherData;
  error: ErrorMessage;
};
// type Dispatch = (action: Action) => void;

export type WeatherContextValue = State & {
  // dispatch: Dispatch;
  getWeather: (lat: number, lng: number) => Promise<void>;
};

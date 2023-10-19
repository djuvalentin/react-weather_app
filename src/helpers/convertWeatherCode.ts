import { findValueInArrayMap } from "./helpers";
import { MapValue } from "./helpers";

export type WeatherDescription = {
  dayIcon: string;
  nightIcon: string;
  description: string;
  colorTone: number;
};

function isWeatherDescription(
  value: MapValue | undefined
): value is WeatherDescription {
  return typeof value === "object";
}

export function convertWeatherCode(
  weatherCode: number
): WeatherDescription | undefined {
  const descriptions = new Map([
    [
      [0],
      {
        dayIcon: "🌞",
        nightIcon: "🌜",
        description: "Clear sky",
        colorTone: 100,
      },
    ],
    [
      [1],
      {
        dayIcon: "🌤️",
        nightIcon: "🌜",
        description: "Mainly clear",
        colorTone: 90,
      },
    ],
    [
      [2],
      {
        dayIcon: "🌥️",
        nightIcon: "☁️",
        description: "Partly cloudy",
        colorTone: 70,
      },
    ],
    [
      [3],
      {
        dayIcon: "☁️",
        nightIcon: "☁️",
        description: "Overcast",
        colorTone: 50,
      },
    ],
    [
      [45, 48],
      { dayIcon: "🌫", nightIcon: "🌫", description: "Fog", colorTone: 45 },
    ],
    [
      [51, 56, 61, 66, 80],
      { dayIcon: "🌧️", nightIcon: "🌧️", description: "Raining", colorTone: 40 },
    ],
    [
      [53, 55, 63, 65, 57, 67, 81, 82],
      { dayIcon: "🌧️", nightIcon: "🌧️", description: "Showers", colorTone: 30 },
    ],
    [
      [71, 73, 75, 77, 85, 86],
      { dayIcon: "🌨️", nightIcon: "🌨️", description: "Snowing", colorTone: 20 },
    ],
    [
      [95],
      {
        dayIcon: "⛈️",
        nightIcon: "⛈️",
        description: "Tunderstorm",
        colorTone: 10,
      },
    ],
    [
      [96, 99],
      {
        dayIcon: "🌩",
        nightIcon: "🌩",
        description: "Tunderstomr with hail",
        colorTone: 5,
      },
    ],
  ]);

  const description = findValueInArrayMap(descriptions, weatherCode);

  if (isWeatherDescription(description)) return description;
  else return undefined;
}

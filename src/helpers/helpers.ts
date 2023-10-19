import { WeatherDescription } from "./convertWeatherCode";

export type MapValue = number | WeatherDescription;

type ArrayMap = Map<number[], MapValue>;
/**
 * The function returns the matching value of key-value pairs of the provided Map where keys are arrays of numbers (number[]) and values are type number of WeatherDescription objects.
 * @param arrayMap Map value. Map keys should be arrays of numbers (number[])
 * @param targetNumber Number that the function will try to find in one of the keys
 * @returns Value for the key-value pair where the target number was found in the key. Else undefined.
 */

export function findValueInArrayMap(arrayMap: ArrayMap, targetNumber: number) {
  const matchingArray = [...arrayMap.keys()].find((arr) =>
    arr.includes(targetNumber)
  );

  if (!matchingArray) return undefined;

  const value = arrayMap.get(matchingArray);

  return value;
}

export function formatDay(dateStr: string): string {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

import { findValueInArrayMap } from "./helpers";

export function hoursToBrightness(hours: number): number | undefined {
  const hourlyDayBrightness = new Map([
    [[21, 22, 23, 0, 1, 2, 3], 15],
    [[9, 10, 11, 12, 13, 14, 15], 100],
    [[16, 8], 90],
    [[17, 7], 80],
    [[18, 6], 55],
    [[19, 5], 45],
    [[20, 4], 25],
  ]);

  const brightness = findValueInArrayMap(hourlyDayBrightness, hours);

  if (typeof brightness === "number") return brightness;
  else return undefined;
}

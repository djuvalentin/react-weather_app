export function convertWeatherCode(weatherCode: number) {
  const descriptions = new Map([
    [[0], { icon: "🌞", description: "Clear sky" }],
    [[1], { icon: "🌤️", description: "Mainly clear" }],
    [[2], { icon: "🌥️", description: "Partly cloudy" }],
    [[3], { icon: "☁️", description: "Overcast" }],
    [[45, 48], { icon: "🌫", description: "Fog" }],
    [[51, 56, 61, 66, 80], { icon: "🌧️", description: "Raining" }],
    [[53, 55, 63, 65, 57, 67, 81, 82], { icon: "🌧️", description: "Showers" }],
    [[71, 73, 75, 77, 85, 86], { icon: "🌨️", description: "Snowing" }],
    [[95], { icon: "🌩", description: "Tunderstorm" }],
    [[96, 99], { icon: "⛈️", description: "Tunderstomr with hail" }],
  ]);

  const matchingArray = [...descriptions.keys()].find((arr) =>
    arr.includes(weatherCode)
  );

  if (!matchingArray) return;

  return descriptions.get(matchingArray);
}

export function codeToFlag(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function formatDay(dateStr: string) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

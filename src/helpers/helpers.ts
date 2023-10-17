export function convertWeatherCode(weatherCode: number) {
  const descriptions = new Map([
    [
      [0],
      { dayIcon: "🌞", nightIcon: "🌜", description: "Clear sky", tone: 100 },
    ],
    [
      [1],
      { dayIcon: "🌤️", nightIcon: "🌜", description: "Mainly clear", tone: 90 },
    ],
    [
      [2],
      {
        dayIcon: "🌥️",
        nightIcon: "☁️",
        description: "Partly cloudy",
        tone: 70,
      },
    ],
    [
      [3],
      { dayIcon: "☁️", nightIcon: "☁️", description: "Overcast", tone: 50 },
    ],
    [[45, 48], { dayIcon: "🌫", nightIcon: "🌫", description: "Fog", tone: 45 }],
    [
      [51, 56, 61, 66, 80],
      { dayIcon: "🌧️", nightIcon: "🌧️", description: "Raining", tone: 40 },
    ],
    [
      [53, 55, 63, 65, 57, 67, 81, 82],
      { dayIcon: "🌧️", nightIcon: "🌧️", description: "Showers", tone: 30 },
    ],
    [
      [71, 73, 75, 77, 85, 86],
      { dayIcon: "🌨️", nightIcon: "🌨️", description: "Snowing", tone: 20 },
    ],
    [
      [95],
      { dayIcon: "⛈️", nightIcon: "⛈️", description: "Tunderstorm", tone: 10 },
    ],
    [
      [96, 99],
      {
        dayIcon: "🌩",
        nightIcon: "🌩",
        description: "Tunderstomr with hail",
        tone: 5,
      },
    ],
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

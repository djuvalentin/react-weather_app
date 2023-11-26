import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import { CitiesProvider } from "./contexts/CitiesContext.tsx";
import { PositionProvider } from "./contexts/PositionContext.tsx";
import { ReverseGeocodeProvider } from "./contexts/ReverseGeocodeContext.tsx";
import { WeatherProvider } from "./contexts/WeatherContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CitiesProvider>
      <PositionProvider>
        <ReverseGeocodeProvider>
          <WeatherProvider>
            <App />
          </WeatherProvider>
        </ReverseGeocodeProvider>
      </PositionProvider>
    </CitiesProvider>
  </React.StrictMode>
);

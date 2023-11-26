import { createContext, useReducer, useCallback, useEffect } from "react";
import { ContextProviderProps } from "../types/SharedTypes";
import {
  Action,
  ReverseGeocodeContextValue,
  State,
} from "../types/ReverseGeocodingContextTypes";
import { usePosition } from "../hooks/usePosition";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const initialState: State = {
  isLoading: false,
  city: null,
  error: null,
};

async function placeholderGetCity() {
  throw new Error("getCity function is not implemented yet");
}

const contextDefaultValue = {
  ...initialState,
  getCity: placeholderGetCity,
};

const ReverseGeocodeContext =
  createContext<ReverseGeocodeContextValue>(contextDefaultValue);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, city: null, error: null };
    case "city/loaded":
      return { ...state, isLoading: false, city: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function ReverseGeocodeProvider({ children }: ContextProviderProps) {
  const [{ isLoading, city, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { position } = usePosition();

  const getCity = useCallback(async function (lat: number, lng: number) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
      if (!res.ok)
        throw new Error(
          "Internal server error - unable to reverse geocode position"
        );

      const data = await res.json();

      if (!data.city) throw new Error(`City not found`);

      dispatch({ type: "city/loaded", payload: data.city });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: "rejected", payload: err.message });
        console.error(err.message);
      }
    }
  }, []);

  useEffect(() => {
    if (!position) return;
    getCity(position.lat, position.lng);
  }, [position, getCity]);

  return (
    <ReverseGeocodeContext.Provider value={{ getCity, isLoading, city, error }}>
      {children}
    </ReverseGeocodeContext.Provider>
  );
}

export { ReverseGeocodeContext, ReverseGeocodeProvider };

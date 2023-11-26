import { createContext, useReducer, useCallback } from "react";
import { ContextProviderProps } from "../types/SharedTypes";
import { Action, CitiesContextValue, State } from "../types/CitiesContextTypes";

const BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const NUM_RESULTS = 5;

const initialState: State = {
  isLoading: false,
  cities: null,
  error: null,
};

async function placeholderGetCities() {
  throw new Error("getCities function is not implemented yet");
}

const defaultContextValue = {
  ...initialState,
  getCities: placeholderGetCities,
};

const CitiesContext = createContext<CitiesContextValue>(defaultContextValue);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: null, cities: null };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}
function CitiesProvider({ children }: ContextProviderProps) {
  const [{ isLoading, cities, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const getCities = useCallback(async function (name: string) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}?name=${name}&count=${NUM_RESULTS}`);

      if (!res.ok) throw new Error("Connection error. Failed to fetch cities");

      const data = await res.json();

      if (!data.results) throw new Error("City not found");

      dispatch({ type: "cities/loaded", payload: data.results });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: "rejected", payload: err.message });
        console.error(err.message);
      }
    }
  }, []);

  return (
    <CitiesContext.Provider value={{ getCities, isLoading, cities, error }}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };

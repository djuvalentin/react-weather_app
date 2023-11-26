import { createContext, useReducer } from "react";
import { ContextProviderProps } from "../types/SharedTypes";
import {
  Action,
  PositionContextValue,
  State,
} from "../types/PositionContextTypes";

const DEFAULT_LAT = 37.76974177671057;
const DEFAULT_LNG = -122.4579218882785;

const initialState: State = {
  isLoading: false,
  position: { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
  error: null,
};
function placeholderGetPosition() {
  throw new Error("getPosition function is not implemented yet");
}

const contextDefaultValue = {
  ...initialState,
  getPosition: placeholderGetPosition,
};

const PositionContext =
  createContext<PositionContextValue>(contextDefaultValue);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: null, position: null };
    case "position/loaded":
      return { ...state, isLoading: false, position: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function PositionProvider({ children }: ContextProviderProps) {
  const [{ isLoading, position, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function getPosition() {
    dispatch({ type: "loading" });

    if (!navigator.geolocation)
      return dispatch({
        type: "rejected",
        payload: "Your browser does not support geolocation",
      });

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch({
          type: "position/loaded",
          payload: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        });
      },
      (error) => {
        dispatch({ type: "rejected", payload: error.message });
        console.log(error.message);
      }
    );
  }

  return (
    <PositionContext.Provider
      value={{ getPosition, isLoading, position, error }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export { PositionContext, PositionProvider };

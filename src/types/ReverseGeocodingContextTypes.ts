import { ErrorMessage } from "./SharedTypes";

export type City = {
  city: string;
  countryName: string;
  latitude: number;
  longitude: number;
} | null;

export type Action =
  | {
      type: "loading";
    }
  | {
      type: "city/loaded";
      payload: City;
    }
  | {
      type: "rejected";
      payload: ErrorMessage;
    };

export type State = {
  isLoading: boolean;
  city: City;
  error: ErrorMessage;
};

export type ReverseGeocodeContextValue = State & {
  getCity: (lat: number, lng: number) => Promise<void>;
};

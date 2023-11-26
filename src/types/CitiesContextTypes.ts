import { ErrorMessage } from "./SharedTypes";

export type City = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
};

export type Cities = City[] | null;

export type Action =
  | {
      type: "loading";
    }
  | {
      type: "cities/loaded";
      payload: Cities;
    }
  | {
      type: "rejected";
      payload: ErrorMessage;
    };

export type State = {
  isLoading: boolean;
  cities: Cities;
  error: ErrorMessage;
};

export type CitiesContextValue = State & {
  getCities: (name: string) => Promise<void>;
};

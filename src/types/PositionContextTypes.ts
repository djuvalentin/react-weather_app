import { ErrorMessage } from "./SharedTypes";

export type Position = {
  lat: number;
  lng: number;
} | null;

export type Action =
  | {
      type: "loading";
    }
  | {
      type: "position/loaded";
      payload: Position;
    }
  | {
      type: "rejected";
      payload: ErrorMessage;
    };

export type State = {
  isLoading: boolean;
  position: Position;
  error: ErrorMessage;
};

export type PositionContextValue = State & {
  getPosition: () => void;
};

import { useContext } from "react";
import { PositionContext } from "../contexts/PositionContext";

function usePosition() {
  const context = useContext(PositionContext);
  if (context === undefined)
    throw new Error("PositionContext was used outside the PositionProvider");

  return context;
}

export { usePosition };

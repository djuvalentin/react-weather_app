import { useContext } from "react";
import { ReverseGeocodeContext } from "../contexts/ReverseGeocodeContext";

function useReverseGeocode() {
  const context = useContext(ReverseGeocodeContext);
  if (context === undefined)
    throw new Error(
      "ReverseGeocodeContext used outside the ReverseGeocodeProvider"
    );
  return context;
}

export { useReverseGeocode };

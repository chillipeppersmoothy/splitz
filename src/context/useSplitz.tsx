import { useContext } from "react";
import { SplitzContext } from "./SplitzContext";

function useSplitz() {
  const context = useContext(SplitzContext);
  if (context === undefined) {
    throw new Error("useSplitz must be used within a SplitzProvider");
  }
  return context;
}

export default useSplitz;

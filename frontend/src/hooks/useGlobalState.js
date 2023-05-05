import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const useGlobalState = () => {
  return useContext(GlobalContext)
}

export default useGlobalState
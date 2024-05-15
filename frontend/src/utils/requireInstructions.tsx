import { Navigate, useLocation } from "react-router-dom";
import { INTRO_DONE_TOKEN } from "./localStorageTokens";

export default function RequireInstructions({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (!sessionStorage.getItem(INTRO_DONE_TOKEN)) {
    return <Navigate to="/instructions" state={{ from: location }} />;
  }

  return children;
}

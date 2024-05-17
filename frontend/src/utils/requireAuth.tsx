import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./authentication";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/zaloguj" state={{ from: location }} />;
  }

  return children;
}

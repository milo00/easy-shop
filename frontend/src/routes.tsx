import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./views/register";
import Login from "./views/login";
import Home from "./views/home";
import RequireAuth from "./utils/requireAuth";
import Logout from "./views/logout";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/logout"
          element={
            <RequireAuth>
              <Logout />
            </RequireAuth>
          }
        />
        {/* <Route component={NotFound} /> */}
      </Routes>
    </Router>
  );
};

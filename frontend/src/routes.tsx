import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./views/register";
import Login from "./views/login";
import Home from "./views/home";
import RequireAuth from "./utils/requireAuth";
import Logout from "./views/logout";
import Layout from "./utils/layout";
import GenderItems from "./views/genderItems";
import { Gender } from "./models/item";
import Sale from "./views/discount";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
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
        <Route
          path="/men"
          element={
            <Layout>
              <GenderItems gender={Gender.MEN} />
            </Layout>
          }
        />
        <Route
          path="/women"
          element={
            <Layout>
              <GenderItems gender={Gender.WOMEN} />
            </Layout>
          }
        />
        <Route
          path="/kids"
          element={
            <Layout>
              <GenderItems gender={Gender.GIRLS} />
            </Layout>
          }
        />
        <Route
          path="/sale"
          element={
            <Layout>
              <Sale />
            </Layout>
          }
        />
        {/* <Route component={NotFound} /> */}
      </Routes>
    </Router>
  );
};

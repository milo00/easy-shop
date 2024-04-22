import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./views/register";
import Login from "./views/login";
import Home from "./views/home";
import RequireAuth from "./utils/requireAuth";
import Logout from "./views/logout";
import Layout from "./utils/layout";
import Items from "./views/items";
import Sale from "./views/discount";
import Item from "./views/item";
import Cart from "./views/cart";

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
          path="/items/:id"
          element={
            <Layout>
              <Item />
            </Layout>
          }
        />
        <Route
          path="/:gender/:category?/:subcategory?/:productType?"
          element={
            <Layout>
              <Items />
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
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        {/* <Route component={NotFound} /> */}
      </Routes>
    </Router>
  );
};

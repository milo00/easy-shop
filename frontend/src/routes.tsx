import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./views/register";
import Login from "./views/login";
import Home from "./views/home";
import RequireAuth from "./utils/requireAuth";
import Logout from "./views/logout";
import Layout from "./utils/layout";
import Items from "./views/items";
import Item from "./views/item";
import Cart from "./views/cart";
import { fetchItems, fetchOnSale } from "./store/slices/itemsSlice";
import Checkout from "./views/checkout";

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
          path="/kids/:gender/:category?/:subcategory?/:productType?"
          element={
            <Layout>
              <Items fetchItems={fetchItems} />
            </Layout>
          }
        />
        <Route
          path={"/sale"}
          element={
            <Layout>
              <Items fetchItems={fetchOnSale} />
            </Layout>
          }
        />
        <Route
          path={"/sale/:gender/:category?/:subcategory?/:productType?"}
          element={
            <Layout>
              <Items fetchItems={fetchOnSale} />
            </Layout>
          }
        />
        <Route
          path="/:gender/:category?/:subcategory?/:productType?"
          element={
            <Layout>
              <Items fetchItems={fetchItems} />
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
        <Route
          path="/checkout"
          element={
            <Layout basic>
              <Checkout />
            </Layout>
          }
        />
        {/* <Route component={NotFound} /> */}
      </Routes>
    </Router>
  );
};

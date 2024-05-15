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
import Error from "./views/error";
import { fetchItems, fetchOnSale } from "./store/slices/itemsSlice";
import Checkout from "./views/checkout";
import ErrorBoundary from "./utils/errorBoundary";

const errorBoundaryWrapper = (children: JSX.Element) => (
  <ErrorBoundary>{children}</ErrorBoundary>
);

const layoutWrapper = (children: JSX.Element, basic?: boolean) => (
  <Layout basic={basic}>{children}</Layout>
);

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={errorBoundaryWrapper(layoutWrapper(<Login />, true))}
        />
        <Route
          path="/register"
          element={errorBoundaryWrapper(layoutWrapper(<Register />, true))}
        />
        <Route
          path="/logout"
          element={errorBoundaryWrapper(
            <RequireAuth>
              <Logout />
            </RequireAuth>
          )}
        />
        <Route path="/" element={errorBoundaryWrapper(<Home />)} />
        <Route
          path="/items/:id"
          element={errorBoundaryWrapper(layoutWrapper(<Item />))}
        />
        <Route
          path="/items/categories/:gender/:category?/:subcategory?/:productType?"
          element={errorBoundaryWrapper(
            layoutWrapper(<Items fetchItems={fetchItems} />)
          )}
        />
        <Route
          path="/items/categories/kids/:gender/:category?/:subcategory?/:productType?"
          element={errorBoundaryWrapper(
            layoutWrapper(<Items fetchItems={fetchItems} />)
          )}
        />
        <Route
          path="/sale/:gender?/:category?/:subcategory?/:productType?"
          element={errorBoundaryWrapper(
            layoutWrapper(<Items fetchItems={fetchOnSale} />)
          )}
        />
        <Route
          path="/cart"
          element={errorBoundaryWrapper(layoutWrapper(<Cart />))}
        />
        <Route
          path="/checkout"
          element={errorBoundaryWrapper(layoutWrapper(<Checkout />, true))}
        />
        <Route
          path="*"
          element={
            <Layout>
              <Error message={"page not found"} />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

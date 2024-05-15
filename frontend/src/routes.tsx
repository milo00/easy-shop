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
import RequireInstructions from "./utils/requireInstructions";
import Instructions from "./views/instructions";

const errorBoundaryWrapper = (children: JSX.Element) => (
  <ErrorBoundary>{children}</ErrorBoundary>
);

const layoutWrapper = (children: JSX.Element, basic?: boolean) => (
  <Layout basic={basic}>{children}</Layout>
);

const requireInstructionsWrapper = (children: JSX.Element) => (
  <RequireInstructions>{children}</RequireInstructions>
);

const mutliWrapper = (children: JSX.Element, basic?: boolean) =>
  requireInstructionsWrapper(errorBoundaryWrapper(layoutWrapper(children, basic)));

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={mutliWrapper(<Login />, true)} />
        <Route path="/register" element={mutliWrapper(<Register />, true)} />
        <Route
          path="/logout"
          element={requireInstructionsWrapper(
            errorBoundaryWrapper(
              <RequireAuth>
                <Logout />
              </RequireAuth>
            )
          )}
        />
        <Route
          path="/"
          element={requireInstructionsWrapper(errorBoundaryWrapper(<Home />))}
        />
        <Route path="/instructions" element={errorBoundaryWrapper(<Instructions />)} />
        <Route path="/items/:id" element={mutliWrapper(<Item />)} />
        <Route
          path="/items/categories/:gender/:category?/:subcategory?/:productType?"
          element={mutliWrapper(<Items fetchItems={fetchItems} />)}
        />
        <Route
          path="/items/categories/kids/:gender/:category?/:subcategory?/:productType?"
          element={mutliWrapper(<Items fetchItems={fetchItems} />)}
        />
        <Route
          path="/sale/:gender?/:category?/:subcategory?/:productType?"
          element={mutliWrapper(<Items fetchItems={fetchOnSale} />)}
        />
        <Route path="/cart" element={mutliWrapper(<Cart />)} />
        <Route path="/checkout" element={mutliWrapper(<Checkout />, true)} />
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

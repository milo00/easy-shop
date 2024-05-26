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
import ChangePassword from "./views/changePassword";

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
  requireInstructionsWrapper(
    errorBoundaryWrapper(layoutWrapper(children, basic))
  );

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/zaloguj" element={mutliWrapper(<Login />, true)} />
        <Route path="/zarejestruj" element={mutliWrapper(<Register />, true)} />
        <Route
          path="/zmien-haslo"
          element={mutliWrapper(<ChangePassword />, true)}
        />
        <Route
          path="/wyloguj"
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
        <Route
          path="/instrukcje"
          element={errorBoundaryWrapper(<Instructions />)}
        />
        <Route path="/produkty/:id" element={mutliWrapper(<Item />)} />
        <Route
          path="/produkty/kategorie/:gender/:category?/:subcategory?/:productType?"
          element={mutliWrapper(<Items fetchItems={fetchItems} />)}
        />
        <Route
          path="/produkty/kategorie/dzieci/:gender/:category?/:subcategory?/:productType?"
          element={mutliWrapper(<Items fetchItems={fetchItems} />)}
        />
        <Route
          path="/wyprzedaż/:gender?/:category?/:subcategory?/:productType?"
          element={mutliWrapper(<Items fetchItems={fetchOnSale} />)}
        />
        <Route path="/koszyk" element={mutliWrapper(<Cart />)} />
        <Route
          path="/kasa"
          element={mutliWrapper(
            <RequireAuth>
              <Checkout />
            </RequireAuth>,
            true
          )}
        />
        <Route
          path="*"
          element={
            <Layout>
              <Error message={"nie znaleziono strony"} />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

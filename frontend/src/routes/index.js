import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";

import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import HistoryPayment from "../components/HistoryPayment";
import CheckOut from "../pages/CheckOut";
import CategoryDetail from "../pages/CategoryDetail";
import TopCare from "../components/TopCare";
import TekZone from "../components/TekZone";
import BlogDetail from "../pages/BlogDetail";
import PrivateRoute from "../PrivateRoute";
import InforUser from "../pages/InforUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          // <PrivateRoute>
          <Home />
          // </PrivateRoute>
        ),
      },
      {
        path: "infor-user",
        element: <InforUser />,
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",

        element: 
          // <PrivateRoute>
            <Cart />,
          // </PrivateRoute>
        
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "history-payments",
        element: (
          // <PrivateRoute>
            <HistoryPayment />
          // </PrivateRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          // <PrivateRoute>
            <CheckOut />
          // </PrivateRoute>
        ),
      },
      {
        path: "topcare",
        element: <TopCare />,
      },
      {
        path: "tekzone",
        element: <TekZone />,
      },
      {
        path: "blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "/:id",
        element: <CategoryDetail />,
      },
      {
        path: "admin-panel/*",
        element: (
          // <PrivateRoute>
            <AdminPanel />
          // </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

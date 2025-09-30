import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Overview from "./pages/overview/Overview";
import Budgets from "./pages/budgets/Budgets";
import Posts from "./pages/posts/Posts";
import RecurringBills from "./pages/recurringBills/RecurringBills";
import Tarnsactions from "./pages/transactions/Transactions";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { login, isAuthReady } from "./app/features/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((store) => store.user);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(login(currentUser));
      }
      dispatch(isAuthReady());
    });

    return () => unsub();
  }, [dispatch]);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        { index: true, element: <Overview /> },
        { path: "/budgets", element: <Budgets /> },
        { path: "/posts", element: <Posts /> },
        { path: "/recurringbills", element: <RecurringBills /> },
        { path: "/transactions", element: <Tarnsactions /> },
      ],
    },
    { path: "/login", element: user ? <Navigate to="/" /> : <Login /> },
    { path: "/register", element: user ? <Navigate to="/" /> : <Register /> },
  ]);

  return authReady && <RouterProvider router={routes} />;
};

export default App;

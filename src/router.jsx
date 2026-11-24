import { createBrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn";
import Dashboard from "./routes/Dashboard";
import Header from "./components/Header";
export const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
]);

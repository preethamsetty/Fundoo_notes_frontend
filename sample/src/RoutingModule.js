import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./Components/register/register";
import Login from "./Components/login/login";

function RoutingModule() {
  // Define the routes
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Login />
    },
    {
      path: "register",
      element: <Register />
    }
  ]);

  return <RouterProvider router={routes} />;
}

export default RoutingModule;

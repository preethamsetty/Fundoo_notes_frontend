import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "../Components/register/register";
import Login from "../Components/login/login";
import DashboardContainer from "../Components/dashboard/DashboardContainer";
import NoteContainer from "../Components/NoteContainer/NoteContainer";
import ArchiveContainer from "../Components/ArchiveContainer/ArchiveContainer";
import TrashContainer from "../Components/TrashContainer/TrashContainer";
import { AuthRoute } from "./AuthRoute";
import { ProtectedRoute } from "./ProtectedRoute";

function RoutingModule() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthRoute><Login/></AuthRoute> ,
    },
    {
      path: "register",
      element: <AuthRoute><Register /></AuthRoute>,
    },
    {
      path: "dashboard",
      element: <ProtectedRoute><DashboardContainer/></ProtectedRoute>,
      children: [
        {
          path: "notes",
          element: <NoteContainer />,
        },
        {
          path: "archive",
          element: <ArchiveContainer />,
        },
        {
          path: "trash",
          element: <TrashContainer />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default RoutingModule;


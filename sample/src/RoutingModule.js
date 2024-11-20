import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./Components/register/register";
import Login from "./Components/login/login";
import NoteCard from "./Components/notecard/NoteCard";
import DashboardContainer from "./Components/dashboard/DashboardContainer"
import NoteContainer from "./Components/TakeNote/TakeNote"

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
    },
    {
      path: "dashboard",
      element: <DashboardContainer/>
    },
  //   {
  //     path: "/dashboard",
  //     element: <DashboardContainer/>,
  //     children: [
  //         {
  //             path: "/notes",
  //             element: <NoteContainer/>
  //         },
  //         {
  //             path: "/archive",
  //             element: <ArchiveContainer/>
  //         },
  //         {
  //             path: "/trash",
  //             element: <TrashContainer/>
  //         }
  //     ]
  // }
  ]
);

  return <RouterProvider router={routes} />;
}

export default RoutingModule;

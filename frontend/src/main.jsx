import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AuthProvider from "./AuthProvider/AuthProvider";
import Register from "./pages/Register/Register";
import JobDetailsPage from "./pages/JobDetailsPage/JobDetailsPage";
import PrivateRoute from "./router/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path:"/api/jobs/:id",
                element:<PrivateRoute><JobDetailsPage/></PrivateRoute>,
                loader:({params})=>fetch(`http://localhost:3000/api/jobs/${params.id}`)
            }
        ],
    },
]);
createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);

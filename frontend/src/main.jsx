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
import ApplyJob from "./pages/ApplyJob/ApplyJob";
import MyApplications from "./pages/MyApplications/MyApplications";

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
                loader:({params})=>fetch(`https://jobhunt-api.vercel.app/api/jobs/${params.id}`)
            },
            {
                path:'/applyjob/:id',
                element:<PrivateRoute><ApplyJob></ApplyJob></PrivateRoute>
            },
            {
                path:"/my-applications",
                element:<PrivateRoute><MyApplications></MyApplications></PrivateRoute>
            }
        ],
    },
]);
createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);

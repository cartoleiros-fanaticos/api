import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Redirect
} from "react-router-dom";
import "./index.css";

import Login from './screens/login';
import Register from './screens/register';
import Recovery from './screens/recovery';

import Player from './screens/auth/player';
import Emphasis from './screens/auth/emphasis';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/cadastro",
        element: <Register />,
    },
    {
        path: "/recovery",
        element: <Recovery />,
    },
    {
        path: "/auth/atletas",
        element: <Player />,
    },
    {
        path: "/auth/destaques",
        element: <Emphasis />,
    },
]);

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
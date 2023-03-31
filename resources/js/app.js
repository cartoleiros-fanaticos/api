import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";

import Login from './screens/login';
import Register from './screens/register';
import Recovery from './screens/recovery';

import Player from './screens/auth/player';
import Emphasis from './screens/auth/emphasis';
import Crossing from './screens/auth/crossing';
import Plans from './screens/auth/plans';
import Partials from './screens/auth/partials/container';
import Videos from './screens/auth/videos';

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
    {
        path: "/auth/parciais",
        element: <Partials />,
    },
    {
        path: "/auth/videos",
        element: <Videos />,
    },
    {
        path: "/auth/cruzamento-scouts",
        element: <Crossing />,
    },
    {
        path: "/auth/planos",
        element: <Plans />,
    },
]);

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
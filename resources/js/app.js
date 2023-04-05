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
import Lineup from './screens/auth/lineup';
import Emphasis from './screens/auth/emphasis';
import Scouts from './screens/auth/crossing/scouts';
import Score from './screens/auth/crossing/score';
import Average from './screens/auth/crossing/average';
import Plans from './screens/auth/plans';
import League from './screens/auth/league';
import Videos from './screens/auth/videos';
import Contact from './screens/auth/contact';
import Players from './screens/auth/partials/player';
import Rounds from './screens/auth/partials/rounds';
import Statistics from './screens/auth/partials/statistics';

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
        path: "/auth/escalacao",
        element: <Lineup />,
    },
    {
        path: "/auth/atletas",
        element: <Player />,
    },
    {
        path: "/auth/cruzamento-scouts",
        element: <Scouts />,
    },
    {
        path: "/auth/cruzamento-pontos",
        element: <Score />,
    },
    {
        path: "/auth/cruzamento-media",
        element: <Average />,
    },
    {
        path: "/auth/destaques",
        element: <Emphasis />,
    },
    {
        path: "/auth/parciais/jogadores",
        element: <Players />,
    },
    {
        path: "/auth/parciais/clubes",
        element: <Rounds />,
    },
    {
        path: "/auth/parciais/times",
        element: <Statistics />,
    },
    {
        path: "/auth/ligas",
        element: <League />,
    },
    {
        path: "/auth/videos",
        element: <Videos />,
    },
    {
        path: "/auth/planos",
        element: <Plans />,
    },
    {
        path: "/auth/contato",
        element: <Contact />,
    },
]);

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import "./index.css";

import Login from './screens/login';
import Register from './screens/register';
import Recovery from './screens/recovery';

import Lineup from './screens/auth/lineup';

import Scouts from './screens/auth/crossing/scouts';
import Score from './screens/auth/crossing/score';
import Average from './screens/auth/crossing/average';

import Players from './screens/auth/partials/players';
import Clubs from './screens/auth/partials/clubs';
import Teams from './screens/auth/partials/teams';
import Leagues from './screens/auth/partials/leagues';

import Player from './screens/auth/player';
import Videos from './screens/auth/videos';
import League from './screens/auth/league';
import Emphasis from './screens/auth/emphasis';
import Contact from './screens/auth/contact';
import Plans from './screens/auth/plans';

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
        path: "/auth/parciais/atletas",
        element: <Players />,
    },
    {
        path: "/auth/parciais/clubes",
        element: <Clubs />,
    },
    {
        path: "/auth/parciais/times",
        element: <Teams />,
    },
    {
        path: "/auth/parciais/ligas",
        element: <Leagues />,
    },
    {
        path: "/auth/atletas",
        element: <Player />,
    },
    {
        path: "/auth/videos",
        element: <Videos />,
    },
    {
        path: "/auth/ligas",
        element: <League />,
    },
    {
        path: "/auth/destaques",
        element: <Emphasis />,
    },
    {
        path: "/auth/contato",
        element: <Contact />,
    },
    {
        path: "/auth/planos",
        element: <Plans />,
    },
]);

ReactDOM.createRoot(document.getElementById('app')).render(
    // <React.StrictMode>
        <RouterProvider router={router} />
    // </React.StrictMode>
);
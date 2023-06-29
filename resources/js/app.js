import React from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import "./index.css";

import Login from './screens/login';
import Register from './screens/register';
import Recovery from './screens/recovery';
import HasPlayer from './screens/hasPlayer';

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
import League from './screens/auth/league/pages/adm';
import PageLeague from './screens/auth/league/pages/leagues';
import PageLeagueRound from './screens/auth/league/pages/league';
import PageLeagueMyLeague from './screens/auth/league/pages/my-leagues';
import PageLeagueTeams from './screens/auth/league/pages/teams';
import PageLeagueTransactions from './screens/auth/league/pages/transactions';
import Emphasis from './screens/auth/emphasis';
import Contact from './screens/auth/contact';
import Plans from './screens/auth/plans';

const PrivateRoute = ({ component: Component }) => localStorage.getItem('token') ? <Component /> : <Navigate to="/" />;

ReactDOM.createRoot(document.getElementById('app')).render(
    // <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route index element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/recovery" element={<Recovery />} />
            <Route path="/atletas/:atleta_id/:liga_id/:slug" element={<HasPlayer />} />

            <Route path="/auth/escalacao" element={<PrivateRoute component={Lineup} />} />

            <Route path="/auth/cruzamento-scouts" element={<PrivateRoute component={Scouts} />} />
            <Route path="/auth/cruzamento-pontos" element={<PrivateRoute component={Score} />} />
            <Route path="/auth/cruzamento-media" element={<PrivateRoute component={Average} />} />

            <Route path="/auth/parciais/atletas" element={<PrivateRoute component={Players} />} />
            <Route path="/auth/parciais/clubes" element={<PrivateRoute component={Clubs} />} />
            <Route path="/auth/parciais/times" element={<PrivateRoute component={Teams} />} />
            <Route path="/auth/parciais/ligas" element={<PrivateRoute component={Leagues} />} />

            <Route path="/auth/atletas" element={<PrivateRoute component={Player} />} />

            <Route path="/auth/videos" element={<PrivateRoute component={Videos} />} />
            <Route path="/auth/donos-de-ligas" element={<PrivateRoute component={League} />} />
            <Route path="/auth/:id/:slug" element={<PrivateRoute component={PageLeague} />} />
            <Route path="/auth/:id/:slug/:competicoes_id" element={<PrivateRoute component={PageLeagueRound} />} />
            <Route path="/auth/minhas-ligas" element={<PrivateRoute component={PageLeagueMyLeague} />} />
            <Route path="/auth/meus-times" element={<PrivateRoute component={PageLeagueTeams} />} />
            <Route path="/auth/minhas-inscricoes" element={<PrivateRoute component={PageLeagueTransactions} />} />
            <Route path="/auth/destaques" element={<PrivateRoute component={Emphasis} />} />
            <Route path="/auth/contato" element={<PrivateRoute component={Contact} />} />
            <Route path="/auth/planos" element={<PrivateRoute component={Plans} />} />
        </Routes>
    </BrowserRouter>
    // </React.StrictMode>
);
import React, { useState, useEffect } from 'react';

import { amount, message } from '../../utils/helpers';
import api from '../../utils/api';
import { Message } from '../../utils/styles';

import Loading from '../../componets/loading';


import {
    Container,
    Title,
    Team,
    Shield,
    NameTeam,
    Name,
    Remove
} from './styles';

function teams({ data: { name_team }, fnc, smodal }) {

    let teams = localStorage.getItem('favorite_teams');
    teams = teams ? JSON.parse(teams) : [];

    const [data, sdata] = useState([]);
    const [loading, sloading] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {

        try {

            sloading(true);

            const { data } = await api.get(`estatisticas/times?nome_time=${name_team}`);

            sdata(data);
            sloading(false);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    function remove_favorite(item) {
        // let team = teams.find(e => item.nome === e.nome );
        // console.log(team);

        teams.splice(teams.indexOf(item));

        console.log(teams, teams.indexOf(item));
    }

    return (
        <Container>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        {
                            teams.length ?
                                <>
                                    <Title>Times favoritos</Title>
                                    {
                                        teams.map((e, i) =>
                                            <Team onClick={() => {

                                                smodal(false);
                                                fnc(e.time_id)

                                            }} key={i}>
                                                <Shield src={e.url_escudo_png} />
                                                <NameTeam>{e.nome}</NameTeam>
                                                <Name>{e.nome_cartola}</Name>
                                                <Remove onClick={() => remove_favorite(e)}>x</Remove>
                                            </Team>
                                        )
                                    }
                                </>
                                :
                                <></>
                        }
                        {
                            data.length
                                ?
                                <>
                                    <Title>Times pesquisados</Title>
                                    {
                                        data.map((e, i) =>
                                            <Team onClick={() => {

                                                const team = teams.find(i => i.nome === e.nome);

                                                console.log(team);

                                                if (!team) {

                                                    teams.push({
                                                        time_id: e.time_id,
                                                        url_escudo_png: e.url_escudo_png,
                                                        nome: e.nome,
                                                        nome_cartola: e.nome_cartola
                                                    });

                                                    localStorage.setItem('favorite_teams', JSON.stringify(teams));

                                                }

                                                smodal(false);
                                                fnc(e.time_id)

                                            }} key={i}>
                                                <Shield src={e.url_escudo_png} />
                                                <NameTeam>{e.nome}</NameTeam>
                                                <Name>{e.nome_cartola}</Name>
                                            </Team>
                                        )
                                    }
                                </>
                                :
                                <Message>Nenhum time encontrado.</Message>
                        }
                    </>
            }
        </Container>
    );
}

export default teams;
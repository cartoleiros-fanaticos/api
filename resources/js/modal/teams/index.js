import React, { useState, useEffect } from 'react';

import { amount, message } from '../../utils/helpers';
import api from '../../utils/api';

import { Message } from '../../utils/styles';

import Loading from '../../componets/loading';

import {
    Container,
    Label,
    Icon,
    Input,
    Team,
    Title,
    Shield,
    NameTeam,
    NamePlayer
} from './styles';

function teams({ fnc, smodal }) {

    const [data, sdata] = useState([]);
    const [loading, sloading] = useState(false);

    const [teams, steams] = useState([]);

    useEffect(() => {
        const favorite_teams = localStorage.getItem('favorite_teams') ? JSON.parse(localStorage.getItem('favorite_teams')) : [];
        steams(favorite_teams);
    }, [])

    async function getData(value) {

        try {

            sloading(true);

            const { data } = await api.get(`parciais/times?nome_time=${value}`);

            sdata(data);
            sloading(false);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    function enter(e) {
        {

            const team = teams.find(i => i.nome === e.nome);

            if (!team) {

                if (teams.length === 3) teams.shift();

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

        }
    }

    return (
        <>
            <Label>
                <Icon>security</Icon>
                <Input
                    onKeyUp={(e) => {
                        if (e.target.value && e.key === 'Enter') getData(e.target.value);
                    }}
                />
            </Label>
            <Container>
                {
                    loading ?
                        <Loading />
                        :
                        <>
                            {
                                teams.length
                                    ?
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
                                                    <NamePlayer>{e.nome_cartola}</NamePlayer>
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
                                                <Team onClick={() => enter(e)} key={i}>
                                                    <Shield src={e.url_escudo_png} />
                                                    <NameTeam>{e.nome}</NameTeam>
                                                    <NamePlayer>{e.nome_cartola}</NamePlayer>
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
        </>
    );
}

export default teams;
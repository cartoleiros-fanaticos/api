import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';
import Player from '../player';
import Rounds from '../clubs';
import Statistics from '../statistics';

import Modal from '../../../../componets/modal';
import ModalTeams from '../../../../modal/teams';

import {
    Content,
    Box,
    Title,
    Label,
    Select,
    Option,
    Input,
    Button,
    Teams,
    Team,
    Description,
    Shield,
    NameTeam,
    Name,
    Remove
} from './styles';

function partials() {

    const [teams, steams] = useState(localStorage.getItem('favorite_teams') ? JSON.parse(localStorage.getItem('favorite_teams')) : []);

    const [filter, sfilter] = useState(
        {
            page: 'players',
            data: null
        }
    );

    const [data, sdata] = useState({});
    const [modal, smodal] = useState(false);
    const [loading_page, sloadingpage] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    function remove_favorite(item) {

        teams.splice(teams.indexOf(item), 1)
        localStorage.setItem('favorite_teams', JSON.stringify(teams));

    }

    async function getData() {

        try {

            sloadingpage(true);

            const { data } = await api.get(`parciais/atletas`);

            sdata(data);
            sloadingpage(false);

        } catch (e) {
            message(e);
            sloadingpage(false);
        };

    }

    const component = () => (
        <>
            <Content>
                <Box>
                    <Title>Pontos por clubes</Title>
                    <Label>
                        <Select onChange={(e) => {
                            sfilter({ page: 'rounds', data: e.target.value })
                        }} value={filter.data}>
                            <Option>Selecione a rodada</Option>
                            {data.rodadas.map(e => e <= data.game.rodada_atual && <Option key={e}>{e}ª Rodada</Option>)}
                        </Select>
                        <Button>OK</Button>
                    </Label>
                </Box>
                <Box>
                    <Title>Estatística do time</Title>
                    <Label>
                        <Input
                            placeholder="Nome do time"
                            type="search"
                            onKeyUp={(e) => {

                                if (e.target.value && e.key === 'Enter') {
                                    smodal(true);
                                    sfilter({ ...filter, data: e.target.value })
                                }

                            }}
                            // onChange={(e) => snameteam(e.target.value)}
                            onBlur={() => {

                                document.querySelector('.teams').style.cssText = `
                                    height: 0;
                                    visibility: hidden;
                                `;

                            }}
                            onFocus={() => {

                                console.log(teams);

                                if (teams.length) {

                                    document.querySelector('.teams').style.cssText = `
                                        visibility: visible;
                                        height: 250px;
                                    `;

                                }

                            }}
                            value={name_team}
                        />
                        <Button onClick={() => {

                            smodal(true)
                            sfilter({ ...filter, data: e.target.value })

                        }}>OK</Button>
                        {
                            <Teams className='teams' >
                                {
                                    teams.map((e, i) =>
                                        <Team key={i}>
                                            <Description onClick={() => {
                                                sfilter({ page: 'statistics', data: teams_id });
                                            }}>
                                                <Shield src={e.url_escudo_png} />
                                                <NameTeam>{e.nome}</NameTeam>
                                                <Name>{e.nome_cartola}</Name>
                                            </Description>
                                            <Remove onClick={() => remove_favorite(e)}>x</Remove>
                                        </Team>
                                    )
                                }
                            </Teams>
                        }
                    </Label>
                </Box>
                <Box>
                    <Title>Ligas</Title>
                    <Label>
                        <Input placeholder="Nome da liga" />
                        <Button onClick={() => { }}>OK</Button>
                    </Label>
                </Box>
            </Content>
            {filter.page === 'players' && <Player data={data} />}
            {filter.page === 'rounds' && <Rounds data={{ rodada: filter.data }} />}
            {filter.page === 'statistics' && <Statistics data={{ teams_id: filter.data }} />}
        </>
    );

    return (
        <>
            <Container
                title='PARCIAIS AO VIVO'
                Component={component}
                loading={loading_page}
            />
            {
                modal &&
                <Modal
                    icon="list"
                    title="Lista times do cartola"
                    modal={modal}
                    smodal={smodal}
                    data={{ name_team: filter.data }}
                    Component={ModalTeams}
                    fnc={(teams_id) => {
                        sfilter({ page: 'statistics', data: teams_id });
                    }}
                    height='400px'
                />
            }
        </>
    );
}

export default partials;
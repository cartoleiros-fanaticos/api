import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';
import Player from '../player';
import Rounds from '../rounds';
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
} from './styles';

function partials() {

    const [tab, stab] = useState('statistics');
    const [data, sdata] = useState({});

    const [round, sround] = useState('');
    const [teams_id, steamid] = useState(13989630);
    const [name_team, snameteam] = useState('');

    const [modal, smodal] = useState(false);

    const [loading_page, sloadingpage] = useState(true);

    useEffect(() => {
        getData();
    }, [])

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
                            sround(e.target.value)
                            stab('rounds')
                        }} value={round}>
                            <Option>Selecione a rodada</Option>
                            {data.rodadas.map(e => e <= data.game.rodada_atual && <Option key={e}>{e}ª Rodada</Option>)}
                        </Select>
                        <Button>OK</Button>
                    </Label>
                </Box>
                <Box>
                    <Title>Estatística do time</Title>
                    <Label>
                        <Input placeholder="Nome do time" type="search" onKeyUp={(e) => {

                            if (e.target.value && e.key === 'Enter') {
                                smodal(true);
                                snameteam(e.target.value);
                            }

                        }} onChange={(e) => snameteam(e.target.value)} value={name_team} />
                        <Button onClick={() => {
                            smodal(true)
                        }}>OK</Button>
                        <Teams>

                        </Teams>
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
            {tab === 'players' && <Player data={data} />}
            {tab === 'rounds' && <Rounds data={data} />}
            {tab === 'statistics' && <Statistics data={{ teams_id }} />}
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
                    data={{ name_team }}
                    Component={ModalTeams}
                    fnc={(teams_id) => {
                        stab('statistics');
                        steamid(teams_id);
                    }}
                    height='400px'
                />
            }
        </>
    );
}

export default partials;
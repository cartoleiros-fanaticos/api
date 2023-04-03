import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';
import Player from '../player';
import Rounds from '../rounds';

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

    const [tab, stab] = useState('players');
    const [data, sdata] = useState({});
    const [round, sround] = useState('');

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
                        <Input placeholder="Nome do time" />
                        <Button onClick={() => { }}>OK</Button>
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
            {tab === 'rounds' && <Rounds round={round} />}
        </>
    );

    return (
        <Container
            title='PARCIAIS AO VIVO'
            Component={component}
            loading={loading_page}
        />
    );
}

export default partials;
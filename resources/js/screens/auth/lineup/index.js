import React, { useState, useEffect, useRef } from 'react';

import { amount, message, swal_warning } from '../../../utils/helpers';
import api from '../../../utils/api';

import Container from '../../../componets/container';
import Loading from '../../../componets/loading';
import Rounds from '../../../componets/rounds';
import Player from '../../../componets/player';
import Live from '../../../componets/live';

import {
    Content,
    Teams,
    Team,
    Shield,
    Bold,
    Text,
    Players,
    Score,
    ScoreText,
    ScoreValue,
    Title,
} from './styles';

import { Message } from '../../../utils/styles';

function lineup() {

    const player = useRef();

    const [uri, suri] = useState('');

    const [data, sdata] = useState({});

    const [loading, sloading] = useState(false);
    const [loading_page, sloadingpage] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    async function getPlayers(rodada, time_id) {

        if (!time_id) {
            swal_warning('Selecione um time antes de executar essa ação.');
            return false
        }

        sdata({
            ...data,
            time: null,
            parciais: null,
            pontuacao: null
        });

        try {

            sloading(true);

            const response = await api.get(`escalacao/${time_id}?rodada=${rodada}`);

            sdata({
                ...data,
                ...response.data
            });

            sloading(false);

            if (window.innerWidth <= 900)
                window.scrollTo({ top: player.current.offsetTop - 56, behavior: 'smooth' });

            suri(`escalacao/${time_id}?rodada=${rodada}`);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    async function getData() {

        try {

            sloadingpage(true);

            const { data } = await api.get(`escalacao`);

            sdata(data);
            sloadingpage(false);

        } catch (e) {
            message(e);
            sloadingpage(false);
        };

    }

    const component = (
        <Content>
            <Rounds
                fnc={getPlayers}
                time_id={data.time?.time_id}
                rodada_atual={data.game?.rodada_atual}
            />
            <Teams>
                {
                    data.times?.map((e, i) =>
                        <Team className={data.time?.time_id === e.time_id ? 'active' : ''} onClick={() => getPlayers(data.game.rodada_atual, e.time_id)} key={i}>
                            <Shield src={e.url_escudo_png} />
                            <Text><Bold>Nome:</Bold> {e.nome}</Text>
                            <Text><Bold>Patrimônio:</Bold> {e.patrimonio} pts</Text>
                            <Text><Bold>Campeonato:</Bold> {amount(e.pontos_campeonato)}</Text>
                            <Text><Bold>Sócio:</Bold> {e.socio}</Text>
                        </Team>
                    )
                }
            </Teams>
            <Players ref={player}>
                {
                    loading ?
                        <Loading />
                        :
                        <>
                            {
                                data.time ?
                                    <>
                                        {data.game.status_mercado != 1 &&
                                            <Live
                                                uri={uri}
                                                fnc={(response) => {
                                                    sdata({ ...data, ...response });
                                                }}
                                            />
                                        }
                                        <Score>
                                            <ScoreText>Pontuação:</ScoreText>
                                            <ScoreValue value={data.pontuacao}>{amount(data.pontuacao)} pts</ScoreValue>
                                        </Score>
                                        {
                                            data.time.rodadas.atletas.map((e, i) =>
                                                <Player
                                                    key={i}
                                                    data={e}
                                                    scouts={data.scouts}
                                                    capitao_id={data.time.rodadas.capitao_id}
                                                    parciais={data.parciais}
                                                />
                                            )
                                        }
                                    </>
                                    :
                                    <Message>Selecione um time</Message>
                            }
                            {
                                (data.time && data.time.rodadas.reservas.length) ?
                                    <>
                                        <Title>RESERVAS</Title>
                                        {
                                            data.time.rodadas.reservas.map((e, i) =>
                                                <Player
                                                    key={i}
                                                    data={e}
                                                    scouts={data.scouts}
                                                    capitao_id={data.time.rodadas.capitao_id}
                                                    parciais={data.parciais}
                                                />
                                            )
                                        }
                                    </>
                                    :
                                    <></>
                            }
                        </>
                }
            </Players>
        </Content >
    );

    return (
        <Container
            title='DICAS'
            component={component}
            loading={loading_page}
        />
    );
}

export default lineup;
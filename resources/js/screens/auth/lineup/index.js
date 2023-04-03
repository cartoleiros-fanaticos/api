import React, { useState, useEffect, useRef } from 'react';

import { amount, message, swal_warning } from '../../../utils/helpers';
import api from '../../../utils/api';

import Container from '../../../componets/container';
import Loading from '../../../componets/loading';

import {
    Content,
    ContainerRounds,
    Rounds,
    Round,
    Teams,
    Team,
    Shield,
    Bold,
    Text,
    Players,
    Player,
    Captain,
    Photo,
    ContainerNamePosition,
    Name,
    Position,
    Price,
    Title,
} from './styles';

import { Message } from '../../../utils/styles';

function lineup() {

    const player = useRef();

    const [data, sdata] = useState({});

    const [loading, sloading] = useState(false);
    const [loading_page, sloadingpage] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    async function getRound(element, rodada) {

        if (rodada > data.rodada_atual) {

            swal_warning('Ainda não existe dados para essa rodada.');

        } else {

            let rdd = element.parentElement.querySelector('.current');
            let rodada_atual = rdd.innerText;

            rdd.classList.remove('current');

            let box_view = 11;
            let box = 5;
            let box_min = 5;
            let box_max = 34;
            let width_box = 100.398;

            if (window.innerWidth <= 900) {
                box_view = 7;
                box = 3;
                box_min = 2;
                box_max = 36;
                width_box = (window.innerWidth - 20) / 7;
            }

            if (rodada > box_min && rodada < box_max) {

                let calc = (rodada - box) * width_box - width_box;

                element.parentElement.style.cssText = `
                margin-left: -${calc}px;
            `;

            } else if (rodada_atual > box && rodada <= box) {

                element.parentElement.style.cssText = `
                margin-left: 0px;
            `;

            } else if (rodada >= box_max) {

                element.parentElement.style.cssText = `
                margin-left: -${(38 - box_view) * width_box}px;
            `;

            }

            element.classList.add('current');

            getPlayers(rodada, data.time.time_id);

        }

    }

    async function getPlayers(rodada, time_id) {

        try {

            sloading(true);

            const response = await api.get(`escalacao/${time_id}?rodada=${rodada}`);

            sdata({
                ...data,
                time: response.data,
            });

            sloading(false);

            if (window.innerWidth <= 900)
                window.scrollTo({ top: player.current.offsetTop - 56, behavior: 'smooth' });

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

    const component = () => (
        <Content>
            <ContainerRounds>
                <Rounds>
                    {
                        data.rodadas.map(e =>
                            <Round
                                width={window.innerWidth}
                                onClick={(event) => getRound(event.target, e)}
                                className={e === data.rodada_atual ? 'current' : ''}
                                key={e}
                            >
                                {e}
                            </Round>
                        )
                    }
                </Rounds>
            </ContainerRounds>
            <Teams>
                {
                    data.times.map((e, i) =>
                        <Team onClick={() => getPlayers(data.rodada_atual, e.time_id)} key={i}>
                            <Shield src={e.url_escudo_png} />
                            <Text><Bold>Nome:</Bold> {e.nome}</Text>
                            <Text><Bold>Patrimônio:</Bold> {e.patrimonio} pts</Text>
                            <Text><Bold>Campeonato:</Bold> {e.pontos_campeonato}</Text>
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
                                    data.time.rodadas.atletas.map((e, i) =>
                                        <Player key={i}>
                                            <Captain captain={data.time.rodadas.capitao_id === e.atleta_id}>C</Captain>
                                            <Photo src={e.foto} />
                                            <ContainerNamePosition>
                                                <Name>{`${e.apelido} ( ${e.abreviacao_clube} )`}</Name>
                                                <Position>{e.posicao}</Position>
                                            </ContainerNamePosition>
                                            <Price>C$ {amount(e.preco_num)}</Price>
                                        </Player>
                                    )
                                    :
                                    <Message>Selecione um time</Message>
                            }
                            {
                                (data.time && data.time.rodadas.reservas) &&
                                <>
                                    <Title>RESERVAS</Title>
                                    {
                                        data.time.rodadas.reservas.map((e, i) =>
                                            <Player key={i}>
                                                <Captain captain={data.time.rodadas.capitao_id === e.atleta_id}>C</Captain>
                                                <Photo src={e.foto} />
                                                <ContainerNamePosition>
                                                    <Name>{`${e.apelido} ( ${e.abreviacao_clube} )`}</Name>
                                                    <Position>{e.posicao}</Position>
                                                </ContainerNamePosition>
                                                <Price>C$ {amount(e.preco_num)}</Price>
                                            </Player>
                                        )
                                    }
                                </>
                            }
                        </>
                }
            </Players>
        </Content >
    );

    return (
        <Container
            title='DICAS'
            Component={component}
            loading={loading_page}
        />
    );
}

export default lineup;
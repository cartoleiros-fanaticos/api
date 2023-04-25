import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';
import Loading from '../../../../componets/loading';
import Rounds from '../../../../componets/rounds';
import Search from '../../../../componets/search';
import Player from '../../../../componets/player';
import Live from '../../../../componets/live';

import Modal from '../../../../componets/modal';
import ModalTeams from '../../../../modal/teams';

import { useLocation } from "react-router-dom";

import {
    Content,
    Players,
    Score,
    ScoreText,
    ScoreValue,
    PlayerTitle,

    Box,
    Fieldset,
    Legend,
    Item,
    Title,
    Photo,
    Value,
    Text,
    Table,
    Thead,
    Th,
    Tbody,
    Tr,
    Td,
    PhotoName,
    Name,
    Multiply,
} from './styles';

import { Message } from '../../../../utils/styles';

function teams() {

    const location = useLocation();

    const [uri, suri] = useState('');
    const [control, scontrol] = useState('start');

    const [data, sdata] = useState({});
    const [modal, smodal] = useState(false);

    const [loading, sloading] = useState(false);

    useEffect(() => {
        if (location.state?.time_id) getData(location.state.time_id);
    }, [])

    async function getData(teams_id) {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        try {

            sloading(true);

            const { data } = await api.get(`parciais/time/${teams_id}`);

            sdata(data);
            sloading(false);

            if (data.game.status_mercado != 1)
                suri(`parciais/time/rodada/${teams_id}?rodada=${data.game.rodada_atual}`);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    async function team({ rodada, time_id }) {

        scontrol('clean');

        try {

            const response = await api.get(`parciais/time/rodada/${time_id}?rodada=${rodada}`);

            sdata({
                ...data,
                ...response.data
            });

            scontrol('start');

            suri(`parciais/time/rodada/${time_id}?rodada=${rodada}`);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }



    const component = (
        <>
            <Search
                placeholder="Digite nome do time"
                icon="security"
                onFocus={() => smodal(true)}
            />
            {
                loading ?
                    <Loading />
                    :
                    <>
                        {
                            data.game?.rodada_atual ?
                                <Content>
                                    <Box>
                                        <Rounds
                                            fnc={team}
                                            time_id={data.time_id}
                                            data={{ time_id: data.time_id, rodada_atual: data.game.game_over ? 38 : (data.game.status_mercado != 1 ? data.game.rodada_atual : (data.game.rodada_atual - 1)) }}
                                        />
                                        <Fieldset>
                                            <Legend>Escalação</Legend>
                                            <Players>
                                                {data.game.status_mercado === 2 &&
                                                    <Live
                                                        control={control}
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
                                                {
                                                    (data.time && data.time.rodadas.reservas) &&
                                                    <>
                                                        <PlayerTitle>RESERVAS</PlayerTitle>
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
                                                }
                                            </Players>
                                        </Fieldset>
                                    </Box>
                                    <Box>
                                        <Fieldset>
                                            <Legend>Geral</Legend>
                                            <Item>
                                                <Title>Total</Title>
                                                <Value>{amount(data.geral.pontos_campeonato)}</Value>
                                                <Text>Pontos</Text>
                                            </Item>
                                            <Item>
                                                <Title>Média</Title>
                                                <Value>{amount(data.geral.media)}</Value>
                                                <Text>Por rodada</Text>
                                            </Item>
                                            <Item>
                                                <Title>Patrimônio</Title>
                                                <Value>{amount(data.geral.patrimonio)}</Value>
                                                <Text>Cartoletas</Text>
                                            </Item>
                                        </Fieldset>

                                        <Fieldset>
                                            <Legend>Mais Escalados</Legend>
                                            {
                                                data.escalados.atletas.map((e, i) =>
                                                    <Item key={i}>
                                                        <Photo src={e.foto} />
                                                        <Value>{e.apelido}</Value>
                                                        <Text>Escalações: {e.escalacao}</Text>
                                                    </Item>
                                                )
                                            }
                                        </Fieldset>

                                        <Fieldset>
                                            <Legend>Maior e menor preço</Legend>
                                            <Item>
                                                <Title>Maior preço</Title>
                                                <Photo src={data.maior_e_menor_preco.maior_preco.foto} />
                                                <Value>{data.maior_e_menor_preco.maior_preco.apelido} | {data.maior_e_menor_preco.maior_preco.abreviacao.toUpperCase()}</Value>
                                                <Value>C$ {amount(data.maior_e_menor_preco.maior_preco.preco_num)}</Value>
                                                <Text>Rodada {data.maior_e_menor_preco.maior_preco.rodada_time_id}</Text>
                                            </Item>
                                            <Item>
                                                <Title>Menor preço</Title>
                                                <Photo src={data.maior_e_menor_preco.menor_preco.foto} />
                                                <Value>{data.maior_e_menor_preco.menor_preco.apelido} | {data.maior_e_menor_preco.menor_preco.abreviacao.toUpperCase()}</Value>
                                                <Value>C$ {amount(data.maior_e_menor_preco.menor_preco.preco_num)}</Value>
                                                <Text>Rodada {data.maior_e_menor_preco.menor_preco.rodada_time_id}</Text>
                                            </Item>
                                        </Fieldset>

                                        <Fieldset>
                                            <Legend>Pontos por posição</Legend>
                                            {
                                                data.posicao.map((e, i) =>
                                                    <Item key={i}>
                                                        <Title>{e.nome}</Title>
                                                        <Value>{amount(e.pontos)}</Value>
                                                        <Text>Média {amount(e.media)}</Text>
                                                    </Item>)
                                            }
                                        </Fieldset>
                                        <Fieldset>
                                            <Legend>Variação por rodada</Legend>
                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Rodada</Th>
                                                        <Th>Pontos</Th>
                                                        <Th>Variação</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {data.variacao.map((e, i) =>
                                                        <Tr key={i}>
                                                            <Td>{e.rodada}</Td>
                                                            <Td>{amount(e.pontos_num)}</Td>
                                                            <Td color={e.variacao_num > 0 ? 'green' : 'red'}>C$ {amount(e.variacao_num)}</Td>
                                                        </Tr>

                                                    )}
                                                </Tbody>
                                            </Table>
                                        </Fieldset>

                                    </Box>
                                    <Box>
                                        <Fieldset>
                                            <Legend>Destaque</Legend>
                                            <Item>
                                                <Title>Maior pontuação</Title>
                                                <Value>{amount(data.destaques.maior_pontuacao)}</Value>
                                                <Text>Rodada {data.destaques.rodada_maior_pontuacao}</Text>
                                            </Item>
                                            <Item>
                                                <Title>Menor pontuação</Title>
                                                <Value>{amount(data.destaques.menor_pontuacao)}</Value>
                                                <Text>Rodada {data.destaques.rodada_menor_pontuacao}</Text>
                                            </Item>
                                        </Fieldset>

                                        <Fieldset>
                                            <Legend>Mais Escalados</Legend>{
                                                data.escalados.clubes.map((e, i) =>
                                                    <Item key={i}>
                                                        <Photo src={e.escudo} />
                                                        <Value>{e.nome}</Value>
                                                        <Text>Escalações: {e.escalacao}</Text>
                                                    </Item>
                                                )
                                            }
                                        </Fieldset>

                                        <Fieldset>
                                            <Legend>Maior e menor pontuador</Legend>
                                            <Item>
                                                <Title>Maior pontuador</Title>
                                                <Photo src={data.maior_e_menor_pontuador.maior_pontuador.foto} />
                                                <Value>{data.maior_e_menor_pontuador.maior_pontuador.apelido} | {data.maior_e_menor_pontuador.maior_pontuador.abreviacao.toUpperCase()}</Value>
                                                <Value>{amount(data.maior_e_menor_pontuador.maior_pontuador.pontos_num)} pts</Value>
                                                <Text>Rodada {data.maior_e_menor_pontuador.maior_pontuador.rodada_time_id}</Text>
                                            </Item>
                                            <Item>
                                                <Title>Menor pontuador</Title>
                                                <Photo src={data.maior_e_menor_pontuador.menor_pontuador.foto} />
                                                <Value>{data.maior_e_menor_pontuador.menor_pontuador.apelido} | {data.maior_e_menor_pontuador.menor_pontuador.abreviacao.toUpperCase()}</Value>
                                                <Value>{amount(data.maior_e_menor_pontuador.menor_pontuador.pontos_num)} pts</Value>
                                                <Text>Rodada {data.maior_e_menor_pontuador.menor_pontuador.rodada_time_id}</Text>
                                            </Item>
                                        </Fieldset>

                                        <Fieldset>
                                            <Legend>Capitão</Legend>
                                            <Item>
                                                <Title>Maior pontuador</Title>
                                                <Photo src={data.capitao.maior_pontuador.foto} />
                                                <Value>{data.capitao.maior_pontuador.apelido} | {data.capitao.maior_pontuador.abreviacao.toUpperCase()}</Value>
                                                <Value>{amount(data.capitao.maior_pontuador.pontos_num)} pts</Value>
                                                <Text>Rodada {data.capitao.maior_pontuador.rodada_time_id}</Text>
                                            </Item>
                                            <Item>
                                                <Text>Pontos: {amount(data.capitao.capitao_geral.pontos)}</Text>
                                                <Text>Média: {amount(data.capitao.capitao_geral.media)}</Text>
                                            </Item>
                                            <Item>
                                                <Title>Menor pontuador</Title>
                                                <Photo src={data.capitao.menor_pontuador.foto} />
                                                <Value>{data.capitao.menor_pontuador.apelido} | {data.capitao.menor_pontuador.abreviacao.toUpperCase()}</Value>
                                                <Value>{amount(data.capitao.menor_pontuador.pontos_num)} pts</Value>
                                                <Text>Rodada {data.capitao.menor_pontuador.rodada_time_id}</Text>
                                            </Item>
                                        </Fieldset>
                                        <Fieldset>
                                            <Legend>Variação por rodada</Legend>
                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Rodada</Th>
                                                        <Th>jogador</Th>
                                                        <Th>Pontos</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {data.capitao.lista.map((e, i) =>
                                                        <Tr key={i}>
                                                            <Td>{e.rodada_time_id}</Td>
                                                            <Td>
                                                                <PhotoName>
                                                                    <Photo src={e.foto} />
                                                                    <Name>{e.apelido}</Name>
                                                                </PhotoName>
                                                            </Td>
                                                            <Td>{amount(e.pontos_num)} <Multiply>1.5x</Multiply> {amount(1.5 * e.pontos_num)}</Td>
                                                        </Tr>
                                                    )}
                                                </Tbody>
                                            </Table>
                                        </Fieldset>
                                    </Box>
                                </Content>
                                :
                                <Message>Pesquise por um time</Message>
                        }
                    </>
            }
        </>
    );

    return (
        <>
            <Container
                title='Parciais times'
                component={component}
            />
            {
                modal &&
                <Modal
                    icon="list"
                    title="Lista times do cartola"
                    modal={modal}
                    smodal={smodal}
                    Component={ModalTeams}
                    fnc={getData}
                    height='500px'
                />
            }
        </>
    );
}

export default teams;
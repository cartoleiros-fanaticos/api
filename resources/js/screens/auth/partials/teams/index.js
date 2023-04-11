import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';
import Loading from '../../../../componets/loading';
import Rounds from '../../../../componets/rounds';

import Modal from '../../../../componets/modal';
import ModalTeams from '../../../../modal/teams';

import { useLocation } from "react-router-dom";

import {
    Content,
    Label,
    Icon,
    Input,

    Players,
    Player,
    Captain,
    PlayerPhoto,
    ContainerNamePosition,
    PlayerName,
    Position,
    Price,
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

    const team = {
        "id": 1,
        "temporada": "2023",
        "nome": "DOCKER PS",
        "slug": "docker-ps",
        "patrimonio": 100,
        "pontos_campeonato": 0,
        "time_id": 13989630,
        "url_escudo_png": "https://s2.glbimg.com/dUmWnUcEqjDdOTmyChpxroY68LU=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_100/escudo/62/37/05/00968a0471-dc33-4c18-b5f5-2e5ecc4a716220180323053705",
        "assinante": 0,
        "created_at": "2023-04-07T12:13:41.000000Z",
        "updated_at": "2023-04-07T12:13:41.000000Z",
        "rodadas": {
            "id": 1,
            "rodada_time_id": 1,
            "capitao_id": 78580,
            "esquema": "4-3-3",
            "valor_time": 51,
            "pontuacao": 0,
            "escalacao_times_id": 1,
            "created_at": "2023-04-07T12:18:03.000000Z",
            "updated_at": "2023-04-07T12:18:03.000000Z",
            "atletas": [
                {
                    "escalacao_rodadas_id": 1,
                    "clube_id": 275,
                    "posicao": "Goleiro",
                    "abreviacao_clube": "PAL",
                    "atleta_id": 71631,
                    "apelido": "Weverton",
                    "posicao_id": 1,
                    "preco_num": 19,
                    "titular": "Sim",
                    "foto": "https://s.sde.globo.com/media/person_role/2023/03/15/photo_220x220_PN9nfV7.png"
                },
                {
                    "escalacao_rodadas_id": 1,
                    "clube_id": 1371,
                    "posicao": "Lateral",
                    "abreviacao_clube": "CUI",
                    "atleta_id": 111879,
                    "apelido": "Mateusinho",
                    "posicao_id": 2,
                    "preco_num": 2,
                    "titular": "Sim",
                    "foto": "https://s.sde.globo.com/media/person_role/2023/03/06/photo_220x220_mK5PRfk.png"
                },
                {
                    "escalacao_rodadas_id": 1,
                    "clube_id": 283,
                    "posicao": "Lateral",
                    "abreviacao_clube": "CRU",
                    "atleta_id": 91706,
                    "apelido": "Marlon",
                    "posicao_id": 2,
                    "preco_num": 4,
                    "titular": "Sim",
                    "foto": "https://s.sde.globo.com/media/person_role/2023/03/13/photo_220x220_vrVAWB7.png"
                },
                {
                    "escalacao_rodadas_id": 1,
                    "clube_id": 294,
                    "posicao": "Zagueiro",
                    "abreviacao_clube": "CFC",
                    "atleta_id": 92291,
                    "apelido": "Bruno Viana",
                    "posicao_id": 3,
                    "preco_num": 3,
                    "titular": "Sim",
                    "foto": "https://s.sde.globo.com/media/person_role/2023/02/28/photo_220x220_kVhXG72.png"
                },
                {
                    "escalacao_rodadas_id": 1,
                    "clube_id": 1371,
                    "posicao": "Zagueiro",
                    "abreviacao_clube": "CUI",
                    "atleta_id": 110742,
                    "apelido": "João Maranini",
                    "posicao_id": 3,
                    "preco_num": 3,
                    "titular": "Sim",
                    "foto": "https://s.sde.globo.com/media/person_role/2023/03/06/photo_220x220_2ubCgRc.png"
                },
                {
                    "escalacao_rodadas_id": 1,
                    "clube_id": 277,
                    "posicao": "Meia",
                    "abreviacao_clube": "SAN",
                    "atleta_id": 105899,
                    "apelido": "Ivonei",
                    "posicao_id": 4,
                    "preco_num": 2,
                    "titular": "Sim",
                    "foto": "https://s.sde.globo.com/media/person_role/2022/03/03/caea9218ffe2f27f406b20009a39c25e_220x220.png"
                },
                {
                    "escalacao_rodadas_id": 1,
                    "clube_id": 290,
                    "posicao": "Meia",
                    "abreviacao_clube": "GOI",
                    "atleta_id": 102911,
                    "apelido": "Zé Ricardo",
                    "posicao_id": 4,
                    "preco_num": 2,
                    "titular": "Sim",
                    "foto": "https://s.sde.globo.com/media/person_role/2023/03/11/photo_220x220_h43zEak.png"
                },
                {
                    "escalacao_rodadas_id": 1,
                    "clube_id": 1371,
                    "posicao": "Meia",
                    "abreviacao_clube": "CUI",
                    "atleta_id": 79268,
                    "apelido": "Filipe Augusto",
                    "posicao_id": 4,
                    "preco_num": 2,
                    "titular": "Sim",
                    "foto": "https://s.sde.globo.com/media/person_role/2023/03/06/photo_220x220_S95pz8G.png"
                },
                {
                    "escalacao_rodadas_id": 1,
                    "clube_id": 280,
                    "posicao": "Atacante",
                    "abreviacao_clube": "BGT",
                    "atleta_id": 116994,
                    "apelido": "Popó",
                    "posicao_id": 5,
                    "preco_num": 3,
                    "titular": "Sim",
                    "foto": "https://s.sde.globo.com/media/person_role/2023/03/01/photo_220x220_DFCaYPL.png"
                },
                {
                    "escalacao_rodadas_id": 1,
                    "clube_id": 1371,
                    "posicao": "Atacante",
                    "abreviacao_clube": "CUI",
                    "atleta_id": 78580,
                    "apelido": "Jonathan Cafu",
                    "posicao_id": 5,
                    "preco_num": 4,
                    "titular": "Sim",
                    "foto": "https://s.sde.globo.com/media/person_role/2023/03/06/photo_220x220_7bHRcHm.png"
                },
                {
                    "escalacao_rodadas_id": 1,
                    "clube_id": 294,
                    "posicao": "Atacante",
                    "abreviacao_clube": "CFC",
                    "atleta_id": 86799,
                    "apelido": "Rodrigo Pinho",
                    "posicao_id": 5,
                    "preco_num": 4,
                    "titular": "Sim",
                    "foto": "https://s.sde.globo.com/media/person_role/2023/02/28/photo_220x220_28kb8HP.png"
                },
                {
                    "escalacao_rodadas_id": 1,
                    "clube_id": 1371,
                    "posicao": "Técnico",
                    "abreviacao_clube": "CUI",
                    "atleta_id": 121593,
                    "apelido": "Ivo Vieira",
                    "posicao_id": 6,
                    "preco_num": 3,
                    "titular": "Sim",
                    "foto": "https://s.sde.globo.com/media/person_role/2023/03/06/photo_220x220_KID8EWh.png"
                }
            ],
            "reservas": [
                {
                    "escalacao_rodadas_id": 1,
                    "clube_id": 264,
                    "posicao": "Goleiro",
                    "abreviacao_clube": "COR",
                    "atleta_id": 42234,
                    "apelido": "Cássio",
                    "posicao_id": 1,
                    "preco_num": 18,
                    "titular": "Não",
                    "foto": "https://s.sde.globo.com/media/person_role/2023/03/02/photo_220x220_uEoWXC8.png"
                }
            ]
        }
    }

    const [data, sdata] = useState({});
    const [modal, smodal] = useState(false);

    const [loading, sloading] = useState(false);

    useEffect(() => {
        if (location.state.time_id) getData(location.state.time_id);
    }, [])

    async function getData(teams_id) {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        try {

            sloading(true);

            const { data } = await api.get(`parciais/time/${teams_id}`);

            sdata(data);
            sloading(false);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    const component = () => (
        <>
            <Label>
                <Icon>security</Icon>
                <Input
                    onFocus={() => smodal(true)}
                />
            </Label>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        {
                            data?.rodada_atual ?
                                <Content>
                                    <Box>
                                        <Rounds
                                            fnc={() => console.log('Funcionando')}
                                            time_id={data.time_id}
                                            rodada_atual={data.rodada_atual}
                                        />
                                        <Fieldset>
                                            <Legend>Escalação</Legend>
                                            <Players>
                                                {
                                                    team.rodadas.atletas.map((e, i) =>
                                                        <Player key={i}>
                                                            <Captain captain={team.rodadas.capitao_id === e.atleta_id}>C</Captain>
                                                            <PlayerPhoto src={e.foto} />
                                                            <ContainerNamePosition>
                                                                <PlayerName>{`${e.apelido} ( ${e.abreviacao_clube} )`}</PlayerName>
                                                                <Position>{e.posicao}</Position>
                                                            </ContainerNamePosition>
                                                            <Price>C$ {amount(e.preco_num)}</Price>
                                                        </Player>
                                                    )
                                                }
                                                {
                                                    (team && team.rodadas.reservas) &&
                                                    <>
                                                        <PlayerTitle>RESERVAS</PlayerTitle>
                                                        {
                                                            team.rodadas.reservas.map((e, i) =>
                                                                <Player key={i}>
                                                                    <Captain captain={team.rodadas.capitao_id === e.atleta_id}>C</Captain>
                                                                    <PlayerPhoto src={e.foto} />
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
                                            </Players>
                                        </Fieldset>
                                    </Box>
                                    <Box>
                                        <Fieldset>
                                            <Legend>Geral</Legend>
                                            <Item>
                                                <Title>Total</Title>
                                                <Value>0.00</Value>
                                                <Text>Pontos</Text>
                                            </Item>
                                            <Item>
                                                <Title>Média</Title>
                                                <Value>0.00</Value>
                                                <Text>Por rodada</Text>
                                            </Item>
                                            <Item>
                                                <Title>Patrimônio</Title>
                                                <Value>0.00</Value>
                                                <Text>Cartoletas</Text>
                                            </Item>
                                        </Fieldset>

                                        <Fieldset>
                                            <Legend>Mais Escalados</Legend>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                                <Value>Thiago Galhardo</Value>
                                                <Text>Escalações: 10</Text>
                                            </Item>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                                <Value>Thiago Galhardo</Value>
                                                <Text>Escalações: 10</Text>
                                            </Item>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                                <Value>Thiago Galhardo</Value>
                                                <Text>Escalações: 10</Text>
                                            </Item>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                                <Value>Thiago Galhardo</Value>
                                                <Text>Escalações: 10</Text>
                                            </Item>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                                <Value>Thiago Galhardo</Value>
                                                <Text>Escalações: 10</Text>
                                            </Item>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                                <Value>Thiago Galhardo</Value>
                                                <Text>Escalações: 10</Text>
                                            </Item>
                                        </Fieldset>

                                        <Fieldset>
                                            <Legend>Maior e menor preço</Legend>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                                <Value>Thiago Galhardo | FOR</Value>
                                                <Value>C$ 0.00</Value>
                                                <Text>Rodada 1</Text>
                                            </Item>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                                <Value>Thiago Galhardo | FOR</Value>
                                                <Value>C$ 0.00</Value>
                                                <Text>Rodada 2</Text>
                                            </Item>
                                        </Fieldset>

                                        <Fieldset>
                                            <Legend>Pontos por posição</Legend>
                                            <Item>
                                                <Title>Goleiro</Title>
                                                <Value>0.00</Value>
                                                <Text>Média 0.00</Text>
                                            </Item>
                                            <Item>
                                                <Title>Lateral</Title>
                                                <Value>0.00</Value>
                                                <Text>Média 0.00</Text>
                                            </Item>
                                            <Item>
                                                <Title>Zagueiro</Title>
                                                <Value>0.00</Value>
                                                <Text>Média 0.00</Text>
                                            </Item>
                                            <Item>
                                                <Title>Meia</Title>
                                                <Value>0.00</Value>
                                                <Text>Média 0.00</Text>
                                            </Item>
                                            <Item>
                                                <Title>Atacante</Title>
                                                <Value>0.00</Value>
                                                <Text>Média 0.00</Text>
                                            </Item>
                                            <Item>
                                                <Title>Técnico</Title>
                                                <Value>0.00</Value>
                                                <Text>Média 0.00</Text>
                                            </Item>
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
                                                    <Tr>
                                                        <Td>1</Td>
                                                        <Td>80.65</Td>
                                                        <Td color={2.55 > 0 ? 'green' : 'red'}>C$ 2.55</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>2</Td>
                                                        <Td>80.65</Td>
                                                        <Td color={-1.30 > 0 ? 'green' : 'red'}>C$ -1.30</Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                        </Fieldset>

                                    </Box>
                                    <Box>
                                        <Fieldset>
                                            <Legend>Destaque</Legend>
                                            <Item>
                                                <Title>Maior Pontuação</Title>
                                                <Value>150.00</Value>
                                                <Text>Rodada 1</Text>
                                            </Item>
                                            <Item>
                                                <Title>Menor Pontuação</Title>
                                                <Value>50.00</Value>
                                                <Text>Rodada 2</Text>
                                            </Item>
                                        </Fieldset>

                                        <Fieldset>
                                            <Legend>Mais Escalados</Legend>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/organizations/2018/04/09/Flamengo-65.png" />
                                                <Value>Flamengo</Value>
                                                <Text>Escalações: 10</Text>
                                            </Item>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/organizations/2018/04/09/Flamengo-65.png" />
                                                <Value>Flamengo</Value>
                                                <Text>Escalações: 10</Text>
                                            </Item>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/organizations/2018/04/09/Flamengo-65.png" />
                                                <Value>Flamengo</Value>
                                                <Text>Escalações: 10</Text>
                                            </Item>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/organizations/2018/04/09/Flamengo-65.png" />
                                                <Value>Flamengo</Value>
                                                <Text>Escalações: 10</Text>
                                            </Item>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/organizations/2018/04/09/Flamengo-65.png" />
                                                <Value>Flamengo</Value>
                                                <Text>Escalações: 10</Text>
                                            </Item>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/organizations/2018/04/09/Flamengo-65.png" />
                                                <Value>Flamengo</Value>
                                                <Text>Escalações: 10</Text>
                                            </Item>
                                        </Fieldset>

                                        <Fieldset>
                                            <Legend>Maior e menor pontuador</Legend>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                                <Value>Thiago Galhardo | FOR</Value>
                                                <Value>0.00 pts</Value>
                                                <Text>Rodada 1</Text>
                                            </Item>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                                <Value>Thiago Galhardo | FOR</Value>
                                                <Value>0.00</Value>
                                                <Text>Rodada 2</Text>
                                            </Item>
                                        </Fieldset>

                                        <Fieldset>
                                            <Legend>Capitão</Legend>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                                <Value>Thiago Galhardo | FOR</Value>
                                                <Value>0.00</Value>
                                                <Text>Rodada 1</Text>
                                            </Item>
                                            <Item>
                                                <Text>Pontos: 0.00</Text>
                                                <Text>Média: 0.00</Text>
                                            </Item>
                                            <Item>
                                                <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                                <Value>Thiago Galhardo | FOR</Value>
                                                <Value>0.00</Value>
                                                <Text>Rodada 2</Text>
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
                                                    <Tr>
                                                        <Td>1</Td>
                                                        <Td>
                                                            <PhotoName>
                                                                <Photo src='https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png' />
                                                                <Name>Thiago Galhardo</Name>
                                                            </PhotoName>
                                                        </Td>
                                                        <Td>5.00 <Multiply>1.5x</Multiply> 7.5</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>2</Td>
                                                        <Td>
                                                            <PhotoName>
                                                                <Photo src='https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png' />
                                                                <Name>Thiago Galhardo</Name>
                                                            </PhotoName>
                                                        </Td>
                                                        <Td>5.00 <Multiply>1.5x</Multiply> 7.5</Td>
                                                    </Tr>
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
                Component={component}
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
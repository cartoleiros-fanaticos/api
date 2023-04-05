import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';
import Loading from '../../../../componets/loading';

import Modal from '../../../../componets/modal';
import ModalTeams from '../../../../modal/teams';

import {
    Content,
    Label,
    Input,
    Button,
    Teams,
    Team,
    Description,
    Shield,
    NameTeam,
    NamePlayer,
    Remove,
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

function statistics() {

    const [teams, steams] = useState([]);

    const [value, svalue] = useState('');

    const [data, sdata] = useState([]);
    const [modal, smodal] = useState(false);

    const [loading, sloading] = useState(false);
    const [loading_page, sloadingpage] = useState(false);

    useEffect(() => {
        const favorite_teams = localStorage.getItem('favorite_teams') ? JSON.parse(localStorage.getItem('favorite_teams')) : [];
        steams(favorite_teams);
    }, [])

    async function getData(teams_id) {

        try {

            sloading(true);

            const { data } = await api.get(`estatisticas/time/${teams_id}`);

            sdata(data);
            sloading(false);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    function remove_favorite(item) {

        teams.splice(teams.indexOf(item), 1)
        localStorage.setItem('favorite_teams', JSON.stringify(teams));

    }

    const component = () => (
        <>
            <Label>
                <Input
                    placeholder="Nome do time"
                    type="search"
                    onKeyUp={(e) => {

                        if (e.target.value && e.key === 'Enter') {
                            smodal(true);
                            svalue(e.target.value);
                        }

                    }}
                    onChange={(e) => svalue(e.target.value)}
                    onBlur={() => {

                        document.querySelector('.teams').style.cssText = `
                                height: 0;
                                visibility: hidden;
                            `;

                    }}
                    onFocus={() => {

                        if (teams.length) {

                            document.querySelector('.teams').style.cssText = `
                                    visibility: visible;
                                    height: 250px;
                                `;

                        }

                    }}
                    value={value}
                />
                <Button onClick={() => {

                    smodal(true)

                }}>OK</Button>
                {
                    <Teams className='teams' >
                        {
                            teams.map((e, i) =>
                                <Team key={i}>
                                    <Description onClick={() => getData(e.time_id)}>
                                        <Shield src={e.url_escudo_png} />
                                        <NameTeam>{e.nome}</NameTeam>
                                        <NamePlayer>{e.nome_cartola}</NamePlayer>
                                    </Description>
                                    <Remove onClick={() => remove_favorite(e)}>x</Remove>
                                </Team>
                            )
                        }
                    </Teams>
                }
            </Label>
            <Content>
                {
                    loading ?
                        <Loading />
                        :
                        <>
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
                        </>
                }

            </Content>
        </>
    );

    return (
        <>
            <Container
                title='Parciais times'
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
                    data={{ value }}
                    Component={ModalTeams}
                    fnc={getData}
                    height='400px'
                />
            }
        </>
    );
}

export default statistics;
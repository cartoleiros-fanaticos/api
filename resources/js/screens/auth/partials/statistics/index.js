import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Loading from '../../../../componets/loading';

import {
    Container,
    Content,
    Fieldset,
    Legend,
    Item,
    Title,
    Photo,
    Value,
    Label,
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

function statistics({ data: { teams_id } }) {

    const [data, sdata] = useState([]);
    const [loading, sloading] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {

        try {

            sloading(false);

            if (window.innerWidth <= 900)
                window.scrollTo({ top: 350, behavior: 'smooth' });

            const { data } = await api.get(`estatisticas/time/${teams_id}`);

            sdata(data);
            sloading(false);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    return (
        <Container>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <Content>
                            <Fieldset>
                                <Legend>Geral</Legend>
                                <Item>
                                    <Title>Total</Title>
                                    <Value>0.00</Value>
                                    <Label>Pontos</Label>
                                </Item>
                                <Item>
                                    <Title>Média</Title>
                                    <Value>0.00</Value>
                                    <Label>Por rodada</Label>
                                </Item>
                                <Item>
                                    <Title>Patrimônio</Title>
                                    <Value>0.00</Value>
                                    <Label>Cartoletas</Label>
                                </Item>
                            </Fieldset>

                            <Fieldset>
                                <Legend>Mais Escalados</Legend>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                    <Value>Thiago Galhardo</Value>
                                    <Label>Escalações: 10</Label>
                                </Item>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                    <Value>Thiago Galhardo</Value>
                                    <Label>Escalações: 10</Label>
                                </Item>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                    <Value>Thiago Galhardo</Value>
                                    <Label>Escalações: 10</Label>
                                </Item>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                    <Value>Thiago Galhardo</Value>
                                    <Label>Escalações: 10</Label>
                                </Item>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                    <Value>Thiago Galhardo</Value>
                                    <Label>Escalações: 10</Label>
                                </Item>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                    <Value>Thiago Galhardo</Value>
                                    <Label>Escalações: 10</Label>
                                </Item>
                            </Fieldset>

                            <Fieldset>
                                <Legend>Maior e menor preço</Legend>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                    <Value>Thiago Galhardo | FOR</Value>
                                    <Value>C$ 0.00</Value>
                                    <Label>Rodada 1</Label>
                                </Item>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                    <Value>Thiago Galhardo | FOR</Value>
                                    <Value>C$ 0.00</Value>
                                    <Label>Rodada 2</Label>
                                </Item>
                            </Fieldset>

                            <Fieldset>
                                <Legend>Pontos por posição</Legend>
                                <Item>
                                    <Title>Goleiro</Title>
                                    <Value>0.00</Value>
                                    <Label>Média 0.00</Label>
                                </Item>
                                <Item>
                                    <Title>Lateral</Title>
                                    <Value>0.00</Value>
                                    <Label>Média 0.00</Label>
                                </Item>
                                <Item>
                                    <Title>Zagueiro</Title>
                                    <Value>0.00</Value>
                                    <Label>Média 0.00</Label>
                                </Item>
                                <Item>
                                    <Title>Meia</Title>
                                    <Value>0.00</Value>
                                    <Label>Média 0.00</Label>
                                </Item>
                                <Item>
                                    <Title>Atacante</Title>
                                    <Value>0.00</Value>
                                    <Label>Média 0.00</Label>
                                </Item>
                                <Item>
                                    <Title>Técnico</Title>
                                    <Value>0.00</Value>
                                    <Label>Média 0.00</Label>
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

                        </Content>
                        <Content>
                            <Fieldset>
                                <Legend>Destaque</Legend>
                                <Item>
                                    <Title>Maior Pontuação</Title>
                                    <Value>150.00</Value>
                                    <Label>Rodada 1</Label>
                                </Item>
                                <Item>
                                    <Title>Menor Pontuação</Title>
                                    <Value>50.00</Value>
                                    <Label>Rodada 2</Label>
                                </Item>
                            </Fieldset>

                            <Fieldset>
                                <Legend>Mais Escalados</Legend>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/organizations/2018/04/09/Flamengo-65.png" />
                                    <Value>Flamengo</Value>
                                    <Label>Escalações: 10</Label>
                                </Item>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/organizations/2018/04/09/Flamengo-65.png" />
                                    <Value>Flamengo</Value>
                                    <Label>Escalações: 10</Label>
                                </Item>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/organizations/2018/04/09/Flamengo-65.png" />
                                    <Value>Flamengo</Value>
                                    <Label>Escalações: 10</Label>
                                </Item>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/organizations/2018/04/09/Flamengo-65.png" />
                                    <Value>Flamengo</Value>
                                    <Label>Escalações: 10</Label>
                                </Item>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/organizations/2018/04/09/Flamengo-65.png" />
                                    <Value>Flamengo</Value>
                                    <Label>Escalações: 10</Label>
                                </Item>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/organizations/2018/04/09/Flamengo-65.png" />
                                    <Value>Flamengo</Value>
                                    <Label>Escalações: 10</Label>
                                </Item>
                            </Fieldset>

                            <Fieldset>
                                <Legend>Maior e menor pontuador</Legend>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                    <Value>Thiago Galhardo | FOR</Value>
                                    <Value>0.00 pts</Value>
                                    <Label>Rodada 1</Label>
                                </Item>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                    <Value>Thiago Galhardo | FOR</Value>
                                    <Value>0.00</Value>
                                    <Label>Rodada 2</Label>
                                </Item>
                            </Fieldset>

                            <Fieldset>
                                <Legend>Capitão</Legend>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                    <Value>Thiago Galhardo | FOR</Value>
                                    <Value>0.00</Value>
                                    <Label>Rodada 1</Label>
                                </Item>
                                <Item>
                                    <Label>Pontos: 0.00</Label>
                                    <Label>Média: 0.00</Label>
                                </Item>
                                <Item>
                                    <Photo src="https://s.sde.globo.com/media/person_role/2022/07/16/27deb38ffaefdd66a10d7f246dcc678f_220x220.png" />
                                    <Value>Thiago Galhardo | FOR</Value>
                                    <Value>0.00</Value>
                                    <Label>Rodada 2</Label>
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
                        </Content>
                    </>
            }

        </Container>
    );
}

export default statistics;
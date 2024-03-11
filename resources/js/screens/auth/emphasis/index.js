import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { amount, message } from '../../../utils/helpers';
import api from '../../../utils/api';

import Container from '../../../componets/container';

import {
    Content,
    Group,
    Title,
    List,
    Item,
    Position,
    Photo,
    Box,
    Text,
    Message,
} from './styles';

function emphasis() {

    const seasson = useSelector(state => state);

    const [data, sdata] = useState({});

    const [loading_page, sloadingpage] = useState(true);

    useEffect(() => {
        getData();
    }, [seasson])

    async function getData() {

        try {

            sloadingpage(true);

            const { data } = await api.get(`destaques/atletas?temporada=${seasson}`);

            sdata(data);
            sloadingpage(false);

        } catch (e) {
            message(e);
            sloadingpage(false);
        };

    }

    const component = (
        <Content>
            {
                data && data.status && data.status === 'Fechado' ?
                    <Message>Temporada ainda não abriu clique no menu temporada para alternar para anterior.</Message>
                    :
                    <>
                        <Group>
                            <Title>Jogadores Mais Escalados</Title>
                            <List>
                                {
                                    data['Seleção']?.map((e, i) =>
                                        <Item key={i}>
                                            <Position>{i + 1} º</Position>
                                            <Photo src={e.foto} />
                                            <Box>
                                                <Text>{e.apelido}</Text>
                                                <Text>{e.posicao}</Text>
                                            </Box>
                                            <Box>
                                                <Text>{e.escalacoes}</Text>
                                                <Text>Escalações</Text>
                                            </Box>
                                        </Item>
                                    )
                                }
                            </List>
                        </Group>
                        <div>
                            <Group>
                                <Title>Capitão Mais Escalados</Title>
                                <List>
                                    {
                                        data['Capitães']?.map((e, i) =>
                                            <Item key={i}>
                                                <Position>{i + 1} º</Position>
                                                <Photo src={e.foto} />
                                                <Box>
                                                    <Text>{e.apelido}</Text>
                                                    <Text>{e.posicao}</Text>
                                                </Box>
                                                <Box>
                                                    <Text>{e.escalacoes}</Text>
                                                    <Text>Escalações</Text>
                                                </Box>
                                            </Item>
                                        )
                                    }
                                </List>
                            </Group>
                            <Group>
                                <Title>Reservas Mais Escalados</Title>
                                <List>
                                    {
                                        data['Reservas']?.map((e, i) =>
                                            <Item key={i}>
                                                <Position>{i + 1} º</Position>
                                                <Photo src={e.foto} />
                                                <Box>
                                                    <Text>{e.apelido}</Text>
                                                    <Text>{e.posicao}</Text>
                                                </Box>
                                                <Box>
                                                    <Text>{e.escalacoes}</Text>
                                                    <Text>Escalações</Text>
                                                </Box>
                                            </Item>
                                        )
                                    }
                                </List>
                            </Group>
                        </div>

                    </>
            }
        </Content>
    );

    return (
        <Container
            title='Mais Escalado'
            component={component}
            loading={loading_page}
        />
    );
}

export default emphasis;
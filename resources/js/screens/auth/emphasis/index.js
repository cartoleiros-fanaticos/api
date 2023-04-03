import React, { useState, useEffect } from 'react';

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
} from './styles';

function emphasis() {

    const [data, sdata] = useState({});

    const [loading_page, sloadingpage] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {

        try {

            sloadingpage(true);

            const { data } = await api.get(`destaques/atletas`);

            sdata(data);
            sloadingpage(false);

        } catch (e) {
            message(e);
            sloadingpage(false);
        };

    }

    const component = () => (
        <Content>
            <Group>
                <Title>Jogadores Mais Escalados</Title>
                <List>
                    {
                        data['Seleção'].map((e, i) =>
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
                            data['Capitães'].map((e, i) =>
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
                            data['Reservas'].map((e, i) =>
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
        </Content>
    );

    return (
        <Container
            title='Mais Escalado'
            Component={component}
            loading={loading_page}
        />
    );
}

export default emphasis;
import React, { useState, useEffect } from 'react';

import { amount, message, slug } from '../../../utils/helpers';
import api from '../../../utils/api';

import Container from '../../../componets/container';
import Nav from './components/nav';

import { Message } from '../../../utils/styles';

import {
    Content,
    Main,
    Item,
    Photo,
    Name,
} from './styles';

function league() {

    const [data, sdata] = useState({});
    const [loading_page, sloadingpage] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {

        try {

            const { data } = await api.get(`competicao`);

            sdata(data);
            sloadingpage(false);

        } catch (e) {
            message(e);
            sloadingpage(false);
        };

    }

    const component = (
        <Content>
            <Nav />
            <Main>
                {
                    data.usuarios?.data.length
                        ?
                        data.usuarios.data.map((e, i) =>
                            <Item key={i} to={`/auth/ligas/${slug(e.nome)}`}>
                                <Photo foto={e.foto} />
                                <Name>{e.nome}</Name>
                            </Item>
                        )
                        :
                        <Message>Nenhum registro encontrado.</Message>
                }
            </Main>
        </Content>
    );

    return (
        <Container
            title='Ligas'
            component={component}
            loading={loading_page}
        />
    );
}

export default league;
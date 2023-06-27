import React, { useState, useEffect } from 'react';

import { amount, message, slug } from '../../../utils/helpers';
import api from '../../../utils/api';

import Container from '../../../componets/container';

import { Message } from '../../../utils/styles';

import {
    Content,
    Item,
    Photo,
    Name,
} from './styles';

function league() {

    const [data, sdata] = useState({});
    const [loading, sloading] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {

        try {

            const { data } = await api.get(`competicao`);

            sdata(data);
            sloading(false);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    const component = (
        <Content>
            {
                data.usuarios?.data.length
                    ?
                    data.usuarios.data.map((e, i) =>
                        <Item key={i} to={`/auth/${e.id}/${slug(e.nome)}`}>
                            <Photo foto={e.foto} />
                            <Name>{e.nome}</Name>
                        </Item>
                    )
                    :
                    <Message>Nenhum registro encontrado.</Message>
            }
        </Content>
    );

    return (
        <Container
            title='Administradores'
            component={component}
            loading={loading}
        />
    );
}

export default league;
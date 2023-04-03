import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../utils/helpers';
import api from '../../../utils/api';

import Container from '../../../componets/container';

import {
    Content,
} from './styles';

import { Message } from '../../../utils/styles';

function league() {

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
            <Message>Em construção.</Message>
        </Content>
    );

    return (
        <Container
            title='Ligas'
            Component={component}
            loading={loading_page}
        />
    );
}

export default league;
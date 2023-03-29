import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../utils/helpers';
import api from '../../../utils/api';

import Container from '../../../componets/container';

import { Content } from './styles';

function plans() {

    const [data, sdata] = useState({});

    const [loading_page, sloadingpage] = useState(false);

    const component = () => (
        <Content>
        </Content>
    );

    return (
        <Container
            title='PLANOS'
            Component={component}
            loading={loading_page}
        />
    );
}

export default plans;
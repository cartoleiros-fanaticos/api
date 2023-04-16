import React, { useEffect, useState } from 'react';

import api from '../../utils/api';

import {
    Container,
    Text,
    Time
} from './styles';

function live({ uri, fnc, control = 'start' }) {

    const [loop, sloop] = useState();
    const [time, stime] = useState('10s');

    useEffect(() => {
        if (control === 'clean') {
            sloop(null);
            clearInterval(loop);
        } else getData();
    }, [control])

    useEffect(() => {

        return () => {
            clearInterval(loop);
        }

    }, [loop])

    async function getData() {
        let t = 10;

        const loop = setInterval(async () => {

            t = t - 1;

            if (!t) {
                stime(`Carregando...`);
                const { data } = await api.get(uri);

                fnc(data);

                t = 10;

                stime(`${t}s`);

            } else {
                if (t > 0) stime(`${t}s`);
            }

        }, 1000)

        sloop(loop);
    }

    return (
        <Container>
            <Text>Tempo real</Text>
            <Time>{time}</Time>
        </Container>
    );
}

export default live;
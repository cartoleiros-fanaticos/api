import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Loading from '../../../../componets/loading';

import { Container } from './styles';

function statistics({ data: { teams_id } }) {

    const [data, sdata] = useState([]);
    const [loading, sloading] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {

        try {

            sloading(true);

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
                        {
                            <span>{JSON.stringify(data)}</span>
                        }
                    </>
            }

        </Container>
    );
}

export default statistics;
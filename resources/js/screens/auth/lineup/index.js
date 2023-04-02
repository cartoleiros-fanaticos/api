import React, { useState, useEffect, useRef } from 'react';

import { amount, message } from '../../../utils/helpers';
import api from '../../../utils/api';

import Container from '../../../componets/container';

import {
    Content,
    ContainerRounds,
    Rounds,
    Text,
    Teams,
    Shield,
    Name,
    Patrimony,
    Score,
    Players,
} from './styles';

function lineup() {

    const round = useRef();

    const [data, sdata] = useState({});

    const [loading_page, sloadingpage] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    async function getRound(element, rodada) {

        let rdd = element.parentElement.querySelector('.current');
        let rodada_atual = rdd.innerText;

        rdd.classList.remove('current');

        let box_view = 11;
        let box = 5;
        let box_min = 5;
        let box_max = 34;
        let width_box = 99.489;

        if (window.innerWidth <= 900) {
            box_view = 7;
            box = 3;
            box_min = 2;
            box_max = 36;
            width_box = (window.innerWidth - 20) / 7;
        }

        if (rodada > box_min && rodada < box_max) {

            let calc = (rodada - box) * width_box - width_box;

            element.parentElement.style.cssText = `
                margin-left: -${calc}px;
            `;

        } else if (rodada_atual > box && rodada <= box) {

            element.parentElement.style.cssText = `
                margin-left: 0px;
            `;

        } else if (rodada >= box_max) {

            element.parentElement.style.cssText = `
                margin-left: -${(38 - box_view) * width_box}px;
            `;

        }

        element.classList.add('current');

    }

    async function getData() {

        try {

            sloadingpage(true);

            const { data } = await api.get(`escalacao`);

            sdata(data);
            sloadingpage(false);

        } catch (e) {
            message(e);
            sloadingpage(false);
        };

    }

    const component = () => (
        <Content>
            <ContainerRounds>
                <Rounds>
                    {
                        data.rodadas.map(e =>
                            <Text
                                width={window.innerWidth}
                                onClick={(event) => getRound(event.target, e)}
                                className={e === data.rodada_atual ? 'current' : ''}
                                key={e}
                            >
                                {e}
                            </Text>
                        )
                    }
                </Rounds>
            </ContainerRounds>
            <Teams>
                {
                    data.times.map(e =>
                        <>
                            <Shield src={e.url_escudo_png} />
                            <Name>Nome: {e.nome}</Name>
                            <Patrimony>Patrimônio: {e.patrimonio}pts</Patrimony>
                            <Score>Campeonato: {e.pontos_campeonato}pts</Score>
                        </>
                    )
                }
            </Teams>
            <Players>

            </Players>
        </Content>
    );

    return (
        <Container
            title='DICAS'
            Component={component}
            loading={loading_page}
        />
    );
}

export default lineup;
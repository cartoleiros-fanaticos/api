import React, { useState, useEffect, useRef } from 'react';

import { amount, message, swal_warning  } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';

import Modal from '../../../../componets/modal';
import ModalScoutMatch from '../../../../modal/scouts_matches';

import {
    Content,
    ContainerRounds,
    Rounds,
    Round,
    List,
    Item,
    Date,
    Shield,
    Text,
    Button,
} from './styles';

import Loading from '../../../../componets/loading';

function rounds() {

    const [modal, smodal] = useState(false);

    const [data, sdata] = useState([]);
    const [loading_page, sloadingpage] = useState(true);

    const [loading, sloading] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {

        try {

            sloadingpage(true);

            if (window.innerWidth <= 900)
                window.scrollTo({ top: 350, behavior: 'smooth' });

            const { data } = await api.get(`parciais/rodadas`);

            sdata(data);
            sloading(false);
            sloadingpage(false);

        } catch (e) {
            message(e);
            sloading(false);
            sloadingpage(false);
        };

    }

    async function getRound(element, rodada) {

        // if (rodada > data.rodada_atual) {

        //     swal_warning('Ainda não existe dados para essa rodada.');

        // } else {

            let rdd = element.parentElement.querySelector('.current');
            let rodada_atual = rdd.innerText;

            rdd.classList.remove('current');

            let box_view = 11;
            let box = 5;
            let box_min = 5;
            let box_max = 34;
            let width_box = 100.398;

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

           // getPlayers(rodada, data.time.time_id);

        // }

    }

    const component = () => (
        <>
            <Content>
                {
                    loading ?
                        <Loading />
                        :
                        <>
                            <ContainerRounds>
                                <Rounds>
                                    {
                                        data.rodadas.map(e =>
                                            <Round
                                                width={window.innerWidth}
                                                onClick={(event) => getRound(event.target, e)}
                                                className={e === data.rodada_atual ? 'current' : ''}
                                                key={e}
                                            >
                                                {e}
                                            </Round>
                                        )
                                    }
                                </Rounds>
                            </ContainerRounds>
                            <List>
                                {
                                    data.partidas.map((e, i) =>
                                        <Item onClick={() => {
                                            smodal(true)
                                            sdata({
                                                ...data,
                                                partida: e
                                            });
                                        }} key={i}>
                                            <Date>{e.partida_data}</Date>
                                            <Shield src={data.clubes[e.clube_casa_id]['60x60']} />
                                            <Text>{e.placar_oficial_mandante}</Text>
                                            <Text>x</Text>
                                            <Text>{e.placar_oficial_visitante}</Text>
                                            <Shield src={data.clubes[e.clube_visitante_id]['60x60']} />
                                            <Button>VER SCOUTS</Button>
                                        </Item>
                                    )
                                }
                            </List>
                        </>
                }
            </Content>
            {
                modal &&
                <Modal
                    icon="compare_arrows"
                    title="Parciais por clube"
                    modal={modal}
                    smodal={smodal}
                    data={data.partida}
                    Component={ModalScoutMatch}
                    width='80%'
                    height='500px'
                    marginLeft='-40%'
                />
            }
        </>
    );

    return (
        <Container
            title='Parciais clubes'
            Component={component}
            loading={loading_page}
        />
    );
}

export default clubs;
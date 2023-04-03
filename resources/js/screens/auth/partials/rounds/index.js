import React, { useState, useEffect, useRef } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Modal from '../../../../componets/modal';
import ModalScoutMatch from '../../../../modal/scouts_matches';

import {
    Container,
    List,
    Item,
    Date,
    Shield,
    Text,
    Button,
} from './styles';

import Loading from '../../../../componets/loading';

function rounds({ round }) {

    const [modal, smodal] = useState(false);

    const [data, sdata] = useState({});

    const [loading, sloading] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {

        try {

            sloading(true);

            if (window.innerWidth <= 900)
                window.scrollTo({ top: 350, behavior: 'smooth' });

            const { data } = await api.get(`parciais/rodadas`);

            sdata(data);
            sloading(false);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    return (
        <>
            <Container>
                {
                    loading ?
                        <Loading />
                        :
                        <List>
                            {
                                data.rodadas.map((e, i) =>
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
                }
            </Container>
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
}

export default rounds;
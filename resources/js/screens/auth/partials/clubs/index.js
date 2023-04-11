import React, { useState, useEffect, useRef } from 'react';

import { amount, message, swal_warning } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';
import Rounds from '../../../../componets/rounds';

import Modal from '../../../../componets/modal';
import ModalScoutMatch from '../../../../modal/scouts_matches';

import {
    Content,
    List,
    Item,
    Date,
    Shield,
    Text,
    Button,
} from './styles';

import Loading from '../../../../componets/loading';

function clubs() {

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

            const { data } = await api.get(`parciais/partidas`);

            sdata(data);
            sloading(false);
            sloadingpage(false);

        } catch (e) {
            message(e);
            sloading(false);
            sloadingpage(false);
        };

    }

    const component = (
        <Content>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <Rounds
                            fnc={() => console.log('Funcionando')}
                            rodada_atual={data.rodada_atual}
                        />
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
    );

    return (
        <>
            <Container
                title='Parciais clubes'
                component={component}
                loading={loading_page}
            />
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

export default clubs;
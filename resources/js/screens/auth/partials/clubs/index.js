import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
    Message,
} from './styles';

import Loading from '../../../../componets/loading';

function clubs() {

    const seasson = useSelector(state => state);

    const [modal, smodal] = useState(false);

    const [data, sdata] = useState([]);
    const [loading_page, sloadingpage] = useState(true);

    const [loading, sloading] = useState(true);

    useEffect(() => {
        getData();
    }, [seasson])

    async function getData() {

        try {

            sloadingpage(true);

            const { data } = await api.get(`parciais/partidas?temporada=${seasson}`);

            sdata(data);
            sloading(false);
            sloadingpage(false);

        } catch (e) {
            message(e);
            sloading(false);
            sloadingpage(false);
        };

    }

    async function rounds(round = 1) {

        try {
            const { data } = await api.get(`parciais/partidas?rodada=${round}&temporada=${seasson}`);
            sdata(data);
        } catch (e) {
            message(e);
        }

    }


    const component = (
        <Content>
            {
                loading ?
                    <Loading />
                    :
                    data && data.status && data.status === 'Fechado' ?
                        <Message>Temporada ainda não abriu clique no menu temporada para alternar para anterior.</Message>
                        :
                        <>
                            <Rounds
                                type="rounds"
                                fnc={({ rodada }) => rounds(rodada)}
                                data={{ rodada_atual: data.rodada_atual }}
                            />
                            <List>
                                {
                                    data.partidas.map((e, i) =>
                                        <Item onClick={() => {
                                            sdata({
                                                ...data,
                                                partida: e
                                            });
                                            smodal(true)
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
                    data={{ data: data.partida, seasson }}
                    Component={ModalScoutMatch}
                    width='70%'
                    height='500px'
                    marginLeft='-35%'
                />
            }
        </>
    );
}

export default clubs;
import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';
import Loading from '../../../../componets/loading';

import Modal from '../../../../componets/modal';
import ModalLeague from '../../../../modal/leagues';

import {
    Label,
    Icon,
    Input,
    Content,
    Emphasis,
    Box,
    Title,
    Image,
    Score,
    Text,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Shield,
    Description,
    NameTeam,
    NamePlayer
} from './styles';

import { Message } from '../../../../utils/styles';

function leagues() {

    const [data, sdata] = useState({});
    const [modal, smodal] = useState(false);

    const [loading, sloading] = useState(false);

    async function getData(slug) {

        try {

            sloading(true);

            const { data } = await api.get(`parciais/liga/${slug}`);

            sdata(data);
            sloading(false);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    const component = () => (
        <>
            <Label>
                <Icon>groups</Icon>
                <Input
                    onFocus={() => smodal(true)}
                />
            </Label>
            {
                loading ?
                    <Loading />
                    :

                    <>
                        {
                            data?.destaques ?
                                <Content>
                                    <Emphasis>
                                        <Box>
                                            <Title>LÍDER DA RODADA</Title>
                                            <Image src={`${data.destaques.rodada.escudo || `../../images/escudo.png`}`} />
                                            <Title>{data.destaques.rodada.nome || 'Aguardando'}</Title>
                                            <Score>{data.destaques.rodada.pontos}</Score>
                                            <Text>Pontos</Text>
                                        </Box>
                                        <Box>
                                            <Title>MAIS RÍCO</Title>
                                            <Image src={`${data.destaques.patrimonio.escudo || `../../images/escudo.png`}`} />
                                            <Title>{data.destaques.patrimonio.nome || 'Aguardando'}</Title>
                                            <Score>{data.destaques.patrimonio.pontos}</Score>
                                            <Text>Pontos</Text>
                                        </Box>
                                        <Box>
                                            <Title>LANTERNINHA</Title>
                                            <Image src={`${data.destaques.lanterninha.escudo || `../../images/escudo.png`}`} />
                                            <Title>{data.destaques.lanterninha.nome || 'Aguardando'}</Title>
                                            <Score>{data.destaques.lanterninha.pontos}</Score>
                                            <Text>Pontos</Text>
                                        </Box>
                                    </Emphasis>
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                <Th width={80}>Times</Th>
                                                <Th width={10}>Total</Th>
                                                <Th width={10}>Posição</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {
                                                data.times.length ?
                                                    data.times.map(e =>
                                                        <Tr>
                                                            <Td width={80}>
                                                                <Shield src={e.url_escudo_png} />
                                                                <Description>
                                                                    <NameTeam>{e.nome}</NameTeam>
                                                                    <NamePlayer>{e.nome_cartola}</NamePlayer>
                                                                </Description>
                                                            </Td>
                                                            <Td width={10}>0.00</Td>
                                                            <Td width={10}>1º</Td>
                                                        </Tr>
                                                    )
                                                    :
                                                    <Message>Nenhum jogador encontrado</Message>
                                            }

                                        </Tbody>
                                    </Table>
                                </Content>

                                :
                                <></>
                        }
                    </>
            }
        </>
    );

    return (
        <>
            <Container
                title='Parciais ligas'
                Component={component}
            />
            {
                modal &&
                <Modal
                    icon="list"
                    title="Listas do cartola"
                    modal={modal}
                    smodal={smodal}
                    Component={ModalLeague}
                    fnc={getData}
                    height='500px'
                />
            }
        </>
    );
}

export default leagues;
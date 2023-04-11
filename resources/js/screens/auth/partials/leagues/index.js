import React, { useState, useEffect } from 'react';

import { amount, message, share } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';
import Loading from '../../../../componets/loading';

import Modal from '../../../../componets/modal';
import ModalLeague from '../../../../modal/leagues';

import { useNavigate } from "react-router-dom";

import {
    Label,
    Icon,
    Input,
    Content,
    Header,
    Share,
    HeaderShield,
    HeaderTitle,
    HeaderText,
    Emphasis,
    Box,
    Title,
    Image,
    Score,
    Text,
    Select,
    Option,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Variations,
    Shield,
    Description,
    NameTeam,
    NamePlayer
} from './styles';

import { Message } from '../../../../utils/styles';

function leagues() {

    let navigate = useNavigate();


    const [slug, sslug] = useState('');
    const [orderBy, sorderBy] = useState('campeonato');

    const [data, sdata] = useState({});
    const [modal, smodal] = useState(false);

    const [loading, sloading] = useState(false);

    useEffect(() => {
        getData(slug)
    }, [orderBy])

    async function getData(slug) {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        try {

            sloading(true);

            const { data } = await api.get(`parciais/liga/${slug}?orderBy=${orderBy}`);

            sslug(slug);
            sdata(data);
            sloading(false);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    const component = (
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
                                    <Header>
                                        <Share onClick={() => share(data, orderBy) }>share</Share>
                                        <HeaderShield src={data.escudo} />
                                        <HeaderTitle>{data.nome}</HeaderTitle>
                                        <HeaderText>{data.descricao}</HeaderText>
                                        <HeaderText>{data.total_times_liga} PARTICIPANTES</HeaderText>
                                    </Header>
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
                                    <Label>
                                        <Icon>reorder</Icon>
                                        <Select value={orderBy} onChange={(e) => { sorderBy(e.target.value) }}>
                                            <Option value="campeonato">Campeonato</Option>
                                            <Option value="turno">Turno</Option>
                                            <Option value="mes">Mês</Option>
                                            <Option value="rodada">Rodada</Option>
                                            <Option value="patrimonio">Patrimônio</Option>
                                        </Select>
                                    </Label>
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                <Th width={70}>Times</Th>
                                                <Th width={15}>Total</Th>
                                                <Th width={15}>Posição</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {
                                                data.times.length ?
                                                    data.times.map((e, i) =>
                                                        <Tr title='Clique para ver estatisticas sobre esse time.' key={i} onClick={() => {
                                                            navigate('/auth/parciais/times', { state: { time_id: e.time_id } });
                                                        }}>
                                                            <Td width={70}>
                                                                <Shield src={e.url_escudo_png} />
                                                                <Description>
                                                                    <NameTeam>{e.nome}</NameTeam>
                                                                    <NamePlayer>{e.nome_cartola}</NamePlayer>
                                                                </Description>
                                                            </Td>
                                                            <Td width={15}>{amount(e.pontos[orderBy === 'patrimonio' ? 'campeonato' : orderBy] || 0)}</Td>
                                                            <Td style={{ display: 'flex', justifyContent: 'center' }} width={15}>
                                                                {e.ranking[orderBy] || 1}º
                                                                {
                                                                    orderBy != 'rodada' &&
                                                                    <Variations value={e.variacao[orderBy] || 0}>{e.variacao[orderBy] || 0}</Variations>
                                                                }
                                                            </Td>
                                                        </Tr>
                                                    )
                                                    :
                                                    <Message>Nenhum jogador encontrado</Message>
                                            }

                                        </Tbody>
                                    </Table>
                                </Content>

                                :
                                <Message>Pesquise por uma liga</Message>
                        }
                    </>
            }
        </>
    );

    return (
        <>
            <Container
                title='Parciais ligas'
                component={component}
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
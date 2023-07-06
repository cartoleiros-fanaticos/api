import React, { useEffect, useState, useRef } from 'react';

import { amount, message, swal_ask } from '../../../utils/helpers';
import api from '../../../utils/api';

import ModalLeagues from '../modal/leagues';
import Modal from '../../../componets/modal';
import Container from '../components/container';

import { Message } from '../../../utils/styles';

import {
    Header,
    Title,
    Icon,
    Label,
    Input,
    List,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    ActionIcon,
    Navigator,
    NavIcon,
    NavText,
} from './styles';

function leagues() {

    useEffect(() => {
        getData();
    }, [])

    const [page, spage] = useState(1);
    const [search, ssearch] = useState('');
    const [user, sleague] = useState({});
    const [data, sdata] = useState({});
    const [modal, smodal] = useState(false);
    const [loading, sloading] = useState(true);

    async function getData(value = '', page = 1) {

        try {

            let { data } = await api.get(`competicao/adm?pesquisar=${value}&page=${page}`);

            sdata(data);
            sloading(false);
            spage(page);
            ssearch(value);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    async function remove(e) {

        swal_ask('Tem certeza que deseja deletar essa liga fazendo isso você vai deletar todos os dados ligado a ela.')
            .then(async ({ value }) => {

                if (value) {

                    try {

                        await api.delete(`competicao/${e.id}`);

                        getData();
                        sloading(false);

                    } catch (e) {
                        message(e);
                        sloading(false);
                    };

                }

            })

    }

    function onKeyUp(e) {
        if (e.target.value && e.which === 13) {
            getData(e.target.value);
        }
    }

    function onChange(e) {
        if (e.target.value === '') getData('');
    }

    const component = (
        <>
            {
                data.competicoes &&
                <>
                    <Header>
                        <Title>
                            <Icon>manage_accounts</Icon>
                            {data.competicoes.total} Ligas
                        </Title>
                        <Label>
                            <Icon>search</Icon>
                            <Input onKeyUp={onKeyUp} onChange={onChange} />
                        </Label>
                    </Header>
                    <List>
                        {
                            data.competicoes.data.length
                                ?
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>NOME</Th>
                                            <Th>TIPO</Th>
                                            <Th>COMISSÃO</Th>
                                            <Th>VALOR</Th>
                                            <Th>CAPITÃO</Th>
                                            <Th>SITUAÇÃO</Th>
                                            <Th>AÇÃO</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            data.competicoes.data.map((e, i) =>
                                                <Tr key={i}>
                                                    <Td>{e.id}</Td>
                                                    <Td width="270px">{e.nome}</Td>
                                                    <Td>{e.tipo}</Td>
                                                    <Td>{e.comissao}</Td>
                                                    <Td>{amount(e.valor)}</Td>
                                                    <Td>{e.capitao}</Td>
                                                    <Td>{e.situacao}</Td>
                                                    <Td className='action'>
                                                        <ActionIcon onClick={() => {
                                                            smodal(true);
                                                            sleague(e);
                                                        }}>edit</ActionIcon>
                                                        <ActionIcon onClick={() => remove(e)}>delete</ActionIcon>
                                                    </Td>
                                                </Tr>
                                            )}
                                    </Tbody>
                                </Table>
                                :
                                <Message>Nenhum registro encontrado.</Message>
                        }
                    </List>
                    {
                        data.competicoes.total > 100 &&
                        <Navigator>
                            <NavIcon onClick={() => getData(search, page === 1 ? 1 : (page - 1))}>navigate_before</NavIcon>
                            <NavText>{data.competicoes.current_page}</NavText>
                            <NavIcon onClick={() => getData(search, page === data.competicoes.total ? data.competicoes.total : (page + 1))}>navigate_next</NavIcon>
                        </Navigator>
                    }
                </>
            }

        </>
    );

    return (
        <>
            <Container
                data={data}
                component={component}
                loading={loading}
            />
            {
                modal &&
                <Modal
                    icon="verified_user"
                    title="Cadastrar Ligas"
                    data={league}
                    modal={modal}
                    smodal={smodal}
                    Component={ModalLeagues}
                    height='430px'
                />
            }
        </>
    );
}

export default leagues;
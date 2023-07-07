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

function transactions() {

    useEffect(() => {
        getData();
    }, [])

    const [page, spage] = useState(1);
    const [search, ssearch] = useState('');
    const [data, sdata] = useState({});
    const [loading, sloading] = useState(true);

    async function getData(value = '', page = 1) {

        try {

            let { data } = await api.get(`competicao/solicitacoes?pesquisar=${value}&page=${page}`);

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

        swal_ask('Tem certeza que deseja deletar essa inscrição?')
            .then(async ({ value }) => {

                if (value) {

                    try {

                        await api.delete(`competicao/deletar-solicitacao/${e.id}`);

                        getData();
                        sloading(false);

                    } catch (e) {
                        message(e);
                        sloading(false);
                    };

                }

            })

    }

    async function status(e) {

        try {

            await api.put(`competicao/situacao-solicitacao/${e.id}`, { situacao: e.situacao });

            const newData = data.solicitacoes.data.map(data => {
                if(data.id === e.id) data.situacao = data.situacao === 'Aceita' ? 'Rejeitada' : 'Aceita';
                return data;
            })

            sdata({ 
                ...data,
                solicitacoes: {
                    ...data.solicitacoes,
                    data: newData
                    
                }
             });

            sloading(false);

        } catch (e) {
            message(e);
            sloading(false);
        };

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
                data.solicitacoes &&
                <>
                    <Header>
                        <Title>
                            <Icon>manage_accounts</Icon>
                            {data.solicitacoes.total} Inscrições
                        </Title>
                        <Label>
                            <Icon>search</Icon>
                            <Input onKeyUp={onKeyUp} onChange={onChange} />
                        </Label>
                    </Header>
                    <List>
                        {
                            data.solicitacoes.data.length
                                ?
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>LIGA</Th>
                                            <Th>TIME</Th>
                                            <Th>VALOR</Th>
                                            <Th>SITUAÇÃO</Th>
                                            <Th>AÇÃO</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            data.solicitacoes.data.map((e, i) =>
                                                <Tr key={i}>
                                                    <Td>{e.id}</Td>
                                                    <Td width="270px">{e.competicao}</Td>
                                                    <Td>{e.nome}</Td>
                                                    <Td>{amount(e.valor)}</Td>
                                                    <Td status={e.situacao}><span onClick={() => status(e)}>{e.situacao}</span></Td>
                                                    <Td width="50px">
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
                        data.solicitacoes.total > 100 &&
                        <Navigator>
                            <NavIcon onClick={() => getData(search, page === 1 ? 1 : (page - 1))}>navigate_before</NavIcon>
                            <NavText>{data.solicitacoes.current_page}</NavText>
                            <NavIcon onClick={() => getData(search, page === data.solicitacoes.total ? data.competicoes.total : (page + 1))}>navigate_next</NavIcon>
                        </Navigator>
                    }
                </>
            }

        </>
    );

    return (
        <Container
            data={data}
            component={component}
            loading={loading}
        />
    );
}

export default transactions;
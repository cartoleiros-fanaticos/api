import React, { useEffect, useState, useRef } from 'react';

import { message, swal_ask } from '../../../utils/helpers';
import api from '../../../utils/api';

import ModalUsers from '../modal/users';
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

function users() {

    useEffect(() => {
        getData();
    }, [])

    const [page, spage] = useState(1);
    const [search, ssearch] = useState('');
    const [user, suser] = useState({});
    const [data, sdata] = useState({});
    const [modal, smodal] = useState(false);
    const [loading, sloading] = useState(true);

    async function getData(value = '', page = 1) {

        try {

            let { data } = await api.get(`usuarios?pesquisar=${value}&page=${page}`);

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

        swal_ask('Tem certeza que deseja deletar esse usuário fazendo isso você deletar todos os dados ligado ao mesmo.')
            .then(async ({ value }) => {

                if (value) {

                    try {

                        await api.delete(`usuarios/${e.id}`);

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
                data.usuarios &&
                <>
                    <Header>
                        <Title>
                            <Icon>manage_accounts</Icon>
                            {data.usuarios.total} Usuarios
                        </Title>
                        <Label>
                            <Icon>search</Icon>
                            <Input onKeyUp={onKeyUp} onChange={onChange} />
                        </Label>
                    </Header>
                    <List>
                        {
                            data.usuarios.data.length
                                ?
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>NOME</Th>
                                            <Th>CELULAR</Th>
                                            <Th>FUNCAO</Th>
                                            <Th>PLANO</Th>
                                            <Th>ATIVO</Th>
                                            <Th>AÇÃO</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            data.usuarios.data.map((e, i) =>
                                                <Tr key={i}>
                                                    <Td>{e.id}</Td>
                                                    <Td width="270px">{e.nome}</Td>
                                                    <Td>{e.celular}</Td>
                                                    <Td>{e.funcao}</Td>
                                                    <Td>{e.plano}</Td>
                                                    <Td>{e.ativo}</Td>
                                                    <Td className='action'>
                                                        <ActionIcon onClick={() => {
                                                            smodal(true);
                                                            suser(e);
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
                        data.usuarios.total > 100 &&
                        <Navigator>
                            <NavIcon onClick={() => getData(search, page === 1 ? 1 : (page - 1))}>navigate_before</NavIcon>
                            <NavText>{data.usuarios.current_page}</NavText>
                            <NavIcon onClick={() => getData(search, page === data.usuarios.total ? data.usuarios.total : (page + 1))}>navigate_next</NavIcon>
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
                    icon="manage_accounts"
                    title="Editar Usuários"
                    data={{ ...user, level: data.auth.funcao }}
                    modal={modal}
                    smodal={smodal}
                    fnc={getData}
                    Component={ModalUsers}
                    height='430px'
                />
            }
        </>
    );
}

export default users;
import React, { useState, useEffect } from 'react';

import { amount, message, slug } from '../../../../../utils/helpers';
import api from '../../../../../utils/api';

import Container from '../../../../../componets/container';
import Nav from '../../components/nav';

import { Message } from '../../../../../utils/styles';

import {
  Content,
  Main,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Image,
  Icon,
} from './styles';

function transactions() {

  const [data, sdata] = useState({});

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {

      const { data } = await api.get(`/competicao/solicitacoes`);

      sdata(data);

    } catch (e) {
      message(e);
    };

  }

  async function transactions(teams_id) {

    console.log(teams_id);

    // try {

    //   const { data } = await api.get(`/competicao/times`);

    //   sdata(data);

    // } catch (e) {
    //   message(e);
    // };

  }

  const component = (
    <Content>
      <Nav user={true} />
      <Main>
        {
          data.length
            ?
            <>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Time</Th>
                    <Th>Liga</Th>
                    <Th>Valor</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    data.map((e, i) =>
                      <Tr key={i}>
                        <Td>{e.nome}</Td>
                        <Td>{e.competicao}</Td>
                        <Td>{amount(e.valor)}</Td>
                        <Td>{e.situacao}</Td>
                      </Tr>
                    )
                  }
                </Tbody>
              </Table>
            </>
            :
            <Message>Nenhum registro encontrado.</Message>
        }
      </Main>
    </Content>
  );

  return (
    <Container
      title='Meus times'
      component={component}
    />
  );
}

export default transactions;
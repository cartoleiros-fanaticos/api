import React, { useState, useEffect } from 'react';

import { amount, message, slug } from '../../../../../utils/helpers';
import api from '../../../../../utils/api';

import Container from '../../../../../componets/container';
import Loading from '../../../../../componets/loading';

import { Message } from '../../../../../utils/styles';

import {
  Content,
  List,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
} from './styles';

function leagues() {

  const [data, sdata] = useState({});
  const [loading, sloading] = useState(true);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {
      const { data } = await api.get(`/competicao/minhas-ligas`);
      sdata(data);
      sloading(false);

    } catch (e) {
      sloading(false);
      message(e);
    };

  }

  const component = (
    <Content>
        {
          loading ?
            <Loading />
            :
            <>
              {
                data.length
                  ?
                  <List>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>id</Th>
                          <Th>Time</Th>
                          <Th>Liga</Th>
                          <Th>Capitão</Th>
                          <Th>Valor</Th>
                          <Th>Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          data.map((e, i) =>
                            <Tr key={i}>
                              <Td>{e.id}</Td>
                              <Td>{e.nome}</Td>
                              <Td>{e.competicao}</Td>
                              <Td>{e.capitao}</Td>
                              <Td>{amount(e.valor)}</Td>
                              <Td>{e.situacao}</Td>
                            </Tr>
                          )
                        }
                      </Tbody>
                    </Table>
                  </List>
                  :
                  <Message>Nenhum registro encontrado.</Message>
              }
            </>
        }
    </Content>
  );

  return (
    <Container
      title='Minhas ligas'
      component={component}
      loading={loading}
    />
  );
}

export default leagues;
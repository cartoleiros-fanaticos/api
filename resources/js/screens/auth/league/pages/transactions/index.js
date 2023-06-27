import React, { useState, useEffect } from 'react';

import { amount, message, slug } from '../../../../../utils/helpers';
import api from '../../../../../utils/api';

import Container from '../../../../../componets/container';
import Loading from '../../../../../componets/loading';

import { Message } from '../../../../../utils/styles';

import {
  Content,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
} from './styles';

function transactions() {

  const [data, sdata] = useState({});
  const [loading, sloading] = useState(true);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {

      sloading(true);
      const { data } = await api.get(`/competicao/solicitacoes`);
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
                <>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>id</Th>
                        <Th>Time</Th>
                        <Th>Liga</Th>
                        <Th>Valor</Th>
                        <Th>Status</Th>
                        <Th>Criado em</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        data.map((e, i) =>
                          <Tr key={i}>
                            <Td>{e.id}</Td>
                            <Td>{e.nome}</Td>
                            <Td>{e.competicao}</Td>
                            <Td>{amount(e.valor)}</Td>
                            <Td status={e.situacao}>{e.situacao}</Td>
                            <Td>{e.criado_em}</Td>
                          </Tr>
                        )
                      }
                    </Tbody>
                  </Table>
                </>
                :
                <Message>Nenhum registro encontrado.</Message>
            }
          </>
      }
    </Content>
  );

  return (
    <Container
      title='MInhas inscrições'
      component={component}
      loading={loading}
    />
  );
}

export default transactions;
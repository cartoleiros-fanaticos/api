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

function teams() {

  const [data, sdata] = useState({});

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {

      const { data } = await api.get(`/competicao/meus-times`);

      sdata(data);

    } catch (e) {
      message(e);
    };

  }

  async function teams(teams_id) {

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
                    <Th>Escudo</Th>
                    <Th>Nome</Th>
                    <Th>Patrimônio</Th>
                    <Th>Ação</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    data.map((e, i) =>
                      <Tr key={i}>
                        <Td><Image src={e.url_escudo_png} /></Td>
                        <Td>{e.nome}</Td>
                        <Td>{e.patrimonio}</Td>
                        <Td><Icon>delete</Icon></Td>
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

export default teams;
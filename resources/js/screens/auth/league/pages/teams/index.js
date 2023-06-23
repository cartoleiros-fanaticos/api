import React, { useState, useEffect } from 'react';

import { amount, message, slug, swal_ask, swal_success } from '../../../../../utils/helpers';
import api from '../../../../../utils/api';

import Container from '../../../../../componets/container';
import Loading from '../../../../../componets/loading';

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

  const [loading, sloading] = useState(true);
  const [data, sdata] = useState({});

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {
      sloading(true);
      const { data } = await api.get(`/competicao/meus-times`);
      sdata(data);
      sloading(false);

    } catch (e) {
      sloading(false);
      message(e);
    };

  }

  async function remove(e) {

    swal_ask('Tem certeza que deseja remover esse time, fazendo isso você irá sair de todas as ligas a qual ele participa.')
      .then(async ({ value }) => {
        if (value) {

          try {

            await api.delete(`/competicao/meus-times/${e.id}`);
            getData();
            swal_success('Time removido com SUCESSO!');

          } catch (e) {
            message(e);
          };

        }
      })

  }

  const component = (
    <Content>
      <Nav user={true} />
      <Main>
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
                              <Td><Icon onClick={() => remove(e)}>delete</Icon></Td>
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
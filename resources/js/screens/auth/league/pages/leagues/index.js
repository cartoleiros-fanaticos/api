import React, { useState, useEffect } from 'react';

import { amount, message, slug } from '../../../../../utils/helpers';
import api from '../../../../../utils/api';

import Container from '../../../../../componets/container';
import Nav from '../../components/nav';

import { Message } from '../../../../../utils/styles';

import {
  Content,
  Main,
  Item,
  Header,
  Description,
  Image,
  Total,
  Teams,
  Footer,
} from './styles';

function leagues() {

  const [data, sdata] = useState({});

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {

      const { data } = await api.get(`/competicao/ligas`);

      sdata(data);

    } catch (e) {
      message(e);
    };

  }

  const component = (
    <Content>
      <Nav user={true} />
      <Main>
        {
          data.data?.length
            ?
            data.data?.map((e, i) =>
              <Item key={i} to={`${e.id}`}>
                <Header>{e.nome}</Header>
                <Description>
                  <Image />
                  <Total>R$ 10.000</Total>
                  <Teams>Tipo {e.tipo}, 2.000 times</Teams>
                </Description>
                <Footer>R$ {amount(e.valor)}</Footer>
              </Item>
            )
            :
            <Message>Nenhum registro encontrado.</Message>
        }
      </Main>
    </Content>
  );

  return (
    <Container
      title='Ligas'
      component={component}
    />
  );
}

export default leagues;
import React, { useState, useEffect } from 'react';

import { useParams, NavLink } from "react-router-dom";

import { amount, message, slug } from '../../../../../utils/helpers';
import api from '../../../../../utils/api';

import Container from '../../../../../componets/container';
import Nav from '../../components/nav';

import { Message } from '../../../../../utils/styles';

import {
  Content,
  Main,
  Tabs,
  Tab,
  Icon,
  Text,
  List,
  Item,
  Header,
  Description,
  Image,
  Total,
  Teams,
  Footer,
} from './styles';

function leagues() {

  const { id } = useParams();

  const [data, sdata] = useState({});

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {

      const { data } = await api.get(`/competicao/ligas/${id}`);

      sdata(data);

    } catch (e) {
      message(e);
    };

  }

  const component = (
    <Content>
      <Nav />
      <Main>
        {
          data.data?.length
            ?
            <>
              <Tabs>
                <Tab>
                  <Icon>emoji_events</Icon>
                  <Text>ANUAL</Text>
                </Tab>
                <Tab>
                  <Icon>emoji_events</Icon>
                  <Text>TURNO</Text>
                </Tab>
                <Tab>
                  <Icon>emoji_events</Icon>
                  <Text>MENSAL</Text>
                </Tab>
                <Tab>
                  <Icon>emoji_events</Icon>
                  <Text>RODADA</Text>
                </Tab>
              </Tabs>
              <List>
                {
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
                }
              </List>
            </>
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
import React, { useState, useEffect } from 'react';

import { useParams, NavLink } from "react-router-dom";

import { amount, message, slug } from '../../../../../utils/helpers';
import api from '../../../../../utils/api';

import Container from '../../../../../componets/container';

import { Message } from '../../../../../utils/styles';

import {
  Content,
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
  const [loading, sloading] = useState(true);
  const [type, stype] = useState('');

  useEffect(() => {
    getData();
  }, [type])

  async function getData() {

    try {

      const { data } = await api.get(`/competicao/ligas/${id}?type=${type}`);

      sdata(data);
      sloading(false);

    } catch (e) {
      message(e);
      sloading(false);
    };

  }

  const component = (
    <Content>
      <Tabs>
        <Tab onClick={() => stype('anual')}>
          <Icon>emoji_events</Icon>
          <Text>ANUAL</Text>
        </Tab>
        <Tab onClick={() => stype('turno')}>
          <Icon>emoji_events</Icon>
          <Text>TURNO</Text>
        </Tab>
        <Tab onClick={() => stype('mensal')}>
          <Icon>emoji_events</Icon>
          <Text>MENSAL</Text>
        </Tab>
        <Tab onClick={() => stype('rodada')}>
          <Icon>emoji_events</Icon>
          <Text>RODADA</Text>
        </Tab>
      </Tabs>
      {
        data.data?.length
          ?
          <List>
            {
              data.data?.map((e, i) =>
                <>
                  <Item key={i} to={`${e.id}`}>
                    <Header>{e.nome}</Header>
                    <Description>
                      <Image />
                      <Total>R$ {amount((e.qtde_times * e.valor) - (e.comissao / 100 * (e.qtde_times * e.valor)))}</Total>
                      <Teams>Tipo {e.tipo}, {e.qtde_times} times</Teams>
                    </Description>
                    <Footer>R$ {amount(e.valor)}</Footer>
                  </Item>
                  <Item key={i} to={`${e.id}`}>
                    <Header>{e.nome}</Header>
                    <Description>
                      <Image />
                      <Total>R$ {amount((e.qtde_times * e.valor) - (e.comissao / 100 * (e.qtde_times * e.valor)))}</Total>
                      <Teams>Tipo {e.tipo}, {e.qtde_times} times</Teams>
                    </Description>
                    <Footer>R$ {amount(e.valor)}</Footer>
                  </Item>
                </>
              )
            }
          </List>
          :
          <Message>Nenhum registro encontrado.</Message>
      }
    </Content>
  );

  return (
    <Container
      title='Ligas'
      component={component}
      loading={loading}
    />
  );
}

export default leagues;
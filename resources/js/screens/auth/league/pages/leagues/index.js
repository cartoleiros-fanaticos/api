import React, { useState, useEffect } from 'react';

import { useParams, NavLink } from "react-router-dom";
import Loader from 'react-loader-spinner';

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
import loading from '../../../../../componets/loading';

function leagues() {

  const { id } = useParams();

  const [data, sdata] = useState({});

  const [loading, sloading] = useState({
    anual: false,
    turno: false,
    mensal: false,
    rodada: false,
  });

  const [loading_page, sloadingpage] = useState(true);
  const [type, stype] = useState('');

  useEffect(() => {
    loading[type] = true;
    console.log(loading);
    sloading({ ...loading });
    getData();
  }, [type])

  async function getData() {

    try {

      const { data } = await api.get(`/competicao/ligas/${id}?type=${type}`);

      sdata(data);
      sloadingpage(false);

      sloading({
        anual: false,
        turno: false,
        mensal: false,
        rodada: false,
      });

    } catch (e) {
      message(e);
      sloadingpage(false);

      sloading({
        anual: false,
        turno: false,
        mensal: false,
        rodada: false,
      });

    };

  }

  const component = (
    <Content>
      <Tabs>
        <Tab onClick={() => stype('anual')}>
          <Icon>emoji_events</Icon>
          <Text>
            {loading.anual ? <Loader visible={true} style={{ display: 'block', textAlign: 'center' }} type="TailSpin" color="#000" height={24} width={24} /> : 'ANUAL'}
          </Text>
        </Tab>
        <Tab onClick={() => stype('turno')}>
          <Icon>emoji_events</Icon>
          <Text>
            {loading.turno ? <Loader visible={true} style={{ display: 'block', textAlign: 'center' }} type="TailSpin" color="#000" height={24} width={24} /> : 'TURNO'}
          </Text>
        </Tab>
        <Tab onClick={() => stype('mensal')}>
          <Icon>emoji_events</Icon>
          <Text>
            {loading.mensal ? <Loader visible={true} style={{ display: 'block', textAlign: 'center' }} type="TailSpin" color="#000" height={24} width={24} /> : 'MENSAL'}
          </Text>
        </Tab>
        <Tab onClick={() => stype('rodada')}>
          <Icon>emoji_events</Icon>
          <Text>
            {loading.rodada ? <Loader visible={true} style={{ display: 'block', textAlign: 'center' }} type="TailSpin" color="#000" height={24} width={24} /> : 'RODADA'}
          </Text>
        </Tab>
      </Tabs>
      {
        data.data?.length
          ?
          <List>
            {
              data.data?.map((e, i) =>
                  <Item key={e.id} to={`${e.id}`}>
                    <Header>{e.nome}</Header>
                    <Description>
                      <Image />
                      <Total>R$ {amount((e.qtde_times * e.valor) - (e.comissao / 100 * (e.qtde_times * e.valor)))}</Total>
                      <Teams>Tipo {e.tipo}, {e.qtde_times} times</Teams>
                    </Description>
                    <Footer>R$ {amount(e.valor)}</Footer>
                  </Item>
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
      loadingpage={loading_page}
    />
  );
}

export default leagues;
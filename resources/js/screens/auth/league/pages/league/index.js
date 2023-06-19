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
} from './styles';

function league() {

  const { round } = useParams();

  const [data, sdata] = useState({});

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {

      const { data } = await api.get(`/competicao/${round}`);

      sdata(data);

    } catch (e) {
      message(e);
    };

  }

  const component = (
    <Content>
      <Nav user={true} />
      <Main>

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

export default league;
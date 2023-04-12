import React, { useState, useEffect } from 'react';

import api from '../../utils/api';

import { message } from '../../utils/helpers';

import Loading from '../../componets/loading';

import {
  Container,
  Match,
  Local,
  Time,
  Address,
  Team,  
  Shield,
  TeamName,
  Versus,
} from './styles';

function scouts({ data: { id } }) {

  const [data, sdata] = useState([]);
  const [loading, sloading] = useState(true);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {

      const { data } = await api.get(`parciais/clubes/${id}`);

      sdata(data);
      sloading(false);

    } catch (e) {
      message(e);
      sloading(false);
    };

  }

  return (
    <Container>
      {
        loading ?
          <Loading />
          :
          <Match>
            <Local>
              <Time>{data.partida.partida_data}</Time>
              <Address>{data.partida.local}</Address>
            </Local>
            <Team>
              <Shield src={data.partida.clube_casa.escudo} />
              <TeamName>{data.partida.clube_casa.nome}</TeamName>
            </Team>
            <Versus>x</Versus>
            <Team>
              <Shield src={data.partida.clube_visitante.escudo} />
              <TeamName>{data.partida.clube_visitante.nome}</TeamName>
            </Team>
          </Match>
      }
    </Container>
  );
}

export default scouts;
import React, { useState, useEffect } from 'react';

import { message, download } from '../../../utils/helpers';
import api from '../../../utils/api';

import {
  Content,
  Picker,
  Box,
  Header,
  Title,
  Icon,
  List,
  Item,
  ContainerTeams,
  Texts,
  Text1,
  Text2,
  Download,
  ListTeams,
  Teams,
  Values,
  Shield,
  Value,
  Versus,
  Total,
} from './styles';

import Container from '../../../componets/container';

function crossing() {

  const [data, sdata] = useState({});

  const [loading, sloading] = useState(true);
  const [loading_page, sloadingpage] = useState(true);

  useEffect(() => {
    getData();
  }, [])

  async function enter() {

    try {

      const { data } = await api.get(`cruzamento`);

      sdata(data);

    } catch (e) {
      message(e);
    };

  }

  async function getData() {

    try {

      sloadingpage(true);

      const { data } = await api.get(`cruzamento?scout=G`);

      sdata(data);
      sloadingpage(false);

    } catch (e) {
      message(e);
      sloadingpage(false);
    };

  }

  const component = () => (
    <Content>
      <Picker>
        <Box>
          <Header>
            <Title>Gols</Title>
            <Icon>play_for_work</Icon>
          </Header>
          <List>
            <Item onClick={() => enter('scout', 'G')}>Gols</Item>
            <Item onClick={() => enter('scout', 'A')}>Assistência</Item>
            <Item onClick={() => enter('scout', 'DE')}>Defesas</Item>
            <Item onClick={() => enter('scout', 'F')}>Finalização</Item>
            <Item onClick={() => enter('scout', 'FS')}>Falta sofrida</Item>
            <Item onClick={() => enter('scout', 'DS')}>Desarmes</Item>
            <Item onClick={() => enter('scout', 'SG')}>Saldos de gols</Item>
          </List>
        </Box>
        <Box>
          <Header>
            <Title>Todas as posições</Title>
            <Icon>play_for_work</Icon>
          </Header>
          <List>
            <Item onClick={() => enter('posicao_id', '1')}>Todas as posições</Item>
            <Item onClick={() => enter('posicao_id', '3')}>Zagueiros</Item>
            <Item onClick={() => enter('posicao_id', '2')}>Lateral</Item>
            <Item onClick={() => enter('posicao_id', '4')}>Meias</Item>
            <Item onClick={() => enter('posicao_id', '5')}>Atacante</Item>
            <Item onClick={() => enter('posicao_id', '1')}>Goleiro</Item>
          </List>
        </Box>
        <Box>
          <Header>
            <Title>Todas as rodadas</Title>
            <Icon>play_for_work</Icon>
          </Header>
          <List>
            <Item onClick={() => enter('rodada_id', nListl)}>Todas as rodadas</Item>
            <Item onClick={() => enter('rodada_id', 2)}>Últimas 2</Item>
            <Item onClick={() => enter('rodada_id', 3)}>Últimas 3</Item>
            <Item onClick={() => enter('rodada_id', 5)}>Últimas 5</Item>
          </List>
        </Box>
        <Box>
          <Header>
            <Title>Só casa x Só fora</Title>
            <Icon>play_for_work</Icon>
          </Header>
          <List>
            <Item onClick={() => enter('casaxfora', null)}>Só casa x Só fora</Item>
            <Item onClick={() => enter('totalxtotal', 2)}>Total x Total</Item>
          </List>
        </Box>
      </Picker >
      <ContainerTeams>
        <Texts>
          <Text1>Conquistados</Text1>
          <Text2>EM CASA</Text2>
          <Text1>Cedidos</Text1>
          <Text2>FORA</Text2>
          <Download onClick={() => download(data, 'conquistados_cedidos')}>Download</Download>
        </Texts>
        <ListTeams>
          {
            data.partidas.map((e, i) =>
              <Teams key={i}>
                <Values>
                  <Shield src={data.clubes[e.clube_casa_id].escudo} />
                  <Value>{data.scouts.conquista_casa.length ? data.scouts.conquista_casa[e.clube_casa_id].pontos : 0}</Value>
                  <Versus>x</Versus>
                  <Value>{data.scouts.cedidas_fora.length ? data.scouts.cedidas_fora[e.clube_visitante_id].pontos : 0}</Value>
                  <Shield src={data.clubes[e.clube_visitante_id].escudo} />
                </Values>
                <Total>
                  {
                    (data.scouts.conquista_casa.length ? data.scouts.conquista_casa[e.clube_casa_id].pontos : 0)
                    +
                    (data.scouts.cedidas_fora.length ? data.scouts.cedidas_fora[e.clube_visitante_id].pontos : 0)
                  }
                </Total>
              </Teams>
            )
          }
        </ListTeams>
      </ContainerTeams>
      <ContainerTeams>
        <Texts>
          <Text1>Cedidos</Text1>
          <Text2>EM CASA</Text2>
          <Text1>Conquistados</Text1>
          <Text2>FORA</Text2>
          <Download onClick={() => download(data, 'cedidas_conquistados')}>Download</Download>
        </Texts>
        <ListTeams>
          {
            data.partidas.map((e, i) =>
              <Teams key={i}>
                <Values>
                  <Shield src={data.clubes[e.clube_casa_id].escudo} />
                  <Value>{data.scouts.cedidas_casa.length ? data.scouts.cedidas_casa[e.clube_casa_id].pontos : 0}</Value>
                  <Versus>x</Versus>
                  <Value>{data.scouts.conquista_fora.length ? data.scouts.conquista_fora[e.clube_visitante_id].pontos : 0}</Value>
                  <Shield src={data.clubes[e.clube_visitante_id].escudo} />
                </Values>
                <Total>
                  {
                    (data.scouts.cedidas_casa.length ? data.scouts.cedidas_casa[e.clube_casa_id].pontos : 0)
                    +
                    (data.scouts.conquista_fora.length ? data.scouts.conquista_fora[e.clube_visitante_id].pontos : 0)
                  }
                </Total>
              </Teams>
            )
          }
        </ListTeams>
      </ContainerTeams>
    </Content >
  );

  return (
    <Container
      title='Cruzamento de scouts ( Gols )'
      Component={component}
      loading={loading_page}
    />
  );
}

export default crossing;
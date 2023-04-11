import React, { useState, useEffect } from 'react';

import { message, download, swal_warning  } from '../../../../utils/helpers';
import api from '../../../../utils/api';

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
  Private,
  Value,
  Versus,
  Total,
  Tips,
  TipsTitle,
  Text3,
} from './styles';

import Container from '../../../../componets/container';

function crossing() {

  const user = JSON.parse(localStorage.getItem('user'));

  const [filter, sfilter] = useState({
    scout: { value: '', name: 'Pontos' },
    posicao_id: { value: '', name: undefined },
    ultimas_rodadas: { value: 38, name: 'Todas as rodadas' },
    total: { value: 'Nâo', name: 'Só casa x Só fora' },
  });

  const [data, sdata] = useState({});

  const [loading, sloading] = useState(true);
  const [loading_page, sloadingpage] = useState(true);

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    enter();
  }, [filter])

  async function enter() {

    try {

      const { data } = await api.get(`cruzamento?posicao_id=${filter.posicao_id.value}&ultimas_rodadas=${filter.ultimas_rodadas.value}&total=${filter.total.value}&tipo=pontos`);

      sdata(data);

    } catch (e) {
      message(e);
    };

  }

  async function getData() {

    try {

      sloadingpage(true);

      const { data } = await api.get(`cruzamento?tipo=pontos`);

      sdata(data);
      sloadingpage(false);

    } catch (e) {
      message(e);
      sloadingpage(false);
    };

  }

  const component = (
    <Content>
      <Picker>
        <Box>
          <Header>
            <Title>{filter.posicao_id.name || 'Todas as posições'}</Title>
            <Icon>play_for_work</Icon>
          </Header>
          <List>
            <Item onClick={() => sfilter({ ...filter, posicao_id: { value: 1, name: 'Todas as posições' } })}>Todas as posições</Item>
            <Item onClick={() => sfilter({ ...filter, posicao_id: { value: 3, name: 'Zagueiros' } })}>Zagueiros</Item>
            <Item onClick={() => sfilter({ ...filter, posicao_id: { value: 2, name: 'Lateral' } })}>Lateral</Item>
            <Item onClick={() => sfilter({ ...filter, posicao_id: { value: 4, name: 'Meias' } })}>Meias</Item>
            <Item onClick={() => sfilter({ ...filter, posicao_id: { value: 5, name: 'Atacante' } })}>Atacante</Item>
            <Item onClick={() => sfilter({ ...filter, posicao_id: { value: 1, name: 'Goleiro' } })}>Goleiro</Item>
          </List>
        </Box>
        <Box>
          <Header>
            <Title>{filter.ultimas_rodadas.name}</Title>
            <Icon>play_for_work</Icon>
          </Header>
          <List>
            <Item onClick={() => sfilter({ ...filter, ultimas_rodadas: { value: 38, name: 'Todas as rodadas' } })}>Todas as rodadas</Item>
            <Item onClick={() => sfilter({ ...filter, ultimas_rodadas: { value: 2, name: 'Últimas 2' } })}>Últimas 2</Item>
            <Item onClick={() => sfilter({ ...filter, ultimas_rodadas: { value: 3, name: 'Últimas 3' } })}>Últimas 3</Item>
            <Item onClick={() => sfilter({ ...filter, ultimas_rodadas: { value: 5, name: 'Últimas 5' } })}>Últimas 5</Item>
          </List>
        </Box>
        <Box>
          <Header>
            <Title>{filter.total.name}</Title>
            <Icon>play_for_work</Icon>
          </Header>
          <List>
            <Item onClick={() => sfilter({ ...filter, total: { value: 'Não', name: 'Só casa x Só fora' } })}>Só casa x Só fora</Item>
            <Item onClick={() => sfilter({ ...filter, total: { value: 'Sim', name: 'Total x Total' } })}>Total x Total</Item>
          </List>
        </Box>
      </Picker>
      <ContainerTeams>
        <Texts>
          <Text1>Conquistados</Text1>
          <Text2>EM CASA</Text2>
          <Text1>Cedidos</Text1>
          <Text2>FORA</Text2>
          <Download onClick={() => {

            if (user.plano === 'Free Cartoleiro') {
              swal_warning('Opção exclusiva para SÓCIO CARTOLEIRO');
            } else {
              download(data, 'CONQUISTADOS', 'CEDIDOS', filter)
            }

          }}>Download</Download>
        </Texts>
        <ListTeams>
          {
            data.partidas?.map((e, i) =>
              <Teams key={i}>
                <Values>
                  <Shield src={data.clubes[e.clube_casa_id].escudo} />
                  {
                    i >= 4 && user.plano === 'Free Cartoleiro'
                      ?
                      <Private to="/auth/planos">Sócio</Private>
                      :
                      <Value>{data.data.conquista_casa.length ? data.data.conquista_casa[e.clube_casa_id].pontos : 0}</Value>
                  }
                  <Versus>x</Versus>
                  {
                    i >= 4 && user.plano === 'Free Cartoleiro'
                      ?
                      <Private to="/auth/planos">Sócio</Private>
                      :
                      <Value>{data.data.cedidas_fora.length ? data.data.cedidas_fora[e.clube_visitante_id].pontos : 0}</Value>
                  }
                  <Shield src={data.clubes[e.clube_visitante_id].escudo} />
                </Values>
                <Total>
                  {
                    i >= 4 && user.plano === 'Free Cartoleiro'
                      ?
                      <Private to="/auth/planos">Sócio</Private>
                      :
                      <>
                        {
                          (data.data.conquista_casa.length ? data.data.conquista_casa[e.clube_casa_id].pontos : 0)
                          +
                          (data.data.cedidas_fora.length ? data.data.cedidas_fora[e.clube_visitante_id].pontos : 0)
                        }
                        {filter.posicao_id.value && <Icon title="Clique para ver cruzamentos de posição por clubes.">add_circle</Icon>}
                      </>
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
          <Download onClick={() => {
            if (user.plano === 'Free Cartoleiro') {
              swal_warning('Opção exclusiva para SÓCIO CARTOLEIRO');
            } else {
              download(data, 'CEDIDOS', 'CONQUISTADOS', filter)
            }

          }}>Download</Download>
        </Texts>
        <ListTeams>
          {
            data.partidas?.map((e, i) =>
              <Teams key={i}>
                <Values>
                  <Shield src={data.clubes[e.clube_casa_id].escudo} />
                  {
                    i >= 4 && user.plano === 'Free Cartoleiro'
                      ?
                      <Private to="/auth/planos">Sócio</Private>
                      :
                      <Value>{data.data.cedidas_casa.length ? data.data.cedidas_casa[e.clube_casa_id].pontos : 0}</Value>
                  }
                  <Versus>x</Versus>
                  {
                    i >= 4 && user.plano === 'Free Cartoleiro'
                      ?
                      <Private to="/auth/planos">Sócio</Private>
                      :
                      <Value>{data.data.conquista_fora.length ? data.data.conquista_fora[e.clube_visitante_id].pontos : 0}</Value>
                  }
                  <Shield src={data.clubes[e.clube_visitante_id].escudo} />
                </Values>
                <Total>
                  {
                    i >= 4 && user.plano === 'Free Cartoleiro'
                      ?
                      <Private to="/auth/planos">Sócio</Private>
                      :
                      <>
                        {
                          (data.data.cedidas_casa.length ? data.data.cedidas_casa[e.clube_casa_id].pontos : 0)
                          +
                          (data.data.conquista_fora.length ? data.data.conquista_fora[e.clube_visitante_id].pontos : 0)
                        }
                        {filter.posicao_id.value && <Icon title="Clique para ver cruzamentos de posição por clubes.">add_circle</Icon>}
                      </>
                  }
                </Total>
              </Teams>
            )
          }
        </ListTeams>
      </ContainerTeams>
      <Tips>
        <TipsTitle>Cruzada de pontos</TipsTitle>
        <Text3>Aqui você verá um cruzamento entre os pontos cedidos e conquistados dos confrontos da rodada atual do cartola fc.</Text3>
        <Text3>Os pontos conquistados são os pontos conquistados pela equipe.</Text3>
        <Text3>Os pontos cedidos: são quantos pontos as equipes adversárias pontuaram jogando contra.</Text3>
        <Text3>Pontos apenas de jogos valido para o cartola FC.</Text3>
      </Tips>
    </Content>
  );

  return (
    <Container
      title='Cruzamento de pontos'
      component={component}
      loading={loading_page}
    />
  );
}

export default crossing;
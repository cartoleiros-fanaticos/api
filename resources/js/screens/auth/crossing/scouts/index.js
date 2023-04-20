import React, { useState, useEffect } from 'react';

import { message, download, swal_warning } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Modal from '../../../../componets/modal';
import ModalMatches from '../../../../modal/matches';

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
  Obs,
  Tips,
  TipsTitle,
  Text3,
} from './styles';

import Container from '../../../../componets/container';

function crossing() {

  const user = JSON.parse(localStorage.getItem('user'));

  const [modal, smodal] = useState(false);
  const [loading_matches, sloadingmatches] = useState(false);
  const [data_matches, sdatamatches] = useState({});

  const [filter, sfilter] = useState({
    scout: { value: 'G', name: 'Gols' },
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
    if (Object.keys(data).length) enter();
  }, [filter])

  async function enter() {

    try {

      const { data } = await api.get(`cruzamento?scout=${filter.scout.value}&posicao_id=${filter.posicao_id.value}&ultimas_rodadas=${filter.ultimas_rodadas.value}&total=${filter.total.value}&tipo=scouts`);

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

  async function pontos_cedidos(atleta) {

    try {

      smodal(true);
      sloadingmatches(true);

      const { data } = await api.get(`pontos-cedidos/atletas?time_id=${atleta.clube_id}&posicao_id=${atleta.posicao_id}`);

      sdatamatches(data);
      sloadingmatches(false);

    } catch (e) {
      message(e);
      sloadingmatches(false);
    };

  }

  function close(e) {

    // if (window.innerWidth < 900) {

    //   e.target.parentElement.style.cssText = `
    //       height: 0;
    //       visibility: hidden;
    //   `;

    // }

  }

  const component = (
    <Content>
      <Picker>
        <Box>
          <Header>
            <Title>{filter.scout.name}</Title>
            <Icon>play_for_work</Icon>
          </Header>
          <List>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, scout: { value: 'G', name: 'Gols' } }) }}>Gols</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, scout: { value: 'A', name: 'Assistência' } }) }}>Assistência</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, scout: { value: 'DE', name: 'Defesas' } }) }}>Defesas</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, scout: { value: 'F', name: 'Finalização' } }) }}>Finalização</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, scout: { value: 'FS', name: 'Falta sofrida' } }) }}>Falta sofrida</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, scout: { value: 'DS', name: 'Desarmes' } }) }}>Desarmes</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, scout: { value: 'SG', name: 'Saldos de gols' } }) }}>Saldos de gols</Item>
          </List>
        </Box>
        <Box>
          <Header>
            <Title>{filter.posicao_id.name || 'Todas as posições'}</Title>
            <Icon>play_for_work</Icon>
          </Header>
          <List>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, posicao_id: { value: 1, name: 'Todas as posições' } }) }}>Todas as posições</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, posicao_id: { value: 3, name: 'Zagueiros' } }) }}>Zagueiros</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, posicao_id: { value: 2, name: 'Lateral' } }) }}>Lateral</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, posicao_id: { value: 4, name: 'Meias' } }) }}>Meias</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, posicao_id: { value: 5, name: 'Atacante' } }) }}>Atacante</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, posicao_id: { value: 1, name: 'Goleiro' } }) }}>Goleiro</Item>
          </List>
        </Box>
        <Box>
          <Header>
            <Title>{filter.ultimas_rodadas.name}</Title>
            <Icon>play_for_work</Icon>
          </Header>
          <List>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, ultimas_rodadas: { value: 38, name: 'Todas as rodadas' } }) }}>Todas as rodadas</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, ultimas_rodadas: { value: 2, name: 'Últimas 2' } }) }}>Últimas 2</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, ultimas_rodadas: { value: 3, name: 'Últimas 3' } }) }}>Últimas 3</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, ultimas_rodadas: { value: 5, name: 'Últimas 5' } }) }}>Últimas 5</Item>
          </List>
        </Box>
        <Box>
          <Header>
            <Title>{filter.total.name}</Title>
            <Icon>play_for_work</Icon>
          </Header>
          <List>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, total: { value: 'Não', name: 'Só casa x Só fora' } }) }}>Só casa x Só fora</Item>
            <Item onClick={(e) => { close(e); sfilter({ ...filter, total: { value: 'Sim', name: 'Total x Total' } }) }}>Total x Total</Item>
          </List>
        </Box>
      </Picker >
      <ContainerTeams>
        <Texts>
          <Text1>Conquistados</Text1>
          <Text2>{filter.total.value === 'Sim' ? 'TOTAL' : 'EM CASA'}</Text2>
          <Text1>Cedidos</Text1>
          <Text2>{filter.total.value === 'Sim' ? 'TOTAL' : 'FORA'}</Text2>
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
                      <Value>{data.data.conquista_casa[e.clube_casa_id]?.pontos || 0}</Value>
                  }
                  <Versus>x</Versus>
                  {
                    i >= 4 && user.plano === 'Free Cartoleiro'
                      ?
                      <Private to="/auth/planos">Sócio</Private>
                      :
                      <Value>{data.data.cedidas_fora[e.clube_visitante_id]?.pontos || 0}</Value>
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
                          parseInt(data.data.conquista_casa[e.clube_casa_id]?.pontos || 0)
                          +
                          parseInt(data.data.cedidas_fora[e.clube_visitante_id]?.pontos || 0)
                        }
                        {filter.posicao_id.value && <Icon onClick={() => pontos_cedidos({ clube_id: e.clube_casa_id, posicao_id: filter.posicao_id.value })} title="Clique para ver cruzamentos de posição por clubes.">add_circle</Icon>}
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
          <Text2>{filter.total.value === 'Sim' ? 'TOTAL' : 'EM CASA'}</Text2>
          <Text1>Conquistados</Text1>
          <Text2>{filter.total.value === 'Sim' ? 'TOTAL' : 'FORA'}</Text2>
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
                      <Value>{data.data.cedidas_casa[e.clube_casa_id]?.pontos || 0}</Value>
                  }
                  <Versus>x</Versus>
                  {
                    i >= 4 && user.plano === 'Free Cartoleiro'
                      ?
                      <Private to="/auth/planos">Sócio</Private>
                      :
                      <Value>{data.data.conquista_fora[e.clube_visitante_id]?.pontos || 0}</Value>
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
                          parseInt(data.data.cedidas_casa[e.clube_casa_id]?.pontos || 0)
                          +
                          parseInt(data.data.conquista_fora[e.clube_visitante_id]?.pontos || 0)
                        }
                        {filter.posicao_id.value && <Icon onClick={() => pontos_cedidos({ clube_id: e.clube_visitante_id, posicao_id: filter.posicao_id.value })} title="Clique para ver cruzamentos de posição por clubes.">add_circle</Icon>}
                      </>
                  }
                </Total>
              </Teams>
            )
          }
        </ListTeams>
      </ContainerTeams>
      {data.rodada_atual < 3 && <Obs>Obs.: Os dados dessa área só iram aparecer a partir da terceira rodada.</Obs>}
      <Tips>
        <TipsTitle>Cruzada de Scouts</TipsTitle>
        <Text3>Aqui você verá um cruzamento entre os scouts cedidos e conquistados dos confrontos da rodada atual do cartola fc.</Text3>
        <Text3>Os scouts conquistados são os pontos conquistados pela equipe.</Text3>
        <Text3>Os scouts cedidos: são quantos pontos as equipes adversárias pontuaram jogando contra.</Text3>
        <Text3>Os scouts gols contras (GC) não são contabilizados.</Text3>
        <Text3>Scouts apenas de jogos valido para o cartola FC.</Text3>
      </Tips>
    </Content >
  );

  return (
    <>
      <Container
        title='Cruzamento de scouts ( Gols )'
        component={component}
        loading={loading_page}
      />
      {
        modal &&
        <Modal
          icon="security"
          title="Pontos cedidos por time e posição"
          modal={modal}
          smodal={smodal}
          Component={ModalMatches}
          data={data_matches}
          loading={loading_matches}
          height="500px"
        />
      }
    </>
  );
}

export default crossing;
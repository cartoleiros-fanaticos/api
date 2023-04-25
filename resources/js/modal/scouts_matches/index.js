import React, { useState, useEffect } from 'react';

import api from '../../utils/api';

import { message, amount } from '../../utils/helpers';

import Loading from '../../componets/loading';
import Player from '../../componets/player';
import Live from '../../componets/live';

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
  Players,
  ContainerLive,
  List,
  Score,
  ScoreText,
  ScoreValue,
} from './styles';

import { Message } from '../../utils/styles';

function scouts({ data: { id } }) {

  const [uri, suri] = useState('');

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

      suri(`parciais/clubes/${id}`);

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
            <Players>
              {data.game.status_mercado === 2 &&
                <ContainerLive>
                  <Live
                    uri={uri}
                    fnc={(data) => {
                      sdata(data);
                    }}
                  />

                </ContainerLive>
              }
              <List>
                {
                  data.partida.clube_casa.atletas.length ?
                    <>
                      <Score>
                        <ScoreText>Pontuação:</ScoreText>
                        <ScoreValue value={data.partida.clube_casa.pontuacao}>{amount(data.partida.clube_casa.pontuacao)} pts</ScoreValue>
                      </Score>
                      {
                        data.partida.clube_casa.atletas.map((e, i) =>
                          <Player
                            key={i}
                            data={e}
                            scouts={data.scouts}
                            parciais={data.partida.clube_casa.parciais}
                          />
                        )
                      }
                    </>
                    :
                    <Message>Ainda não há dados.</Message>
                }
              </List>
              <List>
                {
                  data.partida.clube_visitante.atletas.length ?
                    <>
                      <Score>
                        <ScoreText>Pontuação:</ScoreText>
                        <ScoreValue value={data.partida.clube_visitante.pontuacao}>{amount(data.partida.clube_visitante.pontuacao)} pts</ScoreValue>
                      </Score>
                      {
                        data.partida.clube_visitante.atletas.map((e, i) =>
                          <Player
                            key={i}
                            data={e}
                            scouts={data.scouts}
                            parciais={data.partida.clube_visitante.parciais}
                          />
                        )
                      }
                    </>
                    :
                    <Message>Ainda não há dados.</Message>
                }
              </List>
            </Players>
          </Match>
      }
    </Container>
  );
}

export default scouts;
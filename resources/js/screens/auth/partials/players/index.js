import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';
import Player from '../../../../componets/player';
import Live from '../../../../componets/live';
import Search from '../../../../componets/search';

import Modal from '../../../../componets/modal';
import ModalLeague from '../../../../modal/leagues';

import { useNavigate } from "react-router-dom";

import {
  Content,
  List,
} from './styles';

import { Message } from '../../../../utils/styles';

function players() {

  let navigate = useNavigate();

  const [modal, smodal] = useState(false);

  const [control, scontrol] = useState('start');

  const [data, sdata] = useState({});
  const [players, splayers] = useState([]);

  const [params, sparams] = useState({});

  const [loading_page, sloadingpage] = useState(true);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {

      sloadingpage(true);

      const { data } = await api.get(`parciais/atletas`);

      sdata(data);
      splayers(data.atletas);
      sloadingpage(false);

    } catch (e) {
      message(e);
      sloadingpage(false);
    };

  }

  function search(event) {

    const value = event.target.value.toLowerCase();

    if (value && value.length >= 3) {
      scontrol('clean');
      const atletas = players.filter(e => e.apelido.toLowerCase().indexOf(value) != -1);
      sdata({ ...data, atletas });
    } else if (value === '') {
      sdata({ ...data, atletas: players });
      scontrol('start');
    }
  }

  const component = (
    <Content>
      {
        data.atletas?.length
          ?
          <>
            <List>
              <Search
                placeholder="Digite nome do atleta"
                icon="directions_run"
                onChange={search}
              />
              {data.game.status_mercado === 2 &&
                <Live
                  control={control}
                  uri="parciais/atletas"
                  fnc={(data) => {
                    sdata(data);
                    splayers(data.atletas);
                  }}

                />
              }

              {
                data.atletas.map((e, i) =>
                  <Player
                    key={i}
                    data={e}
                    scouts={data.scouts}
                    parciais={data.parciais}
                    fnc={(player) => {
                      sparams(player);
                      smodal(true)
                    }}
                  />
                )
              }
            </List>
          </>
          :
          <Message>Nenhum registro encontrado.</Message>
      }

    </Content>
  );

  return (
    <>
      <Container
        title='Parciais jogadores'
        component={component}
        loading={loading_page}
      />
      {
        modal &&
        <Modal
          icon="list"
          title="Ligas do cartola"
          modal={modal}
          smodal={smodal}
          Component={ModalLeague}
          fnc={(liga) => {
            navigate(`/atletas/${params.atleta_id}/${liga.liga_id}/${liga.slug}`);
          }}
          height='520px'
        />
      }
    </>
  );
}

export default players;
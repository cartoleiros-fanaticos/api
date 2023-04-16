import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';
import Player from '../../../../componets/player';
import Live from '../../../../componets/live';

import {
  Content,
  List,
  Label,
  Icon,
  Input,
} from './styles';

import { Message } from '../../../../utils/styles';

function players() {

  const [control, scontrol] = useState('start');

  const [data, sdata] = useState({});
  const [players, splayers] = useState([]);

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
              <Label>
                <Icon>directions_run</Icon>
                <Input onChange={search} />
              </Label>

              <Live
                control={control}
                uri="parciais/atletas"
                fnc={(data) => {
                  sdata(data);
                  splayers(data.atletas);
                }}

              />

              {
                data.atletas.map((e, i) =>
                  <Player
                    key={i}
                    data={e}
                    scouts={data.scouts}
                    parciais={data.parciais}
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
    <Container
      title='Parciais jogadores'
      component={component}
      loading={loading_page}
    />
  );
}

export default players;
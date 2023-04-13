import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';
import Player from '../../../../componets/player';

import {
  Content,
  List,
} from './styles';

import { Message } from '../../../../utils/styles';

function players() {

  useEffect(() => {
    getData();
  }, [])

  const [data, sdata] = useState({});

  const [loading_page, sloadingpage] = useState(true);

  async function getData() {

    try {

      sloadingpage(true);

      const { data } = await api.get(`parciais/atletas`);

      sdata(data);
      sloadingpage(false);

    } catch (e) {
      message(e);
      sloadingpage(false);
    };

  }

  const component = (
    <Content>
      {
        data.atletas?.length
          ?
          <>
            <List>
              {
                data.atletas.map((e, i) =>
                  <Player
                    data={e}
                    scouts={data.scouts}
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
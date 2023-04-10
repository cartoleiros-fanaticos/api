import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Container from '../../../../componets/container';
import Player from '../../../../componets/player';

import {
  Content,
  List,
  // Item,
  // Photo,
  // Name,
  // Text1,
  // Text2,
  // Score,
  // Scouts,
  // Scout,
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

  const component = () => (
    <Content>
      {
        data.atletas.length
          ?
          <>
            <List>
              {
                data.atletas.map((e, i) =>
                  <Player
                    data={e}
                    scouts={data.scouts}
                  />
                  // <Item key={i}>
                  //   <Photo src={e.foto} />
                  //   <Name>
                  //     <Text1>{e.apelido}</Text1>
                  //     <Text2>{e.posicao}</Text2>
                  //   </Name>
                  //   <Score>
                  //     <Text1>{amount(e.pontuacao)}</Text1>
                  //     <Text2>C$ {amount(e.variacao_num)}</Text2>
                  //     <Scouts>
                  //       {
                  //         data.scouts.map(item =>
                  //           <Scout value={e[item.sigla]} type={item.tipo}>{`${e[item.sigla]}${item.sigla}`}</Scout>
                  //         )
                  //       }
                  //     </Scouts>
                  //   </Score>
                  // </Item>
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
      Component={component}
      loading={loading_page}
    />
  );
}

export default players;
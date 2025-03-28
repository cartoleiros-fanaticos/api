import React from 'react';

import { amount } from '../../utils/helpers';
import Player from '../../componets/player';

import {
  Container,
  Title,
  Content,
  Item,
  Header,
  Shield,
  Info,
  Teams,
  Time,
  Score,
  Total,
  Text,
} from './styles';

import { Message } from '../../utils/styles';

function matches({ data }) {

  return (
    <Container>
      {
        (data?.confrontos && data.confrontos.length)
          ?
          <>
            <Title>Pontuação cedida do time do {data.time.nome.toUpperCase()} para os {data.posicao.nome.toUpperCase()}.</Title>
            {
              data.confrontos.map((e, i) =>
                <Item key={i}>
                  <Header>
                    <Shield src={e.escudo_casa} />
                    <Info>
                      <Teams>{e.confronto}</Teams>
                      <Time>{`${e.partida_data} - Rodada ${e.rodada}`}</Time>
                    </Info>
                    <Shield src={e.escudo_fora} />
                  </Header>
                  <Content>
                    {
                      e.atletas.map(e =>
                        <>
                          <Player
                            key={i}
                            data={e}
                            scouts={data.scouts}
                            parciais={data.parciais}
                          />
                          {/* <Players>
                            <Player>
                              <Photo src={e.foto} />
                              <NameScouts>
                                <Name>{e.apelido}</Name>
                                <Scouts>
                                  {
                                    data.scouts.map(item =>
                                      <Scout value={e[item.sigla]} type={item.tipo}>{`${e[item.sigla]}${item.sigla}`}</Scout>
                                    )
                                  }
                                </Scouts>
                              </NameScouts>
                            </Player>
                            <Score value={e.pontuacao}>{amount(e.pontuacao)}</Score>
                          </Players> */}
                        </>
                      )
                    }
                    <Total>
                      <Text>Total:</Text>
                      <Score value={e.pontuacao_total}>{amount(e.pontuacao_total)}</Score>
                    </Total>
                  </Content>
                </Item>
              )
            }
          </>
          :
          <Message>Nenhum confronto encontrado</Message>
      }

    </Container >
  );
}

export default matches;
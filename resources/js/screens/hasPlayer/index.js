import React, { useEffect, useState } from 'react';

import api from '../../utils/api';
import { amount, message } from '../../utils/helpers';

import Loading from '../../componets/loading';

import {
  Container,
  Content,
  Header,
  Logo,
  Player,
  Photo,
  Info,
  Nickname,
  Club,
  Position,
  Share,
  Icon,
  Partial,
  Text,
  Score,
  Tabs,
  Tab,
  List,
  Item,
  Team,
  Capitain,
  Shields,
  Profile,
  Name,
  NameGame,
  PartialItem,
} from './styles';

import { useParams, NavLink } from "react-router-dom";

function hasPlayer() {

  const { atleta_id, liga_id, slug } = useParams();

  useEffect(() => {
    getData();
  }, [])

  const [data, sdata] = useState({});
  const [loading, sloading] = useState(true);

  const [active, sactive] = useState('yes');

  async function getData() {

    try {

      sloading(true);
      const { data } = await api.get(`atletas/${atleta_id}/${liga_id}?slug=${slug}`);

      sdata(data);
      sloading(false);

    } catch (e) {
      message(e);
      sloading(false);
    };

  }

  return (
    <Container>
      <Header>
        <NavLink to="/">
          <Logo />
        </NavLink>
      </Header>
      {
        loading ?
          <Loading />
          :
            <Content>
              <Player>
                <Photo src={data.atleta.foto} />
                <Info>
                  <Nickname><strong>Apelido:</strong> {data.atleta.apelido}</Nickname>
                  <Club><strong>Clube:</strong> {data.atleta.clube}</Club>
                  <Position><strong>Posição:</strong> {data.atleta.posicao_nome}</Position>
                </Info>
                <Share onClick={() => {
                  const url = location.href;
                  const text = window.encodeURIComponent(`Clique no link abaixo para saber quem escalou o atleta *${data.atleta.apelido.toUpperCase()}* \n\n ${url}`);
                  window.open("https://api.whatsapp.com/send?text=" + text, "_blank");
                }}>
                  <Icon>share</Icon>
                </Share>
              </Player>
              <Partial>
                <Text>Pontuação:</Text>
                <Score value={(data.atleta.pontuacao || 0)}>{amount(data.atleta.pontuacao)}</Score>
              </Partial>
              <Tabs>
                <Tab
                  active={active}
                  name="yes"
                  onClick={() => sactive('yes')}>
                  {data.sim.length} Escalaram
                </Tab>
                <Tab
                  active={active}
                  name="no"
                  onClick={() => sactive('no')}>
                  {data.nao.length} Não Escalaram
                </Tab>
              </Tabs>
              <List>
                {
                  active === 'yes' ?
                    data.sim.map((e, i) => (
                      <Item key={i}>
                        <Team>
                          <Capitain capitain={e.capitao} />
                          <Shields src={e.time.url_escudo_png} />
                          <Profile>
                            <NameGame>{e.time.nome}</NameGame>
                            <Name>{e.time.nome_cartola}</Name>
                          </Profile>
                        </Team>
                        <PartialItem>
                          <Score value={e.pontos}>{amount(e.pontos)}</Score>
                        </PartialItem>
                      </Item>
                    ))
                    :
                    data.nao.map((e, i) => (
                      <Item key={i}>
                        <Team>
                          <Capitain capitain={e.capitao} />
                          <Shields src={e.time.url_escudo_png} />
                          <Profile>
                            <NameGame>{e.time.nome}</NameGame>
                            <Name>{e.time.nome_cartola}</Name>
                          </Profile>
                        </Team>
                        <PartialItem>
                          <Score value={e.pontos}>{amount(e.pontos)}</Score>
                        </PartialItem>
                      </Item>
                    ))
                }
              </List>
            </Content>
      }
    </Container>
  );
}

export default hasPlayer;
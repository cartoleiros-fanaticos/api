import React from 'react';

import {
  Container,
  ClubA,
  Header,
  Legend,
  Value,
  List,
  Item,
  Photo,
  Name,
  Text1,
  Text2,
  Score,
  Scouts,
  Scout,
} from './styles';

function scouts({ id }) {

  const [data, sdata] = useState([]);
  const [loading, sloading] = useState(false);

  useEffect(() => {
    getData();
  }, [])

  async function getData({ data: { partida } }) {

    try {

      sloading(true);

      const { data } = await api.get(`parciais_partida?id=${id}&clube_casa_id=${partida.clube_casa_id}&clube_visitante_id=${partida.clube_visitante_id}`);

      sdata(data);
      sloading(false);

    } catch (e) {
      message(e);
      sloading(false);
    };

  }

  return (
    <Container>
      <ClubA>
        <Header>
          {/* <Legend>Pontuação: </Legend><Value>0</Value>
          <Legend>Atletas: </Legend><Value>0</Value>
          <Legend>Pontuação: </Legend><Value>0</Value> */}
        </Header>
        <List>
          <List>
            {/* {
              data.clube_casa.map((e, i) =>
                <Item key={i}>
                  <Photo src={e.foto} />
                  <Name>
                    <Text1>{e.apelido}</Text1>
                    <Text2>{e.posicao}</Text2>
                  </Name>
                  <Score>
                    <Text1>{amount(e.pontuacao)}</Text1>
                    <Text2>C$ {amount(e.valorizacao)}</Text2>
                    <Scouts>
                      {
                        data.scouts.map(item =>
                          <Scout value={e[item.sigla]} type={item.tipo}>{`${e[item.sigla]}${item.sigla}`}</Scout>
                        )
                      }
                    </Scouts>
                  </Score>
                </Item>
              )
            } */}
          </List>
        </List>
      </ClubA>
    </Container>
  );
}

export default scouts;
import React, { useState, useEffect } from 'react';

import { useParams, NavLink } from "react-router-dom";

import { amount, message, slug } from '../../../../../utils/helpers';
import api from '../../../../../utils/api';

import Container from '../../../../../componets/container';
import Nav from '../../components/nav';

import { Message } from '../../../../../utils/styles';

import {
  Content,
  Main,
  Title,
  Description,
  List,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Name,
  NameGame,
  Image,
} from './styles';

function league() {

  const { round } = useParams();

  const [data, sdata] = useState({});

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {

      const { data } = await api.get(`/competicao/${round}`);

      sdata(data);

    } catch (e) {
      message(e);
    };

  }

  const component = (
    <Content>
      <Nav user={true} />
      {
        data.competicao ?
          <Main>
            <Title>{data.competicao?.nome}</Title>
            <Description>
              {data.competicao.tipo != 'rodada' ? `Início da rodada ${data.competicao?.de} até a rodada ${data.competicao?.ate}` : `Liga apenas para a rodada ${data.competicao?.de}`} <br />
              Valor <strong>{amount(data.competicao?.valor)}</strong> reais, <strong>2.000 times</strong> cadastrados <br />
              valor em <strong>prêmio 20.000</strong> reais <br />
              {/* dividido em {data.posicoes?.length} posições, onde o <br /> */}
              {
                data.posicoes.map((e, i) =>
                  <span key={i}><br />{e.posicao}º Lugar <strong>{e.percentual}%</strong> do valor</span>
                )
              }
              {
                data.competicao.descricao &&
                <>
                  <br /><br /><span><strong>Obs.: </strong> {data.competicao.descricao}</span>
                </>
              }
            </Description>
            <List>
              {
                data.times.data.length
                  ?
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Posição</Th>
                        <Th>Escudo</Th>
                        <Th>Nome</Th>
                        <Th>Rodada</Th>
                        <Th>Total</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        data.times.data.map((e, i) =>
                          <Tr key={i}>
                            <Td>{i + 1}</Td>
                            <Td><Image src={e.url_escudo_png} /></Td>
                            <Td className='name'>
                              <Name>{e.nome.substr(0, 10)}</Name>
                              <NameGame>{e.nome_cartola}</NameGame>
                            </Td>
                            <Td>{e.pontos} pts</Td>
                            <Td>{e.pontos} pts</Td>
                          </Tr>
                        )
                      }
                    </Tbody>
                  </Table>
                  :
                  <Message>Nenhum time cadastrado.</Message>
              }
            </List>
          </Main>
          :
          <></>
      }
    </Content>
  );

  return (
    <Container
      title='Ligas'
      component={component}
    />
  );
}

export default league;
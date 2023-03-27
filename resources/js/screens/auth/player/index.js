import React, { useEffect, useState, useRef } from 'react';
import backButton from 'browser-back-button';
import Loader from 'react-loader-spinner';

import { message, swal_ask, swal_success } from '../../../utils/helpers';
import api from '../../../utils/api';

import Modal from '../../../componets/modal';

import { useNavigate } from "react-router-dom";

import Container from '../../../componets/container';

import {
  Content,
  Form,
  Select,
  Option,
  Button,
  Label,
  Icon,
  Input,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  Description,
  Name,
  Position,
} from './styles';

function Player() {

  const [modal, smodal] = useState(false);

  const [filter, sfilter] = useState({
    clube_id: '',
    posicao_id: 5,
    status_id: 7,
    scout: '',
  });

  const [data, sdata] = useState({
    atletas: [],
    clubes: [],
    posicoes: [],
    status: [],
    scouts: [],
  });

  const [loading, sloading] = useState(false);

  const [waiting, swaiting] = useState(true);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {

      const { data } = await api.get(`atletas?clube_id=${filter.clube_id}&posicao_id=${filter.posicao_id}&status_id=${filter.status_id}&scout=${filter.scout}`);

      sdata(data);
      swaiting(false);
      sloading(false);

    } catch (e) {
      message(e);
      swaiting(false);
      sloading(false);
    };

  }

  function search(e) {

  }

  const component = () => (
    <Content>
      <Form onSubmit={(e) => {

        sloading(true);
        e.preventDefault();
        getData()

      }}>
        <Select onChange={e => sfilter({ ...filter, clube_id: e.target.value })} value={filter.clube_id}>
          <Option value="">Time</Option>
          {
            Object.values(data.clubes).map(e => <Option key={e.id} value={e.id}>{e.nome}</Option>)
          }
        </Select>
        <Select onChange={e => sfilter({ ...filter, posicao_id: e.target.value })} value={filter.posicao_id}>
          {
            Object.values(data.posicoes).map((e) => <Option key={e.id} value={e.id}>{e.nome}</Option>)
          }
        </Select>
        <Select onChange={e => sfilter({ ...filter, status_id: e.target.value })} value={filter.status_id}>
          {
            Object.values(data.status).map((e) => <Option key={e.id} value={e.id}>{e.nome}</Option>)
          }
        </Select>
        <Select onChange={e => sfilter({ ...filter, scout: e.target.value })} value={filter.scout}>
          <Option value="">Scouts</Option>
          {
            data.scouts.map((e) => <Option key={e.sigla} value={e.sigla}>{e.nome}</Option>)
          }
        </Select>
        <Button>
          {loading ? <Loader visible={true} type="TailSpin" color="#000" height={18} width={18} /> : <span>Carregar</span>}
        </Button>
        <Label>
          <Icon>directions_run</Icon>
          <Input onChange={search} />
        </Label>
      </Form>
      <Table>
        <Thead>
          <Tr>
            <Th>Time</Th>
            <Th>Jogador</Th>
            <Th>Preço</Th>
            <Th>Status</Th>
            <Th>Valorização</Th>
            <Th>Última</Th>
            <Th>Média</Th>
            <Th>Jogos</Th>
            <Th>Confronto</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            data.atletas.map(e =>
              <Tr key={e.atleta_id}>
                <Td><Image src={data.clubes[e.clube_id]['60x60']} /></Td>
                <Td>
                  <Image src={e.foto} />
                  <Description>
                    <Name>{e.apelido.substr(0, 10)}</Name>
                    <Position>{data.posicoes[e.posicao_id].nome}</Position>
                  </Description>
                </Td>
                <Td>{e.preco_num}</Td>
                <Td>{data.status[e.status_id].nome}</Td>
                <Td>{e.variacao_num}</Td>
                <Td>{e.pontos_num}</Td>
                <Td>{e.media_num}</Td>
                <Td>{e.jogos_num}</Td>
                <Td>
                  <Image src={data.clubes[e.confronto.split('x')[0]]['60x60']} />
                  x
                  <Image src={data.clubes[e.confronto.split('x')[1]]['60x60']} />
                </Td>
              </Tr>
            )
          }
        </Tbody>
      </Table>
    </Content>
  );

  return (
    <Container
      title='Mercado'
      Component={component}
      loading={waiting}
    />
  );
}

export default Player;
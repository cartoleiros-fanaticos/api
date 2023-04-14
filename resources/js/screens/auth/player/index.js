import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

import { amount, message } from '../../../utils/helpers';
import api from '../../../utils/api';

import Modal from '../../../componets/modal';
import ModalPlayer from '../../../modal/player';
import ModalCompare from '../../../modal/compare';

import Container from '../../../componets/container';

import {
  Content,
  Filter,
  Select,
  Option,
  Button,
  Label,
  Icon,
  Input,
  List,
  Table,
  Thead,
  Tr,
  Th,
  OrderBy,
  Tbody,
  Td,
  Ico,
  Image,
  Description,
  Name,
  Position,
} from './styles';

import { Message } from '../../../utils/styles';

function Player() {

  const [modal_player, smodalplayer] = useState(false);
  const [modal_compare, smodalcompare] = useState(false);
  const [data_player, sdataplayer] = useState({});

  const [filter, sfilter] = useState({
    clube_id: '',
    posicao_id: 5,
    status_id: 7,
    scout: '',
  });

  const [players, splayers] = useState([]);

  const [data, sdata] = useState({
    atletas: [],
    clubes: [],
    posicoes: [],
    status: [],
    scouts: [],
  });

  const status = {
    7: { nome: 'Provável', icon: 'done_outline', color: 'green' },
    6: { nome: 'Nulo', icon: 'bookmark_border', color: 'gray' },
    5: { nome: 'Contundido', icon: 'local_hospital', color: 'red' },
    3: { nome: 'Suspenso', icon: 'transfer_within_a_station', color: 'red' },
    2: { nome: 'Dúvida', icon: 'contact_support', color: '#F9D90A' },
  };

  const [loading_page, sloadingpage] = useState(true);
  const [loading_data, sloadingdata] = useState(false);
  const [loading_data_player, sloadingdataplayer] = useState(false);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {

      sloadingdata(true);

      const { data } = await api.get(`atletas?clube_id=${filter.clube_id}&posicao_id=${filter.posicao_id}&status_id=${filter.status_id}&scout=${filter.scout}`);

      sdata(data);
      splayers(data.atletas);

      sloadingpage(false);
      sloadingdata(false);

    } catch (e) {
      message(e);
      sloadingpage(false);
      sloadingdata(false);
    };

  }

  async function getPlayer(atleta_id) {

    const atleta_a = data.atletas.find(e => e.compare === true);

    try {

      sloadingdataplayer(true);

      if (atleta_a) {

        smodalcompare(true);
        delete atleta_a.compare;
        const response = await api.get(`compare/atletas?atleta_a=${atleta_a.atleta_id}&atleta_b=${atleta_id}`);
        sdataplayer(response.data);
        sdata(data);

      } else {

        smodalplayer(true);
        const response = await api.get(`atletas/${atleta_id}`);
        sdataplayer(response.data);
      }

      sloadingdataplayer(false);

    } catch (e) {
      message(e);
      smodalcompare(false);
      sloadingdataplayer(false);
    };

  }

  async function compare(atleta_id) {

    let atleta = data.atletas.find(e => e.atleta_id === atleta_id);
    atleta.compare = true;
    sdata(data);
    smodalplayer(false);

  }

  function order(event) {

    const order = event.target.classList.contains('desc');

    if (order) event.target.setAttribute('class', 'asc');
    else event.target.setAttribute('class', 'desc');

    const value = event.target.innerText;

    if (value === 'Média') {

      if (order)
        data.atletas.sort((a, b) => a.media_num < b.media_num ? -1 : 1);
      else
        data.atletas.sort((a, b) => a.media_num > b.media_num ? -1 : 1);

    } else if (value === 'Valorização') {

      if (order)
        data.atletas.sort((a, b) => a.variacao_num < b.variacao_num ? -1 : 1);
      else
        data.atletas.sort((a, b) => a.variacao_num > b.variacao_num ? -1 : 1);

    } else if (value === 'Preço') {

      if (order)
        data.atletas.sort((a, b) => a.preco_num < b.preco_num ? -1 : 1);
      else
        data.atletas.sort((a, b) => a.preco_num > b.preco_num ? -1 : 1);

      } else if (value === 'P. mínima') {
  
        if (order)
          data.atletas.sort((a, b) => a.minimo_para_valorizar < b.minimo_para_valorizar ? -1 : 1);
        else
          data.atletas.sort((a, b) => a.minimo_para_valorizar > b.minimo_para_valorizar ? -1 : 1);

    } else {

      if (order)
        data.atletas.sort((a, b) => a.pontos_num < b.pontos_num ? -1 : 1);
      else
        data.atletas.sort((a, b) => a.pontos_num > b.pontos_num ? -1 : 1);

    }

    sdata({ ...data });

  }

  function search(event) {

    const value = event.target.value.toLowerCase();

    if (value && value.length >= 3) {
      const atletas = players.filter(e => e.apelido.toLowerCase().indexOf(value) != -1);
      sdata({ ...data, atletas });
    } else if (value === '') {
      sdata({ ...data, atletas: players });
    }
  }

  const component = (
    <Content>
      <Filter>
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
        <Button onClick={getData}>
          {loading_data ? <Loader visible={true} type="TailSpin" color="#000" height={18} width={18} /> : <span>Carregar</span>}
        </Button>
        <Label>
          <Icon>directions_run</Icon>
          <Input onChange={search} />
        </Label>
      </Filter>
      <List>
        <Table>
          <Thead>
            <Tr>
              <Th>Time</Th>
              <Th>Jogador</Th>
              <Th>
                <OrderBy onClick={order}>Preço</OrderBy>
              </Th>
              <Th>Status</Th>
              <Th>
                <OrderBy onClick={order}>Valorização</OrderBy>
              </Th>
              <Th>
                <OrderBy onClick={order}>Última</OrderBy>
              </Th>
              <Th>
                <OrderBy onClick={order}>Média</OrderBy>
              </Th>
              <Th>Jogos</Th>
              <Th>
                <OrderBy onClick={order}>P. mínima</OrderBy>
              </Th>
              <Th>{filter.scout || 'G'}</Th>
              <Th>Confronto</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              data.atletas.length ?
                data.atletas.map(e =>
                  <Tr compare={e.compare} onClick={() => getPlayer(e.atleta_id)} key={e.atleta_id}>
                    <Td><Image src={data.clubes[e.clube_id]['60x60']} /></Td>
                    <Td>
                      <Image src={e.foto} />
                      <Description>
                        <Name>{e.apelido.substr(0, 10)}</Name>
                        <Position>{data.posicoes[e.posicao_id].nome}</Position>
                      </Description>
                    </Td>
                    <Td>{amount(e.preco_num)}</Td>
                    <Td><Ico color={status[e.status_id].color}>{status[e.status_id].icon}</Ico></Td>
                    <Td>{amount(e.variacao_num)}</Td>
                    <Td>{amount(e.pontos_num)}</Td>
                    <Td>{amount(e.media_num)}</Td>
                    <Td>{e.jogos_num}</Td>
                    <Td>{amount(e.minimo_para_valorizar)}</Td>
                    <Td>{e[filter.scout] || e.G}</Td>
                    <Td>
                      <Image src={data.clubes[e.confronto.split('x')[0]]['60x60']} />
                      x
                      <Image src={data.clubes[e.confronto.split('x')[1]]['60x60']} />
                    </Td>
                  </Tr>
                )
                :
                <Message>Nenhum jogador encontrado</Message>
            }

          </Tbody>
        </Table>
      </List>
    </Content>
  );

  return (
    <>
      <Container
        title='Mercado'
        component={component}
        loading={loading_page}
      />
      {

        modal_player &&
        <Modal
          icon="directions_run"
          title="Informações atleta"
          modal={modal_player}
          smodal={smodalplayer}
          Component={ModalPlayer}
          data={data_player}
          loading={loading_data_player}
          fnc={compare}
          width="60%"
          height='620px'
          marginLeft="-30%"
        />
      }
      {
        modal_compare &&
        <Modal
          icon="compare_arrows"
          title="Comparar atleta"
          modal={modal_compare}
          smodal={smodalcompare}
          Component={ModalCompare}
          data={data_player}
          loading={loading_data_player}
          height="500px"
        />
      }
    </>
  );
}

export default Player;
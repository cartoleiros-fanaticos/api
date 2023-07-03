import React, { useState, useEffect } from 'react';

import { useParams, NavLink } from "react-router-dom";

import { amount, message, slug, swal_success } from '../../../../../utils/helpers';
import api from '../../../../../utils/api';

import Container from '../../../../../componets/container';
import Modal from '../../../../../componets/modal';

import ModalTeams from '../../../../../modal/teams';

import { Message } from '../../../../../utils/styles';

import {
  Content,
  Description,
  Enter,
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

  const { competicoes_id } = useParams();

  const [data, sdata] = useState({});
  const [modal, smodal] = useState(false);
  const [loading, sloading] = useState(true);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    try {

      const { data } = await api.get(`/competicao/${competicoes_id}`);

      sdata(data);
      sloading(false);

    } catch (e) {
      message(e);
      sloading(false);
    };

  }

  async function teams(time_id) {

    try {

      await api.post(`/competicao/solicitacao`, { competicoes_id, time_id });

      swal_success('Solicitação enviada com sucesso, após o pagamento enviei-nos o comprovante.');

    } catch (e) {
      message(e);
    };

  }

  const component = (
    <Content>
      {data.competicao &&
        <>
          <Description>
            {data.competicao.tipo != 'rodada' ? `Início da rodada ${data.competicao.de} até a rodada ${data.competicao.ate}` : `Liga apenas para a rodada ${data.competicao.de}`} <br />
            Valor <strong>{amount(data.competicao.valor)}</strong> reais, <strong>{data.competicao.qtde_times} times</strong> cadastrados <br />
            valor em <strong>prêmio {amount((data.competicao.qtde_times * data.competicao.valor) - (data.competicao.comissao / 100 * (data.competicao.qtde_times * data.competicao.valor)))}</strong> reais <br />
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
            <Enter onClick={() => smodal(true)}>Participar</Enter>
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
                          <Td>{e.pontos_total} pts</Td>
                        </Tr>
                      )
                    }
                  </Tbody>
                </Table>
                :
                <Message>Nenhum time cadastrado.</Message>
            }
          </List>
        </>
      }
    </Content>
  );

  return (
    <>
      <Container
        title={data?.competicao?.nome}
        component={component}
        loading={loading}
      />
      {
        modal &&
        <Modal
          icon="list"
          title="Lista times do cartola"
          modal={modal}
          smodal={smodal}
          Component={ModalTeams}
          fnc={teams}
          height='500px'
        />
      }
    </>
  );
}

export default league;
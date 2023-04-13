import React, { useState, useEffect } from 'react';

import { amount, message, swal_success } from '../../../utils/helpers';
import api from '../../../utils/api';

import Modal from '../../../componets/modal';
import ModalPix from '../../../modal/pix';

import Container from '../../../componets/container';

import { useNavigate } from "react-router-dom";

import {
    Content,
    Box,
    Title,
    Plans,
    Plan,
    Name,
    Values,
    Value,
    Pay,
    Text,
    Bonus,
    Text1,
    Text2,
    Header,
    Text3,
    Text4,
    List,
    Item,
    Label,
    BoxIcon,
    Icon,
} from './styles';

function plans() {

    let navigate = useNavigate();

    const [modal, smodal] = useState(false);

    const [id, sid] = useState('');
    const [data, sdata] = useState({});

    const [loading_page, sloadingpage] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {

        try {

            const { data } = await api.get(`planos`);

            sdata(data);
            sloadingpage(false);

        } catch (e) {
            message(e);
            sloadingpage(false);
        };
    }

    const component = (
        <Content>
            <Box>
                <Title>IMPERDÍVEL</Title>
                <Plans>
                    {
                        data.length ?
                            data.map((e, i) =>
                                <Plan key={i}>
                                    <Name>{e.nome}</Name>
                                    <Values>
                                        <Value>R${amount(e.valor)}</Value>
                                    </Values>
                                    <Pay onClick={() => {
                                        sid(e.id);
                                        smodal(true);
                                    }}>PAGAR</Pay>
                                </Plan>
                            )
                            :
                            <></>
                    }
                </Plans>
            </Box>
            <Bonus>
                <Text1>BÔNUS PARA OS DOIS PLANOS</Text1>
                <Text2>Liga de assinantes com premiação em dinheiro.</Text2>
            </Bonus>
            <Header>
                <Text3></Text3>
                <Text4>PLANO <Text>STATS</Text></Text4>
                <Text4>PLANO <Text>FANÁTICO</Text></Text4>
            </Header>
            <List>
                <Item>
                    <Label>COMPARATIVOS DO JOGADORES NO APP, SITE E ACESSO TOTAL A PLATAFORMA</Label>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>FAZER DOWNLOAD DA TABELA ATRÁVES DO SITE / APP</Label>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>ACESSO AO APP (COM ESTATÍSTICAS)</Label>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>ACESSO AO APP (COM ESTATÍSTICAS) E WHATS APP</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>TIMES EXCLUSIVOS DE ASSINANTES</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>AÚDIO ANALISE DETALHADA POR POSIÇÃO</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>TABELA (CHANCE DE VITÓRIA, PONTOS CONQUISTADOS E CEDIDOS SALDO DE GOLS E OUTRAS)</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>ANÁLISE DOS MAPAS DE CALOR</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>TABELA DE CONDIÇÕES CLIMATICAS DOS JOGOS DA RODADA</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>LIVE DE ASSINANTES</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>ANÁLISE INDIVIDUAL DOS JOGADORES</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>NOTÍCIAS NO TELEGRAM E WHATSAPP</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>TABELA DOS COBRADORES DE FALTA, ESCANTEIOS E PÊNALTIS, E PERCENTUAL DE ACERTOS</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>GRUPO DE INTERAÇÃO DIÁRIA COM ROBERVAL COELHO</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>SUPORTE PERSONALIZADO COM CONTEÚDO DE ESTRATÉGIA POR TIPO DE COMPETIÇÃO.</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>ACESSO A TODAS AS NOVAS ANÁLISES CRIADAS NO DECORRER DA TEMPORADA.</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                {/* <Item>
                    <Label>MÓDULO BÁSICO DO NOVO CURSO DE ROBERVAL COELHO</Label>
                    <BoxIcon>
                        <Icon color="red">cancel</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item> */}
            </List>
        </Content>
    );

    return (
        <>
            <Container
                title='PLANOS'
                component={component}
                loading={loading_page}
            />
            {

                modal &&
                <Modal
                    icon="qr_code_scanner"
                    title="Pagamento PIX"
                    modal={modal}
                    smodal={smodal}
                    Component={ModalPix}
                    data={{ id }}
                    fnc={(user) => {

                        swal_success('Plano contratado com SUCESSO!');
                        navigate('/auth/cruzamento-scouts');
                        localStorage.setItem('user', JSON.stringify(user));


                    }}
                    height='440px'
                />
            }
        </>
    );
}

export default plans;
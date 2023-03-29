import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../utils/helpers';
import api from '../../../utils/api';

import Container from '../../../componets/container';

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

    const [data, sdata] = useState({});

    const [loading_page, sloadingpage] = useState(false);

    const component = () => (
        <Content>
            <Box>
                <Title>IMPERDÍVEL</Title>
                <Plans>
                    <Plan>
                        <Name>PLANO CARTOLEIRO</Name>
                        <Values>
                            <Value>R$79,99</Value>
                        </Values>
                        <Pay>PAGAR</Pay>
                    </Plan>
                    <Plan>
                        <Name>PLANO <Text>CARTOLEIRO VIP</Text></Name>
                        <Values>
                            <Value>R$79,99</Value>
                        </Values>
                        <Pay>PAGAR</Pay>
                    </Plan>
                </Plans>
            </Box>
            <Bonus>
                <Text1>BÔNUS PARA OS DOIS PLANOS</Text1>
                <Text2>Liga de assinantes valendo um PS4 e mais premiações</Text2>
            </Bonus>
            <Header>
                <Text3></Text3>
                <Text4>PLANO <Text>CARTOLEIRO</Text></Text4>
                <Text4>PLANO <Text>CARTOLEIRO VIP</Text></Text4>
            </Header>
            <List>
                <Item>
                    <Label>ACESSO AO APP (COM ESTATÍSTICAS) E WHATS APP</Label>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>TIMES EXCLUSIVOS DE ASSINANTES</Label>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>AÚDIO ANALISE DETALHADA POR POSIÇÃO</Label>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>TABELA (CHANCE DE VITÓRIA, PONTOS CONQUISTADOS E CEDIDOS SALDO DE GOLS E OUTRAS)</Label>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>ANÁLISE DOS MAPAS DE CALOR</Label>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>TABELA DE CONDIÇÕES CLIMATICAS DOS JOGOS DA RODADA</Label>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>LIVE DE ASSINANTES</Label>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>ANÁLISE INDIVIDUAL DOS JOGADORES</Label>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>NOTÍCIAS NO TELEGRAM E WHATSAPP</Label>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                    <BoxIcon>
                        <Icon color="green">check_circle</Icon>
                    </BoxIcon>
                </Item>
                <Item>
                    <Label>TABELA DOS COBRADORES DE FALTA, ESCANTEIOS E PÊNALTIS, E PERCENTUAL DE ACERTOS</Label>
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
                    <Label>COMPARATIVOS DO JOGADORES NO APP, SITE E ACESSO TOTAL A PLATAFORMA</Label>
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
                    <Label>MÓDULO BÁSICO DO NOVO CURSO DE ROBERVAL COELHO</Label>
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
            </List>
        </Content>
    );

    return (
        <Container
            title='PLANOS'
            Component={component}
            loading={loading_page}
        />
    );
}

export default plans;
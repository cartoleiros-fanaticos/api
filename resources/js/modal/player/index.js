import React, { useState } from 'react';

import { amount } from '../../utils/helpers';

import Modal from '../../componets/modal';
import ModalCompare from '../../modal/compare';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import {
    Container,
    Item1,
    Button,
    Icon,
    Text1,
    Name,
    Photo,
    Position,
    Date,
    Matches,
    Shield,
    Logo,
    Item2,
    Title,
    Text2,
    Item3,
    Legend,
    Box,
    Label,
    Value,
    QtdeMatches,
    Item4,
    Scout,
    Item5,
    Description,
    Item6,
    Item7,
} from './styles';

function player({ data, compare }) {

    const [data_player, sdataplayer] = useState({});

    const [loading, sloading] = useState(false);

    const options = {
        chart: { zoomType: 'x', height: 180 },
        title: { text: null },
        yAxis: { title: { text: null } },
        xAxis: {
            categories: data.grafico.rodadas,
        },
        series: [
            {
                dataLabels: {
                    enabled: true
                },
                negativeColor: '#da0303',
                data: data.grafico.pontuacao,
                type: 'column',
                name: 'Pontos',
                color: '#F68D42'
            },
            {
                dataLabels: {
                    enabled: true,
                },
                negativeColor: '#da0303',
                data: data.grafico.valorizacao,
                type: 'column',
                name: 'Cartoletas',
                color: '#000000'
            }
        ]
    }

    return (
        <>
            <Container>
                <Item1>
                    <Button onClick={() => compare(data.atleta.atleta_id)}>
                        <Icon>directions_run</Icon>
                        <Text1>Comparar</Text1>
                    </Button>
                    <Button>
                        <Icon>security</Icon>
                        <Text1>Ver confronto</Text1>
                    </Button>
                    <Name>{data.atleta.apelido}</Name>
                    <Photo src={data.atleta.foto} />
                    <Position>{`${data.atleta.posicao_nome} | ${data.clubes[data.atleta.clube_id].abreviacao}`}</Position>
                    <Date>{data.atleta.partida_data}</Date>
                    <Matches>
                        <Shield src={data.clubes[data.atleta.clube_casa_id].escudo} />
                        x
                        <Shield src={data.clubes[data.atleta.clube_visitante_id].escudo} />
                    </Matches>
                    <Logo />
                </Item1>
                <Item2>
                    <Title>
                        <Text2 className='analise'>ANÁLISE</Text2>
                        <Text2 className='jogador'>DO JOGADOR</Text2>
                    </Title>
                </Item2>
                <Item3>
                    <Legend>Média</Legend>
                    <Box>
                        <Label>Geral</Label>
                        <Value>{amount(data.atleta.media.geral)}</Value>
                        <QtdeMatches>{data.atleta.jogos.geral} Jogos</QtdeMatches>
                    </Box>
                    <Box>
                        <Label>Casa</Label>
                        <Value>{amount(data.atleta.media.casa)}</Value>
                        <QtdeMatches>{data.atleta.jogos.casa} Jogos</QtdeMatches>
                    </Box>
                    <Box>
                        <Label>Fora</Label>
                        <Value>{amount(data.atleta.media.fora)}</Value>
                        <QtdeMatches>{data.atleta.jogos.fora} Jogos</QtdeMatches>
                    </Box>
                </Item3>
                <Item4>
                    <Legend>Pontuação</Legend>
                    <Box>
                        <Label>Geral</Label>
                        <Value>{amount(data.atleta.pontuacao.geral)}</Value>
                        <QtdeMatches>{data.atleta.jogos.geral} Jogos</QtdeMatches>
                    </Box>
                    <Box>
                        <Label>Casa</Label>
                        <Value>{amount(data.atleta.pontuacao.casa)}</Value>
                        <QtdeMatches>{data.atleta.jogos.casa} Jogos</QtdeMatches>
                    </Box>
                    <Box>
                        <Label>Fora</Label>
                        <Value>{amount(data.atleta.pontuacao.fora)}</Value>
                        <QtdeMatches>{data.atleta.jogos.fora} Jogos</QtdeMatches>
                    </Box>
                </Item4>
                <Item5>
                    {
                        data.scouts.map(e => <Scout key={e.sigla} type={e.tipo}>{`${data.atleta[e.sigla]}${e.sigla}`}</Scout>)
                    }
                </Item5>
                <Item6>
                    <Description>{data.atleta.observacao}</Description>
                </Item6>
                <Item7>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </Item7>
            </Container>
        </>
    );
}

export default player;
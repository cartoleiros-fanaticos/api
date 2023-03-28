import React from 'react';

import {
    Container,
    Header,
    Label,
    Photo,
    Name,
    Logo,
    Content,
    Item,
    Value,
    Text,
    Title
} from './styles';

function compare({ data: { atleta_a, atleta_b } }) {
    return (
        <Container>
            <Header>
                <Label>
                    <Photo src={atleta_a.foto} />
                    <Name>{atleta_a.apelido}</Name>
                </Label>
                <Logo />
                <Label>
                    <Photo src={atleta_b.foto} />
                    <Name>{atleta_b.apelido}</Name>
                </Label>
            </Header>
            <Content>
                <Item>
                    <Value color={atleta_a.jogos_num === atleta_b.jogos_num ? 'gray' : (atleta_a.jogos_num > atleta_b.jogos_num ? 'green' : 'red')}>{atleta_a.jogos_num}</Value>
                    <Text>JOGOS</Text>
                    <Value color={atleta_a.jogos_num === atleta_b.jogos_num ? 'gray' : (atleta_a.jogos_num > atleta_b.jogos_num ? 'red' : 'green')}>{atleta_b.jogos_num}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.media_num === atleta_b.media_num ? 'gray' : (atleta_a.media_num > atleta_b.media_num ? 'green' : 'red')}>{atleta_a.media_num}</Value>
                    <Text>MÉDIA</Text>
                    <Value color={atleta_a.media_num === atleta_b.media_num ? 'gray' : (atleta_a.media_num > atleta_b.media_num ? 'red' : 'green')}>{atleta_b.media_num}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.pontos_num === atleta_b.pontos_num ? 'gray' : (atleta_a.pontos_num > atleta_b.pontos_num ? 'green' : 'red')}>{atleta_a.pontos_num}</Value>
                    <Text>ÚLT. PONTUAÇÃO</Text>
                    <Value color={atleta_a.pontos_num === atleta_b.pontos_num ? 'gray' : (atleta_a.pontos_num > atleta_b.pontos_num ? 'red' : 'green')}>{atleta_b.pontos_num}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.media_pontos_casa === atleta_b.media_pontos_casa ? 'gray' : (atleta_a.media_pontos_casa > atleta_b.media_pontos_casa ? 'green' : 'red')}>{atleta_a.media_pontos_casa}</Value>
                    <Text>MÉDIA CASA</Text>
                    <Value color={atleta_a.media_pontos_casa === atleta_b.media_pontos_casa ? 'gray' : (atleta_a.media_pontos_casa > atleta_b.media_pontos_casa ? 'red' : 'green')}>{atleta_b.media_pontos_casa}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.media_pontos_fora === atleta_b.media_pontos_fora ? 'gray' : (atleta_a.media_pontos_fora > atleta_b.media_pontos_fora ? 'green' : 'red')}>{atleta_a.media_pontos_fora}</Value>
                    <Text>MÉDIA FORA</Text>
                    <Value color={atleta_a.media_pontos_fora === atleta_b.media_pontos_fora ? 'gray' : (atleta_a.media_pontos_fora > atleta_b.media_pontos_fora ? 'red' : 'green')}>{atleta_b.media_pontos_fora}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.pontuacao_min === atleta_b.pontuacao_min ? 'gray' : (atleta_a.pontuacao_min < atleta_b.pontuacao_min ? 'green' : 'red')}>{atleta_a.pontuacao_min}</Value>
                    <Text>MIN. P. VALORIZAR</Text>
                    <Value color={atleta_a.pontuacao_min === atleta_b.pontuacao_min ? 'gray' : (atleta_a.pontuacao_min < atleta_b.pontuacao_min ? 'red' : 'green')}>{atleta_b.pontuacao_min}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.pontuacao_minima === atleta_b.pontuacao_minima ? 'gray' : (atleta_a.pontuacao_minima > atleta_b.pontuacao_minima ? 'green' : 'red')}>{atleta_a.pontuacao_minima}</Value>
                    <Text>PONTUAÇÃO MIN.</Text>
                    <Value color={atleta_a.pontuacao_minima === atleta_b.pontuacao_minima ? 'gray' : (atleta_a.pontuacao_minima > atleta_b.pontuacao_minima ? 'red' : 'green')}>{atleta_b.pontuacao_minima}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.pontuacao_maxima === atleta_b.pontuacao_maxima ? 'gray' : (atleta_a.pontuacao_maxima > atleta_b.pontuacao_maxima ? 'green' : 'red')}>{atleta_a.pontuacao_maxima}</Value>
                    <Text>PONTUAÇÃO MAX.</Text>
                    <Value color={atleta_a.pontuacao_maxima === atleta_b.pontuacao_maxima ? 'gray' : (atleta_a.pontuacao_maxima > atleta_b.pontuacao_maxima ? 'red' : 'green')}>{atleta_b.pontuacao_maxima}</Value>
                </Item>
                <Title>SCOUTS GERAL</Title>
            </Content>
        </Container>
    );
}

export default compare;
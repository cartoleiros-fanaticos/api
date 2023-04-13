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
                    <Value color={atleta_a.jogos_num === atleta_b.jogos_num ? 'gray' : (atleta_a.jogos_num > atleta_b.jogos_num ? '#008000' : '#c40808')}>{atleta_a.jogos_num}</Value>
                    <Text>JOGOS</Text>
                    <Value color={atleta_a.jogos_num === atleta_b.jogos_num ? 'gray' : (atleta_a.jogos_num > atleta_b.jogos_num ? '#c40808' : '#008000')}>{atleta_b.jogos_num}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.media_num === atleta_b.media_num ? 'gray' : (atleta_a.media_num > atleta_b.media_num ? '#008000' : '#c40808')}>{atleta_a.media_num}</Value>
                    <Text>MÉDIA</Text>
                    <Value color={atleta_a.media_num === atleta_b.media_num ? 'gray' : (atleta_a.media_num > atleta_b.media_num ? '#c40808' : '#008000')}>{atleta_b.media_num}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.pontos_num === atleta_b.pontos_num ? 'gray' : (atleta_a.pontos_num > atleta_b.pontos_num ? '#008000' : '#c40808')}>{atleta_a.pontos_num}</Value>
                    <Text>ÚLT. PONTUAÇÃO</Text>
                    <Value color={atleta_a.pontos_num === atleta_b.pontos_num ? 'gray' : (atleta_a.pontos_num > atleta_b.pontos_num ? '#c40808' : '#008000')}>{atleta_b.pontos_num}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.media_pontos_casa === atleta_b.media_pontos_casa ? 'gray' : (atleta_a.media_pontos_casa > atleta_b.media_pontos_casa ? '#008000' : '#c40808')}>{atleta_a.media_pontos_casa}</Value>
                    <Text>MÉDIA CASA</Text>
                    <Value color={atleta_a.media_pontos_casa === atleta_b.media_pontos_casa ? 'gray' : (atleta_a.media_pontos_casa > atleta_b.media_pontos_casa ? '#c40808' : '#008000')}>{atleta_b.media_pontos_casa}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.media_pontos_fora === atleta_b.media_pontos_fora ? 'gray' : (atleta_a.media_pontos_fora > atleta_b.media_pontos_fora ? '#008000' : '#c40808')}>{atleta_a.media_pontos_fora}</Value>
                    <Text>MÉDIA FORA</Text>
                    <Value color={atleta_a.media_pontos_fora === atleta_b.media_pontos_fora ? 'gray' : (atleta_a.media_pontos_fora > atleta_b.media_pontos_fora ? '#c40808' : '#008000')}>{atleta_b.media_pontos_fora}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.minimo_para_valorizar === atleta_b.minimo_para_valorizar ? 'gray' : (atleta_a.minimo_para_valorizar < atleta_b.minimo_para_valorizar ? '#008000' : '#c40808')}>{atleta_a.minimo_para_valorizar}</Value>
                    <Text>MIN. P. VALORIZAR</Text>
                    <Value color={atleta_a.minimo_para_valorizar === atleta_b.minimo_para_valorizar ? 'gray' : (atleta_a.minimo_para_valorizar < atleta_b.minimo_para_valorizar ? '#c40808' : '#008000')}>{atleta_b.minimo_para_valorizar}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.pontuacao_minima === atleta_b.pontuacao_minima ? 'gray' : (atleta_a.pontuacao_minima > atleta_b.pontuacao_minima ? '#008000' : '#c40808')}>{atleta_a.pontuacao_minima}</Value>
                    <Text>PONTUAÇÃO MIN.</Text>
                    <Value color={atleta_a.pontuacao_minima === atleta_b.pontuacao_minima ? 'gray' : (atleta_a.pontuacao_minima > atleta_b.pontuacao_minima ? '#c40808' : '#008000')}>{atleta_b.pontuacao_minima}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.pontuacao_maxima === atleta_b.pontuacao_maxima ? 'gray' : (atleta_a.pontuacao_maxima > atleta_b.pontuacao_maxima ? '#008000' : '#c40808')}>{atleta_a.pontuacao_maxima}</Value>
                    <Text>PONTUAÇÃO MAX.</Text>
                    <Value color={atleta_a.pontuacao_maxima === atleta_b.pontuacao_maxima ? 'gray' : (atleta_a.pontuacao_maxima > atleta_b.pontuacao_maxima ? '#c40808' : '#008000')}>{atleta_b.pontuacao_maxima}</Value>
                </Item>
                <Title>SCOUTS GERAL</Title>
                <Item>
                    <Value color={atleta_a.G === atleta_b.G ? 'gray' : (atleta_a.G > atleta_b.G ? '#008000' : '#c40808')}>{atleta_a.G}</Value>
                    <Text>GOLS</Text>
                    <Value color={atleta_a.G === atleta_b.G ? 'gray' : (atleta_a.G > atleta_b.G ? '#c40808' : '#008000')}>{atleta_b.G}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.A === atleta_b.A ? 'gray' : (atleta_a.A > atleta_b.A ? '#008000' : '#c40808')}>{atleta_a.A}</Value>
                    <Text>ASSISTÊNCIA</Text>
                    <Value color={atleta_a.A === atleta_b.A ? 'gray' : (atleta_a.A > atleta_b.A ? '#c40808' : '#008000')}>{atleta_b.A}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.finalizacao === atleta_b.finalizacao ? 'gray' : (atleta_a.finalizacao > atleta_b.finalizacao ? '#008000' : '#c40808')}>{atleta_a.finalizacao}</Value>
                    <Text>FINALIZAÇÃO</Text>
                    <Value color={atleta_a.finalizacao === atleta_b.finalizacao ? 'gray' : (atleta_a.finalizacao > atleta_b.finalizacao ? '#c40808' : '#008000')}>{atleta_b.finalizacao}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.DS === atleta_b.DS ? 'gray' : (atleta_a.DS > atleta_b.DS ? '#008000' : '#c40808')}>{atleta_a.DS}</Value>
                    <Text>DESARMES</Text>
                    <Value color={atleta_a.DS === atleta_b.DS ? 'gray' : (atleta_a.DS > atleta_b.DS ? '#c40808' : '#008000')}>{atleta_b.DS}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.FS === atleta_b.FS ? 'gray' : (atleta_a.FS > atleta_b.FS ? '#008000' : '#c40808')}>{atleta_a.FS}</Value>
                    <Text>FALTA SOFRIDA</Text>
                    <Value color={atleta_a.FS === atleta_b.FS ? 'gray' : (atleta_a.FS > atleta_b.FS ? '#c40808' : '#008000')}>{atleta_b.FS}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.DE === atleta_b.DE ? 'gray' : (atleta_a.DE > atleta_b.DE ? '#008000' : '#c40808')}>{atleta_a.DE}</Value>
                    <Text>DEFESAS</Text>
                    <Value color={atleta_a.DE === atleta_b.DE ? 'gray' : (atleta_a.DE > atleta_b.DE ? '#c40808' : '#008000')}>{atleta_b.DE}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.I === atleta_b.I ? 'gray' : (atleta_a.I < atleta_b.I ? '#008000' : '#c40808')}>{atleta_a.I}</Value>
                    <Text>IMPEDIMENTO</Text>
                    <Value color={atleta_a.I === atleta_b.I ? 'gray' : (atleta_a.I < atleta_b.I ? '#c40808' : '#008000')}>{atleta_b.I}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.cartoes === atleta_b.cartoes ? 'gray' : (atleta_a.cartoes < atleta_b.cartoes ? '#008000' : '#c40808')}>{atleta_a.cartoes}</Value>
                    <Text>CARTÃO</Text>
                    <Value color={atleta_a.cartoes === atleta_b.cartoes ? 'gray' : (atleta_a.cartoes < atleta_b.cartoes ? '#c40808' : '#008000')}>{atleta_b.cartoes}</Value>
                </Item>
                <Title>MÉDIA SCOUTS POR PARTIDA</Title>
                <Item>
                    <Value color={atleta_a.media_gols === atleta_b.media_gols ? 'gray' : (atleta_a.media_gols > atleta_b.media_gols ? '#008000' : '#c40808')}>{atleta_a.media_gols}</Value>
                    <Text>GOLS</Text>
                    <Value color={atleta_a.media_gols === atleta_b.media_gols ? 'gray' : (atleta_a.media_gols > atleta_b.media_gols ? '#c40808' : '#008000')}>{atleta_b.media_gols}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.media_assistencia === atleta_b.media_assistencia ? 'gray' : (atleta_a.media_assistencia > atleta_b.media_assistencia ? '#008000' : '#c40808')}>{atleta_a.media_assistencia}</Value>
                    <Text>ASSISTÊNCIA</Text>
                    <Value color={atleta_a.media_assistencia === atleta_b.media_assistencia ? 'gray' : (atleta_a.media_assistencia > atleta_b.media_assistencia ? '#c40808' : '#008000')}>{atleta_b.media_assistencia}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.media_finalizacao === atleta_b.media_finalizacao ? 'gray' : (atleta_a.media_finalizacao > atleta_b.media_finalizacao ? '#008000' : '#c40808')}>{atleta_a.media_finalizacao}</Value>
                    <Text>FINALIZAÇÃO</Text>
                    <Value color={atleta_a.media_finalizacao === atleta_b.media_finalizacao ? 'gray' : (atleta_a.media_finalizacao > atleta_b.media_finalizacao ? '#c40808' : '#008000')}>{atleta_b.media_finalizacao}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.media_roubos === atleta_b.media_roubos ? 'gray' : (atleta_a.media_roubos > atleta_b.media_roubos ? '#008000' : '#c40808')}>{atleta_a.media_roubos}</Value>
                    <Text>DESARMES</Text>
                    <Value color={atleta_a.media_roubos === atleta_b.media_roubos ? 'gray' : (atleta_a.media_roubos > atleta_b.media_roubos ? '#c40808' : '#008000')}>{atleta_b.media_roubos}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.media_falta_sofrida === atleta_b.media_falta_sofrida ? 'gray' : (atleta_a.media_falta_sofrida > atleta_b.media_falta_sofrida ? '#008000' : '#c40808')}>{atleta_a.media_falta_sofrida}</Value>
                    <Text>FALTA SOFRIDA</Text>
                    <Value color={atleta_a.media_falta_sofrida === atleta_b.media_falta_sofrida ? 'gray' : (atleta_a.media_falta_sofrida > atleta_b.media_falta_sofrida ? '#c40808' : '#008000')}>{atleta_b.media_falta_sofrida}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.media_defesa === atleta_b.media_defesa ? 'gray' : (atleta_a.media_defesa > atleta_b.media_defesa ? '#008000' : '#c40808')}>{atleta_a.media_defesa}</Value>
                    <Text>DEFESAS</Text>
                    <Value color={atleta_a.media_defesa === atleta_b.media_defesa ? 'gray' : (atleta_a.media_defesa > atleta_b.media_defesa ? '#c40808' : '#008000')}>{atleta_b.media_defesa}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.media_impedimento === atleta_b.media_impedimento ? 'gray' : (atleta_a.media_impedimento < atleta_b.impedimento ? '#008000' : '#c40808')}>{atleta_a.media_impedimento}</Value>
                    <Text>IMPEDIMENTO</Text>
                    <Value color={atleta_a.media_impedimento === atleta_b.media_impedimento ? 'gray' : (atleta_a.media_impedimento < atleta_b.impedimento ? '#c40808' : '#008000')}>{atleta_b.media_impedimento}</Value>
                </Item>
                <Item>
                    <Value color={atleta_a.media_cartoes === atleta_b.media_cartoes ? 'gray' : (atleta_a.media_cartoes < atleta_b.cartoes ? '#008000' : '#c40808')}>{atleta_a.media_cartoes}</Value>
                    <Text>CARTÃO</Text>
                    <Value color={atleta_a.media_cartoes === atleta_b.media_cartoes ? 'gray' : (atleta_a.media_cartoes < atleta_b.cartoes ? '#c40808' : '#008000')}>{atleta_b.media_cartoes}</Value>
                </Item>
            </Content>
        </Container>
    );
}

export default compare;
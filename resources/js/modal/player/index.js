import React from 'react';

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
    Item4,
    Item5,
    Item6,
} from './styles';

function player({ data }) {

    return (
        <Container>
            <Item1>
                <Button>
                    <Icon>directions_run</Icon>
                    <Text1>Comparar</Text1>
                </Button>
                <Button>
                    <Icon>security</Icon>
                    <Text1>Ver confronto</Text1>
                </Button>
                <Name>{data.atleta.apelido}</Name>
                <Photo src={data.atleta.foto} />
                <Position>{`${data.posicoes[data.atleta.posicao_id].nome} | ${data.clubes[data.atleta.clube_id].abreviacao}`}</Position>
                <Date>{data.atleta.partida_data}</Date>
                <Matches>
                    <Shield src={data.clubes[data.atleta.confronto.split('x')[0]]['60x60']} />
                    x
                    <Shield src={data.clubes[data.atleta.confronto.split('x')[1]]['60x60']} />
                </Matches>
                <Logo />
            </Item1>
            <Item2>
                <Title>
                    <Text2 className='analise'>ANÁLISE</Text2>
                    <Text2 className='jogador'>DO JOGADOR</Text2>
                </Title>
            </Item2>
            <Item3></Item3>
            <Item4></Item4>
            <Item5></Item5>
            <Item6></Item6>
        </Container>
    );
}

export default player;
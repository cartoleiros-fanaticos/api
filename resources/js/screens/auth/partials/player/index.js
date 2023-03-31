import React from 'react';

import { amount } from '../../../../utils/helpers';

import {
    Container,
    List,
    Item,
    Photo,
    Name,
    Text1,
    Text2,
    Score,
    Scouts,
    Scout,
} from './styles';

import { Message } from '../../../../utils/styles';

function player({ data }) {
    return (
        <Container>
            {
                data.atletas.length
                    ?
                    <>
                        <List>
                            {
                                data.atletas.map((e, i) =>
                                    <Item key={i}>
                                        <Photo src={e.foto} />
                                        <Name>
                                            <Text1>{e.apelido}</Text1>
                                            <Text2>{e.posicao}</Text2>
                                        </Name>
                                        <Score>
                                            <Text1>{amount(e.pontuacao)}</Text1>
                                            <Text2>C$ {amount(e.valorizacao)}</Text2>
                                            <Scouts>
                                                {
                                                    data.scouts.map(item =>
                                                        <Scout value={e[item.sigla]} type={item.tipo}>{`${e[item.sigla]}${item.sigla}`}</Scout>
                                                    )
                                                }
                                            </Scouts>
                                        </Score>
                                    </Item>
                                )
                            }
                        </List>
                    </>
                    :
                    <Message>Nenhum registro encontrado.</Message>
            }

        </Container>
    );
}

export default player;
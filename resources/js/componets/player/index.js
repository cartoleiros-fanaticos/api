import React from 'react';

import { amount, message } from '../../utils/helpers';

import {
    Container,
    Captain,
    Photo,
    Description,
    Name,
    Position,
    Score,
    Value,
    Price,
    Scouts,
    Scout,
} from './styles';

function player({ data, capitao_id, scouts }) {
    return (
        <Container>
            {capitao_id && <Captain captain={capitao_id === data.atleta_id}>C</Captain>}
            <Photo src={data.foto} />
            <Description>
                <Name>{`${data.apelido} ( ${data.abreviacao_clube} )`}</Name>
                <Position>{data.posicao}</Position>
            </Description>
            <Score>
                <Value color={data.pontuacao}>{amount(data.pontuacao)} pts</Value>
                <Price>C$ {amount(data.preco_num)}</Price>
                {
                    scouts &&
                    <Scouts>
                        {
                            scouts.map(e =>
                                <Scout value={data[e.sigla]} type={e.tipo}>{`${data[e.sigla]}${e.sigla}`}</Scout>
                            )
                        }
                    </Scouts>
                }
            </Score>
        </Container>
    );
}

export default player;
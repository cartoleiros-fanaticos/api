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

function player({ data, capitao_id, scouts, parciais = [] }) {
    return (
        <Container active={data.entrou_em_campo}>
            {capitao_id && <Captain captain={capitao_id === data.atleta_id}>C</Captain>}
            <Photo src={data.foto} />
            <Description>
                <Name>{`${data.apelido} ( ${data.abreviacao_clube} )`}</Name>
                <Position>{data.posicao}</Position>
            </Description>
            <Score>
                {Object.keys(parciais).length ? <Value value={parciais[data.atleta_id]?.pontuacao}>{amount(parciais[data.atleta_id]?.pontuacao)} pts</Value> : <></>}
                {!Object.keys(parciais).length && <Price>C$ {amount(data.preco_num)}</Price>}
                {
                    scouts.length &&
                    <Scouts>
                        {
                            scouts.map((e, i) =>
                                <Scout key={i} value={parciais[data.atleta_id]?.[e.sigla]} type={e.tipo}>{`${parciais[data.atleta_id]?.[e.sigla]}${e.sigla}`}</Scout>
                            )
                        }
                    </Scouts>
                }
            </Score>
        </Container>
    );
}

export default player;
import React, { useState, useEffect } from 'react';

import { amount, message } from '../../utils/helpers';
import api from '../../utils/api';

import { Message } from '../../utils/styles';

import Loading from '../../componets/loading';
import Search from '../../componets/search';

import {
    Container,
    Item,
    Title,
    Shield,
    Name,
    Description
} from './styles';

function leagues({ fnc, smodal }) {

    const [data, sdata] = useState([]);
    const [loading, sloading] = useState(false);

    const [leagues, sleagues] = useState([]);

    useEffect(() => {
        const favorite_leagues = localStorage.getItem('favorite_leagues') ? JSON.parse(localStorage.getItem('favorite_leagues')) : [];
        sleagues(favorite_leagues);
    }, [])

    async function getData(value) {

        try {

            sloading(true);

            const { data } = await api.get(`parciais/ligas?nome_liga=${value}`);

            sdata(data);
            sloading(false);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    function enter(e) {
        {

            const team = leagues.find(i => i.nome === e.nome);

            if (!team) {

                if (leagues.length === 3) leagues.shift();

                leagues.push({
                    slug: e.slug,
                    liga_id: e.liga_id,
                    imagem: e.imagem,
                    nome: e.nome,
                    quantidade_times: e.quantidade_times
                });

                localStorage.setItem('favorite_leagues', JSON.stringify(leagues));

            }

            smodal(false);
            fnc(e)

        }
    }

    return (
        <>
            <Search
                width='100%'
                placeholder="Digite nome da liga"
                icon="groups"
                onKeyUp={(e) => {
                    if (e.target.value && e.key === 'Enter') getData(e.target.value);
                }}
            />
            <Container>
                {
                    loading ?
                        <Loading />
                        :
                        <>
                            {
                                leagues.length
                                    ?
                                    <>
                                        <Title>Ligas favoritos</Title>
                                        {
                                            leagues.map((e, i) =>
                                                <Item onClick={() => {
                                                    smodal(false);
                                                    fnc(e)
                                                }} key={i}>
                                                    <Shield src={e.imagem} />
                                                    <Name>{e.nome}</Name>
                                                    <Description>{e.quantidade_times || 0} Times</Description>
                                                </Item>
                                            )
                                        }
                                    </>
                                    :
                                    <></>
                            }
                            {
                                data.length
                                    ?
                                    <>
                                        <Title>Ligas pesquisados</Title>
                                        {
                                            data.map((e, i) =>
                                                <Item onClick={() => enter(e)} key={i}>
                                                    <Shield src={e.imagem} />
                                                    <Name>{e.nome}</Name>
                                                    <Description>{e.quantidade_times || 0} Times</Description>
                                                </Item>
                                            )
                                        }
                                    </>
                                    :
                                    <Message>Nenhum liga encontrado.</Message>
                            }
                        </>
                }
            </Container>
        </>
    );
}

export default leagues;
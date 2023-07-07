import React, { useState, useEffect } from 'react';

import { amount, message, swal_success } from '../../../../utils/helpers';
import api from '../../../../utils/api';

import Loader from 'react-loader-spinner';

import {
    Container,
    Add,
    List,
    Item,
    Clear,
    Label,
    Text,
    Input,
    Select,
    Option,
    Button,
} from './styles';

function leagues({ data, smodal, fnc }) {

    const [league, sleague] = useState(data);
    const [loading, sloading] = useState(false);

    function add() {
        const percent = document.querySelector('.percent');

        if (percent.value) {

            sleague({
                ...league,
                posicoes: [
                    ...league.posicoes,
                    { posicao: league.posicoes.length + 1, percentual: percent.value }
                ]
            });

            percent.value = '';
        }

    }

    async function enter(e) {

        e.preventDefault();

        sloading(true);

        try {

            league.num_posicoes = league.posicoes.length;

            if (data.id)
                await api.put(`competicao/${data.id}`, league);
            else
                await api.post(`competicao`, league);

            swal_success('Cadastro atualizado com sucesso.')
            fnc();

            smodal(false);
            sloading(false);

        } catch (e) {
            message(e);
            sloading(false);
        };

    }

    return (
        <Container onSubmit={enter}>
            <Label>
                <Text>Nome</Text>
                <Input onChange={(e) => sleague({ ...league, nome: e.target.value })} value={league.nome} />
            </Label>
            <Label>
                <Text>Tipo</Text>
                <Select onChange={(e) => sleague({ ...league, tipo: e.target.value })} value={league.tipo}>
                    <Option value="">Selecione o tipo</Option>
                    <Option value="rodada">Rodada</Option>
                    <Option value="mensal">Mensal</Option>
                    <Option value="turno">Turno</Option>
                    <Option value="anual">Anual</Option>
                </Select>
            </Label>
            <Label>
                <Text>Com capitão</Text>
                <Select onChange={(e) => sleague({ ...league, capitao: e.target.value })} value={league.capitao}>
                    <Option value="">Selecione</Option>
                    <Option value="Sim">Sim</Option>
                    <Option value="Não">Não</Option>
                </Select>
            </Label>
            <Label>
                <Text>Comissão</Text>
                <Input onChange={(e) => sleague({ ...league, comissao: e.target.value })} value={league.comissao} type="number" />
            </Label>
            <Label>
                <Text>Valor</Text>
                <Input onChange={(e) => sleague({ ...league, valor: e.target.value })} value={league.valor} type="number" />
            </Label>
            <Label>
                <Text>Rodada inicial</Text>
                <Input onChange={(e) => sleague({ ...league, de: e.target.value })} value={league.de} type="number" />
            </Label>
            <Label>
                <Text>Rodada final</Text>
                <Input onChange={(e) => sleague({ ...league, ate: e.target.value })} value={league.ate} type="number" />
            </Label>
            <Label>
                <Text>Ativo</Text>
                <Select onChange={(e) => sleague({ ...league, ativo: e.target.value })} value={league.ativo}>
                    <Option value="Sim">Sim</Option>
                    <Option value="Não">Não</Option>
                </Select>
            </Label>
            <Label>
                <Text>Posições</Text>
                <Item>
                    <Input className='percent' placeholder="Digite um valor percentual" type="number" />
                    <Add onClick={add}>Adicionar</Add>
                    <List>
                        {
                            league.posicoes.length ?
                                <>
                                    <Clear onClick={() => sleague({ ...league, posicoes: [] })}>Limpar posicões</Clear>
                                    {
                                        league.posicoes.map((e, i) =>
                                            <p key={i}>{e.posicao}º posição - {e.percentual}% do valor total mesnos comissão</p>
                                        )
                                    }
                                </>
                                :
                                <></>
                        }
                    </List>
                </Item>
            </Label>
            <Label>
                <Text>Descrição</Text>
                <Input onChange={(e) => sleague({ ...league, descricao: e.target.value })} value={league.descricao} />
            </Label>
            <Label>
                <Text>&nbsp;</Text>
                <Button type="submit">
                    {loading ? <Loader visible={true} type="TailSpin" color="#000" height={18} width={18} /> : <span>Atualizar</span>}
                </Button>
            </Label>
        </Container>
    );
}

export default leagues;
import React, { useState, useEffect } from 'react';

import { amount, message, swal_success } from '../../utils/helpers';
import api from '../../utils/api';

import InputMask from "react-input-mask";
import Loader from 'react-loader-spinner';

import {
    Container,
    Label,
    Text,
    Input,
    Select,
    Option,
    Button,
} from './styles';

function users({ data, smodal }) {

    const [user, suser] = useState({ ...data, celular: format_phone(data.celular) });
    const [loading, sloading] = useState(false);

    function format_phone(phone) {
        const ddd = phone.substr(0, 2);
        const first = phone.substr(2, 5);
        const second = phone.substr(7, 4);

        return `(${ddd}) ${first}-${second}`;
    }

    const form = new FormData();

    async function enter(e) {

        e.preventDefault();

        for (let x in user)
            form.append(x, user[x]);

        sloading(true);

        try {

            await api.post(`usuarios`, form);
            swal_success('Cadastro atualizado com sucesso.')

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
                <Input onChange={(e) => suser({ ...user, nome: e.target.value })} value={user.nome} />
            </Label>
            <Label>
                <Text>Senha</Text>
                <Input onChange={(e) => suser({ ...user, password: e.target.value })} value={user.password} type="password" />
            </Label>
            <Label>
                <Text>Email</Text>
                <Input onChange={(e) => suser({ ...user, email: e.target.value })} value={user.email} disabled type="email" />
            </Label>
            <Label>
                <Text>Foto</Text>
                <Input onChange={(e) => { form.append('foto', e.target.files[0]); }} accept="image/png, image/jpeg, image/jpg" type="file" title="&nbsp;" />
            </Label>
            <Label>
                <Text>Celular</Text>
                <InputMask mask="(99) 99999-9999" required placeholder="WhatsApp" onChange={(e) => suser({ ...user, celular: e.target.value })} value={user.celular} />
            </Label>
            <Label>
                <Text>Função</Text>
                <Select onChange={(e) => suser({ ...user, funcao: e.target.value })} value={user.funcao}>
                    <Option value="Admin">Admin</Option>
                    <Option value="Funcionario">Funcionario</Option>
                    <Option value="Cartoleiro">Cartoleiro</Option>
                    <Option value="Dono de Liga">Dono de Liga</Option>
                </Select>
            </Label>
            <Label>
                <Text>Comissão</Text>
                <Input onChange={(e) => suser({ ...user, comissao: e.target.value })} value={user.comissao} disabled={user.funcao != 'Dono de Liga'} type="number" />
            </Label>
            <Label>
                <Text>Plano</Text>
                <Select onChange={(e) => suser({ ...user, plano: e.target.value })} value={user.plano}>
                    <Option value="Demonstrativo">Demonstrativo</Option>
                    <Option value="Free Cartoleiro">Free Cartoleiro</Option>
                    <Option value="Plano Stats">Plano Stats</Option>
                    <Option value="Plano Fanático">Plano Fanático</Option>
                </Select>
            </Label>
            <Label>
                <Text>Ativo</Text>
                <Select onChange={(e) => suser({ ...user, ativo: e.target.value })} value={user.ativo}>
                    <Option value="Sim">Sim</Option>
                    <Option value="Não">Não</Option>
                </Select>
            </Label>
            <Label>
                <Text>&nbsp;</Text>
                <Button>
                    {loading ? <Loader visible={true} type="TailSpin" color="#000" height={18} width={18} /> : <span>Atualizar</span>}
                </Button>
            </Label>
        </Container>
    );
}

export default users;
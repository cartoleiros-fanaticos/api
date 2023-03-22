import React, { useEffect, useState, useRef } from 'react';
import backButton from 'browser-back-button';
import Loader from 'react-loader-spinner';
import { message, swal_ask, swal_success } from '../../utils/helpers';
import api from '../../utils/api';
import InputMask from "react-input-mask";

import {
    Container,
    Title,
    Form,
    Label,
    Input,
    Icon,
    Button,
} from './styles';

function register({ history }) {

    const [user, suser] = useState({
        nome: '',
        celular: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [loading, sloading] = useState(false);

    async function enter(e) {

        e.preventDefault();

        sloading(true);

        try {

            let { data: { access_token } } = await api.post('usuarios', user);

            localStorage.setItem('token', access_token);
            history.push('/adm');

        } catch (e) {
            message(e);
            sloading(false);
        };
    }

    return (
        <Container>
            <Title>Cadastro de Usuários</Title>
            <Form onSubmit={enter}>
                <Label>
                    <Input required placeholder="Nome" onChange={(e) => suser({ nome: e.target.value })} value={user.nome} />
                    <Icon>person</Icon>
                </Label>
                <Label>
                    <InputMask mask="(99) 99999-9999" required placeholder="WhatsApp" onChange={(e) => suser({ celular: e.target.value })} value={user.celular} />
                    <Icon>stay_current_portrait</Icon>
                </Label>
                <Label>
                    <Input type="email" required placeholder="Email" onChange={(e) => suser({ email: e.target.value })} value={user.email} />
                    <Icon>mail_outline</Icon>
                </Label>
                <Label>
                    <Input type="password" placeholder="Senha" required onChange={(e) => suser({ ...user, password: e.target.value })} value={user.password} />
                    <Icon>lock</Icon>
                </Label>
                <Label>
                    <Input type="password" placeholder="Confirmar Senha" required onChange={(e) => suser({ ...user, confirm_password: e.target.value })} value={user.confirm_password} />
                    <Icon>lock</Icon>
                </Label>
                <Button>
                    {loading ? <Loader visible={true} type="TailSpin" color="#fff" height={30} width={30} /> : <span>Cadastrar</span>}
                </Button>
            </Form>
        </Container>
    );

}

export default register;
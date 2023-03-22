import React, { useEffect, useState, useRef } from 'react';
import Loader from 'react-loader-spinner';
import { message, swal_success } from '../../utils/helpers';
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
        password_confirm: '',
    });

    useEffect(() => {

        let el = document.querySelectorAll('input[type=email]');
        el.forEach(e => {
            console.log(e);
            e.type = 'text';
            e.removeAttribute('autocomplete')
        })

    }, [])

    const [loading, sloading] = useState(false);

    async function enter(e) {

        e.preventDefault();

        sloading(true);

        try {

            await api.post('usuarios', user);
            swal_success('Cadastro realizado com sucesso, você será redirecionado.');

            setTimeout(() => {
                history.push('/adm');
            }, 2000);

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
                    <Input required placeholder="Nome" onChange={(e) => suser({ ...user, nome: e.target.value })} value={user.nome} />
                    <Icon>person</Icon>
                </Label>
                <Label>
                    <InputMask mask="(99) 99999-9999" required placeholder="WhatsApp" onChange={(e) => suser({ ...user, celular: e.target.value })} value={user.celular} />
                    <Icon>stay_current_portrait</Icon>
                </Label>
                <Label>
                    <Input type="email" autocomplete="off" required placeholder="Email" onChange={(e) => suser({ ...user, email: e.target.value })} value={user.email} />
                    <Icon>mail_outline</Icon>
                </Label>
                <Label>
                    <Input type="password" placeholder="Senha" required onChange={(e) => suser({ ...user, ...user, password: e.target.value })} value={user.password} />
                    <Icon>lock</Icon>
                </Label>
                <Label>
                    <Input type="password" placeholder="Confirmar Senha" required onChange={(e) => suser({ ...user, ...user, password_confirm: e.target.value })} value={user.password_confirm} />
                    <Icon>lock</Icon>
                </Label>
                <Button>
                    {loading ? <Loader visible={true} type="TailSpin" color="#fff" height={25} width={25} /> : <span>Cadastrar</span>}
                </Button>
            </Form>
        </Container>
    );

}

export default register;
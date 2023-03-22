import React, { useEffect, useState, useRef } from 'react';
import backButton from 'browser-back-button';
import Loader from 'react-loader-spinner';
import { message, swal_ask, swal_success } from '../../utils/helpers';
import api from '../../utils/api';

import { useNavigate } from "react-router-dom";

import {
    Container,
    Logo,
    Form,
    Label,
    Input,
    Icon,
    Button,
    Text,
    Link,
} from './styles';

function login() {

    let navigate = useNavigate();

    const [user, suser] = useState({
        email: '',
        password: '',
    });

    useEffect(() => console.log(location), [])

    const [loading, sloading] = useState(false);

    async function enter(e) {

        e.preventDefault();

        sloading(true);

        try {

            let { data: { access_token } } = await api.post('login', user);

            localStorage.setItem('token', access_token);
            navigate('/auth/atletas');

        } catch (e) {
            message(e);
            sloading(false);
        };
    }

    return (
        <Container>
            <Logo />
            <Form onSubmit={enter}>
                <Label>
                    <Input type="email" required placeholder="Email" onChange={(e) => suser({ email: e.target.value })} value={user.email} />
                    <Icon>person</Icon>
                </Label>
                <Label>
                    <Input type="password" required onChange={(e) => suser({ ...user, password: e.target.value })} value={user.password} placeholder="Senha" />
                    <Icon>lock</Icon>
                </Label>
                <Button>
                    {loading ? <Loader visible={true} type="TailSpin" color="#fff" height={30} width={30} /> : <span>ACESSAR</span>}
                </Button>
                <Text>Não tem uma conta? <Link to="/cadastro">Crie uma</Link></Text>
                <Text>Esqueceu sua senha? <Link>Recuperar senha</Link></Text>
            </Form>
        </Container>
    );

}

export default login;
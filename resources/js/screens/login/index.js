import React, { useEffect, useState, useRef } from 'react';

import Loader from 'react-loader-spinner';
import { message } from '../../utils/helpers';
import api from '../../utils/api';

import ModalRecovery from '../../modal/recovery';
import Modal from '../../componets/modal';

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

    const [modal, smodal] = useState(false);

    const [user, suser] = useState({
        email: '',
        password: '',
    });

    const [loading, sloading] = useState(false);

    useEffect(() => {
        
        const token = localStorage.getItem('token');

        if (token)
            navigate('/auth/atletas');

    }, [])

    async function enter(e) {

        e.preventDefault();

        sloading(true);

        try {

            let { data: { auth: { access_token }, user: usr } } = await api.post('login', user);

            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(usr));
            
            sloading(false);

            navigate('/auth/atletas');

        } catch (e) {
            message(e);
            sloading(false);
        };
    }

    return (
        <>
            <Container>
                <Logo />
                <Form onSubmit={enter}>
                    <Label>
                        <Input type="email" required placeholder="Email" onChange={(e) => suser({ ...user, email: e.target.value })} value={user.email} />
                        <Icon>person</Icon>
                    </Label>
                    <Label>
                        <Input type="password" required onChange={(e) => suser({ ...user, password: e.target.value })} value={user.password} placeholder="Senha" />
                        <Icon>lock</Icon>
                    </Label>
                    <Button>
                        {loading ? <Loader visible={true} type="TailSpin" color="#fff" height={30} width={30} /> : <span>ACESSAR</span>}
                    </Button>
                    <Text>Criar conta gratuita? <Link to="/cadastro">Crie uma</Link></Text>
                    <Text>Esqueceu sua senha? <Link href="javascript:void(0)" onClick={() => smodal(true)}>Recuperar senha</Link></Text>
                </Form>
            </Container>
            {
                modal &&
                <Modal
                    icon="lock"
                    title="Recuperar senha"
                    modal={modal}
                    smodal={smodal}
                    Component={ModalRecovery}
                />
            }
        </>
    );

}

export default login;
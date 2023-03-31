import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import InputMask from "react-input-mask";

import { amount, message, swal_success } from '../../../utils/helpers';
import api from '../../../utils/api';

import Container from '../../../componets/container';

import {
    Content,
    Form,
    Label,
    Input,
    Icon,
    Textarea,
    Button,
} from './styles';

function contact() {

    const [user, suser] = useState({
        nome: '',
        celular: '',
        email: '',
        mensagem: '',
    });

    useEffect(() => {
        const usr = JSON.parse(localStorage.getItem('user'));

        console.log(usr);

        suser({
            ...user,
            nome: usr.nome,
            celular: usr.celular,
            email: usr.email
        });
        
    }, [])

    const [loading, sloading] = useState(false);

    async function enter(e) {

        e.preventDefault();

        sloading(true);

        try {

            await api.post('login', user);
            swal_success('Email enviado com sucesso em breve entraremos em contato.')

        } catch (e) {
            message(e);
            sloading(false);
        };
    }

    const component = () => (
        <Content>
            <Form onSubmit={enter}>
                <Label>
                    <Icon>person</Icon>
                    <Input required placeholder="Nome" onChange={(e) => suser({ ...user, nome: e.target.value })} value={user.nome} />
                </Label>
                <Label>
                    <Icon>stay_current_portrait</Icon>
                    <InputMask mask="(99) 99999-9999" required placeholder="WhatsApp" onChange={(e) => suser({ ...user, celular: e.target.value })} value={user.celular} />
                </Label>
                <Label>
                    <Icon>mail_outline</Icon>
                    <Input type="email" autocomplete="off" required placeholder="Email" onChange={(e) => suser({ ...user, email: e.target.value })} value={user.email} />
                </Label>
                <Textarea onChange={(e) => suser({ ...user, mensagem: e.target.value })} value={user.mensagem}></Textarea>
                <Button>
                    {loading ? <Loader visible={true} type="TailSpin" color="#fff" height={25} width={25} /> : <span>ENVIAR</span>}
                </Button>
            </Form>
        </Content>
    );

    return (
        <Container
            title='Fale Conosco'
            Component={component}
        />
    );
}

export default contact;
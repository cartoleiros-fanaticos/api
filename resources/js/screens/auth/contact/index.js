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
        assunto: '',
        celular: '',
        email: '',
        mensagem: '',
    });

    useEffect(() => {
        const usr = JSON.parse(localStorage.getItem('user'));

        suser({
            ...user,
            nome: usr.nome,
            celular: format_phone(usr.celular),
            email: usr.email
        });

    }, [])

    function format_phone(phone) {
        const ddd = phone.substr(0, 2);
        const first = phone.substr(2, 5);
        const second = phone.substr(7, 4);

        return `(${ddd}) ${first}-${second}`;
    }

    const [loading, sloading] = useState(false);

    const form = new FormData();

    async function enter(e) {

        e.preventDefault();

        for (let x in user)
            form.append(x, user[x]);

        sloading(true);

        try {

            await api.post('enviar-email/contato', form);
            swal_success('Email enviado com sucesso em breve entraremos em contato.')

            suser({
                ...user,
                assunto: '',
                mensagem: '',
            })

            sloading(false);

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
                    <Icon>subject</Icon>
                    <Input required placeholder="Assunto" onChange={(e) => suser({ ...user, assunto: e.target.value })} value={user.assunto} />
                </Label>
                <Label>
                    <Icon>stay_current_portrait</Icon>
                    <InputMask mask="(99) 99999-9999" required placeholder="WhatsApp" onChange={(e) => suser({ ...user, celular: e.target.value })} value={user.celular} />
                </Label>
                <Label>
                    <Icon>attach_file</Icon>
                    <Input onChange={(e) => { form.append('image', e.target.files[0]); }} accept="image/png, image/jpeg, image/jpg" type="file" required />
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
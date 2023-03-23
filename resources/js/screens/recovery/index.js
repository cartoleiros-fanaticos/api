import React, { useEffect, useState, useRef } from 'react';
import Loader from 'react-loader-spinner';
import { message, swal_success } from '../../utils/helpers';
import api from '../../utils/api';

import { useNavigate } from "react-router-dom";

import {
    Container,
    Logo,
    Title,
    Form,
    Label,
    Input,
    Icon,
    Button,
} from './styles';

function recovery() {

    let navigate = useNavigate();

    const [user, suser] = useState({
        password: '',
        password_confirm: '',
    });

    const [loading, sloading] = useState(false);

    async function enter(e) {

        e.preventDefault();

        sloading(true);

        try {

            const { data : { access_token } } = await api.post('recuperar-senha?action=new_password', user);
            swal_success('Senha alterada com sucesso, você será redirecionado.');

            localStorage.setItem('token', access_token);

            setTimeout(() => {
                navigate('/auth/atletas');
            }, 2000);

        } catch (e) {
            message(e);
            sloading(false);
        };
    }


    return (
        <Container>
            <Logo />
            <Title>Recuperação de Senha</Title>
            <Form onSubmit={enter}>
                <Label>
                    <Input type="password" placeholder="Senha" required onChange={(e) => suser({ ...user, ...user, password: e.target.value })} value={user.password} />
                    <Icon>lock</Icon>
                </Label>
                <Label>
                    <Input type="password" placeholder="Confirmar Senha" required onChange={(e) => suser({ ...user, ...user, password_confirm: e.target.value })} value={user.password_confirm} />
                    <Icon>lock</Icon>
                </Label>
                <Button>
                    {loading ? <Loader visible={true} type="TailSpin" color="#fff" height={25} width={25} /> : <span>Alterar Senha</span>}
                </Button>
            </Form>
        </Container>
    );
}

export default recovery;

{/* <div class="container">
  <img src="./assets/imagens/logo.png" >
  <h2>Recuperação de Senha</h2>
  <form (ngSubmit)="novaSenha()">
    <input required type="password" name="password" [(ngModel)]="password" placeholder="Nova senha">
    <input required type="password" name="repassword" [(ngModel)]="repassword" placeholder="Confirmação da nova senha">
    <input type="submit" value="Alterar Senha">
  </form>
</div> */}

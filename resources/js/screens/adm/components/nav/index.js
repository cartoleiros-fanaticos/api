import React from 'react';

import { useNavigate } from "react-router-dom";

import {
    Container,
    Avatar,
    List,
    Item,
    Icon,
    Text,
} from './styles';

function nav({ data }) {

    let navigate = useNavigate();

    return (
        <Container>
            <Avatar src={data.auth.foto || '../../images/upload/avatar.png'} />
            <List>
                <Item to="auth/adm/dados">
                    <Icon>account_circle</Icon>
                    <Text>Minha conta</Text>
                </Item>
                <Item to="/auth/adm/usuarios">
                    <Icon>manage_accounts</Icon>
                    <Text>Usuarios</Text>
                </Item>
                <Item to="auth/adm/ligas">
                    <Icon>admin_panel_settings</Icon>
                    <Text>Ligas</Text>
                </Item>
                <Item to="/auth/atletas">
                    <Icon>logout</Icon>
                    <Text>Sair</Text>
                </Item>
            </List>
        </Container>
    );
}

export default nav;
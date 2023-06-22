import React from 'react';

import {
    Container,
    Header,
    Icon,
    Title,
    Item,
    Text,
} from './styles';

function nav({ user }) {
    return (
        <Container>
            <Header>
                <Icon size="25px">close</Icon>
                <Title>Menu</Title>
            </Header>
            <Item to="/auth/ligas">
                <Icon>home</Icon>
                <Text>Home</Text>
            </Item>
            <Item>
                <Icon>manage_accounts</Icon>
                <Text>Minha conta</Text>
            </Item>
            <Item to="/auth/ligas/minhas-ligas">
                <Icon>admin_panel_settings</Icon>
                <Text>Minhas ligas</Text>
            </Item>
            <Item to="/auth/ligas/meus-times">
                <Icon>security</Icon>
                <Text>Meus times</Text>
            </Item>
            <Item to="/auth/ligas/minhas-inscricoes">
                <Icon>confirmation_number</Icon>
                <Text>Minhas Inscrições</Text>
            </Item>
        </Container>
    );
}

export default nav;
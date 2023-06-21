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
            <Item>
                <Icon>manage_accounts</Icon>
                <Text>Minha conta</Text>
            </Item>
            <Item>
                <Icon>admin_panel_settings</Icon>
                <Text>Minhas ligas</Text>
            </Item>
            <Item to="/auth/ligas/times">
                <Icon>security</Icon>
                <Text>Meus times</Text>
            </Item>
            <Item to="/auth/ligas/solicitacoes">
                <Icon>confirmation_number</Icon>
                <Text>Inscrições</Text>
            </Item>
            {
                user &&
                <>
                    <Item>
                        <Icon>emoji_events</Icon>
                        <Text>Ligas anual</Text>
                    </Item>
                    <Item>
                        <Icon>emoji_events</Icon>
                        <Text>Ligas turno</Text>
                    </Item>
                    <Item>
                        <Icon>emoji_events</Icon>
                        <Text>Ligas mensal</Text>
                    </Item>
                    <Item>
                        <Icon>emoji_events</Icon>
                        <Text>Ligas rodada</Text>
                    </Item>
                </>
            }
        </Container>
    );
}

export default nav;
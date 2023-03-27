import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

import {
    Container,
    Logo,
    Icon,
    Nav,
    Item,
    SubItem,
} from './styles';

function header() {

    const plano = '';

    return (
        <Container>
            <NavLink to="/auth/">
                <Logo />
            </NavLink>
            <Icon>dehaze</Icon>
            <Nav>
                {
                    plano != 'Plano Stats' &&
                    <Item>
                        <NavLink to="/auth/escalacao">
                            <Icon>assignment</Icon>
                            ESCALAÇÃO
                        </NavLink>
                    </Item>
                }
                <Item>
                    <NavLink to="javascript:void(0)">
                        <Icon>assessment</Icon>
                        ESTATÍSTICAS
                    </NavLink>
                    <SubItem>
                        <Item>
                            <NavLink to="/auth/cruzamento-scouts">
                                <Icon>assessment</Icon>
                                CRUZAMENTO SCOUTS
                            </NavLink>
                        </Item>
                        <Item>
                            <NavLink to="/auth/cruzamento-pontos">
                                <Icon>assessment</Icon>
                                CRUZAMENTO PONTOS
                            </NavLink>
                        </Item>
                        <Item>
                            <NavLink to="/auth/cruzamento-media">
                                <Icon>assessment</Icon>
                                CRUZAMENTO MÉDIA
                            </NavLink>
                        </Item>
                    </SubItem>
                </Item>
                <Item>
                    <NavLink to="/auth/parciais">
                        <Icon>directions_run</Icon>
                        PARCIAIS
                    </NavLink>
                </Item>
                <Item>
                    <NavLink to="/auth/atletas">
                        <Icon>shopping_basket</Icon>
                        MERCADO
                    </NavLink>
                </Item>
                <Item>
                    <NavLink to="/auth/videos">
                        <Icon>videocam</Icon>
                        VÍDEOS
                    </NavLink>
                </Item>
                {
                    plano != 'Plano Stats' &&
                    <Item>
                        <NavLink to="/auth/ligas">
                            <Icon>verified_user</Icon>
                            LIGAS
                        </NavLink>
                    </Item>
                }
                <Item>
                    <NavLink to="/auth/loja">
                        <Icon>shopping_cart</Icon>
                        LOJA
                    </NavLink>
                </Item>
                <Item>
                    <NavLink to="/auth/destaques">
                        <Icon>trending_up</Icon>
                        DESTAQUES
                    </NavLink>
                </Item>
                <Item>
                    <NavLink to="/auth/contato">
                        <Icon>mail_outline</Icon>
                        CONTATO
                    </NavLink>
                </Item>
                {
                    (plano === 'Demonstrativo' || plano === 'Free Cartoleiro') &&
                    <Item>
                        <NavLink to="/auth/planos">
                            <Icon>wysiwyg</Icon>
                            ASSINE JÁ
                        </NavLink>
                    </Item>
                }
            </Nav>
        </Container>
    )

}

export default header;
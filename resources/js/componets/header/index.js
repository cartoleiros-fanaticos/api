import React, { useState } from 'react';
import { Link } from "react-router-dom";

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
            <Link to="/">
                <Logo />
            </Link>
            <Icon>dehaze</Icon>
            <Nav>
                {
                    plano != 'Plano Stats' &&
                    <Item>
                        <Link to="/escalacao">
                            <Icon>assignment</Icon>
                            ESCALAÇÃO
                        </Link>
                    </Item>
                }
                <Item>
                    <Link href="javascript:void(0)">
                        <Icon>assessment</Icon>
                        ESTATÍSTICAS
                    </Link>
                    <SubItem>
                        <Item>
                            <Link to="cruzamento-scouts">
                                <Icon>assessment</Icon>
                                CRUZAMENTO SCOUTS
                            </Link>
                        </Item>
                        <Item>
                            <Link to="cruzamento-pontos">
                                <Icon>assessment</Icon>
                                CRUZAMENTO PONTOS
                            </Link>
                        </Item>
                        <Item>
                            <Link to="cruzamento-media">
                                <Icon>assessment</Icon>
                                CRUZAMENTO MÉDIA
                            </Link>
                        </Item>
                    </SubItem>
                </Item>
                <Item>
                    <Link to="/parciais">
                        <Icon>directions_run</Icon>
                        PARCIAIS
                    </Link>
                </Item>
                <Item>
                    <Link to="/atletas">
                        <Icon>shopping_basket</Icon>
                        MERCADO
                    </Link>
                </Item>
                <Item>
                    <Link to="/videos">
                        <Icon>videocam</Icon>
                        VÍDEOS
                    </Link>
                </Item>
                {
                    plano != 'Plano Stats' &&
                    <Item>
                        <Link to="/ligas">
                            <Icon>verified_user</Icon>
                            LIGAS
                        </Link>
                    </Item>
                }
                <Item>
                    <Link to="/loja">
                        <Icon>shopping_cart</Icon>
                        LOJA
                    </Link>
                </Item>
                <Item>
                    <Link to="/destaques">
                        <Icon>trending_up</Icon>
                        DESTAQUES
                    </Link>
                </Item>
                <Item>
                    <Link to="/contato">
                        <Icon>mail_outline</Icon>
                        CONTATO
                    </Link>
                </Item>
                {
                    (plano === 'Demonstrativo' || plano === 'Free Cartoleiro') &&
                    <Item>
                        <Link to="/planos">
                            <Icon>wysiwyg</Icon>
                            ASSINE JÁ
                        </Link>
                    </Item>
                }
            </Nav>
        </Container>
    )

}

export default header;
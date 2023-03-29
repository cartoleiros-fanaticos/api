import React, { useState, useRef } from 'react';
import { NavLink } from "react-router-dom";
import backButton from 'browser-back-button';

import {
    Container,
    Screen,
    Logo,
    Icon,
    Nav,
    Header,
    Title,
    Close,
    Item,
    SubItem,
} from './styles';

function header() {

    const body = document.querySelector('body');
    const container = document.querySelector('.container');
    const content = document.querySelector('.content');

    const menu = useRef();
    const screen = useRef();

    const plano = '';

    function open_menu() {

        container.style.cssText = `
            position: static;
        `;

        body.style.cssText = `
            overflow: hidden;
        `;

        content.style.cssText = `
            margin: 4px auto 0 auto;
        `;

        menu.current.style.left = 0;

        screen.current.style.opacity = 1;
        screen.current.style.visibility = 'visible';

        backButton.on(() => {
            close_menu();
        });
    }

    function close_menu() {

        container.style.cssText = `
            position: fixed;
        `;

        body.style.cssText = `
            overflow: auto;
        `;

        content.style.cssText = `
            margin: 60px auto 0 auto;
        `;

        screen.current.style.opacity = 0;
        screen.current.style.visibility = 'hidden';

        menu.current.style.left = '-70%';
    }

    return (
        <>
            <Container className='container'>
                <Icon onClick={open_menu}>menu</Icon>
                <NavLink to="/auth/">
                    <Logo />
                </NavLink>
                <Nav ref={menu}>
                    <Header>
                        <Title>Menu</Title>
                        <Close onClick={close_menu}>close</Close>
                    </Header>
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
                        <NavLink to="#">
                            <Icon>assessment</Icon>
                            CRUZAMENTOS
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
                    <Item>
                        <NavLink className="planos" to="/auth/planos">
                            <Icon>wysiwyg</Icon>
                            ASSINE JÁ
                        </NavLink>
                    </Item>
                </Nav>
            </Container >
            <Screen onClick={close_menu} ref={screen}></Screen>
        </>
    )

}

export default header;
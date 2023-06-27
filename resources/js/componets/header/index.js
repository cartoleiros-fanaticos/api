import React, { useState, useRef, useEffect } from 'react';

import Loader from 'react-loader-spinner';
import { NavLink } from "react-router-dom";
import backButton from 'browser-back-button';

import { amount, message, swal_success } from '../../utils/helpers';
import api from '../../utils/api';

import { useNavigate } from "react-router-dom";

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
    ButtonLink,
    SubItem,
} from './styles';

function header() {

    const user = JSON.parse(localStorage.getItem('user'));

    let navigate = useNavigate();

    const { innerWidth: width } = window;

    const [loading, sloading] = useState(false);

    const body = document.querySelector('body');
    const container = document.querySelector('.container');
    const content = document.querySelector('.content');

    const menu = useRef();
    const screen = useRef();

    function open_menu() {

        container.style.cssText = `
            position: static;
        `;

        // body.style.cssText = `
        //     overflow: hidden;
        // `;

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

    async function logout() {

        try {

            sloading(true);

            await api.post('logout', {});

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            sloading(false)

            navigate('/');

        } catch (e) {
            sloading(false);
            message(e);
        };
    }

    return (
        <>
            <Container className='container'>
                <Icon onClick={open_menu}>menu</Icon>
                <NavLink to="/auth/atletas">
                    <Logo />
                </NavLink>
                <Nav ref={menu}>
                    <Header>
                        <Title>Menu</Title>
                        <Close onClick={close_menu}>close</Close>
                    </Header>
                    <Item>
                        <NavLink to="/auth/escalacao">
                            <Icon>assignment</Icon>
                            ESCALAÇÃO
                        </NavLink>
                    </Item>
                    <Item>
                        <ButtonLink>
                            <Icon>assessment</Icon>
                            CRUZAMENTOS
                        </ButtonLink>
                        <SubItem className='cruzamento'>
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
                        <ButtonLink>
                            <Icon>directions_run</Icon>
                            PARCIAIS
                        </ButtonLink>
                        <SubItem className='parciais'>
                            <Item>
                                <NavLink to="/auth/parciais/atletas">
                                    <Icon>directions_run</Icon>
                                    PARCIAIS ATLETAS
                                </NavLink>
                            </Item>
                            <Item>
                                <NavLink to="/auth/parciais/clubes">
                                    <Icon>security</Icon>
                                    PARCIAIS CLUBES
                                </NavLink>
                            </Item>
                            <Item>
                                <NavLink to="/auth/parciais/times">
                                    <Icon>person</Icon>
                                    PARCIAIS TIMES
                                </NavLink>
                            </Item>
                            <Item>
                                <NavLink to="/auth/parciais/ligas">
                                    <Icon>groups</Icon>
                                    PARCIAIS LIGAS
                                </NavLink>
                            </Item>
                        </SubItem>
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
                    <Item>
                        <ButtonLink to="/auth/ligas">
                            <Icon>verified_user</Icon>
                            LIGAS
                        </ButtonLink>
                        <SubItem className='ligas'>
                            <Item>
                                <NavLink to="/auth/ligas">
                                    <Icon>home</Icon>
                                    HOME
                                </NavLink>
                            </Item>
                            <Item>
                                <NavLink to="/auth/minhas-ligas">
                                    <Icon>admin_panel_settings</Icon>
                                    MINHAS LIGAS
                                </NavLink>
                            </Item>
                            <Item>
                                <NavLink to="/auth/meus-times">
                                    <Icon>security</Icon>
                                    MEUS TIMES
                                </NavLink>
                            </Item>
                            <Item>
                                <NavLink to="/auth/minhas-inscricoes">
                                    <Icon>confirmation_number</Icon>
                                    MINHAS INSCRIÇÕES
                                </NavLink>
                            </Item>
                        </SubItem>
                    </Item>
                    {/* <Item>
                        <NavLink to="/auth/loja">
                            <Icon>shopping_cart</Icon>
                            LOJA
                        </NavLink>
                    </Item> */}
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
                        <ButtonLink onClick={logout}>
                            {loading ? <Loader style={{ marginRight: width < 900 ? '10px' : '5px' }} visible={true} type="TailSpin" color="#F68D42" height={width < 900 ? 17 : 15} width={width < 900 ? 18.720 : 17.720} /> : <Icon>logout</Icon>}
                            SAIR
                        </ButtonLink>
                    </Item>
                    {(user.plano === 'Free Cartoleiro' || user.plano === 'Demonstrativo') &&
                        <Item>
                            <NavLink className="planos" to="/auth/planos">
                                <Icon>wysiwyg</Icon>
                                ASSINE JÁ
                            </NavLink>
                        </Item>
                    }
                </Nav>
            </Container >
            <Screen onClick={close_menu} ref={screen}></Screen>
        </>
    )

}

export default header;
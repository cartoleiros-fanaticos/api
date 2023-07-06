import React, { useState, useRef } from 'react';

import backButton from 'browser-back-button';

import { NavLink } from "react-router-dom";

import ModalUsers from '../../modal/users';
import Modal from '../../../../componets/modal';

import {
    Header,
    Ico,
    Logo,
    Container,
    Avatar,
    List,
    Item,
    Button,
    Icon,
    Text,
    Screen,
} from './styles';

function nav({ data }) {

    const [modal, smodal] = useState(false);

    const menu = useRef();
    const screen = useRef();

    function open_menu() {

        menu.current.style.left = 0;

        screen.current.style.opacity = 1;
        screen.current.style.visibility = 'visible';

        backButton.on(() => {
            close_menu();
        });
    }

    function close_menu() {

        screen.current.style.opacity = 0;
        screen.current.style.visibility = 'hidden';

        menu.current.style.left = '-65%';
    }

    return (
        <>
            <Header>
                <Ico onClick={open_menu}>menu</Ico>
                <NavLink to="/auth/atletas">
                    <Logo />
                </NavLink>
            </Header>
            <Container ref={menu}>
                <Avatar src={data.auth.foto || '../../images/upload/avatar.png'} />
                <List>
                    <Button onClick={() => {
                        smodal(true);
                        close_menu();
                    }}>
                        <Icon>account_circle</Icon>
                        <Text>Minha conta</Text>
                    </Button>
                    {
                        data.auth.funcao === 'Admin' &&
                        <Item to="/auth/adm/usuarios">
                            <Icon>manage_accounts</Icon>
                            <Text>Usuarios</Text>
                        </Item>
                    }
                    <Item to="/auth/adm/inscricoes">
                        <Icon>post_add</Icon>
                        <Text>Inscrições</Text>
                    </Item>
                    <Item to="/auth/adm/ligas">
                        <Icon>admin_panel_settings</Icon>
                        <Text>Ligas</Text>
                    </Item>
                    <Item to="/auth/atletas">
                        <Icon>logout</Icon>
                        <Text>Sair</Text>
                    </Item>
                </List>
            </Container>

            {

                modal &&
                <Modal
                    icon="manage_accounts"
                    title="Editar Usuários"
                    data={data.auth}
                    modal={modal}
                    smodal={smodal}
                    Component={ModalUsers}
                    height='430px'
                />
            }
            <Screen onClick={close_menu} ref={screen}></Screen>
        </>
    );
}

export default nav;
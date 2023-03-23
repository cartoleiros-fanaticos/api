import React, { useEffect, useState, useRef } from 'react';

import backButton from 'browser-back-button';
import Loader from 'react-loader-spinner';

import { message, swal_success, } from '../../utils/helpers';

import api from '../../utils/api';

import {
    Container,
    Loading,
    Screen,
    Header,
    Icon,
    Title,
    Content,
} from './styles';

function modal({ title, icon, Component, modal, smodal }) {

    const container = useRef(null);
    const screen = useRef(null);

    const [loading, sloading] = useState(false);
    const [waithing, swaithing] = useState(false);

    useEffect(() => {
        if (modal) open();
        else close();
    }, [modal]);

    function open() {

        setTimeout(() => {

            screen.current.style.cssText = `
                opacity: 1;
                visibility: visible;
                transition-duration: 0.5s;
                `;

            container.current.style.cssText = `
                opacity: 1;
                visibility: visible;
                top: 50%;
                margin-top: -${container.current.offsetHeight / 2}px;
                transition-duration: 0.5s;
                `;

        }, 150)

        backButton.on(() => close());

    }

    function close() {

        screen.current.style.opacity = 0;
        screen.current.style.visibility = 'hidden';

        container.current.style.top = '60%';
        container.current.style.opacity = 0;

        setTimeout(() => smodal(false), 150);
    }

    return (
        <>
            <Container ref={container}>
                <Header>
                    <Icon color="#f1f1f1">{icon}</Icon>
                    <Title>{title}</Title>
                    <Icon color="#c40808" onClick={close}>close</Icon>
                </Header>
                <Content>
                    <Component smodal={smodal} />
                </Content>
            </Container>
            <Screen onClick={close} ref={screen}></Screen>
        </>
    );
}

export default modal;
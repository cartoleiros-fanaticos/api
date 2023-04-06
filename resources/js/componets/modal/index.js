import React, { useEffect, useState, useRef } from 'react';

import backButton from 'browser-back-button';

import Loading from '../../componets/loading';

import {
    Container,
    Screen,
    Header,
    Icon,
    Title,
    Content,
} from './styles';

function modal({ title, icon, Component, modal, smodal, data, loading, fnc = () => {}, width = '40%', height = 'auto', marginLeft = '-20%' }) {
        
    const { innerWidth } = window;

    const container = useRef();
    const screen = useRef();

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
                top: ${innerWidth <= 900 ? 0 : '50%'};
                margin-top: -${innerWidth <= 900 ? 0 : (container.current.offsetHeight / 2)}px;
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
            <Container
                width={width}
                height={height}
                marginLeft={marginLeft}
                ref={container}>
                    
                <Header>
                    <Icon color="#f1f1f1">{icon}</Icon>
                    <Title>{title}</Title>
                    <Icon color="#c40808" onClick={close}>close</Icon>
                </Header>
                <Content>
                    {
                        loading ?
                            <Loading />
                            :
                            <Component
                                data={data}
                                smodal={smodal}
                                fnc={fnc}
                            />
                    }
                </Content>
            </Container>
            <Screen onClick={close} ref={screen}></Screen>
        </>
    );
}

export default modal;
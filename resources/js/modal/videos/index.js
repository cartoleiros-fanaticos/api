import React, { useRef, useEffect } from 'react';

import backButton from 'browser-back-button';

import { 
    Container,
    Iframe,
    Screen
 } from './styles';

function videos({ modal, smodal, url }) {

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
                <Iframe src={url}></Iframe>
            </Container>
            <Screen onClick={close} ref={screen}></Screen>
        </>
    );
}

export default videos;
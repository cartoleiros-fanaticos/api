import React from 'react';

import { Container } from './styles';

function modal({ title, icon, Component }) {

    function close(){}

    return (
        <>
            <Container>
                <Header>
                    <Icon>close</Icon>
                    <Title>{title}</Title>
                    <Icon type="close" onClick={close}>close</Icon>
                </Header>
                <Content>
                    <Component />
                </Content>
            </Container>
            <Screen onClick={close} ref={screen}></Screen>
        </>
    );
}

export default modal;
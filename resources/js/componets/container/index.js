import React, { Component } from 'react';

import {
    Container,
    Content,
    Title
} from './styles';

import Header from '../../componets/header';
import Footer from '../../componets/footer';

function container({ title, Component }) {

    return (
        <Container>
            <Header />
            <Content>
                <Title>{title}</Title>
                <Component />
            </Content>
            <Footer />
        </Container>
    );
}

export default container;
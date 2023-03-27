import React, { useState } from 'react';

import {
    Container,
    Content,
    Title
} from './styles';

import Header from '../../componets/header';
import Footer from '../../componets/footer';
import Loading from '../../componets/loading';

function container({ title, Component, loading }) {

    return (
        <Container>
            <Header />
            <Content className='content'>
                {
                    loading ?
                        <Loading />
                        :
                        <>
                            <Title>{title}</Title>
                            <Component />
                        </>
                }
            </Content>
            <Footer />
        </Container>
    );
}

export default container;
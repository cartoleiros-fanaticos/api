import React, { useState, useEffect } from 'react';

import {
    Container,
    Content,
    Title
} from './styles';

import Header from '../../componets/header';
import Footer from '../../componets/footer';
import Loading from '../../componets/loading';

function container({ title, component, loading }) {

    useEffect(() => {

        if (window.innerWidth <= 900)
            window.scrollTo({ top: 0 });

    }, [])

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
                            {component}
                        </>
                }
            </Content>
            <Footer />
        </Container>
    );
}

export default container;
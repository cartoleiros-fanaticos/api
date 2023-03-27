import React, { useState } from 'react';
import Loader from 'react-loader-spinner';

import {
    Container,
    Loading,
    Text,
    Content,
    Title
} from './styles';

import Header from '../../componets/header';
import Footer from '../../componets/footer';

function container({ title, Component, loading }) {

    return (
        <Container>
            <Header />
            <Content>
                {
                    loading ?
                        <Loading>
                            <Loader visible={true} type="TailSpin" color="#F68D42" height={48} width={48} timeout={15000} />
                            <Text>Carregando aguarde.</Text>
                        </Loading>
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